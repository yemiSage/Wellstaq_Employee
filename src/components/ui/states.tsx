import { CloudCross, Refresh, SearchNormal1, ShieldCross } from "iconsax-react";
import { Button } from "./button";

export function PageLoader() {
  return (
    <div className="grid min-h-72 place-items-center" aria-live="polite">
      <div className="wellstaq-spinner" aria-label="Loading" />
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="grid place-items-center gap-3 rounded-3xl border border-dashed border-line bg-white p-8 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><SearchNormal1 color="currentColor" size="24" /></span>
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="max-w-xs text-sm leading-6 text-muted">{body}</p>
      {action}
    </div>
  );
}

export function ErrorState({ retry, message = "We couldn’t load this right now." }: { retry?: () => void; message?: string }) {
  return (
    <div className="grid place-items-center gap-3 rounded-3xl bg-danger-soft p-7 text-center">
      <ShieldCross size="28" color="#b42318" variant="TwoTone" />
      <p className="text-sm text-danger">{message}</p>
      {retry && <Button variant="secondary" size="sm" onClick={retry}><Refresh color="currentColor" size="18" /> Try again</Button>}
    </div>
  );
}

export function OfflineBanner() {
  return (
    <div className="offline-banner" role="status">
      <CloudCross color="currentColor" size="16" /> You’re offline. Your private wellbeing data stays on the server.
    </div>
  );
}
