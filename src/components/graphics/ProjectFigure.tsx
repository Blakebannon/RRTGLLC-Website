import type { ProjectFigure as FigureKind } from "@/data/work";
import { openCurve } from "./geometry";

/**
 * Schematic line illustrations for portfolio entries without approved imagery.
 * They depict the kind of engineering involved (telemetry, orbits, retrieval,
 * reconciliation), not real product screens or data. Rendered as static SVG
 * at build time.
 */

const W = 480;
const H = 360;
const SAND = "var(--color-sand-300)";
const ROCK = "var(--color-rock-500)";
const ROCK_LIGHT = "var(--color-rock-400)";

export const figureCaption: Record<FigureKind, string> = {
  telemetry: "Telemetry analysis",
  orbits: "Orbital simulation",
  retrieval: "Retrieval and review pipeline",
  reconciliation: "Remittance reconciliation",
};

export function ProjectFigure({ kind, className = "" }: { kind: FigureKind; className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox={`0 0 ${W} ${H}`} className={className}>
      <Grid />
      {kind === "telemetry" && <Telemetry />}
      {kind === "orbits" && <Orbits />}
      {kind === "retrieval" && <Retrieval />}
      {kind === "reconciliation" && <Reconciliation />}
    </svg>
  );
}

function Grid() {
  const lines = [];
  for (let x = 40; x < W; x += 40) lines.push(<path key={`x${x}`} d={`M${x} 0V${H}`} />);
  for (let y = 40; y < H; y += 40) lines.push(<path key={`y${y}`} d={`M0 ${y}H${W}`} />);
  return (
    <g stroke={SAND} strokeOpacity="0.06" strokeWidth="1">
      {lines}
    </g>
  );
}

function Label({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill="var(--color-mist-dim)"
      fontFamily="var(--font-mono)"
      fontSize="10"
      letterSpacing="1.2"
    >
      {children}
    </text>
  );
}

function trace(fn: (x: number) => number, from = 60, to = 450, step = 10) {
  const pts: [number, number][] = [];
  for (let x = from; x <= to; x += step) pts.push([x, fn(x)]);
  return openCurve(pts);
}

function Telemetry() {
  const speed = (x: number) => 118 - 58 * Math.sin(x / 48) - 16 * Math.sin(x / 19 + 1);
  const throttle = (x: number) => 228 - 26 * Math.tanh(4 * Math.sin(x / 48 + 0.4));
  const brake = (x: number) => 318 - 44 * Math.max(0, -Math.cos(x / 48 + 0.2)) ** 8;
  const cursor = 318;
  return (
    <g fill="none">
      <Label x={24} y={44}>SPD</Label>
      <Label x={24} y={200}>THR</Label>
      <Label x={24} y={290}>BRK</Label>
      <path d={trace(speed)} stroke={SAND} strokeOpacity="0.75" strokeWidth="1.5" />
      <path d={trace(throttle)} stroke={SAND} strokeOpacity="0.45" strokeWidth="1.25" />
      <path d={trace(brake)} stroke={ROCK} strokeOpacity="0.85" strokeWidth="1.5" />
      <path d={`M60 330H450`} stroke={SAND} strokeOpacity="0.2" />
      <path d={`M${cursor} 24V334`} stroke={ROCK_LIGHT} strokeOpacity="0.7" strokeDasharray="3 4" />
      <circle cx={cursor} cy={speed(cursor)} r="4" fill="var(--color-ink-900)" stroke={ROCK_LIGHT} strokeWidth="1.5" />
      <circle cx={cursor} cy={brake(cursor)} r="3" fill={ROCK_LIGHT} />
      <Label x={cursor + 8} y={36}>LIVE</Label>
    </g>
  );
}

