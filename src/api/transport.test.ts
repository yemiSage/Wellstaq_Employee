import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AuthVault, TokenPair } from "@/auth/auth-vault";
import { FetchApiTransport } from "./transport";

class MemoryVault implements AuthVault {
  tokens: TokenPair | null = null;
  read = vi.fn(async () => this.tokens);
  write = vi.fn(async (tokens: TokenPair) => { this.tokens = tokens; });
  clear = vi.fn(async () => { this.tokens = null; });
  subscribe = vi.fn(() => () => undefined);
}

describe("FetchApiTransport refresh", () => {
  beforeEach(() => vi.restoreAllMocks());

  it("single-flights concurrent 401 refreshes and keeps a non-rotated refresh token", async () => {
    const vault = new MemoryVault();
    const transport = new FetchApiTransport(vault);
    transport.setTokens({ accessToken: "expired", refreshToken: "refresh-1" });
    let refreshes = 0;
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input);
      const authorization = new Headers(init?.headers).get("Authorization");
      if (url.endsWith("/auth/refresh")) {
        refreshes += 1;
        await Promise.resolve();
        return Response.json({ access_token: "fresh" });
      }
      if (authorization === "Bearer expired") return new Response(null, { status: 401 });
      return Response.json({ ok: true });
    }));
    const [first, second] = await Promise.all([transport.request<{ ok: boolean }>("/one"), transport.request<{ ok: boolean }>("/two")]);
    expect(first.ok && second.ok).toBe(true);
    expect(refreshes).toBe(1);
    expect(vault.tokens).toEqual({ accessToken: "fresh", refreshToken: "refresh-1" });
  });

  it("clears credentials when refresh is rejected", async () => {
    const vault = new MemoryVault();
    const transport = new FetchApiTransport(vault);
    transport.setTokens({ accessToken: "expired", refreshToken: "revoked" });
    vi.stubGlobal("fetch", vi.fn(async () => new Response(null, { status: 401 })));
    await expect(transport.request("/private")).rejects.toBeTruthy();
    expect(vault.clear).toHaveBeenCalledOnce();
  });
});
