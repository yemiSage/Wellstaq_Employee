import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { MessageQuestion } from "iconsax-react";
import { toast } from "sonner";
import { employeeApi } from "@/api/services";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/field";

export function SupportScreen() {
  const form = useForm<{ subject: string; message: string; category: string }>({ defaultValues: { subject: "", message: "", category: "general" } });
  const submit = useMutation({ mutationFn: employeeApi.createSupportTicket, onSuccess: () => { toast.success("Your support request is in. We’ll be in touch."); form.reset(); } });
  return <div><PageHeader title="Support" back /><form className="page-pad grid gap-5" onSubmit={form.handleSubmit((values) => submit.mutate(values))}><Card className="support-callout"><MessageQuestion color="currentColor" size="28" variant="TwoTone" /><div><strong>We’re listening</strong><p>Account issues, app feedback, or something that doesn’t feel right—send it here.</p></div></Card><Field label="What is this about?"><select className="select" {...form.register("category")}><option value="general">General help</option><option value="account">Account access</option><option value="privacy">Privacy concern</option><option value="technical">Technical issue</option></select></Field><Field label="Subject"><Input {...form.register("subject", { required: true })} /></Field><Field label="Message"><textarea className="textarea" rows={6} {...form.register("message", { required: true })} /></Field><Button disabled={submit.isPending}>{submit.isPending ? "Sending…" : "Send to support"}</Button></form></div>;
}
