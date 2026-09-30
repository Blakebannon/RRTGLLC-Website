import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ServicePage } from "@/components/sections/ServicePage";

const service = getService("software-development");

export const metadata = pageMetadata({
  title: service.seoTitle,
  description: service.metaDescription,
  path: service.href,
});

const options = [
  {
    label: "Buy",
    title: "When a proven product fits",
    body: "If a well-supported product already does what you need at a reasonable cost, you should use it. We will tell you so, and help you configure it properly.",
  },
  {
    label: "Integrate",
    title: "When the pieces exist but don't connect",
    body: "Often the tools are fine individually and the problem is the gaps between them. Integration work is usually faster and less expensive than building new software.",
  },
  {
    label: "Build",
    title: "When the software doesn't exist",
    body: "When your process is what sets you apart, or no product handles it well, purpose-built software lets the tool follow the business instead of the other way around.",
  },
];

export default function SoftwareDevelopmentPage() {
  return (
    <ServicePage service={service} terrainSeed={1.1}>
      <section aria-labelledby="build-buy-heading" className="pb-24 sm:pb-32">
        <Container>
          <SectionHeader className="reveal" eyebrow="Build, buy or both" id="build-buy-heading" title="Custom software isn't always the answer.">
            <p>
              We start by understanding the problem, not by assuming it needs new code. The best result is frequently a
              combination: keep the systems that work, and build only the piece that is missing.
            </p>
          </SectionHeader>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {options.map((o, i) => (
              <li key={o.label} className="reveal border-t border-line-strong pt-7">
                <p className="label text-rock-400">
                  0{i + 1} · {o.label}
                </p>
                <h3 className="mt-4 text-lg font-medium tracking-[-0.015em] text-bone">{o.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{o.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </ServicePage>
  );
}
