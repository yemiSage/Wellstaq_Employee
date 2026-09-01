import { describe, expect, it } from "vitest";
import { normalizeApiError } from "./errors";

describe("normalizeApiError", () => {
  it("turns FastAPI 422 locations into field errors", async () => {
    const response = new Response(JSON.stringify({ detail: [{ loc: ["body", "email"], msg: "invalid email" }] }), { status: 422 });
    const error = await normalizeApiError(response);
    expect(error.message).toBe("Please check the highlighted fields.");
    expect(error.fieldErrors).toEqual([{ field: "email", message: "invalid email" }]);
    expect(error.retryable).toBe(false);
  });
});
