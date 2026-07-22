import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

/**
 * The authoritative session check — verifies the JWT (via `getClaims()`,
 * never `getSession()`) rather than trusting the cookie's contents.
 * Memoized per-request with `cache()` so calling this from multiple layouts
 * or components in the same render only does the work once.
 */
export const getUser = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    return null;
  }

  return { id: data.claims.sub, email: data.claims.email };
});

/** The `profiles` row for the current user, or null if signed out. */
export const getProfile = cache(async () => {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile;
});

/**
 * The defense-in-depth check behind proxy.ts's optimistic redirect — call
 * this in `(app)/layout.tsx`. Per Next's own guidance, proxy "should not be
 * your only line of defense."
 */
export async function requireUser() {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }
  return user;
}
