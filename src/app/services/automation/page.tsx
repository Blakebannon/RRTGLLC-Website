import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { ServicePage } from "@/components/sections/ServicePage";

const service = getService("automation");

export const metadata = pageMetadata({
  title: service.name,
  description: service.metaDescription,
  path: service.href,
});

const returns = [
  {
    title: "Time",
    body: "Hours spent on repetitive tasks each week return to work that needs a person's attention.",
  },
  {
    title: "Accuracy",
    body: "Information entered once and moved automatically is not mistyped, skipped or duplicated.",
  },
  {
    title: "Speed",
    body: "Customers receive responses, confirmations and follow-ups promptly instead of when someone gets to it.",
  },
  {
    title: "Consistency",
    body: "Every step of the process happens every time, even when the person who usually handles it is out.",
  },
];

export default function AutomationPage() {
  return (
    <ServicePage service={service} terrainSeed={5.2}>
      <section aria-labelledby="return-heading" className="border-t border-line py-24 sm:py-32">
        <Container>
          <SectionHeader className="reveal" eyebrow="Return on investment" id="return-heading" title="Where the return comes from.">
            <p>
              Automation pays for itself by removing recurring costs that are easy to overlook. During scoping we map
              the current process, how often it runs and how long each step takes, so you can judge the return using
              your own numbers before committing.
            </p>
          </SectionHeader>
          <dl className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {returns.map((r, i) => (
              <div key={r.title} className="reveal bg-ink-950 p-7 sm:p-8">
                <dt>
                  <span className="label block text-rock-400">0{i + 1}</span>
                  <span className="mt-4 block text-title font-medium text-bone">{r.title}</span>
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{r.body}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="maintain-heading" className="pb-24 sm:pb-32">
        <Container className="grid gap-10 lg:grid-cols-12">
          <h2 id="maintain-heading" className="reveal text-title font-medium text-bone lg:col-span-5">
            Automation built to be maintained.
          </h2>
          <div className="reveal space-y-5 text-[1.0625rem] leading-relaxed text-mist lg:col-span-6 lg:col-start-7">
            <p>
              An automation that fails silently is worse than no automation at all. We document every workflow we
              build, make failures visible to the right people, and design processes so your team can understand what
              is happening and why.
            </p>
            <p>
              We choose between established automation platforms and custom code based on what will be most reliable
              and affordable for you to run over time, not on what is most interesting to build.
            </p>
          </div>
        </Container>
      </section>
    </ServicePage>
  );
}
