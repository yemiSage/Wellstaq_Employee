import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera } from "iconsax-react";
import { toast } from "sonner";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { queryKeys } from "@/lib/query-keys";
import { initials } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

type Values = { first_name: string; last_name: string; country: string; state: string };
export function ProfileScreen() {
  const { user, refreshMe } = useAuth(); const client = useQueryClient(); const form = useForm<Values>();
  const query = useQuery({ queryKey: queryKeys.profile(user?.id), queryFn: employeeApi.profile });
  useEffect(() => { if (query.data) form.reset({ first_name: String(query.data.first_name ?? ""), last_name: String(query.data.last_name ?? ""), country: String(query.data.country ?? ""), state: String(query.data.state ?? "") }); }, [form, query.data]);
  const save = useMutation({ mutationFn: employeeApi.updateProfile, onSuccess: async () => { toast.success("Profile updated."); await client.invalidateQueries({ queryKey: queryKeys.profile(user?.id) }); await refreshMe(); } });
  return <div><PageHeader title="Profile" back /><form className="page-pad grid gap-5" onSubmit={form.handleSubmit((values) => save.mutate(values))}><div className="profile-avatar-editor"><span className="avatar xlarge">{user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials(user?.firstName, user?.lastName)}</span><button type="button" aria-label="Change avatar"><Camera color="currentColor" size="19" /></button></div><Field label="First name"><Input {...form.register("first_name")} /></Field><Field label="Last name"><Input {...form.register("last_name")} /></Field><Field label="Email"><Input value={user?.email ?? ""} disabled /></Field><div className="grid grid-cols-2 gap-4"><Field label="Country"><Input {...form.register("country")} /></Field><Field label="State"><Input {...form.register("state")} /></Field></div><Button disabled={save.isPending}>{save.isPending ? "Saving…" : "Save profile"}</Button></form></div>;
}
