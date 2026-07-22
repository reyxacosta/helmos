import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-8 text-center sm:pt-24">
      {/* A slow, low-opacity drift behind the headline — "alive" without being
          flashy. motion-safe: means it simply doesn't render under reduced
          motion rather than jumping straight to its end state. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 size-[60rem] -translate-x-1/2 motion-safe:animate-drift"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 18%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-6">
        <p className="animate-fade-in text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          HelmOS — a personal operating system
        </p>
        <h1 className="max-w-2xl animate-slide-in-from-top text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
          Take the helm of everything that matters.
        </h1>
        <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          One operating system for personal life, work, school, and family
          business — calm, private, and entirely yours.
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
      </div>
    </section>
  );
}
