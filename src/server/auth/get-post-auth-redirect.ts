import "server-only";

/**
 * The single place that decides where a signed-in user lands: the sign-in
 * action, the sign-up action (after email verification), `proxy.ts`, and
 * the root `page.tsx` all call this instead of hardcoding a path.
 *
 * Today workspace membership doesn't exist yet, so everyone lands on the
 * Personal dashboard. Sprint 3 replaces the body with a real lookup — last
 * used workspace, or a workspace-selection screen if the user belongs to
 * more than one — without touching any of its callers.
 */
export async function getPostAuthRedirectPath(): Promise<string> {
  return "/personal/dashboard";
}
