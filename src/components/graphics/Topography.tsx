import { contourRings, type ContourOptions } from "./geometry";

type TopographyProps = {
  className?: string;
  /** Terrain parameters in the 1440 × 900 viewBox. */
  terrain?: Partial<ContourOptions>;
  /** Every nth ring is drawn as a heavier "index contour", as on survey maps. */
  indexEvery?: number;
  /** Zero-based ring that is highlighted in the accent colour. */
  accentLevel?: number;
  /** Unique id prefix, required when more than one instance appears on a page. */
  id?: string;
};

const defaults: ContourOptions = {
  cx: 1130,
  cy: 250,
  levels: 22,
  base: 26,
  step: 34,
  stretch: 1.35,
  seed: 0.4,
};

/**
 * Decorative topographic map. Purely presentational: rendered at build time
 * as static SVG with no client-side JavaScript.
 */
export function Topography({ className = "", terrain, indexEvery = 5, accentLevel = 7, id = "topo" }: TopographyProps) {
  const opts = { ...defaults, ...terrain };
  const rings = contourRings(opts);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      className={className}
    >
      <defs>
        <radialGradient id={`${id}-fade`} cx={opts.cx / 1440} cy={opts.cy / 900} r="0.85">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}-mask`}>
          <rect width="1440" height="900" fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`} fill="none" strokeLinejoin="round">
        {rings.map((d, i) => {
          const isAccent = i === accentLevel;
          const isIndex = !isAccent && (i + 1) % indexEvery === 0;
          return (
            <path
              key={i}
              d={d}
              stroke={isAccent ? "var(--color-rock-500)" : "var(--color-sand-300)"}
              strokeOpacity={isAccent ? 0.7 : isIndex ? 0.26 : 0.11}
              strokeWidth={isAccent ? 1.25 : isIndex ? 1.1 : 0.8}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        {/* Summit marker */}
        <g transform={`translate(${opts.cx} ${opts.cy})`} stroke="var(--color-rock-400)" strokeOpacity="0.8">
          <path d="M-7 0H7M0 -7V7" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle r="14" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
        </g>
      </g>
    </svg>
  );
}
