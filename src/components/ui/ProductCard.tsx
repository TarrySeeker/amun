"use client";

import Link from "next/link";
import { useState, useCallback, type MouseEvent } from "react";
import type { Product } from "@/types";
import { formatProductPrice } from "@/lib/formatPrice";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export type ProductCardVariant = "dark" | "light";

/** Для страницы избранного: кастомное удаление с анимацией обёртки */
export interface WishlistHeartOverrides {
  isFavorite: boolean;
  onHeartClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

export type ProductCardSize = "default" | "large";

interface ProductCardProps {
  product: Product;
  variant?: ProductCardVariant;
  /** Увеличенная карточка для каталога */
  size?: ProductCardSize;
  wishlistOverrides?: WishlistHeartOverrides;
}

const HEART_PATH =
  "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z";

export default function ProductCard({
  product,
  variant = "dark",
  size = "default",
  wishlistOverrides,
}: ProductCardProps) {
  const { addItem, isInCart, openCart } = useCart();
  const wishlist = useWishlist();
  const inCart = isInCart(product.id);
  const light = variant === "light";
  const lg = size === "large";
  const inWishlist = wishlistOverrides
    ? wishlistOverrides.isFavorite
    : wishlist.isInWishlist(product.id);

  const [heartPulse, setHeartPulse] = useState(false);

  const handleWishlistClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (wishlistOverrides) {
        wishlistOverrides.onHeartClick(e);
      } else {
        wishlist.toggleItem(product);
      }
      setHeartPulse(true);
      window.setTimeout(() => setHeartPulse(false), 200);
    },
    [product, wishlist, wishlistOverrides]
  );

  const discount =
    !product.priceNotSpecified && product.oldPrice
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={
        light
          ? `group relative flex flex-col bg-[#f4f2eb] border border-[#e3dfd6] hover:border-[#a3b878] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_-16px_rgba(60,82,40,0.42)] transition-all duration-300 overflow-hidden ${lg ? "rounded-xl" : ""}`
          : `group relative flex flex-col bg-[#141414] border border-[#1e1e1e] hover:border-[#3d5228] transition-all duration-300 overflow-hidden ${lg ? "rounded-xl" : ""}`
      }
    >
      {/* Image wrapper */}
      <div
        className={
          light
            ? "relative aspect-square overflow-hidden bg-[#ebe7df]"
            : "relative aspect-square overflow-hidden bg-[#0e0e0e]"
        }
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: `url('${product.images[0]?.src ?? "/images/placeholder.jpg"}')`,
          }}
        />

        {/* Badges */}
        <div
          className={`absolute flex flex-col gap-2 ${lg ? "top-4 left-4" : "top-3 left-3 gap-1.5"}`}
        >
          {product.badge && (
            <span
              className={`bg-[#5c7a3e] text-white uppercase tracking-wider font-semibold shadow-sm ${lg ? "px-3 py-1 text-[11px] md:text-xs" : "px-2 py-0.5 text-[10px]"}`}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span
              className={`bg-[#c03030] text-white uppercase tracking-wider font-semibold shadow-sm ${lg ? "px-3 py-1 text-[11px] md:text-xs" : "px-2 py-0.5 text-[10px]"}`}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              −{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          type="button"
          aria-label={inWishlist ? "Удалить из избранного" : "В избранное"}
          className={
            light
              ? `absolute bg-[#f4f2eb]/95 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:border-[#5c7a3e] ${
                  lg ? "top-4 right-4 w-11 h-11 rounded-lg" : "top-3 right-3 w-8 h-8"
                } ${
                  inWishlist
                    ? "border-[#5c7a3e] text-[#5c7a3e]"
                    : "border-[#cfc8bc] hover:text-[#4d6834] text-[#8a8278]"
                }`
              : `absolute bg-[#0a0a0a]/80 border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:border-[#5c7a3e] ${
                  lg ? "top-4 right-4 w-11 h-11 rounded-lg" : "top-3 right-3 w-8 h-8"
                } ${
                  inWishlist
                    ? "border-[#5c7a3e] text-[#5c7a3e]"
                    : "border-[#2a2a2a] hover:text-[#7a9e52] text-[#6b6055]"
                }`
          }
          onClick={handleWishlistClick}
        >
          <svg
            className={`transition-transform duration-200 ${lg ? "w-5 h-5" : "w-4 h-4"} ${
              heartPulse ? "scale-125" : "scale-100"
            }`}
            viewBox="0 0 24 24"
            fill={inWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={inWishlist ? 0 : 1.8}
          >
            <path d={HEART_PATH} strokeLinejoin="round" />
          </svg>
        </button>

        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            type="button"
            disabled={!product.inStock || product.priceNotSpecified}
            className={
              inCart
                ? light
                  ? `w-full bg-[#f4f2eb] border border-[#5c7a3e] text-[#4d6834] uppercase tracking-widest font-semibold transition-colors hover:bg-[#ebe7df] ${lg ? "py-4 text-sm" : "py-3 text-xs"}`
                  : `w-full bg-[#1e2a14] border border-[#5c7a3e] text-[#7a9e52] uppercase tracking-widest font-semibold transition-colors hover:bg-[#253018] ${lg ? "py-4 text-sm" : "py-3 text-xs"}`
                : light
                  ? `w-full bg-[#5c7a3e] hover:bg-[#6b8f47] disabled:bg-[#ccc] disabled:text-[#888] text-white uppercase tracking-widest font-semibold transition-colors ${lg ? "py-4 text-sm" : "py-3 text-xs"}`
                  : `w-full bg-[#5c7a3e] hover:bg-[#6b8f47] disabled:bg-[#2a2a2a] disabled:text-[#5a5048] text-white uppercase tracking-widest font-semibold transition-colors ${lg ? "py-4 text-sm" : "py-3 text-xs"}`
            }
            style={{ fontFamily: "var(--font-oswald)" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!product.inStock || product.priceNotSpecified) return;
              if (inCart) openCart();
              else addItem(product, 1);
            }}
          >
            {inCart
              ? "Уже в корзине"
              : product.priceNotSpecified
                ? "Цена по запросу"
                : "В корзину"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div
        className={`flex flex-col ${lg ? "p-5 md:p-6 gap-3 min-h-[6.75rem]" : "p-4 gap-2"}`}
      >
        <span
          className={
            light
              ? lg
                ? "text-xs uppercase tracking-[0.18em] text-[#4d6834]"
                : "text-[10px] uppercase tracking-[0.2em] text-[#4d6834]"
              : lg
                ? "text-xs uppercase tracking-[0.18em] text-[#5c7a3e]"
                : "text-[10px] uppercase tracking-[0.2em] text-[#5c7a3e]"
          }
        >
          {product.category}
        </span>

        <h3
          className={
            light
              ? lg
                ? "text-base md:text-lg font-semibold text-[#2a2622] group-hover:text-[#4d6834] transition-colors leading-snug line-clamp-3"
                : "text-sm font-semibold text-[#2a2622] group-hover:text-[#4d6834] transition-colors leading-snug line-clamp-2"
              : lg
                ? "text-base md:text-lg font-semibold text-[#f0ece4] group-hover:text-[#7a9e52] transition-colors leading-snug line-clamp-3"
                : "text-sm font-semibold text-[#f0ece4] group-hover:text-[#7a9e52] transition-colors leading-snug line-clamp-2"
          }
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className={`flex flex-wrap items-baseline gap-2 ${lg ? "mt-auto pt-1" : "mt-1"}`}>
          <span
            className={
              light
                ? lg
                  ? `font-black text-[#2a2622] ${
                      product.priceNotSpecified ? "text-lg md:text-xl" : "text-2xl md:text-[1.65rem]"
                    }`
                  : `font-black text-[#2a2622] ${
                      product.priceNotSpecified ? "text-base" : "text-xl"
                    }`
                : lg
                  ? `font-black text-[#f0ece4] ${
                      product.priceNotSpecified ? "text-lg md:text-xl" : "text-2xl md:text-[1.65rem]"
                    }`
                  : `font-black text-[#f0ece4] ${
                      product.priceNotSpecified ? "text-base" : "text-xl"
                    }`
            }
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {formatProductPrice(product)}
          </span>
          {!product.priceNotSpecified && product.oldPrice && (
            <span
              className={
                light
                  ? lg
                    ? "text-base text-[#9a9080] line-through"
                    : "text-sm text-[#9a9080] line-through"
                  : lg
                    ? "text-base text-[#5a5048] line-through"
                    : "text-sm text-[#5a5048] line-through"
              }
            >
              {product.oldPrice.toLocaleString("ru-RU")} ₽
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
