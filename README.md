# Red Rocks Technology Group — Website

The corporate website for **Red Rocks Technology Group, LLC**. RRTG builds custom software, AI systems, workflow automation and websites for small and mid-sized businesses.

This is a static marketing site. It has no server, database, authentication or form backend. It builds to plain HTML/CSS/JS and deploys to **Cloudflare Pages**.

---

## Technology stack

| Concern     | Choice                                                                   |
| ----------- | ------------------------------------------------------------------------ |
| Framework   | Next.js 16 (App Router), `output: "export"` (fully static)               |
| Language    | TypeScript (strict)                                                      |
| Styling     | Tailwind CSS v4, with design tokens in `src/app/globals.css`             |
| Fonts       | Geist and Geist Mono via `next/font`, self-hosted at build time          |
| Graphics    | Topographic and strata SVGs generated at build time. No image or 3D libraries. |
| Hosting     | Cloudflare Pages (static assets on the global CDN)                       |

Runtime dependencies are limited to `next`, `react` and `react-dom`. Only two components ship client JavaScript: the mobile navigation (a native `<dialog>`) and the "copy email" button. All content renders without JavaScript, and the desktop Services dropdown is CSS-only.

## Prerequisites

- Node.js **20.9 or newer** (`.node-version` pins 22 for Cloudflare builds)
- npm 10+

## Getting started

```bash
git clone https://github.com/Blakebannon/RRTGLLC-Website.git
cd RRTGLLC-Website
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Command             | Purpose                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| `npm run dev`       | Local development server with hot reload                               |
| `npm run build`     | Production static export to `out/` (runs `postbuild` automatically)    |
| `npm run preview`   | Serve `out/` locally to check the production build                     |
| `npm run lint`      | ESLint (Next.js core-web-vitals and TypeScript rules)                  |
| `npm run typecheck` | Generate route types, then `tsc --noEmit`                              |
| `npm run verify`    | Post-build checks on `out/` (see below)                                 |
| `npm run check`     | Lint, type-check, build and verify in one step. Run this before pushing. |

`npm run verify` (`scripts/verify-export.mjs`, no dependencies) confirms that:

- every route was emitted with exactly one `<h1>`, a canonical URL on the production domain, a meta description and an OG image, and no `noindex`;
- every internal link and `#anchor` resolves;
- every `mailto:` link targets the business address;
- the build contains no `<form>` elements and no placeholder text;
- unlisted routes (currently `/products`) are built but not linked from other pages or listed in the sitemap;
- the sitemap lists every published route on the production domain, `robots.txt` doesn't block the site, and `_headers` sets no `X-Robots-Tag`;
- `sitemap.xml`, `robots.txt`, `_headers`, `og.png` and `404.html` exist;
- every page has a unique `<title>` and meta description, exactly one canonical, and Open Graph/Twitter tags whose `og:url` matches the canonical;
- JSON-LD parses as JSON and contains the expected types (Organization everywhere, WebSite on the homepage, Service and BreadcrumbList on service pages, Person on About);
- the sitemap lists exactly the published routes, once each, with no `lastmod`, and `robots.txt` allows crawling without blocking assets;
- every `<img>` has `alt`, `width` and `height`;
- no output file contains localhost, `*.pages.dev`, `www.` or local filesystem paths.

`postbuild` (`scripts/flatten-segment-files.mjs`) works around a Next.js static-export bug on **Windows**. The exporter writes client prefetch files (`__next.*.txt`) into nested folders instead of the flat file names the router requests, which causes 404s during client-side navigation. The script flattens them. On Linux and macOS, including Cloudflare's build servers, it does nothing.

## Project structure

