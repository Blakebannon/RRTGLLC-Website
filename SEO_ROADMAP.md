# SEO Roadmap — Red Rocks Technology Group

Internal document. Not published on the website.

The site's on-page and technical SEO lives in the code: page metadata, structured data, sitemap, robots.txt and the checks in `npm run verify`. This document covers the work that can't be done in source code: deployment settings, Search Console, content strategy and building external authority.

---

## 1. Search intent by page

Each important page targets one primary search intent. Keep it that way when editing copy: don't push every keyword onto every page.

| Route | Primary intent | Notes |
| --- | --- | --- |
| `/` | Technology services for small and mid-sized businesses | Brand H1 stays. Supporting copy links each service. |
| `/services` | Technology services for small businesses | Overview and pricing hub. |
| `/services/software-development` | Custom software development for small businesses | Internal tools, portals, web apps, integrations, modernization. |
| `/services/artificial-intelligence` | AI consulting and AI systems for businesses | Advisory and implementation. Knowledge assistants, RAG, private AI. Not "chatbots". |
| `/services/automation` | Workflow automation / business process automation | API integration, data sync, CRM workflows. |
| `/services/web-development` | Small business web development / website design and development | "Web Engineering" remains the brand term. |
| `/work` | Software, AI and automation projects | First-party proof. |
| `/about` | Red Rocks Technology Group (brand / trust) | Includes Meet the Owner. No keyword stuffing. |
| `/contact` | Contact Red Rocks Technology Group | |

Colorado: the site says the company is *rooted in Colorado* (About page, footer). Do **not** add a Denver or other city address, invented offices, or city-specific landing pages ("doorway pages") unless the business genuinely creates distinct, useful market-specific resources.

---

## 2. Deployment: canonical host and redirects

Canonical origin: **`https://redrockstechnologygroup.com`** (apex, HTTPS, no trailing slash). Every canonical tag, `og:url`, sitemap entry and JSON-LD URL uses it, and `npm run verify` fails if the output contains localhost, `*.pages.dev`, `www.` or local file paths.

After connecting the custom domain in Cloudflare Pages, configure and confirm:

1. **`www` → apex.** If `www.redrockstechnologygroup.com` resolves, add a Cloudflare Redirect Rule: `www.redrockstechnologygroup.com/*` → `https://redrockstechnologygroup.com/${1}`, status **301**, preserving the query string.
2. **`*.pages.dev` production alias → apex.** Cloudflare adds `X-Robots-Tag: noindex` to *preview* deployments only. The production alias (`<project>.pages.dev`) is served without it. Canonical tags already point to the apex domain, but a Bulk Redirect from `<project>.pages.dev` to `https://redrockstechnologygroup.com` removes the duplicate completely (Cloudflare documents this as "Redirecting *.pages.dev to a custom domain").
3. **HTTP → HTTPS.** Enable **Always Use HTTPS** (SSL/TLS → Edge Certificates).
4. **Static-export URL variants.** The export writes `about.html`, etc. Cloudflare Pages serves `/about` and redirects `/about.html` and `/about/` to `/about`. Once live, confirm with:
   ```bash
   curl -sI https://redrockstechnologygroup.com/about.html   # expect 308 → /about
   curl -sI https://redrockstechnologygroup.com/about/       # expect 308 → /about
   curl -sI https://www.redrockstechnologygroup.com/         # expect 301 → apex
   ```
   Don't add `_redirects` rules for these. Pages already handles them, and duplicating them risks redirect loops.

---

## 3. Google Search Console: post-launch checklist

Do this once the production domain is live. It uses the owner's Google account, so it isn't automated.

