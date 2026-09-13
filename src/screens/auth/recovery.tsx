import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import { FormError } from "@/components/screen";
import { authApi } from "@/api/services";

export function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const send = useMutation({ mutationFn: () => authApi.forgotPassword(email.trim()) });
  return <AuthLayout onBack={() => navigate("/login")}><div className="auth-copy"><h1>{send.isSuccess ? "Check your inbox." : "A fresh start."}</h1><p>{send.isSuccess ? "If that account exists, we sent a secure link to reset your password." : "Enter your work email. We’ll send a password reset link."}</p></div>{send.isSuccess ? <Button variant="secondary" onClick={() => send.reset()}>Use another email</Button> : <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); send.mutate(); }}><Field label="Email address"><Input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field><FormError error={send.error} /><Button disabled={!email.trim()} loading={send.isPending}>Send reset link</Button></form>}</AuthLayout>;
}

export function ResetPasswordScreen() {
  const [params] = useSearchParams(); const outside = new URLSearchParams(window.location.search);
  const token = params.get("token") ?? params.get("reset_token") ?? outside.get("token") ?? outside.get("reset_token") ?? "";
  const [password, setPassword] = useState(""); const [confirm, setConfirm] = useState("");
  const save = useMutation({ mutationFn: () => authApi.resetPassword(token, password) });
  return <AuthLayout><div className="auth-copy"><h1>{save.isSuccess ? "You’re all set." : "New password."}</h1><p>{save.isSuccess ? "Your password has been updated. Sign in to continue." : "Use at least 8 characters to protect your account."}</p></div>{!token ? <><p className="form-error" role="alert">This reset link is missing or incomplete.</p><Link to="/forgot-password" className="text-link">Request a new reset link →</Link></> : !save.isSuccess && <form className="grid gap-4" onSubmit={(e) => { e.preventDefault(); save.mutate(); }}><Field label="New password"><Input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} /></Field><Field label="Confirm password" error={confirm && confirm !== password ? "Passwords don’t match" : undefined}><Input type="password" required autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} /></Field><FormError error={save.error} /><Button disabled={password.length < 8 || password !== confirm} loading={save.isPending}>Update password</Button></form>}<Link className="text-link" to="/login">Back to sign in →</Link></AuthLayout>;
}
