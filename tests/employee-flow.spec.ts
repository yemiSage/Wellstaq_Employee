import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const me = { user_id: "user-1", email: "yemi@wellstaq.test", first_name: "Yemi", last_name: "Ade", role: "employee", organization_id: "org-1", branch_id: "branch-1", department_id: null, location: "Lagos", phone_number: null, status: "active", permissions: [], avatar_url: null, two_fa_enabled: false, two_fa_method: null };

test.beforeEach(async ({ page }) => {
  await page.route("**/auth/login", (route) => route.fulfill({ json: { access_token: "access", refresh_token: "refresh", token_type: "bearer" } }));
  await page.route("**/auth/me", (route) => route.fulfill({ json: me }));
  await page.route("**/wellbeing/scores/me", (route) => route.fulfill({ json: { overall_score: 84 } }));
  await page.route("**/engagement/checkins/streak", (route) => route.fulfill({ json: { current_streak_days: 5, checked_in_today: false } }));
  await page.route("**/organizations/org-1/events**", (route) => route.fulfill({ json: { items: [], total: 0, offset: 0, limit: 20 } }));
  await page.route("**/organizations/org-1/challenges**", (route) => route.fulfill({ json: { items: [], total: 0, offset: 0, limit: 20 } }));
  await page.route("**/notifications/unread-count", (route) => route.fulfill({ json: { unread_count: 2 } }));
});

test("employee can sign in and navigate all five tabs", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email Address").fill("yemi@wellstaq.test");
  await page.locator('input[name="password"]').fill("wellstaq-demo");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Good morning,").or(page.getByText("Good afternoon,")).or(page.getByText("Good evening,"))).toBeVisible();
  await page.screenshot({ path: "test-results/home-mobile.png", fullPage: true });
  for (const tab of ["Activity", "Explore", "Events", "More", "Home"]) {
    await page.getByRole("link", { name: tab }).click();
    await expect(page).toHaveURL(new RegExp(`/${tab.toLowerCase()}`));
  }
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => violation.impact === "critical")).toEqual([]);
});

test("public app shell has an install manifest", async ({ page }) => {
  await page.goto("/login");
  const href = await page.locator('link[rel="manifest"]').getAttribute("href");
  expect(href).toBeTruthy();
});
