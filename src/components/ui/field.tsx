import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-12 w-full rounded-xl border border-line bg-white px-4 text-[15px] text-ink outline-none placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/15",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-ink">
      <span>{label}</span>
      {children}
      {(error || hint) && <span className={cn("text-xs font-normal", error ? "text-danger" : "text-muted")}>{error ?? hint}</span>}
    </label>
  );
}
