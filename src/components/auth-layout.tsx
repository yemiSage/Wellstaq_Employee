import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { BrandLogo } from "./brand-logo";

export function AuthLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const sceneRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (sceneRef.current) sceneRef.current.scrollTop = 0;
  }, [location.pathname]);

  return (
    <main ref={sceneRef} className="auth-scene">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />
      <BrandLogo className="auth-brand" />
      <section className="auth-sheet">{children}</section>
    </main>
  );
}
