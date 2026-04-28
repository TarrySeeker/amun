"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function randomOrderId(): string {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `STAT-${n}`;
}

export default function SuccessClient() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(randomOrderId());
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 page-content-top pb-24 text-center">
      <div className="flex justify-center mb-8">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="40" cy="40" r="38" stroke="#5c7a3e" strokeWidth="3" />
          <path
            d="M24 40l12 12 20-24"
            stroke="#5c7a3e"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#f0ece4] mb-4"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Заказ оформлен!
      </h1>

      <p className="text-lg text-[#9a8f80] mb-2">
        Номер заказа:{" "}
        <span className="text-[#f0ece4] font-semibold tabular-nums">
          {orderId ? `#${orderId}` : "…"}
        </span>
      </p>

      <p className="text-sm text-[#9a8f80] mb-10">
        Мы свяжемся с вами в течение 30 минут для подтверждения
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex justify-center items-center px-6 py-3 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-sm uppercase tracking-widest font-semibold transition-colors"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          На главную
        </Link>
        <Link
          href="/catalog"
          className="inline-flex justify-center items-center px-6 py-3 border border-[#2a2a2a] text-[#f0ece4] hover:border-[#5c7a3e] text-sm uppercase tracking-widest font-semibold transition-colors"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Продолжить покупки
        </Link>
      </div>
    </div>
  );
}
