"use client";

import * as React from "react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#privacy", label: "Privacy" },
];

export function WelcomeHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between px-6 py-5 transition-[background-color,border-color,padding] duration-300 sm:px-10",
        scrolled && "border-b border-border bg-background/80 py-4 backdrop-blur-md"
      )}
    >
      <Link href="/" aria-label="HelmOS home">
        <BrandMark />
      </Link>

      <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <Link
        href="/sign-up"
        className={cn(
          buttonVariants({ size: "sm" }),
          "shadow-[0_0_0_0_transparent] transition-shadow hover:shadow-[0_0_28px_-6px_var(--primary)]"
        )}
      >
        Get Started
      </Link>
    </header>
  );
}
