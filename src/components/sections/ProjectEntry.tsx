import type { WorkProject } from "@/data/work";
import { ProjectFigure, figureCaption } from "@/components/graphics/ProjectFigure";

/**
 * Full editorial entry for a featured project: figure on one side, text on the
 * other, alternating sides down the page. Capabilities are shown on demand
 * with a native <details> element, so no JavaScript is needed.
 */
export function FeaturedProject({ project, index }: { project: WorkProject; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const flipped = index % 2 === 1;

  return (
    <article
      id={project.slug}
      aria-labelledby={`${project.slug}-name`}
      className="grid gap-10 border-t border-line py-16 first:border-t-0 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24"
    >
      <div className={`reveal lg:col-span-6 ${flipped ? "lg:order-2 lg:col-start-7" : ""}`}>
        <p className="label flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-rock-400">{number}</span>
          <span className="text-sand-300">{project.classification.join(" · ")}</span>
        </p>
        <h2 id={`${project.slug}-name`} className="mt-5 text-headline font-medium text-bone">
          {project.name}
        </h2>
        {project.status && (
          <p className="label mt-4 flex items-center gap-2 text-mist-dim">
            <span aria-hidden="true" className="size-1.5 bg-rock-400" />
            {project.status}
          </p>
        )}
        <p className="mt-7 text-lede text-bone">{project.shortDescription}</p>
        {project.longDescription?.map((p) => (
          <p key={p.slice(0, 32)} className="mt-5 text-[1.0625rem] leading-relaxed text-mist">
            {p}
          </p>
        ))}
        {project.takeaway && (
          <p className="mt-7 border-l-2 border-rock-500 pl-5 text-[1.0625rem] leading-relaxed text-bone">
            {project.takeaway}
          </p>
        )}
        <Capabilities items={project.capabilities} />
      </div>

      <figure className={`reveal lg:col-span-5 ${flipped ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"} lg:self-start`}>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export serves images unoptimized
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            loading="lazy"
            className="w-full border border-line"
          />
        ) : project.figure ? (
          <>
            <div className="border border-line bg-ink-900 p-4 sm:p-6">
              <ProjectFigure kind={project.figure} className="h-auto w-full" />
            </div>
            <figcaption className="label mt-3 flex justify-between gap-4 text-mist-dim">
              <span>Fig. {number}</span>
              <span className="text-right">Schematic · {figureCaption[project.figure]}</span>
            </figcaption>
          </>
        ) : null}
      </figure>
    </article>
  );
}

/** Compact entry for secondary R&D work: no figure and less visual weight. */
export function AdditionalProject({ project }: { project: WorkProject }) {
  return (
    <article id={project.slug} aria-labelledby={`${project.slug}-name`} className="border-t border-line-strong pt-7">
      <p className="label text-sand-400">{project.classification.join(" · ")}</p>
      <h3 id={`${project.slug}-name`} className="mt-3 text-xl font-medium tracking-[-0.02em] text-bone">
        {project.name}
      </h3>
      {project.status && <p className="label mt-2 text-mist-dim">{project.status}</p>}
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-mist">{project.shortDescription}</p>
      <p className="mt-5 text-sm leading-relaxed text-mist-dim">{project.capabilities.join(" · ")}</p>
    </article>
  );
}

function Capabilities({ items }: { items: string[] }) {
  return (
    <details className="group mt-9 border-y border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[0.9375rem] font-medium text-bone transition-colors hover:text-rock-300 [&::-webkit-details-marker]:hidden">
        Engineering scope
        <span className="flex items-center gap-3">
          <span className="label text-mist-dim">{items.length} areas</span>
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 text-rock-400 transition-transform duration-300 group-open:rotate-45">
            <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </summary>
      <ul className="grid gap-x-8 gap-y-2.5 pb-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-baseline gap-3 text-[0.9375rem] text-mist">
            <span aria-hidden="true" className="h-px w-3 shrink-0 translate-y-[-0.3em] bg-rock-400" />
            {item}
          </li>
        ))}
      </ul>
    </details>
  );
}
