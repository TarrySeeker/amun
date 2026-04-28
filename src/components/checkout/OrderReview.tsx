"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { effectiveLineTotal, formatProductPrice } from "@/lib/formatPrice";
import type { DeliveryInfo } from "@/types";

const FREE_SHIPPING_FROM = 5000;
const COURIER_FLAT = 350;
const POST_FLAT = 290;

export interface OrderReviewProps {
  deliveryMethod: DeliveryInfo["method"];
}

function deliveryPrice(
  method: DeliveryInfo["method"],
  subtotal: number
): number {
  if (method === "pickup") return 0;
  if (method === "post") return POST_FLAT;
  if (method === "courier") return subtotal >= FREE_SHIPPING_FROM ? 0 : COURIER_FLAT;
  return 0;
}

function deliveryLabel(
  method: DeliveryInfo["method"],
  subtotal: number
): string {
  const p = deliveryPrice(method, subtotal);
  if (method === "pickup") return "Бесплатно";
  if (p === 0 && method === "courier") return "Бесплатно (от 5 000 ₽)";
  return `${p.toLocaleString("ru-RU")} ₽`;
}

export default function OrderReview({ deliveryMethod }: OrderReviewProps) {
  const { items, totalPrice } = useCart();
  const ship = deliveryPrice(deliveryMethod, totalPrice);
  const grand = totalPrice + ship;

  return (
    <aside className="lg:sticky lg:top-4 space-y-4">
      <div className="border border-[#2a2a2a] bg-[#141414] p-5 space-y-4">
        <h2
          className="text-xs uppercase tracking-widest text-[#6b6055]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Ваш заказ
        </h2>

        <ul className="space-y-3 max-h-[min(50vh,420px)] overflow-y-auto pr-1">
          {items.map(({ product, quantity }) => {
            const src = product.images[0]?.src ?? "/images/placeholder.jpg";
            const alt = product.images[0]?.alt ?? product.name;
            const line = effectiveLineTotal(product, quantity);
            return (
              <li key={product.id} className="flex gap-3">
                <div className="relative w-14 h-14 shrink-0 bg-[#0e0e0e] overflow-hidden">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-sm font-medium text-[#f0ece4] hover:text-[#7a9e52] line-clamp-2"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-[#9a8f80] mt-0.5">
                    {product.priceNotSpecified
                      ? formatProductPrice(product)
                      : `${quantity} × ${product.price.toLocaleString("ru-RU")} ₽`}
                  </p>
                  <p className="text-sm text-[#f0ece4] mt-1">
                    {product.priceNotSpecified ? "—" : `${line.toLocaleString("ru-RU")} ₽`}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-[#2a2a2a] pt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4 text-[#9a8f80]">
            <span>Подытог</span>
            <span className="text-[#f0ece4] shrink-0">
              {totalPrice.toLocaleString("ru-RU")} ₽
            </span>
          </div>
          <div className="flex justify-between gap-4 text-[#9a8f80]">
            <span>Доставка</span>
            <span className="text-[#f0ece4] shrink-0 text-right">
              {deliveryLabel(deliveryMethod, totalPrice)}
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
            {grand.toLocaleString("ru-RU")} ₽
          </span>
        </div>
      </div>
    </aside>
  );
}
