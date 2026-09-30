import { getService } from "@/data/services";
import { formatPrice, ongoingPricing, webPackages } from "@/data/pricing";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ServicePage, AssessmentNote } from "@/components/sections/ServicePage";

const service = getService("web-development");
const websiteSupport = ongoingPricing[0];

export const metadata = pageMetadata({
  title: service.seoTitle,
  description: service.metaDescription,
  path: service.href,
});

export default function WebDevelopmentPage() {
  return (
    <ServicePage service={service} terrainSeed={0.7} investment={<Packages />} />
  );
}

function Packages() {
  return (
    <section aria-labelledby="packages-heading" className="border-y border-line bg-ink-900 py-24 sm:py-32">
      <Container>
        <SectionHeader className="reveal" eyebrow="Investment" id="packages-heading" title="Three levels of scale.">
          <p>{service.priceNote}</p>
        </SectionHeader>

        <ul className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
          {webPackages.map((pkg, i) => (
            <li key={pkg.name} className="reveal flex flex-col bg-ink-900 p-7 sm:p-10">
              <p className="label text-rock-400">0{i + 1}</p>
              <h3 className="mt-4 text-title font-medium text-bone">{pkg.name}</h3>
              <p className="mt-2 text-[0.9375rem] text-sand-300 lg:min-h-[3em]">{pkg.audience}</p>
              <p className="mt-8 flex items-baseline gap-2">
                <span className="text-sm text-mist">From</span>
                <span className="text-[2.5rem] leading-none font-medium tracking-[-0.04em] text-bone tabular-nums">
                  {formatPrice(pkg)}
                </span>
              </p>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-mist">{pkg.description}</p>
              <ul className="mt-8 space-y-2.5 border-t border-line pt-6">
                {pkg.includes.map((inc) => (
                  <li key={inc} className="flex items-baseline gap-3 text-[0.9375rem] text-bone">
                    <span aria-hidden="true" className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-rock-400" />
                    {inc}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="reveal mt-14 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h3 className="text-xl font-medium tracking-[-0.02em] text-bone">After launch: {websiteSupport.name}</h3>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-sm text-mist">From</span>
              <span className="text-2xl font-medium tracking-[-0.03em] text-sand-300 tabular-nums">{formatPrice(websiteSupport)}</span>
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">{websiteSupport.description}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <AssessmentNote />
          </div>
        </div>
      </Container>
    </section>
  );
}
