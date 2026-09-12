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
const ScoresScreen = lazy(() => import("@/screens/app/wellbeing").then(m => ({default:m.ScoresScreen})));
const AssessmentsScreen = lazy(() => import("@/screens/app/wellbeing").then(m => ({default:m.AssessmentsScreen})));
const PrioritiesScreen = lazy(() => import("@/screens/app/wellbeing").then(m => ({default:m.PrioritiesScreen})));
const SurveyScreen = lazy(() => import("@/screens/app/wellbeing").then(m => ({default:m.SurveyScreen})));
const HistoryScreen = lazy(() => import("@/screens/app/wellbeing").then(m => ({default:m.HistoryScreen})));
const ChallengesScreen = lazy(() => import("@/screens/app/challenges").then(m => ({default:m.ChallengesScreen})));
const ChallengeDetailScreen = lazy(() => import("@/screens/app/challenges").then(m => ({default:m.ChallengeDetailScreen})));
const CreateChallengeScreen = lazy(() => import("@/screens/app/challenges").then(m => ({default:m.CreateChallengeScreen})));
const CreateEventScreen = lazy(() => import("@/screens/app/events").then(m => ({default:m.CreateEventScreen})));
const ComposeScreen = lazy(() => import("@/screens/app/community").then(m => ({default:m.ComposeScreen})));
const PostDetailScreen = lazy(() => import("@/screens/app/community").then(m => ({default:m.PostDetailScreen})));
const StoryScreen = lazy(() => import("@/screens/app/community").then(m => ({default:m.StoryScreen})));
const ClubsScreen = lazy(() => import("@/screens/app/clubs").then(m => ({default:m.ClubsScreen})));
const ClubDetailScreen = lazy(() => import("@/screens/app/clubs").then(m => ({default:m.ClubDetailScreen})));
const ChatScreen = lazy(() => import("@/screens/app/clubs").then(m => ({default:m.ChatScreen})));
const MovementScreen = lazy(() => import("@/screens/app/movement").then(m => ({default:m.MovementScreen})));
const LeaderboardScreen = lazy(() => import("@/screens/app/movement").then(m => ({default:m.LeaderboardScreen})));
const WelcomeScreen = lazy(() => import("@/screens/auth/welcome").then(m => ({default:m.WelcomeScreen})));

export function App() {
  return (
    <Suspense fallback={<PageLoader />}><Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
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
        <Route path="/events/new" element={<CreateEventScreen />} />
        <Route path="/scores" element={<ScoresScreen />} />
        <Route path="/movement" element={<MovementScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/assessments" element={<AssessmentsScreen />} />
        <Route path="/priorities" element={<PrioritiesScreen />} />
        <Route path="/survey" element={<SurveyScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/challenges" element={<ChallengesScreen />} />
        <Route path="/challenges/new" element={<CreateChallengeScreen />} />
        <Route path="/challenges/:challengeId" element={<ChallengeDetailScreen />} />
        <Route path="/posts/new" element={<ComposeScreen />} />
        <Route path="/posts/:postId" element={<PostDetailScreen />} />
        <Route path="/stories/new" element={<ComposeScreen story />} />
        <Route path="/stories/:storyId" element={<StoryScreen />} />
        <Route path="/clubs" element={<ClubsScreen />} />
        <Route path="/clubs/:clubId" element={<ClubDetailScreen />} />
        <Route path="/clubs/:clubId/chat" element={<ChatScreen />} />
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
