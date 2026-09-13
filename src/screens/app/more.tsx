import { Activity, ArrowRight2, Cup, Headphone, Lock1, Logout, Notification, Profile, Save2, SecuritySafe, Setting2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/auth-context";
import { initials } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

const groups = [
  {
    title: "Your activity",
    rows: [
      { to: "/movement", icon: Activity, title: "Movement", body: "Log steps and daily activity" },
      { to: "/leaderboard", icon: Cup, title: "Leaderboard", body: "Celebrate your shared progress" },
      { to: "/saved", icon: Save2, title: "Saved posts", body: "Posts you kept for later" },
    ],
  },
  {
    title: "Account",
    rows: [
      { to: "/profile", icon: Profile, title: "Profile", body: "Personal details and avatar" },
      { to: "/notifications", icon: Notification, title: "Notifications", body: "Updates from your community" },
      { to: "/preferences", icon: Setting2, title: "Preferences", body: "Choose how Wellstaq feels" },
      { to: "/security", icon: Lock1, title: "Password & 2FA", body: "Keep your account protected" },
      { to: "/sessions", icon: SecuritySafe, title: "Active sessions", body: "Review signed-in devices" },
    ],
  },
  {
    title: "Support",
    rows: [{ to: "/support", icon: Headphone, title: "Support", body: "Tell us how we can help" }],
  },
];

export function MoreScreen() {
  const { user, signOut } = useAuth(); const navigate = useNavigate();
  return <div><PageHeader title="More" back /><div className="page-pad grid gap-6">
    <button className="more-profile" onClick={() => navigate("/profile")}>
      <span className="avatar xlarge !rounded-full">{user?.avatarUrl ? <img src={user.avatarUrl} alt="" /> : initials(user?.firstName, user?.lastName)}</span>
      <strong>{user?.firstName} {user?.lastName}</strong>
      <small>{user?.email}</small>
    </button>
    {groups.map((group) => (
      <div className="settings-group" key={group.title}>
        <h2 className="settings-group-title">{group.title}</h2>
        <div className="settings-list">
          {group.rows.map(({ to, icon: Icon, title, body }) => (
            <button className="settings-row" key={to} onClick={() => navigate(to)}>
              <span><Icon color="currentColor" size="22" variant="Linear" /></span>
              <span><strong>{title}</strong><small>{body}</small></span>
              <ArrowRight2 color="currentColor" size="18" />
            </button>
          ))}
        </div>
      </div>
    ))}
    <Button variant="ghost" className="text-danger" onClick={() => void signOut()}><Logout color="currentColor" size="20" /> Sign out</Button>
  </div></div>;
}
