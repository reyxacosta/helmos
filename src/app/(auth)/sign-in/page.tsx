import type { Metadata } from "next";

import { SignInForm } from "@/features/auth/components/sign-in-form";
import { getSafeRedirectPath } from "@/lib/safe-redirect";

export const metadata: Metadata = { title: "Sign in — HelmOS" };

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const next = getSafeRedirectPath(params.next, "");

  return <SignInForm next={next || undefined} />;
}
