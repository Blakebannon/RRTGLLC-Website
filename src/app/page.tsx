import Link from "next/link";
import { INQUIRY_HREF, site } from "@/data/site";
import { services } from "@/data/services";
import { homepageProjects } from "@/data/work";
import { assessment, ongoingPricing, projectPricing, formatPrice, PRICING_STATEMENT } from "@/data/pricing";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Button, TextLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Topography } from "@/components/graphics/Topography";
import { Strata } from "@/components/graphics/Strata";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { JsonLd, websiteSchema } from "@/components/seo/JsonLd";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PriceRow } from "@/components/sections/PriceRow";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = pageMetadata({
  title: site.homeTitle,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

/** Hairlines for the hero capability index: a 2×2 grid below lg, a single row above. */
const indexCellBorders = [
  "border-line border-r border-b lg:border-b-0",
  "border-line border-b lg:border-r lg:border-b-0",
  "border-line border-r",
  "border-line",
];

const inlineLink = "text-bone underline decoration-line-strong underline-offset-4 transition-colors hover:text-rock-300 hover:decoration-rock-400";

const frictions = [
  "Repetitive administrative work",
  "Spreadsheets holding critical processes together",
  "Applications that don't talk to each other",
  "The same data entered in several places",
  "A website that no longer reflects the business",
  "Duplicate processes across teams",
  "Information trapped in inboxes and systems",
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <Hero />
      <Problem />
      <Services />
      <WhyRRTG />
      <SelectedWork />
      <Process />
      <Accessible />
      <Pricing />
      <CTASection />
    </>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_30%,black_10%,transparent_70%)]" />
        <Topography id="hero-topo" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-transparent lg:via-ink-950/55" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <Container className="flex min-h-[calc(100svh-4.25rem)] flex-col justify-between pt-16 sm:pt-24 lg:max-h-[60rem] lg:pt-32">
        <div className="max-w-5xl pb-16">
          <p className="label text-sand-300 motion-safe:animate-rise">{site.capabilities.join(" · ")}</p>
          <h1
            id="hero-heading"
            className="mt-7 text-display font-medium text-bone motion-safe:animate-rise motion-safe:[animation-delay:70ms]"
          >
            Practical technology for <span className="text-rock-400">growing businesses.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lede text-mist motion-safe:animate-rise motion-safe:[animation-delay:140ms]">
            Red Rocks Technology Group builds custom software, AI systems, workflow automation and high-performance
            websites for small and mid-sized businesses.
          </p>
          <div className="mt-11 flex flex-col gap-3 motion-safe:animate-rise motion-safe:[animation-delay:210ms] sm:flex-row sm:gap-4">
            <Button href={INQUIRY_HREF} size="lg">
              Start a Project
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Explore Our Services
            </Button>
          </div>
        </div>

        {/* Capability index: what we do, at a glance */}
        <nav aria-label="Capabilities" className="motion-safe:animate-rise motion-safe:[animation-delay:300ms]">
          <ul className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.slug} className={indexCellBorders[i]}>
                <Link
                  href={s.href}
                  className={`group flex h-full items-center justify-between gap-3 py-5 pr-3 transition-colors hover:text-bone sm:py-6 lg:pr-6 ${i % 2 === 1 ? "pl-4 sm:pl-6" : ""} ${i > 0 ? "lg:pl-6" : "lg:pl-0"}`}
                >
                  <span>
                    <span className="label block text-rock-400">0{i + 1}</span>
                    <span className="mt-1.5 block text-[0.9375rem] font-medium text-mist transition-colors group-hover:text-bone sm:text-base">
                      {s.shortName}
                    </span>
                  </span>
                  <ArrowRight className="hidden text-mist-dim group-hover:text-rock-400 sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}

