import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BehanceMosaic } from "../components/BehanceMosaic";
import { Media } from "../components/Media";
import { links } from "../content/profile";
import { projects } from "../content/projects";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, MQ, useGSAP } from "../lib/motion";
import "./WorkIndex.css";

/**
 * The exhibition index: one row per case study. On pointer devices the row's title
 * opens on the width axis and the piece follows the cursor; on touch a thumbnail sits inline.
 */
export function WorkIndex() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const follower = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  // The Behance archive closes the index as one more row, after the case studies.
  const behanceIndex = projects.length;
  const rows = projects.length + (links.behance ? 1 : 0);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".work-row", {
          yPercent: 40,
          autoAlpha: 0,
          duration: 1,
          ease: EASE.reveal,
          stagger: 0.08,
          scrollTrigger: { trigger: ".work-index__list", start: "top 80%" },
        });
      });
      mm.add(MQ.desktop, () => {
        gsap.set(follower.current, { xPercent: -50, yPercent: -50 });
      });
    },
    { scope: root },
  );

  const move = contextSafe((e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !follower.current) return;
    gsap.to(follower.current, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power3.out" });
  });

  return (
    <section ref={root} id="work" className="work-index section wrap" aria-labelledby="work-title" tabIndex={-1}>
      <header className="work-index__head">
        <h2 id="work-title" className="work-index__title display">
          {t(ui.work.heading)}
        </h2>
        <p className="label">{rows.toString().padStart(2, "0")}</p>
      </header>

      <ol className="work-index__list" onPointerMove={move} onPointerLeave={() => setHovered(null)}>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link
              to={`/work/${p.slug}`}
              className="work-row"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
            >
              <span className="work-row__index">{p.index}</span>
              <span className="work-row__title display">{p.title}</span>
              <span className="work-row__meta">
                <span className="work-row__category">{t(p.category)}</span>
                <span className="work-row__line">{t(p.line)}</span>
              </span>
              <span className="work-row__thumb" aria-hidden="true">
                <Media media={p.hero} mode="hover" playing={false} cover />
              </span>
            </Link>
          </li>
        ))}
        {links.behance && (
          <li>
            <a
              href={links.behance}
              target="_blank"
              rel="noreferrer"
              className="work-row work-row--external"
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(behanceIndex)}
              onFocus={() => setHovered(behanceIndex)}
              onBlur={() => setHovered(null)}
            >
              <span className="work-row__index">{String(behanceIndex + 1).padStart(2, "0")}</span>
              <span className="work-row__title display">Behance</span>
              <span className="work-row__meta">
                <span className="work-row__category">{t(ui.work.behanceCategory)}</span>
                <span className="work-row__line">{t(ui.work.behanceLine)}</span>
                <span className="work-row__external">{t(ui.work.behanceOpen)}</span>
              </span>
              <span className="work-row__thumb" aria-hidden="true">
                <BehanceMosaic />
              </span>
            </a>
          </li>
        )}
      </ol>

      <div ref={follower} className={`work-index__follower${hovered !== null ? " is-visible" : ""}`} aria-hidden="true">
        {projects.map((p, i) => (
          <div key={p.slug} className={`work-index__frame${hovered === i ? " is-active" : ""}`}>
            <Media media={p.hero} mode="hover" playing={hovered === i} cover />
          </div>
        ))}
        {links.behance && (
          <div className={`work-index__frame${hovered === behanceIndex ? " is-active" : ""}`}>
            <BehanceMosaic />
          </div>
        )}
      </div>
    </section>
  );
}
