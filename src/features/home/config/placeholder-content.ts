import {
  Cake,
  CalendarClock,
  Car,
  FilePlus,
  FileText,
  FolderPlus,
  type LucideIcon,
  NotebookPen,
  Plane,
  Plus,
  Receipt,
  Stethoscope,
  Wallet,
} from "lucide-react";

import type { WorkspaceId } from "@/features/shell/types";

/**
 * All placeholder content for the Home experience lives here so it's obvious
 * what to swap out for real data once the underlying modules exist — nothing
 * in the component tree should hardcode copy directly.
 */

export const MOTIVATIONAL_LINES = [
  "Everything important is ready.",
  "One place for everything that matters.",
  "Let's make today productive.",
] as const;

export const TODAYS_FOCUS_ITEMS = [
  "Finish AEEC Report",
  "Submit University Assignment",
  "Gym at 6 PM",
  "Review Finances",
] as const;

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "note", label: "New Note", icon: NotebookPen },
  { id: "task", label: "Add Task", icon: Plus },
  { id: "document", label: "Upload Document", icon: FilePlus },
  { id: "expense", label: "Add Expense", icon: Receipt },
  { id: "trip", label: "Plan Trip", icon: Plane },
  { id: "workspace", label: "Create Workspace", icon: FolderPlus },
];

export const WORKSPACE_META: Record<
  WorkspaceId,
  { description: string; lastActivity: string }
> = {
  personal: {
    description: "Your life, organized and private.",
    lastActivity: "Updated 2 hours ago",
  },
  work: {
    description: "Projects, reports, and the day job.",
    lastActivity: "Updated yesterday",
  },
  university: {
    description: "Assignments, notes, and GPA tracking.",
    lastActivity: "Updated 3 days ago",
  },
  "family-business": {
    description: "Customers, invoices, and inventory.",
    lastActivity: "Updated this morning",
  },
};

export interface UpcomingEvent {
  id: string;
  label: string;
  when: string;
  icon: LucideIcon;
}

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  { id: "dentist", label: "Dentist appointment", when: "Tomorrow, 9:00 AM", icon: Stethoscope },
  { id: "flight", label: "Flight to Miami", when: "Friday, 6:40 AM", icon: Plane },
  { id: "meeting", label: "Team meeting", when: "Friday, 2:00 PM", icon: CalendarClock },
  { id: "exam", label: "Statistics exam", when: "Monday, 10:00 AM", icon: FileText },
  { id: "birthday", label: "Mom's birthday", when: "Next Wednesday", icon: Cake },
];

export interface ActivityItem {
  id: string;
  label: string;
  when: string;
  icon: LucideIcon;
}

export const RECENT_ACTIVITY: ActivityItem[] = [
  { id: "expense", label: "Expense report created", when: "2 hours ago", icon: Wallet },
  { id: "passport", label: "Passport uploaded", when: "Yesterday", icon: FileText },
  { id: "trip", label: "Trip to Miami planned", when: "2 days ago", icon: Plane },
  { id: "notes", label: "University notes updated", when: "3 days ago", icon: NotebookPen },
  { id: "vehicle", label: "Vehicle service logged", when: "5 days ago", icon: Car },
  { id: "family", label: "Family Business invoice sent", when: "1 week ago", icon: Receipt },
];
