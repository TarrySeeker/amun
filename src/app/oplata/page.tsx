import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оплата — Статус",
  description: "Способы оплаты заказов в интернет-магазине Статус.",
};

export default function PaymentPage() {
  return (
    <div className="container mx-auto px-4 page-content-top pb-16 max-w-3xl">
      <h1
        className="text-3xl font-black uppercase text-[#f0ece4] mb-6"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Оплата
      </h1>
      <div className="space-y-4 text-[#9a8f80] leading-relaxed">
        <p>
          Банковские карты Visa и Mastercard, оплата по СБП, наличные при
          получении (где доступно). Реквизиты для безналичного перевода — в
          письме после оформления заказа.
        </p>
        <p className="text-sm text-[#6b6055]">
          Точные условия уточняются на этапе оформления заказа.
        </p>
      </div>
    </div>
  );
}
