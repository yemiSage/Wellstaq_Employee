import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/auth/auth-context";
import { PwaUpdater } from "@/components/pwa-updater";
import { App } from "./app";
import { Appearance } from "./components/appearance";
import "./styles.css";
import "./mobile-design.css";

const chunkReloadKey = "wellstaq:last-chunk-reload";

// Email links may use a normal path; Capacitor and this PWA route with hashes.
if (!window.location.hash && ["/reset-password", "/invite", "/login", "/forgot-password"].includes(window.location.pathname)) {
  window.history.replaceState(null, "", `/#${window.location.pathname}${window.location.search}`);
}

// A newly activated PWA version can briefly meet an older page shell whose
// hashed lazy chunks no longer exist on the production alias. Recover once
// with the latest index instead of leaving the user on an empty screen.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  const now = Date.now();
  let lastReload = 0;

  try {
    lastReload = Number(window.sessionStorage.getItem(chunkReloadKey) ?? 0);
    window.sessionStorage.setItem(chunkReloadKey, String(now));
  } catch {
    // Reload recovery still works when storage is unavailable.
  }

  if (now - lastReload > 10_000) window.location.reload();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: (count, error) => count < 2 && (error as { retryable?: boolean }).retryable === true, refetchOnWindowFocus: true },
    mutations: { retry: false },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AuthProvider><Appearance /><App /><PwaUpdater /></AuthProvider>
      </HashRouter>
      <Toaster position="top-center" richColors closeButton />
    </QueryClientProvider>
  </React.StrictMode>,
);
