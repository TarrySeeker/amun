"use client";

import Image from "next/image";
import type { CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { effectiveLineTotal, formatProductPrice } from "@/lib/formatPrice";

export interface CartPageItemProps {
  item: CartItem;
}

export default function CartPageItem({ item }: CartPageItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const src = product.images[0]?.src ?? "/images/placeholder.jpg";
  const alt = product.images[0]?.alt ?? product.name;
  const lineTotal = effectiveLineTotal(product, quantity);

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-[#2a2a2a] bg-[#141414]">
      <div className="relative w-full sm:w-24 h-24 shrink-0 bg-[#0e0e0e] overflow-hidden mx-auto sm:mx-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5c7a3e]">
              {product.category}
            </span>
            <h3
              className="text-base font-semibold text-[#f0ece4] mt-1"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {product.name}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Удалить из корзины"
            className="self-start p-2 text-[#6b6055] hover:text-[#c03030] transition-colors sm:mt-0"
            onClick={() => removeItem(product.id)}
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

        <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-2">
          <div className="flex items-center border border-[#2a2a2a]">
            <button
              type="button"
              aria-label="Уменьшить количество"
              className="w-10 h-10 flex items-center justify-center text-[#f0ece4] hover:bg-[#1e1e1e] transition-colors"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              −
            </button>
            <span
              className="w-12 h-10 flex items-center justify-center text-sm text-[#f0ece4] border-x border-[#2a2a2a]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Увеличить количество"
              className="w-10 h-10 flex items-center justify-center text-[#f0ece4] hover:bg-[#1e1e1e] transition-colors"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              +
            </button>
          </div>

          <div className="text-right text-sm">
            <span className="text-[#9a8f80]">
              {formatProductPrice(product)}
              {!product.priceNotSpecified && <> × {quantity}</>}
            </span>
            <p
              className="text-lg font-bold text-[#f0ece4] mt-0.5"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {product.priceNotSpecified ? "—" : `${lineTotal.toLocaleString("ru-RU")} ₽`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
