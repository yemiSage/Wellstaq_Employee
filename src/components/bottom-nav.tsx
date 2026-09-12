import { Activity, Calendar, Discover, ElementPlus, Home2 } from "iconsax-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", label: "Home", icon: Home2 },
  { to: "/activity", label: "Activity", icon: Activity },
  { to: "/explore", label: "Spaces", icon: Discover },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/more", label: "More", icon: ElementPlus },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => cn("bottom-nav-link", isActive && "active")}>
          {({ isActive }) => <><Icon color="currentColor" size="22" variant={isActive ? "Bold" : "Linear"} /><span>{label}</span></>}
        </NavLink>
      ))}
    </nav>
  );
}
