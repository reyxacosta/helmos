import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

export function WelcomeFooter() {
  return (
    <footer className="flex flex-col items-center gap-3 border-t border-border px-6 py-10 text-center">
      <Link href="/" aria-label="HelmOS home">
        <BrandMark showWordmark={false} />
      </Link>
      <p className="text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} HelmOS. Built for one family, one system at a time.
      </p>
    </footer>
  );
}
