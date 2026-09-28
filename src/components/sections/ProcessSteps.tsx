import { processSteps } from "@/data/process";

/**
 * Five-step delivery process. Horizontal survey line with station markers on
 * large screens; a vertical line on smaller screens.
 */
export function ProcessSteps() {
  return (
    <ol className="relative grid gap-0 lg:grid-cols-5 lg:gap-8">
      {/* Horizontal survey line (desktop) */}
      <span aria-hidden="true" className="absolute top-[0.4375rem] right-0 left-0 hidden h-px bg-line-strong lg:block" />
      {processSteps.map((step, i) => (
        <li key={step.number} className="reveal relative pb-12 pl-10 last:pb-0 lg:pb-0 lg:pl-0">
          {/* Vertical line (mobile/tablet) */}
          {i < processSteps.length - 1 && (
            <span aria-hidden="true" className="absolute top-4 bottom-0 left-[0.4375rem] w-px bg-line-strong lg:hidden" />
          )}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 grid size-3.5 place-items-center border border-rock-400 bg-ink-950 lg:relative"
          >
            <span className="size-1 bg-rock-400" />
          </span>
          <p className="label text-rock-400 lg:mt-8">{step.number}</p>
          <h3 className="mt-2 text-xl font-medium tracking-[-0.02em] text-bone">{step.title}</h3>
          <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-mist">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
