import { Compass } from "lucide-react";

import { PlaceholderPage } from "@/features/shell/components/placeholder-page";

export default function WorkspaceSectionNotFound() {
  return (
    <PlaceholderPage
      icon={Compass}
      label="Section not found"
      description="That's not a section of this workspace. Pick something from the sidebar."
    />
  );
}
