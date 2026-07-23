const CONNECTIONS = [
  { x1: "15%", y1: "20%", x2: "30%", y2: "35%" },
  { x1: "30%", y1: "35%", x2: "22%", y2: "55%" },
  { x1: "75%", y1: "15%", x2: "85%", y2: "30%" },
  { x1: "85%", y1: "30%", x2: "70%", y2: "45%" },
  { x1: "60%", y1: "70%", x2: "78%", y2: "80%" },
];

const NODES = [
  { cx: "15%", cy: "20%", r: 2, delay: "0s" },
  { cx: "30%", cy: "35%", r: 2.5, delay: "0.4s" },
  { cx: "22%", cy: "55%", r: 2, delay: "0.8s" },
  { cx: "75%", cy: "15%", r: 2, delay: "1.2s" },
  { cx: "85%", cy: "30%", r: 2.5, delay: "0.2s" },
  { cx: "70%", cy: "45%", r: 2, delay: "1s" },
  { cx: "60%", cy: "70%", r: 2, delay: "0.6s" },
  { cx: "78%", cy: "80%", r: 2.5, delay: "1.4s" },
];

/**
 * A single, fixed (viewport-relative, not document-relative) background
 * layer mounted once at the page root, behind the header and every section
 * — this is what makes the page read as one continuous environment rather
 * than a stack of separately-colored blocks. Pure CSS/SVG, no dependency,
 * every animated piece is `motion-safe:`-gated.
 */
export function AmbientField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 text-foreground opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="absolute left-1/4 top-[-10%] size-[46rem] motion-safe:animate-drift"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 20%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute right-[-10%] top-[20%] size-[40rem] motion-safe:animate-drift-alt"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--info) 16%, transparent), transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-[5%] left-[10%] size-[32rem] motion-safe:animate-drift-slow"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklch, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />

      <svg className="absolute inset-0 size-full text-primary">
        <g opacity="0.2" stroke="currentColor" strokeWidth="1">
          {CONNECTIONS.map((line, index) => (
            <line key={index} {...line} />
          ))}
        </g>
        <g fill="currentColor">
          {NODES.map((node, index) => (
            <circle
              key={index}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              className="motion-safe:animate-pulse"
              style={{ animationDelay: node.delay }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
