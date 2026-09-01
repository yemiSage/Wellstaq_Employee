# Live authenticated release smoke test

Use a non-production employee account. Never place credentials in the repository, terminal history, screenshots, or test fixtures.

1. Confirm production CORS accepts the deployed PWA origin and its preflight headers (`Authorization`, `Content-Type`, `X-Request-ID`).
2. Sign in without 2FA, reload the app, and confirm `/auth/me` restores the session from IndexedDB.
3. Sign in with 2FA enabled and verify TOTP, email, or SMS challenge completion.
4. Let the access token expire while two foreground requests run. Confirm exactly one `/auth/refresh` request occurs and both original requests recover.
5. Inspect the refresh response. If no new `refresh_token` is returned, confirm the existing refresh token remains usable as documented by the current API. If the backend rotates it, confirm the returned token replaces the stored token.
6. Revoke the active session elsewhere. Confirm the next refresh clears tokens, TanStack Query state, and returns to sign-in.
7. Complete a check-in, event RSVP, post interaction, challenge update, avatar upload, preference change, and support ticket.
8. Verify notification polling pauses when hidden, resumes on focus, and refreshes within 60 seconds.
9. Go offline after one successful load. Confirm the application shell opens, a connection banner appears, and no private API response is served from the service worker.
10. Run Lighthouse PWA and accessibility checks at 320, 375, 390, 430, 768, and desktop-centered widths.
