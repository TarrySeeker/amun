"use client";

import { useState, useEffect, useRef } from "react";
import type { Product } from "@/types";
import { formatProductPrice } from "@/lib/formatPrice";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxQty = product.stockCount ?? 1;

  const discount =
    !product.priceNotSpecified && product.oldPrice
      ? Math.round((1 - product.price / product.oldPrice) * 100)
      : null;

  useEffect(() => {
    return () => {
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedFeedback(true);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    feedbackTimer.current = setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
  };

  const quickSpecs = product.specs.slice(0, 3);

  return (
    <div className="flex flex-col gap-5">
      {/* Badge */}
      {product.badge && (
        <span
          className="self-start px-3 py-1 bg-[#5c7a3e] text-white text-xs uppercase tracking-wider font-semibold"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {product.badge}
        </span>
      )}

      {/* Category */}
      <span className="text-xs uppercase tracking-[0.2em] text-[#5c7a3e]">
        {product.category}
      </span>

      {/* Name */}
      <h1
        className="text-3xl lg:text-4xl font-bold text-[#f0ece4] leading-tight"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {product.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(product.rating)
                  ? "text-[#c49a3c]"
                  : "text-[#2a2a2a]"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-sm text-[#9a8f80]">
          {product.rating} ({product.reviews} отзывов)
        </span>
      </div>

      {/* Stock */}
      {product.inStock ? (
        <span className="text-sm text-[#7a9e52]">
          В наличии{product.stockCount ? ` (${product.stockCount} шт.)` : ""}
        </span>
      ) : (
        <span className="text-sm text-[#c03030]">Нет в наличии</span>
      )}

      {/* Price */}
      <div className="flex items-baseline gap-3 flex-wrap">
        <span
          className={
            product.priceNotSpecified
              ? "text-xl md:text-2xl font-semibold text-[#9a8f80]"
              : "text-3xl font-black text-[#f0ece4]"
          }
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {formatProductPrice(product)}
        </span>
        {!product.priceNotSpecified && product.oldPrice && (
          <span className="text-lg text-[#5a5048] line-through">
            {product.oldPrice.toLocaleString("ru-RU")} ₽
          </span>
        )}
        {discount && (
          <span
            className="px-2 py-0.5 bg-[#c03030] text-white text-xs font-semibold"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            −{discount}%
          </span>
        )}
      </div>

      {/* Quantity */}
      {product.inStock && !product.priceNotSpecified && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#9a8f80]">Количество:</span>
          <div className="flex items-center border border-[#2a2a2a]">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center text-[#f0ece4] hover:bg-[#1e1e1e] transition-colors"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span
              className="w-12 h-10 flex items-center justify-center text-[#f0ece4] border-x border-[#2a2a2a] text-sm"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
              className="w-10 h-10 flex items-center justify-center text-[#f0ece4] hover:bg-[#1e1e1e] transition-colors"
              disabled={quantity >= maxQty}
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-1 w-full">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || product.priceNotSpecified}
          className={`flex-1 py-3.5 text-sm uppercase tracking-widest font-semibold transition-colors ${
            addedFeedback
              ? "bg-[#3d5228] text-[#c8e6a0]"
              : "bg-[#5c7a3e] hover:bg-[#6b8f47] disabled:bg-[#2a2a2a] disabled:text-[#5a5048] text-white"
          }`}
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {product.priceNotSpecified
            ? "Цена по запросу"
            : addedFeedback
              ? "Добавлено ✓"
              : "В корзину"}
        </button>
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`sm:min-w-[200px] py-3.5 px-4 text-sm uppercase tracking-widest font-semibold transition-colors border ${
            inWishlist
              ? "border-[#5c7a3e] text-[#7a9e52] hover:bg-[#1a2512]"
              : "border-[#2a2a2a] text-[#6b6055] hover:border-[#5c7a3e] hover:text-[#7a9e52]"
          }`}
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {inWishlist ? "В избранном ♥" : "В избранное"}
        </button>
      </div>

      {/* Short description */}
      <p className="text-[#9a8f80] text-sm leading-relaxed mt-2">
        {product.shortDescription}
      </p>

      {/* Quick specs */}
      {quickSpecs.length > 0 && (
        <div className="border-t border-[#1e1e1e] pt-4 mt-2">
          <h3
            className="text-xs uppercase tracking-widest text-[#6b6055] mb-3"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Основные характеристики
          </h3>
          <dl className="flex flex-col gap-2">
            {quickSpecs.map((spec) => (
              <div key={spec.label} className="flex justify-between text-sm">
                <dt className="text-[#6b6055]">{spec.label}</dt>
                <dd className="text-[#f0ece4]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
