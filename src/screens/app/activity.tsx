import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { FormError, QueryState } from "@/components/screen";

const options = [{ value: "good", label: "Good", image: "mood-happy.png" }, { value: "bad", label: "Low", image: "mood-tired.png" }, { value: "stressed", label: "Stressed", image: "mood-stressed.png" }, { value: "tired", label: "Tired", image: "mood-infuriated.png" }];
export function ActivityScreen() {
  const { user } = useAuth(); const client = useQueryClient();
  const [values, setValues] = useState({ mood: "good", energy_level: "good", stress_level: "good", notes: "" });
  const query = useQuery({ queryKey: ["activity", user?.id], queryFn: () => employeeApi.checkinPage() });
  const save = useMutation({ mutationFn: () => employeeApi.submitCheckin(values), onSuccess: () => { toast.success("Check-in saved. A little time, just for you."); void client.invalidateQueries({ queryKey: ["activity"] }); void client.invalidateQueries({ queryKey: ["home"] }); } });
  return <div><PageHeader title="Activity" /><div className="page-pad list-stack"><div className="section-intro"><p className="eyebrow">A private moment</p><h1 className="page-title">How are you, really?</h1><p className="page-lead">Choose what feels closest. One small check-in each day.</p></div><Card className="checkin-card">{([['mood','Mood'],['energy_level','Energy'],['stress_level','Stress']] as const).map(([key,label]) => <fieldset className="checkin-row" key={key}><legend>{label}</legend><div>{options.map((option) => <button key={option.value} aria-pressed={values[key] === option.value} className={values[key] === option.value ? "selected" : ""} onClick={() => setValues({ ...values, [key]: option.value })}><img src={`/assets/figma/${option.image}`} alt="" /><span>{option.label}</span></button>)}</div></fieldset>)}<Field label="Anything on your mind?" hint="Optional. Up to 1,000 characters."><textarea className="textarea" rows={3} maxLength={1000} value={values.notes} onChange={(e) => setValues({ ...values, notes: e.target.value })} /></Field><FormError error={save.error} /><Button onClick={() => save.mutate()} loading={save.isPending}>Save today’s check-in</Button></Card><QueryState query={query}><Link className="text-link" to="/history">View check-in history ({query.data?.total ?? 0}) →</Link></QueryState><section className="action-list"><h2>My wellbeing</h2>{[["/scores","Personal scores","See your private trends"],["/assessments","Assessments","Make room for a deeper reflection"],["/survey","Open wellbeing survey","Share how work feels right now"],["/priorities","My priorities","Focus on what matters to you"]].map(([to,title,body]) => <Link className="action-row" key={to} to={to}><span aria-hidden="true">↗</span><span><strong>{title}</strong><small>{body}</small></span><span aria-hidden="true">→</span></Link>)}</section></div></div>;
}
