import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Мои заказы — Статус",
  description: "История заказов в интернет-магазине Статус.",
};

export default function AccountOrdersPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 page-content-top pb-20">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Личный кабинет", href: "/account" },
          { label: "Мои заказы" },
        ]}
      />

      <h1
        className="text-3xl md:text-4xl font-black uppercase text-[#f0ece4] mb-4"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Мои заказы
      </h1>
      <p className="text-[#9a8f80] text-sm md:text-base mb-10 max-w-xl">
        История покупок с привязкой к аккаунту станет доступна после запуска
        авторизации. Сейчас номер заказа показывается на странице после оформления.
      </p>

      <div className="rounded-xl border border-dashed border-[#3d3d3d] bg-[#0e0e0e] px-8 py-16 text-center">
        <svg
          className="w-14 h-14 mx-auto text-[#3a3a3a] mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <p
          className="text-lg text-[#9a8f80] mb-6"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Пока нет сохранённых заказов
        </p>
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center px-8 py-3 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-sm uppercase tracking-widest font-semibold transition-colors rounded-lg"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Перейти в каталог
        </Link>
      </div>
    </div>
  );
}
