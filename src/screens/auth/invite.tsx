import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft2 } from "iconsax-react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { authApi } from "@/api/services";
import { useAuth } from "@/auth/auth-context";
import type { TokenPair } from "@/auth/auth-vault";
import type { WellbeingDimension, WellbeingLevel } from "@/api/domain";
import { cn, titleCase } from "@/lib/utils";

const moods: { level: WellbeingLevel; label: string; image: string }[] = [
  { level: "good", label: "Great", image: "mood-happy.png" },
  { level: "bad", label: "Low", image: "mood-tired.png" },
  { level: "stressed", label: "Stressed", image: "mood-stressed.png" },
  { level: "tired", label: "Tired", image: "mood-infuriated.png" },
];
const dimensions: WellbeingDimension[] = ["mood", "stress", "energy", "work_life_balance"];
const priorities = ["reduce_stress", "build_energy", "improve_balance", "save_better", "stay_active", "feel_connected"];
type Details = { firstName: string; lastName: string; password: string; country: string; state: string };

export function InviteScreen() {
  const [step, setStep] = useState(0);
  const [inviteCode, setInviteCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [details, setDetails] = useState<Details | null>(null);
  const [dimension, setDimension] = useState(0);
  const [baseline, setBaseline] = useState<Record<WellbeingDimension, WellbeingLevel>>({ mood: "good", stress: "good", energy: "good", work_life_balance: "good" });
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const { acceptTokens } = useAuth();
  const codeForm = useForm<{ inviteCode: string }>({ resolver: zodResolver(z.object({ inviteCode: z.string().min(2) })), defaultValues: { inviteCode: "" }, mode: "onChange" });
  const otpForm = useForm<{ code: string }>({ resolver: zodResolver(z.object({ code: z.string().length(6) })), defaultValues: { code: "" }, mode: "onChange" });
  const detailsForm = useForm<Details>({ resolver: zodResolver(z.object({ firstName: z.string().min(1), lastName: z.string().min(1), password: z.string().min(8), country: z.string().min(2), state: z.string().min(1) })), defaultValues: { firstName: "", lastName: "", password: "", country: "Nigeria", state: "Lagos" }, mode: "onChange" });

  if (step === 0) return <AuthLayout><Link className="auth-back" to="/login"><ArrowLeft2 color="currentColor" size="18" />Go back</Link><div className="auth-copy"><h1>Let’s find your workspace.</h1><p>Use the invite code shared by your People team.</p></div><form className="grid gap-5" onSubmit={codeForm.handleSubmit(async ({ inviteCode: value }) => { await authApi.requestInviteOtp(value); setInviteCode(value); setStep(1); })}><Field label="Invite code" error={codeForm.formState.errors.inviteCode?.message}><Input autoCapitalize="characters" {...codeForm.register("inviteCode")} /></Field><Button disabled={!codeForm.formState.isValid || codeForm.formState.isSubmitting}>Confirm code</Button></form></AuthLayout>;
  if (step === 1) return <AuthLayout><div className="auth-copy"><p className="eyebrow">Verify invitation</p><h1>Check your email.</h1><p>Enter the 6-digit code we sent to the invited address.</p></div><form className="grid gap-5" onSubmit={otpForm.handleSubmit(async ({ code }) => { const response = await authApi.verifyInviteOtp(inviteCode, code); setVerificationToken(String(response.invite_verification_token ?? response.verification_token ?? "")); setStep(2); })}><Field label="Verification code" error={otpForm.formState.errors.code?.message}><Input className="otp-input" inputMode="numeric" maxLength={6} {...otpForm.register("code")} /></Field><Button disabled={!otpForm.formState.isValid || otpForm.formState.isSubmitting}>Verify invitation</Button></form></AuthLayout>;
  if (step === 2) return <AuthLayout><div className="auth-copy"><p className="eyebrow">Your details</p><h1>Make it yours.</h1><p>This information keeps your account personal and secure.</p></div><form className="grid grid-cols-2 gap-4" onSubmit={detailsForm.handleSubmit((values) => { setDetails(values); setStep(3); })}><Field label="First name" error={detailsForm.formState.errors.firstName?.message}><Input autoComplete="given-name" {...detailsForm.register("firstName")} /></Field><Field label="Last name" error={detailsForm.formState.errors.lastName?.message}><Input autoComplete="family-name" {...detailsForm.register("lastName")} /></Field><div className="col-span-2"><Field label="Password" error={detailsForm.formState.errors.password?.message}><Input type="password" autoComplete="new-password" {...detailsForm.register("password")} /></Field></div><Field label="Country"><Input {...detailsForm.register("country")} /></Field><Field label="State"><Input {...detailsForm.register("state")} /></Field><Button className="col-span-2" disabled={!detailsForm.formState.isValid || detailsForm.formState.isSubmitting}>Continue to wellbeing</Button></form></AuthLayout>;
  if (step === 3) {
    const currentDimension = dimensions[dimension];
    return <main className="onboarding-screen"><div className="onboarding-top"><p className="eyebrow">Baseline {dimension + 1} of 4</p><div className="step-track"><span style={{ width: `${((dimension + 1) / 4) * 100}%` }} /></div><h1>How is your {titleCase(currentDimension).toLowerCase()} lately?</h1><p>There’s no right answer. This is private and helps Wellstaq personalise your experience.</p></div><div className="mood-grid">{moods.map((mood) => <button key={mood.level} className={cn("mood-option", baseline[currentDimension] === mood.level && "selected")} onClick={() => setBaseline((value) => ({ ...value, [currentDimension]: mood.level }))}><img src={`/assets/figma/${mood.image}`} alt="" /><span>{mood.label}</span></button>)}</div><div className="sticky-action"><Button className="w-full" onClick={() => dimension < 3 ? setDimension(dimension + 1) : setStep(4)}>{dimension < 3 ? "Next check-in" : "Choose priorities"}</Button></div></main>;
  }
  return <main className="onboarding-screen"><div className="onboarding-top"><p className="eyebrow">Nearly there</p><h1>What would you like to improve first?</h1><p>Choose up to three. Your order becomes your personal wellbeing focus.</p></div><div className="priority-list">{priorities.map((priority) => { const rank = selectedPriorities.indexOf(priority); return <button key={priority} className={cn("priority-option", rank >= 0 && "selected")} onClick={() => setSelectedPriorities((value) => value.includes(priority) ? value.filter((item) => item !== priority) : value.length < 3 ? [...value, priority] : value)}><span>{titleCase(priority)}</span>{rank >= 0 && <strong>{rank + 1}</strong>}</button>; })}</div><div className="sticky-action"><Button className="w-full" disabled={!details || !verificationToken || selectedPriorities.length === 0} onClick={async () => { if (!details) return; const response = await authApi.registerInvite({ invite_verification_token: verificationToken, first_name: details.firstName, last_name: details.lastName, password: details.password, country: details.country, state: details.state, baseline: { entries: dimensions.map((item) => ({ dimension: item, level: baseline[item] })) }, priorities: selectedPriorities.map((priority, rank) => ({ priority, rank: rank + 1 })) }); const tokens = response as unknown as { access_token?: string; refresh_token?: string; tokens?: { access_token: string; refresh_token: string } }; const pair = (tokens.access_token && tokens.refresh_token ? { accessToken: tokens.access_token, refreshToken: tokens.refresh_token } : tokens.tokens ? { accessToken: tokens.tokens.access_token, refreshToken: tokens.tokens.refresh_token } : null) as TokenPair | null; if (pair) await acceptTokens(pair); else toast.success("Account created. Sign in to continue."); }}>Create my account</Button></div></main>;
}
