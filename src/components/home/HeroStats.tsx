"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  target: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { target: 10, suffix: "+", label: "Лет опыта" },
  { target: 200, suffix: "+", label: "Позиций товаров" },
  { target: 3000, suffix: "+", label: "Довольных охотников" },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return count;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCountUp(stat.target, 1800, active);

  const formatted =
    stat.target >= 1000
      ? count.toLocaleString("ru-RU")
      : count.toString();

  return (
    <div>
      <span
        className="block text-3xl font-black text-[#7a9e52]"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        {formatted}
        {stat.suffix}
      </span>
      <span className="text-xs uppercase tracking-wider text-[#6b6055]">
        {stat.label}
      </span>
    </div>
  );
}

export default function HeroStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-wrap gap-x-8 gap-y-6 sm:gap-8 mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[#2a2a2a]/60"
    >
      {stats.map((stat) => (
        <StatItem key={stat.label} stat={stat} active={active} />
      ))}
    </div>
  );
}
