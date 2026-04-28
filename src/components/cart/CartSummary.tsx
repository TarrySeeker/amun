"use client";

import Link from "next/link";
import type { CartItem } from "@/types";

function lineItemsLabel(count: number): string {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;
  if (n > 10 && n < 20) return `${count} позиций`;
  if (n1 > 1 && n1 < 5) return `${count} позиции`;
  if (n1 === 1) return `${count} позиция`;
  return `${count} позиций`;
}

const FREE_SHIPPING_FROM = 5000;

export interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  showCheckoutButton?: boolean;
  showClearButton?: boolean;
  onClear?: () => void;
}

export default function CartSummary({
  items,
  totalPrice,
  showCheckoutButton = false,
  showClearButton = false,
  onClear,
}: CartSummaryProps) {
  const lineCount = items.length;
  const deliveryNote =
    totalPrice >= FREE_SHIPPING_FROM
      ? "Бесплатно при заказе от 5 000 ₽"
      : "Рассчитывается при оформлении";

  return (
    <div className="border border-[#2a2a2a] bg-[#141414] p-5 space-y-4">
      <h2
        className="text-xs uppercase tracking-widest text-[#6b6055]"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Ваш заказ
      </h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-4 text-[#9a8f80]">
          <span>Количество позиций</span>
          <span className="text-[#f0ece4] shrink-0">{lineItemsLabel(lineCount)}</span>
        </div>
        <div className="flex justify-between gap-4 text-[#9a8f80]">
          <span>Промежуточный итог</span>
          <span className="text-[#f0ece4] shrink-0">
            {totalPrice.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <div className="flex justify-between gap-4 text-[#9a8f80]">
          <span>Доставка</span>
          <span className="text-[#f0ece4] text-right text-xs sm:text-sm shrink-0 max-w-[60%]">
            {deliveryNote}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-baseline gap-4 pt-2 border-t border-[#2a2a2a]">
        <span
          className="text-lg font-bold text-[#f0ece4]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Итого
        </span>
        <span
          className="text-2xl font-black text-[#f0ece4]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {totalPrice.toLocaleString("ru-RU")} ₽
        </span>
      </div>

      {showCheckoutButton && lineCount > 0 && (
        <Link
          href="/checkout"
          className="block w-full text-center bg-[#5c7a3e] hover:bg-[#6b8f47] text-white py-3.5 text-sm uppercase tracking-widest font-semibold transition-colors"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Оформить заказ
        </Link>
      )}

      {showClearButton && lineCount > 0 && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="w-full py-2.5 text-sm text-[#9a8f80] hover:text-[#c03030] border border-[#2a2a2a] hover:border-[#5a3030] transition-colors"
        >
          Очистить корзину
        </button>
      )}
    </div>
  );
}