```text
src/
  app/                      Routes (App Router). Each page.tsx composes sections.
    layout.tsx              Root layout: fonts, header/footer, site-wide metadata + JSON-LD
    page.tsx                Homepage
    services/…              /services and the four service pages
    products/ work/ about/ contact/ privacy/ terms/
    og.png/route.tsx        Build-time Open Graph image (static PNG)
    sitemap.ts robots.ts    Generated at build time
    icon.svg                Favicon
    not-found.tsx           404 page (exported as 404.html)
    globals.css             Design tokens, base styles, motion
  components/
    layout/                 Header, MobileNav (client), Footer
    sections/               PageHero, SectionHeader, ServicePage template, CTASection,
                            ProcessSteps, PriceRow, CapabilityGrid, LegalPage,
                            ProjectEntry, ProductCard, CaseStudyCard
    ui/                     Button/TextLink, Container, Eyebrow, Logo, Icons,
                            EmailAddress, CopyButton (client)
    graphics/               Topography, Strata, ProjectFigure (schematic illustrations)
                            and their geometry helpers
    seo/                    JsonLd (Organization, WebSite, Service, BreadcrumbList, Person), Analytics
  data/                     All marketing content, kept separate from rendering code
    site.ts                 Company facts, email, mailto() helper
    services.ts             The four services: page copy, search titles, FAQs, related work
    pricing.ts              Starting prices, web packages, ongoing plans
    process.ts navigation.ts
    products.ts             Empty until products are approved for release
    work.ts                 Portfolio projects shown on /work and the homepage
    case-studies.ts         Client case studies; empty until approved
  lib/metadata.ts           Per-page metadata helper (canonical, Open Graph, Twitter)
public/_headers             Cloudflare Pages security and cache headers
public/images/              Owner portrait; rrtg-logo.png (512px PNG of icon.svg, used as the Organization logo)
scripts/                    verify-export.mjs, flatten-segment-files.mjs
```

### Editing content

Most copy changes happen in `src/data/*`, not in page files.

- **Prices:** `src/data/pricing.ts` and `startingPrice` in `src/data/services.ts`
- **Work portfolio:** projects live in `src/data/work.ts`. Each is labeled for what it is (RRTG product, RRTG project, business application, R&D). `featured` entries get the full editorial layout, the rest appear under Additional R&D, `homepage` entries appear in the homepage Selected Work section, and `public: false` hides an entry. Each project uses an approved `image` if one is set, and otherwise one of the built-in schematic `figure` illustrations. Don't add metrics, customers or testimonials that aren't real and approved.
- **Client case studies:** add entries to `caseStudies` in `src/data/case-studies.ts`, only with client permission and verifiable outcomes. A "Client case studies" section appears on `/work` automatically.
- **Products (unlisted at launch):** `/products` is built but kept out of the navigation, the footer and the sitemap until approved products exist. To publish it:
  1. Add entries to `products` in `src/data/products.ts`. The page switches to its product grid automatically.
  2. Add the route to `primaryNav` and `companyNav` in `src/data/navigation.ts`, and to `src/app/sitemap.ts`.
  3. Remove it from `UNLISTED_ROUTES` in `scripts/verify-export.mjs`.
- **Owner profile:** the Meet the Owner section is written directly in `src/app/about/page.tsx`; the portrait is `public/images/blake-bannon.jpg`.
- **Service FAQs and related work:** `faqs` and `relatedWork` on each entry in `src/data/services.ts`. Answers must match approved pricing and policy. Related work refers to project slugs in `src/data/work.ts`, and each project lists the `services` it links back to.

Do not add customers, testimonials, statistics or results that are not real and approved.

## Environment configuration

Every variable is optional. Copy `.env.example` to `.env.local` for local overrides. In Cloudflare, set them under **Settings → Variables and Secrets**. They are read at **build time**.

| Variable                             | Default                                  | Purpose                                                      |
| ------------------------------------ | ---------------------------------------- | ------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`               | `https://redrockstechnologygroup.com`    | Canonical origin for canonical tags, OG URLs, sitemap, robots and JSON-LD |
| `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` | *(unset, so analytics are off)*          | Cloudflare Web Analytics beacon token                        |

`NEXT_PUBLIC_*` values are embedded in public HTML, so never put secrets in them. The site currently has no secrets.

> If production is served from `www.` instead of the apex domain, set `NEXT_PUBLIC_SITE_URL` to match and redirect the other host to it in Cloudflare.

## Contact integration status

**This release uses direct email. There is no contact form, on purpose.**

- Every "Start a Project", "Discuss Your Project" and "Start a Conversation" CTA opens a `mailto:` link to **blake.bannon@redrockstechnologygroup.com**, with a subject line for the context (for example, `Project Inquiry - Red Rocks Technology Group`).
- `/contact` shows the address as selectable text, with a mailto button (pre-filled with a short outline) and a progressive-enhancement copy button.
- The footer shows the address as a visible, clickable link.
- There is no form backend, no API route and no simulated "message sent" state.

