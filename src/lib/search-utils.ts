// src/lib/search-utils.ts
import Fuse from "fuse.js";
import type { IFuseOptions } from "fuse.js";
import { Product } from "@/types/product";

export const FUSE_OPTIONS: IFuseOptions<Product> = {
  keys: [
    { name: "name", weight: 0.4 },
    { name: "category", weight: 0.3 },
    { name: "tags", weight: 0.2 },
    { name: "description", weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
};

export function createFuseInstance(products: Product[]) {
  return new Fuse(products, FUSE_OPTIONS);
}

export function searchProducts(fuse: Fuse<Product>, query: string): Product[] {
  if (!query || query.length < 2) return [];
  const results = fuse.search(query);
  return results.map((r) => r.item);
}

export function getSearchSuggestions(
  fuse: Fuse<Product>,
  query: string,
  limit = 10
): Array<{ id: string; name: string; category: string; image: string }> {
  if (!query || query.length < 2) return [];
  const results = fuse.search(query, { limit });
  return results.map((r) => ({
    id: r.item.id,
    name: r.item.name,
    category: r.item.category,
    image: r.item.images[0] || "",
  }));
}
