import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <Link href="/" className="mb-8 animate-fade-in">
        <BrandMark />
      </Link>
      <div className="w-full max-w-sm animate-slide-in-from-top rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {children}
      </div>
    </div>
  );
}
