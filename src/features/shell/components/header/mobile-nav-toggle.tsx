"use client";

import { Menu } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { useSidebar } from "@/features/shell/providers/sidebar-provider";

export function MobileNavToggle() {
  const { setMobileOpen } = useSidebar();

  return (
    <IconButton
      aria-label="Open navigation"
      onClick={() => setMobileOpen(true)}
      className="md:hidden"
    >
      <Menu className="size-4" />
    </IconButton>
  );
}
