"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/products";
import ProductGrid from "@/components/catalog/ProductGrid";
import EmptyState from "@/components/catalog/EmptyState";
import SearchInput from "@/components/search/SearchInput";

interface SearchPageClientProps {
  initialQuery: string;
}

export default function SearchPageClient({
  initialQuery,
}: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);

  const urlQ = searchParams.get("q") ?? "";

  useEffect(() => {
    setQuery(urlQ);
  }, [urlQ]);

  const syncUrl = useCallback(
    (next: string) => {
      const trimmed = next.trim();
      const path = trimmed
        ? `/search?q=${encodeURIComponent(trimmed)}`
        : "/search";
      router.replace(path, { scroll: false });
    },
    [router]
  );

  const handleChange = useCallback(
    (value: string) => {
      setQuery(value);
      syncUrl(value);
    },
    [syncUrl]
  );

  const results = useMemo(() => searchProducts(query), [query]);
  const trimmed = query.trim();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-10 md:pb-14">
      <h1
        className="text-3xl md:text-4xl font-black uppercase text-[#f0ece4] mb-2"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Поиск
      </h1>
      <div className="max-w-2xl mb-10">
        <SearchInput value={query} onChange={handleChange} variant="light" />
      </div>

      {!trimmed && (
        <p className="text-[#6b6055] text-center py-16">
          Введите название товара, категорию или ключевое слово в поле выше.
        </p>
      )}

      {trimmed && results.length > 0 && (
        <>
          <p
            className="text-[#9a8f80] mb-6 text-sm md:text-base"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Результаты поиска по «{trimmed}»: {results.length} товаров
          </p>
          <ProductGrid products={results} />
        </>
      )}

      {trimmed && results.length === 0 && (
        <EmptyState
          title="Ничего не найдено"
          description={`По запросу «${trimmed}» товаров нет. Попробуйте другую формулировку или перейдите в каталог.`}
          linkHref="/catalog"
          linkLabel="В каталог"
        />
      )}
    </div>
  );
}
