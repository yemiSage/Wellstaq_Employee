import { ArrowRight2, Headphone, Lock1, Logout, Notification, Profile, SecuritySafe, Setting2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/auth-context";
import { initials } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

const rows = [
  { to: "/movement", icon: Profile, title: "Movement", body: "Log steps and daily activity" },
  { to: "/leaderboard", icon: Profile, title: "Leaderboard", body: "Celebrate your shared progress" },
  { to: "/profile", icon: Profile, title: "Profile", body: "Personal details and avatar" },
  { to: "/notifications", icon: Notification, title: "Notifications", body: "Updates from your community" },
  { to: "/preferences", icon: Setting2, title: "Preferences", body: "Choose how Wellstaq feels" },
  { to: "/security", icon: Lock1, title: "Password & 2FA", body: "Keep your account protected" },
  { to: "/sessions", icon: SecuritySafe, title: "Active sessions", body: "Review signed-in devices" },
  { to: "/support", icon: Headphone, title: "Support", body: "Tell us how we can help" },
];

export function MoreScreen() {
  const { user, signOut } = useAuth(); const navigate = useNavigate();
  return <div><PageHeader title="More" /><div className="page-pad grid gap-6"><button className="profile-summary" onClick={() => navigate("/profile")}><span className="avatar large">{user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials(user?.firstName, user?.lastName)}</span><span><strong>{user?.firstName} {user?.lastName}</strong><small>{user?.email}</small><em>{user?.role}</em></span><ArrowRight2 color="currentColor" size="20" /></button><div className="settings-list">{rows.map(({ to, icon: Icon, title, body }) => <button className="settings-row" key={to} onClick={() => navigate(to)}><span><Icon color="currentColor" size="21" /></span><span><strong>{title}</strong><small>{body}</small></span><ArrowRight2 color="currentColor" size="19" /></button>)}</div><Button variant="secondary" className="text-danger" onClick={() => void signOut()}><Logout color="currentColor" size="20" /> Sign out</Button><p className="text-center text-xs text-muted">Wellstaq Employee · PWA preview</p></div></div>;
}
