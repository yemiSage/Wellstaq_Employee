import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeSlash, Lock1, Sms } from "iconsax-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { useAuth } from "@/auth/auth-context";
import { env } from "@/lib/env";
import { ApiError } from "@/api/errors";

const schema = z.object({ email: z.string().email("Enter a valid work email"), password: z.string().min(8, "Password must have at least 8 characters") });
type Values = z.infer<typeof schema>;

export function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "" }, mode: "onChange" });
  const destination = (location.state as { from?: string } | null)?.from ?? "/home";

  const submit = form.handleSubmit(async ({ email, password }) => {
    try {
      const result = await signIn(email, password);
      navigate(result === "2fa" ? "/2fa" : destination, { replace: true });
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "We couldn’t sign you in. Check your details and try again.");
    }
  });

  return (
    <AuthLayout>
      <div className="auth-copy auth-copy-login"><h1>Get back into your account</h1><p>Sign in to continue your wellbeing journey.</p></div>
      <form className="grid gap-4" onSubmit={submit} noValidate>
        <Field label="Work email" error={form.formState.errors.email?.message}>
          <div className="input-with-icon"><Sms color="currentColor" size="19" /><Input type="email" autoComplete="email" placeholder="you@company.com" {...form.register("email")} /></div>
        </Field>
        <Field label="Password" error={form.formState.errors.password?.message}>
          <div className="input-with-icon"><Lock1 color="currentColor" size="19" /><Input type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Your password" {...form.register("password")} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeSlash color="currentColor" size="19" /> : <Eye color="currentColor" size="19" />}</button></div>
        </Field>
        <Link className="justify-self-end text-sm font-semibold text-brand" to="/forgot-password">Forgot password?</Link>
        <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>{form.formState.isSubmitting ? "Signing in…" : "Sign in"}</Button>
      </form>
      {env.oauthEnabled && (env.googleClientId || env.appleClientId) && (
        <div className="grid gap-3"><div className="separator"><span>or continue with</span></div>{env.googleClientId && <Button variant="secondary">G&nbsp; Continue with Google</Button>}{env.appleClientId && <Button variant="secondary">●&nbsp; Continue with Apple</Button>}</div>
      )}
      <p className="text-center text-sm text-muted">Have an invite? <Link className="font-semibold text-brand" to="/invite">Set up your account</Link></p>
    </AuthLayout>
  );
}
