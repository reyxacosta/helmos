"use client";

import * as React from "react";
import { FileText, LayoutDashboard, Search, Settings } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCommandPalette } from "@/features/shell/providers/command-palette-provider";

const EXAMPLE_ITEMS = [
  { icon: LayoutDashboard, label: "Go to Dashboard" },
  { icon: FileText, label: "Go to Documents" },
  { icon: Settings, label: "Go to Settings" },
];

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const [query, setQuery] = React.useState("");

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Command palette</DialogTitle>
        <DialogDescription className="sr-only">
          Search for pages and actions across HelmOS.
        </DialogDescription>

        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search HelmOS..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="p-2">
          <p className="px-2.5 py-1.5 text-xs font-medium text-muted-foreground">
            Examples — search isn&apos;t wired up yet
          </p>
          {EXAMPLE_ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex cursor-not-allowed items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted-foreground/60"
            >
              <Icon className="size-4 shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
