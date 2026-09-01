import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BottomNav } from "./bottom-nav";
import { OfflineBanner } from "./ui/states";

export function AppShell() {
  const [online, setOnline] = useState(navigator.onLine);
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
      <main className="shell-content"><Outlet /></main>
      <BottomNav />
    </div>
  );
}
