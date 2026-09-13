import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { employeeApi } from "@/api/services";
import { useAuth } from "@/auth/auth-context";

export type Person = { id: string; name: string; handle: string; firstName: string; lastName: string; avatarUrl?: string | null; isMe: boolean };

// Posts, comments and messages only carry a user_id. This resolves them to a
// display name and avatar via the org directory, falling back to the signed-in
// user (always known) and then to a neutral "Colleague" so nothing renders as
// a raw id while the directory is still loading.
export function useMembers() {
  const { user } = useAuth();
  const query = useQuery({ queryKey: ["members", user?.organizationId], queryFn: () => employeeApi.members(user!.organizationId), enabled: Boolean(user), staleTime: 5 * 60_000 });
  const people = useMemo(() => {
    const map = new Map<string, Person>();
    for (const member of query.data ?? []) map.set(member.id, person(member.id, member.first_name, member.last_name, member.avatar_url, member.id === user?.id));
    if (user) map.set(user.id, person(user.id, user.firstName, user.lastName, user.avatarUrl, true));
    return map;
  }, [query.data, user]);
  const resolve = useCallback((id: string): Person => people.get(id) ?? person(id, "Colleague", "", null, false), [people]);
  return { resolve, me: user ? resolve(user.id) : resolve(""), isPending: query.isPending };
}

function person(id: string, firstName: string, lastName: string, avatarUrl: string | null | undefined, isMe: boolean): Person {
  const name = `${firstName} ${lastName}`.trim() || "Colleague";
  return { id, name, handle: name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") || "colleague", firstName, lastName, avatarUrl, isMe };
}
