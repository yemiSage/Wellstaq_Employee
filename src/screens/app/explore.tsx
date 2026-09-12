import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Message, Save2 } from "iconsax-react";
import { toast } from "sonner";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { PageHeader } from "@/components/page-header";
import { QueryState, Pagination, FormError } from "@/components/screen";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/states";
import { initials } from "@/lib/utils";
import type { components } from "@/api/generated/schema";

export function PostCard({post,saved=false}: {post:components['schemas']['PostResponse'];saved?:boolean}) {
  const {user}=useAuth();const client=useQueryClient();
  const likedQuery=useQuery({queryKey:['post-liked',user?.id,post.id],queryFn:()=>employeeApi.postLikedByMe(user!.organizationId,post.id,user!.id)});
  const liked=likedQuery.data??false;
  const like=useMutation({mutationFn:async()=>{if(likedQuery.isError||likedQuery.isPending)throw new Error('Please wait for reactions to load, then try again.');return liked?employeeApi.unlikePost(user!.organizationId,post.id):employeeApi.likePost(user!.organizationId,post.id);},onSuccess:()=>{void client.invalidateQueries({queryKey:['post-liked']});void client.invalidateQueries({queryKey:["posts"]});}});
  const bookmark=useMutation({mutationFn:()=>employeeApi.savePost(user!.organizationId,post.id,saved),onSuccess:()=>{toast.success(saved?"Removed from saved posts.":"Post saved.");void client.invalidateQueries({queryKey:["posts"]});}});
  return <Card className="post-card"><div className="post-author"><span className="avatar small">{post.user_id===user?.id?user.firstName.slice(0,1):"W"}</span><div><strong>{post.user_id===user?.id?`${user.firstName} ${user.lastName}`:"Wellstaq colleague"}</strong><small>{new Date(post.created_at).toLocaleDateString()}</small></div></div><Link to={`/posts/${post.id}`}><p className="whitespace-pre-wrap break-words text-base leading-7">{post.content}</p></Link>{post.media_url && (post.media_type==='video'?<video className="post-media" src={post.media_url} controls playsInline/>:<img className="post-media" src={post.media_url} alt="Community post attachment"/>)}<div className="post-actions"><button aria-label={liked?"Unlike post":"Like post"} aria-pressed={liked} disabled={like.isPending} onClick={()=>like.mutate()}><Heart size="20" color="currentColor" variant={liked?"Bold":"Linear"}/>{post.like_count}</button><Link className="inline-flex min-h-11 items-center gap-2 px-3 text-sm" to={`/posts/${post.id}`} aria-label="View comments"><Message size="20" color="currentColor"/>{post.comment_count}</Link><button aria-label={saved?"Unsave post":"Save post"} disabled={bookmark.isPending} onClick={()=>bookmark.mutate()}><Save2 size="20" color="currentColor" variant={saved?"Bold":"Linear"}/></button></div><FormError error={like.error??bookmark.error}/></Card>;
}

export function ExploreScreen() {
  const {user}=useAuth();const [offset,setOffset]=useState(0);const [saved,setSaved]=useState(false);
  const query=useQuery({queryKey:["posts",user?.organizationId,saved,offset],queryFn:()=>employeeApi.postPage(user!.organizationId,offset,saved)});
  const stories=useQuery({queryKey:["stories",user?.organizationId],queryFn:()=>employeeApi.storyPage(user!.organizationId)});
  return <div><PageHeader title="Spaces" back/><div className="page-pad list-stack"><div className="section-intro"><p className="eyebrow">Your community</p><h1 className="page-title">A little more<br/>connected.</h1></div><QueryState query={stories}><div className="story-rail"><Link className="story add-story" to="/stories/new"><span aria-hidden="true">+</span><small>Add story</small></Link>{stories.data?.items.map((story)=><Link className="story" key={story.id} to={`/stories/${story.id}`}><span>{story.media_type==='image'?<img src={story.media_url} alt=""/>:<span>▶</span>}</span><small>{story.user_id===user?.id?"Your story":"Colleague"}</small></Link>)}</div></QueryState><Link className="composer-trigger" to="/posts/new"><span className="avatar small">{initials(user?.firstName,user?.lastName)}</span><span>What’s on your mind?</span></Link><div className="segmented"><button className={!saved?'active':''} onClick={()=>{setSaved(false);setOffset(0);}}>Community</button><button className={saved?'active':''} onClick={()=>{setSaved(true);setOffset(0);}}>Saved posts</button></div><QueryState query={query}>{query.data?.items.length?query.data.items.map((post)=><PostCard key={post.id} post={post} saved={saved}/>):<EmptyState title={saved?"Keep the good things close":"Your community is warming up"} body={saved?"Save a post to find it here later.":"Be the first to share a moment with your team."}/>}<Pagination offset={offset} total={query.data?.total??0} onChange={setOffset}/></QueryState></div></div>;
}
