import Link from "next/link";
import type { ReactNode } from "react";
import { mailto } from "@/data/site";
import { services, type Service } from "@/data/services";
import { assessment, formatPrice } from "@/data/pricing";
import { processSteps } from "@/data/process";
import { projects } from "@/data/work";
import { Container } from "@/components/ui/Container";
import { Button, TextLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "./PageHero";
import { SectionHeader } from "./SectionHeader";
import { CapabilityGrid } from "./CapabilityGrid";
import { CTASection } from "./CTASection";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/components/seo/JsonLd";

type ServicePageProps = {
  service: Service;
  /** Page-specific sections rendered after the capability grid. */
  children?: ReactNode;
  /** Optional replacement for the default investment section. */
  investment?: ReactNode;
  terrainSeed?: number;
};

/** Shared structure for every page under /services/*. */
export function ServicePage({ service, children, investment, terrainSeed = 2.2 }: ServicePageProps) {
  const index = services.findIndex((s) => s.slug === service.slug) + 1;
  const related = services.filter((s) => s.slug !== service.slug);
  const crumbs = [
    { name: "Services", path: "/services" },
    { name: service.shortName, path: service.href },
  ];

  return (
    <>
      <JsonLd data={[serviceSchema(service), breadcrumbSchema(crumbs)]} />

      <PageHero breadcrumbs={crumbs} title={service.headline} intro={<p>{service.intro}</p>} terrain={{ seed: terrainSeed }}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <Button href={mailto(service.inquirySubject)} size="lg">
            Discuss Your Project
          </Button>
          <p className="flex items-baseline gap-3">
            <span className="label text-mist-dim">Projects start at</span>
            <span className="text-2xl font-medium tracking-[-0.03em] text-sand-300 tabular-nums">
              {formatPrice({ amount: service.startingPrice })}
            </span>
          </p>
        </div>
      </PageHero>

      {/* Context */}
      <section aria-labelledby="context-heading" className="py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-6">
            <Eyebrow index={`0${index}`}>{service.name}</Eyebrow>
            <h2 id="context-heading" className="mt-6 text-title font-medium text-bone lg:text-[2.5rem] lg:leading-[1.1]">
              {service.context.heading}
            </h2>
          </div>
          <div className="reveal space-y-6 text-[1.0625rem] leading-relaxed text-mist lg:col-span-5 lg:col-start-8 lg:pt-12">
            {service.context.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities-heading" className="pb-24 sm:pb-32">
        <Container>
          <SectionHeader className="reveal" eyebrow="Capabilities" id="capabilities-heading" title={service.capabilitiesHeading} />
          <div className="reveal mt-12 sm:mt-14">
            <CapabilityGrid items={service.capabilities} />
          </div>
        </Container>
      </section>

      {children}

      <RelatedWork service={service} />

      {investment ?? <Investment service={service} />}

      <HowWeWork />

      <FAQ service={service} />

      <RelatedServices related={related} />

      <CTASection subject={service.inquirySubject} cta="Discuss Your Project" />
    </>
  );
}

function Investment({ service }: { service: Service }) {
  return (
    <section aria-labelledby="investment-heading" className="border-y border-line bg-ink-900 py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="reveal lg:col-span-5">
          <Eyebrow>Investment</Eyebrow>
          <h2 id="investment-heading" className="mt-6 text-title font-medium text-bone">
            Scoped to the problem, not padded with complexity.
          </h2>
        </div>
        <div className="reveal lg:col-span-6 lg:col-start-7">
          <p className="label text-mist-dim">Starting at</p>
          <p className="mt-2 text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none font-medium tracking-[-0.045em] text-bone tabular-nums">
            {formatPrice({ amount: service.startingPrice })}
          </p>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">{service.priceNote}</p>
          <AssessmentNote />
        </div>
      </Container>
    </section>
  );
}

export function AssessmentNote() {
  return (
    <div className="mt-8 border-l-2 border-rock-500 pl-5">
      <p className="text-[0.9375rem] font-medium text-bone">
        Not sure what you need? Start with a {assessment.name} ({formatPrice(assessment)}).
      </p>
      <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-mist">{assessment.description}</p>
    </div>
  );
}

function HowWeWork() {
  return (
    <section aria-labelledby="how-heading" className="py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="reveal lg:col-span-4">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="how-heading" className="mt-6 text-title font-medium text-bone">
            We stay with it from first conversation to production.
          </h2>
        </div>
        <ol className="reveal border-t border-line lg:col-span-7 lg:col-start-6">
          {processSteps.map((step) => (
            <li key={step.number} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[4rem_9rem_1fr] sm:gap-4">
              <span className="label pt-1 text-rock-400">{step.number}</span>
              <span className="font-medium text-bone">{step.title}</span>
              <span className="text-[0.9375rem] leading-relaxed text-mist">{step.description}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/** First-party proof: RRTG projects on /work that use the same capabilities. */
function RelatedWork({ service }: { service: Service }) {
  const items = service.relatedWork.flatMap((rw) => {
    const project = projects.find((p) => p.slug === rw.slug && p.public);
    return project ? [{ project, note: rw.note }] : [];
  });
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="related-work-heading" className="border-t border-line py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="reveal lg:col-span-4">
          <Eyebrow>In practice</Eyebrow>
          <h2 id="related-work-heading" className="mt-6 text-title font-medium text-bone">
            We build these systems ourselves.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">
            Red Rocks Technology Group develops its own commercial and experimental systems across applied AI,
            automation, simulation and desktop software.
          </p>
          <TextLink href="/work" className="mt-7">
            See all of our work
          </TextLink>
        </div>
        <ul className="reveal border-t border-line lg:col-span-7 lg:col-start-6">
          {items.map(({ project, note }) => (
            <li key={project.slug} className="border-b border-line">
              <Link href={`/work#${project.slug}`} className="group flex items-start justify-between gap-6 py-6">
                <span>
                  <span className="block text-lg font-medium tracking-[-0.015em] text-bone transition-colors group-hover:text-rock-300">
                    {project.name}
                  </span>
                  <span className="label mt-1.5 block text-sand-400">{project.classification.join(" · ")}</span>
                  <span className="mt-3 block text-[0.9375rem] leading-relaxed text-mist">{note}</span>
                </span>
                <ArrowRight className="mt-1.5 shrink-0 text-mist-dim group-hover:text-rock-400" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** Common questions, answered with native <details> so no JavaScript is needed. */
function FAQ({ service }: { service: Service }) {
  if (service.faqs.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="border-t border-line py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="reveal lg:col-span-4">
          <Eyebrow>Questions</Eyebrow>
          <h2 id="faq-heading" className="mt-6 text-title font-medium text-bone">
            Common questions
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">
            Something else on your mind?{" "}
            <a
              href={mailto(service.inquirySubject)}
              className="text-bone underline decoration-rock-500 underline-offset-4 hover:text-rock-300"
            >
              Ask us directly
            </a>
            .
          </p>
        </div>
        <div className="reveal border-t border-line lg:col-span-7 lg:col-start-6">
          {service.faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[1.0625rem] leading-snug font-medium text-bone transition-colors group-hover:text-rock-300">
                  {faq.question}
                </h3>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="mt-1 size-4 shrink-0 text-rock-400 transition-transform duration-300 group-open:rotate-45"
                >
                  <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </summary>
              <p className="max-w-2xl pb-6 text-[0.9375rem] leading-relaxed text-mist">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function RelatedServices({ related }: { related: Service[] }) {
  return (
    <section aria-labelledby="related-heading" className="pb-24 sm:pb-28">
      <Container>
        <h2 id="related-heading" className="label text-mist">
          Related capabilities
        </h2>
        <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
          {related.map((s) => (
            <li key={s.slug} className="bg-ink-950">
              <Link href={s.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-ink-900 sm:p-8">
                <span className="flex items-center justify-between gap-3 text-lg font-medium text-bone">
                  {s.shortName}
                  <ArrowRight className="text-mist-dim group-hover:text-rock-400" />
                </span>
                <span className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{s.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
