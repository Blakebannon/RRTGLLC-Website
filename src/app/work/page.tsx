import { caseStudies } from "@/data/case-studies";
import { mailto } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Client work and case studies from Red Rocks Technology Group, published with permission and with outcomes we can stand behind.",
  path: "/work",
});

const structure = [
  { label: "The problem", body: "What was slowing the business down, in the client's terms." },
  { label: "The approach", body: "What we recommended, what we chose not to build and why." },
  { label: "The technology", body: "The systems, integrations and tools involved." },
  { label: "The outcome", body: "What changed once the system was in production." },
];

export default function WorkPage() {
  const crumbs = [{ name: "Work", path: "/work" }];
  const hasWork = caseStudies.length > 0;

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        title={hasWork ? "Selected work." : "Case studies, told honestly."}
        intro={
          <p>
            We publish client work only with permission, and only with outcomes we can verify. Every case study
            explains the business problem first and the technology second.
          </p>
        }
        terrain={{ cx: 1150, cy: 600, seed: 0.2 }}
      />

      {hasWork ? (
        <section aria-label="Case studies" className="py-20 sm:py-28">
          <Container>
            <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
              {caseStudies.map((cs) => (
                <li key={cs.slug} className="bg-ink-950">
                  <CaseStudyCard study={cs} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : (
        <section aria-labelledby="forthcoming-heading" className="py-20 sm:py-28">
          <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 id="forthcoming-heading" className="text-title font-medium text-bone">
                Detailed case studies are in preparation.
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">
                Rather than filling this page with logos and vague claims, we&apos;re taking the time to document
                projects properly. In the meantime, we&apos;re glad to talk through work relevant to your situation
                directly.
              </p>
              <Button href={mailto("Relevant Work - Red Rocks Technology Group")} variant="secondary" className="mt-9">
                Ask about relevant work
              </Button>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="label text-mist-dim">Each case study will cover</p>
              <dl className="mt-5 border-t border-line">
                {structure.map((s, i) => (
                  <div key={s.label} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[3rem_10rem_1fr] sm:gap-4">
                    <span aria-hidden="true" className="label pt-1 text-rock-400">
                      0{i + 1}
                    </span>
                    <dt className="font-medium text-bone">{s.label}</dt>
                    <dd className="text-[0.9375rem] leading-relaxed text-mist">{s.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
