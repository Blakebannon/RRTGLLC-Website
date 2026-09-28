import Link from "next/link";
import { formatPrice, type PriceItem } from "@/data/pricing";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * A single line in a price schedule: name and description on the left,
 * starting price on the right. Rows with an href link to the relevant service.
 */
export function PriceRow({ item, headingLevel: H = "h3" }: { item: PriceItem; headingLevel?: "h3" | "h4" }) {
  const content = (
    <>
      <div className="max-w-xl">
        <H className="flex items-center gap-2 text-lg font-medium tracking-[-0.015em] text-bone transition-colors group-hover:text-rock-300 sm:text-xl">
          {item.name}
          {item.href && <ArrowRight className="text-mist-dim group-hover:text-rock-400" />}
        </H>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{item.description}</p>
      </div>
      <p className="shrink-0 sm:text-right">
        <span className="label block text-mist-dim">{item.basis === "from" ? "Starting at" : "Fixed fee"}</span>
        <span className="mt-1 block text-2xl font-medium tracking-[-0.03em] text-bone tabular-nums sm:text-[1.75rem]">
          {formatPrice(item)}
        </span>
      </p>
    </>
  );

  const layout = "flex flex-col gap-4 py-7 sm:flex-row sm:items-end sm:justify-between sm:gap-10";

  return item.href ? (
    <Link href={item.href} className={`group ${layout}`}>
      {content}
    </Link>
  ) : (
    <div className={layout}>{content}</div>
  );
}
