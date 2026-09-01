export const queryKeys = {
  me: ["auth", "me"] as const,
  home: (orgId?: string, branchId?: string, userId?: string) => ["home", orgId, branchId, userId] as const,
  activity: (orgId?: string, userId?: string, filters?: unknown) => ["activity", orgId, userId, filters] as const,
  explore: (orgId?: string, filters?: unknown) => ["explore", orgId, filters] as const,
  events: (orgId?: string, filters?: unknown) => ["events", orgId, filters] as const,
  notifications: (userId?: string, page = 1) => ["notifications", userId, page] as const,
  unreadNotifications: (userId?: string) => ["notifications", "unread", userId] as const,
  profile: (userId?: string) => ["profile", userId] as const,
  sessions: (userId?: string) => ["sessions", userId] as const,
  clubChat: (orgId?: string, clubId?: string) => ["chat", orgId, "club", clubId] as const,
};
