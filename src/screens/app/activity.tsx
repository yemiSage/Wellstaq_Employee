import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight2 } from "iconsax-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth, hasPermission } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { Fab } from "@/components/fab";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/field";
import { Screen, FormError, QueryState, Pagination } from "@/components/screen";
import { EmptyState } from "@/components/ui/states";
import { formatDate, titleCase } from "@/lib/utils";

// Ordered worst to best so the four API levels read as one continuous track
// under the slider thumb. The mood-*.png names do not describe what the files
// actually show — mood-happy is a steaming face and mood-stressed is the
// beaming one — so these are paired by artwork, not by filename.
const scale = [
  { value: "bad", label: "Low", image: "mood-amazed.png" },
  { value: "stressed", label: "Stressed", image: "mood-happy.png" },
  { value: "tired", label: "Tired", image: "mood-tired.png" },
  { value: "good", label: "Good", image: "mood-stressed.png" },
];

const checkinSteps = [
  { key: "mood", label: "Mood", question: "How are you feeling today?" },
  { key: "energy_level", label: "Energy", question: "How is your energy?" },
  { key: "stress_level", label: "Stress", question: "How are your stress levels?" },
] as const;

const reasons = ["work", "family", "sleep", "social", "food", "love", "exams", "breakup", "others"] as const;

type CheckinAnswer = { level?: string; reason?: string; note?: string };

// "Others" is only answered once the user has typed what it was.
const isAnswered = (answer: CheckinAnswer) => Boolean(answer.level && answer.reason && (answer.reason !== "others" || answer.note?.trim()));

const challengeFilters = [
  { key: "upcoming", label: "Upcoming" },
  { key: "active", label: "Ongoing" },
  { key: "completed", label: "Completed" },
] as const;

function ChallengesTab() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<(typeof challengeFilters)[number]["key"]>("active");
  const [offset, setOffset] = useState(0);
  const query = useQuery({ queryKey: ["challenges", user?.organizationId, filter, offset], queryFn: () => employeeApi.challengePage(user!.organizationId, offset, filter) });
  return <>
    {hasPermission(user, "challenge.create", user?.branchId) && <Fab to="/challenges/new" label="Create a challenge" />}
    <div className="sticky-tabs"><div className="segmented segmented-3" role="tablist" aria-label="Challenge status">{challengeFilters.map((entry) => <button key={entry.key} type="button" role="tab" aria-selected={filter === entry.key} className={filter === entry.key ? "active" : ""} onClick={() => { setFilter(entry.key); setOffset(0); }}>{entry.label}</button>)}</div></div>
    <div className="page-pad !pt-0 list-stack"><QueryState query={query}>{query.data?.items.length ? query.data.items.map((c) => <Link className="card-link" key={c.id} to={`/challenges/${c.id}`}><Card className="content-card rounded-2xl">{c.image_url && <img className="h-40 w-full rounded-2xl object-cover" src={c.image_url} alt="" />}<span className="chip">{titleCase(c.status)}</span><h2>{c.name}</h2><p>{c.description}</p><small>{c.participant_count} participants · {c.end_date ? `Until ${formatDate(c.end_date)}` : "Open challenge"}</small></Card></Link>) : <EmptyState title={`No ${challengeFilters.find((entry) => entry.key === filter)!.label.toLowerCase()} challenges`} body="Challenges from your organization will appear here." />}<Pagination offset={offset} total={query.data?.total ?? 0} onChange={setOffset} /></QueryState></div>
  </>;
}

export function ActivityScreen() {
  return <div><PageHeader title="Activity" back />
    <div className="page-pad intro-pad"><div className="section-intro"><p className="eyebrow">Your challenges</p><h1 className="page-title">Small steps,<br />shared together.</h1></div></div>
    <ChallengesTab /></div>;
}

