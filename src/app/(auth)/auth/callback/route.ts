import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import { getSafeRedirectPath } from "@/lib/safe-redirect";
import { getPostAuthRedirectPath } from "@/server/auth/get-post-auth-redirect";

/**
 * Handles both link formats Supabase's default email templates can use:
 * the PKCE `?code=` flow, and the classic `?token_hash=&type=` OTP flow.
 * Used for signup confirmation, password recovery, and email-change links.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = getSafeRedirectPath(searchParams.get("next"), "");

  const supabase = await createClient();
  let verified = false;

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    verified = !error;
  } else if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    verified = !error;
  }

  if (verified) {
    const destination = next || (await getPostAuthRedirectPath());
    return NextResponse.redirect(new URL(destination, origin));
  }

  return NextResponse.redirect(new URL("/auth/error", origin));
}
