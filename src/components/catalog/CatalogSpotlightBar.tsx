"use client";

import {
  CatalogSpotlight,
  CATALOG_SPOTLIGHT_LABELS,
  FilterState,
} from "@/types";

const SPOTLIGHT_ORDER: CatalogSpotlight[] = [
  "all",
  "hits",
  "novinka",
  "sale",
  "exclusive",
];

interface CatalogSpotlightBarProps {
  filter: FilterState;
  onFilterChange: (next: FilterState) => void;
}

export default function CatalogSpotlightBar({
  filter,
  onFilterChange,
}: CatalogSpotlightBarProps) {
  return (
    <section
      className="mb-8 md:mb-10 rounded-xl border border-[#e3dfd6] bg-[#f4f2eb] px-4 py-5 md:px-6 md:py-6 shadow-[0_8px_32px_-20px_rgba(0,0,0,0.45)]"
      aria-labelledby="catalog-spotlight-heading"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h2
          id="catalog-spotlight-heading"
          className="text-xs uppercase tracking-widest text-[#6b6055] mb-4 font-semibold"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Подборка
        </h2>
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-3"
          role="radiogroup"
          aria-label="Подборка по типу товара"
        >
          {SPOTLIGHT_ORDER.map((key) => {
            const selected = filter.spotlight === key;
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onFilterChange({ ...filter, spotlight: key })}
                className={`inline-flex items-center justify-center text-center text-xs md:text-sm leading-snug px-3 py-2.5 md:px-4 md:py-3 min-h-[2.75rem] rounded-lg border transition-colors shrink-0 ${
                  selected
                    ? "border-[#5c7a3e] bg-[#f0f4e8] text-[#3d5228] font-semibold shadow-sm"
                    : "border-[#e3dfd6] bg-[#ebe7df] text-[#3a342c] hover:border-[#c8c2b8] hover:bg-[#e3dfd6]/60"
                }`}
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {CATALOG_SPOTLIGHT_LABELS[key]}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
