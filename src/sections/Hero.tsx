import { useRef } from "react";
import { SectionLink } from "../components/SectionLink";
import { profile } from "../content/profile";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, MQ, useGSAP } from "../lib/motion";
import "./Hero.css";

/** Resting width comes from CSS so breakpoints can set it. */
const restWidth = (_: number, el: Element) => Number(getComputedStyle(el).getPropertyValue("--w-rest")) || 92;

/**
 * The name, set as large as the viewport allows. On entry the two lines rise out of
 * their masks while closing from wide to normal width. On scroll they pull apart —
 * LUCAS widens, SOARES condenses — and hand the page to the manifesto.
 */
export function Hero({ ready }: { ready: boolean }) {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.reduce, () => {
        gsap.set(".hero__line, .hero__fade", { clearProps: "all" });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!ready) {
          gsap.set(".hero__line", { yPercent: 105, "--w": 125 });
          gsap.set(".hero__fade", { autoAlpha: 0, y: 24 });
          return;
        }
        gsap
          .timeline()
          .fromTo(
            ".hero__line",
            { yPercent: 105, "--w": 125 },
            { yPercent: 0, "--w": restWidth, duration: 1.5, ease: EASE.reveal, stagger: 0.12 },
          )
          .fromTo(".hero__fade", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, ease: EASE.reveal, stagger: 0.08 }, 0.5);

        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
            defaults: { ease: "none" },
          })
          .to(".hero__first", { xPercent: -6, "--w": 125 }, 0)
          .to(".hero__last", { xPercent: 4, "--w": 66 }, 0)
          .to(".hero__name", { autoAlpha: 0.12 }, 0)
          .to(".hero__meta", { yPercent: -40, autoAlpha: 0 }, 0);
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section ref={root} className="hero wrap" id="top" aria-label="Lucas Soares">
      <h1 className="hero__name display">
        <span className="line-mask">
          <span className="hero__line hero__first">{profile.first}</span>
        </span>
        <span className="line-mask hero__l2">
          <span className="hero__line hero__last">{profile.last}.</span>
        </span>
      </h1>

      <div className="hero__meta">
        <p className="hero__role hero__fade">{t(profile.headline)}</p>
        <p className="hero__intro hero__fade">{t(profile.intro)}</p>
        <nav className="hero__cta hero__fade" aria-label={t(ui.nav.work)}>
          <SectionLink to="#work" className="btn btn--solid">
            {t(ui.hero.seeWork)}
          </SectionLink>
          <SectionLink to="#experience" className="btn">
            {t(ui.hero.seeExperience)}
          </SectionLink>
        </nav>
        <p className="hero__scroll hero__fade" aria-hidden="true">
          <span>{t(ui.hero.scroll)}</span>
          <span className="hero__scroll-line" />
        </p>
      </div>
    </section>
  );
}
