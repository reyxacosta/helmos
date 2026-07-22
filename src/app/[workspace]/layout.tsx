import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { getWorkspace } from "@/features/shell/config/workspaces";
import { SIDEBAR_COOKIE } from "@/features/shell/config/cookies";
import { SidebarProvider } from "@/features/shell/providers/sidebar-provider";
import { WorkspaceProvider } from "@/features/shell/providers/workspace-provider";
import { CommandPaletteProvider } from "@/features/shell/providers/command-palette-provider";
import { AppShell } from "@/features/shell/components/app-shell";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspace: string }>;
}) {
  const { workspace: workspaceId } = await params;
  const workspace = getWorkspace(workspaceId);

  if (!workspace) {
    notFound();
  }

  const cookieStore = await cookies();
  const collapsed = cookieStore.get(SIDEBAR_COOKIE)?.value === "1";

  return (
    <WorkspaceProvider workspaceId={workspace.id}>
      <SidebarProvider initialCollapsed={collapsed}>
        <CommandPaletteProvider>
          <AppShell>{children}</AppShell>
        </CommandPaletteProvider>
      </SidebarProvider>
    </WorkspaceProvider>
  );
}
