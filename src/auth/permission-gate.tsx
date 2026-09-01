import type { ReactNode } from "react";
import { hasPermission, useAuth } from "./auth-context";

export function PermissionGate({
  permission,
  branchId,
  fallback = null,
  children,
}: {
  permission: string;
  branchId?: string;
  fallback?: ReactNode;
  children: ReactNode;
}) {
  const { user } = useAuth();
  return hasPermission(user, permission, branchId) ? children : fallback;
}
