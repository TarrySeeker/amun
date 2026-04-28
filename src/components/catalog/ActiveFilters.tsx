"use client";

import {
  Category,
  FilterState,
  CATALOG_SPOTLIGHT_LABELS,
} from "@/types";

interface ActiveFiltersProps {
  filter: FilterState;
  priceRange: { min: number; max: number };
  onRemoveCategory: (category: Category) => void;
  onResetPrice: () => void;
  onResetStock: () => void;
  onResetSpotlight: () => void;
  onResetAll: () => void;
}

export default function ActiveFilters({
  filter,
  priceRange,
  onRemoveCategory,
  onResetPrice,
  onResetStock,
  onResetSpotlight,
  onResetAll,
}: ActiveFiltersProps) {
  const hasCategoryFilter = filter.categories.length > 0;
  const hasPriceFilter =
    filter.priceMin > priceRange.min || filter.priceMax < priceRange.max;
  const hasStockFilter = filter.inStockOnly;
  const hasSpotlightFilter = filter.spotlight !== "all";
  const hasAnyFilter =
    hasCategoryFilter ||
    hasPriceFilter ||
    hasStockFilter ||
    hasSpotlightFilter;

  if (!hasAnyFilter) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {filter.categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onRemoveCategory(cat)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f2eb] border border-[#e3dfd6] text-sm text-[#3a342c] shadow-sm hover:border-[#5c7a3e] hover:text-[#2a2622] transition-colors group"
        >
          {cat}
          <svg className="w-3 h-3 text-[#b8b0a4] group-hover:text-[#c03030]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      ))}

      {hasPriceFilter && (
        <button
          onClick={onResetPrice}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f2eb] border border-[#e3dfd6] text-sm text-[#3a342c] shadow-sm hover:border-[#5c7a3e] hover:text-[#2a2622] transition-colors group"
        >
          {filter.priceMin.toLocaleString("ru-RU")} — {filter.priceMax.toLocaleString("ru-RU")} ₽
          <svg className="w-3 h-3 text-[#b8b0a4] group-hover:text-[#c03030]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {hasStockFilter && (
        <button
          onClick={onResetStock}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f2eb] border border-[#e3dfd6] text-sm text-[#3a342c] shadow-sm hover:border-[#5c7a3e] hover:text-[#2a2622] transition-colors group"
        >
          В наличии
          <svg className="w-3 h-3 text-[#b8b0a4] group-hover:text-[#c03030]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      {hasSpotlightFilter && (
        <button
          onClick={onResetSpotlight}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#f4f2eb] border border-[#e3dfd6] text-sm text-[#3a342c] shadow-sm hover:border-[#5c7a3e] hover:text-[#2a2622] transition-colors group"
        >
          {CATALOG_SPOTLIGHT_LABELS[filter.spotlight]}
          <svg className="w-3 h-3 text-[#b8b0a4] group-hover:text-[#c03030]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <button
        onClick={onResetAll}
        className="px-3 py-1.5 text-xs uppercase tracking-widest text-[#c03030] hover:text-[#e04040] transition-colors"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Сбросить всё
      </button>
    </div>
  );
}
