import type { Metadata } from "next";
import { site } from "@/data/site";

/** Social sharing image, generated at build time by app/og.png/route.tsx. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}: custom software, AI systems, workflow automation and web engineering`,
};

type PageMetadataInput = {
  title: string;
  description: string;
  /** Route path beginning with "/", used for the canonical URL. */
  path: string;
  /** Use the title as-is instead of applying the site title template. */
  absoluteTitle?: boolean;
};

/**
 * Consistent per-page metadata: title, description, canonical URL,
 * Open Graph and Twitter cards. Nested `openGraph` objects replace (rather
 * than merge with) the parent's, so the share image is set on every page.
 */
export function pageMetadata({ title, description, path, absoluteTitle = false }: PageMetadataInput): Metadata {
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: path,
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export const absoluteUrl = (path: string) => `${site.url}${path === "/" ? "" : path}`;
