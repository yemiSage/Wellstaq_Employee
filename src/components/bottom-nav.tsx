import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", label: "Home" },
  { to: "/activity", label: "Activity" },
  { to: "/explore", label: "Explore" },
  { to: "/events", label: "Events" },
  { to: "/more", label: "More" },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(({ to, label }) => (
        <NavLink key={to} to={to} className={({ isActive }) => cn("bottom-nav-link", isActive && "active")}>
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
