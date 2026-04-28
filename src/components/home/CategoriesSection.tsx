import Link from "next/link";
import { categoriesHome, CategoryMeta } from "@/data/categories";

/** До lg — одна колонка (без пустых ячеек); lg+ — bento-сетка 4×3 */
const TILE_LAYOUT: string[] = [
  // 0 — hero
  "col-span-1 min-h-[260px] md:min-h-[300px] lg:col-span-2 lg:row-span-2 lg:min-h-0 lg:h-full lg:col-start-1 lg:row-start-1",
  // 1
  "col-span-1 min-h-[220px] md:min-h-[260px] lg:col-span-2 lg:row-span-1 lg:min-h-0 lg:h-full lg:col-start-3 lg:row-start-1",
  // 2
  "col-span-1 min-h-[240px] md:min-h-[280px] lg:col-span-2 lg:row-span-1 lg:min-h-0 lg:h-full lg:col-start-3 lg:row-start-2",
  // 3
  "col-span-1 min-h-[220px] md:min-h-[260px] lg:col-span-2 lg:row-span-1 lg:min-h-0 lg:h-full lg:col-start-1 lg:row-start-3",
  // 4
  "col-span-1 min-h-[240px] md:min-h-[280px] lg:col-span-2 lg:row-span-1 lg:min-h-0 lg:h-full lg:col-start-3 lg:row-start-3",
];

function CategoryCard({
  cat,
  className,
}: {
  cat: CategoryMeta;
  className?: string;
}) {
  return (
    <Link
      href={`/catalog?category=${cat.slug}`}
      className={`group relative overflow-hidden rounded-2xl md:rounded-3xl flex flex-col justify-end
        shadow-[0_16px_48px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.08]
        transition-[transform,box-shadow] duration-300 ease-out
        hover:-translate-y-1 hover:shadow-[0_28px_56px_-16px_rgba(0,0,0,0.42)]
        ${className ?? ""}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 bg-[#2a3320]"
        style={{ backgroundImage: `url('${cat.image}')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
      {/* Hover accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5c7a3e] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      {/* Content */}
      <div className="relative z-10 p-5 sm:p-7 md:p-10 lg:p-11">
        <span
          className="block uppercase tracking-[0.25em] text-[#7a9e52] mb-2 text-xs md:text-sm"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {cat.count} товаров
        </span>
        <h3
          className="font-black uppercase text-[#f0ece4] leading-tight mb-2.5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3rem]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {cat.label}
        </h3>
        <p className="text-[#9a8f80] leading-snug text-base md:text-lg max-w-xl">
          {cat.description}
        </p>
      </div>
    </Link>
  );
}

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-[#f4f2eb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-10">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#5c7a3e] shrink-0" />
              <span
                className="text-xs uppercase tracking-[0.3em] text-[#5c7a3e]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Ассортимент
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-[#1a1a1a] leading-none"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Категории
            </h2>
          </div>
          <Link
            href="/catalog"
            className="inline-flex sm:shrink-0 items-center gap-2 text-sm text-[#5c7a3e] hover:text-[#3d5228] uppercase tracking-wider transition-colors touch-manipulation"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Весь каталог
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 md:gap-5 lg:grid-cols-4 lg:grid-rows-3 lg:gap-7 lg:min-h-[920px] xl:min-h-[1000px] 2xl:min-h-[1080px] lg:auto-rows-fr">
          {categoriesHome.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              cat={cat}
              className={TILE_LAYOUT[i] ?? "col-span-1 min-h-[220px] md:min-h-[260px]"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
