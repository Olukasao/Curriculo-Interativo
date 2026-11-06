import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";
import type { Shape } from "./pointCloud";

/**
 * Loads three.js only when the section is about to be seen. If WebGL is unavailable
 * the canvas simply stays empty; the skills list next to it carries the content.
 */
export function PointCloudCanvas({ shape }: { shape: Shape }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const cloud = useRef<Awaited<ReturnType<typeof load>> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = canvas.current!;
    let disposed = false;
    let ro: ResizeObserver | undefined;
    let visIO: IntersectionObserver | undefined;

    const nearIO = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || cloud.current) return;
        nearIO.disconnect();
        try {
          const c = await load(el);
          if (disposed) return c.dispose();
          cloud.current = c;
          c.setShape(shape);
          ro = new ResizeObserver(() => c.resize());
          ro.observe(el);
          visIO = new IntersectionObserver(([e]) => c.setVisible(e.isIntersecting));
          visIO.observe(el);
        } catch {
          setFailed(true);
        }
      },
      { rootMargin: "400px 0px" },
    );
    nearIO.observe(el);

    const onMove = (e: PointerEvent) => {
      cloud.current?.setPointer((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      disposed = true;
      nearIO.disconnect();
      ro?.disconnect();
      visIO?.disconnect();
      window.removeEventListener("pointermove", onMove);
      cloud.current?.dispose();
      cloud.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    cloud.current?.setShape(shape);
  }, [shape]);

  if (failed) return null;
  return <canvas ref={canvas} className="pc-canvas" aria-hidden="true" />;
}

async function load(canvas: HTMLCanvasElement) {
  const { createPointCloud } = await import("./pointCloud");
  const small = matchMedia("(max-width: 899.98px)").matches;
  return createPointCloud(canvas, { count: small ? 1400 : 2400, animate: !prefersReducedMotion() });
}
