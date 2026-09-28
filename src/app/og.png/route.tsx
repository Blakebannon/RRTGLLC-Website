import { ImageResponse } from "next/og";
import { OG_IMAGE } from "@/lib/metadata";
import { contourRings } from "@/components/graphics/geometry";

// Emitted once at build time as out/og.png. A route handler (rather than the
// opengraph-image file convention) keeps the .png extension in the static
// export, so Cloudflare Pages serves it with the correct content type.
export const dynamic = "force-static";

export function GET() {
  const rings = contourRings({ cx: 980, cy: 150, levels: 16, base: 24, step: 32, stretch: 1.35, seed: 0.4 });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0a09",
          color: "#efe8de",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
          {rings.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={i === 6 ? "#d06b3d" : "#dcc3a0"}
              strokeOpacity={i === 6 ? 0.8 : (i + 1) % 5 === 0 ? 0.28 : 0.13}
              strokeWidth={i === 6 ? 2 : 1.25}
            />
          ))}
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="56" height="56" viewBox="0 0 32 32">
            <path d="M4 27 13.5 5H19L9.5 27Z" fill="#d06b3d" />
            <path d="M13 27 19.5 12H25L18.5 27Z" fill="#e3895c" fillOpacity="0.85" />
            <path d="M22 27 25 20h4.5l-3 7Z" fill="#dcc3a0" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: -0.5 }}>Red Rocks</div>
            <div style={{ fontSize: 16, letterSpacing: 4, color: "#b3a99d", textTransform: "uppercase" }}>
              Technology Group
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2.5 }}>
            Practical technology for growing businesses.
          </div>
          <div style={{ marginTop: 28, fontSize: 24, color: "#b3a99d", letterSpacing: 1 }}>
            Software · AI · Automation · Web Engineering
          </div>
        </div>
      </div>
    ),
    { width: OG_IMAGE.width, height: OG_IMAGE.height },
  );
}
