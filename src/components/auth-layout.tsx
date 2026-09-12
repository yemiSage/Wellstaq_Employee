import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ArrowLeft2, CloseCircle } from "iconsax-react";
import { BrandLogo } from "./brand-logo";
import { motion, useReducedMotion } from "motion/react";

export interface AuthProgress {
  segments: number;
  /** Index of the segment currently filling. Segments before it render fully filled. */
  active: number;
  /** Fill amount (0-1) for the active segment; earlier segments are always 1. */
  fraction?: number;
}

export function AuthLayout({
  children,
  onBack,
  onClose,
  progress,
  hideIntro,
}: {
  children: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  progress?: AuthProgress;
  hideIntro?: boolean;
}) {
  const location = useLocation();
  const sceneRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (sceneRef.current) sceneRef.current.scrollTop = 0;
  }, [location.pathname]);

  return (
    <main ref={sceneRef} className="auth-scene">
      <div className="auth-art" aria-hidden="true" />
      <div className="auth-glow auth-glow-one" aria-hidden="true" />
      <div className="auth-glow auth-glow-two" aria-hidden="true" />
      {(onBack || onClose || progress) && (
        <div className="auth-top">
          <div className="auth-nav-row">
            {onBack ? <button type="button" className="auth-nav-btn" onClick={onBack} aria-label="Back"><ArrowLeft2 size="18" color="currentColor" /></button> : <span className="auth-nav-spacer" aria-hidden="true" />}
            {onClose ? <button type="button" className="auth-nav-btn" onClick={onClose} aria-label="Close"><CloseCircle size="18" color="currentColor" /></button> : <span className="auth-nav-spacer" aria-hidden="true" />}
          </div>
          {progress && (
            <div className="auth-progress" role="progressbar" aria-valuenow={Math.round(((progress.active + (progress.fraction ?? 1)) / progress.segments) * 100)} aria-valuemin={0} aria-valuemax={100}>
              {Array.from({ length: progress.segments }).map((_, index) => (
                <span className="auth-progress-segment" key={index}>
                  <span className="auth-progress-fill" style={{ width: `${Math.round((index < progress.active ? 1 : index === progress.active ? (progress.fraction ?? 1) : 0) * 100)}%` }} />
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      {!hideIntro && <BrandLogo className="auth-brand" />}
      {!hideIntro && (
        <motion.div
          className="auth-scene-copy"
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span>A little space.</span><span>For a better you.</span>
        </motion.div>
      )}
      <motion.section key={location.pathname} className="auth-sheet" initial={reducedMotion ? false : { opacity: 0, y: 36, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ type: "spring", stiffness: 180, damping: 25 }}><div className="sheet-handle" aria-hidden="true" />{children}</motion.section>
    </main>
  );
}
