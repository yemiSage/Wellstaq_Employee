import { apiTransport } from "./transport";
import { mapChallenges, mapCurrentUser, mapEvents, mapNotifications, mapPosts, unpack } from "./adapters";
import type { TokenPair } from "@/auth/auth-vault";
import type { WellbeingEntry } from "./domain";
import type { components } from "./generated/schema";

type Schema = components["schemas"];
const orgPath = (orgId: string) => `/organizations/${encodeURIComponent(orgId)}`;
const idPath = (id: string) => encodeURIComponent(id);

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
    apiTransport.request("/auth/reset-password", { method: "POST", body: { reset_token: token, new_password: password }, authenticated: false }),
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
  registerInvite: (payload: Schema["InviteRegisterRequest"]) =>
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
  sessions: () => apiTransport.request<Schema["SessionListResponse"]>("/auth/sessions"),
  revokeSession: (sessionId: string) => apiTransport.request(`/auth/sessions/${sessionId}`, { method: "DELETE" }),
  setup2fa: (body: Schema["TwoFaSetupRequest"]) => apiTransport.request<Schema["TwoFaSetupResponse"]>("/auth/2fa/setup", { method: "POST", body }),
  confirm2fa: (code: string) => apiTransport.request("/auth/2fa/confirm", { method: "POST", body: { code } }),
  disable2fa: (password: string) => apiTransport.request("/auth/2fa/disable", { method: "POST", body: { password } }),
};