**Possible future upgrade (not implemented):** an on-site inquiry form that posts to a Cloudflare Worker, uses Cloudflare Turnstile for spam protection, and delivers mail through Cloudflare Email Service. The static architecture is compatible with that. It would add a Worker and form component, a Turnstile site key (public) and secret (Worker secret), and updates to the `_headers` CSP (`challenges.cloudflare.com`), `scripts/verify-export.mjs` (which currently fails on `<form>`) and the Privacy page.

## Analytics integration status

**No analytics are active.** The integration point is `src/components/seo/Analytics.tsx`. The recommended option is **Cloudflare Web Analytics**, which is cookieless and collects no personal data. Enable it in one of two ways:

1. In the Cloudflare Pages dashboard, turn on Web Analytics. Cloudflare injects the beacon automatically. **or**
2. Set `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` and rebuild.

Use only one method. The CSP in `public/_headers` already allows the Cloudflare beacon. If you choose a different provider, update `Analytics.tsx`, the CSP and the Privacy page together.

## Deployment (Cloudflare Pages)

The site has **not** been deployed yet. To connect it:

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**, then select `Blakebannon/RRTGLLC-Website`.
2. Build settings:

   | Setting                | Value                             |
   | ---------------------- | --------------------------------- |
   | Framework preset       | Next.js (Static HTML Export)      |
   | Production branch      | `main`                            |
   | Build command          | `npm run build`                   |
   | Build output directory | `out`                             |
   | Root directory         | *(blank)*                         |
   | Node version           | from `.node-version` (22)         |

3. Environment variables (optional): `NEXT_PUBLIC_SITE_URL` for Production.
4. **Custom domain:** Pages project → **Custom domains → Set up a domain** → `redrockstechnologygroup.com` (and `www` if wanted). If the domain's DNS is on Cloudflare, records are created automatically. HTTPS certificates are issued and renewed automatically. Add a redirect rule from the non-canonical host to the canonical one.
5. **Preview deployments:** every push to a non-production branch or pull request gets its own `*.pages.dev` preview URL. Cloudflare Pages adds `X-Robots-Tag: noindex` to preview deployments automatically, so the repository adds no noindex rules of its own. Production stays fully indexable, and canonical URLs always point to `https://redrockstechnologygroup.com`.

Pushes to `main` then deploy to production automatically.

**What `public/_headers` configures:** HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, a restrictive `Permissions-Policy`, a Content-Security-Policy, and long-lived immutable caching for fingerprinted `/_next/static/*` assets. The CSP allows `'unsafe-inline'` scripts because Next.js static export inlines its bootstrap scripts. A hash- or nonce-based CSP would need a server or build-time hashing step.

**Other hosts:** `out/` is a plain static site that works on any static host. Only `_headers` is Cloudflare-specific. Pretty URLs (`/about` → `about.html`) must be supported by the host, as Cloudflare Pages does by default. Cloudflare Workers Static Assets also works, with `out/` as the assets directory.

## Search engine optimization

Search intent per page, post-launch Search Console steps, Cloudflare redirect settings, content ideas and the off-site authority plan are in **[SEO_ROADMAP.md](SEO_ROADMAP.md)** (internal, not published).

After deployment, in short:

- Redirect `www` and the production `*.pages.dev` alias to `https://redrockstechnologygroup.com` (details in the roadmap). Cloudflare Pages already redirects `/about.html` and `/about/` to `/about`.
- Verify the domain in Google Search Console via Cloudflare DNS and submit `https://redrockstechnologygroup.com/sitemap.xml`.
- **Google Business Profile:** create one only if RRTG meets Google's eligibility requirements, meaning it meets customers in person at a staffed location or travels to them as a service-area business. If RRTG operates entirely online and doesn't meet customers in person, don't create one, and never use a virtual office or mailbox address to qualify.

## Notes for maintainers

- **Legal pages** (`/privacy`, `/terms`) are starting documents that describe how the site currently works technically. They are **not legal advice**. Have counsel review them, including whether to add a governing-law clause, and update them whenever analytics, forms or data handling change.
- The footer copyright year is set at build time, so each deploy refreshes it.
- `AGENTS.md`/`CLAUDE.md` are generated by `create-next-app` and re-added by `next dev`. They point coding agents to the version-matched Next.js docs in `node_modules/next/dist/docs/`.
