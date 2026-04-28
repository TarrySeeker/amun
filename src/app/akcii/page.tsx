import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Акции и специальные предложения — Статус",
  description:
    "Акции, скидки и сезонные предложения в интернет-магазине охотничьей амуниции Статус. Как узнавать о распродажах первыми.",
};

export default function PromotionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-24">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Акции" },
        ]}
      />

      <header className="mb-14 md:mb-16">
        <p
          className="text-xs uppercase tracking-[0.25em] text-[#7a9e52] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Специальные предложения
        </p>
        <h1
          className="text-3xl md:text-4xl font-black uppercase text-[#f0ece4] mb-6 leading-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Акции
        </h1>
        <p className="text-[#9a8f80] leading-relaxed text-base md:text-lg max-w-3xl">
          В этом разделе мы соберём действующие скидки, сезонные распродажи и
          подарочные промокоды к праздникам. Страница заполняется по мере запуска
          маркетинговых активностей — следите за обновлениями, чтобы не
          пропускать выгодные условия на жилеты, подсумки и снаряжение бренда
          Статус.
        </p>
      </header>

      <div className="space-y-16 md:space-y-20">
        <section aria-labelledby="promo-what-heading">
          <h2
            id="promo-what-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Что будет в разделе «Акции»
          </h2>
          <div className="space-y-5 text-[#9a8f80] leading-relaxed text-base">
            <p>
              Интернет-магазин «Статус» специализируется на охотничьей амуниции,
              произведённой на Урале. Акции — это возможность приобрести
              проверенные модели со снижением цены без ущерба для качества: мы не
              демпингуем ради галочки, а временно смягчаем ценник на позиции,
              где накопились остатки размеров, или на отдельные линии в честь
              сезона открытия охоты, Нового года или годовщины бренда.
            </p>
            <p>
              Здесь появятся карточки акций с чёткими датами начала и окончания,
              условиями распространения (работает ли промокод на весь каталог
              только на категорию «одежда», совмещается ли скидка с доставкой и
              т. д.) и ссылкой в каталог. Мы будет стремиться описывать всё простым
              языком, без звёздочек на двух страницах мелкого текста — если ограничения
              есть, они попадут в блок «Важные условия» прямо на странице акции.
            </p>
          </div>
        </section>

        <section aria-labelledby="promo-how-heading">
          <h2
            id="promo-how-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Как не пропустить акцию
          </h2>
          <div className="space-y-5 text-[#9a8f80] leading-relaxed">
            <ul className="space-y-5">
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <div>
                  <strong className="text-[#c8c0b4] font-semibold block mb-1">
                    Заходите в раздел «Акции»
                  </strong>
                  Достаточно открыть эту страницу из второй строки меню сайта или
                  сохранить адрес в закладки — список предложений обновится, как
                  только появятся активные акции или распродажа по бейджу
                  «Распродажа» на карточках товаров.
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <div>
                  <strong className="text-[#c8c0b4] font-semibold block mb-1">
                    Следите за каталогом и бейджами
                  </strong>
                  Выгода может быть оформлена не только отдельной страницей, но и
                  меткой «Распродажа», «Спеццена» на карточке — фильтры в каталоге
                  позволят отобрать товары с такими статусами, когда они появятся в
                  системе магазина.
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <div>
                  <strong className="text-[#c8c0b4] font-semibold block mb-1">
                    Консультируйтесь перед оформлением крупного заказа
                  </strong>
                  Если планируете закупиться к сезону несколькими позициями, после
                  появления контактной линии можно будет уточнить через раздел{' '}
                  <Link href="/kontakty" className="text-[#7a9e52] underline-offset-2 hover:underline">
                    Контакты
                  </Link>
                  , действуют ли на выбранные товары отложенная доставка и совместимо
                  ли это с промокодом — мы подскажем по правилам, действующим на момент
                  обращения.
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="promo-scope-heading">
          <h2
            id="promo-scope-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Какими бывают спецусловия
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-[#2a2a2a] bg-[#111]/80 p-6 md:p-7 space-y-3">
              <h3
                className="text-sm font-bold uppercase tracking-wider text-[#7a9e52]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Скидка на корзину
              </h3>
              <p className="text-[#9a8f80] text-sm md:text-[15px] leading-relaxed">
                Промокод может уменьшать сумму заказа на процент или фиксированную
                величину в пределах заданных лимитов — такие параметры продублируем
                в описании каждой будущей акции.
              </p>
            </div>
            <div className="rounded-lg border border-[#2a2a2a] bg-[#111]/80 p-6 md:p-7 space-y-3">
              <h3
                className="text-sm font-bold uppercase tracking-wider text-[#7a9e52]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Сезонная распродажа
              </h3>
              <p className="text-[#9a8f80] text-sm md:text-[15px] leading-relaxed">
                Ликвидация остатков по размерам или смене коллекции — удобный момент
                взять «броню», подсумки или ремень без ожидания следующей коллекции.
              </p>
            </div>
            <div className="rounded-lg border border-[#2a2a2a] bg-[#111]/80 p-6 md:p-7 space-y-3 sm:col-span-2">
              <h3
                className="text-sm font-bold uppercase tracking-wider text-[#7a9e52]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Бонусы постоянным клиентам
              </h3>
              <p className="text-[#9a8f80] text-sm md:text-[15px] leading-relaxed">
                Когда заработает связка аккаунт — заказы, несложнее будет выстроить и
                отдельные предложения для тех, кто уже покупал у нас. Пока
                раздел содержит эту дорожную карту без привязки к конкретным датам;
                фактический запуск промоактивности мы объявим на сайте дополнительно.
              </p>
            </div>
          </div>
        </section>

        <aside
          className="rounded-lg border border-[#5c7a3e]/40 bg-[#5c7a3e]/10 px-6 py-6 md:px-8 md:py-7"
          aria-label="Обратите внимание"
        >
          <p className="text-xs uppercase tracking-widest text-[#7a9e52] mb-3 font-semibold">
            Обратите внимание
          </p>
          <p className="text-[#c8c0b4] leading-relaxed text-sm md:text-base">
            Акционные условия не имеют обратной силы: заказ оформленный до объявления
            акции остаётся по ценам и правилам, действовавшим на момент оплаты. При
            появлении первых акций здесь же появятся прямые ссылки на товары и
            срок действия каждого предложения — без скрытых продлений после окончания
            указанной даты.
          </p>
        </aside>

        <footer className="pt-8 border-t border-[#2a2a2a] flex flex-col sm:flex-row flex-wrap gap-4">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-sm uppercase tracking-widest font-semibold transition-colors rounded-sm"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Перейти в каталог
            <svg
              className="w-4 h-4 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/oplata-i-dostavka"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-[#2a2a2a] text-[#9a8f80] hover:text-[#f0ece4] hover:border-[#5c7a3e] text-sm uppercase tracking-widest font-semibold transition-colors rounded-sm"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Оплата и доставка
          </Link>
        </footer>
      </div>
    </div>
  );
}
