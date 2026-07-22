/**
 * Plain string constants — deliberately NOT re-exported from a "use client"
 * provider file. Next.js wraps every export of a "use client" module
 * (including non-component values) in a client reference; a Server
 * Component reading one directly (e.g. `cookieStore.get(THEME_COOKIE)`)
 * silently gets a broken proxy instead of the string. Both the Server
 * Component layouts and the client providers import these from here.
 */
export const THEME_COOKIE = "helmos-theme";
export const SIDEBAR_COOKIE = "helmos-sidebar-collapsed";
