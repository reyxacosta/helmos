import { RECENT_ACTIVITY } from "@/features/home/config/placeholder-content";

export function RecentActivity() {
  return (
    <section
      aria-labelledby="recent-activity-heading"
      className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6"
    >
      <h3 id="recent-activity-heading" className="text-sm font-semibold text-foreground">
        Recent Activity
      </h3>
      <ul className="relative flex flex-col gap-4 before:absolute before:inset-y-1 before:left-[15px] before:w-px before:bg-border">
        {RECENT_ACTIVITY.map(({ id, label, when, icon: Icon }) => (
          <li key={id} className="relative flex items-center gap-3">
            <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground">
              <Icon className="size-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm text-foreground/90">{label}</p>
              <p className="text-xs text-muted-foreground">{when}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
