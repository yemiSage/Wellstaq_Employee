import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/app-shell";
import { ProtectedRoute } from "@/components/protected-route";
import { PageLoader } from "@/components/ui/states";

const LoginScreen = lazy(() => import("@/screens/auth/login").then((module) => ({ default: module.LoginScreen })));
const TwoFactorScreen = lazy(() => import("@/screens/auth/two-factor").then((module) => ({ default: module.TwoFactorScreen })));
const ForgotPasswordScreen = lazy(() => import("@/screens/auth/recovery").then((module) => ({ default: module.ForgotPasswordScreen })));
const ResetPasswordScreen = lazy(() => import("@/screens/auth/recovery").then((module) => ({ default: module.ResetPasswordScreen })));
const InviteScreen = lazy(() => import("@/screens/auth/invite").then((module) => ({ default: module.InviteScreen })));
const HomeScreen = lazy(() => import("@/screens/app/home").then((module) => ({ default: module.HomeScreen })));
const ActivityScreen = lazy(() => import("@/screens/app/activity").then((module) => ({ default: module.ActivityScreen })));
const ExploreScreen = lazy(() => import("@/screens/app/explore").then((module) => ({ default: module.ExploreScreen })));
const EventsScreen = lazy(() => import("@/screens/app/events").then((module) => ({ default: module.EventsScreen })));
const EventDetailScreen = lazy(() => import("@/screens/app/events").then((module) => ({ default: module.EventDetailScreen })));
const MoreScreen = lazy(() => import("@/screens/app/more").then((module) => ({ default: module.MoreScreen })));
const NotificationsScreen = lazy(() => import("@/screens/app/notifications").then((module) => ({ default: module.NotificationsScreen })));
const ProfileScreen = lazy(() => import("@/screens/app/profile").then((module) => ({ default: module.ProfileScreen })));
const PreferencesScreen = lazy(() => import("@/screens/app/settings").then((module) => ({ default: module.PreferencesScreen })));
const SecurityScreen = lazy(() => import("@/screens/app/settings").then((module) => ({ default: module.SecurityScreen })));
const SessionsScreen = lazy(() => import("@/screens/app/settings").then((module) => ({ default: module.SessionsScreen })));
const SupportScreen = lazy(() => import("@/screens/app/support").then((module) => ({ default: module.SupportScreen })));

export function App() {
  return (
    <Suspense fallback={<PageLoader />}><Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/2fa" element={<TwoFactorScreen />} />
      <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="/invite" element={<InviteScreen />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/activity" element={<ActivityScreen />} />
          <Route path="/explore" element={<ExploreScreen />} />
          <Route path="/events" element={<EventsScreen />} />
          <Route path="/more" element={<MoreScreen />} />
        </Route>
        <Route path="/events/:eventId" element={<EventDetailScreen />} />
        <Route path="/notifications" element={<NotificationsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/preferences" element={<PreferencesScreen />} />
        <Route path="/security" element={<SecurityScreen />} />
        <Route path="/sessions" element={<SessionsScreen />} />
        <Route path="/support" element={<SupportScreen />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes></Suspense>
  );
}
