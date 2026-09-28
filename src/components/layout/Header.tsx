import Link from "next/link";
import { primaryNav } from "@/data/navigation";
import { services } from "@/data/services";
import { mailto } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";

const navLink =
  "relative inline-flex h-10 items-center px-3 text-[0.9375rem] text-mist transition-colors duration-200 hover:text-bone";

/**
 * Site header. The desktop Services menu opens on hover and on keyboard focus
 * using CSS only (:hover / :focus-within), so it needs no client JavaScript.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-ink-950/70">
      <Container className="flex h-[4.25rem] items-center justify-between gap-6">
        <Link href="/" className="-m-1 rounded-sm p-1" aria-label="Red Rocks Technology Group — home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href} className="group relative">
                  <Link href={item.href} className={navLink}>
                    {item.label}
                    <svg aria-hidden="true" viewBox="0 0 10 10" className="ml-1.5 size-2.5 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180">
                      <path d="m2 3.5 3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </Link>
                  <div className="invisible absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility,translate] duration-200 ease-out-quart group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 group-focus-within:translate-y-0">
                    <ul className="grid grid-cols-2 gap-px overflow-hidden border border-line-strong bg-line shadow-2xl shadow-black/60">
                      {services.map((s, i) => (
                        <li key={s.slug} className="bg-ink-850">
                          <Link href={s.href} className="group/item block h-full p-5 transition-colors hover:bg-ink-800">
                            <span className="label text-rock-400">0{i + 1}</span>
                            <span className="mt-2 flex items-center justify-between gap-2 font-medium text-bone">
                              {s.shortName}
                              <ArrowRight className="text-mist-dim transition-colors group-hover/item:text-rock-400" />
                            </span>
                            <span className="mt-1.5 block text-sm leading-relaxed text-mist">{s.highlights.join(" · ")}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} className={navLink}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Button href={mailto()}>Start a Project</Button>
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
