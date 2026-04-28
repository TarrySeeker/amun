"use client";

import { Category, FilterState } from "@/types";
import type { CategoryMeta } from "@/data/categories";

interface CatalogCategoryBarProps {
  categories: CategoryMeta[];
  filter: FilterState;
  onFilterChange: (next: FilterState) => void;
}

export default function CatalogCategoryBar({
  categories,
  filter,
  onFilterChange,
}: CatalogCategoryBarProps) {
  function toggleCategory(label: Category) {
    const current = filter.categories;
    const updated = current.includes(label)
      ? current.filter((c) => c !== label)
      : [...current, label];
    onFilterChange({ ...filter, categories: updated });
  }

  return (
    <section
      className="mb-8 md:mb-10 rounded-xl border border-[#e3dfd6] bg-[#f4f2eb] px-4 py-5 md:px-6 md:py-6 shadow-[0_8px_32px_-20px_rgba(0,0,0,0.45)]"
      aria-labelledby="catalog-category-heading"
    >
      <div className="text-center max-w-5xl mx-auto">
        <h2
          id="catalog-category-heading"
          className="text-xs uppercase tracking-widest text-[#6b6055] mb-4 font-semibold"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Категории
        </h2>
        <p className="text-[11px] md:text-xs text-[#9a9080] mb-4 md:mb-5 max-w-2xl mx-auto leading-relaxed">
          Можно выбрать несколько категорий одновременно
        </p>
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-3"
          role="group"
          aria-label="Фильтр по категориям каталога"
        >
          {categories.map((cat) => {
            const selected = filter.categories.includes(cat.label);
            return (
              <button
                key={cat.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleCategory(cat.label)}
                className={`inline-flex flex-col sm:flex-row sm:items-baseline justify-center gap-0.5 sm:gap-1.5 px-3 py-2.5 md:px-4 md:py-3 min-h-[2.75rem] max-w-[17rem] sm:max-w-none rounded-lg border transition-colors text-left sm:text-center ${
                  selected
                    ? "border-[#5c7a3e] bg-[#f0f4e8] text-[#3d5228] font-semibold shadow-sm"
                    : "border-[#e3dfd6] bg-[#ebe7df] text-[#3a342c] hover:border-[#c8c2b8] hover:bg-[#e3dfd6]/60"
                }`}
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                <span className="text-xs md:text-sm leading-snug">{cat.label}</span>
                <span
                  className={`text-[10px] md:text-xs tabular-nums ${
                    selected ? "text-[#5a6d48]" : "text-[#9a9080]"
                  }`}
                >
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
