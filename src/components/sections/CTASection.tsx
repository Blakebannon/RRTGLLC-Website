import type { ReactNode } from "react";
import { INQUIRY_HREF, mailto } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Strata } from "@/components/graphics/Strata";
import { EmailAddress } from "@/components/ui/EmailAddress";

type CTASectionProps = {
  title?: ReactNode;
  body?: ReactNode;
  cta?: string;
  subject?: string;
};

/** Closing call to action. The primary button leads to the inquiry form; the address below it opens an email. */
export function CTASection({
  title = "What is slowing your business down?",
  body = "Whether it's repetitive work, disconnected software, an outdated website or a system that doesn't exist yet, let's work out what technology can actually solve.",
  cta = "Start a Conversation",
  subject,
}: CTASectionProps) {
  const emailHref = mailto(subject);
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden border-t border-line bg-ink-900">
      <Strata className="absolute inset-x-0 bottom-0 -z-10 h-[70%] w-full opacity-70" seed={4.1} tilt={0.07} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-900 via-ink-900/80 to-ink-900/30" />
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="reveal max-w-4xl">
          <h2 id="cta-heading" className="text-display font-medium text-bone">
            {title}
          </h2>
          <p className="mt-8 max-w-2xl text-lede text-mist">{body}</p>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <Button href={INQUIRY_HREF} size="lg">
              {cta}
            </Button>
            <a
              href={emailHref}
              className="text-[0.9375rem] text-mist underline decoration-line-strong underline-offset-[0.3em] transition-colors hover:text-bone hover:decoration-rock-400"
            >
              <EmailAddress />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
