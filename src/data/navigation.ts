import { services } from "./services";

export type NavLink = { label: string; href: string };

/*
 * /products and /work exist but are intentionally left out of navigation and
 * the sitemap until approved products or case studies are published. When
 * src/data/products.ts or src/data/case-studies.ts gains entries, add the
 * route back here, in companyNav and in app/sitemap.ts, and remove it from
 * UNLISTED_ROUTES in scripts/verify-export.mjs.
 */
export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const serviceNav: NavLink[] = services.map((s) => ({ label: s.shortName, href: s.href }));

export const companyNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
