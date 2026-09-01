import { z } from "zod";

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default("https://18-204-12-4.sslip.io"),
  VITE_GOOGLE_CLIENT_ID: z.string().optional(),
  VITE_APPLE_CLIENT_ID: z.string().optional(),
  VITE_ENABLE_OAUTH: z.enum(["true", "false"]).default("false"),
});

const raw = envSchema.parse(import.meta.env);

export const env = {
  apiBaseUrl: raw.VITE_API_BASE_URL.replace(/\/$/, ""),
  googleClientId: raw.VITE_GOOGLE_CLIENT_ID,
  appleClientId: raw.VITE_APPLE_CLIENT_ID,
  oauthEnabled: raw.VITE_ENABLE_OAUTH === "true",
};
