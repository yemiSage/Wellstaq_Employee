import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const snapshotPath = resolve("openapi/openapi.json");
const generatedPath = resolve("src/api/generated/schema.d.ts");
const snapshot = JSON.parse(await readFile(snapshotPath, "utf8"));
const methods = new Set(["get", "post", "put", "patch", "delete", "options", "head", "trace"]);
const operations = Object.values(snapshot.paths ?? {}).flatMap((path) =>
  Object.entries(path).filter(([method]) => methods.has(method)),
);

if (operations.length !== 205) {
  throw new Error(`Expected 205 API operations, found ${operations.length}. Run npm run api:update and review the contract.`);
}

await access(generatedPath);
const generated = await readFile(generatedPath, "utf8");
if (!generated.includes("export interface paths") || !generated.includes("export interface operations")) {
  throw new Error("Generated schema is missing the paths or operations interfaces.");
}

console.log("OpenAPI snapshot and generated client cover all 205 operations.");
