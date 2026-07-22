"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getPostAuthRedirectPath } from "@/server/auth/get-post-auth-redirect";
import { resetPasswordSchema } from "@/features/auth/validation/reset-password-schema";
import { getSafeAuthErrorMessage } from "@/features/auth/utils/auth-error-message";
import type { AuthFormState } from "@/features/auth/types";

export async function resetPassword(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const validated = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors };
  }

  // Requires an active (recovery) session — established by /auth/callback
  // before the user ever reaches this form.
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: validated.data.password,
  });

  if (error) {
    return { error: getSafeAuthErrorMessage(error) };
  }

  redirect(await getPostAuthRedirectPath());
}
