import { useEffect, useRef, useState } from "react";
import { workscapeModules } from "../../content/projects";
import { ui } from "../../content/ui";
import { useI18n } from "../../lib/i18n";
import { EASE, gsap, prefersReducedMotion } from "../../lib/motion";
import { shot } from "./camera";
import { WorkscapeScreen } from "./WorkscapeScreen";
import "./WorkscapeDemo.css";

/** Case-study version of the schematic: pick a module and the camera frames it. */
export function WorkscapeDemo() {
  const { t } = useI18n();
  const stage = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const size = () => ({ w: stage.current!.clientWidth, h: stage.current!.clientHeight });
    const frame = () => shot(active, size(), { fill: 0.82 });
    gsap.to(screen.current, { ...frame(), duration: prefersReducedMotion() ? 0 : 1, ease: EASE.camera, overwrite: true });
    const ro = new ResizeObserver(() => gsap.set(screen.current, frame()));
    ro.observe(stage.current!);
    return () => ro.disconnect();
  }, [active]);

  const current = workscapeModules.find((m) => m.id === active);

  return (
    <div className="ws-demo">
      <div ref={stage} className="ws-demo__stage">
        <WorkscapeScreen ref={screen} active={active} />
      </div>
      <div className="ws-demo__controls">
        <div className="ws-demo__buttons" role="group" aria-label={t(ui.workscape.explore)}>
          <button type="button" aria-pressed={active === null} onClick={() => setActive(null)}>
            {t(ui.workscape.overview)}
          </button>
          {workscapeModules.map((m) => (
            <button key={m.id} type="button" aria-pressed={active === m.id} onClick={() => setActive(m.id)}>
              {t(m.title)}
            </button>
          ))}
        </div>
        <p className="ws-demo__caption" aria-live="polite">
          {current ? t(current.body) : t(ui.workscape.schematic)}
        </p>
      </div>
    </div>
  );
}
