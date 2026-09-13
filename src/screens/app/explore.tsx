import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog } from "@base-ui/react/dialog";
import { ArrowLeft2, Heart, Link21, Message, More, Profile2User, Save2, Send2, Trash } from "iconsax-react";
import { toast } from "sonner";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { Fab } from "@/components/fab";
import { PageHeader } from "@/components/page-header";
import { QueryState, Pagination } from "@/components/screen";
import { EmptyState, ErrorState } from "@/components/ui/states";
import { initials, timeAgo } from "@/lib/utils";
import { useMembers, type Person } from "@/lib/use-members";
import type { components } from "@/api/generated/schema";

type Post = components["schemas"]["PostResponse"];

export function Avatar({ person, size = 36 }: { person: Person; size?: number }) {
  return <span className="thread-avatar" style={{ width: size, height: size }} aria-hidden="true">{person.avatarUrl ? <img src={person.avatarUrl} alt="" /> : initials(person.firstName, person.lastName)}</span>;
}

// Threads shows a count only once there is one; an empty slot reads cleaner
// than a row of zeros.
const count = (value: number) => (value > 0 ? <span>{value}</span> : null);

const postUrl = (postId: string) => `${window.location.origin}/#/posts/${encodeURIComponent(postId)}`;

function WhatsAppGlyph() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.05-1.36A10 10 0 1 0 12 2Zm0 18.2a8.16 8.16 0 0 1-4.16-1.14l-.3-.18-3 .8.8-2.93-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.13c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/></svg>;
}

function LinkedInGlyph() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.6v1.64h.05c.5-.95 1.73-1.95 3.56-1.95 3.8 0 4.5 2.5 4.5 5.76V21h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74V21H9z"/></svg>;
}

function refreshPosts(client: ReturnType<typeof useQueryClient>) {
  void client.invalidateQueries({ queryKey: ["posts"] });
  void client.invalidateQueries({ queryKey: ["post-liked"] });
}

