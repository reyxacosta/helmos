import { HelmMark } from "@/components/brand/helm-mark";
import { cn } from "@/lib/cn";

/**
 * The lockup (mark + wordmark) used throughout the app — welcome header,
 * footer, auth shell. The mark itself is reserved for this brand usage;
 * it's deliberately not the same rounded-square badge used for workspace/
 * feature icons elsewhere, so it stays visually distinct as *the* logo.
 * See /brand/LOGO_USAGE.md.
 */
export function BrandMark({
  showWordmark = true,
  size = 28,
  className,
}: {
  showWordmark?: boolean;
  size?: number;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <HelmMark size={size} className="text-primary" />
      {showWordmark && (
        <span className="text-base font-semibold tracking-tight text-foreground">
          HelmOS
        </span>
      )}
    </span>
  );
}
