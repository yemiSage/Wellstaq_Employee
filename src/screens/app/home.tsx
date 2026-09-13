import { useEffect, useRef, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight2, Calendar, Cup, Flash, HeartTick, Notification } from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { queryKeys } from "@/lib/query-keys";
import { formatDate, initials } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ErrorState, HomeSkeleton } from "@/components/ui/states";

// Same round badge as the streak flash button, but muted grey for an empty
// section rather than the vibrant brand color.
function SectionEmpty({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return <Card className="content-card section-empty"><span className="section-empty-icon">{icon}</span><h3>{title}</h3><p>{body}</p></Card>;
}

export function HomeScreen() {
  const { user } = useAuth(); const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const query = useQuery({ queryKey: queryKeys.home(user?.organizationId, user?.branchId, user?.id), queryFn: () => employeeApi.home(user!.organizationId), enabled: Boolean(user) });
  // One point per completed check-in. That is the only rule the API can back
  // today — logins and challenge joins have no counter to read yet.
  const points = useQuery({ queryKey: ["checkin-total", user?.id], queryFn: () => employeeApi.checkinPage(), enabled: Boolean(user) });

  useEffect(() => {
    // Re-run once loading finishes: the ref only attaches to a real DOM
    // node once the loaded page (not PageLoader) is what's actually rendered.
    const container = rootRef.current?.closest(".shell-content");
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > 4);
    onScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [query.isPending]);

  if (query.isPending) return <HomeSkeleton />;
  if (query.isError) return <div className="page-pad"><ErrorState retry={() => void query.refetch()} /></div>;
  const data = query.data; const streak = Number(data.streak.current_streak_days ?? 0); const checked = Boolean(data.streak.checked_in_today);
  return <div className="home-page" ref={rootRef}><header className={`home-header${scrolled ? " is-scrolled" : ""}`}><button className="home-identity" onClick={() => navigate("/profile")} aria-label={`Open profile. ${points.data?.total ?? 0} points`}><span className="avatar !rounded-full">{user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials(user?.firstName, user?.lastName)}</span><span className="home-identity-score" aria-hidden="true"><Cup size="17" color="currentColor" /><strong>{points.data?.total ?? 0}pts</strong></span></button><button className="header-icon" onClick={() => navigate("/notifications")} aria-label="Notifications"><Notification color="currentColor" size="23" />{data.unreadCount > 0 && <span className="notification-dot">{Math.min(data.unreadCount, 9)}</span>}</button></header>
    <section className="home-greeting"><p>Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}</p><h1>{user?.firstName || "There"}, here’s how you are doing today.</h1></section>
    <div className="home-summary"><strong>{String(streak).padStart(2, "0")}</strong><span>Day check-in<br />streak</span><Link to="/leaderboard" aria-label="Open streak and leaderboard"><Flash size="23" color="currentColor" variant="Bold" /></Link></div>
    {data.partial && <div className="mx-6 mb-4"><ErrorState message="Some updates couldn’t load. You can still explore your wellbeing space." retry={() => void query.refetch()} /></div>}
    <section className="wellbeing-ribbon"><div className="ribbon-copy"><span className="eyebrow">Your daily check-in</span><strong>{checked ? "Well done." : "How are you?"}</strong><p>{checked ? "You made a little time for yourself today." : "A small pause. A little more clarity."}</p></div><span className="ribbon-mood wellbeing-orb" aria-hidden="true"/><Link className="ribbon-action" to="/checkin"><span>{checked ? "View today’s check-in" : "Start today’s check-in"}</span><ArrowRight2 size="20" color="currentColor" /></Link></section>
    <section className="section-block stat-grid"><Card><span><HeartTick size="21" color="currentColor" /></span><strong>{checked ? "Done" : "Today"}</strong><small>Your personal check-in</small></Card><Card><span><Calendar size="21" color="currentColor" /></span><strong>{data.events.length}</strong><small>Upcoming events</small></Card></section>
    <section className="section-block"><div className="section-heading"><h2>Your wellbeing</h2><Link className="text-link" to="/scores">View scores</Link></div><Link to="/priorities" className="action-row"><span><HeartTick size="23" color="currentColor" /></span><span><strong>Make room for what matters</strong><small>Set your personal priorities</small></span><ArrowRight2 size="18" color="currentColor" /></Link></section>
    <section className="section-block"><div className="section-heading"><h2>Challenges</h2><Link className="text-link" to="/activity">All challenges</Link></div>{data.challenges.length ? data.challenges.slice(0, 2).map((challenge) => <Link className="card-link mb-3" to={`/challenges/${challenge.id}`} key={challenge.id}><Card className="challenge-card"><span className="challenge-icon"><Cup color="currentColor" size="24" /></span><div><strong>{challenge.title}</strong><p>{challenge.description || "Build a healthy habit with your community."}</p><small className="chip">{challenge.participantCount} participants</small></div></Card></Link>) : <SectionEmpty icon={<Cup size="22" color="currentColor" />} title="No challenges yet" body="Challenges will appear here when they’re available." />}</section>
    <section className="section-block section-rail"><div className="section-heading"><h2>Featured events</h2><Link className="text-link" to="/events">See more</Link></div>{data.events.length ? <div className="event-rail">{data.events.map((event) => <Link className="event-rail-card" key={event.id} to={`/events/${event.id}`}><img src={event.imageUrl ?? "/assets/figma/event-mindful.jpeg"} alt="" /><div className="event-rail-body">{event.participantCount > 0 && <span className="event-rail-chip">{event.participantCount} going</span>}<strong>{event.title}</strong><div className="event-rail-meta"><Calendar size="16" color="currentColor" /><span>{formatDate(event.startDate)}</span>{event.time && <><span className="event-rail-dot" aria-hidden="true" /><span>{event.time}</span></>}</div></div></Link>)}</div> : <SectionEmpty icon={<Calendar size="22" color="currentColor" />} title="No events yet" body="Your next shared experience will appear here when available." />}</section></div>;
}
