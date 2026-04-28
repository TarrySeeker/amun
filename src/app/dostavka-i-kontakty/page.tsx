import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Доставка и контакты — Статус",
  description: "Доставка по России и контакты магазина Статус.",
};

export default function DeliveryContactsPage() {
  return (
    <div className="container mx-auto px-4 page-content-top pb-16 max-w-3xl">
      <h1
        className="text-3xl font-black uppercase text-[#f0ece4] mb-8"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Доставка и контакты
      </h1>
      <section className="mb-10">
        <h2
          className="text-lg font-bold uppercase text-[#7a9e52] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Доставка
        </h2>
        <p className="text-[#9a8f80] leading-relaxed">
          Отправка СДЭК, Почтой России и другими службами по выбору при
          оформлении. Сроки и стоимость рассчитываются индивидуально.
        </p>
      </section>
      <section>
        <h2
          className="text-lg font-bold uppercase text-[#7a9e52] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Контакты
        </h2>
        <p className="text-[#9a8f80] leading-relaxed">
          Екатеринбург. Подробные телефон и e-mail будут указаны на этапе
          запуска магазина.
        </p>
      </section>
    </div>
  );
}
