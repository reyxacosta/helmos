import { HelmMark } from "@/components/brand/helm-mark";
import { cn } from "@/lib/cn";

/**
 * The lockup (mark + wordmark) used throughout the app — welcome header,
 * footer, auth shell, sidebar. "Helm" is light-weight `currentColor` (theme-
 * adaptive); "OS" is bold with a fixed violet-to-blue gradient, matching the
 * official artwork. See /brand/LOGO_USAGE.md.
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
        <span className="text-base tracking-tight">
          <span className="font-light text-foreground">Helm</span>
          <span className="bg-gradient-to-r from-primary to-info bg-clip-text font-bold text-transparent">
            OS
          </span>
        </span>
      )}
    </span>
  );
}
