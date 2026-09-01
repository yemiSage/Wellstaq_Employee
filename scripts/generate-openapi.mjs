import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import openapiTS, { astToString } from "openapi-typescript";

const source = resolve("openapi/openapi.json");
const destination = resolve("src/api/generated/schema.d.ts");
const schema = JSON.parse(await readFile(source, "utf8"));

// The live FastAPI document references this response but currently omits its
// component declaration. Keep the downloaded snapshot untouched and repair the
// known dangling reference only in the deterministic generation pipeline.
schema.components.schemas.TwoFaChallengeResponse ??= {
  type: "object",
  title: "TwoFaChallengeResponse",
  properties: {
    two_fa_required: { type: "boolean", const: true },
    two_fa_challenge_token: { type: "string" },
  },
  required: ["two_fa_required", "two_fa_challenge_token"],
};

const nodes = await openapiTS(schema);
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination, astToString(nodes));
console.log(`Generated ${destination} from the 205-operation snapshot.`);
