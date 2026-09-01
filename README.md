# Wellstaq Employee Mobile

An independent, employee-focused Wellstaq frontend. It is an installable PWA today and is prepared for later iOS and Android packaging with Capacitor.

## What is included

- Invite OTP, employee registration, four-part wellbeing baseline, and ranked priorities
- Password login, 2FA challenge, password recovery, token refresh, logout, and session revocation
- Five-tab employee shell: Home, Activity, Explore, Events, and More
- Personal check-ins and wellbeing summaries, challenges, community posts and stories, events/RSVP, notifications, profile, preferences, security, sessions, and support
- Permission-gated event/challenge controls based on `/auth/me` grants and branch scope
- IndexedDB-only credential vault, in-memory access token, cross-tab logout, single-flight refresh, and query-cache clearing
- Generated wire types for every operation in the checked-in API contract
- Network-only API behavior in the service worker; only the application shell and bundled design assets are precached

Administrative organization analytics, billing, integrations, roles, permissions administration, payment webhooks, and app-admin support management are intentionally not exposed in the UI. Their operations remain available only through the generated API types.

## Local setup

Requirements: Node 20.19+ and npm 10+.

```bash
copy .env.example .env.local
npm install
npm run dev
```

The development server opens on `http://localhost:4173`. Environment variables are validated at startup. OAuth buttons remain hidden unless `VITE_ENABLE_OAUTH=true` and the matching client ID is present.

## API contract

`openapi/openapi.json` is the authoritative checked-in snapshot downloaded from the live FastAPI service. The live document currently contains one dangling `TwoFaChallengeResponse` reference. `scripts/generate-openapi.mjs` repairs that known reference in memory during generation without mutating the snapshot.

```bash
npm run api:sync       # download a new live snapshot
npm run api:generate   # regenerate src/api/generated/schema.d.ts
npm run api:check      # assert all 205 operations and generated interfaces
npm run api:update     # run all three
```

Feature components never call `fetch`. Employee operations go through `ApiTransport` and camelCase feature adapters. The generated `openapi-fetch` client is the public wire-level client for the complete contract.

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Playwright uses the production preview and mocks the API at the browser boundary. It covers sign-in, all five tabs, install manifest presence, and a critical-impact axe scan. Before a release, run the manual live checks in `docs/LIVE_SMOKE_TEST.md` with a non-production account.

## PWA and native packaging

The production build generates `dist/manifest.webmanifest` and `dist/sw.js`. API responses, tokens, organization data, and user wellbeing data are never placed in the service-worker cache or a persisted query cache.

Capacitor configuration is checked in, but native projects are intentionally deferred:

```bash
npm run build
npx cap add ios      # on macOS, when the PWA is stable
npx cap add android
npm run cap:sync
```

Replace `BrowserAuthVault` with platform secure storage before shipping native binaries, then add APNs/FCM registration using the generated push-token operations.

## Deployment

Build the static PWA and publish the `dist/` directory with any HTTPS-capable static host. Configure these environment variables in the host rather than committing a `.env.local` file:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Yes | Wellstaq API origin. |
| `VITE_ENABLE_OAUTH` | No | Set to `true` only when OAuth is configured. |
| `VITE_GOOGLE_CLIENT_ID` | With Google OAuth | Existing-user Google sign-in client ID. |
| `VITE_APPLE_CLIENT_ID` | With Apple OAuth | Existing-user Apple sign-in client ID. |

The API must permit the deployed origin through credentialed CORS and allow the `Authorization`, `Content-Type`, and `X-Request-ID` headers. Keep the API origin HTTPS in production: service-worker installation, browser credential protections, and installability depend on it.

The included GitHub Actions workflow runs contract, lint, type, unit/integration, build, and mobile-browser checks on pushes and pull requests. Before connecting a production host, complete the live smoke checklist and verify the production refresh-token behavior with a non-production employee account.

## Repository workflow

```bash
# Refresh the checked-in contract only after reviewing the backend change
npm run api:update

# Keep the same quality gate used by CI
npm run check
npm run test:e2e -- --project=mobile-chrome
```

Commit the OpenAPI snapshot and regenerated `src/api/generated/schema.d.ts` together. This ensures builds remain deterministic even if the hosted API documentation changes later.
