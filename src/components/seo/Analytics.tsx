/**
 * Analytics integration point.
 *
 * No analytics are active by default. To enable Cloudflare Web Analytics
 * (cookieless, no personal data), set NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN at
 * build time. Alternatively, enable Web Analytics in the Cloudflare Pages
 * dashboard, which injects the beacon automatically; in that case leave the
 * variable unset so the beacon is not loaded twice.
 *
 * If a different provider is chosen, replace this component and update the
 * Content-Security-Policy in public/_headers and the Privacy page.
 */
export function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;
  if (!token) return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
