"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

import { IconButton } from "@/components/ui/icon-button";
import { useWorkspace } from "@/features/shell/providers/workspace-provider";
import { useCommandPalette } from "@/features/shell/providers/command-palette-provider";
import { MobileNavToggle } from "@/features/shell/components/header/mobile-nav-toggle";
import { CommandPaletteTrigger } from "@/features/shell/components/header/command-palette-trigger";
import { NotificationsTrigger } from "@/features/shell/components/header/notifications-trigger";
import { UserProfileMenu } from "@/features/shell/components/header/user-profile-menu";
import type { CurrentUserSummary } from "@/features/shell/types";

export function Header({ user }: { user: CurrentUserSummary }) {
  const workspace = useWorkspace();
  const pathname = usePathname();
  const { setOpen: setCommandPaletteOpen } = useCommandPalette();
  const activeSectionId = pathname.split("/")[2];
  const activeSection = workspace.sections.find(
    (section) => section.id === activeSectionId
  );

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-sm">
      <MobileNavToggle />

      <h1 className="min-w-0 flex-1 truncate text-sm font-semibold sm:flex-none">
        {activeSection?.label ?? workspace.label}
      </h1>

      <div className="hidden flex-1 justify-center sm:flex">
        <CommandPaletteTrigger />
      </div>

      <div className="flex flex-1 items-center justify-end gap-1 sm:flex-none">
        {/* Below `sm` the full search bar is hidden for space, so the
            palette needs its own discoverable entry point there. */}
        <IconButton
          aria-label="Search"
          onClick={() => setCommandPaletteOpen(true)}
          className="sm:hidden"
        >
          <Search className="size-4" />
        </IconButton>
        <NotificationsTrigger />
        <UserProfileMenu user={user} />
      </div>
    </header>
  );
}
