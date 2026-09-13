import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Global, Lock1 } from 'iconsax-react';
import { useAuth } from '@/auth/auth-context';
import { employeeApi } from '@/api/services';
import { Screen, QueryState, Pagination, FormError } from '@/components/screen';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/field';
import { CoverImageField } from '@/components/ui/cover-image-field';
import { Modal } from '@/components/ui/modal';
import { EmptyState } from '@/components/ui/states';

const privacyOptions = [
  { value: 'public', label: 'Public', body: 'Anyone can join', icon: Global },
  { value: 'private', label: 'Private', body: 'Invite only', icon: Lock1 },
] as const;

export function ClubDetailScreen() {
  const {clubId=''}=useParams();const {user}=useAuth();const client=useQueryClient();
  const query=useQuery({queryKey:['clubs',user?.organizationId,clubId],queryFn:()=>employeeApi.club(user!.organizationId,clubId)});
  const members=useQuery({queryKey:['club-members',user?.organizationId,clubId],queryFn:()=>employeeApi.clubMembers(user!.organizationId,clubId),enabled:query.data?.is_member===true});
  const join=useMutation({mutationFn:()=>employeeApi.clubMembership(user!.organizationId,clubId,user!.id,query.data?.is_member??false),onSuccess:()=>{void client.invalidateQueries({queryKey:['clubs']});void client.invalidateQueries({queryKey:['club-members']});toast.success('Club membership updated.');}});
  const club=query.data;
  return <Screen title="Your community"><QueryState query={query}>{club&&<>{club.image_url&&<img className="w-full rounded-3xl" src={club.image_url} alt=""/>}<span className="chip">{club.category}</span><h1 className="page-title">{club.name}</h1><p className="page-lead">{club.description}</p><p className="page-lead">{club.member_count} members · {club.privacy} club</p><FormError error={join.error}/>{club.is_member?<><Link className="text-link" to={`/clubs/${clubId}/chat`}>Open club conversation →</Link>{club.leader_id!==user?.id&&<Button variant="secondary" loading={join.isPending} onClick={()=>join.mutate()}>Leave club</Button>}<h2 className="page-title !text-xl">Your people</h2><QueryState query={members}>{members.data?.items.map((member)=><Card className="content-card" key={member.id}><strong>{member.first_name} {member.last_name}</strong></Card>)}</QueryState></>:club.privacy==='public'?<Button loading={join.isPending} onClick={()=>join.mutate()}>Join this club</Button>:<p className="empty-note">This is a private club. Ask the club leader for an invitation.</p>}</>}</QueryState></Screen>;
}

export function ChatScreen() {
  const {clubId=''}=useParams();const {user}=useAuth();const client=useQueryClient();const [content,setContent]=useState('');const [offset,setOffset]=useState(0);
  const club=useQuery({queryKey:['clubs',user?.organizationId,clubId],queryFn:()=>employeeApi.club(user!.organizationId,clubId)});
  const query=useQuery({queryKey:['messages',user?.organizationId,clubId,offset],queryFn:()=>employeeApi.messages(user!.organizationId,'club',clubId,offset),enabled:club.data?.is_member===true,refetchInterval:15000});
  const send=useMutation({mutationFn:()=>employeeApi.sendMessage(user!.organizationId,'club',clubId,content.trim()),onSuccess:()=>{setContent('');setOffset(0);void client.invalidateQueries({queryKey:['messages']});}});
  return <Screen title={club.data?.name??'Club conversation'}><QueryState query={club}>{club.data?.is_member?<><QueryState query={query}>{[...(query.data?.items??[])].sort((a,b)=>a.created_at.localeCompare(b.created_at)).map((message)=><article key={message.id} className={`chat-bubble ${message.user_id===user?.id?'mine':''}`}><p>{message.content}</p>{message.media_url&&(message.media_type==='video'?<video src={message.media_url} controls playsInline/>:<img src={message.media_url} alt="Shared attachment"/>)}<small>{message.user_id===user?.id?'You':'Colleague'} · {new Date(message.created_at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</small></article>)}{!query.data?.items.length&&<EmptyState title="Start a conversation" body="Say hello to your club."/>}<Pagination offset={offset} total={query.data?.total??0} size={50} onChange={setOffset}/></QueryState><form className="inline-form" onSubmit={(e)=>{e.preventDefault();send.mutate();}}><Field label="Message"><Input value={content} maxLength={5000} required onChange={(e)=>setContent(e.target.value)} placeholder="Say something kind…"/></Field><Button disabled={!content.trim()} loading={send.isPending}>Send</Button></form><FormError error={send.error}/></>:<EmptyState title="Join the club first" body="Members can read and send messages in this conversation."/>}</QueryState></Screen>;
}

const categories = [["fitness", "Fitness"], ["creativity", "Creativity"], ["team_bonding", "Team bonding"], ["mental_health", "Mental health"], ["nutrition", "Nutrition"]] as const;

export function CreateClubModal({ open, onOpenChange }: { open: boolean; onOpenChange(open: boolean): void }) {
  const {user}=useAuth();const navigate=useNavigate();const client=useQueryClient();
  const [values,setValues]=useState({name:'',description:'',category:'fitness',privacy:'public'});const [file,setFile]=useState<File|null>(null);
  const save=useMutation({mutationFn:async()=>{const image_url=file?await employeeApi.upload(file,'clubs'):null;return employeeApi.createClub(user!.organizationId,user!.branchId,{name:values.name.trim(),description:values.description.trim()||null,category:values.category,privacy:values.privacy,image_url});},onSuccess:(club)=>{void client.invalidateQueries({queryKey:['clubs']});toast.success('Your club is ready.');onOpenChange(false);navigate(`/clubs/${club.id}`);}});
  return <Modal open={open} onOpenChange={onOpenChange} title="Create Club" description="Fill in the details to create a new club"
    footer={<><Button type="button" variant="secondary" onClick={()=>onOpenChange(false)}>Cancel</Button><Button type="submit" form="create-club-form" disabled={!values.name.trim()} loading={save.isPending}>Create club</Button></>}>
    <form id="create-club-form" className="list-stack" onSubmit={(e)=>{e.preventDefault();save.mutate();}}><CoverImageField file={file} onChange={setFile} hint="Optional. Images up to 20 MB." /><Field label="Club name"><Input required maxLength={120} value={values.name} onChange={(e)=>setValues({...values,name:e.target.value})} placeholder="The walking club"/></Field><Field label="What is it about?" hint="Optional."><textarea className="textarea" rows={3} maxLength={2000} value={values.description} onChange={(e)=>setValues({...values,description:e.target.value})}/></Field><Field label="Category"><select className="select" value={values.category} onChange={(e)=>setValues({...values,category:e.target.value})}>{categories.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></Field><Field label="Who can join?"><div className="privacy-toggle">{privacyOptions.map(({value,label,body,icon:Icon})=><button key={value} type="button" aria-pressed={values.privacy===value} onClick={()=>setValues({...values,privacy:value})}><span className="privacy-toggle-head"><Icon size="18" color="currentColor" /><strong>{label}</strong></span><small>{body}</small></button>)}</div></Field><FormError error={save.error}/></form>
  </Modal>;
}