function Orbits() {
  const cx = 230;
  const cy = 182;
  const tilt = (-20 * Math.PI) / 180;
  const point = (rx: number, ry: number, t: number) => [
    cx + rx * Math.cos(t) * Math.cos(tilt) - ry * Math.sin(t) * Math.sin(tilt),
    cy + rx * Math.cos(t) * Math.sin(tilt) + ry * Math.sin(t) * Math.cos(tilt),
  ];
  const orbits = [
    { rx: 58, ry: 40, o: 0.35 },
    { rx: 118, ry: 82, o: 0.5 },
    { rx: 198, ry: 136, o: 0.3 },
  ];
  const [px, py] = point(118, 82, 2.4);
  const [sx, sy] = point(158, 108, -0.9);
  // Transfer arc between the second and third orbits.
  const transfer: [number, number][] = [];
  for (let t = -2.6; t <= -0.9; t += 0.12) {
    const k = (t + 2.6) / 1.7;
    const [x, y] = point(118 + 80 * k, 82 + 54 * k, t);
    transfer.push([x, y]);
  }
  return (
    <g fill="none">
      {orbits.map((o) => (
        <ellipse
          key={o.rx}
          cx={cx}
          cy={cy}
          rx={o.rx}
          ry={o.ry}
          transform={`rotate(-20 ${cx} ${cy})`}
          stroke={SAND}
          strokeOpacity={o.o}
        />
      ))}
      <circle cx={cx} cy={cy} r="9" fill={SAND} fillOpacity="0.85" />
      <circle cx={cx} cy={cy} r="18" stroke={SAND} strokeOpacity="0.2" />
      <circle cx={px} cy={py} r="5" fill="var(--color-ink-900)" stroke={SAND} strokeWidth="1.5" />
      <path d={openCurve(transfer)} stroke={ROCK} strokeWidth="1.5" strokeDasharray="4 4" />
      <path d={`M${sx} ${sy}l26 -20`} stroke={ROCK_LIGHT} strokeWidth="1.5" />
      <path d={`M${sx + 26} ${sy - 20}l-9 1.5M${sx + 26} ${sy - 20}l-3.5 8.5`} stroke={ROCK_LIGHT} strokeWidth="1.5" />
      <circle cx={sx} cy={sy} r="3.5" fill={ROCK_LIGHT} />
      <Label x={24} y={36}>Δt = FIXED STEP</Label>
      <Label x={456} y={336} anchor="end">TRANSFER BURN</Label>
    </g>
  );
}

