import { QUICK_ACTIONS } from "@/features/home/config/placeholder-content";

export function QuickActions() {
  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6"
    >
      <h3 id="quick-actions-heading" className="text-sm font-semibold text-foreground">
        Quick Actions
      </h3>
      <div className="grid flex-1 grid-cols-2 gap-2">
        {QUICK_ACTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className="flex flex-col items-start gap-2 rounded-lg border border-border bg-background px-3 py-2.5 text-left transition-[background-color,border-color,transform] duration-150 hover:border-primary/40 hover:bg-accent active:scale-[0.97]"
          >
            <Icon className="size-4 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium text-foreground">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
