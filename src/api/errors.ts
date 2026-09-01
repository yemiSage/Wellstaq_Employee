export type FieldError = { field: string; message: string };

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status = 0,
    public readonly code = "unknown_error",
    public readonly fieldErrors: FieldError[] = [],
    public readonly retryable = false,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function safeMessage(status: number) {
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You do not have permission to do that.";
  if (status === 404) return "We could not find what you were looking for.";
  if (status === 409) return "That change conflicts with newer information. Please refresh and try again.";
  if (status === 422) return "Please check the highlighted fields.";
  if (status >= 500) return "Wellstaq is having a moment. Please try again shortly.";
  return "We could not complete that request. Please try again.";
}

export async function normalizeApiError(response: Response) {
  let body: Record<string, unknown> = {};
  try {
    body = (await response.json()) as Record<string, unknown>;
  } catch {
    // The safe fallback below is intentional.
  }

  const detail = body.detail;
  const fieldErrors: FieldError[] = Array.isArray(detail)
    ? detail.map((item: { loc?: unknown[]; msg?: string }) => ({
        field: (item.loc ?? []).filter((part) => part !== "body").join("."),
        message: item.msg ?? "Invalid value",
      }))
    : [];
  const message = typeof detail === "string" ? detail : safeMessage(response.status);

  return new ApiError(
    message,
    response.status,
    typeof body.code === "string" ? body.code : `http_${response.status}`,
    fieldErrors,
    response.status === 408 || response.status === 429 || response.status >= 500,
  );
}
