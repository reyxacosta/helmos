"use client";

import * as React from "react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

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
      <Link href="/sign-in" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
        Sign in
      </Link>
    </header>
  );
}
