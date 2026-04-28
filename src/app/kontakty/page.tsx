import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты — Статус",
  description:
    "Как связаться с интернет-магазином Статус: адрес в Екатеринбурге, режим работы, поддержка по заказам и вопросам по ассортименту.",
};

export default function ContactsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-24">
      <header className="mb-14 md:mb-16">
        <p
          className="text-xs uppercase tracking-[0.25em] text-[#7a9e52] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Связаться с нами
        </p>
        <h1
          className="text-3xl md:text-4xl font-black uppercase text-[#f0ece4] mb-6 leading-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Контакты
        </h1>
        <p className="text-[#9a8f80] leading-relaxed text-base md:text-lg max-w-3xl">
          Мы производим и продаём охотничью амуницию и снаряжение с Урала.
          Ниже собрано, как с нами связаться по вопросам заказа, доставки,
          рекламациям и оптовым закупкам. Точный телефон для дозвона и e-mail
          для писем будут опубликованы к запуску магазина; пока можно
          ориентироваться на форму оформления заказа и разделы сайта.
        </p>
      </header>

      <div className="space-y-16 md:space-y-20">
        <section aria-labelledby="contacts-reach-heading">
          <h2
            id="contacts-reach-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Как с нами связаться
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-lg border border-[#2a2a2a] bg-[#111]/80 p-6 md:p-8 space-y-3">
              <h3
                className="text-sm font-bold uppercase tracking-wider text-[#7a9e52]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Телефон и e-mail
              </h3>
              <p className="text-[#9a8f80] leading-relaxed text-sm md:text-base">
                Отдельная линия для покупателей и общий ящик для писем появятся
                на сайте при открытии приёма заказов в полном объёме. В объявлении
                будут указаны часовой пояс (Екатеринбург, МСК+2) и лучшее время
                для звонка.
              </p>
              <p className="text-[#6b6055] text-sm leading-relaxed">
                Пока магазин в режиме подготовки — следите за блоком новостей на
                главной или оформите тестовый заказ через корзину (если доступно),
                чтобы не потерять связь с вашим запросом.
              </p>
            </div>
            <div className="rounded-lg border border-[#2a2a2a] bg-[#111]/80 p-6 md:p-8 space-y-3">
              <h3
                className="text-sm font-bold uppercase tracking-wider text-[#7a9e52]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Адрес и направление
              </h3>
              <dl className="text-[#9a8f80] text-sm md:text-base leading-relaxed space-y-2">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#6b6055] mb-0.5">
                    Город
                  </dt>
                  <dd>Екатеринбург, Свердловская область</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-[#6b6055] mb-0.5">
                    Производство / офис
                  </dt>
                  <dd>
                    Точный адрес офиса или производства и схема проезда будут
                    добавлены после согласования — пишите в комментарии к заказу,
                    если вам нужен самовывоз или визит по согласованию.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section aria-labelledby="contacts-hours-heading">
          <h2
            id="contacts-hours-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Режим работы и ответы
          </h2>
          <div className="space-y-6 text-[#9a8f80] leading-relaxed">
            <p>
              По рабочим дням мы ориентируемся на время Екатеринбурга. Заявки,
              оставленные через сайт, обрабатываются в порядке очереди: на
              подтверждение заказа, уточнение размеров жилета или комплектации
              подсумков обычно требуется от одного до нескольких рабочих дней в
              зависимости от загрузки.
            </p>
            <p>
              Если вопрос срочный (замена брака, изменение адреса после
              отправки, отмена заказа), постарайтесь указать номер заказа и дату
              оформления — так мы быстрее найдём ваше обращение в системе.
            </p>
          </div>
        </section>

        <section aria-labelledby="contacts-topics-heading">
          <h2
            id="contacts-topics-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            По каким темам писать и звонить
          </h2>
          <ul className="space-y-5 text-[#9a8f80] leading-relaxed">
            <li className="flex gap-4">
              <span
                className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                aria-hidden
              />
              <div>
                <strong className="text-[#c8c0b4] font-semibold block mb-1">
                  Заказ и доставка
                </strong>
                статус оплаты, сроки отправки, трек-номер, смена ПВЗ или адреса,
                вопросы по упаковке крупногабаритных позиций.
              </div>
            </li>
            <li className="flex gap-4">
              <span
                className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                aria-hidden
              />
              <div>
                <strong className="text-[#c8c0b4] font-semibold block mb-1">
                  Товар и подбор
                </strong>
                размеры разгрузочных жилетов, совместимость креплений, наличие
                цветов и материалов — лучше указать рост, обхват или модель, с
                которой сравниваете.
              </div>
            </li>
            <li className="flex gap-4">
              <span
                className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                aria-hidden
              />
              <div>
                <strong className="text-[#c8c0b4] font-semibold block mb-1">
                  Опт и сотрудничество
                </strong>
                если вы представляете клуб, стрелковый тир или магазин —
                кратко опишите объём и город; на этапе запуска условия
                партнёрства могут уточняться отдельно.
              </div>
            </li>
          </ul>
        </section>

        <aside
          className="rounded-lg border border-[#5c7a3e]/40 bg-[#5c7a3e]/10 px-6 py-5 md:px-8 md:py-6"
          aria-label="Важно"
        >
          <p className="text-xs uppercase tracking-widest text-[#7a9e52] mb-2 font-semibold">
            Конфиденциальность
          </p>
          <p className="text-[#c8c0b4] leading-relaxed text-sm md:text-base">
            Не отправляйте в открытом виде полные данные банковских карт и
            пароли. Реквизиты для оплаты мы дублируем только в защищённых
            каналах и в письмах после оформления заказа — как описано в разделе{" "}
            <a
              href="/oplata-i-dostavka"
              className="text-[#7a9e52] underline-offset-2 hover:underline"
            >
              Оплата и доставка
            </a>
            .
          </p>
        </aside>

        <footer className="pt-8 border-t border-[#2a2a2a]">
          <p className="text-[#6b6055] text-sm leading-relaxed max-w-2xl">
            Бренд Статус позиционируется как продукция, сделанная на Урале. Если
            вы не нашли нужного ответа на сайте, загляните в раздел про доставку
            и оплату — там часто уже разобраны сроки и способы получения заказа.
          </p>
        </footer>
      </div>
    </div>
  );
}
