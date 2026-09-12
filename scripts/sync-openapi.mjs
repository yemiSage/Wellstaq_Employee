import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.WELLSTAQ_API_BASE_URL ?? "https://wellstaq-api-production.up.railway.app";
const destination = resolve("openapi/openapi.json");
const response = await fetch(`${baseUrl.replace(/\/$/, "")}/openapi.json`);

if (!response.ok) {
  throw new Error(`OpenAPI sync failed (${response.status} ${response.statusText})`);
}

await mkdir(resolve("openapi"), { recursive: true });
await writeFile(destination, `${JSON.stringify(await response.json(), null, 2)}\n`);
console.log(`Updated ${destination}`);
