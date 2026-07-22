import { notFound } from "next/navigation";

import { getSection } from "@/features/shell/config/workspaces";
import { PlaceholderPage } from "@/features/shell/components/placeholder-page";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ workspace: string; section: string }>;
}) {
  const { workspace, section: sectionId } = await params;
  const section = getSection(workspace, sectionId);

  if (!section) {
    notFound();
  }

  return <PlaceholderPage icon={section.icon} label={section.label} />;
}
