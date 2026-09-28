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

/**
 * Site-wide Organization / ProfessionalService and WebSite entities.
 * Only verifiable facts are included — no address, phone, ratings or founding claims.
 */
export function organizationSchema(): Json[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": ["Organization", "ProfessionalService"],
      "@id": ORG_ID,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      logo: absoluteUrl("/icon.svg"),
      image: absoluteUrl("/og.png"),
      email: site.email,
      description: site.description,
      knowsAbout: [
        "Custom software development",
        "Artificial intelligence",
        "Workflow automation",
        "Web engineering",
        "API integration",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        availableLanguage: "English",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
    },
  ];
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
