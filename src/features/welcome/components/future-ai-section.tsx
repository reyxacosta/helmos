import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";

export function FutureAiSection() {
  return (
    <section className="px-6 py-20 text-center sm:px-10">
      <Reveal className="mx-auto flex max-w-md flex-col items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-md border border-border bg-card text-primary">
          <Sparkles className="size-4" />
        </span>
        <p className="text-sm font-semibold text-foreground">Quietly intelligent</p>
        <p className="text-sm text-muted-foreground">
          An assistant is coming — not a chatbot bolted on, but something
          that quietly helps organize your life alongside you.
        </p>
      </Reveal>
    </section>
  );
}
