/**
 * A restrained version of the welcome page's ambient field, scoped to the
 * Home page container (not viewport-fixed) and faded out before it reaches
 * the card grid — texture behind the greeting, not decoration competing
 * with a dense, everyday screen.
 */
export function HomeAmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem] overflow-hidden">
      <div
        className="absolute left-1/4 top-[-30%] size-[34rem] motion-safe:animate-drift"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute right-[5%] top-[-20%] size-[26rem] motion-safe:animate-drift-alt"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--info) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
