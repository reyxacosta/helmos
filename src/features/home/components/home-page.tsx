import { Reveal } from "@/components/ui/reveal";
import { HomeAmbientBackground } from "@/features/home/components/home-ambient-background";
import { WelcomeBanner } from "@/features/home/components/welcome-banner";
import { TodaysFocusCard } from "@/features/home/components/todays-focus-card";
import { QuickActions } from "@/features/home/components/quick-actions";
import { WorkspacesOverview } from "@/features/home/components/workspaces-overview";
import { UpcomingTimeline } from "@/features/home/components/upcoming-timeline";
import { RecentActivity } from "@/features/home/components/recent-activity";

export function HomePage({ displayName }: { displayName: string | null }) {
  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-8 sm:px-8 sm:py-10">
      <HomeAmbientBackground />

      <Reveal>
        <WelcomeBanner displayName={displayName} />
      </Reveal>

      <Reveal delay={80}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TodaysFocusCard />
          </div>
          <QuickActions />
        </div>
      </Reveal>

      <Reveal delay={160}>
        <WorkspacesOverview />
      </Reveal>

      <Reveal delay={240}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <UpcomingTimeline />
          <RecentActivity />
        </div>
      </Reveal>
    </div>
  );
}
