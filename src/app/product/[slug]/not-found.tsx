import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 page-content-top pb-24 flex flex-col items-center text-center">
      <div className="w-20 h-20 mb-6 text-[#3d5228]">
        <svg fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" className="w-full h-full">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>

      <h1
        className="text-3xl font-bold text-[#f0ece4] mb-4"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Товар не найден
      </h1>

      <p className="text-[#6b6055] mb-8 max-w-md">
        Возможно, товар был снят с продажи или перемещён. Попробуйте найти нужный
        товар в каталоге.
      </p>

      <Link
        href="/catalog"
        className="px-8 py-3 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-sm uppercase tracking-widest font-semibold transition-colors"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Вернуться в каталог
      </Link>
    </div>
  );
}
