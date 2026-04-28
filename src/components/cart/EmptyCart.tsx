"use client";

import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-[#2a2a2a] bg-[#141414] text-center gap-6 max-w-md mx-auto">
      <p className="text-[#9a8f80] text-sm">
        В корзине пока ничего нет — загляните в каталог и выберите снаряжение.
      </p>
      <Link
        href="/catalog"
        className="inline-flex items-center justify-center px-6 py-3 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-sm uppercase tracking-widest font-semibold transition-colors"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        В каталог
      </Link>
    </div>
  );
}
