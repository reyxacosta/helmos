import { workspaces } from "@/features/shell/config/workspaces";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

const CONTENT_CARDS = ["Finance", "Documents", "Goals", "Health"];

/**
 * A static, non-interactive replica of the real app shell (same sidebar +
 * header + content structure as src/features/shell) rather than a generic
 * illustration — this is honestly what HelmOS looks like, just framed as a
 * preview. Built from the real workspace registry so it never drifts out of
 * sync with the actual product.
 */
export function ProductPreview() {
  const personal = workspaces[0];
  const PersonalIcon = personal.icon;

  return (
    <section className="px-6 pb-20 sm:px-10">
      <Reveal className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
            <span className="size-2.5 rounded-full bg-destructive/50" />
            <span className="size-2.5 rounded-full bg-warning/50" />
            <span className="size-2.5 rounded-full bg-success/50" />
          </div>
          <div className="flex h-[360px]">
            <div className="hidden w-48 shrink-0 flex-col border-r border-border bg-sidebar p-3 sm:flex">
              <div className="mb-4 flex items-center gap-2 px-1">
                <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <PersonalIcon className="size-3.5" />
                </span>
                <span className="text-xs font-semibold text-sidebar-foreground">
                  {personal.label}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {personal.sections.slice(0, 6).map((section, index) => {
                  const SectionIcon = section.icon;
                  return (
                    <div
                      key={section.id}
                      className={cn(
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                        index === 0
                          ? "bg-accent font-medium text-accent-foreground"
                          : "text-sidebar-foreground/60"
                      )}
                    >
                      <SectionIcon className="size-3.5" />
                      {section.label}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-xs font-semibold text-foreground">Dashboard</span>
                <div className="flex items-center gap-2">
                  <span className="h-5 w-24 rounded-full bg-muted" />
                  <span className="size-5 rounded-full bg-primary/70" />
                </div>
              </div>
              <div className="grid flex-1 grid-cols-2 gap-3 p-4">
                {CONTENT_CARDS.map((label) => (
                  <div key={label} className="rounded-lg border border-border bg-background/60 p-3">
                    <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
                    <div className="mt-2 h-12 rounded-md bg-muted" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
