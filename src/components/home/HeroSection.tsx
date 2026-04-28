import Link from "next/link";
import HeroStats from "./HeroStats";
import HeroHeading from "./HeroHeading";

export default function HeroSection() {
  return (
    <section className="relative min-h-dvh flex items-end overflow-hidden">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1920&q=80')",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/90" />

      {/* Camo tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1a2510]/50 via-transparent to-[#0a0a0a]/20" />

      {/* Vertical accent line */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#5c7a3e]/40 to-transparent hidden lg:block" />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-hero-safe pb-[max(4rem,calc(3rem+env(safe-area-inset-bottom,0px)))] sm:pb-20"
      >
        <div className="max-w-3xl">
          {/* Badge + main heading (badge скрыт на втором слайде) */}
          <HeroHeading />

          <div className="max-w-xl mb-10 space-y-3">
            <p className="text-base md:text-lg text-[#a89f90] leading-relaxed font-light">
              Жилеты, подсумки и снаряжение.
            </p>
            <p
              className="text-base md:text-lg font-semibold text-[#7a9e52] leading-relaxed tracking-wide"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              Разработано для реальных условий.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-[#5c7a3e] hover:bg-[#6d8f4a] border border-[#5c7a3e] text-[#f0ece4] px-8 py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-200"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              В каталог
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border border-[#3a3a3a] hover:border-[#5c7a3e] text-[#a89f90] hover:text-[#f0ece4] px-8 py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-200"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              О производстве
            </Link>
          </div>

          {/* Stats */}
          <HeroStats />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2">
        <span className="text-[9px] uppercase tracking-[0.3em] text-[#5c7a3e] rotate-90 origin-center translate-x-4">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#5c7a3e] to-transparent" />
      </div>
    </section>
  );
}
