import type { Capability } from "@/data/services";

/**
 * Spec-sheet style grid: hairline dividers instead of floating cards.
 * The 1px gap over a line-coloured background draws the rules.
 */
export function CapabilityGrid({ items }: { items: Capability[] }) {
  return (
    <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item.title} className="group bg-ink-950 p-6 transition-colors duration-300 hover:bg-ink-900 sm:p-8">
          <p className="label text-mist-dim transition-colors group-hover:text-rock-400">
            {String(i + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-lg font-medium tracking-[-0.015em] text-bone">{item.title}</h3>
          <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-mist">{item.description}</p>
        </li>
      ))}
      {/* Fill the final row so the grid never ends with an empty hole. */}
      <li aria-hidden="true" className={`hidden bg-ink-950 ${fillerClass(items.length)}`} />
    </ul>
  );
}

function fillerClass(count: number): string {
  const oddAtSm = count % 2 !== 0;
  const lgRemainder = count % 3;
  const sm = oddAtSm ? "sm:block" : "";
  const lg = lgRemainder === 0 ? (oddAtSm ? "lg:hidden" : "") : lgRemainder === 1 ? "lg:block lg:col-span-2" : "lg:block";
  return `${sm} ${lg}`;
}
