import {
  Anchor,
  BarChart3,
  Boxes,
  Briefcase,
  Building2,
  Car,
  CalendarDays,
  ClipboardList,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  GraduationCap,
  Hammer,
  HeartPulse,
  LayoutDashboard,
  NotebookPen,
  Percent,
  Plane,
  Receipt,
  Settings,
  ShieldCheck,
  Target,
  User,
  Users,
  Users2,
  Wallet,
  Wrench,
} from "lucide-react";

import type { WorkspaceConfig } from "@/features/shell/types";

/**
 * Single source of truth for every workspace and its navigation sections.
 * The sidebar, workspace switcher, and [workspace]/[section] route
 * validation all read from this registry.
 */
export const workspaces: WorkspaceConfig[] = [
  {
    id: "personal",
    label: "Personal",
    icon: User,
    sections: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "finance", label: "Finance", icon: Wallet },
      { id: "travel", label: "Travel", icon: Plane },
      { id: "vehicles", label: "Vehicles", icon: Car },
      { id: "health", label: "Health", icon: HeartPulse },
      { id: "goals", label: "Goals", icon: Target },
      { id: "documents", label: "Documents", icon: FileText },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
  {
    id: "work",
    label: "Work",
    icon: Briefcase,
    sections: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "marine-logbook", label: "Marine Logbook", icon: Anchor },
      { id: "projects", label: "Projects", icon: FolderKanban },
      { id: "reports", label: "Reports", icon: BarChart3 },
      { id: "reliability", label: "Reliability", icon: ShieldCheck },
      { id: "equipment", label: "Equipment", icon: Wrench },
      { id: "toolbox", label: "Toolbox", icon: Hammer },
      { id: "settings", label: "Settings", icon: Settings },
    ],
  },
  {
    id: "university",
    label: "University",
    icon: GraduationCap,
    sections: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "degree-planner", label: "Degree Planner", icon: GraduationCap },
      { id: "assignments", label: "Assignments", icon: ClipboardList },
      { id: "notes", label: "Notes", icon: NotebookPen },
      { id: "gpa", label: "GPA", icon: Percent },
      { id: "calendar", label: "Calendar", icon: CalendarDays },
    ],
  },
  {
    id: "family-business",
    label: "Family Business",
    icon: Building2,
    sections: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "customers", label: "Customers", icon: Users },
      { id: "vehicles", label: "Vehicles", icon: Car },
      { id: "estimates", label: "Estimates", icon: FileSpreadsheet },
      { id: "invoices", label: "Invoices", icon: Receipt },
      { id: "inventory", label: "Inventory", icon: Boxes },
      { id: "employees", label: "Employees", icon: Users2 },
    ],
  },
];

export function getWorkspace(id: string) {
  return workspaces.find((workspace) => workspace.id === id);
}

export function getSection(workspaceId: string, sectionId: string) {
  const workspace = getWorkspace(workspaceId);
  return workspace?.sections.find((section) => section.id === sectionId);
}
