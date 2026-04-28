import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Личный кабинет — Статус",
  description:
    "Личный кабинет покупателя: избранное, заказы и настройки в интернет-магазине Статус.",
};

const shortcuts = [
  {
    title: "Избранное",
    description: "Товары, которые вы сохранили",
    href: "/wishlist",
    icon: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
  },
  {
    title: "Мои заказы",
    description: "История и статусы покупок",
    href: "/account/orders",
    icon: (
      <>
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </>
    ),
  },
  {
    title: "Каталог",
    description: "Весь ассортимент амуниции",
    href: "/catalog",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </>
    ),
  },
  {
    title: "Оплата и доставка",
    description: "Условия доставки и способы оплаты",
    href: "/oplata-i-dostavka",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={1.6} />
        <line x1="2" y1="10" x2="22" y2="10" strokeWidth={1.6} />
      </>
    ),
  },
] as const;

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-24">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Личный кабинет" },
        ]}
      />

      <header className="mb-12 md:mb-14">
        <p
          className="text-xs uppercase tracking-[0.25em] text-[#7a9e52] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Профиль покупателя
        </p>
        <h1
          className="text-3xl md:text-4xl font-black uppercase text-[#f0ece4] mb-5 leading-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Личный кабинет
        </h1>
        <p className="text-[#9a8f80] leading-relaxed text-base md:text-lg max-w-2xl">
          Здесь собраны быстрые переходы к избранному, заказам и полезным разделам
          сайта. Вход по логину и паролю и сохранение данных профиля появятся при
          полном запуске магазина.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-12">
        {shortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex gap-4 rounded-xl border border-[#e3dfd6] bg-[#f4f2eb] p-5 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.4)] transition-all duration-200 hover:border-[#5c7a3e] hover:shadow-[0_8px_32px_-12px_rgba(92,122,62,0.35)]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#e3dfd6] bg-[#ebe7df] text-[#5c7a3e] group-hover:border-[#5c7a3e] transition-colors">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                viewBox="0 0 24 24"
                aria-hidden
              >
                {item.icon}
              </svg>
            </span>
            <span className="min-w-0">
              <span
                className="block text-base font-bold uppercase tracking-wide text-[#2a2622] group-hover:text-[#4d6834] transition-colors"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {item.title}
              </span>
              <span className="mt-1 block text-sm text-[#6b6055] leading-snug">
                {item.description}
              </span>
            </span>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-[#2a2a2a] bg-[#111]/90 px-6 py-6 md:px-8 md:py-7">
        <h2
          className="text-sm font-bold uppercase tracking-wider text-[#c8c0b4] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Вход и регистрация
        </h2>
        <p className="text-[#9a8f80] text-sm leading-relaxed mb-5">
          Формы входа и регистрации будут добавлены вместе с личными данными и
          историей заказов после подключения учётной системы магазина.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/account/login"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#5c7a3e] text-[#7a9e52] text-sm font-semibold uppercase tracking-wider hover:bg-[#5c7a3e] hover:text-white transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Войти
          </Link>
          <Link
            href="/account/register"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#5c7a3e] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#6b8f47] transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Регистрация
          </Link>
        </div>
      </div>

      <p className="mt-10 text-[#6b6055] text-sm text-center md:text-left">
        Нужна помощь? Напишите нам через раздел{" "}
        <Link href="/kontakty" className="text-[#7a9e52] hover:underline underline-offset-2">
          Контакты
        </Link>
        .
      </p>
    </div>
  );
}
