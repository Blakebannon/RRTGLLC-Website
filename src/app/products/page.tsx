import { products } from "@/data/products";
import { mailto } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/sections/ProductCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Products",
  description:
    "In addition to client work, Red Rocks Technology Group develops and operates its own proprietary software products.",
  path: "/products",
});

const reasons = [
  {
    title: "We live with our decisions",
    body: "Running our own software means we carry the long-term cost of every architecture, hosting and security choice. That experience shapes the recommendations we make to clients.",
  },
  {
    title: "Our methods stay current",
    body: "Product development keeps us working hands-on with modern tools, AI capabilities and deployment practices, not just reading about them.",
  },
  {
    title: "Quality is not negotiable",
    body: "Software that carries our own name has to be reliable, maintainable and secure. We apply that same standard to everything we build for clients.",
  },
];

export default function ProductsPage() {
  const crumbs = [{ name: "Products", path: "/products" }];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        title="We build our own software, too."
        intro={
          <p>
            Alongside client work, Red Rocks Technology Group develops and operates proprietary software. Building
            products of our own keeps our engineering practical and our standards high.
          </p>
        }
        terrain={{ cx: 1250, cy: 420, seed: 3.9 }}
      />

      {products.length > 0 ? (
        <section aria-labelledby="products-heading" className="py-20 sm:py-28">
          <Container>
            <h2 id="products-heading" className="label text-mist">
              Our products
            </h2>
            <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-2">
              {products.map((p) => (
                <li key={p.slug} className="bg-ink-950">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : (
        <section aria-labelledby="announcements-heading" className="py-20 sm:py-28">
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Eyebrow>In development</Eyebrow>
              <h2 id="announcements-heading" className="mt-6 text-title font-medium text-bone">
                Product announcements will appear here.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
              <p className="text-[1.0625rem] leading-relaxed text-mist">
                We&apos;ll share details about our products as they become publicly available. If you&apos;d like to
                hear about them, or you&apos;re interested in early access, send us a note.
              </p>
              <Button href={mailto("Product Updates - Red Rocks Technology Group")} variant="secondary" className="mt-8">
                Ask about our products
              </Button>
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="why-products-heading" className="border-t border-line bg-ink-900 py-24 sm:py-32">
        <Container>
          <h2 id="why-products-heading" className="max-w-2xl text-headline font-medium text-bone">
            Why an engineering services company builds products.
          </h2>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {reasons.map((r) => (
              <li key={r.title} className="reveal border-t border-line-strong pt-7">
                <h3 className="text-lg font-medium tracking-[-0.015em] text-bone">{r.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{r.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Need software that doesn't exist yet?"
        body="The same team that builds our products can build yours. Tell us what you need it to do."
      />
    </>
  );
}
