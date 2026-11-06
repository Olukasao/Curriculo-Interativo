import { useRef } from "react";
import { Link } from "react-router-dom";
import { Media } from "../components/Media";
import { projectBySlug } from "../content/projects";
import type { Media as MediaT } from "../content/types";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { gsap, MQ, useGSAP } from "../lib/motion";
import "./AcessaNetChapter.css";

const project = projectBySlug("acessanet")!;
const videos = project.gallery.filter((m): m is Extract<MediaT, { kind: "video" }> => m.kind === "video");
const wide = videos.filter((m) => m.aspect === "16/9");
const tall = videos.filter((m) => m.aspect === "9/16");

/**
 * A horizontal walk through the brand's work, from the website film to the campaigns.
 * Desktop: the vertical scroll drives the track sideways. Touch: a native swipe carousel.
 */
export function AcessaNetChapter() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const distance = () => track.current!.scrollWidth - innerWidth;
        const move = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: ".an-pin",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });
        // Captions drift against the track for depth.
        gsap.utils.toArray<HTMLElement>(".an-panel figcaption").forEach((cap) => {
          gsap.fromTo(
            cap,
            { x: 80 },
            {
              x: -40,
              ease: "none",
              scrollTrigger: { trigger: cap, containerAnimation: move, start: "left right", end: "right left", scrub: true },
            },
          );
        });
      });
    },
    { scope: root },
  );

  const figure = (m: Extract<MediaT, { kind: "video" }>, cls: string, eager = false) => (
    <figure key={m.slug} className={`an-panel ${cls}`}>
      <Media media={m} mode="inview" eager={eager} />
      <figcaption>{t(m.alt)}</figcaption>
    </figure>
  );

  return (
    <section
      ref={root}
      id="acessanet"
      className="an-chapter section"
      aria-labelledby="an-title"
      style={{ "--field": project.tone.field, "--ink": project.tone.ink } as React.CSSProperties}
    >
      <div className="an-pin">
        <div ref={track} className="an-track" tabIndex={0} aria-label={t(ui.acessanet.dragHint)}>
          <article className="an-panel an-panel--intro">
            <p className="label">
              {project.index} / {t(project.category)}
            </p>
            <h2 id="an-title" className="an-title display">
              {project.title}
            </h2>
            <p className="an-lede">{t(project.summary)}</p>
            <p className="an-hint label" aria-hidden="true">
              {t(ui.acessanet.dragHint)}
            </p>
          </article>

          {project.hero.kind === "video" && figure(project.hero, "an-panel--hero")}
          {wide[0] && figure(wide[0], "an-panel--wide")}

          <div className="an-panel an-panel--duo">
            {tall.map((m) => (
              <figure key={m.slug} className="an-tall">
                <Media media={m} mode="inview" />
                <figcaption>{t(m.alt)}</figcaption>
              </figure>
            ))}
          </div>

          {wide.slice(1).map((m) => figure(m, "an-panel--wide"))}

          <article className="an-panel an-panel--end">
            <h3 className="an-end__title">{t(ui.caseStudy.solution)}</h3>
            <p>{t(project.solution)}</p>
            <h3 className="an-end__title">{t(ui.caseStudy.role)}</h3>
            <p>{t(project.role)}</p>
            <div className="an-end__links">
              <Link to="/work/acessanet" className="btn btn--solid">
                {t(ui.work.caseStudy)}
              </Link>
              <a href="https://acessanet.com.br" target="_blank" rel="noreferrer" className="btn">
                {t(ui.acessanet.visit)}
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
