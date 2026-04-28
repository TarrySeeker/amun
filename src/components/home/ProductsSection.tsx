"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/data/categories";
import type { Category } from "@/types";

const allProducts = getAllProducts();

const tabs = categories.map((cat) => ({
  key: cat.slug,
  label: cat.label,
  href: `/catalog?category=${cat.slug}`,
}));

function getProductsForTab(category: Category) {
  return allProducts.filter((p) => p.category === category);
}

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const activeCategory = categories.find((c) => c.slug === activeTab);
  const tabProducts = activeCategory
    ? getProductsForTab(activeCategory.label)
    : [];

  const activeHref =
    tabs.find((t) => t.key === activeTab)?.href ?? "/catalog";
  const activeLabel =
    tabs.find((t) => t.key === activeTab)?.label ?? "";

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#5c7a3e] shrink-0" />
              <span
                className="text-xs uppercase tracking-[0.3em] text-[#5c7a3e]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Популярное
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#f0ece4] leading-none"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Хиты продаж
            </h2>
          </div>
          <Link
            href={activeHref}
            className="hidden md:flex items-center gap-2 text-sm text-[#5c7a3e] hover:text-[#7a9e52] uppercase tracking-wider transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Все {activeLabel.toLowerCase()}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Tabs */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex gap-0 mb-8 border-b border-[#1e1e1e] overflow-x-auto touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`relative min-h-11 shrink-0 px-4 sm:px-6 py-3 text-sm uppercase tracking-wider font-semibold whitespace-nowrap transition-colors duration-200 touch-manipulation active:bg-black/20 ${
                  isActive ? "text-[#f0ece4]" : "text-[#5a5048] hover:text-[#9a8f80]"
                }`}
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5c7a3e]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {tabProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} variant="light" />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href={activeHref}
            className="flex items-center gap-2 text-sm text-[#5c7a3e] hover:text-[#7a9e52] uppercase tracking-wider transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Все {activeLabel.toLowerCase()}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
