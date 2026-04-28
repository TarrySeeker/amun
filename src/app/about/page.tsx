import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "О производстве — Статус",
  description:
    "Как мы делаем охотничью амуницию на Урале: производство, материалы и подход бренда Статус.",
};

export default function AboutProductionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-24">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "О производстве" },
        ]}
      />

      <header className="mb-14 md:mb-16">
        <p
          className="text-xs uppercase tracking-[0.25em] text-[#7a9e52] mb-3"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Сделано на Урале
        </p>
        <h1
          className="text-3xl md:text-4xl font-black uppercase text-[#f0ece4] mb-6 leading-tight"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          О производстве
        </h1>
        <p className="text-[#9a8f80] leading-relaxed text-base md:text-lg max-w-3xl">
          «Статус» — это охотничья амуниция и снаряжение, которые проектируют и
          собирают в Екатеринбурге. Мы ориентируемся на практику в поле, а не на
          модные тренды: жилеты, подсумки и аксессуары должны выдерживать
          нагрузку, влагу и долгие переходы.
        </p>
      </header>

      <div className="space-y-16 md:space-y-20">
        <section aria-labelledby="about-place-heading">
          <h2
            id="about-place-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Где и как мы работаем
          </h2>
          <div className="space-y-5 text-[#9a8f80] leading-relaxed text-base">
            <p>
              Производство базируется в Екатеринбурге: здесь же проходит
              прототипирование, раскрой и контроль сборки. Конфигурацию
              разгрузочных систем и креплений мы уточняем по отзывам охотников и
              после тестов в реальных условиях — снег, грязь, дождь и многодневные
              выезды не те ситуации, где можно экономить на фурнитуре или кромке
              ткани.
            </p>
            <p>
              Отдельное внимание уделяется посадке жилетов и регулировке лямок:
              неудачная посадка в лесу ощущается с первого километра. Поэтому мы
              стараемся давать понятную размерную сетку и рекомендации по
              примерке на страницах товаров — и при этом оставаться на связи
              через поддержку, если нужно подобрать именно ваш вариант.
            </p>
          </div>
        </section>

        <section aria-labelledby="about-materials-heading">
          <h2
            id="about-materials-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Материалы и качество
          </h2>
          <div className="space-y-5 text-[#9a8f80] leading-relaxed">
            <p>
              Мы закупаем ткани и комплектующие с запасом по прочности: швы,
              усиление в зонах трения, проверенная фурнитура. Цвет и камуфляж
              подбираются так, чтобы изделие служило несколько сезонов, а не один
              рейтузник «на фото для сайта».
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <span>
                  <strong className="text-[#c8c0b4] font-semibold">Ткань</strong>
                  — основа долговечности: устойчивость к сырости и истиранию, аккуратная
                  распошивка на деталях, где нагрузка максимальна.
                </span>
              </li>
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <span>
                  <strong className="text-[#c8c0b4] font-semibold">Фурнитура</strong>
                  — молнии, пряжки, стропы проверяем на многократный цикл; слабое
                  звено лучше отловить в цеху, чем на охоте.
                </span>
              </li>
              <li className="flex gap-4">
                <span
                  className="shrink-0 w-1.5 rounded-full bg-[#5c7a3e] mt-2"
                  aria-hidden
                />
                <span>
                  <strong className="text-[#c8c0b4] font-semibold">Контроль</strong>
                  — финальный осмотр перед отправкой: швы, бирки, комплектация.
                  Если брак всё же проскочил, разберём случай через поддержку —
                  контакты в разделе «Контакты».
                </span>
              </li>
            </ul>
          </div>
        </section>

        <section aria-labelledby="about-brand-heading">
          <h2
            id="about-brand-heading"
            className="text-xl md:text-2xl font-bold uppercase text-[#f0ece4] mb-6 md:mb-8 pb-3 border-b border-[#2a2a2a]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            Бренд «Статус»
          </h2>
          <p className="text-[#9a8f80] leading-relaxed mb-5">
            Название отражает идею: снаряжение должно соответствовать статусу
            человека, который серьёзно относится к охоте и времени на природе. Мы
            не распыляемся на десять линейек «ради охвата» — развиваем узнаваемые
            модели и дорабатываем их от сезона к сезону.
          </p>
          <p className="text-[#6b6055] text-sm leading-relaxed">
            Если хотите заглянуть в ассортимент — начните с каталога: там есть и
            хиты продаж с бейджами, и аккуратное описание характеристик по каждой
            позиции.
          </p>
        </section>

        <aside
          className="rounded-lg border border-[#5c7a3e]/40 bg-[#5c7a3e]/10 px-6 py-5 md:px-8 md:py-6"
          aria-label="Дополнительно"
        >
          <p className="text-xs uppercase tracking-widest text-[#7a9e52] mb-2 font-semibold">
            Полезное на сайте
          </p>
          <p className="text-[#c8c0b4] leading-relaxed text-sm md:text-base">
            Условия оплаты и доставки — в разделе{" "}
            <Link
              href="/oplata-i-dostavka"
              className="text-[#7a9e52] underline-offset-2 hover:underline"
            >
              Оплата и доставка
            </Link>
            . Вопросы по наличию и размерам — через{" "}
            <Link
              href="/kontakty"
              className="text-[#7a9e52] underline-offset-2 hover:underline"
            >
              Контакты
            </Link>
            .
          </p>
        </aside>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white text-sm uppercase tracking-widest font-semibold transition-colors rounded-sm"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            В каталог
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-8 py-3.5 border border-[#2a2a2a] text-[#9a8f80] hover:text-[#f0ece4] hover:border-[#5c7a3e] text-sm uppercase tracking-widest font-semibold transition-colors rounded-sm"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
