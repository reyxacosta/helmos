import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/update-session";

export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Excludes static assets and Next's generated metadata routes (icon,
  // apple-icon, opengraph-image, twitter-image — served extensionless, so
  // they need naming here explicitly rather than a file-extension pattern).
  // update-session.ts's isPublicRoute() treats the same routes as public
  // too, as a second line of defense in case this matcher ever drifts.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|twitter-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
