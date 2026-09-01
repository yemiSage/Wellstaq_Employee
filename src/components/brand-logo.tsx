import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return <img className={cn("h-10 w-auto", className)} src={`${import.meta.env.BASE_URL}assets/brand/wellstaq-logo.svg`} alt="Wellstaq" />;
}
