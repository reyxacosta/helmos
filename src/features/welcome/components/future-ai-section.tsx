import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";

export function FutureAiSection() {
  return (
    <section className="border-t border-border px-6 py-16 text-center sm:px-10">
      <Reveal className="mx-auto flex max-w-lg flex-col items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-primary">
          <Sparkles className="size-4" />
        </span>
        <p className="text-sm font-semibold text-foreground">Quietly intelligent</p>
        <p className="text-sm text-muted-foreground">
          An assistant is coming to HelmOS — not a chatbot bolted onto the
          side, but something that quietly helps organize every part of your
          life alongside you.
        </p>
      </Reveal>
    </section>
  );
}