function Retrieval() {
  const docs = [70, 130, 190, 250];
  const chunks = Array.from({ length: 10 }, (_, i) => 78 + i * 22);
  const hits = new Set([2, 5, 6]);
  const node = { x: 262, y: 180 };
  const loop = [
    { x: 360, y: 138, label: "DRAFT" },
    { x: 404, y: 214, label: "CRITIQUE" },
    { x: 316, y: 214, label: "REVISE" },
  ];
  return (
    <g fill="none">
      <Label x={24} y={36}>SOURCES</Label>
      <Label x={138} y={36}>INDEX</Label>
      <Label x={node.x} y={36} anchor="middle">RETRIEVE</Label>
      <Label x={360} y={36} anchor="middle">REVIEW</Label>
      {docs.map((y) => (
        <g key={y}>
          <rect x="24" y={y - 22} width="68" height="44" stroke={SAND} strokeOpacity="0.45" />
          <path d={`M34 ${y - 10}h46M34 ${y}h38M34 ${y + 10}h42`} stroke={SAND} strokeOpacity="0.25" />
          <path d={`M92 ${y}C112 ${y} 116 ${y} 136 ${y}`} stroke={SAND} strokeOpacity="0.15" />
        </g>
      ))}
      {chunks.map((y, i) => (
        <rect
          key={y}
          x="138"
          y={y - 6}
          width="12"
          height="12"
          stroke={hits.has(i) ? ROCK_LIGHT : SAND}
          strokeOpacity={hits.has(i) ? 0.9 : 0.35}
          fill={hits.has(i) ? ROCK : "none"}
          fillOpacity={hits.has(i) ? 0.35 : 0}
        />
      ))}
      {[...hits].map((i) => (
        <path
          key={i}
          d={`M150 ${chunks[i]}C200 ${chunks[i]} 210 ${node.y} ${node.x - 22} ${node.y}`}
          stroke={ROCK_LIGHT}
          strokeOpacity="0.7"
        />
      ))}
      <circle cx={node.x} cy={node.y} r="22" stroke={ROCK_LIGHT} strokeWidth="1.5" />
      <circle cx={node.x} cy={node.y} r="4" fill={ROCK_LIGHT} />
      <path d={`M${node.x + 22} ${node.y}C300 ${node.y} 300 ${loop[0].y} ${loop[0].x - 10} ${loop[0].y}`} stroke={SAND} strokeOpacity="0.5" />
      {loop.map((n, i) => {
        const next = loop[(i + 1) % loop.length];
        return (
          <g key={n.label}>
            <path d={`M${n.x} ${n.y}L${next.x} ${next.y}`} stroke={SAND} strokeOpacity="0.4" strokeDasharray="3 4" />
            <circle cx={n.x} cy={n.y} r="10" fill="var(--color-ink-900)" stroke={SAND} strokeOpacity="0.8" />
            <Label x={n.x} y={n.y + (i === 0 ? -18 : 28)} anchor="middle">{n.label}</Label>
          </g>
        );
      })}
      <path d="M404 214C430 214 430 290 404 290H392" stroke={SAND} strokeOpacity="0.5" />
      <rect x="316" y="276" width="76" height="30" stroke={ROCK_LIGHT} strokeOpacity="0.8" />
      <path d="M326 287h40M326 296h28" stroke={SAND} strokeOpacity="0.4" />
      <Label x={354} y={330} anchor="middle">OUTPUT</Label>
    </g>
  );
}

function Reconciliation() {
  const rows = Array.from({ length: 9 }, (_, i) => 70 + i * 26);
  // Left row index → matching right row index. Missing entries are exceptions.
  const matches: Record<number, number> = { 0: 1, 1: 0, 2: 2, 4: 3, 5: 5, 6: 4, 8: 7 };
  const exceptions = [3, 7];
  return (
    <g fill="none">
      <Label x={24} y={44}>REMITTANCE · 835</Label>
      <Label x={456} y={44} anchor="end">BILLING</Label>
      {rows.map((y, i) => (
        <g key={y}>
          <rect
            x="24"
            y={y - 9}
            width="136"
            height="18"
            stroke={exceptions.includes(i) ? ROCK_LIGHT : SAND}
            strokeOpacity={exceptions.includes(i) ? 0.9 : 0.35}
          />
          <path d={`M32 ${y}h34M76 ${y}h22M110 ${y}h40`} stroke={SAND} strokeOpacity="0.3" />
          <rect x="320" y={y - 9} width="136" height="18" stroke={SAND} strokeOpacity="0.35" />
          <path d={`M328 ${y}h40M378 ${y}h22M412 ${y}h34`} stroke={SAND} strokeOpacity="0.3" />
        </g>
      ))}
      {Object.entries(matches).map(([l, r]) => {
        const y1 = rows[+l];
        const y2 = rows[r];
        return <path key={l} d={`M160 ${y1}C240 ${y1} 240 ${y2} 320 ${y2}`} stroke={SAND} strokeOpacity="0.4" />;
      })}
      {exceptions.map((i) => (
        <path key={i} d={`M160 ${rows[i]}C210 ${rows[i]} 220 318 240 318`} stroke={ROCK_LIGHT} strokeOpacity="0.85" strokeDasharray="3 4" />
      ))}
      <rect x="200" y="306" width="80" height="24" stroke={ROCK_LIGHT} strokeOpacity="0.9" fill={ROCK} fillOpacity="0.12" />
      <Label x={240} y={346} anchor="middle">FOLLOW-UP</Label>
    </g>
  );
}
