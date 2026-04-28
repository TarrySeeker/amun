import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  catalog: [
    { label: "Жилеты", href: "/catalog/vests" },
    { label: "Подсумки", href: "/catalog/pouches" },
    { label: "Снаряжение", href: "/catalog/gear" },
    { label: "Аксессуары", href: "/catalog/accessories" },
  ],
  info: [
    { label: "О бренде", href: "/about" },
    { label: "Доставка и оплата", href: "/delivery" },
    { label: "Возврат товара", href: "/returns" },
    { label: "Контакты", href: "/contacts" },
  ],
  account: [
    { label: "Войти", href: "/account/login" },
    { label: "Регистрация", href: "/account/register" },
    { label: "Мои заказы", href: "/account/orders" },
    { label: "Избранное", href: "/wishlist" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#1e1e1e] mt-16">
      {/* Top strip */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#5c7a3e] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Статус"
                width={56}
                height={56}
                className="w-14 h-14 rounded-full"
              />
              <div className="flex flex-col gap-1.5">
                <span
                  className="text-2xl font-black tracking-widest uppercase text-[#f0ece4] block leading-none"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  СТАТУС
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#5c7a3e] font-medium leading-snug">
                  Сделано на Урале
                </span>
              </div>
            </div>
            <p className="text-sm text-[#6b6055] leading-relaxed">
              Профессиональная амуниция для охотников. Разработано и произведено
              на Урале с 2015 года.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              {["VK", "TG", "WA"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center text-[10px] font-bold text-[#5c7a3e] hover:border-[#5c7a3e] hover:text-[#7a9e52] transition-colors tracking-wider"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.2em] text-[#5c7a3e] font-semibold mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Каталог
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.catalog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7a7060] hover:text-[#f0ece4] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.2em] text-[#5c7a3e] font-semibold mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Информация
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7a7060] hover:text-[#f0ece4] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3
              className="text-xs uppercase tracking-[0.2em] text-[#5c7a3e] font-semibold mb-4"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Аккаунт
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#7a7060] hover:text-[#f0ece4] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Phone */}
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-[#5c7a3e] mb-1">
                Телефон
              </p>
              <a
                href="tel:+73432000000"
                className="text-[#f0ece4] font-semibold hover:text-[#7a9e52] transition-colors"
              >
                +7 (343) 200-00-00
              </a>
              <p className="text-xs text-[#4a4035] mt-1">Пн–Пт, 9:00–18:00</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#1a1a1a] mt-10 pt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-center sm:text-left">
          <p className="text-xs text-[#4a4035]">
            © 2026 Статус. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="text-xs text-[#4a4035] hover:text-[#7a7060] transition-colors"
            >
              Политика конфиденциальности
            </Link>
            <Link
              href="/terms"
              className="text-xs text-[#4a4035] hover:text-[#7a7060] transition-colors"
            >
              Условия использования
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
