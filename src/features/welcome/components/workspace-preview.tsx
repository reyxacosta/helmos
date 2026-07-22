import { workspaces } from "@/features/shell/config/workspaces";

/**
 * Pulls from the real workspace registry (src/features/shell/config) rather
 * than faking sample data — this preview is always accurate to the product.
 */
export function WorkspacePreview() {
  return (
    <section className="px-6 pb-20 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-lg font-semibold text-foreground">
            Built for how you actually live
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Private workspaces for yourself, shared ones for the people you work with.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workspaces.map((workspace) => {
            const Icon = workspace.icon;
            const isShared = workspace.id === "family-business";
            return (
              <div
                key={workspace.id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 text-left shadow-sm"
              >
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{workspace.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {isShared ? "Shared with your team" : "Private to you"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
