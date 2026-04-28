"use client";

import { useState } from "react";
import { Product } from "@/types";
import ProductSpecs from "./ProductSpecs";
import ReviewsStub from "./ReviewsStub";

type Tab = "description" | "specs" | "reviews";

interface ProductTabsProps {
  product: Product;
}

const tabs: { key: Tab; label: string }[] = [
  { key: "description", label: "Описание" },
  { key: "specs", label: "Характеристики" },
  { key: "reviews", label: "Отзывы" },
];

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("description");

  return (
    <div className="mt-16">
      {/* Tab headers */}
      <div className="flex border-b border-[#1e1e1e]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 text-sm uppercase tracking-wider transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "border-[#5c7a3e] text-[#7a9e52]"
                : "border-transparent text-[#6b6055] hover:text-[#9a8f80]"
            }`}
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-8">
        {activeTab === "description" && (
          <div className="max-w-3xl">
            {product.description.split("\n").map((paragraph, index) => (
              <p
                key={index}
                className="text-[#9a8f80] leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
          </div>
        )}

        {activeTab === "specs" && (
          <div className="max-w-2xl">
            <ProductSpecs specs={product.specs} />
          </div>
        )}

        {activeTab === "reviews" && (
          <ReviewsStub rating={product.rating} reviewsCount={product.reviews} />
        )}
      </div>
    </div>
  );
}
