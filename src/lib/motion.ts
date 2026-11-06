import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Motion system.
 * - `reveal`: things entering (expo-out, ~1s)
 * - `camera`: things being moved through (power3 in-out)
 * - scrubbed tweens are always linear ("none"): the scroll is the easing.
 */
export const EASE = {
  reveal: "expo.out",
  camera: "power3.inOut",
  exit: "power2.in",
} as const;

export const DUR = { micro: 0.18, short: 0.45, base: 0.8, long: 1.2 } as const;

/** Breakpoint conditions shared by every gsap.matchMedia() call. */
export const MQ = {
  desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 899.98px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(MQ.reduce).matches;

export { gsap, ScrollTrigger, useGSAP };
