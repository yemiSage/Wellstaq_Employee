import { describe, expect, it } from "vitest";
import { apiTransport } from "./transport";
import { authApi, employeeApi } from "./services";

describe("employee feature adapters with MSW", () => {
  it("aggregates a fault-tolerant employee home response", async () => {
    apiTransport.setTokens({ accessToken: "access", refreshToken: "refresh" });
    const result = await employeeApi.home("org-1");
    expect(result.unreadCount).toBe(3);
    expect(result.events[0]).toMatchObject({ id: "event-1", title: "Mindful reset" });
    expect(result.challenges[0]).toMatchObject({ id: "challenge-1", progress: 50 });
  });

  it("covers login and representative employee mutations", async () => {
    const result = await authApi.login("yemi@wellstaq.test", "wellstaq-demo");
    expect(result.tokens?.refreshToken).toBe("refresh");
    await expect(employeeApi.submitCheckin({ mood: "good", energy_level: "good", stress_level: "good" })).resolves.toBeTruthy();
    await expect(employeeApi.joinEvent("org-1", "event-1", "user-1")).resolves.toBeTruthy();
    await expect(employeeApi.createSupportTicket({ name: "Yemi Ade", email: "yemi@wellstaq.test", subject: "Help", message: "Please help with my account" })).resolves.toBeTruthy();
  });
});
