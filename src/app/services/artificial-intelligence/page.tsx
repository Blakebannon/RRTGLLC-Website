import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServicePage } from "@/components/sections/ServicePage";

const service = getService("artificial-intelligence");

export const metadata = pageMetadata({
  title: "Artificial Intelligence for Business",
  description: service.metaDescription,
  path: service.href,
});

const questions = [
  "How often does the task happen, and how long does it take today?",
  "How much variation is there from one instance to the next?",
  "What would a mistake cost, and who would catch it?",
  "Would a simpler, rules-based automation be more reliable?",
  "What data is involved, and how sensitive is it?",
];

const principles = [
  {
    title: "Grounded in your information",
    body: "Assistants answer from your approved documents and systems, with references to their sources, rather than relying on a model's general knowledge.",
  },
  {
    title: "Your data stays governed",
    body: "We design access controls, retention and data handling deliberately, and use private or self-hosted models when the situation calls for it.",
  },
  {
    title: "People stay in the loop",
    body: "Where decisions carry real consequences, AI drafts and recommends while a person reviews and approves.",
  },
  {
    title: "Model-independent",
    body: "We choose between commercial and open models based on quality, cost and privacy for your use case, and keep the system adaptable as models improve.",
  },
];

export default function ArtificialIntelligencePage() {
  return (
    <ServicePage service={service} terrainSeed={3.4}>
      <section aria-labelledby="fit-heading" className="border-t border-line py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-5">
            <Eyebrow>Honest assessment</Eyebrow>
            <h2 id="fit-heading" className="mt-6 text-headline font-medium text-bone">
              Is AI the right tool?
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">
              Many problems that look like AI problems are really data, process or integration problems. Not every
              process needs AI, and adding it where it doesn&apos;t belong makes systems more expensive and less
              predictable. Before recommending a model, we look closely at the work itself.
            </p>
          </div>
          <div className="reveal lg:col-span-6 lg:col-start-7">
            <p className="label text-mist-dim">Questions we ask first</p>
            <ol className="mt-5 border-t border-line">
              {questions.map((q, i) => (
                <li key={q} className="flex gap-5 border-b border-line py-4 text-[1.0625rem] text-bone">
                  <span className="label pt-1.5 text-rock-400">{String(i + 1).padStart(2, "0")}</span>
                  {q}
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-mist">
              If the answer points to conventional software or automation, we&apos;ll recommend that instead. When AI
              is the right fit, we build it with clear boundaries on what it can do.
            </p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="principles-heading" className="pb-24 sm:pb-32">
        <Container>
          <h2 id="principles-heading" className="reveal max-w-2xl text-title font-medium text-bone">
            How we design AI systems
          </h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {principles.map((p) => (
              <li key={p.title} className="reveal border-t border-line-strong pt-7">
                <h3 className="text-lg font-medium tracking-[-0.015em] text-bone">{p.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </ServicePage>
  );
}
