/**
 * Deterministic geometry helpers for the decorative SVG graphics.
 * Everything runs at build time inside Server Components, so none of
 * this code is shipped to the browser.
 */

type Point = readonly [number, number];

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Smooth closed path through the points using Catmull–Rom → cubic Bézier conversion. */
export function closedCurve(points: Point[]): string {
  const n = points.length;
  let d = `M${r1(points[0][0])} ${r1(points[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${r1(c1x)} ${r1(c1y)} ${r1(c2x)} ${r1(c2y)} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return `${d}Z`;
}

/** Smooth open path through the points. */
export function openCurve(points: Point[]): string {
  let d = `M${r1(points[0][0])} ${r1(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    d += `C${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return d;
}

export type ContourOptions = {
  cx: number;
  cy: number;
  /** Number of contour rings. */
  levels: number;
  /** Radius of the innermost ring. */
  base: number;
  /** Radial spacing between rings. */
  step: number;
  /** Horizontal stretch applied to every ring. */
  stretch?: number;
  /** Shifts the terrain shape; different seeds give different landforms. */
  seed?: number;
  points?: number;
};

/**
 * Nested contour rings around a single summit. The perturbation drifts only
 * slightly between levels, so rings never intersect — like a real elevation map.
 */
export function contourRings({
  cx,
  cy,
  levels,
  base,
  step,
  stretch = 1.3,
  seed = 0,
  points = 44,
}: ContourOptions): string[] {
  const rings: string[] = [];
  for (let level = 0; level < levels; level++) {
    const r0 = base + level * step;
    const pts: Point[] = [];
    for (let i = 0; i < points; i++) {
      const t = (i / points) * Math.PI * 2;
      const f =
        0.14 * Math.sin(2 * t + 0.9 + seed + level * 0.045) +
        0.075 * Math.sin(3 * t + 2.1 + seed * 1.7 - level * 0.035) +
        0.045 * Math.sin(5 * t + 0.4 + seed * 0.6 + level * 0.06) +
        0.02 * Math.sin(8 * t + seed * 2.3);
      const r = r0 * (1 + f);
      pts.push([cx + Math.cos(t) * r * stretch, cy + Math.sin(t) * r]);
    }
    rings.push(closedCurve(pts));
  }
  return rings;
}

/** Gently undulating, roughly parallel lines — a stylised cross-section of sedimentary strata. */
export function strataLines({
  width,
  height,
  count,
  tilt = 0.12,
  seed = 0,
}: {
  width: number;
  height: number;
  count: number;
  tilt?: number;
  seed?: number;
}): string[] {
  const lines: string[] = [];
  const segments = 14;
  const spacing = height / (count + 1);
  for (let k = 0; k < count; k++) {
    const pts: Point[] = [];
    const y0 = spacing * (k + 1);
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      const u = i / segments;
      const y =
        y0 -
        (x - width / 2) * tilt +
        Math.sin(u * 5.2 + seed + k * 0.35) * spacing * 0.28 +
        Math.sin(u * 11.3 + seed * 2 + k * 0.9) * spacing * 0.08;
      pts.push([x, y]);
    }
    lines.push(openCurve(pts));
  }
  return lines;
}
