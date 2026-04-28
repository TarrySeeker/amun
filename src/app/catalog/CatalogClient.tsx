"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product, FilterState, SortOption, Category } from "@/types";
import { CategoryMeta } from "@/data/categories";
import { filterAndSort } from "@/lib/products";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SortSelect from "@/components/catalog/SortSelect";
import ProductGrid from "@/components/catalog/ProductGrid";
import ActiveFilters from "@/components/catalog/ActiveFilters";
import EmptyState from "@/components/catalog/EmptyState";
import CatalogSpotlightBar from "@/components/catalog/CatalogSpotlightBar";
import CatalogCategoryBar from "@/components/catalog/CatalogCategoryBar";

interface CatalogClientProps {
  allProducts: Product[];
  categories: CategoryMeta[];
  filter: FilterState;
  priceRange: { min: number; max: number };
}

export default function CatalogClient({
  allProducts,
  categories,
  filter: initialFilter,
  priceRange,
}: CatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState<FilterState>(initialFilter);
  /** Не прокручивать вверх после внутренних обновлений URL (фильтры, сортировка) */
  const skipScrollAfterInternalNav = useRef(false);

  const filteredProducts = useMemo(
    () => filterAndSort(allProducts, filter),
    [allProducts, filter]
  );

  const updateURL = useCallback(
    (newFilter: FilterState) => {
      const params = new URLSearchParams();

      if (newFilter.categories.length > 0) {
        const catMeta = categories.find(
          (c) => c.label === newFilter.categories[0]
        );
        if (catMeta) params.set("category", catMeta.slug);
      }
      if (newFilter.sortBy !== "default") {
        params.set("sort", newFilter.sortBy);
      }
      if (newFilter.priceMin > priceRange.min) {
        params.set("min", String(newFilter.priceMin));
      }
      if (newFilter.priceMax < priceRange.max) {
        params.set("max", String(newFilter.priceMax));
      }
      if (newFilter.inStockOnly) {
        params.set("stock", "1");
      }
      if (newFilter.spotlight !== "all") {
        params.set("spot", newFilter.spotlight);
      }

      const qs = params.toString();
      skipScrollAfterInternalNav.current = true;
      router.push(`/catalog${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, categories, priceRange]
  );

  /** При переходе по ссылкам (Каталог / Хиты / Новинки) сервер отдаёт новые пропсы — подтягиваем фильтр из URL */
  useEffect(() => {
    setFilter(initialFilter);
  }, [searchParams.toString(), initialFilter]);

  /** Прокрутка в начало при смене раздела через навигацию; не мешаем локальной настройке фильтров */
  useEffect(() => {
    if (skipScrollAfterInternalNav.current) {
      skipScrollAfterInternalNav.current = false;
      return;
    }
    window.scrollTo(0, 0);
  }, [searchParams.toString()]);

  const handleFilterChange = useCallback(
    (newFilter: FilterState) => {
      setFilter(newFilter);
      updateURL(newFilter);
    },
    [updateURL]
  );

  const handleSortChange = useCallback(
    (sortBy: SortOption) => {
      const newFilter = { ...filter, sortBy };
      setFilter(newFilter);
      updateURL(newFilter);
    },
    [filter, updateURL]
  );

  const handleRemoveCategory = useCallback(
    (category: Category) => {
      const newFilter = {
        ...filter,
        categories: filter.categories.filter((c) => c !== category),
      };
      handleFilterChange(newFilter);
    },
    [filter, handleFilterChange]
  );

  const handleResetPrice = useCallback(() => {
    handleFilterChange({
      ...filter,
      priceMin: priceRange.min,
      priceMax: priceRange.max,
    });
  }, [filter, priceRange, handleFilterChange]);

  const handleResetStock = useCallback(() => {
    handleFilterChange({ ...filter, inStockOnly: false });
  }, [filter, handleFilterChange]);

  const handleResetSpotlight = useCallback(() => {
    handleFilterChange({ ...filter, spotlight: "all" });
  }, [filter, handleFilterChange]);

  const handleResetAll = useCallback(() => {
    const resetFilter: FilterState = {
      categories: [],
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      inStockOnly: false,
      spotlight: "all",
      sortBy: "default",
    };
    handleFilterChange(resetFilter);
  }, [priceRange, handleFilterChange]);

  function pluralProducts(count: number): string {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return "товар";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
      return "товара";
    return "товаров";
  }

  return (
    <div className="max-w-[92rem] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 page-content-top pb-20">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог" },
        ]}
      />

      <header className="mt-2 mb-8 md:mb-10 border-b border-[#2a2a2a]/80 pb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-12 h-px bg-[#5c7a3e]" aria-hidden />
            <span
              className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#7a9e52]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Сделано на Урале
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-black uppercase tracking-wide text-[#f0ece4] leading-[1.08]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Каталог
          </h1>
          <p className="mt-4 text-[#9a8f80] text-sm md:text-base leading-relaxed">
            Жилеты, подсумки и снаряжение для охоты и активного отдыха. Выберите
            подборку и категории блоками ниже.
          </p>
        </div>
      </header>

      <ActiveFilters
        filter={filter}
        priceRange={priceRange}
        onRemoveCategory={handleRemoveCategory}
        onResetPrice={handleResetPrice}
        onResetStock={handleResetStock}
        onResetSpotlight={handleResetSpotlight}
        onResetAll={handleResetAll}
      />

      <CatalogSpotlightBar
        filter={filter}
        onFilterChange={handleFilterChange}
      />

      <CatalogCategoryBar
        categories={categories}
        filter={filter}
        onFilterChange={handleFilterChange}
      />

      <div className="min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 px-4 py-4 rounded-xl border border-[#2a2a2a] bg-[#0f0f0f]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <p className="text-sm md:text-[15px] text-[#9a8f80]" style={{ fontFamily: "var(--font-oswald)" }}>
            Найдено{" "}
            <span className="text-[#f0ece4] font-bold tabular-nums">
              {filteredProducts.length}
            </span>{" "}
            {pluralProducts(filteredProducts.length)}
          </p>
          <SortSelect value={filter.sortBy} onChange={handleSortChange} />
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} density="comfortable" />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
