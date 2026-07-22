"use client";

import * as React from "react";

import { cn } from "@/lib/cn";
import { useSidebar } from "@/features/shell/providers/sidebar-provider";
import { WorkspaceSwitcher } from "@/features/shell/components/workspace-switcher/workspace-switcher";
import { SidebarNav } from "@/features/shell/components/sidebar/sidebar-nav";
import { SidebarCollapseToggle } from "@/features/shell/components/sidebar/sidebar-collapse-toggle";

export function Sidebar() {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();
  const asideRef = React.useRef<HTMLElement>(null);
  const previouslyFocusedRef = React.useRef<HTMLElement | null>(null);

  // Move focus into the drawer when it opens (mobile only — desktop never
  // sets mobileOpen), and back to whatever triggered it when it closes.
  React.useEffect(() => {
    if (mobileOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      asideRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      previouslyFocusedRef.current?.focus();
    }
  }, [mobileOpen]);

  // Escape closes the drawer; Tab is trapped inside it while open, since the
  // backdrop only blocks pointer interaction with the page behind it, not
  // keyboard focus.
  React.useEffect(() => {
    if (!mobileOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key !== "Tab" || !asideRef.current) return;

      const focusable = asideRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, setMobileOpen]);

  return (
    <>
      {/* Mobile backdrop — always mounted so opacity can transition both
          in and out, rather than popping in/out with the conditional render
          a plain mount/unmount would require. */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity duration-200 md:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <aside
        ref={asideRef}
        role={mobileOpen ? "dialog" : undefined}
        aria-modal={mobileOpen ? true : undefined}
        aria-label={mobileOpen ? "Navigation" : undefined}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-dvh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[transform,width] duration-200 ease-out",
          "md:sticky md:top-0 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed && "md:w-[72px]"
        )}
      >
        <div className="flex items-center gap-2 px-2 pt-2">
          <div className="min-w-0 flex-1">
            <WorkspaceSwitcher />
          </div>
        </div>

        <SidebarNav />

        <div className="flex justify-end border-t border-sidebar-border p-2">
          <SidebarCollapseToggle />
        </div>
      </aside>
    </>
  );
}
