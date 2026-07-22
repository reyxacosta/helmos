import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-6 px-6 pt-12 pb-16 text-center sm:pt-20 sm:pb-24">
      <p className="animate-fade-in text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        HelmOS — a personal operating system
      </p>
      <h1 className="max-w-2xl animate-slide-in-from-top text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
        Take the helm of everything that matters.
      </h1>
      <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
        Personal life, work, school, and family business — organized in one
        calm, private system. Your workspaces, your rules.
      </p>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Link href="/sign-up" className={cn(buttonVariants({ size: "lg" }))}>
          Create your account
        </Link>
        <Link
          href="/sign-in"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Sign in
        </Link>
      </div>
    </section>
  );
}
