/**
 * The official HelmOS mark: a hexagon frame with an "H" monogram, both
 * rendered as matching-weight strokes. This is a locked brand asset — see
 * /brand/LOGO_USAGE.md before changing this file. Uses `currentColor` so
 * it adapts correctly to both themes (the reference artwork was produced
 * for a dark surface; the pale stroke it uses there would be invisible in
 * light mode without this).
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
      <path
        d="M12 11V21M20 11V21M12 16H20"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