1. Add the property **`redrockstechnologygroup.com`** in [Google Search Console](https://search.google.com/search-console) as a **Domain** property.
2. Verify it with the DNS TXT record. Because DNS is on Cloudflare, use Search Console's Cloudflare option or add the TXT record in Cloudflare DNS.
3. Submit the sitemap: `https://redrockstechnologygroup.com/sitemap.xml`.
4. Use **URL Inspection** on the homepage and check that the canonical Google selected matches the declared one.
5. Request indexing for the homepage and the four service pages. Everything else is discovered through the sitemap and internal links.
6. Check **Enhancements / Rich results** reports for structured-data errors (Organization, Breadcrumbs). The [Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/) are useful for spot checks.
7. Monitor monthly:
   - Pages / indexing status and any "Crawled – currently not indexed" pages
   - Search queries, impressions, click-through rate and average position per page
   - Core Web Vitals (field data appears once there is enough traffic)
8. Fix crawl and indexing problems at their cause. Don't rewrite copy in response to short-term ranking movement.

Optionally, repeat steps 1–3 in **Bing Webmaster Tools**, which can import the Search Console property.

---

## 4. Google Business Profile

Only create a Google Business Profile if RRTG meets Google's eligibility rules: a business that meets customers in person, either at a staffed location during stated hours (storefront) or by traveling to customers (service-area business). Service-area businesses can hide their address.

If RRTG works entirely online and doesn't meet customers in person, it isn't eligible. Don't create a profile with a virtual office, mailbox or home address used only to qualify, because that violates Google's guidelines and risks suspension. Never add a physical address to the website or structured data unless it is real and public.

---

## 5. Content roadmap (not published)

The site deliberately has no blog or `/insights` section yet. Publish articles only when they contain something original, ideally drawn from RRTG's own engineering experience. Generic AI-written content is worse than none.

High-value topics, roughly in priority order:

1. When does custom software make sense for a small business?
2. Custom software vs. off-the-shelf software: how to decide
3. What can AI realistically automate in a small business?
4. AI assistant vs. workflow automation: what's the difference?
5. How to identify business processes worth automating
6. What does custom software cost for a small business?
7. What should a small business website cost?
8. How API integrations eliminate duplicate data entry
9. Private/local AI vs. cloud AI for business
10. Technical case studies of RRTG-owned products (for example, how Apex Sim Coach runs AI locally, or how AutoResearcher structures retrieval and review), once approved

Each article should link to the service page it supports, and each service page can link back to its articles once they exist.

---

## 6. External authority (off-site)

On-site SEO makes the site understandable and technically sound. It can't create domain authority on its own. Legitimate signals to build over time:

- An **RRTG LinkedIn company page** linking to the website
- **Blake Bannon's LinkedIn profile** listing him as Owner of Red Rocks Technology Group, with the website link
- Accurate **business and industry directory listings** with consistent name, website and email (no fake addresses)
- Relevant **Colorado business listings**, such as chambers of commerce or industry associations RRTG actually joins
- **Editorial mentions**, talks or podcasts about genuine RRTG work
- **Customer references and case studies**, only with client permission
- **Technical writing** based on real RRTG engineering experience
- *The Pocketbook of AI Terminology*: where the book is listed or promoted, an author bio that mentions Red Rocks Technology Group and links to the site

### Product backlinks

RRTG develops its own products (for example Apex Sim Coach). In future releases, RRTG-owned product websites, store pages, installers or documentation can state **"Developed by Red Rocks Technology Group"** and link to `https://redrockstechnologygroup.com`. This is a legitimate, factual brand signal. (No external projects were changed as part of this pass.)

### Don't

- Buy links, link packages or "guaranteed ranking" services
- Use automated directory submission or private blog networks
- Create fake listings, reviews or testimonials
- Claim rankings, awards or "#1" status the company doesn't have

---

## 7. Keeping the technical SEO healthy

- Run `npm run check` before every push. `verify` enforces unique titles and descriptions, canonical/OG consistency, JSON-LD validity and types, sitemap contents, robots rules, image alt/dimensions and forbidden hosts/paths.
- New public route: add it to `ROUTES` in `scripts/verify-export.mjs`, `src/app/sitemap.ts` and, if it belongs in navigation, `src/data/navigation.ts`. Give it a unique, descriptive title and description via `pageMetadata()`.
- Publishing `/products`: follow the steps in the README, then give it a real title and description.
- Service FAQs live in `src/data/services.ts`. Answers must match approved pricing and policy. They are deliberately **not** marked up as `FAQPage` structured data: Google deprecated FAQ rich results in May 2026 and no longer displays that feature, so the markup would add nothing. The FAQs stay because they answer real customer questions.
