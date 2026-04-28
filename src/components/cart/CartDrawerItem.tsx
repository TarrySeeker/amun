"use client";

import Image from "next/image";
import type { CartItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatProductPrice } from "@/lib/formatPrice";

export interface CartDrawerItemProps {
  item: CartItem;
}

export default function CartDrawerItem({ item }: CartDrawerItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const src = product.images[0]?.src ?? "/images/placeholder.jpg";
  const alt = product.images[0]?.alt ?? product.name;

  return (
    <div className="flex gap-3 py-3 border-b border-[#2a2a2a] last:border-0">
      <div className="relative w-16 h-16 shrink-0 bg-[#0e0e0e] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p
          className="text-sm text-[#f0ece4] leading-snug line-clamp-2"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {product.name}
        </p>
        <p className="text-xs text-[#7a9e52]">
          {formatProductPrice(product)}
          {!product.priceNotSpecified && " / шт."}
        </p>

        <div className="flex items-center justify-between gap-2 mt-1">
          <div className="flex items-center border border-[#2a2a2a]">
            <button
              type="button"
              aria-label="Уменьшить количество"
              className="w-8 h-8 flex items-center justify-center text-[#f0ece4] hover:bg-[#1e1e1e] transition-colors"
              onClick={() => updateQuantity(product.id, quantity - 1)}
            >
              −
            </button>
            <span
              className="w-8 h-8 flex items-center justify-center text-sm text-[#f0ece4] border-x border-[#2a2a2a]"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Увеличить количество"
              className="w-8 h-8 flex items-center justify-center text-[#f0ece4] hover:bg-[#1e1e1e] transition-colors"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              +
            </button>
          </div>

          <button
            type="button"
            aria-label="Удалить из корзины"
            className="p-1.5 text-[#6b6055] hover:text-[#c03030] transition-colors"
            onClick={() => removeItem(product.id)}
          >
            <svg
              className="w-4 h-4"
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
      </div>
    </div>
  );
}
