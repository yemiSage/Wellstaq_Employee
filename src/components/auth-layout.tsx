import type { ReactNode } from "react";
import { BrandLogo } from "./brand-logo";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-scene">
      <div className="auth-glow auth-glow-one" />
      <div className="auth-glow auth-glow-two" />
      <BrandLogo className="relative z-10 mt-20 h-12" />
      <section className="auth-sheet">{children}</section>
    </main>
  );
}
