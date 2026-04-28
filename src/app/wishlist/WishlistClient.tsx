"use client";

import { useCallback, useState, type MouseEvent } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ProductCard from "@/components/ui/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types";

const EXIT_MS = 200;

function ruGoodsLabel(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "товаров";
  if (mod10 === 1) return "товар";
  if (mod10 >= 2 && mod10 <= 4) return "товара";
  return "товаров";
}

export default function WishlistClient() {
  const { items, totalItems, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const [exitingIds, setExitingIds] = useState<ReadonlySet<string>>(new Set());

  const handleHeartRemove = useCallback(
    (product: Product, e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setExitingIds((prev) => new Set(prev).add(product.id));
      window.setTimeout(() => {
        removeItem(product.id);
        setExitingIds((prev) => {
          const next = new Set(prev);
          next.delete(product.id);
          return next;
        });
      }, EXIT_MS);
    },
    [removeItem]
  );

  const handleClear = () => {
    if (
      !window.confirm("Удалить все товары из избранного?")
    ) {
      return;
    }
    clearWishlist();
  };

  const handleAddToCartFromWishlist = useCallback(
    (product: Product) => {
      if (!product.inStock) return;
      addToCart(product, 1);
      removeItem(product.id);
    },
    [addToCart, removeItem]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-10">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Избранное" },
        ]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between gap-y-3 mb-8">
        <h1
          className="text-3xl font-bold text-[#f0ece4]"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Избранное{" "}
          <span className="text-lg font-normal text-[#6b6055]">
            ({totalItems} {ruGoodsLabel(totalItems)})
          </span>
        </h1>
        {totalItems > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="self-start sm:self-auto text-sm text-[#9a8f80] hover:text-[#c03030] transition-colors underline underline-offset-2"
          >
            Очистить избранное
          </button>
        )}
      </div>

      {totalItems === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 border border-[#e3dfd6] rounded-lg bg-[#f4f2eb] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.25)]">
          <svg
            className="w-16 h-16 text-[#c8c2b8] mb-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            viewBox="0 0 24 24"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p
            className="text-lg text-[#5a5048] mb-6 text-center max-w-md"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Вы ещё ничего не добавили в избранное
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-sm uppercase tracking-widest font-semibold transition-colors"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(({ product }) => (
            <div
              key={product.id}
              className={`flex flex-col gap-3 transition-all duration-200 ${
                exitingIds.has(product.id)
                  ? "opacity-0 scale-95 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <ProductCard
                product={product}
                variant="light"
                wishlistOverrides={{
                  isFavorite: true,
                  onHeartClick: (e) => handleHeartRemove(product, e),
                }}
              />
              <button
                type="button"
                disabled={!product.inStock}
                onClick={() => handleAddToCartFromWishlist(product)}
                className="w-full py-3 text-xs uppercase tracking-widest font-semibold transition-colors bg-[#f4f2eb] border border-[#5c7a3e] text-[#4d6834] hover:bg-[#ebe7df] disabled:bg-[#ebe7df] disabled:text-[#9a9080] disabled:border-[#d8d2c8]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                {product.inStock ? "В корзину" : "Нет в наличии"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
