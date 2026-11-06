import { useRef } from "react";
import { experience } from "../content/experience";
import { profile } from "../content/profile";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, useGSAP } from "../lib/motion";
import "./About.css";

export function About() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The timeline's rule draws itself as you read down it.
        gsap.fromTo(
          ".timeline__rule",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 60%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>(".timeline__item").forEach((item) => {
          gsap.from(item.querySelector(".timeline__company"), {
            yPercent: 100,
            "--w": 125,
            duration: 1.2,
            ease: EASE.reveal,
            scrollTrigger: { trigger: item, start: "top 82%" },
          });
        });
        gsap.from(".about__statement .line-mask > span", {
          yPercent: 105,
          duration: 1.2,
          ease: EASE.reveal,
          stagger: 0.08,
          scrollTrigger: { trigger: ".about__statement", start: "top 80%" },
        });
      });
    },
    { scope: root },
  );

  // Break the statement at its full stop for two masked lines.
  const statement = t(ui.about.statement).split(/(?<=\.)\s/);

  return (
    <section ref={root} id="about" className="about section wrap" aria-labelledby="about-title">
      <h2 id="about-title" className="label">
        {t(ui.about.heading)}
      </h2>

      <p className="about__statement" aria-label={t(ui.about.statement)}>
        {statement.map((s, i) => (
          <span key={i} className="line-mask" aria-hidden="true">
            <span>{s}</span>
          </span>
        ))}
      </p>

      <div className="about__grid">
        <div className="about__prose prose">
          {profile.about.map((p, i) => (
            <p key={i}>{t(p)}</p>
          ))}
        </div>

        <dl className="about__facts">
          <div>
            <dt className="label">{t(ui.about.education)}</dt>
            {profile.education.map((e) => (
              <dd key={e.title.pt}>
                <strong>{t(e.title)}</strong>
                <span className="muted">
                  {e.place ? `${e.place}, ` : ""}
                  {t(e.status).toLowerCase()}
                </span>
              </dd>
            ))}
          </div>
          <div>
            <dt className="label">{t(ui.about.languages)}</dt>
            {profile.languages.map((l) => (
              <dd key={l.name.pt}>
                <strong>{t(l.name)}</strong>
                <span className="muted">{t(l.level)}</span>
              </dd>
            ))}
          </div>
        </dl>
      </div>

      <div id="experience" className="timeline" tabIndex={-1} aria-labelledby="experience-title">
        <h3 id="experience-title" className="label timeline__title">
          {t(ui.about.experience)}
        </h3>
        <span className="timeline__rule" aria-hidden="true" />
        <ol className="timeline__list">
          {experience.map((x) => (
            <li key={x.company} className={`timeline__item${x.current ? " is-current" : ""}`}>
              <p className="timeline__when">
                {x.period ? t(x.period) : ""}
                {x.engagement ? `${x.period ? ", " : ""}${t(x.engagement)}` : ""}
              </p>
              <span className="line-mask">
                <span className="timeline__company display">{x.company}</span>
              </span>
              <p className="timeline__role">{t(x.role)}</p>
              <p className="timeline__summary">{t(x.summary)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
