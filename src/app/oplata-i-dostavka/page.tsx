import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оплата и доставка — Статус",
  description:
    "Способы оплаты, сроки отправки и условия доставки амуниции и снаряжения в интернет-магазине Статус.",
};

export default function PaymentDeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-24">
      <header className="mb-14 md:mb-16">
        <p
          className="text-xs uppercase tracking-[0.25em] text-[#7a9e52] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Покупателям
        </p>
        <h1
          className="text-3xl md:text-4xl font-black uppercase text-[#f0ece4] mb-6 leading-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Оплата и доставка
        </h1>
        <p className="text-[#9a8f80] leading-relaxed text-base md:text-lg max-w-3xl">
          Здесь собрана общая информация о том, как можно оплатить заказ и как
          мы отправляем жилеты, подсумки и снаряжение. Конкретные суммы, сроки и
          доступные способы оплаты всегда показываются при оформлении заказа —
          они зависят от состава корзины и выбранного способа получения.
        </p>
      </header>

      <div className="space-y-16 md:space-y-20">
        <section aria-labelledby="payment-heading">
          <h2
            id="payment-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Оплата
          </h2>

          <div className="space-y-10">
            <div className="space-y-4 text-[#9a8f80] leading-relaxed">
              <p>
                Мы поддерживаем несколько привычных способов оплаты, чтобы вы
                могли выбрать удобный вариант после того, как состав заказа уже
                известен и рассчитана стоимость доставки (если она применима).
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-lg border border-[#2a2a2a] bg-[#111]/80 p-6 md:p-8 space-y-4">
                <h3
                  className="text-sm font-bold uppercase tracking-wider text-[#7a9e52]"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Онлайн при оформлении
                </h3>
                <p className="text-[#9a8f80] leading-relaxed text-sm md:text-base">
                  Оплата банковской картой Visa или Mastercard через защищённый
                  платёжный модуль. Данные карты обрабатываются по стандартам
                  безопасности; на нашей стороне они не хранятся.
                </p>
                <p className="text-[#6b6055] text-sm leading-relaxed">
                  После успешной оплаты заказ передаётся в обработку; статус
                  можно отслеживать в личном кабинете или по письму с номером
                  заказа.
                </p>
              </div>

              <div className="rounded-lg border border-[#2a2a2a] bg-[#111]/80 p-6 md:p-8 space-y-4">
                <h3
                  className="text-sm font-bold uppercase tracking-wider text-[#7a9e52]"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  СБП и перевод
                </h3>
                <p className="text-[#9a8f80] leading-relaxed text-sm md:text-base">
                  Оплата по Системе быстрых платежей (QR или в приложении банка)
                  — удобно с телефона. Для юрлиц и ИП при необходимости выставляем
                  счёт и передаём реквизиты после согласования заказа.
                </p>
                <p className="text-[#6b6055] text-sm leading-relaxed">
                  Реквизиты для безналичного перевода на расчётный счёт
                  дублируем в письме с подтверждением заказа.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-[#9a8f80] leading-relaxed">
              <h3
                className="text-base font-semibold uppercase tracking-wide text-[#c8c0b4]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Наличные и при получении
              </h3>
              <p>
                Наличный расчёт или оплата картой при вручении возможны там, где
                это предусмотрено выбранным способом доставки и пунктом выдачи.
                При курьерской доставке уточняйте возможность оплаты при
                получении на этапе оформления — она зависит от региона и службы.
              </p>
            </div>

            <aside
              className="rounded-lg border border-[#5c7a3e]/40 bg-[#5c7a3e]/10 px-6 py-5 md:px-8 md:py-6"
              aria-label="Важная информация об оплате"
            >
              <p className="text-xs uppercase tracking-widest text-[#7a9e52] mb-2 font-semibold">
                Обратите внимание
              </p>
              <p className="text-[#c8c0b4] leading-relaxed text-sm md:text-base">
                Итоговая сумма к оплате, комиссии (если есть) и срок действия
                ссылки на оплату фиксируются в заказе. Если нужна отсрочка или
                нестандартный способ оплаты — напишите нам до оплаты, мы
                подскажем, как оформить.
              </p>
            </aside>
          </div>
        </section>

        <section aria-labelledby="delivery-heading">
          <h2
            id="delivery-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Доставка
          </h2>

          <div className="space-y-10">
            <p className="text-[#9a8f80] leading-relaxed text-base md:text-lg max-w-3xl">
              Отправляем заказы по России и в отдельные регионы через
              проверенные службы: курьером до двери, в пункты выдачи и отделения
              почты. Выбор перевозчика и тарифа делается при оформлении — так вы
              сразу видите ориентировочные сроки и стоимость.
            </p>

            <ul className="space-y-6 text-[#9a8f80] leading-relaxed">
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <div>
                  <strong className="text-[#c8c0b4] font-semibold block mb-1">
                    Курьер и ПВЗ
                  </strong>
                  Транспортные компании (например, СДЭК и аналоги) — доставка до
                  пункта выдачи или курьером по адресу. Сроки обычно от нескольких
                  дней; для отдалённых регионов могут быть дольше.
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <div>
                  <strong className="text-[#c8c0b4] font-semibold block mb-1">
                    Почта России
                  </strong>
                  Удобно для небольших отправлений и когда важен широкий охват
                  населённых пунктов. Сроки и тарифы зависят от веса, габаритов и
                  удалённости.
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <div>
                  <strong className="text-[#c8c0b4] font-semibold block mb-1">
                    Упаковка и вес
                  </strong>
                  Жилеты и объёмное снаряжение упаковываем надёжно, чтобы дорога
                  не повредила фурнитуру и ткань. Если заказ состоит из
                  нескольких позиций, отправка может идти одной или несколькими
                  местами — это отразится в расчёте.
                </div>
              </li>
            </ul>

            <div className="space-y-4 text-[#9a8f80] leading-relaxed border-t border-[#2a2a2a] pt-10">
              <h3
                className="text-base font-semibold uppercase tracking-wide text-[#c8c0b4]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Сроки и отслеживание
              </h3>
              <p>
                После передачи заказа в службу доставки вы получите трек-номер
                там, где он предусмотрен перевозчиком. Сроки на сайте носят
                ориентировочный характер: на них влияют загрузка службы, погода и
                удалённость региона. При задержках со стороны перевозчика
                поможем уточнить статус по номеру отправления.
              </p>
              <p className="text-sm text-[#6b6055] leading-relaxed">
                Самовывоз или иные особые условия, если появятся, будут указаны в
                разделе оформления заказа и в письме с подтверждением.
              </p>
            </div>
          </div>
        </section>

        <footer className="pt-8 border-t border-[#2a2a2a] text-center md:text-left">
          <p className="text-[#6b6055] text-sm leading-relaxed max-w-2xl">
            Остались вопросы по оплате или доставке? Напишите или позвоните —
            контакты указаны на странице «Контакты». Мы поможем подобрать удобный
            способ получения заказа до оплаты.
          </p>
        </footer>
      </div>
    </div>
  );
}
