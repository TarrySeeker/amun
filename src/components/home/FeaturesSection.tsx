import FeaturesInteractiveList from "./FeaturesInteractiveList";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Собственное производство",
    description: "Проектируем и шьём сами — на нашем заводе в Екатеринбурге. Без посредников, без переплат.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Материалы высшего класса",
    description: "Кордура 1000D, YKK-молнии, алюминиевые карабины. Выдержит любые условия охоты.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Доставка по России",
    description: "Отправляем во все регионы. СДЭК, Почта России, самовывоз с нашего склада в Екатеринбурге.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Возврат 30 дней",
    description: "Не подошло — вернём деньги в течение 30 дней. Без вопросов, без бюрократии.",
  },
];

export default function FeaturesSection() {
  return (
    <>
      {/* Features */}
      <section className="relative py-16 sm:py-24 lg:py-36 bg-[#f4f2eb] border-t border-[#e3dfd6]">
        {/* subtle texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.45] bg-[radial-gradient(ellipse_at_30%_0%,rgba(92,122,62,0.06),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(139,115,85,0.05),transparent_45%)]"
        />
        <div className="relative max-w-[90rem] mx-auto px-4 sm:px-8 lg:px-14 xl:px-16">
          <ScrollReveal>
            <header className="mb-14 sm:mb-16 lg:mb-20 max-w-4xl">
              <div className="flex items-center gap-4 mb-5 lg:mb-6">
                <span className="w-12 sm:w-16 h-px bg-[#5c7a3e]" aria-hidden />
                <span
                  className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#4d6834]"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  Преимущества
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-black uppercase tracking-[0.06em] text-[#2a2622] leading-[1.1]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                Почему выбирают «Статус»
              </h2>
            </header>
          </ScrollReveal>
          <FeaturesInteractiveList items={features} />
        </div>
      </section>

      {/* Brand strip */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1472396961693-142e6e269027?w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#5c7a3e]" />
              <span
                className="text-xs uppercase tracking-[0.3em] text-[#5c7a3e]"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                О нас
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-black uppercase text-[#f0ece4] leading-tight mb-6"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Уральская закалка
              <br />
              <span className="text-[#7a9e52]">в каждом шве</span>
            </h2>
            <p className="text-[#9a8f80] text-base leading-relaxed mb-8 max-w-lg">
              С 2015 года мы разрабатываем и производим охотничью амуницию
              в Екатеринбурге. Каждое изделие тестируется в реальных условиях
              сибирской и уральской охоты. Мы знаем, что нужно охотнику, —
              потому что сами охотники.
            </p>
            <a
              href="/about"
              className="inline-flex items-center gap-3 border border-[#5c7a3e] text-[#7a9e52] hover:bg-[#5c7a3e] hover:text-white px-8 py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-200"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Читать историю
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
