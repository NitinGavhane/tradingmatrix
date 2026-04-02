import { NextRequest, NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Mode } from "@/types/product";
import { getPriceTier } from "@/lib/pricing";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mode = (searchParams.get("mode") as Mode) || "retail";
  const category = searchParams.get("category") || "";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "999999");
  const minMoq = parseInt(searchParams.get("minMoq") || "0", 10);
  const maxMoq = parseInt(searchParams.get("maxMoq") || "999999", 10);
  const q = searchParams.get("q") || "";

  let products = MOCK_PRODUCTS;

  // Category filter
  if (category) {
    products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Price filter (mode-aware)
  products = products.filter((p) => {
    const tier = getPriceTier(p, mode);
    return tier.pricePerUnit >= minPrice && tier.pricePerUnit <= maxPrice;
  });

  // MOQ filter
  products = products.filter((p) => {
    const tier = getPriceTier(p, mode);
    return tier.moq >= minMoq && tier.moq <= maxMoq;
  });

  // Keyword filter (simple)
  if (q) {
    const lower = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.tags.some((t) => t.toLowerCase().includes(lower)) ||
        p.description.toLowerCase().includes(lower)
    );
  }

  return NextResponse.json({ products, total: products.length, mode });
}
