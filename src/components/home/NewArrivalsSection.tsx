import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { getNewProducts } from "@/lib/products";

const NEW_CATALOG_HREF = "/catalog?spot=novinka";

export default function NewArrivalsSection() {
  const newProducts = getNewProducts();

  if (newProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-14 sm:py-16 md:py-20 bg-[#0a0a0a] border-t border-[#1e1e1e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-8 min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#7a9e52] shrink-0" aria-hidden />
              <span
                className="text-xs uppercase tracking-[0.3em] text-[#7a9e52]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Свежее в каталоге
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#f0ece4] leading-none"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Новинки
            </h2>
          </div>
          <Link
            href={NEW_CATALOG_HREF}
            className="hidden md:flex items-center gap-2 text-sm text-[#5c7a3e] hover:text-[#7a9e52] uppercase tracking-wider transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Все новинки
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {newProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} variant="light" />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href={NEW_CATALOG_HREF}
            className="flex items-center gap-2 text-sm text-[#5c7a3e] hover:text-[#7a9e52] uppercase tracking-wider transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Все новинки
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
