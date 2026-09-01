# Architecture

## Boundaries

- `src/api/generated/schema.d.ts`: generated wire contract for all 205 API operations.
- `src/api/transport.ts`: base URL, request IDs, timeouts, bearer auth, normalized errors, abort signals, and the single-flight refresh gate.
- `src/api/services.ts`: employee-facing endpoint adapters. Components depend on this layer.
- `src/api/adapters.ts`: snake_case wire data to stable camelCase domain models.
- `src/auth/auth-vault.ts`: browser IndexedDB credential implementation behind the `AuthVault` interface.
- `src/auth/auth-context.tsx`: authenticated user lifecycle and query-cache teardown.
- `src/auth/permission-gate.tsx`: named permission and branch-scope UI policy.
- `src/screens`: route-level employee experiences. Route modules are code-split.
- `src/components/ui`: Luma-style shadcn conventions on current Base UI foundations, with Iconsax product icons.

## Privacy and failure rules

- Access tokens live in memory after hydration. Token pairs are isolated in IndexedDB and never written to `localStorage`.
- TanStack Query has no persistence plugin and is cleared on logout or revoked session.
- A 401 triggers one shared refresh request and one retry. A failed refresh signs the user out.
- FastAPI 422 error locations become field-addressable errors; server internals are never displayed.
- Wellbeing and organization data are network-only. Offline mode exposes the precached application shell and a clear connection state, not stale private records.
- Permission gates improve UX but never replace server authorization.

## Query keys

Keys include the relevant organization, branch, user, filters, and page. This prevents cross-organization cache overlap and gives mutations a predictable invalidation boundary.
