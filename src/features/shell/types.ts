import type { LucideIcon } from "lucide-react";

export type Theme = "light" | "dark";

export type WorkspaceId = "personal" | "work" | "university" | "family-business";

export interface SectionConfig {
  /** URL slug, e.g. "marine-logbook" */
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface WorkspaceConfig {
  id: WorkspaceId;
  label: string;
  icon: LucideIcon;
  sections: SectionConfig[];
}
