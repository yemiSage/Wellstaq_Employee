import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowUp2, CloseCircle, GalleryAdd, Message, Send2 } from "iconsax-react";
import { toast } from "sonner";
import { employeeApi } from "@/api/services";
import { useAuth } from "@/auth/auth-context";
import { PageHeader } from "@/components/page-header";
import { Screen, QueryState, FormError } from "@/components/screen";
import { Button } from "@/components/ui/button";
import { useMembers, type Person } from "@/lib/use-members";
import { timeAgo } from "@/lib/utils";
import { Avatar, FeedSkeleton, PostRow } from "./explore";
import type { components } from "@/api/generated/schema";

type Comment = components["schemas"]["CommentResponse"];
type Reply = components["schemas"]["CommentReplyResponse"];

// Threads' "New thread" sheet: you, then a bare "What's new?" box. The story
// variant keeps the same shell but only takes media.
export function ComposeScreen({ story = false }: { story?: boolean }) {
  const { user } = useAuth(); const { me } = useMembers(); const navigate = useNavigate(); const client = useQueryClient();
  const [content, setContent] = useState(""); const [file, setFile] = useState<File | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  const save = useMutation({
    mutationFn: async () => {
      const media_url = file ? await employeeApi.upload(file, story ? "stories" : "posts") : undefined;
      const media_type = file?.type.startsWith("video/") ? "video" : "image";
      return story ? employeeApi.createStory(user!.organizationId, { media_url: media_url!, media_type, branch_id: user?.branchId || null }) : employeeApi.createPost(user!.organizationId, { content: content.trim() || null, media_url, media_type: media_url ? media_type : null, branch_id: user?.branchId || null });
    },
    onSuccess: () => { void client.invalidateQueries({ queryKey: [story ? "stories" : "posts"] }); toast.success(story ? "Your story is shared." : "Posted."); navigate("/explore", { replace: true }); },
  });
  const ready = story ? Boolean(file) : Boolean(file || content.trim());
  return <div className="detail-screen thread-page"><PageHeader title={story ? "New story" : "New post"} back />
    <form className="compose" onSubmit={(event) => { event.preventDefault(); save.mutate(); }}>
      <div className="thread-row is-detail compose-row">
        <div className="thread-rail"><Avatar person={me} /></div>
        <div className="thread-body">
          <div className="thread-meta"><strong>{me.name}</strong></div>
          {!story && <textarea className="compose-input" rows={3} maxLength={10000} autoFocus value={content} onChange={(event) => setContent(event.target.value)} placeholder="What’s new?" aria-label="What’s new?" />}
          {file && preview && <div className="thread-media compose-preview">{file.type.startsWith("video/") ? <video src={preview} controls playsInline /> : <img src={preview} alt="" />}<button type="button" aria-label="Remove attachment" onClick={() => { setFile(null); if (fileInput.current) fileInput.current.value = ""; }}><CloseCircle size="24" color="currentColor" variant="Bold" /></button></div>}
          <div className="compose-tools"><button type="button" aria-label={story ? "Choose a photo or video" : "Add a photo or video"} onClick={() => fileInput.current?.click()}><GalleryAdd size="22" color="currentColor" /></button>{story && !file && <span>Choose a photo or video to share as a story.</span>}</div>
          <input ref={fileInput} className="sr-only" type="file" accept="image/*,video/*" tabIndex={-1} onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
        </div>
      </div>
      <FormError error={save.error} />
      <div className="compose-footer">{story && <span>Stories are visible to your workplace.</span>}<Button size="sm" className={story ? undefined : "ml-auto"} disabled={!ready} loading={save.isPending}>Post<Send2 size="18" color="currentColor" /></Button></div>
    </form>
  </div>;
}

// A single reply as a row. Nested replies hang off the same rail with a line
// from the parent avatar, the way Threads draws a conversation.
function ReplyRow({ comment, person, replies, onReply, resolve }: { comment: Comment | Reply; person: Person; replies?: Reply[]; onReply(comment: Comment | Reply, person: Person): void; resolve(id: string): Person }) {
  const { user } = useAuth();
  return <div className={`thread-row is-reply${replies?.length ? " has-children" : ""}`}>
    <div className="thread-rail"><Avatar person={person} size={32} /></div>
    <div className="thread-body">
      <div className="thread-meta"><strong>{person.name}</strong>{comment.user_id === user?.id && <span className="thread-badge">You</span>}<time dateTime={comment.created_at}>{timeAgo(comment.created_at)}</time></div>
      {comment.content && <p className="thread-text">{comment.content}</p>}
      <div className="thread-actions"><button type="button" aria-label={`Reply to ${person.name}`} onClick={() => onReply(comment, person)}><Message size="19" color="currentColor" />{replies?.length ? <span>{replies.length}</span> : null}</button></div>
      {replies?.map((reply) => <ReplyRow key={reply.id} comment={reply} person={resolve(reply.user_id)} onReply={onReply} resolve={resolve} />)}
    </div>
  </div>;
}

