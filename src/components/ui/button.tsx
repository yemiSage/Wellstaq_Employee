import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-semibold transition-[background,color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[.985] motion-reduce:transition-none",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-strong",
        secondary: "border border-line bg-white text-ink hover:bg-canvas",
        ghost: "text-ink hover:bg-brand-soft",
        danger: "bg-danger text-white hover:bg-red-700",
      },
      size: { default: "h-12", sm: "h-11 px-3", icon: "size-11 p-0" },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
