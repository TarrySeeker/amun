"use client";

import { Fragment, useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";

/** Вторая дополнительная шапка под основным блоком */
const subNavLinks = [
  { label: "Каталог", href: "/catalog" },
  { label: "Акции", href: "/akcii" },
  { label: "О производстве", href: "/about" },
  { label: "Оплата и доставка", href: "/oplata-i-dostavka" },
  { label: "Контакты", href: "/kontakty" },
] as const;

export default function Header() {
  const router = useRouter();
  const { totalItems, openCart } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { openSearch } = useSearch();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartContextMenu, setCartContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const cartContextMenuRef = useRef<HTMLDivElement>(null);
  const cartContextMenuOpenedAt = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!cartContextMenu) return;

    const close = () => setCartContextMenu(null);

    const onPointerDown = (e: PointerEvent) => {
      if (Date.now() - cartContextMenuOpenedAt.current < 400) return;
      if (cartContextMenuRef.current?.contains(e.target as Node)) return;
      close();
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [cartContextMenu]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] border-b border-[#e5e5e5]"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 md:gap-4 min-h-16 md:min-h-[4.5rem] py-2 md:py-0">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center group">
            <Image
              src="/logo.jpg"
              alt="Статус — Сделано на Урале"
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full group-hover:opacity-80 transition-opacity duration-200"
              priority
            />
            <div className="ml-2.5 flex flex-col gap-1.5">
              <span
                className="text-lg md:text-xl font-black tracking-widest uppercase text-[#1a1a1a] group-hover:text-[#5c7a3e] transition-colors duration-200 leading-none block"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                СТАТУС
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-[#5c7a3e] font-medium leading-snug">
                Сделано на Урале
              </span>
            </div>
          </Link>

          {/* Desktop search — растягивается между логотипом и действиями */}
          <div className="hidden md:flex flex-1 min-w-0 justify-center px-2 lg:px-6">
            <button
              aria-label="Поиск"
              type="button"
              onClick={openSearch}
              className="flex w-full max-w-3xl items-center gap-2 px-4 py-2.5 bg-[#f5f5f5] hover:bg-[#eee] border border-[#e0e0e0] text-sm text-[#999] hover:text-[#666] transition-colors min-h-[42px]"
            >
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
              <span className="flex-1 text-left">Искать товар</span>
              <kbd
                className="hidden lg:inline-flex shrink-0 items-center gap-0.5 rounded border border-[#ddd] bg-white px-1.5 py-0.5 text-[10px] font-medium text-[#888]"
                aria-hidden
              >
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Mobile search icon */}
            <button
              aria-label="Поиск"
              type="button"
              onClick={openSearch}
              className="md:hidden p-2 text-black hover:text-[#5c7a3e] transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
              </svg>
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="Избранное"
              className="p-2 text-black hover:text-[#5c7a3e] transition-colors relative"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  strokeLinejoin="round"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[0.875rem] h-3.5 px-0.5 bg-[#5c7a3e] text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart — ЛКМ: панель; ПКМ / долгое нажатие: меню */}
            <button
              type="button"
              aria-label="Корзина"
              aria-haspopup="menu"
              className="p-2 text-black hover:text-[#5c7a3e] transition-colors relative"
              onClick={openCart}
              onContextMenu={(e) => {
                e.preventDefault();
                cartContextMenuOpenedAt.current = Date.now();
                const pad = 8;
                const menuW = 220;
                const menuH = 88;
                const x = Math.min(
                  e.clientX,
                  window.innerWidth - menuW - pad
                );
                const y = Math.min(
                  e.clientY,
                  window.innerHeight - menuH - pad
                );
                setCartContextMenu({
                  x: Math.max(pad, x),
                  y: Math.max(pad, y),
                });
              }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path
                  d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
                  strokeLinejoin="round"
                />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 min-w-[0.875rem] h-3.5 px-0.5 bg-[#5c7a3e] text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Profile */}
            <Link
              href="/account"
              aria-label="Личный кабинет"
              className="flex p-2 text-black hover:text-[#5c7a3e] transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Mobile burger */}
            <button
              aria-label="Меню"
              className="md:hidden p-2 text-black hover:text-[#5c7a3e] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Дополнительная шапка: каталог, хиты, новинки, оплата и доставка, контакты */}
      <div className="border-t border-[#e8e8e8] bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-6 gap-y-2 py-2.5 md:py-3"
            aria-label="Быстрые разделы"
          >
            {subNavLinks.map((link, i) => (
              <Fragment key={link.href}>
                {i > 0 && (
                  <span
                    className="hidden sm:inline text-[#ccc] select-none px-0.5"
                    aria-hidden
                  >
                    |
                  </span>
                )}
                <Link
                  href={link.href}
                  className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] font-medium text-[#333] hover:text-[#5c7a3e] transition-colors whitespace-nowrap"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {link.label}
                </Link>
              </Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {cartContextMenu && (
        <div
          ref={cartContextMenuRef}
          role="menu"
          aria-label="Действия с корзиной"
          className="fixed z-[100] w-[min(220px,calc(100vw-16px))] py-1 bg-white border border-[#e5e5e5] shadow-[0_8px_24px_rgba(0,0,0,0.12)] text-left"
          style={{
            left: cartContextMenu.x,
            top: cartContextMenu.y,
          }}
        >
          <button
            type="button"
            role="menuitem"
            className="w-full px-3 py-2.5 text-left text-sm text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors"
            onClick={() => {
              openCart();
              setCartContextMenu(null);
            }}
          >
            Быстрая панель
          </button>
          <button
            type="button"
            role="menuitem"
            className="w-full px-3 py-2.5 text-left text-sm text-[#1a1a1a] hover:bg-[#f5f5f5] transition-colors border-t border-[#eee]"
            onClick={() => {
              setCartContextMenu(null);
              router.push("/cart");
            }}
          >
            Страница корзины
          </button>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#e5e5e5] px-4 py-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              openSearch();
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 bg-[#f5f5f5] border border-[#e0e0e0] text-sm text-[#666] text-left uppercase tracking-wider"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            <svg
              className="w-4 h-4 shrink-0 text-[#5c7a3e]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            Найти товар
          </button>
          <div className="flex flex-col gap-1">
            <p
              className="text-[10px] uppercase tracking-widest text-[#aaa] mb-1"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Разделы
            </p>
            {subNavLinks.map((link) => (
              <Link
                key={`sub-${link.href}`}
                href={link.href}
                className="text-xs uppercase tracking-wider text-[#666] hover:text-[#5c7a3e] py-1.5 transition-colors"
                style={{ fontFamily: "var(--font-oswald)" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/account"
              className="text-xs uppercase tracking-wider text-[#666] hover:text-[#5c7a3e] py-1.5 transition-colors border-t border-[#eee] mt-2 pt-3"
              style={{ fontFamily: "var(--font-oswald)" }}
              onClick={() => setMenuOpen(false)}
            >
              Личный кабинет
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
