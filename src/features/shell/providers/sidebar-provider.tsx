"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { setCookie } from "@/lib/cookies";
import { SIDEBAR_COOKIE } from "@/features/shell/config/cookies";

interface SidebarContextValue {
  /** Desktop: icon-only rail vs. full-width sidebar. */
  collapsed: boolean;
  toggleCollapsed: () => void;
  /** Mobile: off-canvas drawer open/closed. */
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

export function SidebarProvider({
  initialCollapsed,
  children,
}: {
  initialCollapsed: boolean;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = React.useState(initialCollapsed);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  // Close the mobile drawer whenever navigation happens. Adjusting state
  // during render (React's recommended pattern for this) avoids the extra
  // render pass an effect-based reset would trigger.
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  const toggleCollapsed = React.useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      setCookie(SIDEBAR_COOKIE, next ? "1" : "0");
      return next;
    });
  }, []);

  const value = React.useMemo(
    () => ({ collapsed, toggleCollapsed, mobileOpen, setMobileOpen }),
    [collapsed, toggleCollapsed, mobileOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
