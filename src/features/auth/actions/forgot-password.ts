"use server";

import { createClient } from "@/lib/supabase/server";
import { env } from "@/config/env";
import { forgotPasswordSchema } from "@/features/auth/validation/forgot-password-schema";
import type { AuthFormState } from "@/features/auth/types";

const GENERIC_SUCCESS_MESSAGE =
  "If an account exists for that email, we've sent a password reset link.";

export async function forgotPassword(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get("email")?.toString() ?? "";
  const validated = forgotPasswordSchema.safeParse({ email });

  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors, values: { email } };
  }

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(validated.data.email, {
    redirectTo: `${env.appUrl}/auth/callback?next=/reset-password`,
  });

  // Same response whether or not the email is actually registered —
  // revealing that would let an attacker enumerate accounts.
  return { success: true, message: GENERIC_SUCCESS_MESSAGE };
}
