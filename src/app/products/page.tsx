"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { createFuseInstance, searchProducts } from "@/lib/search-utils";
import { useMode } from "@/context/ModeContext";
import { getPriceTier } from "@/lib/pricing";
import ProductGrid from "@/components/products/ProductGrid";
import SearchBar from "@/components/search/SearchBar";
import FilterPanel, { FilterState } from "@/components/search/FilterPanel";
import Badge from "@/components/ui/Badge";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

function ProductsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mode } = useMode();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "";

  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    maxPrice: 10000,
    maxMoq: 200,
  });

  // Reset filters when mode changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, maxPrice: 10000, maxMoq: 200 }));
  }, [mode]);

  const fuse = useMemo(() => createFuseInstance(MOCK_PRODUCTS), []);

  const filteredProducts = useMemo(() => {
    let results = query.length >= 2 ? searchProducts(fuse, query) : MOCK_PRODUCTS;

    // Category filter
    if (filters.categories.length > 0) {
      results = results.filter((p) => filters.categories.includes(p.category));
    }

    // Price filter (mode-aware)
    results = results.filter((p) => {
      const tier = getPriceTier(p, mode);
      return tier.pricePerUnit <= filters.maxPrice;
    });

    // MOQ filter (wholesale only meaningful)
    if (mode === "wholesale") {
      results = results.filter((p) => {
        return p.wholesaleTier.moq <= filters.maxMoq;
      });
    }

    return results;
  }, [query, filters, mode, fuse]);

  const handleQueryChange = (q: string) => {
    setQuery(q);
    const params = new URLSearchParams(searchParams.toString());
    if (q) { params.set("q", q); } else { params.delete("q"); }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      {/* Page heading */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.03em" }}>
            All Products
          </h1>
          <Badge variant={mode as any}>
            {mode === "wholesale" ? "🏭 Wholesale" : mode === "retailer" ? "🏪 Retailer" : "🛍️ Consumer"}
          </Badge>
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
          {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
          {query ? ` for "${query}"` : ""}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Sidebar filters */}
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Main content */}
        <div>
          {/* Search bar */}
          <div style={{ marginBottom: "1.5rem" }}>
            <SearchBar onQueryChange={handleQueryChange} initialQuery={initialQuery} id="products-search" />
          </div>

          {/* Active filter chips */}
          {filters.categories.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
              {filters.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    setFilters({ ...filters, categories: filters.categories.filter((c) => c !== cat) })
                  }
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.3rem 0.75rem",
                    borderRadius: 999,
                    border: "1px solid var(--border)",
                    background: "rgba(109,89,245,0.1)",
                    color: "var(--accent-secondary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {cat} ×
                </button>
              ))}
            </div>
          )}

          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}

function ProductsLoadingFallback() {
  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem" }}>
        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius)", height: 400 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoadingFallback />}>
      <ProductsPageInner />
    </Suspense>
  );
}
