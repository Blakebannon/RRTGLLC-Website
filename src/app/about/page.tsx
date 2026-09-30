import Link from "next/link";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Icons";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd, breadcrumbSchema, ownerSchema } from "@/components/seo/JsonLd";
import { Topography } from "@/components/graphics/Topography";
import { Strata } from "@/components/graphics/Strata";

export const metadata = pageMetadata({
  title: `About ${site.name}`,
  description:
    "Meet Red Rocks Technology Group: an engineering company rooted in Colorado that builds custom software, AI, automation and websites for growing businesses.",
  path: "/about",
  absoluteTitle: true,
});

const buildAreas = [
  "Custom software",
  "AI systems",
  "Workflow automation",
  "Websites & web applications",
  "Integrations",
  "Internal business tools",
];

/** Possible answers to a business problem, deliberately ending with "something simpler". */
const answers = [
  { title: "Custom software", body: "When no existing product fits the way the business operates." },
  { title: "Workflow automation", body: "When people are spending their time moving information between systems." },
  { title: "Artificial intelligence", body: "When the work involves documents, language or judgment at volume." },
  { title: "A better digital experience", body: "When customers struggle to find, understand or reach the business." },
  { title: "Something substantially simpler", body: "A configuration change, a better process or a tool you already own." },
];

const whatWeBuild: { title: string; body: string; href?: string }[] = [
  { title: "Custom software", body: "Applications and systems designed around your operation.", href: "/services/software-development" },
  { title: "AI systems", body: "Private assistants, knowledge tools and AI-enabled workflows.", href: "/services/artificial-intelligence" },
  { title: "Workflow automation", body: "Repetitive processes handled reliably, without manual effort.", href: "/services/automation" },
  { title: "Websites and web applications", body: "Fast, accessible sites engineered for your business.", href: "/services/web-development" },
  { title: "Integrations", body: "Connections that let your existing systems share information.", href: "/services/software-development" },
  { title: "Internal business tools", body: "Purpose-built tools that replace spreadsheets and workarounds.", href: "/services/software-development" },
  { title: "Our own products", body: "Proprietary software that Red Rocks Technology Group develops and operates." },
];

const principles = [
  {
    title: "Understand the business problem before selecting the technology.",
    body: "We learn how the work actually gets done, and what a good outcome looks like, before discussing tools.",
  },
  {
    title: "Prefer the simplest system that solves the problem well.",
    body: "Every additional component is something to pay for, secure and maintain. Complexity has to earn its place.",
  },
  {
    title: "Build for maintainability rather than unnecessary complexity.",
    body: "Clear architecture, documentation and well-supported technology, so the system can be understood and extended later, by us or by anyone else.",
  },
  {
    title: "Treat performance, security and accessibility as engineering requirements.",
    body: "They are designed in from the start, not added at the end or left for someone else to discover.",
  },
  {
    title: "Communicate directly and clearly.",
    body: "Plain explanations, clear scope and honest answers, including when something is not worth building.",
  },
  {
    title: "Never recommend AI simply because AI is fashionable.",
    body: "AI is a powerful tool for specific problems. When a simpler approach is more reliable or more affordable, we say so.",
  },
  {
    title: "Build systems that create measurable operational value.",
    body: "Time saved, errors avoided, faster responses and better information. The value should be visible in how the business runs.",
  },
];

