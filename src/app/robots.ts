import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

// Production must stay fully indexable. Cloudflare Pages adds
// `X-Robots-Tag: noindex` to preview deployments automatically.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
