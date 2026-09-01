import { ArrowLeft2, Notification } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export function PageHeader({ title, back = false, unread = 0 }: { title: string; back?: boolean; unread?: number }) {
  const navigate = useNavigate();
  return (
    <header className="page-header">
      {back ? <Button size="icon" variant="ghost" aria-label="Go back" onClick={() => navigate(-1)}><ArrowLeft2 color="currentColor" size="22" /></Button> : <span className="size-11" />}
      <h1 className="font-display text-lg font-semibold">{title}</h1>
      <Button size="icon" variant="ghost" aria-label="Notifications" onClick={() => navigate("/notifications")} className="relative">
        <Notification color="currentColor" size="22" />
        {unread > 0 && <span className="notification-dot">{Math.min(unread, 9)}</span>}
      </Button>
    </header>
  );
}