export default function AboutPage() {
  const crumbs = [{ name: "About", path: "/about" }];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), ownerSchema()]} />
      <PageHero
        breadcrumbs={crumbs}
        title="We build practical technology for small and mid-sized businesses."
        intro={
          <p>
            {site.name} is an engineering company. We design, build, deploy and support the technology that growing
            businesses depend on, and we develop proprietary software products of our own.
          </p>
        }
        terrain={{ cx: 1200, cy: 300, seed: 1.8 }}
      >
        <ul className="flex max-w-3xl flex-wrap gap-x-3 gap-y-2">
          {buildAreas.map((area, i) => (
            <li key={area} className="label flex items-center gap-3 text-sand-300">
              {area}
              {i < buildAreas.length - 1 && <span aria-hidden="true" className="text-rock-500">·</span>}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Approach */}
      <section aria-labelledby="approach-heading" className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Eyebrow index="01">Our approach</Eyebrow>
            <h2 id="approach-heading" className="mt-6 text-headline font-medium text-bone">
              Engineering technology around the business.
            </h2>
          </div>
          <div className="reveal lg:col-span-6 lg:col-start-7 lg:pt-14">
            <div className="space-y-6 text-[1.0625rem] leading-relaxed text-mist">
              <p>
                Most businesses should not have to reshape their operations around software that doesn&apos;t fit.
                We start by understanding how a company actually works, where the friction is and which outcome
                matters most.
              </p>
              <p>Only then do we decide what the right answer is. Depending on the problem, it might be:</p>
            </div>
            <ol className="mt-8 border-t border-line">
              {answers.map((a, i) => {
                const last = i === answers.length - 1;
                return (
                  <li key={a.title} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[3rem_1fr] sm:gap-4">
                    <span aria-hidden="true" className="label pt-1 text-rock-400">
                      0{i + 1}
                    </span>
                    <div>
                      <p className={`font-medium ${last ? "text-sand-300" : "text-bone"}`}>{a.title}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-mist">{a.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 text-[1.0625rem] leading-relaxed text-bone">
              Our job is not to sell the most complicated technology available. It is to build the technology that
              solves the problem.
            </p>
          </div>
        </Container>
      </section>

      {/* Small and growing businesses */}
      <section
        aria-labelledby="smb-heading"
        className="relative isolate overflow-hidden border-y border-line bg-ink-900"
      >
        <Strata className="absolute inset-0 -z-10 h-full w-full opacity-60" seed={2.6} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900 via-ink-900/85 to-ink-900/40" />
        <Container className="py-24 sm:py-32">
          <div className="reveal max-w-4xl">
            <Eyebrow index="02">Who we serve</Eyebrow>
            <h2 id="smb-heading" className="mt-6 text-headline font-medium text-bone">
              Built for small and growing businesses.
            </h2>
          </div>
          <div className="reveal mt-12 grid gap-8 text-[1.0625rem] leading-relaxed text-mist md:grid-cols-2 md:gap-10 lg:mt-16 lg:max-w-5xl">
            <p>
              Sophisticated technology was once practical mainly for organizations with large IT departments and
              substantial software budgets. That has changed. Modern cloud infrastructure, software development tools
              and artificial intelligence make powerful systems realistic for much smaller organizations, when they
              are engineered properly.
            </p>
            <p>
              Red Rocks Technology Group exists to help small and mid-sized businesses put those capabilities to work
              without first having to build an internal technology department. We bring the engineering; you bring
              the knowledge of your business.
            </p>
          </div>
        </Container>
      </section>

      {/* Build, not recommend */}
      <section aria-labelledby="build-heading" className="py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="reveal lg:col-span-5">
            <Eyebrow index="03">What we do</Eyebrow>
            <h2 id="build-heading" className="mt-6 text-headline font-medium text-bone">
              We build, not just recommend.
            </h2>
            <div className="mt-8 space-y-6 text-[1.0625rem] leading-relaxed text-mist">
              <p>
                Red Rocks Technology Group develops and operates its own technology in addition to building systems
                for clients.
              </p>
              <p>
                That experience shapes how we approach every client project. Architecture has to hold up in the real
                world, software has to be maintainable, and technology has to keep working long after the
                presentation is over.
              </p>
            </div>
          </div>
          <div className="reveal lg:col-span-6 lg:col-start-7">
            <p className="label text-mist-dim">What we build</p>
            <ul className="mt-5 border-t border-line">
              {whatWeBuild.map((item) => (
                <li key={item.title} className="border-b border-line">
                  {item.href ? (
                    <Link href={item.href} className="group flex items-center justify-between gap-6 py-4">
                      <BuildItem title={item.title} body={item.body} />
                      <ArrowRight className="text-mist-dim group-hover:text-rock-400" />
                    </Link>
                  ) : (
                    <div className="py-4">
                      <BuildItem title={item.title} body={item.body} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-heading" className="border-t border-line bg-ink-900 py-24 sm:py-32">
        <Container>
          <div className="reveal max-w-3xl">
            <Eyebrow index="04">Principles</Eyebrow>
            <h2 id="principles-heading" className="mt-6 text-headline font-medium text-bone">
              Practical by design.
            </h2>
            <p className="mt-6 text-lede text-mist">
              These principles guide every recommendation we make and every system we build.
            </p>
          </div>
          <ol className="mt-14 grid gap-x-10 border-t border-line md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal grid grid-cols-[2.75rem_1fr] gap-2 border-b border-line py-7">
                <span aria-hidden="true" className="label pt-1 text-rock-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg leading-snug font-medium tracking-[-0.015em] text-bone">{p.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Owner */}
      <section aria-labelledby="owner-heading" className="py-24 sm:py-32">
        <Container>
          <div className="reveal max-w-3xl">
            <Eyebrow index="05">The owner</Eyebrow>
            <h2 id="owner-heading" className="mt-6 text-headline font-medium text-bone">
              Meet the owner.
            </h2>
          </div>
          <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-10">
            <figure className="reveal max-w-sm sm:max-w-md lg:sticky lg:top-32 lg:col-span-5 lg:max-w-none lg:self-start">
              <div className="border border-line-strong bg-ink-900 p-2 sm:p-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export serves images unoptimized */}
                <img
                  src="/images/blake-bannon.jpg"
                  alt="Blake Bannon, owner of Red Rocks Technology Group"
                  width={950}
                  height={950}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </figure>
            <div className="reveal lg:col-span-6 lg:col-start-7">
              <h3 className="text-title font-medium text-bone">Blake Bannon</h3>
              <p className="label mt-3 text-rock-400">Owner, {site.name}</p>
              <p className="mt-8 text-lede text-bone">
                Blake&apos;s path to building technology did not run only through software. His background includes
                sales in the oil and gas industry, service as a volunteer firefighter and captaining a college
                lacrosse team.
              </p>
              <div className="mt-6 space-y-5 text-[1.0625rem] leading-relaxed text-mist">
                <p>
                  Sales in oil and gas meant working inside complex commercial relationships, where a proposal only
                  matters if it solves a problem the customer actually values. That is still the test every system we
                  build has to pass.
                </p>
                <p>
                  Firefighting and leading a team taught the other half of the job: prepare before it matters, stay
                  effective when circumstances change, and be accountable to the people relying on you. As a captain,
                  that meant setting expectations, helping teammates improve and keeping everyone working toward the
                  same objective.
                </p>
                <p>
                  Those environments have little in common on the surface, but the principles carry over directly.
                  Clients trust {site.name} with systems their businesses depend on. That calls for more than
                  technical ability. It calls for understanding the objective, being straightforward about what will
                  and will not work, and taking ownership of what is delivered.
                </p>
                <p>
                  Blake is also the author of <cite className="text-bone">The Pocketbook of AI Terminology</cite>,
                  which reflects his interest in artificial intelligence and his view that advanced technology should
                  be understandable and useful to the people who can benefit from it.
                </p>
              </div>
              <p className="mt-8 border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-mist">
                Outside of work, Colorado and the outdoors are a large part of his life, along with reading and
                physical training.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="colorado-heading" className="relative isolate overflow-hidden border-t border-line">
        <Topography
          id="about-topo"
          className="absolute inset-0 -z-10 h-full w-full opacity-70"
          terrain={{ cx: 300, cy: 700, seed: 5.9, levels: 20 }}
          accentLevel={9}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-l from-ink-950 via-ink-950/90 to-ink-950/40" />
        <Container className="grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
          <div className="reveal lg:col-span-6 lg:col-start-7">
            <Eyebrow>Our name</Eyebrow>
            <h2 id="colorado-heading" className="mt-6 text-title font-medium text-bone">
              Rooted in Colorado. Working wherever you are.
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">
              Our name and visual identity come from the sandstone formations of Colorado&apos;s Front Range, where
              layers laid down over millions of years were pushed up into something striking and enduring. It is a
              fitting reference for how we like to build: solid foundations, deliberate structure, work that lasts.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-mist">
              We work with clients remotely, so location is rarely a constraint.
            </p>
            <p className="label mt-8 text-mist-dim">{site.coordinates}</p>
          </div>
        </Container>
      </section>

      <CTASection title="Let's talk about your business." />
    </>
  );
}

function BuildItem({ title, body }: { title: string; body: string }) {
  return (
    <span className="block">
      <span className="block font-medium text-bone transition-colors group-hover:text-rock-300">{title}</span>
      <span className="mt-1 block text-[0.9375rem] leading-relaxed text-mist">{body}</span>
    </span>
  );
}