export function CheckInScreen() {
  const { user } = useAuth(); const client = useQueryClient(); const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, CheckinAnswer>>({ mood: {}, energy_level: {}, stress_level: {} });
  const query = useQuery({ queryKey: ["activity", user?.id], queryFn: () => employeeApi.checkinPage() });
  const save = useMutation({
    mutationFn: () => employeeApi.submitCheckin({
      mood: answers.mood.level!, energy_level: answers.energy_level.level!, stress_level: answers.stress_level.level!,
      // The daily check-in endpoint has no per-dimension reason field, so the
      // three reasons ride along in the one free-text field it does accept.
      notes: checkinSteps.map(({ key, label }) => `${label}: ${answers[key].reason === "others" ? answers[key].note!.trim() : titleCase(answers[key].reason!)}`).join(" · "),
    }),
    onSuccess: () => { toast.success("Check-in saved. A little time, just for you."); void client.invalidateQueries({ queryKey: ["activity"] }); void client.invalidateQueries({ queryKey: ["home"] }); navigate("/home"); },
  });
  const { key, question } = checkinSteps[step];
  const answer = answers[key];
  const active = scale.find((option) => option.value === answer.level);
  const last = step === checkinSteps.length - 1;
  const set = (patch: CheckinAnswer) => setAnswers({ ...answers, [key]: { ...answer, ...patch } });
  return <Screen title="Check-in"><Card className="checkin-card">
    <div className="checkin-progress" aria-hidden="true">{checkinSteps.map((entry, position) => <span key={entry.key} className={position <= step ? "is-done" : ""} />)}</div>
    <h1 className="checkin-question">{question}</h1>
    <div className="checkin-face">{active && <img src={`/assets/figma/${active.image}`} alt="" />}</div>
    <div className="checkin-slider">
      <input type="range" min={0} max={scale.length - 1} step={1} value={active ? scale.indexOf(active) : 0} className={active ? undefined : "is-unset"} aria-label={question} aria-valuetext={active?.label ?? "Not set"} onChange={(event) => set({ level: scale[Number(event.target.value)].value })} />
      <div className="checkin-ticks">{scale.map((option) => <button key={option.value} type="button" aria-pressed={option.value === answer.level} className={option.value === answer.level ? "is-active" : undefined} onClick={() => (option.value === answer.level ? setAnswers({ ...answers, [key]: {} }) : set({ level: option.value }))}>{option.label}</button>)}</div>
    </div>
    {active && <fieldset className="checkin-reason" key={answer.level}>
      <legend>What made you feel this way?</legend>
      <div>{reasons.map((reason) => <button key={reason} type="button" aria-pressed={reason === answer.reason} className={reason === answer.reason ? "is-active" : undefined} onClick={() => set({ reason: reason === answer.reason ? undefined : reason, note: undefined })}>{titleCase(reason)}</button>)}</div>
      {answer.reason === "others" && <Input className="checkin-note" autoFocus maxLength={120} placeholder="What was it?" aria-label="What made you feel this way?" value={answer.note ?? ""} onChange={(event) => set({ note: event.target.value })} />}
    </fieldset>}
    <FormError error={save.error} />
    <div className="checkin-actions">{step > 0 && <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>}<Button variant="outline" disabled={!isAnswered(answer)} onClick={() => (last ? save.mutate() : setStep(step + 1))} loading={last && save.isPending}>{last ? "Submit" : "Next"}<ArrowRight2 size="18" color="currentColor" /></Button></div>
  </Card><QueryState query={query}><Link className="text-link" to="/history">View check-in history ({query.data?.total ?? 0}) →</Link></QueryState><section className="action-list"><h2>My wellbeing</h2>{[["/scores","Personal scores","See your private trends"],["/survey","Open wellbeing survey","Share how work feels right now"],["/priorities","My priorities","Focus on what matters to you"]].map(([to,title,body]) => <Link className="action-row action-row-simple" key={to} to={to}><span><strong>{title}</strong><small>{body}</small></span><span aria-hidden="true">→</span></Link>)}</section></Screen>;
}
