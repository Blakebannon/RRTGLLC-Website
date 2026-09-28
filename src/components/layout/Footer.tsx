import Link from "next/link";
import { companyNav, legalNav, serviceNav } from "@/data/navigation";
import { mailto, site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ArrowUpRight } from "@/components/ui/Icons";
import { EmailAddress } from "@/components/ui/EmailAddress";

const columnHeading = "label text-mist-dim";
const columnLink = "text-[0.9375rem] text-mist transition-colors hover:text-bone";

export function Footer() {
  // Static export: the year is set at build time, and every deploy refreshes it.
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-950">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/" className="-m-1 inline-block p-1" aria-label="Red Rocks Technology Group — home">
              <Logo />
            </Link>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-mist">
              Custom software, AI systems, workflow automation and web engineering for small and mid-sized businesses.
            </p>
            <div className="mt-8">
              <p className={columnHeading}>Email</p>
              <a
                href={mailto()}
                className="group mt-3 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-bone underline decoration-rock-500/60 underline-offset-[0.3em] transition-colors hover:text-rock-300 sm:text-base"
              >
                <span className="min-w-0">
                  <EmailAddress />
                </span>
                <ArrowUpRight className="text-rock-400" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7 lg:justify-items-end">
            <div>
              <p className={columnHeading}>Services</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link href="/services" className={columnLink}>
                    All services
                  </Link>
                </li>
                {serviceNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={columnLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={columnHeading}>Company</p>
              <ul className="mt-4 space-y-3">
                {companyNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={columnLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={columnHeading}>Legal</p>
              <ul className="mt-4 space-y-3">
                {legalNav.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={columnLink}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-sm text-mist-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-mono text-xs tracking-wider">{site.coordinates}</p>
        </div>
      </Container>
    </footer>
  );
}
