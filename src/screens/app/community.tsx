import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { employeeApi } from "@/api/services";
import { useAuth } from "@/auth/auth-context";
import { Screen, QueryState, FormError, Pagination } from "@/components/screen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { PostCard } from "./explore";

export function ComposeScreen({story=false}:{story?:boolean}) {
  const {user}=useAuth();const navigate=useNavigate();const client=useQueryClient();const [content,setContent]=useState("");const [file,setFile]=useState<File|null>(null);
  const save=useMutation({mutationFn:async()=>{const media_url=file?await employeeApi.upload(file,story?'stories':'posts'):undefined;const media_type=file?.type.startsWith('video/')?'video':'image';return story?employeeApi.createStory(user!.organizationId,{media_url:media_url!,media_type,branch_id:user?.branchId||null}):employeeApi.createPost(user!.organizationId,{content:content.trim()||null,media_url,media_type:media_url?media_type:null,branch_id:user?.branchId||null});},onSuccess:()=>{void client.invalidateQueries({queryKey:[story?'stories':'posts']});toast.success(story?"Your story is shared.":"Your post is shared.");navigate('/explore',{replace:true});}});
  return <Screen title={story?'Add a story':'Share a moment'}><h1 className="page-title">{story?'Your day, in a moment.':'What’s on your mind?'}</h1><p className="page-lead">Share with your workplace community.</p><form className="list-stack" onSubmit={(e)=>{e.preventDefault();save.mutate();}}>{!story&&<Field label="Your post"><textarea className="textarea" rows={6} maxLength={10000} value={content} onChange={(e)=>setContent(e.target.value)} placeholder="A small win, a thought, a little inspiration…"/></Field>}<Field label={story?'Photo or video':'Add a photo or video (optional)'} hint="Images and videos, up to 20 MB."><Input type="file" accept="image/*,video/*" required={story} onChange={(e)=>setFile(e.target.files?.[0]??null)}/></Field>{file&&<p className="page-lead">{file.name}</p>}<FormError error={save.error}/><Button disabled={!file&&!content.trim()} loading={save.isPending}>Share with community</Button></form></Screen>;
}

export function PostDetailScreen() {
  const {postId=''}=useParams();const {user}=useAuth();const client=useQueryClient();const [comment,setComment]=useState('');const [offset,setOffset]=useState(0);
  const query=useQuery({queryKey:['posts',user?.organizationId,postId],queryFn:()=>employeeApi.post(user!.organizationId,postId)});
  const comments=useQuery({queryKey:['comments',user?.organizationId,postId,offset],queryFn:()=>employeeApi.comments(user!.organizationId,postId,offset)});
  const send=useMutation({mutationFn:()=>employeeApi.comment(user!.organizationId,postId,comment.trim()),onSuccess:()=>{setComment('');void client.invalidateQueries({queryKey:['comments']});void client.invalidateQueries({queryKey:['posts']});}});
  const share=useMutation({mutationFn:async()=>{const url=`${window.location.origin}/#/posts/${encodeURIComponent(postId)}`;if(navigator.share)await navigator.share({title:'Wellstaq community post',url});else await navigator.clipboard.writeText(url);await employeeApi.sharePost(user!.organizationId,postId);},onSuccess:()=>toast.success('Post link shared or copied.')});
  return <Screen title="Community post"><QueryState query={query}>{query.data&&<PostCard post={query.data}/>}</QueryState><Button variant="secondary" loading={share.isPending} onClick={()=>share.mutate()}>Share post link ↗</Button><FormError error={share.error}/><h2 className="page-title !text-xl">The conversation</h2><QueryState query={comments}>{comments.data?.items.map((item)=><Card className="content-card" key={item.id}><small>{item.user_id===user?.id?'You':'Colleague'} · {new Date(item.created_at).toLocaleDateString()}</small><p className="whitespace-pre-wrap break-words">{item.content}</p>{item.replies?.map((reply)=><div className="border-l-2 border-line pl-4" key={reply.id}><small>Reply</small><p>{reply.content}</p></div>)}</Card>)}{!comments.data?.items.length&&<p className="empty-note">Be the first to leave a kind word.</p>}<Pagination offset={offset} total={comments.data?.total??0} onChange={setOffset}/></QueryState><form className="list-stack" onSubmit={(e)=>{e.preventDefault();send.mutate();}}><Field label="Your comment"><textarea className="textarea" rows={3} maxLength={2000} required value={comment} onChange={(e)=>setComment(e.target.value)}/></Field><FormError error={send.error}/><Button disabled={!comment.trim()} loading={send.isPending}>Post comment</Button></form></Screen>;
}

export function StoryScreen() {
  const {storyId=''}=useParams();const {user}=useAuth();const query=useQuery({queryKey:['stories',user?.organizationId,storyId],queryFn:()=>employeeApi.story(user!.organizationId,storyId)});
  return <Screen title="A shared moment"><QueryState query={query}>{query.data&&<>{query.data.media_type==='video'?<video src={query.data.media_url} controls playsInline className="story-view"/>:<img src={query.data.media_url} alt="Shared community story" className="story-view"/>}<p className="page-lead">Shared {new Date(query.data.created_at).toLocaleString()}</p></>}</QueryState></Screen>;
}
