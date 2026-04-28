import type { Metadata } from "next";
import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `«${q}» — поиск — Статус` : "Поиск — Статус",
  };
}

function SearchFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-14 animate-pulse">
      <div className="h-10 w-48 bg-[#1a1a1a] rounded mb-8" />
      <div className="h-12 max-w-2xl bg-[#ebe7df] rounded-lg border border-[#d8d2c8] mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[3/4] bg-[#ebe7df] rounded-sm border border-[#e3dfd6] shadow-[0_4px_12px_-6px_rgba(0,0,0,0.25)]"
          />
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchPageClient initialQuery={q ?? ""} />
    </Suspense>
  );
}