function Problem() {
  return (
    <section aria-labelledby="problem-heading" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="reveal lg:sticky lg:top-32 lg:col-span-6 lg:self-start">
          <Eyebrow index="01">The problem</Eyebrow>
          <h2 id="problem-heading" className="mt-6 text-headline font-medium text-bone">
            Your business shouldn&apos;t have to work around its technology.
          </h2>
        </div>
        <div className="reveal lg:col-span-5 lg:col-start-8 lg:pt-14">
          <p className="text-lede text-mist">
            Most growing businesses accumulate workarounds. Each one made sense at the time, but together they cost
            hours every week and make the company harder to run than it needs to be.
          </p>
          <ul className="mt-10 border-t border-line">
            {frictions.map((f) => (
              <li key={f} className="flex items-baseline gap-4 border-b border-line py-3.5 text-[0.9375rem] text-bone">
                <span aria-hidden="true" className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-rock-400" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-10 text-[1.0625rem] leading-relaxed text-mist">
            We find where that friction comes from and build practical systems to remove it, whether that means{" "}
            <Link href="/services/automation" className={inlineLink}>
              automating a process
            </Link>{" "}
            across the tools you already have, applying{" "}
            <Link href="/services/artificial-intelligence" className={inlineLink}>
              AI where it genuinely helps
            </Link>{" "}
            or{" "}
            <Link href="/services/software-development" className={inlineLink}>
              building custom software
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

function Services() {
  return (
    <section aria-labelledby="services-heading" className="pb-24 sm:pb-32">
      <Container>
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader index="02" eyebrow="What we do" id="services-heading" title="Four capabilities. One engineering team." />
          <TextLink href="/services" className="shrink-0 lg:mb-2">
            All services
          </TextLink>
        </div>

        <ul className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.slug} className="reveal bg-ink-950">
              <Link
                href={s.href}
                className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-ink-900 sm:p-10 lg:p-12"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-px w-0 bg-rock-400 transition-[width] duration-500 ease-out-quart group-hover:w-full"
                />
                <span className="flex items-center gap-6">
                  <span className="label text-rock-400">0{i + 1}</span>
                  <span className="label hidden text-mist-dim sm:block">{s.highlights.join(" / ")}</span>
                </span>
                <h3 className="mt-10 text-title font-medium text-bone sm:mt-14">{s.shortName}</h3>
                <p className="mt-4 max-w-md flex-1 text-[1.0625rem] leading-relaxed text-mist">{s.summary}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-bone">
                  Explore {s.shortName}
                  <ArrowRight className="text-rock-400" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function WhyRRTG() {
  const points: { title: string; body: string; link?: { href: string; label: string } }[] = [
    {
      title: "Engineers, not intermediaries",
      body: "The people you talk to are the people designing and building your system. Requirements aren't lost in handoffs between sales, project management and development.",
    },
    {
      title: "We build our own products",
      body: "Red Rocks Technology Group develops its own software alongside client work. We live with the same decisions about architecture, hosting, security and cost that we recommend to you.",
    },
    {
      title: "Accountable for the result",
      body: "A recommendation is only useful if it works in practice. We take responsibility for implementation, deployment and support, not just the plan.",
    },
  ];

  return (
    <section aria-labelledby="why-heading" className="border-y border-line bg-ink-900 py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <Eyebrow index="03">Why Red Rocks</Eyebrow>
            <h2 id="why-heading" className="mt-6 text-headline font-medium text-bone">
              We don&apos;t just recommend technology. <span className="text-mist">We build it.</span>
            </h2>
          </div>
          <p className="reveal text-lede text-mist lg:col-span-4 lg:col-start-9 lg:self-end">
            Marketing agencies, web designers and strategy consultants each solve part of the problem. We are an
            engineering company, so we can take a problem from first conversation to working software.
          </p>
        </div>

        <div className="mt-16 grid gap-10 sm:mt-20 md:grid-cols-3 md:gap-8">
          {points.map((p) => (
            <div key={p.title} className="reveal border-t border-line-strong pt-7">
              <h3 className="text-lg font-medium tracking-[-0.015em] text-bone">{p.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{p.body}</p>
              {p.link && <TextLink href={p.link.href} className="mt-5">{p.link.label}</TextLink>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SelectedWork() {
  return (
    <section aria-labelledby="work-heading" className="pt-24 sm:pt-32">
      <Container>
        <div className="reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader index="04" eyebrow="Selected work" id="work-heading" title="We build the systems we talk about." />
          <TextLink href="/work" className="shrink-0 lg:mb-2">
            View Our Work
          </TextLink>
        </div>
        <ul className="reveal mt-12 border-t border-line sm:mt-14">
          {homepageProjects.map((p) => (
            <li key={p.slug} className="border-b border-line">
              <Link
                href={`/work#${p.slug}`}
                className="group grid gap-2 py-7 sm:py-8 lg:grid-cols-12 lg:items-baseline lg:gap-10"
              >
                <span className="flex items-center gap-3 text-title font-medium text-bone transition-colors group-hover:text-rock-300 lg:col-span-4">
                  {p.name}
                  <ArrowRight className="size-5 text-mist-dim group-hover:text-rock-400" />
                </span>
                <span className="label text-sand-400 lg:col-span-3">{p.classification.join(" · ")}</span>
                <span className="mt-1 text-[0.9375rem] leading-relaxed text-mist lg:col-span-5 lg:mt-0">
                  {p.shortDescription}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Process() {
  return (
    <section aria-labelledby="process-heading" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          className="reveal"
          index="05"
          eyebrow="How we work"
          id="process-heading"
          title="From first conversation to production."
        >
          <p>
            Strategy matters, but it only pays off once something is built and running. Every engagement follows the
            same path, and we stay responsible for each step.
          </p>
        </SectionHeader>
        <div className="mt-16 sm:mt-20">
          <ProcessSteps />
        </div>
      </Container>
    </section>
  );
}

function Accessible() {
  return (
    <section aria-labelledby="accessible-heading" className="relative isolate overflow-hidden border-y border-line bg-ink-900">
      <Strata className="absolute inset-0 -z-10 h-full w-full opacity-60" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900 via-ink-900/90 to-ink-900/40" />
      <Container className="grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10 lg:py-40">
        <div className="reveal lg:col-span-6">
          <Eyebrow index="06">Our position</Eyebrow>
          <h2 id="accessible-heading" className="mt-6 text-headline font-medium text-bone">
            Big-company technology. <span className="text-sand-300">Small-business practicality.</span>
          </h2>
        </div>
        <div className="reveal space-y-6 text-[1.0625rem] leading-relaxed text-mist lg:col-span-5 lg:col-start-8 lg:pt-14">
          <p>
            Custom applications, integrated systems and intelligent document processing used to be practical only for
            organizations with large IT departments. Cloud infrastructure, mature open-source software and
            commercially available AI models have changed that. The building blocks are now within reach of a
            twenty-person company.
          </p>
          <p>
            What hasn&apos;t changed is the need for someone who can assemble those pieces properly. We bring the
            engineering discipline of a much larger organization, and apply it with the budget, timeline and
            practicality a smaller business requires.
          </p>
          <p className="text-bone">
            Advanced technology should not require a Fortune 500 budget. It should require a clear problem and the
            right team to solve it.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Pricing() {
  return (
    <section aria-labelledby="pricing-heading" className="py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="reveal lg:col-span-4">
          <Eyebrow index="07">Investment</Eyebrow>
          <h2 id="pricing-heading" className="mt-6 text-headline font-medium text-bone">
            Clear starting points.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">{PRICING_STATEMENT}</p>
          <Button href={INQUIRY_HREF} variant="secondary" className="mt-9">
            Discuss Your Project
          </Button>
        </div>

        <div className="reveal lg:col-span-7 lg:col-start-6">
          <div className="divide-y divide-line border-y border-line">
            {projectPricing.map((item) => (
              <PriceRow key={item.name} item={item} />
            ))}
          </div>

          <dl className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {[assessment, ...ongoingPricing].map((item) => (
              <div key={item.name} className="border-l border-line-strong pl-5">
                <dt className="text-[0.9375rem] font-medium text-bone">{item.name}</dt>
                <dd className="mt-1 text-lg font-medium tracking-[-0.02em] text-sand-300 tabular-nums">
                  {item.basis === "from" && <span className="text-sm font-normal text-mist">from </span>}
                  {formatPrice(item)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm leading-relaxed text-mist-dim">
            The Technology Assessment fee may be credited toward a resulting implementation project. Support and
            partnership scope is agreed individually. <Link href="/services#ongoing" className="text-mist underline underline-offset-4 hover:text-bone">Details on ongoing support</Link>.
          </p>
        </div>
      </Container>
    </section>
  );
}
