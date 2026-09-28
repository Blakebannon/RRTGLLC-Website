import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Topography } from "@/components/graphics/Topography";
import type { ContourOptions } from "@/components/graphics/geometry";

type Crumb = { name: string; path: string };

type PageHeroProps = {
  /** Trail after "Home". The last item is the current page. */
  breadcrumbs: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  terrain?: Partial<ContourOptions>;
};

/** Interior page header with breadcrumb trail and a quieter topographic backdrop. */
export function PageHero({ breadcrumbs, title, intro, children, terrain }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)] opacity-50" />
        <Topography
          id="page-topo"
          className="absolute inset-0 h-full w-full opacity-80"
          terrain={{ cx: 1260, cy: 120, levels: 18, base: 20, step: 30, seed: 2.2, ...terrain }}
          accentLevel={5}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/10" />
      </div>
      <Container className="pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28">
        <nav aria-label="Breadcrumb">
          <ol className="label flex flex-wrap items-center gap-x-2 gap-y-1 text-mist-dim">
            <li>
              <Link href="/" className="transition-colors hover:text-bone">
                Home
              </Link>
            </li>
            {breadcrumbs.map((c, i) => {
              const current = i === breadcrumbs.length - 1;
              return (
                <li key={c.path} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-rock-500">/</span>
                  {current ? (
                    <span aria-current="page" className="text-mist">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="transition-colors hover:text-bone">
                      {c.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <h1 className="mt-8 max-w-4xl text-headline font-medium text-bone motion-safe:animate-rise sm:mt-10">
          {title}
        </h1>
        {intro && (
          <div className="mt-6 max-w-2xl text-lede text-mist motion-safe:animate-rise motion-safe:[animation-delay:80ms] sm:mt-8">
            {intro}
          </div>
        )}
        {children && (
          <div className="mt-10 motion-safe:animate-rise motion-safe:[animation-delay:160ms]">{children}</div>
        )}
      </Container>
    </section>
  );
}
