import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function WelcomeHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-5 sm:px-10">
      <BrandMark />
      <Link href="/sign-in" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
        Sign in
      </Link>
    </header>
  );
}
