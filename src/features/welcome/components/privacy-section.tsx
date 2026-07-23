import { Lock, ShieldCheck, Users } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";

const POINTS = [
  {
    icon: Lock,
    title: "Private by default",
    description: "Every workspace starts private, until you choose otherwise.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    description: "Protected at every layer — not bolted on after the fact.",
  },
  {
    icon: Users,
    title: "Collaboration without compromise",
    description: "Shared workspaces are coming, without exposing what's yours.",
  },
];

export function PrivacySection() {
  return (
    <section id="privacy" className="px-6 py-24 sm:px-10">
      <Reveal className="mx-auto grid max-w-4xl gap-12 sm:grid-cols-[1fr_1.2fr] sm:items-center">
        <div className="flex flex-col items-start gap-4 text-left">
          <span className="flex size-10 items-center justify-center rounded-md border border-border bg-card text-primary">
            <Lock className="size-5" />
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Your data belongs to you.
          </h2>
          <p className="text-muted-foreground">
            HelmOS is built for one person&apos;s life first — private and
            yours alone. Sharing is something you opt into, never out of.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {POINTS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-card text-primary">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
