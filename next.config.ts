import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site to `out/` for Cloudflare Pages (or any static host).
  output: "export",
  // Static export has no image optimization server; images in /public are served as-is.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
