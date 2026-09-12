import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from '@/auth/auth-context';
import { employeeApi } from '@/api/services';
import { Screen, QueryState, FormError } from '@/components/screen';
import { Button } from '@/components/ui/button';
import { Field, Input } from '@/components/ui/field';
import { initials } from '@/lib/utils';

type Details={first_name:string;last_name:string;country:string;state:string};
export function ProfileScreen(){
  const {user,refreshMe}=useAuth();const client=useQueryClient();const [draft,setDraft]=useState<Details|null>(null);
  const query=useQuery({queryKey:['profile',user?.id],queryFn:employeeApi.profile});
  const values=draft??{first_name:String(query.data?.first_name??''),last_name:String(query.data?.last_name??''),country:String(query.data?.country??''),state:String(query.data?.state??'')};
  const refresh=async()=>{await client.invalidateQueries({queryKey:['profile']});await refreshMe();};
  const save=useMutation({mutationFn:()=>employeeApi.updateProfile(values),onSuccess:async()=>{await refresh();setDraft(null);toast.success('Profile updated.');}});
  const upload=useMutation({mutationFn:async(file:File)=>{if(!file.type.startsWith('image/'))throw new Error('Choose a photo.');const url=await employeeApi.upload(file,'avatars');return employeeApi.avatar(url);},onSuccess:async()=>{await refresh();toast.success('Profile photo updated.');}});
  return <Screen title="Profile"><h1 className="page-title">A little about you.</h1><QueryState query={query}><span className="avatar xlarge">{user?.avatarUrl?<img src={user.avatarUrl} alt="Your profile"/>:initials(user?.firstName,user?.lastName)}</span><Field label="Change profile photo" hint={upload.isPending?'Uploading…':'Image, up to 20 MB'}><Input type="file" accept="image/*" disabled={upload.isPending} onChange={(e)=>{const file=e.target.files?.[0];if(file)upload.mutate(file);}}/></Field><FormError error={upload.error}/><form className="list-stack" onSubmit={(e)=>{e.preventDefault();save.mutate();}}>{([['first_name','First name'],['last_name','Last name'],['country','Country'],['state','State']] as const).map(([key,label])=><Field key={key} label={label}><Input value={values[key]} required={key==='first_name'||key==='last_name'} maxLength={100} onChange={(e)=>setDraft({...values,[key]:e.target.value})}/></Field>)}<Field label="Email address"><Input type="email" value={user?.email??''} readOnly/></Field><FormError error={save.error}/><Button disabled={upload.isPending} loading={save.isPending}>Save profile</Button></form></QueryState></Screen>;
}
