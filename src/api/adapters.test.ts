import { describe, expect, it } from "vitest";
import { mapCurrentUser, mapEvents, mapNotifications } from "./adapters";
import { hasPermission } from "@/auth/auth-context";

describe("API domain adapters", () => {
  it("maps snake_case identity and scoped permissions", () => {
    const user = mapCurrentUser({
      user_id: "user-1",
      first_name: "Yemi",
      last_name: "Ade",
      email: "yemi@example.com",
      role: "employee",
      organization_id: "org-1",
      branch_id: "branch-1",
      status: "active",
      permissions: [{ name: "events.create", branch_id: "branch-1" }],
    });
    expect(user).toMatchObject({ id: "user-1", firstName: "Yemi", organizationId: "org-1" });
    expect(hasPermission(user, "events.create", "branch-1")).toBe(true);
    expect(hasPermission(user, "events.create", "branch-2")).toBe(false);
    expect(hasPermission(user, "billing.manage")).toBe(false);
  });

  it("maps paginated employee content", () => {
    expect(mapEvents({ items: [{ id: "1", title: "Reset", start_date: "2026-09-02", participant_count: 8 }] })[0]).toMatchObject({ title: "Reset", startDate: "2026-09-02", participantCount: 8 });
    expect(mapNotifications({ items: [{ id: "n1", notification_type: "event", body: "Starts soon", is_read: false, created_at: "2026-09-01T08:00:00Z" }] })[0]).toMatchObject({ type: "event", isRead: false });
  });
});
