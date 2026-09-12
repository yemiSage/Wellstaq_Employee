# Employee app implementation

Source: the Wellstaq Swagger documentation open in the browser at https://wellstaq-api-production.up.railway.app/docs. Live contract reviewed on 2026-09-11.

## Ordered delivery steps

1. Install locked dependencies, compare the live contract, correct the API origin, and regenerate types.
2. Establish the shared mobile design and motion; complete login, recovery, 2FA, invite verification and onboarding.
3. Complete Home, check-ins, personal scores, assessments, priorities, surveys, challenges and progress.
4. Complete posts, comments, saved posts, stories, clubs, conversations, events and RSVP.
5. Complete notifications, profile/avatar, preferences, password/2FA, sessions and support.
6. Run contract, lint, types, unit/integration and production build checks; provide local preview and record remaining backend limitations.

## Screen-to-endpoint map

| Screens | API operations |
| --- | --- |
| Login / verification / recovery | POST /auth/login, /auth/2fa/verify, /auth/forgot-password, /auth/reset-password |
| Invite / account details / baseline / priorities | POST /auth/invite/otp/request, /auth/invite/otp/verify, /auth/register/invite; GET /categories |
| Home / scores | GET /auth/me, /wellbeing/scores/me, /engagement/checkins/streak, organization events/challenges, /notifications/unread-count |
| Check-ins / history | GET/POST /engagement/checkins |
| Assessments / baseline | POST /wellbeing/assessments, GET /wellbeing/assessments/me, GET /wellbeing/baselines/me |
| Priorities | GET/PUT /engagement/priorities; GET /categories |
| Survey | GET organization /wellbeing-survey/open-window, POST /wellbeing-survey/responses, GET /wellbeing-survey/responses/me |
| Challenges / details / progress | GET organization /challenges and /challenges/{id}; POST/DELETE /join; GET /progress/me; POST /progress; GET /participants |
| Community / post / saved / compose | GET/POST organization /posts; GET /posts/saved and /posts/{id}; POST/DELETE /like and /save; POST /share; GET/POST /comments |
| Stories | GET/POST organization /stories; GET /stories/{id} |
| Clubs / club details / chat | GET organization /clubs and /clubs/{id}; GET /members; PUT membership; DELETE membership /leave; GET/POST /conversations/{type}/{id}/messages |
| Events / event details | GET organization /events and /events/{id}; GET/POST /participants; DELETE participant |
| Notifications | GET /notifications; PATCH /read-all and /{id}/read |
| Profile / photo | GET/PATCH /user-settings/profile; POST /storage/upload-url; PUT /user-settings/avatar |
| Preferences | GET/PATCH /user-settings/preferences |
| Security / sessions | POST /user-settings/change-password; POST /auth/2fa/setup, /confirm, /disable; GET /auth/sessions; DELETE /auth/sessions/{id} |
| Support | POST /support/tickets |

Organization administration, financial/billing, dashboard aggregate analytics, webhooks, and app-admin screens are outside this employee app. Relevant employee event/challenge management remains permission-gated.

## Implementation and release boundaries

Steps 1–5 are implemented, including movement logging, activity trends and leaderboards. All private-data requests go through the existing authenticated transport; signed media uploads PUT directly to the returned upload URL without sending the employee bearer token.

- Authentication uses original orange/green artwork, a full-bleed welcome scene and animated rounded form sheets. Shared cards, navigation, spacing and motion follow the supplied reference direction. Artwork provenance is in ASSETS.md.
- The API exposes assessment records, not a clinical question bank or scoring algorithm. The assessment screen requests a pending assessment and displays server results; it does not invent a questionnaire or calculate medical scores.
- Live API documentation and a read-only local proxy request were verified. Authenticated end-to-end tests use fixtures; no live employee data was created or modified.
- The Railway API rejected a localhost CORS preflight. Development uses the local proxy. Production needs its deployed origin approved by the backend.
- Real OTP delivery, account permissions, refresh rotation, signed-storage upload origins/domain values and live writes require the non-production account checks in LIVE_SMOKE_TEST.md.
- Native binaries, app-store packaging, production deployment and OAuth provider registration are not performed.
