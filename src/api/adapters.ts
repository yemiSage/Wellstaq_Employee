import type { ChallengeItem, CurrentUser, EventItem, NotificationItem, PostItem } from "./domain";

type RecordValue = Record<string, unknown>;
const record = (value: unknown): RecordValue => (value && typeof value === "object" ? (value as RecordValue) : {});
const list = (value: unknown) => (Array.isArray(value) ? value : Array.isArray(record(value).items) ? (record(value).items as unknown[]) : []);

export function mapCurrentUser(value: unknown): CurrentUser {
  const data = record(value);
  return {
    id: String(data.user_id ?? data.id ?? ""),
    email: String(data.email ?? ""),
    firstName: String(data.first_name ?? ""),
    lastName: String(data.last_name ?? ""),
    role: String(data.role ?? "employee"),
    organizationId: String(data.organization_id ?? ""),
    branchId: String(data.branch_id ?? ""),
    departmentId: data.department_id as string | null | undefined,
    location: data.location as string | null | undefined,
    phoneNumber: data.phone_number as string | null | undefined,
    status: String(data.status ?? "active"),
    avatarUrl: data.avatar_url as string | null | undefined,
    permissions: list(data.permissions).map((permission) => {
      const item = record(permission);
      return { name: String(item.name ?? ""), branchId: item.branch_id as string | null | undefined };
    }),
    twoFactorEnabled: Boolean(data.two_fa_enabled),
    twoFactorMethod: data.two_fa_method as string | null | undefined,
  };
}

export function mapEvents(value: unknown): EventItem[] {
  return list(value).map((value) => {
    const data = record(value);
    return {
      id: String(data.id ?? ""),
      title: String(data.title ?? "Untitled event"),
      description: data.description as string | null | undefined,
      imageUrl: data.image_url as string | null | undefined,
      startDate: String(data.start_date ?? ""),
      endDate: data.end_date as string | null | undefined,
      time: data.time as string | undefined,
      status: data.status as string | undefined,
      participantCount: Number(data.participant_count ?? 0),
    };
  });
}

export function mapPosts(value: unknown): PostItem[] {
  return list(value).map((value) => {
    const data = record(value);
    return {
      id: String(data.id ?? ""),
      authorId: String(data.user_id ?? ""),
      content: data.content as string | null | undefined,
      mediaUrl: data.media_url as string | null | undefined,
      mediaType: data.media_type as string | null | undefined,
      likeCount: Number(data.like_count ?? 0),
      commentCount: Number(data.comment_count ?? 0),
      shareCount: Number(data.share_count ?? 0),
      createdAt: String(data.created_at ?? ""),
    };
  });
}

export function mapNotifications(value: unknown): NotificationItem[] {
  return list(value).map((value) => {
    const data = record(value);
    return {
      id: String(data.id ?? ""),
      type: String(data.notification_type ?? "update"),
      body: String(data.body ?? ""),
      imageUrl: data.image_url as string | null | undefined,
      isRead: Boolean(data.is_read),
      createdAt: String(data.created_at ?? ""),
    };
  });
}

export function mapChallenges(value: unknown): ChallengeItem[] {
  return list(value).map((value) => {
    const data = record(value);
    const progress = record(data.progress);
    return {
      id: String(data.id ?? data.wellbeing_challenge_id ?? ""),
      title: String(data.title ?? data.name ?? "Wellbeing challenge"),
      description: data.description as string | null | undefined,
      progress: Number(data.progress_percentage ?? progress.percentage ?? 0),
      participantCount: Number(data.participant_count ?? 0),
    };
  });
}

export const unpack = { record, list };
