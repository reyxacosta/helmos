import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Link error — HelmOS" };

export default function AuthErrorPage() {
  return (
    <div className="flex flex-col gap-3 text-center">
      <h1 className="text-xl font-semibold text-foreground">That link didn&apos;t work</h1>
      <p className="text-sm text-muted-foreground">
        It may have expired or already been used. Try again from the sign-in page.
      </p>
      <Link href="/sign-in" className="mt-2 text-sm font-medium text-primary hover:underline">
        Back to sign in
      </Link>
    </div>
  );
}
