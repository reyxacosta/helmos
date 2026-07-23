import { Circle } from "lucide-react";

import { TODAYS_FOCUS_ITEMS } from "@/features/home/config/placeholder-content";

export function TodaysFocusCard() {
  return (
    <section
      aria-labelledby="todays-focus-heading"
      className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6"
    >
      <h3 id="todays-focus-heading" className="text-sm font-semibold text-foreground">
        Today&apos;s Focus
      </h3>
      <ul className="flex flex-1 flex-col gap-3">
        {TODAYS_FOCUS_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-foreground/90">
            <Circle className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
