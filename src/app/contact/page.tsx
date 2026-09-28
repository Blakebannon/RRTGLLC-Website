import Link from "next/link";
import { INQUIRY_BODY_TEMPLATE, mailto, site } from "@/data/site";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { ArrowUpRight } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";
import { EmailAddress } from "@/components/ui/EmailAddress";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Red Rocks Technology Group about custom software, AI systems, workflow automation or a new website. Email blake.bannon@redrockstechnologygroup.com.",
  path: "/contact",
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
  const primaryHref = mailto(undefined, INQUIRY_BODY_TEMPLATE);

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        breadcrumbs={crumbs}
        title="Let's talk about what you're trying to solve."
        intro={
          <p>
            Whether you need a better website, want to automate a process, are evaluating AI or need software that
            doesn&apos;t exist yet, tell us what you&apos;re working on.
          </p>
        }
        terrain={{ cx: 1180, cy: 520, seed: 4.6 }}
      />

      <section aria-labelledby="email-heading" className="py-20 sm:py-28">
        <Container className="grid gap-16 xl:grid-cols-12 xl:gap-10">
          <div className="xl:col-span-7">
            <h2 id="email-heading" className="label text-mist">
              Email
            </h2>
            <p className="mt-5 text-[clamp(1.125rem,0.45rem+2.6vw,2rem)] leading-tight font-medium tracking-[-0.03em] text-bone select-all">
              <EmailAddress />
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href={primaryHref} size="lg">
                Email Red Rocks Technology Group
              </Button>
              <CopyButton text={site.email} />
            </div>
            <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-mist">
              The button opens a new message in your email app with a short outline to fill in. If it doesn&apos;t
              open, copy the address above into any email client.
            </p>
          </div>

          <aside aria-labelledby="helpful-heading" className="max-w-2xl xl:col-span-4 xl:col-start-9">
            <h2 id="helpful-heading" className="text-lg font-medium tracking-[-0.015em] text-bone">
              What helps us start the conversation
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">
              A few sentences is plenty. Including a little about the following helps us respond usefully the first
              time.
            </p>
            <dl className="mt-6 border-t border-line">
              {helpful.map((h) => (
                <div key={h.title} className="border-b border-line py-4">
                  <dt className="text-[0.9375rem] font-medium text-bone">{h.title}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-mist">{h.body}</dd>
                </div>
              ))}
            </dl>
          </aside>
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

      <section aria-labelledby="topics-heading" className="py-20 sm:py-28">
        <Container>
          <h2 id="topics-heading" className="label text-mist">
            Email us about a specific service
          </h2>
          <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug} className="bg-ink-950">
                <a
                  href={mailto(s.inquirySubject)}
                  className="group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:bg-ink-900"
                >
                  <span className="font-medium text-bone">{s.shortName}</span>
                  <ArrowUpRight className="text-mist-dim group-hover:text-rock-400" />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-[0.9375rem] text-mist">
            Want to learn more first?{" "}
            <Link href="/services" className="text-bone underline decoration-rock-500 underline-offset-4 hover:text-rock-300">
              Explore our services
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
