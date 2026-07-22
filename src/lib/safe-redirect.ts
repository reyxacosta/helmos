/**
 * Guards against open-redirect attacks in `?next=`/`redirect_to` query
 * params: only a same-origin, absolute path is allowed. Rejects anything
 * that could send a user off-site (`//evil.com`, `https://evil.com`,
 * `javascript:...`) while still allowing normal internal paths.
 */
export function isSafeRedirectPath(path: string | null | undefined): path is string {
  if (!path) return false;
  if (!path.startsWith("/")) return false;
  if (path.startsWith("//")) return false;
  if (path.includes("://")) return false;
  return true;
}

export function getSafeRedirectPath(
  path: string | null | undefined,
  fallback: string
): string {
  return isSafeRedirectPath(path) ? path : fallback;
}
