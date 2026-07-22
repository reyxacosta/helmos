"use client";

import * as React from "react";

import { getWorkspace } from "@/features/shell/config/workspaces";
import type { WorkspaceConfig, WorkspaceId } from "@/features/shell/types";

const WorkspaceContext = React.createContext<WorkspaceConfig | null>(null);

/**
 * Exposes the *current* workspace to the sidebar, header, and any feature
 * deep in the tree — avoids prop-drilling it through every intermediate
 * component.
 *
 * Takes the workspace id (a plain string) rather than the resolved config
 * object: the config's `icon` fields are component references, and React
 * Server Components cannot pass functions/components as props to Client
 * Components. `[workspace]/layout.tsx` already validated the id server-side
 * before rendering this provider, so the lookup here is guaranteed to
 * succeed.
 */
export function WorkspaceProvider({
  workspaceId,
  children,
}: {
  workspaceId: WorkspaceId;
  children: React.ReactNode;
}) {
  const workspace = getWorkspace(workspaceId);
  if (!workspace) {
    throw new Error(`Unknown workspace id: "${workspaceId}"`);
  }

  return (
    <WorkspaceContext.Provider value={workspace}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
