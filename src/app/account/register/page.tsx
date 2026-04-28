import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Регистрация — Статус",
  description: "Регистрация в интернет-магазине Статус.",
};

export default function RegisterPage() {
  return (
    <div className="max-w-lg mx-auto px-4 page-content-top pb-20 text-center">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Личный кабинет", href: "/account" },
          { label: "Регистрация" },
        ]}
      />

      <div className="rounded-xl border border-[#e3dfd6] bg-[#f4f2eb] px-6 py-10 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.45)]">
        <h1
          className="text-2xl font-black uppercase text-[#2a2622] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Регистрация
        </h1>
        <p className="text-[#5a5048] text-sm leading-relaxed mb-6">
          Форма регистрации появится вместе с запуском личных кабинетов и
          привязкой заказов к аккаунту.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/account"
            className="inline-flex justify-center px-6 py-3 rounded-lg border border-[#5c7a3e] text-[#4d6834] text-sm font-semibold uppercase tracking-wider hover:bg-[#f0f4e8] transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            На главную кабинета
          </Link>
          <Link
            href="/catalog"
            className="inline-flex justify-center px-6 py-3 rounded-lg bg-[#5c7a3e] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#6b8f47] transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            В каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
