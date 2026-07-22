/**
 * The permanent HelmOS mark: a pointy-top hexagon frame (stability,
 * structure, engineering) with a single compass needle pivoting toward
 * the top vertex (direction, precision, focus). No gradients or shadows
 * baked in — flat stroke + one solid fill so it stays crisp from a 16px
 * favicon up to a large hero lockup. Uses `currentColor` throughout so it
 * inherits text color (set `text-primary`, `text-foreground`, etc. on an
 * ancestor, or pass a fixed color where it's rendered outside app CSS).
 *
 * See /brand/LOGO_USAGE.md before changing this file — the shape itself
 * is a fixed brand decision, not a component to redesign per-use.
 */
export function HelmMark({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 3.5L26.8 9.8L26.8 22.2L16 28.5L5.2 22.2L5.2 9.8L16 3.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M16 7L18.8 15.5L16 19L13.2 15.5L16 7Z" fill="currentColor" />
    </svg>
  );
}
