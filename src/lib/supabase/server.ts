import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { env } from "@/config/env";
import type { Database } from "@/lib/supabase/types";

/**
 * Server-only Supabase client. Create a **new** client on every call — never
 * cache or share one across requests (per @supabase/ssr's own guidance).
 *
 * `setAll` is wrapped in try/catch because Server Components can't write
 * cookies (only Server Actions and Route Handlers can) — when that happens,
 * `proxy.ts` is responsible for refreshing the session on the next request.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(env.supabaseUrl, env.supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Called from a Server Component — proxy.ts refreshes the
          // session on the next request instead.
        }
      },
    },
  });
}
