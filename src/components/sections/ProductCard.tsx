import { productStatusLabel, type Product } from "@/data/products";
import { ArrowUpRight } from "@/components/ui/Icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col p-7 sm:p-10">
      <p className="label text-rock-400">{productStatusLabel[product.status]}</p>
      <h3 className="mt-4 text-title font-medium text-bone">{product.name}</h3>
      <p className="mt-2 text-[1.0625rem] text-sand-300">{product.tagline}</p>
      <p className="mt-5 text-[0.9375rem] leading-relaxed text-mist">{product.description}</p>
      {product.audience && <p className="mt-4 text-sm text-mist-dim">Built for {product.audience}</p>}
      {product.url && (
        <a
          href={product.url}
          className="group mt-auto inline-flex items-center gap-2 pt-8 text-[0.9375rem] font-medium text-bone hover:text-rock-300"
        >
          Visit {product.name}
          <ArrowUpRight className="text-rock-400" />
        </a>
      )}
    </article>
  );
}
