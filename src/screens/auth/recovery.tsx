import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft2 } from "iconsax-react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { authApi } from "@/api/services";

export function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const form = useForm<{ email: string }>({ resolver: zodResolver(z.object({ email: z.string().email() })), defaultValues: { email: "" }, mode: "onChange" });
  return <AuthLayout><Link className="auth-back" to="/login"><ArrowLeft2 color="currentColor" size="18" />Go back</Link><div className="auth-copy"><h1>{sent ? "Check your inbox." : "Reset your password."}</h1><p>{sent ? "If that account exists, we sent a secure reset link." : "Enter the email attached to your employee account."}</p></div>{sent ? <Button variant="secondary" onClick={() => setSent(false)}>Use another email</Button> : <form className="grid gap-5" onSubmit={form.handleSubmit(async ({ email }) => { await authApi.forgotPassword(email); setSent(true); })}><Field label="Enter your email" error={form.formState.errors.email?.message}><Input type="email" autoComplete="email" inputMode="email" {...form.register("email")} /></Field><Button disabled={!form.formState.isValid || form.formState.isSubmitting}>Send reset link</Button></form>}<Link className="text-center text-sm font-semibold text-brand" to="/login">Back to sign in</Link></AuthLayout>;
}

export function ResetPasswordScreen() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const form = useForm<{ password: string }>({ resolver: zodResolver(z.object({ password: z.string().min(8) })), defaultValues: { password: "" }, mode: "onChange" });
  return <AuthLayout><div className="auth-copy"><p className="eyebrow">Choose carefully</p><h1>Create a new password.</h1><p>Use at least 8 characters and avoid passwords you use elsewhere.</p></div><form className="grid gap-5" onSubmit={form.handleSubmit(async ({ password }) => { await authApi.resetPassword(token, password); toast.success("Password updated. You can sign in now."); })}><Field label="New password" error={form.formState.errors.password?.message}><Input type="password" autoComplete="new-password" {...form.register("password")} /></Field><Button disabled={!token || !form.formState.isValid || form.formState.isSubmitting}>Update password</Button></form><Link className="text-center text-sm font-semibold text-brand" to="/login">Back to sign in</Link></AuthLayout>;
}
