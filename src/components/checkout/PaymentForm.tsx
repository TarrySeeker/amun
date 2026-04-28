"use client";

import type { PaymentMethod } from "@/types";

export interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

function optionCardClass(active: boolean): string {
  return `cursor-pointer rounded-lg border p-4 flex gap-4 items-start text-left transition-colors ${
    active
      ? "border-[#5c7a3e] bg-[#0f1a0a]"
      : "border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#3a3a3a]"
  }`;
}

function IconCard() {
  return (
    <svg
      className="shrink-0 w-10 h-10 text-[#5c7a3e]"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="4"
        y="10"
        width="32"
        height="22"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 16h32"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="8" y="22" width="10" height="5" rx="1" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function IconCash() {
  return (
    <svg
      className="shrink-0 w-10 h-10 text-[#5c7a3e]"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="6"
        y="12"
        width="28"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="21" r="4" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M10 16h4M26 16h4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconSbp() {
  return (
    <svg
      className="shrink-0 w-10 h-10 text-[#5c7a3e]"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="8"
        y="8"
        width="24"
        height="24"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M14 14h12v12H14V14z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M17 17h6v6H17z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

export default function PaymentForm({
  paymentMethod,
  onChange,
}: PaymentFormProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <button
        type="button"
        className={optionCardClass(paymentMethod === "card")}
        onClick={() => onChange("card")}
      >
        <IconCard />
        <div>
          <span
            className="block font-semibold text-[#f0ece4]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Банковская карта
          </span>
          <span className="block text-sm text-[#9a8f80] mt-1">
            Visa / MasterCard / МИР
          </span>
        </div>
      </button>

      <button
        type="button"
        className={optionCardClass(paymentMethod === "cash")}
        onClick={() => onChange("cash")}
      >
        <IconCash />
        <div>
          <span
            className="block font-semibold text-[#f0ece4]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Наличными
          </span>
          <span className="block text-sm text-[#9a8f80] mt-1">
            При получении или самовывозе
          </span>
        </div>
      </button>

      <button
        type="button"
        className={optionCardClass(paymentMethod === "sbp")}
        onClick={() => onChange("sbp")}
      >
        <IconSbp />
        <div>
          <span
            className="block font-semibold text-[#f0ece4]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            СБП
          </span>
          <span className="block text-sm text-[#9a8f80] mt-1">
            Быстрые платежи по QR
          </span>
        </div>
      </button>
    </div>
  );
}
