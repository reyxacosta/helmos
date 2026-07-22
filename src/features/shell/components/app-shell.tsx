"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/features/shell/components/sidebar/sidebar";
import { Header } from "@/features/shell/components/header/header";
import { CommandPalette } from "@/features/shell/components/command-palette/command-palette";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex min-h-dvh">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex flex-1 flex-col focus:outline-none"
          >
            {children}
          </main>
        </div>
      </div>
      <CommandPalette />
    </TooltipProvider>
  );
}
