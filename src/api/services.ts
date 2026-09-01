import { apiTransport } from "./transport";
import { mapChallenges, mapCurrentUser, mapEvents, mapNotifications, mapPosts, unpack } from "./adapters";
import type { TokenPair } from "@/auth/auth-vault";
import type { WellbeingEntry } from "./domain";

type LoginResult = { tokens?: TokenPair; challengeToken?: string };

function mapTokens(data: Record<string, unknown>): TokenPair | undefined {
  if (typeof data.access_token !== "string" || typeof data.refresh_token !== "string") return undefined;
  return { accessToken: data.access_token, refreshToken: data.refresh_token };
}

export const authApi = {
  async login(email: string, password: string): Promise<LoginResult> {
    const data = await apiTransport.request<Record<string, unknown>>("/auth/login", {
      method: "POST",
      body: { email, password },
      authenticated: false,
    });
    return {
      tokens: mapTokens(data),
      challengeToken: (data.two_fa_challenge_token ?? data.challenge_token) as string | undefined,
    };
  },
  async verify2fa(challengeToken: string, code: string) {
    const data = await apiTransport.request<Record<string, unknown>>("/auth/2fa/verify", {
      method: "POST",
      body: { two_fa_challenge_token: challengeToken, code },
      authenticated: false,
    });
    const tokens = mapTokens(data);
    if (!tokens) throw new Error("The API did not return a token pair.");
    return tokens;
  },
  me: () => apiTransport.request("/auth/me").then(mapCurrentUser),
  forgotPassword: (email: string) =>
    apiTransport.request("/auth/forgot-password", { method: "POST", body: { email }, authenticated: false }),
  resetPassword: (token: string, password: string) =>
    apiTransport.request("/auth/reset-password", { method: "POST", body: { token, password }, authenticated: false }),
  requestInviteOtp: (inviteCode: string) =>
    apiTransport.request<Record<string, unknown>>("/auth/invite/otp/request", {
      method: "POST",
      body: { invite_code: inviteCode },
      authenticated: false,
    }),
  verifyInviteOtp: (inviteCode: string, code: string) =>
    apiTransport.request<Record<string, unknown>>("/auth/invite/otp/verify", {
      method: "POST",
      body: { invite_code: inviteCode, code },
      authenticated: false,
    }),
  registerInvite: (payload: Record<string, unknown>) =>
    apiTransport.request<Record<string, unknown>>("/auth/register/invite", {
      method: "POST",
      body: payload,
      authenticated: false,
    }),
  async logout(refreshToken?: string) {
    if (refreshToken) {
      await apiTransport.request("/auth/logout", { method: "POST", body: { refresh_token: refreshToken } }).catch(() => undefined);
    }
  },
  sessions: () => apiTransport.request<Record<string, unknown>>("/auth/sessions"),
  revokeSession: (sessionId: string) => apiTransport.request(`/auth/sessions/${sessionId}`, { method: "DELETE" }),
};

