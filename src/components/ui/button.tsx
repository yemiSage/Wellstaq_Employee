import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-[38px] min-h-[38px] items-center justify-center gap-2 rounded-2xl px-4 text-sm font-semibold transition-[background,color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[.985] motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-strong",
        secondary: "border border-line bg-white text-ink hover:bg-canvas",
        ghost: "text-ink hover:bg-brand-soft",
        danger: "bg-danger text-white hover:bg-red-700",
      },
      size: { default: "h-[38px]", sm: "h-[38px] px-3", icon: "size-[38px] p-0" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

// Standard pending state for every async button in the app: keep the
// button's width stable (children stay laid out, just hidden) and swap in
// three chasing dots so nothing ever spins forever without feedback.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, loading, disabled, children, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), "relative", className)} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
    {loading && (
      <span className="btn-loading" role="status">
        <span className="btn-loading-dot" /><span className="btn-loading-dot" /><span className="btn-loading-dot" />
        <span className="sr-only">Loading</span>
      </span>
    )}
    <span className={loading ? "invisible" : "contents"}>{children}</span>
  </button>
));
Button.displayName = "Button";
