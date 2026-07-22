"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { FormBanner } from "@/components/ui/form-banner";
import { signUp } from "@/features/auth/actions/sign-up";
import { initialAuthFormState } from "@/features/auth/types";

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUp, initialAuthFormState);

  if (state.success) {
    return (
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-xl font-semibold text-foreground">Check your email</h1>
        <p className="text-sm text-muted-foreground">{state.message}</p>
        <Link
          href="/sign-in"
          className="mt-2 text-sm font-medium text-primary hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5 text-center">
        <h1 className="text-xl font-semibold text-foreground">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          One system for personal life, work, school, and family business.
        </p>
      </div>

      <FormBanner message={state.error} />

      <FormField
        id="fullName"
        name="fullName"
        label="Name"
        type="text"
        autoComplete="name"
        optional
        defaultValue={state.values?.fullName}
        errors={state.fieldErrors?.fullName}
      />

      <FormField
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        defaultValue={state.values?.email}
        errors={state.fieldErrors?.email}
      />

      <FormField
        id="password"
        name="password"
        label="Password"
        type="password"
        autoComplete="new-password"
        required
        errors={state.fieldErrors?.password}
      />

      <Button type="submit" disabled={pending} className="mt-1">
        {pending && <Loader2 className="size-4 animate-spin" />}
        {pending ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
