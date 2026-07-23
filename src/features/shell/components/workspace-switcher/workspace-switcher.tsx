"use client";

import Link from "next/link";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/features/shell/providers/sidebar-provider";
import { useWorkspace } from "@/features/shell/providers/workspace-provider";
import { workspaces } from "@/features/shell/config/workspaces";

export function WorkspaceSwitcher() {
  const current = useWorkspace();
  const { collapsed } = useSidebar();
  const CurrentIcon = current.icon;

  const trigger = (
    <DropdownMenuTrigger asChild>
      <button
        aria-label={collapsed ? `Switch workspace (currently ${current.label})` : undefined}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-semibold text-sidebar-foreground transition-[background-color,color] duration-150 hover:bg-accent hover:text-accent-foreground",
          // `collapsed` is desktop-only (icon rail); the mobile drawer
          // always shows the full label + chevron regardless of it.
          collapsed && "md:w-auto md:justify-center md:px-0"
        )}
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <CurrentIcon className="size-4" />
        </span>
        <span
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2",
            collapsed && "md:hidden"
          )}
        >
          <span className="flex-1 truncate">{current.label}</span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </span>
      </button>
    </DropdownMenuTrigger>
  );

  return (
    <DropdownMenu>
      {collapsed ? (
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <TooltipContent side="right">
            Switch workspace ({current.label})
          </TooltipContent>
        </Tooltip>
      ) : (
        trigger
      )}
      <DropdownMenuContent align="start" className="w-56">
        {workspaces.map((workspace) => {
          const Icon = workspace.icon;
          const active = workspace.id === current.id;
          return (
            <DropdownMenuItem key={workspace.id} asChild>
              <Link
                href={`/${workspace.id}/home`}
                className={cn(active && "bg-accent text-accent-foreground")}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Icon className="size-3.5" />
                </span>
                <span className="flex-1 truncate">{workspace.label}</span>
                {active && (
                  <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
                )}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
