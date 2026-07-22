"use client";

import { useWorkspace } from "@/features/shell/providers/workspace-provider";
import { SidebarNavItem } from "@/features/shell/components/sidebar/sidebar-nav-item";

export function SidebarNav() {
  const workspace = useWorkspace();

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 py-2">
      {workspace.sections.map((section) => (
        <SidebarNavItem
          key={section.id}
          workspaceId={workspace.id}
          section={section}
        />
      ))}
    </nav>
  );
}
