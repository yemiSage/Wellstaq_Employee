export type PermissionGrant = { name: string; branchId?: string | null };

export type CurrentUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  organizationId: string;
  branchId: string;
  departmentId?: string | null;
  location?: string | null;
  phoneNumber?: string | null;
  avatarUrl?: string | null;
  status: string;
  permissions: PermissionGrant[];
  twoFactorEnabled: boolean;
  twoFactorMethod?: string | null;
};

export type WellbeingLevel = "good" | "bad" | "stressed" | "tired";
export type WellbeingDimension = "mood" | "stress" | "energy" | "work_life_balance";

export type WellbeingEntry = {
  dimension: WellbeingDimension;
  level: WellbeingLevel;
  reason?: string;
};

export type EventItem = {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  startDate: string;
  endDate?: string | null;
  time?: string;
  status?: string;
  participantCount: number;
};

export type PostItem = {
  id: string;
  authorId: string;
  content?: string | null;
  mediaUrl?: string | null;
  mediaType?: string | null;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
};

export type NotificationItem = {
  id: string;
  type: string;
  body: string;
  imageUrl?: string | null;
  isRead: boolean;
  createdAt: string;
};

export type ChallengeItem = {
  id: string;
  title: string;
  description?: string | null;
  progress?: number;
  participantCount?: number;
};
