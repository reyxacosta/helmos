"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { useSidebar } from "@/features/shell/providers/sidebar-provider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { SectionConfig, WorkspaceId } from "@/features/shell/types";

// useLinkStatus only works inside a descendant of the Link it belongs to,
// hence this being split out rather than called in SidebarNavItem directly.
function NavLinkContent({
  icon: Icon,
  label,
  active,
  collapsed,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  collapsed: boolean;
}) {
  const { pending } = useLinkStatus();

  return (
    <>
      {active && (
        <span
          aria-hidden="true"
          className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-primary"
        />
      )}
      <Icon
        className={cn(
          "size-4 shrink-0",
          active && "text-primary",
          pending && "animate-pulse opacity-60"
        )}
      />
      <span
        className={cn(
          "truncate",
          collapsed && "md:hidden",
          pending && "opacity-60"
        )}
      >
        {label}
      </span>
    </>
  );
}

export function SidebarNavItem({
  workspaceId,
  section,
}: {
  workspaceId: WorkspaceId;
  section: SectionConfig;
}) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  const href = `/${workspaceId}/${section.id}`;
  const active = pathname === href;

  // `collapsed` only describes the desktop icon-rail state — the mobile
  // drawer always shows full labels regardless of it, so the "hide the
  // label" behavior is scoped to the md: breakpoint, not applied globally.
  const link = (
    <Link
      href={href}
      className={cn(
        "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        collapsed && "md:justify-center md:px-0",
        active
          ? "bg-accent font-semibold text-foreground"
          : "font-medium text-sidebar-foreground/70 hover:bg-accent hover:text-accent-foreground"
      )}
      aria-current={active ? "page" : undefined}
    >
      <NavLinkContent
        icon={section.icon}
        label={section.label}
        active={active}
        collapsed={collapsed}
      />
    </Link>
  );

  if (!collapsed) {
    return link;
  }

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{section.label}</TooltipContent>
    </Tooltip>
  );
}
