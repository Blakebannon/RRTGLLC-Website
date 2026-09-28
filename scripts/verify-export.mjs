/**
 * Post-build checks for the static export in ./out.
 * Zero dependencies; run with `npm run verify` after `npm run build`.
 *
 * Verifies that every route was emitted, every internal link resolves,
 * every mailto link targets the business address, each page has the basic
 * SEO/accessibility structure we rely on, and production stays indexable.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
const EMAIL = "blake.bannon@redrockstechnologygroup.com";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://redrockstechnologygroup.com").replace(/\/$/, "");
const ROUTES = [
  "/",
  "/services",
  "/services/software-development",
  "/services/artificial-intelligence",
  "/services/automation",
  "/services/web-development",
  "/products",
  "/work",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];
/**
 * Built but intentionally unpublished until they have real content: they must
 * exist, but must not be linked from other pages or listed in the sitemap.
 * See src/data/navigation.ts.
 */
const UNLISTED_ROUTES = ["/products", "/work"];
const REQUIRED_FILES = ["sitemap.xml", "robots.txt", "_headers", "404.html", "icon.svg", "og.png"];

const errors = [];
const fail = (msg) => errors.push(msg);

if (!existsSync(OUT)) {
  console.error(`✗ ${OUT}/ not found. Run \`npm run build\` first.`);
  process.exit(1);
}

const routeFile = (route) => (route === "/" ? join(OUT, "index.html") : join(OUT, `${route.slice(1)}.html`));

/** Resolve an internal URL path the way Cloudflare Pages does for this export. */
function resolves(path) {
  const clean = decodeURIComponent(path.split("#")[0].split("?")[0]);
  if (clean === "" || clean === "/") return existsSync(join(OUT, "index.html"));
  const rel = clean.replace(/^\//, "").replace(/\/$/, "");
  return [rel, `${rel}.html`, join(rel, "index.html")].some((p) => {
    const full = join(OUT, p);
    return existsSync(full) && statSync(full).isFile();
  });
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

for (const f of REQUIRED_FILES) if (!existsSync(join(OUT, f))) fail(`missing ${f}`);

for (const route of ROUTES) {
  const file = routeFile(route);
  if (!existsSync(file)) {
    fail(`route ${route}: missing ${relative(".", file)}`);
    continue;
  }
  const html = readFileSync(file, "utf8");
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(`route ${route}: expected 1 <h1>, found ${h1s.length}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const expectedCanonical = `${SITE_URL}${route === "/" ? "" : route}`;
  if (canonical !== expectedCanonical) fail(`route ${route}: canonical is ${canonical ?? "missing"}, expected ${expectedCanonical}`);
  if (/<meta name="robots" content="[^"]*noindex/i.test(html)) fail(`route ${route}: declares noindex`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) fail(`route ${route}: missing or short meta description`);
  if (!/<meta property="og:image" content="[^"]+\/og\.png"/.test(html)) fail(`route ${route}: missing og:image`);
  if (!html.includes(EMAIL)) fail(`route ${route}: business email not present`);
}

const htmlFiles = walk(OUT).filter((f) => f.endsWith(".html"));
let links = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const name = relative(OUT, file).split(sep).join("/");
  if (/lorem ipsum/i.test(html)) fail(`${name}: contains placeholder text`);
  if (/<form[\s>]/i.test(html)) fail(`${name}: contains a <form>; contact is email-only in this release`);
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    links++;
    if (href === "" || href === "#") fail(`${name}: empty or "#" link`);
    else if (href.startsWith("mailto:")) {
      if (!href.startsWith(`mailto:${EMAIL}`)) fail(`${name}: mailto to unexpected address: ${href}`);
    } else if (href.startsWith("#")) {
      if (!html.includes(`id="${href.slice(1)}"`)) fail(`${name}: in-page anchor ${href} has no target`);
    } else if (href.startsWith("/")) {
      if (!resolves(href)) fail(`${name}: broken internal link ${href}`);
      const path = href.split(/[?#]/)[0];
      const unlisted = UNLISTED_ROUTES.find((r) => path === r);
      if (unlisted && name !== `${unlisted.slice(1)}.html`) fail(`${name}: links to unlisted route ${unlisted}`);
      const hash = href.split("#")[1];
      if (hash) {
        const target = readFileSync(routeFile(href.split("#")[0]), "utf8");
        if (!target.includes(`id="${hash}"`)) fail(`${name}: anchor ${href} has no target`);
      }
    }
  }
}

const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const route of ROUTES) {
  const url = `${SITE_URL}${route === "/" ? "" : route}`;
  const listed = sitemapLocs.includes(url);
  if (UNLISTED_ROUTES.includes(route) ? listed : !listed) {
    fail(`sitemap ${listed ? "should not list" : "missing"} ${url}`);
  }
}
if (sitemapLocs.some((l) => !l.startsWith(`${SITE_URL}/`) && l !== SITE_URL)) fail("sitemap contains a non-production URL");

const robots = readFileSync(join(OUT, "robots.txt"), "utf8");
if (/^\s*Disallow:\s*\/\s*$/im.test(robots)) fail("robots.txt disallows the whole site");
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail("robots.txt missing production sitemap URL");

const headers = readFileSync(join(OUT, "_headers"), "utf8");
if (/X-Robots-Tag/i.test(headers)) fail("_headers sets X-Robots-Tag; production must remain indexable");

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found:\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}
console.log(`✓ ${ROUTES.length} routes, ${htmlFiles.length} HTML files, ${links} links verified.`);
