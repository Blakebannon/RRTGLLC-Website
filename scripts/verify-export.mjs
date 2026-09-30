/**
 * Post-build checks for the static export in ./out.
 * Zero dependencies; run with `npm run verify` after `npm run build`.
 *
 * Verifies that every route was emitted, every internal link resolves,
 * every mailto link targets the business address, each page has the basic
 * SEO/accessibility structure we rely on, and production stays indexable.
 *
 * SEO checks: unique titles and descriptions, Open Graph/Twitter basics that
 * match the canonical URL, parseable JSON-LD with the expected entity types,
 * an exact sitemap, a crawlable robots.txt, image alt/dimensions, and no
 * development hosts, preview hosts or local filesystem paths in the output.
 *
 * Inquiry form: exactly one form, only on /contact, posting to Web3Forms with
 * the public access key and honeypot; direct email fallback present; CSP
 * allows Web3Forms and nothing broader; no private-credential patterns.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
const EMAIL = "blake.bannon@redrockstechnologygroup.com";
/** Web3Forms public form access key (browser-visible by design) and its only allowed endpoint. */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = "71e4e78a-a2c6-48b4-b1ac-191dc1a03cf4";
const FORM_ROUTE = "/contact";
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
const UNLISTED_ROUTES = ["/products"];
const SERVICE_ROUTES = ROUTES.filter((r) => r.startsWith("/services/"));
/** JSON-LD entity types each route must contain (Organization is required everywhere). */
const EXPECTED_LD = {
  "/": ["WebSite"],
  "/about": ["BreadcrumbList", "Person"],
  ...Object.fromEntries(SERVICE_ROUTES.map((r) => [r, ["BreadcrumbList", "Service"]])),
};
/** Hosts and paths that must never reach production output. */
const FORBIDDEN_OUTPUT = [
  [/localhost|127\.0\.0\.1/i, "a localhost URL"],
  [/\.pages\.dev/i, "a pages.dev preview URL"],
  [/https?:\/\/www\.redrockstechnologygroup\.com/i, "a non-canonical www URL"],
  [/[A-Za-z]:(\\+|\/)(Users|AppForge|Windows)\b|OneDrive/i, "a local filesystem path"],
];
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
  const forms = html.match(/<form\b[^>]*>/gi) ?? [];
  if (name === `${FORM_ROUTE.slice(1)}.html`) {
    if (forms.length !== 1) fail(`${name}: expected exactly one inquiry form, found ${forms.length}`);
  } else if (forms.length) fail(`${name}: contains a <form>; the inquiry form belongs only on ${FORM_ROUTE}`);
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

/* ---------------------------------------------------------------- SEO */

const attr = (html, re) => html.match(re)?.[1];
const titles = new Map();
const descriptions = new Map();
for (const route of ROUTES) {
  const file = routeFile(route);
  if (!existsSync(file)) continue;
  const html = readFileSync(file, "utf8");
  const canonical = `${SITE_URL}${route === "/" ? "" : route}`;

  const title = attr(html, /<title>([^<]*)<\/title>/);
  const description = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!title) fail(`route ${route}: missing <title>`);
  else if (titles.has(title)) fail(`route ${route}: duplicate title (also ${titles.get(title)})`);
  else titles.set(title, route);
  if (description) {
    if (descriptions.has(description)) fail(`route ${route}: duplicate meta description (also ${descriptions.get(description)})`);
    else descriptions.set(description, route);
  }

  const ogUrl = attr(html, /<meta property="og:url" content="([^"]*)"/);
  if (ogUrl !== canonical) fail(`route ${route}: og:url is ${ogUrl ?? "missing"}, expected ${canonical}`);
  for (const prop of ["og:title", "og:description", "og:type", "og:site_name", "og:image:width", "og:image:height"]) {
    if (!new RegExp(`<meta property="${prop}" content="[^"]+"`).test(html)) fail(`route ${route}: missing ${prop}`);
  }
  if (!/<meta name="twitter:card" content="summary_large_image"/.test(html)) fail(`route ${route}: missing twitter:card`);
  if ((html.match(/<link rel="canonical"/g) ?? []).length !== 1) fail(`route ${route}: expected exactly one canonical link`);

  const types = new Set();
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try {
      data = JSON.parse(json);
    } catch {
      fail(`route ${route}: JSON-LD is not valid JSON`);
      continue;
    }
    for (const entity of [data].flat()) {
      if (entity["@context"] !== "https://schema.org") fail(`route ${route}: JSON-LD entity without schema.org @context`);
      [entity["@type"]].flat().forEach((t) => types.add(t));
      const urls = JSON.stringify(entity).match(/https?:\/\/[^"]+/g) ?? [];
      const foreign = urls.filter((u) => !u.startsWith(SITE_URL) && !u.startsWith("https://schema.org"));
      if (foreign.length) fail(`route ${route}: JSON-LD references non-production URL ${foreign[0]}`);
    }
  }
  for (const t of ["Organization", ...(EXPECTED_LD[route] ?? (route === "/" ? [] : ["BreadcrumbList"]))]) {
    if (!types.has(t)) fail(`route ${route}: JSON-LD missing ${t}`);
  }

  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(img)) fail(`route ${route}: <img> without alt attribute`);
    if (!/\swidth="\d+"/.test(img) || !/\sheight="\d+"/.test(img)) fail(`route ${route}: <img> without width/height`);
  }

  const text = html.replace(/<script[\s\S]*?<\/script>/g, "");
  if (/\b(TODO|TBD|FIXME)\b|\[placeholder\]/.test(text)) fail(`route ${route}: contains placeholder text`);
}

