import { z } from "zod";

const defaultApiBaseUrl = "https://18-204-12-4.sslip.io";

const optionalString = z.preprocess(
  (value) => typeof value === "string" && value.trim() === "" ? undefined : value,
  z.string().optional(),
);

const envSchema = z.object({
  // Deployment dashboards can inject blank or stale values. Configuration
  // should degrade to safe defaults instead of crashing before React mounts.
  VITE_API_BASE_URL: z.string().url().catch(defaultApiBaseUrl).default(defaultApiBaseUrl),
  VITE_GOOGLE_CLIENT_ID: optionalString,
  VITE_APPLE_CLIENT_ID: optionalString,
  VITE_ENABLE_OAUTH: z.preprocess(
    (value) => value === "true" ? "true" : "false",
    z.enum(["true", "false"]),
  ),
});

const raw = envSchema.parse({
  ...import.meta.env,
  // Some hosts expose unset environment variables as an empty string. Treat it
  // as absent so the safe production API default is used instead of crashing.
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL || undefined,
});

export const env = {
  apiBaseUrl: raw.VITE_API_BASE_URL.replace(/\/$/, ""),
  googleClientId: raw.VITE_GOOGLE_CLIENT_ID,
  appleClientId: raw.VITE_APPLE_CLIENT_ID,
  oauthEnabled: raw.VITE_ENABLE_OAUTH === "true",
};
