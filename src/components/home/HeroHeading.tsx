"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    line1: "Профессиональная",
    line2: "охотничья амуниция.",
  },
  {
    line1: "Снаряжён —",
    line2: "значит готов.",
  },
];

const VISIBLE_MS = 3200;
const FADE_MS = 600;

export default function HeroHeading() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = () => {
      // fade out
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % slides.length);
        // fade in
        setVisible(true);
      }, FADE_MS);
    };

    const timer = setInterval(cycle, VISIBLE_MS + FADE_MS);
    return () => clearInterval(timer);
  }, []);

  const { line1, line2 } = slides[index];
  const showBadge = index === 0 && visible;

  return (
    <>
      <div
        className="inline-flex items-center gap-2 overflow-hidden"
        style={{
          opacity: showBadge ? 1 : 0,
          maxHeight: showBadge ? 48 : 0,
          marginBottom: showBadge ? 24 : 0,
          transition: `opacity ${FADE_MS}ms ease-in-out, max-height ${FADE_MS}ms ease-in-out, margin-bottom ${FADE_MS}ms ease-in-out`,
          pointerEvents: showBadge ? "auto" : "none",
        }}
        aria-hidden={!showBadge}
      >
        <span className="w-6 h-px bg-[#5c7a3e]" />
        <span
          className="text-xs uppercase tracking-[0.3em] text-[#7a9e52] font-medium"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          Сделано на Урале
        </span>
      </div>

      <h1
        className="text-4xl min-[400px]:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.95] text-[#f0ece4] mb-4"
        style={{
          fontFamily: "var(--font-oswald)",
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
        }}
      >
        {line1}
        <br />
        <span className="text-[#7a9e52]">{line2}</span>
      </h1>
    </>
  );
}
