import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "./motion";

type Scroller = {
  to: (target: string | HTMLElement | number, opts?: { immediate?: boolean; offset?: number }) => void;
  stop: () => void;
  start: () => void;
};

const Ctx = createContext<Scroller | null>(null);

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger and Lenis share a clock.
 * Disabled for reduced motion; native scrolling is used on touch devices by Lenis itself.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const instance = new Lenis({ lerp: 0.11, wheelMultiplier: 0.9 });
    lenis.current = instance;
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  const api = useRef<Scroller>({
    to(target, opts = {}) {
      const offset = opts.offset ?? 0;
      if (lenis.current) {
        lenis.current.scrollTo(target, { offset, immediate: opts.immediate, duration: 1.4 });
        return;
      }
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (typeof el === "number") window.scrollTo({ top: el + offset });
      else el?.scrollIntoView({ behavior: prefersReducedMotion() || opts.immediate ? "auto" : "smooth" });
    },
    stop: () => lenis.current?.stop(),
    start: () => lenis.current?.start(),
  });

  return <Ctx.Provider value={api.current}>{children}</Ctx.Provider>;
}

export function useScroller() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useScroller outside SmoothScroll");
  return ctx;
}
