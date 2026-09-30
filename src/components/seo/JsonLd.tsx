import { site } from "@/data/site";
import type { Service } from "@/data/services";
import { absoluteUrl } from "@/lib/metadata";

type Json = Record<string, unknown>;

/** Renders schema.org structured data. `<` is escaped to prevent breaking out of the script tag. */
export function JsonLd({ data }: { data: Json | Json[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const ORG_ID = `${site.url}/#organization`;
const OWNER_ID = `${site.url}/about#owner`;

/**
 * Site-wide Organization entity, rendered on every page from the root layout.
 * Only verifiable facts are included: no address, phone, ratings or founding date.
 * Plain `Organization` (not a LocalBusiness subtype) because RRTG publishes no
 * physical address.
 */
export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    url: site.url,
    // 512×512 PNG of the icon.svg mark: Google requires a logo of at least 112×112 px.
    logo: absoluteUrl("/images/rrtg-logo.png"),
    image: absoluteUrl("/og.png"),
    email: site.email,
    description: site.description,
    founder: { "@type": "Person", "@id": OWNER_ID, name: site.owner },
    knowsAbout: [
      "Custom software development",
      "Artificial intelligence",
      "Workflow automation",
      "Business process automation",
      "Web development",
      "API integration",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      availableLanguage: "English",
    },
  };
}

/** WebSite entity establishing the preferred site name. Homepage only, per Google's guidance. */
export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: site.shortName,
    url: `${site.url}/`,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
}

/** The owner, as presented in the About page's Meet the Owner section. */
export function ownerSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": OWNER_ID,
    name: site.owner,
    jobTitle: "Owner",
    worksFor: { "@id": ORG_ID },
    image: absoluteUrl("/images/blake-bannon.jpg"),
    url: absoluteUrl("/about"),
  };
}

export function serviceSchema(service: Service): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.metaDescription,
    url: absoluteUrl(service.href),
    provider: { "@id": ORG_ID },
    audience: { "@type": "BusinessAudience", name: "Small and mid-sized businesses" },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: service.startingPrice,
        priceCurrency: "USD",
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
