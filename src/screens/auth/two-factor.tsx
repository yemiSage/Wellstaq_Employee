import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { useAuth } from "@/auth/auth-context";

const schema = z.object({ code: z.string().min(6, "Enter the 6–8 digit code").max(8) });

export function TwoFactorScreen() {
  const { challengeToken, verify2fa } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { code: "" }, mode: "onChange" });
  if (!challengeToken) return <Navigate to="/login" replace />;
  return (
    <AuthLayout>
      <div className="auth-copy"><p className="eyebrow">One more step</p><h1>Verify it’s you.</h1><p>Enter the code from your authenticator, email, or phone.</p></div>
      <form className="grid gap-5" onSubmit={form.handleSubmit(async ({ code }) => { try { await verify2fa(code); navigate("/home", { replace: true }); } catch { toast.error("That code didn’t work. Try a fresh code."); } })}>
        <Field label="Verification code" error={form.formState.errors.code?.message}><Input className="otp-input" inputMode="numeric" autoComplete="one-time-code" maxLength={8} {...form.register("code")} /></Field>
        <Button disabled={!form.formState.isValid || form.formState.isSubmitting}>{form.formState.isSubmitting ? "Verifying…" : "Verify and continue"}</Button>
      </form>
    </AuthLayout>
  );
}
