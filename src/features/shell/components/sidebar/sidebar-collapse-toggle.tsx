"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import { useSidebar } from "@/features/shell/providers/sidebar-provider";

export function SidebarCollapseToggle() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <IconButton
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={toggleCollapsed}
      className="hidden md:inline-flex"
    >
      {collapsed ? (
        <PanelLeftOpen className="size-4" />
      ) : (
        <PanelLeftClose className="size-4" />
      )}
    </IconButton>
  );
}
