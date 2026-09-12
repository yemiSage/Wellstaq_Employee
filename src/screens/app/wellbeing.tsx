import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { Screen, QueryState, FormError, Pagination } from "@/components/screen";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { EmptyState } from "@/components/ui/states";
import { titleCase, formatDate } from "@/lib/utils";

export function ScoresScreen() {
  const { user } = useAuth(); const query = useQuery({ queryKey: ["scores", user?.id], queryFn: employeeApi.scores });
  const dimensions = useQuery({ queryKey: ["dimensions"], queryFn: employeeApi.dimensions });
  const baseline = useQuery({ queryKey: ["baseline", user?.id], queryFn: employeeApi.baselines });
  return <Screen title="Personal scores"><div className="section-intro"><p className="eyebrow">The bigger picture</p><h1 className="page-title">Your wellbeing,<br />over time.</h1><p className="page-lead">Your personal scores and recent reflections.</p></div><QueryState query={query}>{query.data?.items.length ? query.data.items.map((item, i) => <Card className="content-card" key={`${item.dimension_id}-${item.period}-${i}`}><span className="eyebrow">{dimensions.data?.items.find((d) => d.id === item.dimension_id)?.name ?? "Wellbeing dimension"}</span><strong className="score-value">{item.score}</strong><small>{item.period}</small></Card>) : <EmptyState title="Your picture is taking shape" body="Complete your check-ins and assessments. Scores will appear when available." />}</QueryState><h2 className="page-title !text-xl">Your baseline</h2><QueryState query={baseline}>{baseline.data?.items.length ? baseline.data.items.map((item) => <Card className="content-card" key={item.id}><h3>{titleCase(item.dimension)}</h3><span className="chip">{titleCase(item.level)}</span><p>{item.reason ? titleCase(item.reason) : "No reason recorded"} · {formatDate(item.recorded_at)}</p></Card>) : <p className="empty-note">No baseline recorded yet.</p>}</QueryState></Screen>;
}

