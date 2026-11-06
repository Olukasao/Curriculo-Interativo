import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";
import "./Compare.css";

type Props = {
  before: string;
  after: string;
  ratio: number;
  beforeLabel: string;
  afterLabel: string;
  label: string;
  alt: string;
};

/**
 * Before/after slider. The divider is the site's selection device: a hairline with an
 * inverted handle. A native range input sits on top, so drag, touch and arrow keys
 * all work without custom pointer code. On first view the line sweeps once as a hint.
 */
export function Compare({ before, after, ratio, beforeLabel, afterLabel, label, alt }: Props) {
  const [pos, setPos] = useState(50);
  const root = useRef<HTMLDivElement>(null);
  const hinted = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || hinted.current) return;
        hinted.current = true;
        io.disconnect();
        // 50 → 82 → 50 over ~1.6 s
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          setPos(50 + Math.sin(t * Math.PI) * 32);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={root} className="compare" style={{ aspectRatio: ratio, "--pos": `${pos}%` } as React.CSSProperties}>
      <img className="compare__img" src={after} alt={alt} decoding="async" />
      <img className="compare__img compare__before" src={before} alt="" aria-hidden="true" decoding="async" />
      <span className="compare__tag compare__tag--before" aria-hidden="true">
        {beforeLabel}
      </span>
      <span className="compare__tag compare__tag--after" aria-hidden="true">
        {afterLabel}
      </span>
      <span className="compare__line" aria-hidden="true">
        <span className="compare__handle">
          <svg viewBox="0 0 24 12" width="22" height="11" aria-hidden="true">
            <path d="M7 1 2 6l5 5M17 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </span>
      </span>
      <input
        className="compare__range"
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        aria-label={label}
        aria-valuetext={`${Math.round(pos)}% ${beforeLabel}`}
        onChange={(e) => setPos(Number(e.target.value))}
      />
    </div>
  );
}
