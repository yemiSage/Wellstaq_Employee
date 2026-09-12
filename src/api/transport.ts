import { env } from "@/lib/env";
import { authVault, type AuthVault, type TokenPair } from "@/auth/auth-vault";
import { ApiError, normalizeApiError } from "./errors";

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  timeoutMs?: number;
  authenticated?: boolean;
  retryOnUnauthorized?: boolean;
};

export interface ApiTransport {
  request<T>(path: string, options?: ApiRequestOptions): Promise<T>;
  setTokens(tokens: TokenPair | null): void;
  onSessionRevoked(listener: () => void): () => void;
}

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
};

export class FetchApiTransport implements ApiTransport {
  private tokens: TokenPair | null = null;
  private refreshPromise: Promise<TokenPair> | null = null;
  private revokedListeners = new Set<() => void>();

  constructor(private readonly vault: AuthVault = authVault) {}

  setTokens(tokens: TokenPair | null) {
    this.tokens = tokens;
  }

  onSessionRevoked(listener: () => void) {
    this.revokedListeners.add(listener);
    return () => this.revokedListeners.delete(listener);
  }

  async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const { timeoutMs = 15_000, authenticated = true, retryOnUnauthorized = true, body, ...requestInit } = options;
    const timeout = AbortSignal.timeout(timeoutMs);
    const signal = requestInit.signal ? AbortSignal.any([requestInit.signal, timeout]) : timeout;
    const headers = new Headers(requestInit.headers);
    headers.set("Accept", "application/json");
    headers.set("X-Request-ID", crypto.randomUUID());
    if (body !== undefined && !(body instanceof FormData)) headers.set("Content-Type", "application/json");
    if (authenticated && this.tokens?.accessToken) headers.set("Authorization", `Bearer ${this.tokens.accessToken}`);

    let response: Response;
    try {
      response = await fetch(`${env.apiBaseUrl}${path}`, {
        ...requestInit,
        signal,
        headers,
        body: body instanceof FormData ? body : body === undefined ? undefined : JSON.stringify(body),
      });
    } catch (error) {
      if (error instanceof DOMException && (error.name === "AbortError" || error.name === "TimeoutError")) {
        throw new ApiError("The request timed out. Please try again.", 408, "timeout", [], true);
      }
      throw new ApiError("You appear to be offline. Reconnect and try again.", 0, "network_error", [], true);
    }

    if (response.status === 401 && authenticated && retryOnUnauthorized && this.tokens?.refreshToken) {
      await this.refresh();
      return this.request<T>(path, { ...options, retryOnUnauthorized: false });
    }
    if (!response.ok) throw await normalizeApiError(response);
    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
  }

  private refresh() {
    if (!this.refreshPromise) {
      this.refreshPromise = this.performRefresh().finally(() => {
        this.refreshPromise = null;
      });
    }
    return this.refreshPromise;
  }

  private async performRefresh() {
    if (!this.tokens?.refreshToken) throw new ApiError("No refresh token is available.", 401, "session_expired");
    try {
      const response = await this.request<TokenResponse>("/auth/refresh", {
        method: "POST",
        authenticated: false,
        retryOnUnauthorized: false,
        body: { refresh_token: this.tokens.refreshToken },
      });
      const tokens = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token ?? this.tokens.refreshToken,
      };
      this.tokens = tokens;
      await this.vault.write(tokens);
      return tokens;
    } catch (error) {
      this.tokens = null;
      await this.vault.clear();
      this.revokedListeners.forEach((listener) => listener());
      throw error;
    }
  }
}

export const apiTransport = new FetchApiTransport();
