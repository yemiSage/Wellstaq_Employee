import { http, HttpResponse } from "msw";

const base = "https://18-204-12-4.sslip.io";

export const handlers = [
  http.post(`${base}/auth/login`, () => HttpResponse.json({ access_token: "access", refresh_token: "refresh", token_type: "bearer" })),
  http.get(`${base}/auth/me`, () => HttpResponse.json({ user_id: "user-1", email: "yemi@wellstaq.test", first_name: "Yemi", last_name: "Ade", role: "employee", organization_id: "org-1", branch_id: "branch-1", department_id: null, location: "Lagos", phone_number: null, status: "active", permissions: [], avatar_url: null, two_fa_enabled: false, two_fa_method: null })),
  http.get(`${base}/wellbeing/scores/me`, () => HttpResponse.json({ overall_score: 82 })),
  http.get(`${base}/engagement/checkins/streak`, () => HttpResponse.json({ current_streak_days: 4, checked_in_today: false })),
  http.get(`${base}/organizations/:orgId/events`, () => HttpResponse.json({ items: [{ id: "event-1", title: "Mindful reset", start_date: "2026-09-04", participant_count: 12 }], total: 1, offset: 0, limit: 20 })),
  http.get(`${base}/organizations/:orgId/challenges`, () => HttpResponse.json({ items: [{ id: "challenge-1", title: "Better breaks", progress_percentage: 50 }], total: 1, offset: 0, limit: 20 })),
  http.get(`${base}/notifications/unread-count`, () => HttpResponse.json({ unread_count: 3 })),
  http.post(`${base}/engagement/checkins`, () => HttpResponse.json({ id: "checkin-1" }, { status: 201 })),
  http.post(`${base}/organizations/:orgId/events/:eventId/participants`, () => HttpResponse.json({ joined: true }, { status: 201 })),
  http.post(`${base}/support/tickets`, () => HttpResponse.json({ id: "ticket-1" }, { status: 201 })),
];
