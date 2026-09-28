import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site to `out/` for Cloudflare Pages (or any static host).
  output: "export",
  // Static export has no image optimization server; the site ships SVG graphics only.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
