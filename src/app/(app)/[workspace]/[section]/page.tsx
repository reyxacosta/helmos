import { notFound } from "next/navigation";

import { getSection } from "@/features/shell/config/workspaces";
import { PlaceholderPage } from "@/features/shell/components/placeholder-page";
import { HomePage } from "@/features/home/components/home-page";
import { getProfile } from "@/server/auth/dal";

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

  if (section.id === "home") {
    // Same cache()-memoized call [workspace]/layout.tsx already makes for
    // this request, so this doesn't cost a second round trip.
    const profile = await getProfile();
    return <HomePage displayName={profile?.full_name ?? null} />;
  }

  return <PlaceholderPage icon={section.icon} label={section.label} />;
}
