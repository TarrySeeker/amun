"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Плавное появление блока при появлении в зоне видимости при скролле.
 */
export default function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window.matchMedia === "function") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq.matches) {
        setInView(true);
        return;
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "will-change-[opacity,transform]",
        "transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "motion-reduce:transition-none motion-reduce:duration-0",
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 sm:translate-y-12 motion-reduce:opacity-100 motion-reduce:translate-y-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
