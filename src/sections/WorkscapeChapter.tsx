import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { shot } from "../components/workscape/camera";
import { WorkscapeScreen } from "../components/workscape/WorkscapeScreen";
import { projectBySlug, workscapeModules } from "../content/projects";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, MQ, useGSAP } from "../lib/motion";
import "./WorkscapeChapter.css";

const project = projectBySlug("workscape")!;

/**
 * Desktop: pinned. The interface floats tilted in the dark, the camera levels it,
 * then travels module by module while the caption follows.
 * Mobile / reduced motion: the screen stays docked at the top and highlights
 * each module as its description scrolls past.
 */
export function WorkscapeChapter() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const size = () => ({ w: stage.current!.clientWidth, h: stage.current!.clientHeight });

      mm.add(MQ.desktop, () => {
        const opts = { focusX: 0.62, fill: 0.66 };
        const overview = () => shot(null, size(), { focusX: 0.67, overviewWidth: 0.62 });
        gsap.set(tilt.current, { transformPerspective: 1600, rotationX: 52, rotationZ: -16, yPercent: 12, scale: 0.9 });
        gsap.set(screen.current, overview());
        gsap.set(".ws-caption__intro", { autoAlpha: 0, y: 20 });

        const tl = gsap.timeline({
          defaults: { ease: EASE.camera },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${innerHeight * (workscapeModules.length + 1) * 0.9}`,
            pin: ".ws-chapter__pin",
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: () => {
              const now = tl.time();
              let id: string | null = null;
              for (const m of workscapeModules) if (now >= tl.labels[m.id] - 0.35) id = m.id;
              setActive((prev) => (prev === id ? prev : id));
            },
          },
        });

        tl.to(tilt.current, { rotationX: 0, rotationZ: 0, yPercent: 0, scale: 1, duration: 1.2 })
          .to(".ws-caption__intro", { autoAlpha: 1, y: 0, duration: 0.6 }, 0.2)
          .to({}, { duration: 0.3 });

        for (const m of workscapeModules) {
          const frame = () => shot(m.id, size(), opts);
          tl.addLabel(m.id)
            .to(screen.current, { x: () => frame().x, y: () => frame().y, scale: () => frame().scale, duration: 1 })
            .to({}, { duration: 0.6 });
        }
        tl.addLabel("out").to(screen.current, { x: () => overview().x, y: () => overview().y, scale: () => overview().scale, duration: 1 });

        return () => setActive(null);
      });

      mm.add(`${MQ.mobile}, ${MQ.reduce}`, () => {
        const fit = () => gsap.set(screen.current, shot(null, size(), { focusX: 0.5 }));
        fit();
        const ro = new ResizeObserver(fit);
        ro.observe(stage.current!);
        return () => ro.disconnect();
      });
    },
    { scope: root },
  );

  // Docked layout: the module in the middle of the viewport is the active one.
  useEffect(() => {
    const mq = window.matchMedia(MQ.desktop);
    if (mq.matches) return;
    const items = root.current?.querySelectorAll<HTMLElement>(".ws-step");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.getAttribute("data-id"));
      },
      { rootMargin: "-55% 0px -40% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const index = active ? workscapeModules.findIndex((m) => m.id === active) + 1 : 0;

  return (
    <section ref={root} id="workscape" className="ws-chapter section" aria-labelledby="ws-title">
      <div className="ws-chapter__pin">
        <div ref={stage} className="ws-stage">
          <div ref={tilt} className="ws-tilt">
            <WorkscapeScreen ref={screen} active={active} />
          </div>
        </div>

        <div className="ws-caption wrap">
          <div className="ws-caption__intro">
            <p className="label">
              {project.index} / {t(project.category)}
            </p>
            <h2 id="ws-title" className="ws-caption__title display">
              {project.title}
            </h2>
            <p className="ws-caption__line">{t(project.line)}</p>
          </div>

          <ol className="ws-steps" aria-label={t(ui.workscape.explore)}>
            {workscapeModules.map((m) => (
              <li key={m.id} data-id={m.id} className={`ws-step${active === m.id ? " is-active" : ""}`}>
                <h3 className="ws-step__title">{t(m.title)}</h3>
                <p className="ws-step__body">{t(m.body)}</p>
              </li>
            ))}
          </ol>

          <div className="ws-caption__foot">
            <p className="ws-caption__count" aria-hidden="true">
              {String(index).padStart(2, "0")} / {String(workscapeModules.length).padStart(2, "0")}
            </p>
            <Link to="/work/workscape/live" className="btn btn--solid">
              {t(ui.workscape.liveCta)}
            </Link>
            <Link to="/work/workscape" className="btn">
              {t(ui.work.caseStudy)}
            </Link>
          </div>
        </div>

        <p className="ws-note">{t(ui.workscape.schematic)}</p>
      </div>
    </section>
  );
}
