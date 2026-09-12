import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { BottomNav } from "./bottom-nav";
import { OfflineBanner } from "./ui/states";

export function AppShell() {
  const [online, setOnline] = useState(navigator.onLine);
  const location = useLocation();
  const contentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [location.pathname]);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);
  return (
    <div className="mobile-shell">
      {!online && <OfflineBanner />}
      <main ref={contentRef} className="shell-content"><Outlet /></main>
      <div className="shell-scrim" aria-hidden="true" />
      <BottomNav />
    </div>
  );
}
