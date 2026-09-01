import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar, People, TickCircle } from "iconsax-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/auth/auth-context";
import { PermissionGate } from "@/auth/permission-gate";
import { employeeApi } from "@/api/services";
import { queryKeys } from "@/lib/query-keys";
import { cn, formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, PageLoader } from "@/components/ui/states";
import { DateWheelSheet } from "@/components/date-wheel-sheet";

export function EventsScreen() {
  const { user } = useAuth(); const navigate = useNavigate(); const [filter, setFilter] = useState("upcoming");
  const query = useQuery({ queryKey: queryKeys.events(user?.organizationId, filter), queryFn: () => employeeApi.events(user!.organizationId, filter), enabled: Boolean(user) });
  return <div><PageHeader title="Events" /><div className="page-pad grid gap-6"><div className="segmented"><button className={cn(filter === "upcoming" && "active")} onClick={() => setFilter("upcoming")}>Upcoming</button><button className={cn(filter === "past" && "active")} onClick={() => setFilter("past")}>Past</button></div><PermissionGate permission="events.create"><DateWheelSheet onConfirm={(date) => toast(`Event date set for ${formatDate(date)}`)} /></PermissionGate>{query.isLoading ? <PageLoader /> : query.isError ? <ErrorState retry={() => void query.refetch()} /> : query.data?.length ? <div className="event-list">{query.data.map((event) => <button className="event-list-card" key={event.id} onClick={() => navigate(`/events/${event.id}`, { state: { event } })}><img src={event.imageUrl ?? "/assets/figma/event-mindful.jpeg"} alt="" /><span><small><Calendar color="currentColor" size="14" /> {formatDate(event.startDate)}</small><strong>{event.title}</strong><p>{event.description}</p><em><People color="currentColor" size="14" /> {event.participantCount} going</em></span></button>)}</div> : <EmptyState title="Nothing on the calendar yet" body="New wellbeing sessions and team events will appear here." />}</div></div>;
}

export function EventDetailScreen() {
  const { user } = useAuth(); const navigate = useNavigate(); const location = useLocation(); const state = location.state as { event?: Awaited<ReturnType<typeof employeeApi.events>>[number] } | null; const event = state?.event; const queryClient = useQueryClient();
  const join = useMutation({ mutationFn: () => employeeApi.joinEvent(user!.organizationId, event!.id), onSuccess: () => { toast.success("You’re on the guest list."); void queryClient.invalidateQueries({ queryKey: ["events"] }); } });
  if (!event) return <div><PageHeader title="Event" back /><div className="page-pad"><EmptyState title="Event details unavailable" body="Return to Events and choose the event again." action={<Button onClick={() => navigate("/events")}>Browse events</Button>} /></div></div>;
  return <div><PageHeader title="Event details" back /><div className="event-detail"><img src={event.imageUrl ?? "/assets/figma/event-mindful.jpeg"} alt="" /><div className="page-pad"><span className="eyebrow">{formatDate(event.startDate)} · {event.time}</span><h1>{event.title}</h1><p>{event.description ?? "A wellbeing experience designed for your community."}</p><div className="detail-facts"><span><Calendar color="currentColor" size="21" /> {formatDate(event.startDate)}</span><span><People color="currentColor" size="21" /> {event.participantCount} people attending</span></div><Button className="w-full" onClick={() => join.mutate()} disabled={join.isPending}><TickCircle color="currentColor" size="20" /> {join.isPending ? "Joining…" : "RSVP to this event"}</Button><PermissionGate permission="events.attendance.manage" branchId={user?.branchId}><Button className="mt-3 w-full" variant="secondary">Manage attendance</Button></PermissionGate></div></div></div>;
}
