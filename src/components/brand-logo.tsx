import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return <img className={cn("h-10 w-auto", className)} src="/assets/figma/logo-compact.png" alt="Wellstaq" />;
}
