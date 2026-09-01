import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Notification as NotificationIcon, TickCircle } from "iconsax-react";
import { useAuth } from "@/auth/auth-context";
import { employeeApi } from "@/api/services";
import { queryKeys } from "@/lib/query-keys";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, PageLoader } from "@/components/ui/states";

export function NotificationsScreen() {
  const { user } = useAuth(); const client = useQueryClient();
  const query = useQuery({ queryKey: queryKeys.notifications(user?.id), queryFn: employeeApi.notifications, refetchInterval: 60_000, refetchIntervalInBackground: false });
  const allRead = useMutation({ mutationFn: employeeApi.markAllRead, onSuccess: () => client.invalidateQueries({ queryKey: ["notifications"] }) });
  return <div><PageHeader title="Notifications" back /><div className="page-pad grid gap-5"><div className="section-heading"><div><p className="eyebrow">Stay in the loop</p><h2>Recent updates</h2></div>{query.data?.some((item) => !item.isRead) && <Button variant="ghost" size="sm" onClick={() => allRead.mutate()}><TickCircle color="currentColor" size="17" /> Mark all read</Button>}</div>{query.isLoading ? <PageLoader /> : query.isError ? <ErrorState retry={() => void query.refetch()} /> : query.data?.length ? <div className="notification-list">{query.data.map((item) => <button key={item.id} className={cn("notification-item", !item.isRead && "unread")} onClick={async () => { if (!item.isRead) await employeeApi.markNotificationRead(item.id); void client.invalidateQueries({ queryKey: ["notifications"] }); }}><span>{item.imageUrl ? <img src={item.imageUrl} alt="" /> : <NotificationIcon color="currentColor" size="20" />}</span><span><strong>{item.body}</strong><small>{new Date(item.createdAt).toLocaleString()}</small></span></button>)}</div> : <EmptyState title="All caught up" body="Challenge, event and community updates will land here." />}</div></div>;
}
