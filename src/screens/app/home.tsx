import { useQuery } from "@tanstack/react-query";
import { ArrowRight2, Calendar, Cup, HeartTick, Notification } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { queryKeys } from "@/lib/query-keys";
import { formatDate, initials } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ErrorState, PageLoader } from "@/components/ui/states";

const fallbackEvents = [
  { id: "mindful", title: "Her Wellness Circle", description: "A mindful conversation and community session.", imageUrl: "/assets/figma/event-mindful.jpeg", startDate: new Date().toISOString(), participantCount: 28 },
  { id: "meditation", title: "Midweek reset", description: "Pause, breathe and return with more clarity.", imageUrl: "/assets/figma/event-meditation.jpeg", startDate: new Date(Date.now() + 86400000 * 2).toISOString(), participantCount: 17 },
];

export function HomeScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const query = useQuery({ queryKey: queryKeys.home(user?.organizationId, user?.branchId, user?.id), queryFn: () => employeeApi.home(user!.organizationId), enabled: Boolean(user) });
  if (query.isLoading) return <PageLoader />;
  if (query.isError) return <div className="page-pad pt-8"><ErrorState retry={() => void query.refetch()} /></div>;
  const data = query.data!;
  const events = data.events.length ? data.events : fallbackEvents;
  const score = Number(data.scores.overall_score ?? data.scores.score ?? 78);
  const streak = Number(data.streak.current_streak_days ?? 0);
  return (
    <div className="home-page">
      <header className="home-header">
        <button className="avatar" onClick={() => navigate("/profile")} aria-label="Open profile">{user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials(user?.firstName, user?.lastName)}</button>
        <div><p>Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"},</p><h1>{user?.firstName || "there"}</h1></div>
        <button className="header-icon" onClick={() => navigate("/notifications")} aria-label="Notifications"><Notification color="currentColor" size="24" />{data.unreadCount > 0 && <span className="notification-dot">{Math.min(data.unreadCount, 9)}</span>}</button>
      </header>

      <section className="wellbeing-ribbon" aria-label={`Wellbeing score ${score} percent`}>
        <div className="ribbon-copy"><span className="eyebrow">Your week</span><strong>{score}%</strong><p>{score >= 75 ? "You’re finding a healthy rhythm." : "Small check-ins can shift the week."}</p></div>
        <img className="ribbon-mood" src="/assets/figma/mood-amazed.png" alt="Wellbeing mood" />
        <div className="wellbeing-meter"><span style={{ width: `${Math.max(4, Math.min(score, 100))}%` }} /></div>
        <div className="week-dots">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={`${day}-${index}`} className={index < 5 ? "done" : ""}>{day}</span>)}</div>
      </section>

      <button className="streak-card" onClick={() => navigate("/activity")}><span className="streak-icon"><HeartTick color="currentColor" size="24" variant="TwoTone" /></span><span><strong>{streak ? `${streak} day check-in streak` : "Start today’s check-in"}</strong><small>{data.streak.checked_in_today ? "You showed up for yourself today." : "It takes less than a minute."}</small></span><ArrowRight2 color="currentColor" size="20" /></button>

      <section className="section-block"><div className="section-heading"><div><span className="eyebrow">Move together</span><h2>Active challenge</h2></div><button onClick={() => navigate("/explore")}>See all</button></div><Card className="challenge-card"><span className="challenge-icon"><Cup color="currentColor" size="24" variant="TwoTone" /></span><div><strong>{data.challenges[0]?.title ?? "7 days of better breaks"}</strong><p>{data.challenges[0]?.description ?? "Take one intentional pause each workday."}</p><div className="mini-progress"><span style={{ width: `${data.challenges[0]?.progress ?? 42}%` }} /></div></div></Card></section>

      <section className="section-block"><div className="section-heading"><div><span className="eyebrow">Coming up</span><h2>Events for you</h2></div><button onClick={() => navigate("/events")}>See all</button></div><div className="event-rail">{events.map((event) => <button className="event-card" key={event.id} onClick={() => navigate(`/events/${event.id}`, { state: { event } })}><img src={event.imageUrl ?? "/assets/figma/event-mindful.jpeg"} alt="" /><span className="event-card-copy"><small><Calendar color="currentColor" size="14" /> {formatDate(event.startDate)}</small><strong>{event.title}</strong><p>{event.description}</p></span></button>)}</div></section>
    </div>
  );
}