export const employeeApi = {
  async home(orgId: string) {
    const [scores, streak, events, challenges, unread] = await Promise.allSettled([
      apiTransport.request<Record<string, unknown>>("/wellbeing/scores/me"),
      apiTransport.request<Record<string, unknown>>("/engagement/checkins/streak"),
      apiTransport.request<Record<string, unknown>>(`/organizations/${orgId}/events?limit=50`),
      apiTransport.request<Record<string, unknown>>(`/organizations/${orgId}/challenges?status=active&limit=3`),
      apiTransport.request<Record<string, unknown>>("/notifications/unread-count"),
    ]);
    const value = <T,>(result: PromiseSettledResult<T>, fallback: T) => (result.status === "fulfilled" ? result.value : fallback);
    const unreadData = unpack.record(value(unread, {}));
    if ([scores, streak, events, challenges, unread].every((result) => result.status === "rejected")) throw new Error("Your summary is unavailable. Please try again.");
    return {
      partial: [scores, streak, events, challenges, unread].some((result) => result.status === "rejected"),
      scores: unpack.record(value(scores, {})),
      streak: unpack.record(value(streak, {})),
      events: mapEvents(value(events, {})).filter((event) => event.startDate >= new Date().toLocaleDateString("en-CA") && event.status !== "cancelled").slice(0, 6),
      challenges: mapChallenges(value(challenges, {})),
      unreadCount: Number(unreadData.unread_count ?? unreadData.count ?? 0),
    };
  },
  streak: () => apiTransport.request<Record<string, unknown>>("/engagement/checkins/streak"),
  events: (orgId: string) => apiTransport.request(`/organizations/${orgId}/events`).then(mapEvents),
  joinEvent: (orgId: string, eventId: string, userId: string) =>
    apiTransport.request(`/organizations/${orgId}/events/${eventId}/participants`, { method: "POST", body: { user_id: userId, is_invite: false } }),
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
  notificationPage: (offset = 0) => apiTransport.request<Schema["NotificationListResponse"]>(`/notifications?offset=${offset}&limit=20`),
  markNotificationRead: (id: string) => apiTransport.request(`/notifications/${id}/read`, { method: "PATCH", body: {} }),
  markAllRead: () => apiTransport.request("/notifications/read-all", { method: "PATCH", body: {} }),
  profile: () => apiTransport.request<Record<string, unknown>>("/user-settings/profile"),
  updateProfile: (payload: Record<string, unknown>) =>
    apiTransport.request("/user-settings/profile", { method: "PATCH", body: payload }),
  preferences: () => apiTransport.request<Record<string, unknown>>("/user-settings/preferences"),
  updatePreferences: (payload: Schema["PreferencesUpdateRequest"]) =>
    apiTransport.request("/user-settings/preferences", { method: "PATCH", body: payload }),
  changePassword: (payload: Record<string, unknown>) =>
    apiTransport.request("/user-settings/change-password", { method: "POST", body: payload }),
  createSupportTicket: (payload: Schema["TicketCreateRequest"]) =>
    apiTransport.request<Schema["TicketCreateResponse"]>("/support/tickets", { method: "POST", body: payload }),
  requestUpload: (payload: Record<string, unknown>) =>
    apiTransport.request<Record<string, unknown>>("/storage/upload-url", { method: "POST", body: payload }),
  event: (orgId: string, id: string) => apiTransport.request<Schema["EventResponse"]>(`${orgPath(orgId)}/events/${idPath(id)}`),
  eventPage: (orgId: string, offset = 0) => apiTransport.request<Schema["EventListResponse"]>(`${orgPath(orgId)}/events?offset=${offset}&limit=50`),
  participants: (orgId: string, id: string) => apiTransport.request<Schema["EventParticipantsListResponse"]>(`${orgPath(orgId)}/events/${idPath(id)}/participants?limit=200`),
  rsvp: (orgId: string, id: string, userId: string, status: "accepted" | "declined") => apiTransport.request(`${orgPath(orgId)}/events/${idPath(id)}/participants/${idPath(userId)}/status`, { method: "PATCH", body: { status } }),
  attendance: (orgId: string, id: string, userId: string, attended: boolean) => apiTransport.request(`${orgPath(orgId)}/events/${idPath(id)}/participants/${idPath(userId)}/attendance`, { method: "PATCH", body: { attended } }),
  createEvent: (orgId: string, body: Schema["EventCreateRequest"]) => apiTransport.request<Schema["EventResponse"]>(`${orgPath(orgId)}/events`, { method: "POST", body }),
  challengePage: (orgId: string, offset = 0) => apiTransport.request<Schema["ChallengeListResponse"]>(`${orgPath(orgId)}/challenges?offset=${offset}&limit=20`),
  challenge: (orgId: string, id: string) => apiTransport.request<Schema["ChallengeResponse"]>(`${orgPath(orgId)}/challenges/${idPath(id)}`),
  challengeProgress: (orgId: string, id: string) => apiTransport.request<Schema["ParticipantProgressResponse"]>(`${orgPath(orgId)}/challenges/${idPath(id)}/progress/me`),
  joinChallenge: (orgId: string, id: string, leave = false) => apiTransport.request(`${orgPath(orgId)}/challenges/${idPath(id)}/join`, { method: leave ? "DELETE" : "POST" }),
  challengeParticipants: (orgId: string, id: string) => apiTransport.request<Schema["ParticipantListResponse"]>(`${orgPath(orgId)}/challenges/${idPath(id)}/participants?limit=200`),
  createChallenge: (orgId: string, body: Schema["ChallengeCreateRequest"]) => apiTransport.request<Schema["ChallengeResponse"]>(`${orgPath(orgId)}/challenges`, { method: "POST", body }),
  scores: () => apiTransport.request<Schema["WellbeingScoreListResponse"]>("/wellbeing/scores/me"),
  dimensions: () => apiTransport.request<Schema["WellbeingDimensionListResponse"]>("/wellbeing/dimensions"),
  baselines: () => apiTransport.request<Schema["BaselineListResponse"]>("/wellbeing/baselines/me"),
  assessments: () => apiTransport.request<Schema["AssessmentListResponse"]>("/wellbeing/assessments/me"),
  submitAssessment: (body: Schema["AssessmentSubmitRequest"]) => apiTransport.request("/wellbeing/assessments", { method: "POST", body }),
  categories: () => apiTransport.request<Schema["CategoryListResponse"]>("/categories"),
  priorities: () => apiTransport.request<Schema["PriorityListResponse"]>("/engagement/priorities"),
  setPriorities: (priorities: string[]) => apiTransport.request("/engagement/priorities", { method: "PUT", body: { priorities } }),
  survey: (orgId: string) => apiTransport.request<Schema["OpenWindowResponse"] | null>(`${orgPath(orgId)}/wellbeing-survey/open-window`),
  checkinPage: (offset = 0) => apiTransport.request<Schema["CheckinListResponse"]>(`/engagement/checkins?offset=${offset}&limit=20`),
  postPage: (orgId: string, offset = 0, saved = false) => apiTransport.request<Schema["PostListResponse"]>(`${orgPath(orgId)}/posts${saved ? "/saved" : ""}?offset=${offset}&limit=20`),
  post: (orgId: string, id: string) => apiTransport.request<Schema["PostResponse"]>(`${orgPath(orgId)}/posts/${idPath(id)}`),
  async postLikedByMe(orgId: string, id: string, userId: string) {
    let offset = 0;
    while (true) {
      const page = await apiTransport.request<Schema["PostLikersListResponse"]>(`${orgPath(orgId)}/posts/${idPath(id)}/likes?offset=${offset}&limit=200`);
      if (page.items.some((person) => person.user_id === userId)) return true;
      offset += page.items.length;
      if (!page.items.length || offset >= page.total) return false;
    }
  },
  logActivity: (orgId: string, body: Schema["ActivitySubmitRequest"]) => apiTransport.request<Schema["ActivitySubmitResponse"]>(`${orgPath(orgId)}/activity-log`, { method: "POST", body }),
  personalActivity: (orgId: string, offset = 0) => apiTransport.request<Schema["ActivityListResponse"]>(`${orgPath(orgId)}/activities/me?offset=${offset}&limit=20`),
  metricTrend: (orgId: string, metric: string) => apiTransport.request<Schema["ActivityTrendResponse"]>(`${orgPath(orgId)}/activity-log/trend?metric_type=${encodeURIComponent(metric)}&granularity=daily&limit=14`),
  leaderboard: (orgId: string, metric: string, scope: "org" | "branch", period: string) => apiTransport.request<Schema["LeaderboardResponse"]>(`${orgPath(orgId)}/leaderboard/${scope}?metric_type=${encodeURIComponent(metric)}&period_type=${encodeURIComponent(period)}`),
  createPost: (orgId: string, body: Schema["PostCreateRequest"]) => apiTransport.request<Schema["PostResponse"]>(`${orgPath(orgId)}/posts`, { method: "POST", body }),
  comments: (orgId: string, id: string, offset = 0) => apiTransport.request<Schema["CommentListResponse"]>(`${orgPath(orgId)}/posts/${idPath(id)}/comments?offset=${offset}&limit=20`),
  comment: (orgId: string, id: string, content: string, parentId?: string) => apiTransport.request(`${orgPath(orgId)}/posts/${idPath(id)}/comments`, { method: "POST", body: { content, ...(parentId ? { parent_comment_id: parentId } : {}) } }),
  savePost: (orgId: string, id: string, unsave = false) => apiTransport.request(`${orgPath(orgId)}/posts/${idPath(id)}/save`, { method: unsave ? "DELETE" : "POST" }),
  sharePost: (orgId: string, id: string) => apiTransport.request(`${orgPath(orgId)}/posts/${idPath(id)}/share`, { method: "POST", body: {} }),
  storyPage: (orgId: string) => apiTransport.request<Schema["StoryListResponse"]>(`${orgPath(orgId)}/stories`),
  story: (orgId: string, id: string) => apiTransport.request<Schema["StoryResponse"]>(`${orgPath(orgId)}/stories/${idPath(id)}`),
  createStory: (orgId: string, body: Schema["StoryCreateRequest"]) => apiTransport.request<Schema["StoryResponse"]>(`${orgPath(orgId)}/stories`, { method: "POST", body }),
  clubPage: (orgId: string, offset = 0) => apiTransport.request<Schema["ClubListResponse"]>(`${orgPath(orgId)}/clubs?offset=${offset}&limit=20`),
  club: (orgId: string, id: string) => apiTransport.request<Schema["ClubResponse"]>(`${orgPath(orgId)}/clubs/${idPath(id)}`),
  clubMembers: (orgId: string, id: string) => apiTransport.request<Schema["ClubMembersListResponse"]>(`${orgPath(orgId)}/clubs/${idPath(id)}/members?limit=200`),
  clubMembership: (orgId: string, id: string, userId: string, leave = false) => apiTransport.request(`${orgPath(orgId)}/clubs/${idPath(id)}/members/${idPath(userId)}${leave ? "/leave" : ""}`, { method: leave ? "DELETE" : "PUT" }),
  messages: (orgId: string, type: string, id: string, offset = 0) => apiTransport.request<Schema["MessageListResponse"]>(`${orgPath(orgId)}/conversations/${idPath(type)}/${idPath(id)}/messages?offset=${offset}&limit=50`),
  sendMessage: (orgId: string, type: string, id: string, content: string) => apiTransport.request(`${orgPath(orgId)}/conversations/${idPath(type)}/${idPath(id)}/messages`, { method: "POST", body: { content } }),
  avatar: (mediaUrl: string) => apiTransport.request("/user-settings/avatar", { method: "PUT", body: { media_url: mediaUrl } }),
  async upload(file: File, domain: string) {
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) throw new Error("Choose an image or video.");
    if (file.size > 20 * 1024 * 1024) throw new Error("Choose a file smaller than 20 MB.");
    const data = await apiTransport.request<Schema["UploadResponse"]>("/storage/upload-url", { method: "POST", body: { domain, content_type: file.type } });
    const response = await fetch(data.upload_url, { method: "PUT", headers: { "Content-Type": data.content_type }, body: file, signal: AbortSignal.timeout(60000) });
    if (!response.ok) throw new Error("Upload failed. Please try again.");
    return data.media_url;
  },
};
