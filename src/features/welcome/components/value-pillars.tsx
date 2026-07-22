import { Layers, Lock, ShieldCheck } from "lucide-react";

const PILLARS = [
  {
    icon: Lock,
    title: "Private by default",
    description: "Your personal workspaces are yours alone — nobody else sees them.",
  },
  {
    icon: Layers,
    title: "Built for real workspaces",
    description: "Personal, work, school, and shared family business, side by side.",
  },
  {
    icon: ShieldCheck,
    title: "One calm interface",
    description: "The same clean system for every part of your life, no context switching.",
  },
];

export function ValuePillars() {
  return (
    <section className="border-t border-border px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
        {PILLARS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex flex-col items-start gap-2 text-left">
            <span className="flex size-8 items-center justify-center rounded-md border border-border bg-card text-primary">
              <Icon className="size-4" />
            </span>
            <p className="text-sm font-semibold text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
