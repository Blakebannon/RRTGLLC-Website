import Link from "next/link";
import { mailto } from "@/data/site";
import { services } from "@/data/services";
import { assessment, formatPrice, ongoingPricing } from "@/data/pricing";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Custom software development, artificial intelligence, workflow automation and web engineering for small and mid-sized businesses, delivered by one engineering team.",
  path: "/services",
});

const combinations = [
  {
    title: "A website that feeds your sales process",
    body: "A new site whose inquiries arrive in your CRM already qualified and assigned, with follow-up handled automatically.",
    uses: ["Web Engineering", "Workflow Automation"],
  },
  {
    title: "An assistant that knows your operation",
    body: "An internal AI assistant grounded in your procedures and documents, available inside the tools your team already uses.",
    uses: ["Artificial Intelligence", "Custom Software"],
  },
  {
    title: "One system instead of five spreadsheets",
    body: "A purpose-built application that replaces scattered tracking files and syncs with accounting and scheduling.",
    uses: ["Custom Software", "Workflow Automation"],
  },
];

export default function ServicesPage() {
  const crumbs = [{ name: "Services", path: "/services" }];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        title="Technology built for the way your business actually works."
        intro={
          <p>
            Custom software, artificial intelligence, workflow automation and web engineering are four capabilities of
            one engineering team. Most real business problems involve more than one of them, so we don&apos;t treat
            them as separate businesses.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button href={mailto()} size="lg">
            Start a Project
          </Button>
          <Button href="#capabilities" variant="secondary" size="lg">
            View capabilities
          </Button>
        </div>
      </PageHero>

      <section id="capabilities" aria-label="Capabilities" className="py-20 sm:py-28">
        <Container>
          <ul className="border-t border-line">
            {services.map((s, i) => (
              <li key={s.slug} className="reveal border-b border-line">
                <Link
                  href={s.href}
                  className="group grid gap-6 py-10 transition-colors sm:py-12 lg:grid-cols-12 lg:gap-10"
                >
                  <div className="lg:col-span-4">
                    <p className="label text-rock-400">0{i + 1}</p>
                    <h2 className="mt-3 flex items-center gap-3 text-title font-medium text-bone transition-colors group-hover:text-rock-300">
                      {s.name}
                      <ArrowRight className="size-5 text-mist-dim group-hover:text-rock-400" />
                    </h2>
                    <p className="mt-3 text-sm text-mist">
                      Projects start at{" "}
                      <span className="font-medium text-sand-300 tabular-nums">{formatPrice({ amount: s.startingPrice })}</span>
                    </p>
                  </div>
                  <p className="text-[1.0625rem] leading-relaxed text-mist lg:col-span-4">{s.intro}</p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 self-start sm:grid-cols-3 lg:col-span-3 lg:col-start-10 lg:grid-cols-1">
                    {s.capabilities.slice(0, 5).map((c) => (
                      <li key={c.title} className="flex items-baseline gap-2.5 text-sm text-mist">
                        <span aria-hidden="true" className="h-px w-2.5 shrink-0 translate-y-[-0.3em] bg-line-strong group-hover:bg-rock-400" />
                        {c.title}
                      </li>
                    ))}
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="together-heading" className="border-y border-line bg-ink-900 py-24 sm:py-32">
        <Container>
          <SectionHeader className="reveal" eyebrow="Working together" id="together-heading" title="Most solutions combine more than one capability.">
            <p>
              Because one team handles the whole system, the website, the automation behind it and the software it
              connects to are designed together. A few typical examples of how the pieces fit:
            </p>
          </SectionHeader>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {combinations.map((c) => (
              <li key={c.title} className="reveal border-t border-line-strong pt-7">
                <h3 className="text-lg font-medium tracking-[-0.015em] text-bone">{c.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{c.body}</p>
                <p className="label mt-5 text-sand-400">{c.uses.join(" + ")}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="assessment-heading" className="py-24 sm:py-32">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-6">
            <Eyebrow>Not sure where to start?</Eyebrow>
            <h2 id="assessment-heading" className="mt-6 text-headline font-medium text-bone">
              {assessment.name}
            </h2>
          </div>
          <div className="reveal lg:col-span-5 lg:col-start-8 lg:pt-12">
            <p className="text-[2.5rem] leading-none font-medium tracking-[-0.04em] text-sand-300 tabular-nums">
              {formatPrice(assessment)}
            </p>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">{assessment.description}</p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-mist">
              It is a practical way to get an experienced outside view of your systems and processes before committing
              to a larger project.
            </p>
            <Button href={mailto("Technology Assessment - Red Rocks Technology Group")} variant="secondary" className="mt-8">
              Ask about an assessment
            </Button>
          </div>
        </Container>
      </section>

      <section id="ongoing" aria-labelledby="ongoing-heading" className="border-t border-line py-24 sm:py-32">
        <Container>
          <SectionHeader className="reveal" eyebrow="Ongoing support" id="ongoing-heading" title="Technology that keeps working after launch.">
            <p>
              Systems need care as your business changes. Ongoing plans give you a dependable team to maintain, improve
              and extend what we build. Exact scope is agreed separately for each customer, and larger development
              work is always scoped on its own.
            </p>
          </SectionHeader>
          <ul className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-2">
            {ongoingPricing.map((plan) => (
              <li key={plan.name} className="reveal bg-ink-950 p-7 sm:p-10">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <h3 className="text-title font-medium text-bone">{plan.name}</h3>
                  <p className="flex items-baseline gap-2">
                    <span className="text-sm text-mist">From</span>
                    <span className="text-2xl font-medium tracking-[-0.03em] text-sand-300 tabular-nums">{formatPrice(plan)}</span>
                  </p>
                </div>
                <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-mist">{plan.description}</p>
                <ul className="mt-8 grid gap-x-6 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2">
                  {plan.includes?.map((inc) => (
                    <li key={inc} className="flex items-baseline gap-3 text-[0.9375rem] text-bone">
                      <span aria-hidden="true" className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-rock-400" />
                      {inc}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
