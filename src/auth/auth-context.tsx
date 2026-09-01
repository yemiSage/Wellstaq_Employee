/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/services";
import { apiTransport } from "@/api/transport";
import type { CurrentUser } from "@/api/domain";
import { ApiError } from "@/api/errors";
import { authVault, type TokenPair } from "./auth-vault";

type AuthStatus = "loading" | "authenticated" | "anonymous";
type AuthContextValue = {
  status: AuthStatus;
  user: CurrentUser | null;
  challengeToken: string | null;
  signIn(email: string, password: string): Promise<"authenticated" | "2fa">;
  verify2fa(code: string): Promise<void>;
  acceptTokens(tokens: TokenPair): Promise<void>;
  signOut(): Promise<void>;
  refreshMe(): Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [challengeToken, setChallengeToken] = useState<string | null>(null);

  const finishAuthentication = async (tokens: TokenPair) => {
    apiTransport.setTokens(tokens);
    await authVault.write(tokens);
    const currentUser = await authApi.me();
    setUser(currentUser);
    setStatus("authenticated");
    setChallengeToken(null);
  };

  const signOut = async () => {
    const tokens = await authVault.read();
    await authApi.logout(tokens?.refreshToken);
    apiTransport.setTokens(null);
    await authVault.clear();
    queryClient.clear();
    setUser(null);
    setStatus("anonymous");
    setChallengeToken(null);
  };

  useEffect(() => {
    let active = true;
    void authVault.read().then(async (tokens) => {
      if (!active) return;
      if (!tokens) {
        setStatus("anonymous");
        return;
      }
      apiTransport.setTokens(tokens);
      try {
        const currentUser = await authApi.me();
        if (active) {
          setUser(currentUser);
          setStatus("authenticated");
        }
      } catch (error) {
        if (active) {
          if (!(error instanceof ApiError) || error.status !== 0) {
            apiTransport.setTokens(null);
            await authVault.clear();
          }
          setStatus("anonymous");
        }
      }
    });
    const unsubscribeVault = authVault.subscribe((event) => {
      if (event.type === "signed-out") {
        apiTransport.setTokens(null);
        queryClient.clear();
        setUser(null);
        setStatus("anonymous");
      }
    });
    const unsubscribeTransport = apiTransport.onSessionRevoked(() => {
      queryClient.clear();
      setUser(null);
      setStatus("anonymous");
    });
    return () => {
      active = false;
      unsubscribeVault();
      unsubscribeTransport();
    };
  }, [queryClient]);

  const value: AuthContextValue = {
      status,
      user,
      challengeToken,
      async signIn(email, password) {
        const result = await authApi.login(email, password);
        if (result.challengeToken) {
          setChallengeToken(result.challengeToken);
          return "2fa";
        }
        if (!result.tokens) throw new Error("The sign-in response did not include credentials.");
        await finishAuthentication(result.tokens);
        return "authenticated";
      },
      async verify2fa(code) {
        if (!challengeToken) throw new Error("This two-factor challenge has expired.");
        await finishAuthentication(await authApi.verify2fa(challengeToken, code));
      },
      acceptTokens: finishAuthentication,
      signOut,
      async refreshMe() {
        setUser(await authApi.me());
      },
    };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export function hasPermission(user: CurrentUser | null, permission: string, branchId?: string) {
  if (!user) return false;
  return user.permissions.some(
    (grant) => grant.name === permission && (!branchId || !grant.branchId || grant.branchId === branchId),
  );
}
