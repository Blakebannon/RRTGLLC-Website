/**
 * Core company facts. Everything here is presented publicly as fact,
 * so only add information that has been confirmed by the owner.
 */
export const site = {
  name: "Red Rocks Technology Group",
  legalName: "Red Rocks Technology Group, LLC",
  shortName: "RRTG",
  email: "blake.bannon@redrockstechnologygroup.com",
  /**
   * Canonical production origin. Override with NEXT_PUBLIC_SITE_URL
   * (no trailing slash) if the site is served from a different host.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://redrockstechnologygroup.com").replace(/\/$/, ""),
  description:
    "Red Rocks Technology Group builds custom software, AI systems, workflow automation and high-performance websites for small and mid-sized businesses.",
  capabilities: ["Software", "AI", "Automation", "Web Engineering"],
  /** Decorative geographic reference used in the visual identity (Red Rocks, Colorado). */
  coordinates: "39.6655° N · 105.2057° W",
} as const;

/** Default subject line used by general "contact us" calls to action. */
export const DEFAULT_SUBJECT = "Project Inquiry - Red Rocks Technology Group";

/**
 * Builds a mailto: link to the primary business address.
 * Newlines in `body` are normalised to CRLF, which mail clients handle most consistently.
 */
export function mailto(subject: string = DEFAULT_SUBJECT, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body.replace(/\r?\n/g, "\r\n"))}`);
  return `mailto:${site.email}?${params.join("&")}`;
}

/** Optional starting structure for inquiries sent from the Contact page. */
export const INQUIRY_BODY_TEMPLATE = `Company:

What we're working on or trying to solve:

What a good outcome would look like:

`;
