import { useRef } from "react";
import { Link } from "react-router-dom";
import { KollectLogo } from "../components/KollectLogo";
import { Media } from "../components/Media";
import { projectBySlug } from "../content/projects";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, MQ, useGSAP } from "../lib/motion";
import "./KollectChapter.css";

const project = projectBySlug("kollect")!;
const [worlds, commercial] = project.gallery;

/**
 * Kollect brings its own field colour. The lockup stays perfectly still (brand rule);
 * the films around it move at different depths, and the rule itself is set as type.
 */
export function KollectChapter() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-depth]").forEach((el) => {
          const depth = Number(el.dataset.depth);
          gsap.fromTo(
            el,
            { yPercent: depth * 18 },
            { yPercent: -depth * 18, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
        gsap.from(".kc-rule .line-mask > span", {
          yPercent: 105,
          duration: 1.1,
          ease: EASE.reveal,
          stagger: 0.1,
          scrollTrigger: { trigger: ".kc-rule", start: "top 80%" },
        });
      });
      mm.add(MQ.desktop, () => {
        // The field colour arrives as the chapter takes the screen.
        gsap.fromTo(
          root.current,
          { backgroundColor: "#000000" },
          {
            backgroundColor: project.tone.field,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 70%", end: "top 10%", scrub: true },
          },
        );
      });
    },
    { scope: root },
  );

  const rule = t(ui.kollect.rule).split(". ");

  return (
    <section
      ref={root}
      id="kollect"
      className="kc section wrap"
      aria-labelledby="kc-title"
      style={{ "--field": project.tone.field, "--ink": project.tone.ink } as React.CSSProperties}
    >
      <header className="kc-head">
        <p className="label">
          {project.index} / {t(project.category)}
        </p>
        <h2 id="kc-title" className="visually-hidden">
          {project.title}
        </h2>
      </header>

      <div className="kc-lockup">
        <KollectLogo />
      </div>

      <div className="kc-intro">
        <p className="kc-rule display" aria-label={t(ui.kollect.rule)}>
          {rule.map((part, i) => (
            <span key={i} className="line-mask" aria-hidden="true">
              <span>{part.endsWith(".") ? part : `${part}.`}</span>
            </span>
          ))}
        </p>
        <div className="kc-copy">
          <p>{t(project.summary)}</p>
          <p className="muted">{t(project.solution)}</p>
        </div>
      </div>

      <figure className="kc-film" data-depth="0.4">
        {project.hero.kind !== "placeholder" && <Media media={project.hero} mode="inview" />}
        <figcaption className="label">{t(project.hero.kind === "placeholder" ? project.hero.label : project.hero.alt)}</figcaption>
      </figure>

      <div className="kc-pair">
        {worlds && (
          <figure className="kc-worlds" data-depth="1">
            <Media media={worlds} mode="inview" />
            <figcaption className="label">{worlds.kind === "placeholder" ? t(worlds.label) : t(worlds.alt)}</figcaption>
          </figure>
        )}
        {commercial && (
          <figure className="kc-commercial" data-depth="-0.6">
            <Media media={commercial} mode="inview" />
            <figcaption className="label">{commercial.kind === "placeholder" ? t(commercial.label) : t(commercial.alt)}</figcaption>
          </figure>
        )}
      </div>

      <footer className="kc-foot">
        <p className="kc-role">
          <span className="label">{t(ui.caseStudy.role)}</span>
          {t(project.role)}
        </p>
        <Link to="/work/kollect" className="btn">
          {t(ui.work.caseStudy)}
        </Link>
      </footer>
    </section>
  );
}
