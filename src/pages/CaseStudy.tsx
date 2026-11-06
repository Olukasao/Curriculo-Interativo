import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { KollectLogo } from "../components/KollectLogo";
import { LabGrid } from "../components/lab/LabGrid";
import { Media } from "../components/Media";
import { WorkscapeDemo } from "../components/workscape/WorkscapeDemo";
import { projectBySlug, projects } from "../content/projects";
import { ui } from "../content/ui";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, useGSAP } from "../lib/motion";
import NotFound from "./NotFound";
import "./CaseStudy.css";

export default function CaseStudy() {
  const { slug = "" } = useParams();
  const project = projectBySlug(slug);
  if (!project) return <NotFound />;
  return <CaseStudyView key={slug} slug={slug} />;
}

function CaseStudyView({ slug }: { slug: string }) {
  const { t } = useI18n();
  const project = projectBySlug(slug)!;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const root = useRef<HTMLElement>(null);
  const [withSound, setWithSound] = useState(false);
  useDocumentTitle(project.title, t(project.summary));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".case__title .line-mask > span", { yPercent: 105, "--w": 125, duration: 1.4, ease: EASE.reveal });
        gsap.from(".case__hero-media", { clipPath: "inset(18% 8% 0% 8%)", duration: 1.6, ease: EASE.reveal, delay: 0.15 });
        gsap.fromTo(
          ".case__next-title",
          { "--w": 62 },
          { "--w": 125, ease: "none", scrollTrigger: { trigger: ".case__next", start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  const style = {
    "--field": project.tone.field,
    "--ink": project.tone.ink,
    // Display titles are sized from their length so any project name fits the viewport.
    "--len": project.title.length,
    "--next-len": next.title.length,
  } as React.CSSProperties;
  // Workscape has no recordings yet: its interactive schematic takes the hero slot.
  const demoAsHero = slug === "workscape" && project.hero.kind === "placeholder";

  return (
    <main id="main" ref={root} className="case" style={style} tabIndex={-1}>
      <header className="case__head wrap">
        <p className="label">
          <Link to="/#work" className="sel-link">
            {t(ui.caseStudy.back)}
          </Link>
          <span aria-hidden="true"> / </span>
          {project.index}
        </p>
        <h1 className="case__title display">
          <span className="line-mask">
            <span>{project.title}</span>
          </span>
        </h1>
        <p className="case__line">{t(project.line)}</p>
      </header>

      <div className="case__hero-media wrap">
        {demoAsHero ? (
          <WorkscapeDemo />
        ) : withSound && project.hero.kind === "video" ? (
          <Media media={project.hero} mode="full" eager />
        ) : (
          <Media media={project.hero} mode="inview" eager />
        )}
        {project.hero.kind === "video" && !withSound && (
          <button type="button" className="btn case__sound" onClick={() => setWithSound(true)}>
            {t(ui.caseStudy.watch)}
          </button>
        )}
      </div>

      <section className="case__facts wrap" aria-label={t(ui.caseStudy.category)}>
        <p className="case__summary">{t(project.summary)}</p>
        <dl>
          <div>
            <dt className="label">{t(ui.caseStudy.category)}</dt>
            <dd>{t(project.category)}</dd>
          </div>
          <div>
            <dt className="label">{t(ui.caseStudy.role)}</dt>
            <dd>{t(project.role)}</dd>
          </div>
          <div>
            <dt className="label">{t(ui.caseStudy.tech)}</dt>
            <dd>{project.tech.join(", ")}</dd>
          </div>
          {project.links?.length ? (
            <div>
              <dt className="label">{t(ui.caseStudy.links)}</dt>
              <dd className="case__links">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="sel-link">
                    {t(l.label)}
                  </a>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="case__story wrap">
        {[
          { h: ui.caseStudy.problem, b: project.problem },
          { h: ui.caseStudy.solution, b: project.solution },
        ].map((s) => (
          <div key={s.h.pt} className="case__chapter">
            <h2 className="case__chapter-title display">{t(s.h)}</h2>
            <p className="case__chapter-body">{t(s.b)}</p>
          </div>
        ))}
      </section>

      {slug === "kollect" && (
        <section className="case__brand wrap">
          <div className="case__brand-logo">
            <KollectLogo />
          </div>
          <p className="case__brand-rule display">{t(ui.kollect.rule)}</p>
        </section>
      )}

      {project.features && (
        <section className="case__features wrap" aria-labelledby="features-title">
          <h2 id="features-title" className="label">
            {t(ui.caseStudy.features)}
          </h2>
          <ul>
            {project.features.map((f) => (
              <li key={f.pt}>{t(f)}</li>
            ))}
          </ul>
        </section>
      )}

      {slug === "workscape" && !demoAsHero && (
        <section className="case__demo wrap" aria-labelledby="demo-title">
          <h2 id="demo-title" className="label">
            {t(ui.caseStudy.demo)}
          </h2>
          <WorkscapeDemo />
        </section>
      )}

      {slug === "creative-lab" && (
        <section className="case__lab wrap">
          <LabGrid />
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="case__gallery wrap" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="label">
            {t(ui.caseStudy.gallery)}
          </h2>
          <ul>
            {project.gallery.map((m, i) => (
              <li key={i} data-aspect={m.aspect}>
                <Media media={m} mode="inview" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link to={`/work/${next.slug}`} className="case__next wrap">
        <span className="label">{t(ui.caseStudy.next)}</span>
        <span className="case__next-title display">{next.title}</span>
      </Link>
    </main>
  );
}
