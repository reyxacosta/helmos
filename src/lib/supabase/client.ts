import { createBrowserClient } from "@supabase/ssr";

import { env } from "@/config/env";
import type { Database } from "@/lib/supabase/types";

/**
 * Browser-only Supabase client. `createBrowserClient` is a singleton under
 * the hood — safe to call this from multiple components.
 */
export function createClient() {
  return createBrowserClient<Database>(
    env.supabaseUrl,
    env.supabasePublishableKey
  );
}
