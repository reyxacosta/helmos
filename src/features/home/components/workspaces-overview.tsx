import Link from "next/link";

import { workspaces } from "@/features/shell/config/workspaces";
import { WORKSPACE_META } from "@/features/home/config/placeholder-content";

export function WorkspacesOverview() {
  return (
    <section aria-labelledby="workspaces-heading" className="flex flex-col gap-4">
      <h3 id="workspaces-heading" className="text-sm font-semibold text-foreground">
        Workspaces
      </h3>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {workspaces.map((workspace) => {
          const Icon = workspace.icon;
          const meta = WORKSPACE_META[workspace.id];
          return (
            <Link
              key={workspace.id}
              href={`/${workspace.id}/home`}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{workspace.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{meta.description}</p>
              </div>
              <p className="text-[11px] text-muted-foreground/70">{meta.lastActivity}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
