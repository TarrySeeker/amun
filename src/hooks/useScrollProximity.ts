"use client";

import {
  type RefObject,
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

/**
 * От 0 (вне акцентной зоны) до 1 (ближе к центру вьюпорта по вертикали).
 * При prefers-reduced-motion — без пересчёта по скроллу, только IntersectionObserver.
 */
function subscribeReduced(cb: () => void) {
  const mq =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  mq?.addEventListener("change", cb);
  return () => mq?.removeEventListener("change", cb);
}

function reducedMotionSnap(): boolean {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReduced, reducedMotionSnap, () => false);
}

export function useScrollProximity(elRef: RefObject<HTMLElement | null>) {
  const [ratio, setRatio] = useState(0);
  const reduced = usePrefersReducedMotion();

  const measure = useCallback(() => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const centerY = rect.top + rect.height / 2;
    const viewportCenter = vh * 0.45;
    const band = Math.max(vh * 0.52, rect.height + 80);
    const dist = Math.abs(centerY - viewportCenter);
    const linear = Math.max(0, Math.min(1, 1 - dist / band));
    const eased = linear * linear * (3 - 2 * linear);
    setRatio(eased);
  }, [elRef]);

  useEffect(() => {
    if (reduced) {
      const el = elRef.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) =>
          setRatio(
            Math.max(
              0,
              Math.min(1, e.intersectionRatio * 1.15 + (e.isIntersecting ? 0.05 : 0))
            )
          ),
        {
          threshold: [0, 0.06, 0.12, 0.22, 0.35, 0.48, 0.62, 0.76, 0.88, 1],
          rootMargin: "-8% 0px -8% 0px",
        }
      );
      io.observe(el);
      return () => io.disconnect();
    }

    let rafId = 0;
    const tick = () => {
      rafId = 0;
      measure();
    };
    const onScrollResize = () => {
      if (rafId !== 0) return;
      rafId = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [measure, reduced, elRef]);

  return ratio;
}
