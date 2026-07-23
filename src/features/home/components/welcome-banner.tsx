import { MOTIVATIONAL_LINES } from "@/features/home/config/placeholder-content";

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getFirstName(fullName: string | null) {
  if (!fullName) return null;
  return fullName.trim().split(/\s+/)[0] ?? null;
}

export function WelcomeBanner({ displayName }: { displayName: string | null }) {
  const now = new Date();
  const greeting = getGreeting(now.getHours());
  const firstName = getFirstName(displayName);
  const date = now.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const line = MOTIVATIONAL_LINES[now.getDate() % MOTIVATIONAL_LINES.length];

  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {greeting}
          {firstName ? `, ${firstName}` : ""}.
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{line}</p>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{date}</p>
    </div>
  );
}
