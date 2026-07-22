"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getSafeRedirectPath } from "@/lib/safe-redirect";
import { getPostAuthRedirectPath } from "@/server/auth/get-post-auth-redirect";
import { signInSchema } from "@/features/auth/validation/sign-in-schema";
import { getSafeAuthErrorMessage } from "@/features/auth/utils/auth-error-message";
import type { AuthFormState } from "@/features/auth/types";

export async function signIn(
  _state: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get("email")?.toString() ?? "";
  const validated = signInSchema.safeParse({
    email,
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { fieldErrors: validated.error.flatten().fieldErrors, values: { email } };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(validated.data);

  if (error) {
    return { error: getSafeAuthErrorMessage(error), values: { email } };
  }

  const next = getSafeRedirectPath(
    formData.get("next")?.toString(),
    await getPostAuthRedirectPath()
  );
  redirect(next);
}
