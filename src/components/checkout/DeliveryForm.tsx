"use client";

import type { DeliveryInfo } from "@/types";

export type CheckoutDeliveryMethod = DeliveryInfo["method"];

export interface DeliveryFormErrors {
  city?: string;
  address?: string;
  postalCode?: string;
}

export interface DeliveryFormProps {
  deliveryMethod: CheckoutDeliveryMethod;
  city: string;
  address: string;
  postalCode: string;
  comment: string;
  errors: DeliveryFormErrors;
  onChange: (patch: {
    deliveryMethod?: CheckoutDeliveryMethod;
    city?: string;
    address?: string;
    postalCode?: string;
    comment?: string;
  }) => void;
}

const FREE_FROM = 5000;

const inputBase =
  "w-full px-3 py-2.5 text-sm text-[#f0ece4] bg-[#0a0a0a] border rounded-md transition-colors focus:border-[#5c7a3e] focus:outline-none";

function optionCardClass(active: boolean): string {
  return `cursor-pointer rounded-lg border p-4 text-left transition-colors ${
    active
      ? "border-[#5c7a3e] bg-[#0f1a0a]"
      : "border-[#2a2a2a] bg-[#0a0a0a] hover:border-[#3a3a3a]"
  }`;
}

export default function DeliveryForm({
  deliveryMethod,
  city,
  address,
  postalCode,
  comment,
  errors,
  onChange,
}: DeliveryFormProps) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3">
        <button
          type="button"
          className={optionCardClass(deliveryMethod === "courier")}
          onClick={() => onChange({ deliveryMethod: "courier" })}
        >
          <span
            className="block font-semibold text-[#f0ece4]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Курьером
          </span>
          <span className="block text-sm text-[#9a8f80] mt-1">
            Доставка по городу 1–2 дня. 350 ₽ или бесплатно от{" "}
            {FREE_FROM.toLocaleString("ru-RU")} ₽
          </span>
        </button>

        <button
          type="button"
          className={optionCardClass(deliveryMethod === "pickup")}
          onClick={() => onChange({ deliveryMethod: "pickup" })}
        >
          <span
            className="block font-semibold text-[#f0ece4]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Самовывоз
          </span>
          <span className="block text-sm text-[#9a8f80] mt-1">
            г. Екатеринбург, ул. Малышева 32 — бесплатно
          </span>
        </button>

        <button
          type="button"
          className={optionCardClass(deliveryMethod === "post")}
          onClick={() => onChange({ deliveryMethod: "post" })}
        >
          <span
            className="block font-semibold text-[#f0ece4]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Почта России
          </span>
          <span className="block text-sm text-[#9a8f80] mt-1">
            3–7 рабочих дней — 290 ₽
          </span>
        </button>
      </div>

      {deliveryMethod === "courier" && (
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label htmlFor="checkout-city-c" className="text-xs text-[#9a8f80]">
              Город <span className="text-[#5c7a3e]">*</span>
            </label>
            <input
              id="checkout-city-c"
              type="text"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => onChange({ city: e.target.value })}
              className={`${inputBase} ${
                errors.city ? "border-red-700" : "border-[#2a2a2a]"
              }`}
            />
            {errors.city && (
              <p className="text-xs text-red-600">{errors.city}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="checkout-address-c" className="text-xs text-[#9a8f80]">
              Адрес <span className="text-[#5c7a3e]">*</span>
            </label>
            <input
              id="checkout-address-c"
              type="text"
              autoComplete="street-address"
              value={address}
              onChange={(e) => onChange({ address: e.target.value })}
              className={`${inputBase} ${
                errors.address ? "border-red-700" : "border-[#2a2a2a]"
              }`}
            />
            {errors.address && (
              <p className="text-xs text-red-600">{errors.address}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="checkout-comment-c" className="text-xs text-[#9a8f80]">
              Комментарий курьеру
            </label>
            <textarea
              id="checkout-comment-c"
              rows={3}
              value={comment}
              onChange={(e) => onChange({ comment: e.target.value })}
              className={`${inputBase} resize-y min-h-[80px] border-[#2a2a2a]`}
            />
          </div>
        </div>
      )}

      {deliveryMethod === "pickup" && (
        <div className="rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] p-4 text-sm text-[#9a8f80]">
          <p className="text-[#f0ece4] font-medium mb-2">Пункт выдачи</p>
          <p>г. Екатеринбург, ул. Малышева, д. 32</p>
          <p className="mt-2">Пн–Пт 10:00–19:00, Сб 11:00–17:00</p>
        </div>
      )}

      {deliveryMethod === "post" && (
        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label htmlFor="checkout-city-p" className="text-xs text-[#9a8f80]">
              Город <span className="text-[#5c7a3e]">*</span>
            </label>
            <input
              id="checkout-city-p"
              type="text"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => onChange({ city: e.target.value })}
              className={`${inputBase} ${
                errors.city ? "border-red-700" : "border-[#2a2a2a]"
              }`}
            />
            {errors.city && (
              <p className="text-xs text-red-600">{errors.city}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="checkout-address-p" className="text-xs text-[#9a8f80]">
              Адрес <span className="text-[#5c7a3e]">*</span>
            </label>
            <input
              id="checkout-address-p"
              type="text"
              autoComplete="street-address"
              value={address}
              onChange={(e) => onChange({ address: e.target.value })}
              className={`${inputBase} ${
                errors.address ? "border-red-700" : "border-[#2a2a2a]"
              }`}
            />
            {errors.address && (
              <p className="text-xs text-red-600">{errors.address}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label htmlFor="checkout-postal" className="text-xs text-[#9a8f80]">
              Индекс <span className="text-[#5c7a3e]">*</span>
            </label>
            <input
              id="checkout-postal"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={postalCode}
              onChange={(e) =>
                onChange({
                  postalCode: e.target.value.replace(/\D/g, "").slice(0, 6),
                })
              }
              className={`${inputBase} ${
                errors.postalCode ? "border-red-700" : "border-[#2a2a2a]"
              }`}
            />
            {errors.postalCode && (
              <p className="text-xs text-red-600">{errors.postalCode}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
