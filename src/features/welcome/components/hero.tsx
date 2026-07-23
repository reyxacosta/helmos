export function Hero() {
  return (
    <section id="about" className="flex flex-col items-center gap-6 px-6 pt-20 pb-24 text-center sm:pt-28 sm:pb-32">
      <p className="animate-fade-in text-sm font-medium tracking-wide text-muted-foreground">
        HelmOS — a personal operating system
      </p>
      <h1 className="max-w-2xl animate-slide-in-from-top text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
        Take the helm of everything that matters.
      </h1>
      <p className="max-w-lg text-balance text-base text-muted-foreground sm:text-lg">
        Personal life, work, school, family business — one calm system, entirely private.
      </p>
    </section>
  );
}
