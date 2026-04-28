"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import { searchProducts } from "@/lib/products";
import SearchResultItem from "./SearchResultItem";

const POPULAR_LIMIT = 6;
const popularCategories = categories.slice(0, POPULAR_LIMIT);

interface SearchResultsProps {
  debouncedQuery: string;
  onSelectResult: () => void;
}

export default function SearchResults({
  debouncedQuery,
  onSelectResult,
}: SearchResultsProps) {
  const q = debouncedQuery.trim();
  const allMatches = searchProducts(debouncedQuery);
  const preview = allMatches.slice(0, POPULAR_LIMIT);
  const total = allMatches.length;

  if (!q) {
    return (
      <div className="pt-4">
        <p
          className="text-[10px] uppercase tracking-[0.2em] text-[#6b6055] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Популярные категории
        </p>
        <div className="grid grid-cols-2 gap-2">
          {popularCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog?category=${cat.slug}`}
              onClick={onSelectResult}
              className="px-3 py-2.5 rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] text-sm text-[#f0ece4] hover:border-[#5c7a3e] hover:bg-[#141414] transition-colors text-center"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (total === 0) {
    return (
      <p className="py-8 text-center text-[#6b6055] text-sm">
        Ничего не найдено по запросу «{debouncedQuery.trim()}»
      </p>
    );
  }

  return (
    <div className="pt-2">
      <ul className="space-y-1">
        {preview.map((product) => (
          <li key={product.id}>
            <SearchResultItem product={product} onSelect={onSelectResult} />
          </li>
        ))}
      </ul>
      <Link
        href={`/search?q=${encodeURIComponent(q)}`}
        onClick={onSelectResult}
        className="mt-4 block w-full text-center py-3 text-sm uppercase tracking-wider font-semibold text-[#7a9e52] hover:text-[#9bc068] border border-[#2a2a2a] rounded-lg hover:border-[#5c7a3e] transition-colors"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Смотреть все результаты ({total})
      </Link>
    </div>
  );
}
