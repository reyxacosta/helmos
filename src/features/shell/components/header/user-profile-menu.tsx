"use client";

import { LogOut, Moon, Settings, Sun, User } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/features/shell/providers/theme-provider";
import { signOut } from "@/features/auth/actions/sign-out";
import type { CurrentUserSummary } from "@/features/shell/types";

export function UserProfileMenu({ user }: { user: CurrentUserSummary }) {
  const { theme, toggleTheme } = useTheme();
  const displayName = user.fullName || user.email || "HelmOS User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="User menu"
          className="rounded-full opacity-90 ring-primary/40 transition-[opacity,box-shadow] duration-150 hover:opacity-100 hover:ring-2"
        >
          <Avatar name={displayName} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="truncate font-medium text-foreground">{displayName}</span>
          {user.fullName && user.email && (
            <span className="truncate text-xs font-normal text-muted-foreground">
              {user.email}
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User className="size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Settings className="size-4" />
          Account settings
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={toggleTheme}>
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => signOut()}>
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
