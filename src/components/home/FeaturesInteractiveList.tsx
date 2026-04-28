"use client";

import type { ReactNode } from "react";
import { useMemo, useRef } from "react";
import {
  useScrollProximity,
  usePrefersReducedMotion,
} from "@/hooks/useScrollProximity";

export interface FeatureItem {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeaturesInteractiveListProps {
  items: FeatureItem[];
}

function FeatureCard({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const ratio = useScrollProximity(ref);
  const prefersReducedMotion = usePrefersReducedMotion();

  const accent = ratio > (prefersReducedMotion ? 0.34 : 0.4);

  const { transform, shadow, accentOpacity } = useMemo(() => {
    const sway = index % 2 === 1 ? -1 : 1;
    const ty = (1 - ratio) * 18 + sway * (1 - ratio) * 4;
    const tx = sway * (1 - ratio) * 5;
    return {
      transform: `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) scale(${0.982 + ratio * 0.018})`,
      shadow:
        ratio < 0.08
          ? "0 4px 18px -8px rgba(42, 38, 34, 0.12)"
          : `0 ${10 + ratio * 18}px ${28 + ratio * 24}px -14px rgba(61, 82, 40, ${0.08 + ratio * 0.16}), 0 ${4 + ratio * 8}px ${12}px -6px rgba(42,38,34,${0.05 + ratio * 0.08})`,
      accentOpacity: 0.12 + ratio * 0.88,
    };
  }, [index, ratio]);

  return (
    <article
      ref={ref}
      role="listitem"
      className={[
        "group relative rounded-2xl border px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12",
        prefersReducedMotion ? "" : "will-change-transform",
        accent
          ? "border-[#5c7a3e]/45"
          : "border-[#e3dfd6]/90",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5c7a3e]/60",
      ].join(" ")}
      style={{
        transform,
        transition: prefersReducedMotion
          ? "box-shadow 0.45s ease, background-color 0.45s ease, border-color 0.45s ease"
          : "box-shadow 0.55s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.55s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
        boxShadow: shadow,
        backgroundColor:
          ratio > 0.15
            ? `rgba(244, 242, 235, ${0.35 + ratio * 0.45})`
            : "rgba(244, 242, 235, 0)",
      }}
      tabIndex={0}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-8 bottom-8 w-[3px] rounded-full bg-[#5c7a3e] motion-reduce:transition-colors sm:top-10 sm:bottom-10 ${
          prefersReducedMotion
            ? "transition-opacity duration-300"
            : "transition-opacity duration-[400ms]"
        }`}
        style={{ opacity: accentOpacity }}
      />

      <div className="flex gap-5 sm:gap-6 lg:gap-8">
        <div
          className={[
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-inner transition-all duration-500 ease-out motion-reduce:transition-colors sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]",
            accent
              ? "bg-[#dce9d5] text-[#2f4a24] shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
              : "bg-[#ebe7df] text-[#4d6834]",
            "motion-safe:group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0",
          ].join(" ")}
        >
          <span className="[&_svg]:h-8 [&_svg]:w-8 lg:[&_svg]:h-9 lg:[&_svg]:w-9">
            {feature.icon}
          </span>
        </div>

        <div className="min-w-0 flex-1 pt-0.5">
          <span
            className="block text-xs font-bold tabular-nums tracking-[0.35em] mb-3 lg:mb-4 transition-colors duration-500"
            style={{
              fontFamily: "var(--font-oswald)",
              color: accent ? "#5c7a3e" : "#b5aea3",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="text-xl sm:text-2xl lg:text-[1.65rem] font-black uppercase tracking-[0.08em] mb-4 lg:mb-5 leading-tight transition-colors duration-500"
            style={{
              fontFamily: "var(--font-oswald)",
              color: accent ? "#1a1512" : "#2a2622",
            }}
          >
            {feature.title}
          </h3>
          <p
            className="text-base sm:text-lg lg:text-xl leading-[1.65] transition-colors duration-500"
            style={{
              color: accent ? "#3d3830" : "#5f584d",
            }}
          >
            {feature.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function FeaturesInteractiveList({
  items,
}: FeaturesInteractiveListProps) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-x-20 lg:gap-y-14 xl:gap-x-24"
      role="list"
      aria-label="Преимущества магазина"
    >
      {items.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  );
}
