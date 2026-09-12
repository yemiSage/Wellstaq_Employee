import { ArrowLeft2, Notification } from "iconsax-react";
import { useNavigate } from "react-router-dom";

// Reuses the exact .header-icon treatment from the home screen so every
// back/notification affordance in the app renders at the same size and style.
export function PageHeader({ title, back = false, unread = 0 }: { title: string; back?: boolean; unread?: number }) {
  const navigate = useNavigate();
  return (
    <header className="page-header">
      {back ? <button type="button" className="header-icon" aria-label="Go back" onClick={() => navigate(-1)}><ArrowLeft2 color="currentColor" size="22" /></button> : <span className="size-11" />}
      <h1 className="font-display text-lg font-semibold">{title}</h1>
      <button type="button" className="header-icon" aria-label="Notifications" onClick={() => navigate("/notifications")}>
        <Notification color="currentColor" size="23" />
        {unread > 0 && <span className="notification-dot">{Math.min(unread, 9)}</span>}
      </button>
    </header>
  );
}
