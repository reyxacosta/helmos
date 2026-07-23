import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getUser } from "@/server/auth/dal";
import { getPostAuthRedirectPath } from "@/server/auth/get-post-auth-redirect";
import { AmbientField } from "@/features/welcome/components/ambient-field";
import { WelcomeHeader } from "@/features/welcome/components/welcome-header";
import { Hero } from "@/features/welcome/components/hero";
import { WorkspacePreview } from "@/features/welcome/components/workspace-preview";
import { PrivacySection } from "@/features/welcome/components/privacy-section";
import { FutureAiSection } from "@/features/welcome/components/future-ai-section";
import { FinalCtaSection } from "@/features/welcome/components/final-cta-section";
import { WelcomeFooter } from "@/features/welcome/components/welcome-footer";

export const metadata: Metadata = {
  title: "HelmOS — Take the helm of everything that matters.",
};

export default async function RootPage() {
  const user = await getUser();
  if (user) {
    redirect(await getPostAuthRedirectPath());
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <AmbientField />
      <WelcomeHeader />
      <main className="flex-1">
        <Hero />
        <WorkspacePreview />
        <PrivacySection />
        <FutureAiSection />
        <FinalCtaSection />
      </main>
      <WelcomeFooter />
    </div>
  );
}
