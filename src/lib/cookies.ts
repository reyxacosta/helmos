/** Client-side cookie helper for persisting lightweight UI preferences
 * (theme, sidebar state) without a Server Action or API route. */
export function setCookie(name: string, value: string, maxAgeDays = 365) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}; SameSite=Lax`;
}
