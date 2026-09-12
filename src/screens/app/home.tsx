import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight2, Calendar, Cup, HeartTick, Notification } from "iconsax-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { queryKeys } from "@/lib/query-keys";
import { formatDate, initials } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ErrorState, PageLoader } from "@/components/ui/states";

export function HomeScreen() {
  const { user } = useAuth(); const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const query = useQuery({ queryKey: queryKeys.home(user?.organizationId, user?.branchId, user?.id), queryFn: () => employeeApi.home(user!.organizationId), enabled: Boolean(user) });

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

  if (query.isPending) return <PageLoader />;
  if (query.isError) return <div className="page-pad"><ErrorState retry={() => void query.refetch()} /></div>;
  const data = query.data; const streak = Number(data.streak.current_streak_days ?? 0); const checked = Boolean(data.streak.checked_in_today);
  return <div className="home-page" ref={rootRef}><header className={`home-header${scrolled ? " is-scrolled" : ""}`}><button className="avatar !rounded-full" onClick={() => navigate("/profile")} aria-label="Open profile">{user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials(user?.firstName, user?.lastName)}</button><button className="header-icon" onClick={() => navigate("/notifications")} aria-label="Notifications"><Notification color="currentColor" size="23" />{data.unreadCount > 0 && <span className="notification-dot">{Math.min(data.unreadCount, 9)}</span>}</button></header>
    <section className="home-greeting"><p>Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},</p><h1>{user?.firstName || "there"} here’s your<br />Today’s summary.</h1></section>
    <div className="home-summary"><strong>{String(streak).padStart(2, "0")}</strong><span>Day check-in<br />streak</span><Link to="/leaderboard" aria-label="Open streak and leaderboard"><Cup size="23" color="currentColor" /></Link></div>
    {data.partial && <div className="mx-6 mb-4"><ErrorState message="Some updates couldn’t load. You can still explore your wellbeing space." retry={() => void query.refetch()} /></div>}
    <section className="wellbeing-ribbon"><div className="ribbon-copy"><span className="eyebrow">Your daily check-in</span><strong>{checked ? "Well done." : "How are you?"}</strong><p>{checked ? "You made a little time for yourself today." : "A small pause. A little more clarity."}</p></div><span className="ribbon-mood wellbeing-orb" aria-hidden="true"/><Link className="ribbon-action" to="/checkin"><span>{checked ? "View today’s check-in" : "Start today’s check-in"}</span><ArrowRight2 size="20" color="currentColor" /></Link></section>
    <section className="section-block stat-grid"><Card><span><HeartTick size="21" color="currentColor" /></span><strong>{checked ? "Done" : "Today"}</strong><small>Your personal check-in</small></Card><Card><span><Calendar size="21" color="currentColor" /></span><strong>{data.events.length}</strong><small>Upcoming events</small></Card></section>
    <section className="section-block"><div className="section-heading"><h2>Your wellbeing</h2><Link className="text-link" to="/scores">View scores</Link></div><Link to="/priorities" className="action-row"><span><HeartTick size="23" color="currentColor" /></span><span><strong>Make room for what matters</strong><small>Set your personal priorities</small></span><ArrowRight2 size="18" color="currentColor" /></Link></section>
    <section className="section-block"><div className="section-heading"><h2>Challenges</h2><Link className="text-link" to="/activity">All challenges</Link></div>{data.challenges.length ? data.challenges.slice(0, 2).map((challenge) => <Link className="card-link mb-3" to={`/challenges/${challenge.id}`} key={challenge.id}><Card className="challenge-card"><span className="challenge-icon"><Cup color="currentColor" size="24" /></span><div><strong>{challenge.title}</strong><p>{challenge.description || "Build a healthy habit with your community."}</p><small className="chip">{challenge.participantCount} participants</small></div></Card></Link>) : <Card className="content-card"><h3>A little motivation, together.</h3><p>Your team’s challenges will appear here when they’re available.</p></Card>}</section>
    <section className="section-block"><div className="section-heading"><h2>On the calendar</h2><Link className="text-link" to="/events">See all</Link></div>{data.events.length ? <div className="event-vertical-scroll">{data.events.map((event) => <Link className="event-list-card" key={event.id} to={`/events/${event.id}`}><img src={event.imageUrl ?? "/assets/figma/event-mindful.jpeg"} alt="" /><span><small>{formatDate(event.startDate)}</small><strong>{event.title}</strong><p>{event.description}</p></span></Link>)}</div> : <p className="empty-note">No upcoming events yet. Your next shared experience will appear here.</p>}</section></div>;
}
