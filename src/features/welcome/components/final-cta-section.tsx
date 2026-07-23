import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

export function FinalCtaSection() {
  return (
    <section className="px-6 py-24 text-center sm:px-10 sm:py-32">
      <Reveal className="mx-auto flex max-w-lg flex-col items-center gap-6">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Ready to take the helm?
        </h2>
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ size: "lg" }),
            "shadow-[0_0_0_0_transparent] transition-shadow hover:shadow-[0_0_32px_-6px_var(--primary)]"
          )}
        >
          Get Started
        </Link>
        <Link href="/sign-in" className="text-sm text-muted-foreground hover:text-foreground">
          Already have an account? <span className="font-medium text-primary">Sign in</span>
        </Link>
      </Reveal>
    </section>
  );
}
