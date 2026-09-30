import Link from "next/link";
import { INQUIRY_BODY_TEMPLATE, mailto, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { CopyButton } from "@/components/ui/CopyButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/sections/PageHero";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { EmailAddress } from "@/components/ui/EmailAddress";

export const metadata = pageMetadata({
  title: `Contact ${site.name}`,
  description:
    "Contact Red Rocks Technology Group about custom software, AI, workflow automation or web development. Email blake.bannon@redrockstechnologygroup.com.",
  path: "/contact",
  absoluteTitle: true,
});

const helpful = [
  { title: "Your company", body: "What the business does, roughly how large it is, and the tools you rely on today." },
  { title: "The problem", body: "What is slow, manual, disconnected or missing, and who it affects." },
  { title: "The outcome", body: "What would be different if this were solved, and any timing or budget you have in mind." },
];

const nextSteps = [
  "We read every inquiry personally and reply directly.",
  "If it looks like a fit, we schedule a conversation to understand the problem properly.",
  "We follow up with a recommended approach, scope and cost, or tell you plainly if we are not the right fit.",
];

export default function ContactPage() {
  const crumbs = [{ name: "Contact", path: "/contact" }];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        title="Let's talk about what you're trying to solve."
        intro={
          <p>
            Whether you need a better website, want to automate a process, are evaluating AI or need software that
            doesn&apos;t exist yet, tell us what you&apos;re working on. If you&apos;re not sure what it is yet,
            that&apos;s a fine place to start.
          </p>
        }
        terrain={{ cx: 1180, cy: 520, seed: 4.6 }}
      />

      <section
        id="inquiry"
        aria-labelledby="inquiry-heading"
        className="py-20 sm:py-28"
      >
        <Container className="grid gap-14 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-14">
          <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <Eyebrow>Project inquiry</Eyebrow>
            <h2 id="inquiry-heading" className="mt-6 text-title font-medium text-bone">
              Tell us what you&apos;re trying to solve.
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-mist">
              Software you need built, a process you want automated, an AI system you&apos;re considering, a website
              or web application, a technical problem you already have, or something you&apos;re not sure how to
              describe. A few sentences is plenty.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <InquiryForm />
          </div>

          <div className="space-y-12 lg:col-span-4 lg:col-start-1 lg:row-start-2">
            <aside aria-labelledby="helpful-heading">
              <h3 id="helpful-heading" className="label text-mist">
                What helps us respond usefully
              </h3>
              <dl className="mt-4 border-t border-line">
                {helpful.map((h) => (
                  <div key={h.title} className="border-b border-line py-4">
                    <dt className="text-[0.9375rem] font-medium text-bone">{h.title}</dt>
                    <dd className="mt-1 text-[0.9375rem] leading-relaxed text-mist">{h.body}</dd>
                  </div>
                ))}
              </dl>
            </aside>

            <div>
              <h3 className="label text-mist">Prefer email?</h3>
              <p className="mt-4 text-lg leading-snug font-medium tracking-[-0.02em] text-bone">
                <a
                  href={mailto(undefined, INQUIRY_BODY_TEMPLATE)}
                  className="underline decoration-rock-500/60 underline-offset-[0.3em] transition-colors hover:text-rock-300"
                >
                  <EmailAddress />
                </a>
              </p>
              <div className="mt-5">
                <CopyButton text={site.email} />
              </div>
              <p className="mt-6 text-[0.9375rem] text-mist">
                Want to learn more first?{" "}
                <Link href="/services" className="text-bone underline decoration-rock-500 underline-offset-4 hover:text-rock-300">
                  Explore our services
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="next-heading" className="border-y border-line bg-ink-900 py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <h2 id="next-heading" className="text-title font-medium text-bone lg:col-span-4">
            What happens next
          </h2>
          <ol className="grid gap-8 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {nextSteps.map((step, i) => (
              <li key={step} className="border-t border-line-strong pt-6">
                <span className="label text-rock-400">0{i + 1}</span>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
