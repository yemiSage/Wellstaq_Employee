import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth, hasPermission } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Screen, FormError, QueryState, Pagination } from "@/components/screen";
import { EmptyState } from "@/components/ui/states";
import { formatDate, titleCase } from "@/lib/utils";

const options = [{ value: "good", label: "Good", image: "mood-happy.png" }, { value: "bad", label: "Low", image: "mood-tired.png" }, { value: "stressed", label: "Stressed", image: "mood-stressed.png" }, { value: "tired", label: "Tired", image: "mood-infuriated.png" }];

function ChallengesTab() {
  const { user } = useAuth(); const [offset, setOffset] = useState(0);
  const query = useQuery({ queryKey: ["challenges", user?.organizationId, offset], queryFn: () => employeeApi.challengePage(user!.organizationId, offset) });
  return <QueryState query={query}><div className="list-stack !mt-0">{hasPermission(user, "challenge.create", user?.branchId) && <Link className="text-link" to="/challenges/new">Create a challenge +</Link>}{query.data?.items.length ? query.data.items.map((c) => <Link className="card-link" key={c.id} to={`/challenges/${c.id}`}><Card className="content-card">{c.image_url && <img className="h-40 w-full rounded-2xl object-cover" src={c.image_url} alt="" />}<span className="chip">{titleCase(c.status)}</span><h2>{c.name}</h2><p>{c.description}</p><small>{c.participant_count} participants · {c.end_date ? `Until ${formatDate(c.end_date)}` : "Open challenge"}</small></Card></Link>) : <EmptyState title="Your next challenge is on its way" body="Challenges from your organization will appear here." />}<Pagination offset={offset} total={query.data?.total ?? 0} onChange={setOffset} /></div></QueryState>;
}

function ClubsTab() {
  const { user } = useAuth(); const [offset, setOffset] = useState(0);
  const query = useQuery({ queryKey: ["clubs", user?.organizationId, offset], queryFn: () => employeeApi.clubPage(user!.organizationId, offset) });
  return <QueryState query={query}><div className="list-stack !mt-0">{query.data?.items.length ? query.data.items.map((club) => <Link key={club.id} className="card-link" to={`/clubs/${club.id}`}><Card className="content-card">{club.image_url && <img src={club.image_url} className="h-36 w-full rounded-2xl object-cover" alt="" />}<span className="chip">{club.is_member ? "Joined" : club.category}</span><h2>{club.name}</h2><p>{club.description}</p><small>{club.member_count} members · {club.privacy}</small></Card></Link>) : <EmptyState title="Your people are on their way" body="Clubs in your organization will appear here." />}<Pagination offset={offset} total={query.data?.total ?? 0} onChange={setOffset} /></div></QueryState>;
}

export function ActivityScreen() {
  const [groupTab, setGroupTab] = useState<"challenges" | "clubs">("challenges");
  return <div><PageHeader title="Activity" back /><div className="page-pad list-stack"><div className="segmented"><button className={groupTab === "challenges" ? "active" : ""} onClick={() => setGroupTab("challenges")}>Challenges</button><button className={groupTab === "clubs" ? "active" : ""} onClick={() => setGroupTab("clubs")}>Clubs</button></div>{groupTab === "challenges" ? <ChallengesTab /> : <ClubsTab />}</div></div>;
}

export function CheckInScreen() {
  const { user } = useAuth(); const client = useQueryClient();
  const [values, setValues] = useState({ mood: "good", energy_level: "good", stress_level: "good", notes: "" });
  const query = useQuery({ queryKey: ["activity", user?.id], queryFn: () => employeeApi.checkinPage() });
  const save = useMutation({ mutationFn: () => employeeApi.submitCheckin(values), onSuccess: () => { toast.success("Check-in saved. A little time, just for you."); void client.invalidateQueries({ queryKey: ["activity"] }); void client.invalidateQueries({ queryKey: ["home"] }); } });
  return <Screen title="Check-in"><div className="section-intro"><h1 className="page-title">How are you, really?</h1><p className="page-lead">Choose what feels closest. One small check-in each day.</p></div><Card className="checkin-card">{([['mood','Mood'],['energy_level','Energy'],['stress_level','Stress']] as const).map(([key,label]) => <fieldset className="checkin-row" key={key}><legend>{label}</legend><div>{options.map((option) => <button key={option.value} aria-pressed={values[key] === option.value} className={values[key] === option.value ? "selected" : ""} onClick={() => setValues({ ...values, [key]: option.value })}><img src={`/assets/figma/${option.image}`} alt="" /><span>{option.label}</span></button>)}</div></fieldset>)}<Field label="Anything on your mind?" hint="Optional. Up to 1,000 characters."><textarea className="textarea" rows={3} maxLength={1000} value={values.notes} onChange={(e) => setValues({ ...values, notes: e.target.value })} /></Field><FormError error={save.error} /><Button onClick={() => save.mutate()} loading={save.isPending}>Save today’s check-in</Button></Card><QueryState query={query}><Link className="text-link" to="/history">View check-in history ({query.data?.total ?? 0}) →</Link></QueryState><section className="action-list"><h2>My wellbeing</h2>{[["/scores","Personal scores","See your private trends"],["/assessments","Assessments","Make room for a deeper reflection"],["/survey","Open wellbeing survey","Share how work feels right now"],["/priorities","My priorities","Focus on what matters to you"]].map(([to,title,body]) => <Link className="action-row action-row-simple" key={to} to={to}><span><strong>{title}</strong><small>{body}</small></span><span aria-hidden="true">→</span></Link>)}</section></Screen>;
}
