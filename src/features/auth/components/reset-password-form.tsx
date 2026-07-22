"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { FormBanner } from "@/components/ui/form-banner";
import { resetPassword } from "@/features/auth/actions/reset-password";
import { initialAuthFormState } from "@/features/auth/types";

export function ResetPasswordForm() {
  const [state, action, pending] = useActionState(resetPassword, initialAuthFormState);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5 text-center">
        <h1 className="text-xl font-semibold text-foreground">Set a new password</h1>
        <p className="text-sm text-muted-foreground">Choose a new password for your account.</p>
      </div>

      <FormBanner message={state.error} />

      <FormField
        id="password"
        name="password"
        label="New password"
        type="password"
        autoComplete="new-password"
        required
        errors={state.fieldErrors?.password}
      />

      <FormField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        required
        errors={state.fieldErrors?.confirmPassword}
      />

      <Button type="submit" disabled={pending} className="mt-1">
        {pending && <Loader2 className="size-4 animate-spin" />}
        {pending ? "Saving..." : "Save new password"}
      </Button>
    </form>
  );
}

export function ResetPasswordInvalidLink() {
  return (
    <div className="flex flex-col gap-3 text-center">
      <h1 className="text-xl font-semibold text-foreground">Link expired</h1>
      <p className="text-sm text-muted-foreground">
        This password reset link is invalid or has expired. Request a new one to continue.
      </p>
      <Link
        href="/forgot-password"
        className="mt-2 text-sm font-medium text-primary hover:underline"
      >
        Request a new link
      </Link>
    </div>
  );
}
