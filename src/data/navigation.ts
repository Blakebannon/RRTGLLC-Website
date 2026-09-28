import { services } from "./services";

export type NavLink = { label: string; href: string };

/*
 * /products exists but is intentionally left out of navigation and the sitemap
 * until approved products are published. When src/data/products.ts gains
 * entries, add the route here, in companyNav and in app/sitemap.ts, and remove
 * it from UNLISTED_ROUTES in scripts/verify-export.mjs.
 */
export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const serviceNav: NavLink[] = services.map((s) => ({ label: s.shortName, href: s.href }));

export const companyNav: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
