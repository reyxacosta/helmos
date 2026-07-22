import { Navigation } from "lucide-react";

import { cn } from "@/lib/cn";

/**
 * The one HelmOS brand mark, reused by the welcome page and the auth shell.
 * Deliberately restrained: the same rounded-badge language already used for
 * workspace icons throughout the app, not a ship's-wheel/anchor illustration.
 */
export function BrandMark({
  showWordmark = true,
  className,
}: {
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Navigation className="size-4" strokeWidth={2.25} />
      </span>
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          HelmOS
        </span>
      )}
    </span>
  );
}
