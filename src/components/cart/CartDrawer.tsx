"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawerItem from "@/components/cart/CartDrawerItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartDrawer() {
  const { items, isOpen, closeCart, totalPrice } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        role="presentation"
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      <aside
        aria-label="Корзина"
        className={`fixed top-0 right-0 z-[70] h-full w-80 md:w-96 bg-[#111] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#2a2a2a] shrink-0">
          <h2
            className="text-lg font-bold text-[#f0ece4] uppercase tracking-wider"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Корзина
          </h2>
          <button
            type="button"
            aria-label="Закрыть корзину"
            className="p-2 text-[#9a8f80] hover:text-[#f0ece4] transition-colors"
            onClick={closeCart}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <p className="text-[#9a8f80] text-sm">Корзина пуста</p>
            <Link
              href="/catalog"
              onClick={closeCart}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-xs uppercase tracking-widest font-semibold transition-colors"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 min-h-0">
              {items.map((item) => (
                <CartDrawerItem key={item.product.id} item={item} />
              ))}
            </div>
            <div className="shrink-0 p-4 border-t border-[#2a2a2a] space-y-3">
              <CartSummary
                items={items}
                totalPrice={totalPrice}
                showCheckoutButton
              />
            </div>
          </>
        )}
      </aside>
    </>
  );
}
