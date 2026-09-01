import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Activity, ArrowRight2, Chart, TickCircle } from "iconsax-react";
import { toast } from "sonner";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const options = [
  { value: "good", label: "Good", image: "mood-happy.png" },
  { value: "bad", label: "Low", image: "mood-tired.png" },
  { value: "stressed", label: "Stressed", image: "mood-stressed.png" },
  { value: "tired", label: "Tired", image: "mood-infuriated.png" },
];

export function ActivityScreen() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [mood, setMood] = useState("good");
  const [energy, setEnergy] = useState("good");
  const [stress, setStress] = useState("good");
  const query = useQuery({ queryKey: queryKeys.activity(user?.organizationId, user?.id), queryFn: () => employeeApi.activity(), enabled: Boolean(user) });
  const submit = useMutation({ mutationFn: () => employeeApi.submitCheckin({ mood, energy_level: energy, stress_level: stress }), onSuccess: async () => { toast.success("Check-in saved. Nice work showing up."); await queryClient.invalidateQueries({ queryKey: ["activity"] }); }, onError: () => toast.error("We couldn’t save your check-in.") });
  return <div><PageHeader title="Activity" /><div className="page-pad grid gap-6"><section><p className="eyebrow">A private moment</p><h2 className="page-title">How are you, really?</h2><p className="page-lead">Choose what feels closest. You can update this once each day.</p></section><Card className="checkin-card"><CheckinRow title="Mood" value={mood} onChange={setMood} /><CheckinRow title="Energy" value={energy} onChange={setEnergy} /><CheckinRow title="Stress" value={stress} onChange={setStress} /><Button onClick={() => submit.mutate()} disabled={submit.isPending}>{submit.isPending ? "Saving…" : "Save today’s check-in"}</Button></Card><section className="stat-grid"><Card><span><Activity color="currentColor" size="21" /></span><strong>{Array.isArray(query.data) ? query.data.length : 0}</strong><small>Recent check-ins</small></Card><Card><span><Chart color="currentColor" size="21" /></span><strong>4</strong><small>Wellbeing areas</small></Card></section><section className="action-list"><h2>My wellbeing</h2><ActionRow icon={<Chart color="currentColor" size="21" />} title="Personal scores" body="See your private trends" /><ActionRow icon={<TickCircle color="currentColor" size="21" />} title="Assessments" body="Complete a deeper reflection" /><ActionRow icon={<Activity color="currentColor" size="21" />} title="Open wellbeing survey" body="Share how work feels right now" /></section></div></div>;
}

function CheckinRow({ title, value, onChange }: { title: string; value: string; onChange(value: string): void }) {
  return <fieldset className="checkin-row"><legend>{title}</legend><div>{options.map((option) => <button type="button" key={option.value} className={cn(value === option.value && "selected")} aria-pressed={value === option.value} onClick={() => onChange(option.value)}><img src={`/assets/figma/${option.image}`} alt="" /><span>{option.label}</span></button>)}</div></fieldset>;
}
function ActionRow({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) { return <button className="action-row"><span>{icon}</span><span><strong>{title}</strong><small>{body}</small></span><ArrowRight2 color="currentColor" size="19" /></button>; }
