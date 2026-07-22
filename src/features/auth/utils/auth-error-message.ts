import { AuthError } from "@supabase/supabase-js";

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

/**
 * Maps known Supabase Auth error codes to safe, friendly copy. Never
 * surfaces `error.message` directly — that can include internal details we
 * don't want to expose to end users.
 */
const SAFE_MESSAGES: Partial<Record<string, string>> = {
  invalid_credentials: "That email or password isn't right.",
  email_not_confirmed: "Confirm your email address before signing in — check your inbox.",
  user_already_exists: "An account with this email already exists.",
  email_exists: "An account with this email already exists.",
  weak_password: "Choose a stronger password.",
  same_password: "Your new password must be different from your current one.",
  over_email_send_rate_limit: "Too many attempts. Wait a moment and try again.",
  over_request_rate_limit: "Too many attempts. Wait a moment and try again.",
  user_banned: "This account isn't available.",
  signup_disabled: "New sign-ups aren't available right now.",
  email_provider_disabled: "Email sign-in isn't available right now.",
  otp_expired: "That link has expired. Request a new one.",
  session_expired: "Your session has expired. Please sign in again.",
};

export function getSafeAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthError && error.code) {
    return SAFE_MESSAGES[error.code] ?? DEFAULT_MESSAGE;
  }
  return DEFAULT_MESSAGE;
}
