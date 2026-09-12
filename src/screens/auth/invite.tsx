import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { FormError } from "@/components/screen";
import { authApi } from "@/api/services";
import { useAuth } from "@/auth/auth-context";
import { cn, titleCase } from "@/lib/utils";
import type { components } from "@/api/generated/schema";

type Entry = components["schemas"]["BaselineDimensionSchema"];
const dimensions: Entry["dimension"][] = ["mood", "energy", "stress", "work_life_balance"];
const moods: { level: Entry["level"]; label: string; image: string }[] = [
  { level: "amazed", label: "Great", image: "mood-amazed.png" }, { level: "excited", label: "Excited", image: "mood-excited.png" },
  { level: "tired", label: "Tired", image: "mood-tired.png" }, { level: "stressed", label: "Stressed", image: "mood-stressed.png" }, { level: "infuriated", label: "Frustrated", image: "mood-infuriated.png" },
];
const priorities = ["reduce_stress", "build_energy", "improve_balance", "save_better", "stay_active", "feel_connected"] as const;

export function InviteScreen() {
  const [params] = useSearchParams(); const navigate = useNavigate(); const { acceptTokens } = useAuth();
  const [step, setStep] = useState(0); const [code, setCode] = useState(params.get("invite_code") ?? ""); const [otp, setOtp] = useState(""); const [token, setToken] = useState("");
  const [details, setDetails] = useState({ first_name: "", last_name: "", password: "", country: "Nigeria", state: "" });
  const [entries, setEntries] = useState<Entry[]>(dimensions.map((dimension) => ({ dimension, level: "amazed", reason: "work" })));
  const [selected, setSelected] = useState<(typeof priorities)[number][]>([]);
  const request = useMutation({ mutationFn: () => authApi.requestInviteOtp(code.trim()), onSuccess: () => setStep(1) });
  const verify = useMutation({ mutationFn: async () => { const data = await authApi.verifyInviteOtp(code.trim(), otp); const value = data.invite_verification_token ?? data.verification_token; if (typeof value !== "string" || !value) throw new Error("The invitation could not be verified. Request a new code."); return value; }, onSuccess: (value) => { setToken(value); setStep(2); } });
  const register = useMutation({ mutationFn: async () => { const data = await authApi.registerInvite({ ...details, invite_verification_token: token, baseline: { entries }, priorities: selected.map((priority, index) => ({ priority, rank: index + 1 })) }); if (typeof data.access_token === "string" && typeof data.refresh_token === "string") { await acceptTokens({ accessToken: data.access_token, refreshToken: data.refresh_token }); navigate("/home", { replace: true }); } else { navigate("/login", { replace: true }); } } });
  const entryIndex = step - 3; const entry = entries[entryIndex];
  const macroStage = step === 0 ? 0 : step === 1 ? 1 : step === 2 ? 2 : step >= 3 && step <= 6 ? 3 : 4;
  const macroFraction = macroStage === 3 ? (entryIndex + 1) / 4 : 1;
  return <AuthLayout hideIntro onBack={() => step ? setStep(step - 1) : navigate("/login")} progress={{ segments: 5, active: macroStage, fraction: macroFraction }}>
    {step === 0 && <><div className="auth-copy"><h1>Your people.<br />Your workspace.</h1><p>Enter the invite code from your People team.</p></div><form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); request.mutate(); }}><Field label="Invite code"><Input value={code} onChange={(e) => setCode(e.target.value)} required autoComplete="off" /></Field><FormError error={request.error} /><Button disabled={!code.trim()} loading={request.isPending}>Next</Button></form><Link className="auth-footer" to="/login">Already have an account? Sign in</Link></>}
    {step === 1 && <><div className="auth-copy"><h1>Check your email.</h1><p>Enter the confirmation code sent to your invited email address.</p></div><form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); verify.mutate(); }}><Field label="Confirmation code"><Input className="otp-input" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} inputMode="numeric" autoComplete="one-time-code" maxLength={6} required /></Field><FormError error={verify.error ?? request.error} /><Button disabled={otp.length !== 6} loading={verify.isPending}>Next</Button></form><Button variant="ghost" loading={request.isPending} onClick={() => request.mutate()}>Send another code</Button></>}
    {step === 2 && <><div className="auth-copy"><h1>Make it yours.</h1><p>A few details to create your account.</p></div><form className="grid grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>{([['first_name','First name'],['last_name','Last name'],['country','Country'],['state','State']] as const).map(([key,label]) => <Field label={label} key={key}><Input value={details[key]} required minLength={key === 'country' ? 2 : 1} maxLength={100} onChange={(e) => setDetails({ ...details, [key]: e.target.value })} /></Field>)}<div className="col-span-2"><Field label="Password" hint="At least 8 characters"><Input type="password" autoComplete="new-password" minLength={8} required value={details.password} onChange={(e) => setDetails({ ...details, password: e.target.value })} /></Field></div><Button className="col-span-2">Next</Button></form></>}
    {entry && <><div className="auth-copy"><p className="eyebrow">A moment for you · {entryIndex + 1} / 4</p><h1>How is your {titleCase(entry.dimension).toLowerCase()}?</h1><p>Choose what feels closest right now.</p></div><div className="mood-grid !mt-0">{moods.map((mood) => <button key={mood.level} className={cn("mood-option !min-h-24 !p-3", entry.level === mood.level && "selected")} aria-pressed={entry.level === mood.level} onClick={() => setEntries(entries.map((item, i) => i === entryIndex ? { ...item, level: mood.level } : item))}><img className="!size-12" src={`/assets/figma/${mood.image}`} alt="" />{mood.label}</button>)}</div><Field label="What is influencing this?"><select className="select" value={entry.reason} onChange={(e) => setEntries(entries.map((item, i) => i === entryIndex ? { ...item, reason: e.target.value as Entry['reason'] } : item))}>{['work','family','breakup','sleep','social','food','love','exams','others'].map((reason) => <option key={reason} value={reason}>{titleCase(reason)}</option>)}</select></Field><Button onClick={() => setStep(step + 1)}>Next</Button></>}
    {step === 7 && <><div className="auth-copy"><p className="eyebrow">Your next chapter</p><h1>What matters to you?</h1><p>Choose up to three priorities, starting with your main focus.</p></div><div className="priority-list !mt-0">{priorities.map((priority) => <button key={priority} aria-pressed={selected.includes(priority)} className={cn("priority-option", selected.includes(priority) && "selected")} onClick={() => setSelected(selected.includes(priority) ? selected.filter((item) => item !== priority) : selected.length < 3 ? [...selected, priority] : selected)}><span>{titleCase(priority)}</span>{selected.includes(priority) && <strong>{selected.indexOf(priority) + 1}</strong>}</button>)}</div><FormError error={register.error} /><Button disabled={!selected.length} loading={register.isPending} onClick={() => register.mutate()}>Create my account</Button></>}
  </AuthLayout>;
}