// One post as a Threads-style row: avatar rail on the left, then name + age,
// text, media and the action strip. Tapping the row opens the thread; the
// controls inside stop that so a like never also navigates.
export function PostRow({ post, person, saved = false, detail = false }: { post: Post; person: Person; saved?: boolean; detail?: boolean }) {
  const { user } = useAuth(); const client = useQueryClient(); const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareClubs, setShareClubs] = useState(false);
  const likedQuery = useQuery({ queryKey: ["post-liked", user?.id, post.id], queryFn: () => employeeApi.postLikedByMe(user!.organizationId, post.id, user!.id) });
  // Optimistic: flip locally on tap, then let the invalidation settle it.
  const [optimistic, setOptimistic] = useState<boolean | null>(null);
  const liked = optimistic ?? likedQuery.data ?? false;
  const likeCount = post.like_count + (optimistic === null || optimistic === (likedQuery.data ?? false) ? 0 : optimistic ? 1 : -1);
  const like = useMutation({
    mutationFn: async (next: boolean) => (next ? employeeApi.likePost(user!.organizationId, post.id) : employeeApi.unlikePost(user!.organizationId, post.id)),
    onMutate: (next) => setOptimistic(next),
    onError: (error) => { setOptimistic(null); toast.error(error instanceof Error ? error.message : "Couldn’t update your like."); },
    // Hold the optimistic state until both the count and the liked flag have
    // refetched, otherwise the heart snaps back for a beat in between.
    onSuccess: async () => { await Promise.all([client.invalidateQueries({ queryKey: ["posts"] }), client.invalidateQueries({ queryKey: ["post-liked"] })]); setOptimistic(null); },
  });
  const save = useMutation({ mutationFn: () => employeeApi.savePost(user!.organizationId, post.id, saved), onSuccess: () => { toast.success(saved ? "Removed from saved." : "Saved."); setMenuOpen(false); refreshPosts(client); }, onError: (error) => toast.error(error instanceof Error ? error.message : "Couldn’t save this post.") });
  const copy = useMutation({ mutationFn: () => navigator.clipboard.writeText(postUrl(post.id)), onSuccess: () => { toast.success("Link copied."); setMenuOpen(false); }, onError: () => toast.error("Couldn’t copy the link.") });
  const remove = useMutation({ mutationFn: () => employeeApi.deletePost(user!.organizationId, post.id), onSuccess: () => { toast.success("Post deleted."); setMenuOpen(false); refreshPosts(client); if (detail) navigate("/explore", { replace: true }); }, onError: (error) => toast.error(error instanceof Error ? error.message : "Couldn’t delete this post.") });
  const shareTo = useMutation({
    mutationFn: async (dest: "whatsapp" | "linkedin" | "copy") => {
      const url = postUrl(post.id);
      if (dest === "whatsapp") window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
      else if (dest === "linkedin") window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank", "noopener,noreferrer");
      else await navigator.clipboard.writeText(url);
      await employeeApi.sharePost(user!.organizationId, post.id);
      return dest;
    },
    onSuccess: (dest) => { toast.success(dest === "copy" ? "Link copied." : "Post shared."); setShareOpen(false); refreshPosts(client); },
    onError: () => toast.error("Couldn’t share this post."),
  });
  const joinedClubsQuery = useQuery({ queryKey: ["clubs", user?.organizationId, "joined"], queryFn: () => employeeApi.clubPage(user!.organizationId, 0), enabled: shareOpen && shareClubs });
  const joinedClubs = joinedClubsQuery.data?.items.filter((club) => club.is_member) ?? [];
  const shareToClub = useMutation({
    mutationFn: async (club: { id: string; name: string }) => { await employeeApi.sendMessage(user!.organizationId, "club", club.id, postUrl(post.id)); await employeeApi.sharePost(user!.organizationId, post.id); return club.name; },
    onSuccess: (name) => { toast.success(`Shared to ${name}.`); setShareOpen(false); setShareClubs(false); refreshPosts(client); void client.invalidateQueries({ queryKey: ["messages"] }); },
    onError: () => toast.error("Couldn’t share to this club."),
  });
  const stop = (event: MouseEvent) => event.stopPropagation();
  const open = () => { if (!detail) navigate(`/posts/${post.id}`); };
  const isVideo = post.media_type === "video";

  return <article className={`thread-row${detail ? " is-detail" : ""}`} onClick={open}>
    <div className="thread-rail"><Avatar person={person} /></div>
    <div className="thread-body">
      <div className="thread-meta"><strong>{person.name}</strong><time dateTime={post.created_at}>{timeAgo(post.created_at)}</time><button type="button" className="thread-more" aria-label="More options" onClick={(event) => { stop(event); setConfirmDelete(false); setMenuOpen(true); }}><More size="20" color="currentColor" /></button></div>
      {post.content && (detail ? <p className="thread-text">{post.content}</p> : <Link className="thread-text" to={`/posts/${post.id}`} onClick={stop}>{post.content}</Link>)}
      {post.media_url && <div className="thread-media" onClick={isVideo ? stop : undefined}>{isVideo ? <video src={post.media_url} controls playsInline preload="metadata" /> : <img src={post.media_url} alt="" loading="lazy" />}</div>}
      <div className="thread-actions">
        <button type="button" aria-label={liked ? "Unlike" : "Like"} aria-pressed={liked} className={liked ? "is-liked" : undefined} disabled={like.isPending} onClick={(event) => { stop(event); like.mutate(!liked); }}><Heart size="21" color="currentColor" variant={liked ? "Bold" : "Linear"} />{count(likeCount)}</button>
        <Link to={`/posts/${post.id}`} aria-label="Reply" onClick={stop}><Message size="21" color="currentColor" />{count(post.comment_count)}</Link>
        <button type="button" aria-label="Share" onClick={(event) => { stop(event); setShareOpen(true); }}><Send2 size="21" color="currentColor" />{count(post.share_count)}</button>
      </div>
    </div>
    <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="sheet-backdrop" onClick={stop} />
        <Dialog.Viewport className="sheet-viewport" onClick={stop}>
          <Dialog.Popup className="date-sheet thread-sheet" aria-label="Post options">
            <span className="sheet-handle" />
            <div className="thread-sheet-group">
              <button type="button" disabled={save.isPending} onClick={() => save.mutate()}><span>{saved ? "Remove from saved" : "Save"}</span><Save2 size="22" color="currentColor" variant={saved ? "Bold" : "Linear"} /></button>
              <button type="button" disabled={copy.isPending} onClick={() => copy.mutate()}><span>Copy link</span><Link21 size="22" color="currentColor" /></button>
              <button type="button" onClick={() => { setMenuOpen(false); setShareOpen(true); }}><span>Share</span><Send2 size="22" color="currentColor" /></button>
            </div>
            {post.user_id === user?.id && <div className="thread-sheet-group">
              <button type="button" className="is-danger" disabled={remove.isPending} onClick={() => (confirmDelete ? remove.mutate() : setConfirmDelete(true))}><span>{confirmDelete ? "Tap again to delete" : "Delete"}</span><Trash size="22" color="currentColor" /></button>
            </div>}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
    <Dialog.Root open={shareOpen} onOpenChange={(open) => { setShareOpen(open); if (!open) setShareClubs(false); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="sheet-backdrop" onClick={stop} />
        <Dialog.Viewport className="sheet-viewport" onClick={stop}>
          <Dialog.Popup className="date-sheet thread-sheet share-sheet" aria-label="Share post">
            <span className="sheet-handle" />
            {shareClubs ? <>
              <div className="share-sheet-subhead"><button type="button" aria-label="Back" onClick={() => setShareClubs(false)}><ArrowLeft2 size="18" color="currentColor" /></button><span>Share to a club</span></div>
              <div className="thread-sheet-group">
                {joinedClubsQuery.isPending ? <button type="button" disabled><span>Loading your clubs…</span></button>
                  : joinedClubs.length ? joinedClubs.map((club) => <button key={club.id} type="button" disabled={shareToClub.isPending} onClick={() => shareToClub.mutate(club)}><span>{club.name}</span><Send2 size="18" color="currentColor" /></button>)
                  : <button type="button" disabled><span>Join a club to share here</span></button>}
              </div>
            </> : <div className="share-sheet-row">
              <button type="button" disabled={shareTo.isPending} onClick={() => shareTo.mutate("whatsapp")}><span className="share-icon share-icon-whatsapp"><WhatsAppGlyph /></span><small>WhatsApp</small></button>
              <button type="button" disabled={shareTo.isPending} onClick={() => shareTo.mutate("linkedin")}><span className="share-icon share-icon-linkedin"><LinkedInGlyph /></span><small>LinkedIn</small></button>
              <button type="button" onClick={() => setShareClubs(true)}><span className="share-icon"><Profile2User size="22" color="currentColor" /></span><small>Club</small></button>
              <button type="button" disabled={shareTo.isPending} onClick={() => shareTo.mutate("copy")}><span className="share-icon"><Link21 size="22" color="currentColor" /></span><small>Copy</small></button>
            </div>}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  </article>;
}

export function FeedSkeleton({ rows = 3 }: { rows?: number }) {
  return <div role="status" aria-label="Loading">{Array.from({ length: rows }, (_, index) => <div className="thread-row is-skeleton" key={index}><div className="thread-rail"><span className="skeleton-block" style={{ width: 36, height: 36, borderRadius: "50%" }} /></div><div className="thread-body"><span className="skeleton-block" style={{ width: "34%", height: 12 }} /><span className="skeleton-block" style={{ width: "92%", height: 12 }} /><span className="skeleton-block" style={{ width: "70%", height: 12 }} /></div></div>)}</div>;
}

// The feed itself: infinite scroll, a sentinel near the bottom pulls the next
// page and shows Threads' grey placeholder rows while it lands.
export function Feed({ saved = false, composer }: { saved?: boolean; composer?: ReactNode }) {
  const { user } = useAuth(); const { resolve } = useMembers();
  const sentinel = useRef<HTMLDivElement>(null);
  const query = useInfiniteQuery({
    queryKey: ["posts", user?.organizationId, saved ? "saved" : "feed"],
    queryFn: ({ pageParam }) => employeeApi.postPage(user!.organizationId, pageParam, saved),
    initialPageParam: 0,
    getNextPageParam: (last) => { const next = last.offset + last.items.length; return last.items.length && next < last.total ? next : undefined; },
  });
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;
  useEffect(() => {
    const node = sentinel.current;
    if (!node || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting) && !isFetchingNextPage) void fetchNextPage(); }, { rootMargin: "600px 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  const posts = query.data?.pages.flatMap((page) => page.items) ?? [];
  return <div className="thread-feed">
    {composer}
    {query.isPending ? <FeedSkeleton /> : query.isError ? <div className="page-pad"><ErrorState retry={() => void query.refetch()} /></div> : posts.length ? posts.map((post) => <PostRow key={post.id} post={post} person={resolve(post.user_id)} saved={saved} />) : <div className="page-pad"><EmptyState title={saved ? "Nothing saved yet" : "Your feed is warming up"} body={saved ? "Save a post from its menu to find it here later." : "Be the first to share what’s new with your team."} /></div>}
    {hasNextPage && <div ref={sentinel} />}
    {isFetchingNextPage && <FeedSkeleton rows={2} />}
  </div>;
}

function ClubsTab() {
  const { user } = useAuth(); const [offset, setOffset] = useState(0);
  const query = useQuery({ queryKey: ["clubs", user?.organizationId, offset], queryFn: () => employeeApi.clubPage(user!.organizationId, offset) });
  return <QueryState query={query}><div className="club-list">{query.data?.items.length ? query.data.items.map((club) => <Link key={club.id} className="club-row" to={`/clubs/${club.id}`}><span className="club-row-image">{club.image_url ? <img src={club.image_url} alt="" /> : club.name.slice(0, 1)}</span><span className="club-row-body"><strong>{club.name}</strong>{club.description && <p>{club.description}</p>}<small>{club.member_count} {club.member_count === 1 ? "member" : "members"} · {club.privacy === "public" ? "Public" : "Private"} · {club.category}</small></span><span className={`club-row-state${club.is_member ? " is-joined" : ""}`}>{club.is_member ? "Joined" : "View"}</span></Link>) : <div className="page-pad"><EmptyState title="Your people are on their way" body="Clubs in your organization will appear here." /></div>}<div className="page-pad !pt-0"><Pagination offset={offset} total={query.data?.total ?? 0} onChange={setOffset} /></div></div></QueryState>;
}

const tabs = [{ key: "feed", label: "Feed" }, { key: "clubs", label: "Clubs" }] as const;

export function ExploreScreen() {
  const { me } = useMembers();
  const [tab, setTab] = useState<(typeof tabs)[number]["key"]>("feed");
  // The composer row doubles as the "new post" entry point; once it scrolls
  // away the floating + takes over.
  const composerRef = useRef<HTMLAnchorElement>(null);
  const [composerVisible, setComposerVisible] = useState(true);
  useEffect(() => {
    const node = composerRef.current;
    if (tab !== "feed" || !node) return;
    const observer = new IntersectionObserver(([entry]) => setComposerVisible(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, [tab]);
  return <div className="thread-page spaces-page"><PageHeader title="Spaces" back />
    <div className="page-pad intro-pad"><div className="section-intro"><p className="eyebrow">Your community</p><h1 className="page-title">A little more<br />connected.</h1></div></div>
    <div className="spaces-tabs"><div className="segmented" role="tablist" aria-label="Spaces">{tabs.map((entry) => <button key={entry.key} type="button" role="tab" aria-selected={tab === entry.key} className={tab === entry.key ? "active" : ""} onClick={() => setTab(entry.key)}>{entry.label}</button>)}</div></div>
    {tab === "feed" ? <><Feed composer={<Link ref={composerRef} className="thread-composer" to="/posts/new"><Avatar person={me} /><span className="thread-composer-box"><small>What’s new?</small></span></Link>} /><Fab to="/posts/new" label="New post" hidden={composerVisible} /></> : <><ClubsTab /><Fab to="/clubs/new" label="Create a club" /></>}
  </div>;
}

export function SavedPostsScreen() {
  return <div className="detail-screen thread-page"><PageHeader title="Saved" back /><Feed saved /></div>;
}
