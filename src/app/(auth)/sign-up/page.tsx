import type { Metadata } from "next";

import { SignUpForm } from "@/features/auth/components/sign-up-form";

export const metadata: Metadata = { title: "Create account — HelmOS" };

export default function SignUpPage() {
  return <SignUpForm />;
}
