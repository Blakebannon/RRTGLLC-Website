import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

/*
 * Canonical public routes only. `lastModified` is deliberately omitted: a build
 * timestamp would claim every page changed on every deploy. `priority` and
 * `changeFrequency` are omitted because Google ignores them.
 */
const routes = [
  "/",
  "/services",
  ...services.map((s) => s.href),
  "/work",
  "/about",
  "/contact",
  // /products is omitted until it has published content (see src/data/navigation.ts).
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({ url: absoluteUrl(path) }));
}
