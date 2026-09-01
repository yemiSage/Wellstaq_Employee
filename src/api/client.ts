import createClient from "openapi-fetch";
import type { paths } from "./generated/schema";
import { env } from "@/lib/env";

// Public wire-level client for every operation in the checked-in OpenAPI contract.
// Feature code uses adapters built on ApiTransport so auth/error behavior stays centralized.
export const generatedApi = createClient<paths>({ baseUrl: env.apiBaseUrl });
export type { paths, operations, components } from "./generated/schema";
