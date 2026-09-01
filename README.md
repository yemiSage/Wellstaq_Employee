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
