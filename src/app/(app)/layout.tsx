import { requireUser } from "@/server/auth/dal";

/**
 * The authoritative auth guard — proxy.ts already redirects unauthenticated
 * requests optimistically, but per Next's own defense-in-depth guidance
 * that shouldn't be the only line of defense. This is the real one.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return children;
}
