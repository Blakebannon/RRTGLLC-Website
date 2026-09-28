import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "./PageHero";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

/** Long-form layout for legal documents. */
export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: ReactNode;
}) {
  const crumbs = [{ name: title, path }];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero breadcrumbs={crumbs} title={title} intro={<p className="label text-mist-dim">Last updated {updated}</p>} />
      <Container size="narrow" className="py-16 sm:py-24">
        <div className="prose-rrtg">{children}</div>
      </Container>
    </>
  );
}
