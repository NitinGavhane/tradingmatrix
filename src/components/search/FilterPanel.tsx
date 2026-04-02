"use client";

import { useMode } from "@/context/ModeContext";
import { CATEGORIES } from "@/lib/mock-data";
import RangeSlider from "@/components/ui/RangeSlider";
import { formatPrice } from "@/lib/pricing";

export interface FilterState {
  categories: string[];
  maxPrice: number;
  maxMoq: number;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  priceMax?: number;
  moqMax?: number;
}

export default function FilterPanel({
  filters,
  onFiltersChange,
  priceMax = 10000,
  moqMax = 200,
}: FilterPanelProps) {
  const { mode } = useMode();

  const toggleCategory = (cat: string) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFiltersChange({ ...filters, categories: updated });
  };

  const resetFilters = () => {
    onFiltersChange({ categories: [], maxPrice: priceMax, maxMoq: moqMax });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.maxPrice < priceMax ||
    filters.maxMoq < moqMax;

  return (
    <aside
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "1.5rem",
        position: "sticky",
        top: 80,
        maxHeight: "calc(100vh - 120px)",
        overflowY: "auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            id="reset-filters-btn"
            onClick={resetFilters}
            style={{
              fontSize: "0.75rem",
              color: "var(--accent-secondary)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Reset all
          </button>
        )}
      </div>

      {/* Category filter */}
      <div style={{ marginBottom: "2rem" }}>
        <h4
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "0.875rem",
          }}
        >
          Category
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                cursor: "pointer",
              }}
            >
              <input
                id={`category-filter-${cat.toLowerCase()}`}
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                style={{
                  width: 16,
                  height: 16,
                  accentColor: "var(--accent-primary)",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div style={{ marginBottom: "2rem" }}>
        <h4
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "0.875rem",
          }}
        >
          Max {mode === "wholesale" ? "Wholesale" : "Retail"} Price
        </h4>
        <RangeSlider
          id="price-range-slider"
          label="Up to"
          min={0}
          max={priceMax}
          value={filters.maxPrice}
          onChange={(val) => onFiltersChange({ ...filters, maxPrice: val })}
          formatValue={formatPrice}
        />
      </div>

      {/* MOQ range */}
      {mode === "wholesale" && (
        <div>
          <h4
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: "0.875rem",
            }}
          >
            Max MOQ
          </h4>
          <RangeSlider
            id="moq-range-slider"
            label="Up to"
            min={0}
            max={moqMax}
            value={filters.maxMoq}
            onChange={(val) => onFiltersChange({ ...filters, maxMoq: val })}
            formatValue={(v) => `${v} units`}
          />
        </div>
      )}
    </aside>
  );
}
