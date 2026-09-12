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
import { ApiError } from "@/api/errors";

const schema = z.object({ email: z.string().email("Enter a valid email, example@gmail.com"), password: z.string().min(8, "Password must have at least 8 characters") });
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
    <AuthLayout onClose={() => navigate("/welcome")}>
      <div className="auth-copy auth-copy-login"><h1>Welcome back.</h1><p>Enter your details below to get back into your account.</p></div>
      <form className="grid gap-4" onSubmit={submit} noValidate>
        <Field label="Email Address" error={form.formState.errors.email?.message}>
          <div className="input-with-icon"><Sms color="currentColor" size="19" /><Input type="email" autoComplete="email" inputMode="email" placeholder="yemi@example.com" {...form.register("email")} /></div>
        </Field>
        <Field label={<span className="field-label-row"><span>Password</span><Link className="auth-support-link" to="/forgot-password">Forgot password?</Link></span>} error={form.formState.errors.password?.message}>
          <div className="input-with-icon"><Lock1 color="currentColor" size="19" /><Input type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Your password" {...form.register("password")} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeSlash color="currentColor" size="19" /> : <Eye color="currentColor" size="19" />}</button></div>
        </Field>
        <Button type="submit" loading={form.formState.isSubmitting} disabled={!form.formState.isValid}>Sign in</Button>
      </form>
      <p className="auth-footer">New to Wellstaq? <Link to="/invite">Join your workspace</Link></p>
    </AuthLayout>
  );
}
