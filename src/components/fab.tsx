import { Add } from "iconsax-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Floating "+" for the list screens. `hidden` keeps it mounted but slid away
// (used by Spaces while the composer row is still on screen).
export function Fab({ to, label, hidden = false }: { to: string; label: string; hidden?: boolean }) {
  return <Link className={cn("fab", hidden && "is-hidden")} to={to} aria-label={label} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined}><Add size="30" color="currentColor" /></Link>;
}
