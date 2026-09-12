import { CloudCross, Refresh, SearchNormal1, ShieldCross } from "iconsax-react";
import { Button } from "./button";

export function PageLoader() {
  return (
    <div className="skeleton-loader" role="status" aria-live="polite" aria-label="Loading">
      <div className="skeleton-block skeleton-title" />
      <div className="skeleton-block skeleton-line" />
      <div className="skeleton-block skeleton-line short" />
      <div className="skeleton-block skeleton-card" />
      <div className="skeleton-block skeleton-card" />
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="home-skeleton" role="status" aria-live="polite" aria-label="Loading">
      <div className="home-skeleton-row" style={{ justifyContent: "space-between" }}>
        <div className="skeleton-block" style={{ width: 46, height: 46, borderRadius: 16 }} />
        <div className="skeleton-block" style={{ width: 44, height: 44, borderRadius: 15 }} />
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        <div className="skeleton-block" style={{ width: "40%", height: 14, borderRadius: 8 }} />
        <div className="skeleton-block" style={{ width: "80%", height: 34, borderRadius: 10 }} />
      </div>
      <div className="home-skeleton-row">
        <div className="skeleton-block" style={{ width: 64, height: 40, borderRadius: 10 }} />
        <div className="skeleton-block" style={{ width: "35%", height: 14, borderRadius: 8 }} />
        <div className="skeleton-block" style={{ width: 46, height: 46, borderRadius: "50%", marginLeft: "auto" }} />
      </div>
      <div className="skeleton-block" style={{ height: 132, borderRadius: 16 }} />
      <div className="home-skeleton-grid">
        <div className="skeleton-block" style={{ height: 130, borderRadius: 16 }} />
        <div className="skeleton-block" style={{ height: 130, borderRadius: 16 }} />
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <div className="skeleton-block" style={{ width: "45%", height: 20, borderRadius: 8 }} />
        <div className="skeleton-block" style={{ height: 74, borderRadius: 25 }} />
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <div className="skeleton-block" style={{ width: "35%", height: 20, borderRadius: 8 }} />
        <div className="skeleton-block" style={{ height: 96, borderRadius: 16 }} />
        <div className="skeleton-block" style={{ height: 96, borderRadius: 16 }} />
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <div className="skeleton-block" style={{ width: "40%", height: 20, borderRadius: 8 }} />
        <div className="skeleton-block" style={{ height: 110, borderRadius: 16 }} />
        <div className="skeleton-block" style={{ height: 110, borderRadius: 16 }} />
      </div>
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