export function AssessmentsScreen() {
  const { user } = useAuth(); const client = useQueryClient(); const [category, setCategory] = useState("");
  const query = useQuery({ queryKey: ["assessments", user?.id], queryFn: employeeApi.assessments });
  const categories = useQuery({ queryKey: ["categories"], queryFn: employeeApi.categories });
  const submit = useMutation({ mutationFn: () => employeeApi.submitAssessment({ category_id: category || null, status: "pending" }), onSuccess: () => { toast.success("Assessment requested."); void client.invalidateQueries({ queryKey: ["assessments"] }); } });
  return <Screen title="Assessments"><div className="section-intro"><p className="eyebrow">A deeper reflection</p><h1 className="page-title">Make time to check in.</h1><p className="page-lead">Request an assessment for the area you want to focus on. Completed results appear below.</p></div><QueryState query={categories}><form className="list-stack" onSubmit={(e) => { e.preventDefault(); submit.mutate(); }}><Field label="Focus area"><select className="select" value={category} onChange={(e) => setCategory(e.target.value)}><option value="">General wellbeing</option>{categories.data?.items.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field><FormError error={submit.error} /><Button loading={submit.isPending}>Request assessment</Button></form></QueryState><QueryState query={query}>{query.data?.items.length ? query.data.items.map((item) => <Card className="content-card" key={item.id}><h3>{categories.data?.items.find((c) => c.id === item.category_id)?.name ?? "Wellbeing assessment"}</h3><span className="chip">{titleCase(item.status)}</span>{item.risk_score !== null && <p>Recorded score: {item.risk_score}</p>}<small>{item.assessed_at ? formatDate(item.assessed_at) : "Awaiting assessment"}</small></Card>) : <EmptyState title="Space to understand yourself" body="Your assessment history will appear here." />}</QueryState></Screen>;
}

const priorityOptions = ["reduce_stress", "build_energy", "improve_balance", "save_better", "stay_active", "feel_connected"];
export function PrioritiesScreen() {
  const { user } = useAuth(); const client = useQueryClient(); const [draft, setDraft] = useState<string[] | null>(null);
  const query = useQuery({ queryKey: ["priorities", user?.id], queryFn: employeeApi.priorities });
  const selected = draft ?? [...(query.data?.items ?? [])].sort((a, b) => a.rank - b.rank).map((p) => p.priority);
  const save = useMutation({ mutationFn: () => employeeApi.setPriorities(selected), onSuccess: async () => { await client.invalidateQueries({ queryKey: ["priorities"] }); setDraft(null); toast.success("Your priorities are saved."); } });
  return <Screen title="My priorities"><h1 className="page-title">What matters most?</h1><p className="page-lead">Select your priorities in order. Tap again to remove one.</p><QueryState query={query}><div className="priority-list !mt-2">{priorityOptions.map((p) => <button className={`priority-option ${selected.includes(p) ? "selected" : ""}`} key={p} aria-pressed={selected.includes(p)} onClick={() => setDraft(selected.includes(p) ? selected.filter((v) => v !== p) : [...selected, p])}><span>{titleCase(p)}</span>{selected.includes(p) && <strong>{selected.indexOf(p) + 1}</strong>}</button>)}</div><FormError error={save.error} /><Button disabled={!selected.length} loading={save.isPending} onClick={() => save.mutate()}>Save priorities</Button></QueryState></Screen>;
}

export function SurveyScreen() {
  const { user } = useAuth(); const client = useQueryClient(); const [answers, setAnswers] = useState<Record<string, number>>({});
  const query = useQuery({ queryKey: ["survey", user?.organizationId, user?.id], queryFn: () => employeeApi.survey(user!.organizationId) });
  const save = useMutation({ mutationFn: () => employeeApi.submitSurvey(user!.organizationId, { answers }), onSuccess: () => { toast.success("Thank you. Your response is saved."); void client.invalidateQueries({ queryKey: ["survey"] }); } });
  return <Screen title="Wellbeing survey"><h1 className="page-title">How does work feel?</h1><QueryState query={query}>{!query.data ? <EmptyState title="No survey is open" body="Come back when your organization opens its next survey." /> : query.data.already_responded || save.isSuccess ? <EmptyState title="Thank you for sharing" body="You’ve completed this survey. Your response has been recorded." /> : <form className="list-stack" onSubmit={(e) => { e.preventDefault(); save.mutate(); }}><p className="page-lead">Open until {formatDate(query.data.window_end)}. Rate each statement from 1 (strongly disagree) to 5 (strongly agree).</p>{query.data.questions.map((q) => <Card className="content-card" key={q.question_key}><fieldset><legend className="mb-4 text-sm leading-6">{q.question_text}</legend><div className="rating-row">{[1,2,3,4,5].map((n) => <button type="button" key={n} aria-label={`${n} of 5`} aria-pressed={answers[q.question_key] === n} onClick={() => setAnswers({ ...answers, [q.question_key]: n })}>{n}</button>)}</div></fieldset></Card>)}<FormError error={save.error} /><Button disabled={!query.data.questions.every((q) => answers[q.question_key])} loading={save.isPending}>Submit response</Button></form>}</QueryState></Screen>;
}

export function HistoryScreen() {
  const { user } = useAuth(); const [offset, setOffset] = useState(0);
  const query = useQuery({ queryKey: ["activity", user?.id, "history", offset], queryFn: () => employeeApi.checkinPage(offset) });
  return <Screen title="Check-in history"><h1 className="page-title">Every small step.</h1><QueryState query={query}>{query.data?.items.length ? query.data.items.map((item) => <Card className="content-card" key={item.id}><h3>{formatDate(item.checkin_date)}</h3><p>Mood: {titleCase(item.mood)}<br />Energy: {titleCase(item.energy_level)}<br />Stress: {titleCase(item.stress_level)}</p>{item.notes && <p>{item.notes}</p>}</Card>) : <EmptyState title="Your first step starts today" body="Saved daily check-ins will appear here." />}<Pagination offset={offset} total={query.data?.total ?? 0} onChange={setOffset} /></QueryState></Screen>;
}
