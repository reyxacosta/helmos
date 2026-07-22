"use client";

import * as React from "react";

import { cn } from "@/lib/cn";

/**
 * Fades + slides content up the first time it scrolls into view. Uses
 * `motion-safe:` rather than the global prefers-reduced-motion override so
 * that when reduced motion is requested, content is never hidden behind
 * opacity-0 waiting for an animation that won't meaningfully run — it's
 * just visible immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        "motion-safe:opacity-0",
        visible && "motion-safe:animate-reveal motion-safe:[animation-fill-mode:both]",
        className
      )}
    >
      {children}
    </div>
  );
}