export function PostDetailScreen() {
  const { postId = "" } = useParams(); const { user } = useAuth(); const client = useQueryClient(); const { resolve, me } = useMembers();
  const [text, setText] = useState(""); const [replyTo, setReplyTo] = useState<{ id: string; person: Person } | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const query = useQuery({ queryKey: ["posts", user?.organizationId, postId], queryFn: () => employeeApi.post(user!.organizationId, postId) });
  const comments = useInfiniteQuery({
    queryKey: ["comments", user?.organizationId, postId],
    queryFn: ({ pageParam }) => employeeApi.comments(user!.organizationId, postId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (last) => { const next = last.offset + last.items.length; return last.items.length && next < last.total ? next : undefined; },
  });
  const replies = comments.data?.pages.flatMap((page) => page.items) ?? [];
  const send = useMutation({
    // Replying to a reply still targets the top-level comment: the API keeps
    // conversations one level deep.
    mutationFn: () => employeeApi.comment(user!.organizationId, postId, text.trim(), replyTo?.id),
    onSuccess: () => { setText(""); setReplyTo(null); void client.invalidateQueries({ queryKey: ["comments"] }); void client.invalidateQueries({ queryKey: ["posts"] }); },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Couldn’t post your reply."),
  });
  const startReply = (comment: Comment | Reply, person: Person) => { setReplyTo({ id: comment.parent_comment_id ?? comment.id, person }); input.current?.focus(); };
  return <div className="detail-screen thread-page thread-detail"><PageHeader title="Thread" back />
    <QueryState query={query}>{query.data && <PostRow post={query.data} person={resolve(query.data.user_id)} detail />}</QueryState>
    <div className="thread-replies">
      {comments.isPending ? <FeedSkeleton rows={2} /> : comments.isError ? <p className="thread-empty">Replies couldn’t load. <button type="button" onClick={() => void comments.refetch()}>Try again</button></p> : replies.length ? replies.map((comment) => <ReplyRow key={comment.id} comment={comment} person={resolve(comment.user_id)} replies={comment.replies} onReply={startReply} resolve={resolve} />) : <p className="thread-empty">No replies yet. Start the conversation.</p>}
      {comments.hasNextPage && <p className="thread-empty"><button type="button" disabled={comments.isFetchingNextPage} onClick={() => void comments.fetchNextPage()}>{comments.isFetchingNextPage ? "Loading…" : "Load more replies"}</button></p>}
    </div>
    <form className="reply-bar" onSubmit={(event) => { event.preventDefault(); if (text.trim()) send.mutate(); }}>
      {replyTo && <div className="reply-context"><span>Replying to <strong>{replyTo.person.name}</strong></span><button type="button" aria-label="Cancel reply" onClick={() => setReplyTo(null)}><CloseCircle size="18" color="currentColor" /></button></div>}
      <div className="reply-bar-row"><Avatar person={me} size={32} /><input ref={input} value={text} maxLength={2000} placeholder={replyTo ? `Reply to ${replyTo.person.firstName || replyTo.person.name}…` : "Add your reply…"} aria-label="Your reply" onChange={(event) => setText(event.target.value)} /><button type="submit" aria-label="Send reply" disabled={!text.trim() || send.isPending}><ArrowUp2 size="20" color="currentColor" /></button></div>
    </form>
  </div>;
}

export function StoryScreen() {
  const { storyId = "" } = useParams(); const { user } = useAuth(); const query = useQuery({ queryKey: ["stories", user?.organizationId, storyId], queryFn: () => employeeApi.story(user!.organizationId, storyId) });
  return <Screen title="A shared moment"><QueryState query={query}>{query.data && <>{query.data.media_type === "video" ? <video src={query.data.media_url} controls playsInline className="story-view" /> : <img src={query.data.media_url} alt="Shared community story" className="story-view" />}<p className="page-lead">Shared {new Date(query.data.created_at).toLocaleString()}</p></>}</QueryState></Screen>;
}
