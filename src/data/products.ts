/**
 * Proprietary RRTG products.
 *
 * Only add entries for products the owner has approved for public release.
 * Pages render a product list automatically once this array is non-empty.
 */
export type ProductStatus = "available" | "beta" | "in-development";

export type Product = {
  slug: string;
  name: string;
  /** One-line description of what the product does. */
  tagline: string;
  description: string;
  status: ProductStatus;
  /** Who the product is built for. */
  audience?: string;
  /** Public product URL, if one exists. */
  url?: string;
};

export const products: Product[] = [];

export const productStatusLabel: Record<ProductStatus, string> = {
  available: "Available",
  beta: "Beta",
  "in-development": "In development",
};
