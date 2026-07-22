import type { Metadata } from "next";

import { getUser } from "@/server/auth/dal";
import {
  ResetPasswordForm,
  ResetPasswordInvalidLink,
} from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = { title: "Reset password — HelmOS" };

export default async function ResetPasswordPage() {
  // Reaching this page with a session always means the recovery link in
  // /auth/callback succeeded — no session means an invalid/expired link
  // (or someone browsing here directly), not a real password-reset flow.
  const user = await getUser();

  if (!user) {
    return <ResetPasswordInvalidLink />;
  }

  return <ResetPasswordForm />;
}
