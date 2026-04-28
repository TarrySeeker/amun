"use client";

import Link from "next/link";
import { Product } from "@/types";
import { formatProductPrice } from "@/lib/formatPrice";

interface SearchResultItemProps {
  product: Product;
  onSelect: () => void;
}

export default function SearchResultItem({
  product,
  onSelect,
}: SearchResultItemProps) {
  const src = product.images[0]?.src ?? "/images/placeholder.jpg";
  return (
    <Link
      href={`/product/${product.slug}`}
      onClick={onSelect}
      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1a1a1a] transition-colors group"
    >
      <div
        className="w-12 h-12 shrink-0 rounded border border-[#2a2a2a] bg-[#0e0e0e] bg-cover bg-center"
        style={{ backgroundImage: `url('${src}')` }}
      />
      <div className="flex-1 min-w-0 text-left">
        <p
          className="text-sm font-semibold text-[#f0ece4] group-hover:text-[#7a9e52] transition-colors line-clamp-2 leading-snug"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          {product.name}
        </p>
        <p className="text-[11px] uppercase tracking-wider text-[#6b6055] mt-0.5">
          {product.category}
        </p>
      </div>
      <span
        className={`shrink-0 text-sm font-bold text-[#f0ece4] ${product.priceNotSpecified ? "text-xs font-semibold uppercase tracking-wide text-[#9a8f80]" : ""}`}
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {formatProductPrice(product)}
      </span>
    </Link>
  );
}
