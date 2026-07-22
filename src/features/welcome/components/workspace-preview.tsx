import { workspaces } from "@/features/shell/config/workspaces";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

/**
 * Pulls from the real workspace registry (src/features/shell/config) rather
 * than faking sample data — this preview is always accurate to the product.
 */
export function WorkspacePreview() {
  return (
    <section className="border-t border-border px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Built for how you actually live
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Private workspaces for yourself, shared ones for the people you work with.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workspaces.map((workspace, index) => {
            const Icon = workspace.icon;
            const isShared = workspace.id === "family-business";
            return (
              <Reveal key={workspace.id} delay={index * 60}>
                <div className="flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 text-left shadow-sm">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{workspace.label}</p>
                    <Badge variant="subtle" className="mt-2">
                      {isShared ? "Shared" : "Private"}
                    </Badge>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
