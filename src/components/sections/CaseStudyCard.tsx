import type { CaseStudy } from "@/data/case-studies";
import { services } from "@/data/services";

/** Summary card for a case study. Renders only fields that are present. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const serviceNames = study.services
    .map((slug) => services.find((s) => s.slug === slug)?.shortName)
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex h-full flex-col p-7 sm:p-10">
      <p className="label text-rock-400">
        {study.industry} · {study.client}
      </p>
      <h3 className="mt-4 text-title font-medium text-bone">{study.title}</h3>
      <dl className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed">
        <div>
          <dt className="font-medium text-bone">Problem</dt>
          <dd className="mt-1 text-mist">{study.problem}</dd>
        </div>
        <div>
          <dt className="font-medium text-bone">Approach</dt>
          <dd className="mt-1 text-mist">{study.approach}</dd>
        </div>
        <div>
          <dt className="font-medium text-bone">Outcome</dt>
          <dd className="mt-1 text-mist">{study.outcome}</dd>
        </div>
      </dl>
      {study.testimonial && (
        <figure className="mt-8 border-l-2 border-rock-500 pl-5">
          <blockquote className="text-bone">&ldquo;{study.testimonial.quote}&rdquo;</blockquote>
          <figcaption className="mt-2 text-sm text-mist">
            {study.testimonial.name}, {study.testimonial.role}
          </figcaption>
        </figure>
      )}
      <p className="label mt-auto pt-8 text-mist-dim">
        {serviceNames}
        {study.technology.length > 0 && ` — ${study.technology.join(", ")}`}
      </p>
    </article>
  );
}