export const employeeApi = {
  async home(orgId: string) {
    const [scores, streak, events, challenges, unread] = await Promise.allSettled([
      apiTransport.request<Record<string, unknown>>("/wellbeing/scores/me"),
      apiTransport.request<Record<string, unknown>>("/engagement/checkins/streak"),
      apiTransport.request<Record<string, unknown>>(`/organizations/${orgId}/events?status=upcoming&limit=6`),
      apiTransport.request<Record<string, unknown>>(`/organizations/${orgId}/challenges?status=active&limit=3`),
      apiTransport.request<Record<string, unknown>>("/notifications/unread-count"),
    ]);
    const value = <T,>(result: PromiseSettledResult<T>, fallback: T) => (result.status === "fulfilled" ? result.value : fallback);
    const unreadData = unpack.record(value(unread, {}));
    return {
      scores: unpack.record(value(scores, {})),
      streak: unpack.record(value(streak, {})),
      events: mapEvents(value(events, {})),
      challenges: mapChallenges(value(challenges, {})),
      unreadCount: Number(unreadData.unread_count ?? unreadData.count ?? 0),
    };
  },
  events: (orgId: string, status?: string) =>
    apiTransport.request(`/organizations/${orgId}/events${status ? `?status=${status}` : ""}`).then(mapEvents),
  joinEvent: (orgId: string, eventId: string) =>
    apiTransport.request(`/organizations/${orgId}/events/${eventId}/participants`, { method: "POST", body: {} }),
  leaveEvent: (orgId: string, eventId: string, userId: string) =>
    apiTransport.request(`/organizations/${orgId}/events/${eventId}/participants/${userId}`, { method: "DELETE" }),
  posts: (orgId: string) => apiTransport.request(`/organizations/${orgId}/posts?limit=20`).then(mapPosts),
  likePost: (orgId: string, postId: string) =>
    apiTransport.request(`/organizations/${orgId}/posts/${postId}/like`, { method: "POST", body: {} }),
  unlikePost: (orgId: string, postId: string) =>
    apiTransport.request(`/organizations/${orgId}/posts/${postId}/like`, { method: "DELETE" }),
  stories: (orgId: string) => apiTransport.request<Record<string, unknown>>(`/organizations/${orgId}/stories`),
  clubs: (orgId: string) => apiTransport.request<Record<string, unknown>>(`/organizations/${orgId}/clubs`),
  challenges: (orgId: string) => apiTransport.request(`/organizations/${orgId}/challenges`).then(mapChallenges),
  submitChallengeProgress: (orgId: string, challengeId: string, value: number) =>
    apiTransport.request(`/organizations/${orgId}/challenges/${challengeId}/progress`, {
      method: "POST",
      body: { value },
    }),
  activity: () => apiTransport.request<Record<string, unknown>>("/engagement/checkins?limit=30"),
  activityTrend: (orgId: string) => apiTransport.request<Record<string, unknown>>(`/organizations/${orgId}/activity-log/trend`),
  submitCheckin: (payload: { mood: string; energy_level: string; stress_level: string; notes?: string }) =>
    apiTransport.request("/engagement/checkins", { method: "POST", body: payload }),
  submitBaseline: (entry: WellbeingEntry) =>
    apiTransport.request("/wellbeing/baselines", { method: "POST", body: entry }),
  openSurvey: (orgId: string) =>
    apiTransport.request<Record<string, unknown>>(`/organizations/${orgId}/wellbeing-survey/open-window`),
  submitSurvey: (orgId: string, payload: Record<string, unknown>) =>
    apiTransport.request(`/organizations/${orgId}/wellbeing-survey/responses`, { method: "POST", body: payload }),
  notifications: () => apiTransport.request("/notifications?limit=50").then(mapNotifications),
  markNotificationRead: (id: string) => apiTransport.request(`/notifications/${id}/read`, { method: "PATCH", body: {} }),
  markAllRead: () => apiTransport.request("/notifications/read-all", { method: "PATCH", body: {} }),
  profile: () => apiTransport.request<Record<string, unknown>>("/user-settings/profile"),
  updateProfile: (payload: Record<string, unknown>) =>
    apiTransport.request("/user-settings/profile", { method: "PATCH", body: payload }),
  preferences: () => apiTransport.request<Record<string, unknown>>("/user-settings/preferences"),
  updatePreferences: (payload: Record<string, unknown>) =>
    apiTransport.request("/user-settings/preferences", { method: "PATCH", body: payload }),
  changePassword: (payload: Record<string, unknown>) =>
    apiTransport.request("/user-settings/change-password", { method: "POST", body: payload }),
  createSupportTicket: (payload: Record<string, unknown>) =>
    apiTransport.request("/support/tickets", { method: "POST", body: payload }),
  requestUpload: (payload: Record<string, unknown>) =>
    apiTransport.request<Record<string, unknown>>("/storage/upload-url", { method: "POST", body: payload }),
};
