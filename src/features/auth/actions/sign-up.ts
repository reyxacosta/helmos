"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getPostAuthRedirectPath } from "@/server/auth/get-post-auth-redirect";
import { signUpSchema } from "@/features/auth/validation/sign-up-schema";
import { getSafeAuthErrorMessage } from "@/features/auth/utils/auth-error-message";
import type { AuthFormState } from "@/features/auth/types";

export async function signUp(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const rawFullName = formData.get("fullName")?.toString() ?? "";
  const rawEmail = formData.get("email")?.toString() ?? "";
  const values = { fullName: rawFullName, email: rawEmail };

  const validated = signUpSchema.safeParse({
    fullName: rawFullName || undefined,
    email: rawEmail,
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors, values };
  }

  const { fullName, email, password } = validated.data;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: fullName ? { data: { full_name: fullName } } : undefined,
  });

  if (error) {
    return { error: getSafeAuthErrorMessage(error), values };
  }

  if (!data.session) {
    // Email confirmation is required — no session yet, nothing to redirect to.
    return {
      success: true,
      message: "Check your email to confirm your account before signing in.",
    };
  }

  redirect(await getPostAuthRedirectPath());
}
