import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Monitor, Moon, Notification, SecuritySafe, Trash } from "iconsax-react";
import { toast } from "sonner";
import { useAuth } from "@/auth/auth-context";
import { authApi, employeeApi } from "@/api/services";
import { queryKeys } from "@/lib/query-keys";
import { titleCase } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";

export function PreferencesScreen() {
  const { user } = useAuth(); const client = useQueryClient(); const query = useQuery({ queryKey: ["preferences", user?.id], queryFn: employeeApi.preferences });
  const save = useMutation({ mutationFn: employeeApi.updatePreferences, onSuccess: () => { toast.success("Preferences saved."); void client.invalidateQueries({ queryKey: ["preferences"] }); } });
  const data = query.data ?? {};
  return <div><PageHeader title="Preferences" back /><div className="page-pad grid gap-5"><p className="page-lead">Choose the updates you want. Wellbeing responses are never used for marketing.</p>{[["notifications_enabled", "In-app notifications", Notification], ["weekly_digest", "Weekly wellbeing digest", Monitor], ["reduced_motion", "Reduce motion", Moon]].map(([key, label, Icon]) => <label className="preference-row" key={String(key)}><span><Icon color="currentColor" size="21" /><strong>{String(label)}</strong></span><input type="checkbox" defaultChecked={Boolean(data[String(key)])} onChange={(event) => save.mutate({ [String(key)]: event.target.checked })} /></label>)}</div></div>;
}

export function SecurityScreen() {
  const form = useForm<{ current_password: string; new_password: string }>({ defaultValues: { current_password: "", new_password: "" }, mode: "onChange" });
  const change = useMutation({ mutationFn: employeeApi.changePassword, onSuccess: () => { toast.success("Password changed."); form.reset(); } });
  return <div><PageHeader title="Password & 2FA" back /><form className="page-pad grid gap-5" onSubmit={form.handleSubmit((values) => change.mutate(values))}><Card className="security-callout"><SecuritySafe color="currentColor" size="28" variant="TwoTone" /><div><strong>Protect your wellbeing space</strong><p>A unique password and two-factor authentication help keep personal responses private.</p></div></Card><Field label="Current password"><Input type="password" autoComplete="current-password" {...form.register("current_password", { required: true })} /></Field><Field label="New password"><Input type="password" autoComplete="new-password" {...form.register("new_password", { required: true, minLength: 8 })} /></Field><Button disabled={!form.formState.isValid || change.isPending}>Change password</Button><Button type="button" variant="secondary">Set up two-factor authentication</Button></form></div>;
}

export function SessionsScreen() {
  const { user } = useAuth(); const client = useQueryClient(); const query = useQuery({ queryKey: queryKeys.sessions(user?.id), queryFn: authApi.sessions }); const items = Array.isArray(query.data) ? query.data : Array.isArray(query.data?.items) ? query.data.items as Record<string, unknown>[] : [];
  return <div><PageHeader title="Active sessions" back /><div className="page-pad grid gap-4">{items.map((item) => <Card key={String(item.id)} className="session-card"><span><Monitor color="currentColor" size="23" /></span><div><strong>{titleCase(String(item.device_name ?? item.user_agent ?? "Current device"))}</strong><small>{String(item.ip_address ?? "Protected connection")}</small></div><Button size="icon" variant="ghost" className="text-danger" aria-label="Revoke session" onClick={async () => { await authApi.revokeSession(String(item.id)); toast.success("Session revoked."); void client.invalidateQueries({ queryKey: queryKeys.sessions(user?.id) }); }}><Trash color="currentColor" size="19" /></Button></Card>)}</div></div>;
}
