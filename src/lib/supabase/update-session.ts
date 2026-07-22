import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { env } from "@/config/env";
import { isSafeRedirectPath } from "@/lib/safe-redirect";
import { getPostAuthRedirectPath } from "@/server/auth/get-post-auth-redirect";
import type { Database } from "@/lib/supabase/types";

// Pages that stay reachable without an active session.
const PUBLIC_PATHS = ["/", "/sign-in", "/sign-up", "/forgot-password", "/reset-password"];
// The subset that a signed-in user should be bounced away from. Deliberately
// excludes "/reset-password" (needs to stay reachable with an active
// recovery session) and anything under "/auth/" (the callback route must
// always run its own logic regardless of auth state).
const AUTH_ONLY_PATHS = ["/sign-in", "/sign-up", "/forgot-password"];

function isPublicRoute(pathname: string) {
  return PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/auth/");
}

/**
 * Called from proxy.ts on every request. Refreshes the Supabase session
 * (writing any renewed tokens back to cookies) and applies the two
 * optimistic redirect rules described in the auth architecture. This is the
 * *first* line of defense only — `(app)/layout.tsx`'s `requireUser()` is the
 * authoritative check, per Next's own guidance that proxy "should not be
 * your only line of defense."
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(env.supabaseUrl, env.supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
        // Cache-Control/Expires/Pragma — without these, a CDN or reverse
        // proxy in front of the app could cache a Set-Cookie response and
        // serve one user's session to another.
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  // Must run before any response is generated — a refresh that completes
  // after the response is committed can't be written back to cookies here.
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims);
  const pathname = request.nextUrl.pathname;

  if (!isAuthenticated && !isPublicRoute(pathname)) {
    const signInUrl = new URL("/sign-in", request.url);
    if (isSafeRedirectPath(pathname)) {
      signInUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && AUTH_ONLY_PATHS.includes(pathname)) {
    const target = await getPostAuthRedirectPath();
    return NextResponse.redirect(new URL(target, request.url));
  }

  return response;
}