// Organization logo: production URL, present in the export, and a PNG of at least 112×112 px.
{
  const home = readFileSync(join(OUT, "index.html"), "utf8");
  const logo = home.match(/"@type":"Organization"[^<]*?"logo":"([^"]+)"/)?.[1];
  if (!logo || !logo.startsWith(`${SITE_URL}/`)) fail(`Organization logo is ${logo ?? "missing"}; expected a ${SITE_URL} URL`);
  else {
    const file = join(OUT, logo.slice(SITE_URL.length));
    if (!existsSync(file)) fail(`Organization logo ${logo} is not in the export`);
    else {
      const png = readFileSync(file);
      const isPng = png.subarray(1, 4).toString() === "PNG";
      const [w, h] = isPng ? [png.readUInt32BE(16), png.readUInt32BE(20)] : [0, 0];
      if (!isPng || w < 112 || h < 112) fail(`Organization logo must be a PNG of at least 112×112 px (found ${isPng ? `${w}×${h}` : "non-PNG"})`);
    }
  }
}

for (const file of walk(OUT).filter((f) => /\.(html|txt|xml)$/.test(f))) {
  const content = readFileSync(file, "utf8");
  for (const [re, what] of FORBIDDEN_OUTPUT) {
    if (re.test(content)) fail(`${relative(OUT, file).split(sep).join("/")}: contains ${what}`);
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
if (!SITE_URL.startsWith("https://")) fail(`site URL ${SITE_URL} is not HTTPS`);
if (new Set(sitemapLocs).size !== sitemapLocs.length) fail("sitemap lists a URL more than once");
const publishedUrls = ROUTES.filter((r) => !UNLISTED_ROUTES.includes(r)).map((r) => `${SITE_URL}${r === "/" ? "" : r}`);
for (const loc of sitemapLocs) if (!publishedUrls.includes(loc)) fail(`sitemap lists unexpected URL ${loc}`);
if (/<lastmod>/.test(sitemap)) fail("sitemap has <lastmod>; omit it unless real modification dates are available");

const robots = readFileSync(join(OUT, "robots.txt"), "utf8");
if (/^\s*Disallow:\s*\/\s*$/im.test(robots)) fail("robots.txt disallows the whole site");
if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail("robots.txt missing production sitemap URL");
if (!/^\s*Allow:\s*\/\s*$/im.test(robots)) fail("robots.txt does not allow crawling");
if (/^\s*Disallow:\s*\/(_next|images)/im.test(robots)) fail("robots.txt blocks assets needed to render pages");

const headers = readFileSync(join(OUT, "_headers"), "utf8");
if (/X-Robots-Tag/i.test(headers)) fail("_headers sets X-Robots-Tag; production must remain indexable");

/* ------------------------------------------------------- Inquiry form */

{
  const html = readFileSync(routeFile(FORM_ROUTE), "utf8");
  const form = html.match(/<form\b[^>]*>([\s\S]*?)<\/form>/i);
  if (!form) fail(`${FORM_ROUTE}: inquiry form missing`);
  else {
    const [tag, inner] = [form[0].slice(0, form[0].indexOf(">") + 1), form[1]];
    if (attr(tag, /\saction="([^"]*)"/) !== WEB3FORMS_ENDPOINT) fail(`${FORM_ROUTE}: form must post to ${WEB3FORMS_ENDPOINT}`);
    if (!/\smethod="post"/i.test(tag)) fail(`${FORM_ROUTE}: form must use POST`);
    const hidden = (n) => attr(inner, new RegExp(`<input[^>]*name="${n}"[^>]*value="([^"]*)"`)) ?? attr(inner, new RegExp(`<input[^>]*value="([^"]*)"[^>]*name="${n}"`));
    if (hidden("access_key") !== WEB3FORMS_ACCESS_KEY) fail(`${FORM_ROUTE}: Web3Forms access_key missing or unexpected`);
    const botcheck = inner.match(/<input\b[^>]*name="botcheck"[^>]*>/)?.[0] ?? "";
    if (!/type="checkbox"/.test(botcheck) || !/display:\s*none/.test(botcheck)) fail(`${FORM_ROUTE}: hidden Web3Forms botcheck honeypot missing`);
    for (const field of ["name", "email", "service", "message"]) {
      const el = inner.match(new RegExp(`<(input|select|textarea)[^>]*name="${field}"[^>]*>`))?.[0];
      if (!el || !/\srequired(=""|\s|>|\/)/.test(el)) fail(`${FORM_ROUTE}: required field "${field}" missing or not required`);
    }
    for (const field of ["company", "phone", "budget"]) {
      if (!new RegExp(`name="${field}"`).test(inner)) fail(`${FORM_ROUTE}: optional field "${field}" missing`);
    }
    for (const [, id] of inner.matchAll(/<(?:input|select|textarea)\b(?![^>]*type="(?:hidden|checkbox)")[^>]*\sid="([^"]+)"/g)) {
      if (!inner.includes(`for="${id}"`)) fail(`${FORM_ROUTE}: form control #${id} has no <label>`);
    }
  }
  if (!html.includes(`href="mailto:${EMAIL}`)) fail(`${FORM_ROUTE}: direct email fallback link missing`);
  if (!/href="\/privacy"/.test(html)) fail(`${FORM_ROUTE}: form consent text should link the Privacy Policy`);
}

// The only Web3Forms URL anywhere in the output (HTML and client JS) is the submit endpoint.
const shipped = walk(OUT).filter((f) => /\.(html|js|txt)$/.test(f));
for (const file of shipped) {
  const content = readFileSync(file, "utf8");
  const name = relative(OUT, file).split(sep).join("/");
  for (const [url] of content.matchAll(/https?:\/\/[a-z0-9.-]*web3forms\.com[^"'`\s)\\]*/gi)) {
    if (url !== WEB3FORMS_ENDPOINT) fail(`${name}: unexpected Web3Forms URL ${url}`);
  }
  // Private credentials must never ship. The Web3Forms access key is public by design and is not matched here.
  if (/sk_(live|test)_[0-9a-zA-Z]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{30,}|xox[abprs]-[A-Za-z0-9-]{10,}/.test(content)) {
    fail(`${name}: contains what looks like a private credential`);
  }
}

// CSP: allow the Web3Forms API for fetch and native form posts, and nothing broader.
const csp = headers.match(/Content-Security-Policy:\s*(.+)/)?.[1] ?? "";
const directive = (d) => csp.match(new RegExp(`(?:^|;)\\s*${d}\\s+([^;]+)`))?.[1]?.trim().split(/\s+/) ?? [];
for (const d of ["connect-src", "form-action"]) {
  const sources = directive(d);
  if (!sources.includes("https://api.web3forms.com")) fail(`_headers: CSP ${d} does not allow https://api.web3forms.com`);
  if (sources.some((src) => src === "*" || src === "https:" || src.includes("*."))) fail(`_headers: CSP ${d} is overly broad`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s) found:\n  - ${errors.join("\n  - ")}`);
  process.exit(1);
}
console.log(`✓ ${ROUTES.length} routes, ${htmlFiles.length} HTML files, ${links} links verified.`);
