import { cn } from "@/lib/cn";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.length > 1
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0]?.slice(0, 2);
  return (initials ?? "").toUpperCase();
}

export function Avatar({
  name,
  size = "md",
  className,
}: {
  name: string;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground",
        size === "sm" ? "size-7 text-xs" : "size-8 text-sm",
        className
      )}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  );
}
