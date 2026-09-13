import { Add } from "iconsax-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Floating "+" for the list screens. `hidden` keeps it mounted but slid away
// (used by Spaces while the composer row is still on screen). Pass `to` to
// navigate, or `onClick` to open an in-place modal instead.
export function Fab({ to, onClick, label, hidden = false }: { to?: string; onClick?: () => void; label: string; hidden?: boolean }) {
  const className = cn("fab", hidden && "is-hidden");
  const icon = <Add size="30" color="currentColor" />;
  if (to) return <Link className={className} to={to} aria-label={label} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined}>{icon}</Link>;
  return <button type="button" className={className} onClick={onClick} aria-label={label} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined}>{icon}</button>;
}
