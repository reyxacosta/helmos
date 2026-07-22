"use client";

import { Search } from "lucide-react";

import { useCommandPalette } from "@/features/shell/providers/command-palette-provider";

export function CommandPaletteTrigger() {
  const { setOpen } = useCommandPalette();

  return (
    <button
      onClick={() => setOpen(true)}
      className="flex h-8 w-full max-w-xs items-center gap-2 rounded-md border border-border bg-muted/50 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
    >
      <Search className="size-3.5 shrink-0" />
      <span className="flex-1 truncate text-left">Search...</span>
      <kbd className="hidden shrink-0 items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
        ⌘K
      </kbd>
    </button>
  );
}
