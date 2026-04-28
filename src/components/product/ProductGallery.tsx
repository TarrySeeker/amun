"use client";

import { useState } from "react";
import { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square bg-[#111] border border-[#1e1e1e] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
          style={{
            backgroundImage: `url('${images[currentIndex]?.src ?? "/images/placeholder.jpg"}')`,
          }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0a0a0a]/80 border border-[#2a2a2a] flex items-center justify-center text-[#f0ece4] hover:border-[#5c7a3e] hover:text-[#7a9e52] transition-colors"
              aria-label="Предыдущее фото"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0a0a0a]/80 border border-[#2a2a2a] flex items-center justify-center text-[#f0ece4] hover:border-[#5c7a3e] hover:text-[#7a9e52] transition-colors"
              aria-label="Следующее фото"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-[#0a0a0a]/80 px-3 py-1 text-xs text-[#9a8f80]">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`relative w-20 h-20 flex-shrink-0 bg-[#111] border-2 transition-colors overflow-hidden ${
                index === currentIndex
                  ? "border-[#5c7a3e]"
                  : "border-[#1e1e1e] hover:border-[#3d5228]"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${image.src}')` }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
