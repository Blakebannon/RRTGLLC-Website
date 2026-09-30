import { caseStudies } from "@/data/case-studies";
import { additionalProjects, featuredProjects } from "@/data/work";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { FeaturedProject, AdditionalProject } from "@/components/sections/ProjectEntry";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Software, AI & Automation Projects",
  description:
    "Software, applied AI, automation and simulation projects designed and engineered by Red Rocks Technology Group, from commercial products to R&D prototypes.",
  path: "/work",
});

export default function WorkPage() {
  const crumbs = [{ name: "Work", path: "/work" }];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        title="Software, AI and automation projects."
        intro={
          <>
            <p className="text-bone">
              Software, systems and experiments we&apos;ve engineered across artificial intelligence, automation,
              simulation and interactive technology.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed">
              Some are RRTG products, some are internal research and development, and some are business applications
              and prototypes. Each one is labeled for what it is.
            </p>
          </>
        }
        terrain={{ cx: 1150, cy: 600, seed: 0.2 }}
      />

      <section aria-label="Featured projects" className="pb-8 sm:pb-12">
        <Container>
          {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.slug} project={project} index={i} />
          ))}
        </Container>
      </section>

      {additionalProjects.length > 0 && (
        <section aria-labelledby="rnd-heading" className="border-t border-line bg-ink-900 py-20 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Eyebrow>Research &amp; development</Eyebrow>
              <h2 id="rnd-heading" className="mt-6 text-title font-medium text-bone">
                Additional R&amp;D
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">
                Smaller experiments we use to explore new tools and techniques before applying them to client and
                product work.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:col-span-7 lg:col-start-6">
              {additionalProjects.map((project) => (
                <AdditionalProject key={project.slug} project={project} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {caseStudies.length > 0 && (
        <section aria-labelledby="case-studies-heading" className="py-20 sm:py-28">
          <Container>
            <h2 id="case-studies-heading" className="text-headline font-medium text-bone">
              Client case studies
            </h2>
            <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2">
              {caseStudies.map((cs) => (
                <li key={cs.slug} className="bg-ink-950">
                  <CaseStudyCard study={cs} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CTASection
        title="Have a problem worth engineering?"
        body="The same team that built these projects can build the system your business needs. Tell us what you're working on."
      />
    </>
  );
}
