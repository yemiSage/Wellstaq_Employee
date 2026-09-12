import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAuth, hasPermission } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { PageHeader } from "@/components/page-header";
import { Screen, QueryState, Pagination, FormError } from "@/components/screen";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";
import { EmptyState } from "@/components/ui/states";
import { formatDate } from "@/lib/utils";

export function EventsScreen() {
  const { user } = useAuth(); const [filter, setFilter] = useState("upcoming"); const [offset, setOffset] = useState(0);
  const query = useQuery({ queryKey: ["events", user?.organizationId, offset], queryFn: () => employeeApi.eventPage(user!.organizationId, offset) });
  const today = new Date(); today.setHours(0,0,0,0);
  const items = query.data?.items.filter((e) => filter === "upcoming" ? new Date(`${e.end_date ?? e.start_date}T23:59:59`) >= today : new Date(`${e.end_date ?? e.start_date}T23:59:59`) < today);
  return <div><PageHeader title="Events" /><div className="page-pad list-stack"><div className="section-intro"><p className="eyebrow">Better, together</p><h1 className="page-title">Something to<br />look forward to.</h1></div><div className="segmented">{["upcoming","past"].map((f) => <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f === "upcoming" ? "Upcoming" : "Past"}</button>)}</div>{hasPermission(user, "event.create", user?.branchId) && <Link className="text-link" to="/events/new">Create an event +</Link>}<QueryState query={query}>{items?.length ? <div className="event-list">{items.map((event) => <Link className="event-list-card" key={event.id} to={`/events/${event.id}`}><img src={event.image_url ?? "/assets/figma/event-mindful.jpeg"} alt="" /><span><small>{formatDate(event.start_date)}</small><strong>{event.title}</strong><p>{event.description}</p><em>{event.participant_count} going · {event.time.slice(0,5)}</em></span></Link>)}</div> : <EmptyState title="A little room on your calendar" body={query.data && query.data.total > 50 ? "No matching events on this page. Try the next page." : "Events will appear here when your team schedules them."} />}<Pagination offset={offset} total={query.data?.total ?? 0} size={50} onChange={setOffset} /></QueryState></div></div>;
}

export function EventDetailScreen() {
  const { eventId = "" } = useParams(); const { user } = useAuth(); const client = useQueryClient();
  const query = useQuery({ queryKey: ["events", user?.organizationId, eventId], queryFn: () => employeeApi.event(user!.organizationId, eventId) });
  const people = useQuery({ queryKey: ["event-people", user?.organizationId, eventId], queryFn: () => employeeApi.participants(user!.organizationId, eventId) });
  const me = people.data?.items.find((p) => p.user_id === user?.id);
  const action = useMutation({ mutationFn: async (mode: "join" | "leave" | "accepted" | "declined") => { if (mode === "leave") return employeeApi.leaveEvent(user!.organizationId,eventId,user!.id); if (mode === "join") { await employeeApi.joinEvent(user!.organizationId,eventId,user!.id); return employeeApi.rsvp(user!.organizationId,eventId,user!.id,"accepted"); } return employeeApi.rsvp(user!.organizationId,eventId,user!.id,mode); }, onSuccess: () => { toast.success("Your RSVP is updated."); void client.invalidateQueries({ queryKey: ["events"] }); void client.invalidateQueries({ queryKey: ["event-people"] }); void client.invalidateQueries({ queryKey: ["home"] }); } });
  const attendance = useMutation({ mutationFn: ({ id, attended }: { id: string; attended: boolean }) => employeeApi.attendance(user!.organizationId,eventId,id,attended), onSuccess: () => { void client.invalidateQueries({ queryKey: ["event-people"] }); } });
  const event = query.data;
  return <Screen title="Event details"><QueryState query={query}>{event && <><img className="w-full rounded-3xl" src={event.image_url ?? "/assets/figma/event-mindful.jpeg"} alt="" /><span className="eyebrow">{formatDate(event.start_date)} · {event.time.slice(0,5)}</span><h1 className="page-title">{event.title}</h1><p className="page-lead">{event.description}</p><span className="chip">{event.participant_count} people · {event.status}</span><QueryState query={people}><FormError error={action.error} />{event.status !== "cancelled" && <div className="list-stack">{me ? <><p className="page-lead">Your RSVP: {me.status}</p>{me.status !== "accepted" && <Button loading={action.isPending} onClick={() => action.mutate("accepted")}>Accept invitation</Button>}<Button variant="secondary" loading={action.isPending} onClick={() => action.mutate("leave")}>Leave event</Button></> : <Button loading={action.isPending} onClick={() => action.mutate("join")}>Count me in</Button>}</div>}<h2 className="page-title !text-xl">People attending</h2>{people.data?.items.map((p) => <Card className="content-card" key={p.user_id}><strong>{p.first_name} {p.last_name}</strong><small>{p.status}</small>{hasPermission(user,"event.update",event.branch_id) && <label className="preference-row"><span>Attended</span><input type="checkbox" checked={p.attended} disabled={attendance.isPending} onChange={(e) => attendance.mutate({ id:p.user_id, attended:e.target.checked })} /></label>}</Card>)}<FormError error={attendance.error} /></QueryState></>}</QueryState></Screen>;
}

export function CreateEventScreen() {
  const { user } = useAuth(); const navigate = useNavigate(); const client = useQueryClient();
  const [values,setValues] = useState({ title:"",description:"",start_date:"",time:"" });
  const save = useMutation({ mutationFn: () => employeeApi.createEvent(user!.organizationId,{ ...values, branch_id:user!.branchId, time:`${values.time}:00` }), onSuccess:(event) => { void client.invalidateQueries({ queryKey:["events"] }); navigate(`/events/${event.id}`,{replace:true}); } });
  if (!hasPermission(user,"event.create",user?.branchId)) return <Screen title="Create event"><EmptyState title="Organizer access required" body="Your account does not have permission to create events." /></Screen>;
  return <Screen title="Create event"><h1 className="page-title">Bring people together.</h1><form className="list-stack" onSubmit={(e)=>{e.preventDefault();save.mutate();}}><Field label="Event title"><Input required maxLength={255} value={values.title} onChange={(e)=>setValues({...values,title:e.target.value})}/></Field><Field label="Description"><textarea className="textarea" rows={4} value={values.description} onChange={(e)=>setValues({...values,description:e.target.value})}/></Field><Field label="Date"><Input type="date" required value={values.start_date} onChange={(e)=>setValues({...values,start_date:e.target.value})}/></Field><Field label="Time"><Input type="time" required value={values.time} onChange={(e)=>setValues({...values,time:e.target.value})}/></Field><FormError error={save.error}/><Button loading={save.isPending}>Create event</Button></form></Screen>;
}
