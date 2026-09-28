import { strataLines } from "./geometry";

/** Decorative sedimentary-strata lines, rendered as static SVG at build time. */
export function Strata({
  className = "",
  count = 11,
  seed = 1.3,
  tilt = 0.1,
}: {
  className?: string;
  count?: number;
  seed?: number;
  tilt?: number;
}) {
  const width = 1440;
  const height = 520;
  const lines = strataLines({ width, height, count, tilt, seed });
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
    >
      <g fill="none">
        {lines.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={i % 4 === 2 ? "var(--color-rock-500)" : "var(--color-sand-300)"}
            strokeOpacity={i % 4 === 2 ? 0.45 : 0.13 + (i % 3) * 0.04}
            strokeWidth={i % 4 === 2 ? 1.25 : 1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
