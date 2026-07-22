import type { LucideIcon } from "lucide-react";

export function PlaceholderPage({
  icon: Icon,
  label,
  description = "This section hasn't been built yet. It'll show up here once it ships.",
}: {
  icon: LucideIcon;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground">
        <Icon className="size-5" />
      </div>
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
