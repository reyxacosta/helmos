"use client";

import { Bell } from "lucide-react";

import { IconButton } from "@/components/ui/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationsTrigger() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-label="Notifications">
          <Bell className="size-4" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <div className="px-2.5 py-6 text-center text-sm text-muted-foreground">
          You&apos;re all caught up.
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
