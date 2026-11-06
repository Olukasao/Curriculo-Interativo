import { useRef } from "react";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, MQ, useGSAP } from "../lib/motion";
import "./Manifesto.css";

const items = [
  { word: "Code.", text: ui.manifesto.code },
  { word: "Design.", text: ui.manifesto.design },
  { word: "Intelligence.", text: ui.manifesto.intelligence },
];

/**
 * The thesis as a selection moving through three words. Desktop: pinned and scrubbed —
 * the inverted block travels from word to word while the matching sentence swaps in.
 * Mobile: each word is selected as it scrolls into view.
 */
export function Manifesto() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(root);

      mm.add(MQ.desktop, () => {
        const words = q<HTMLElement>(".manifesto__word");
        const texts = q<HTMLElement>(".manifesto__text");
        const sel = q<HTMLElement>(".manifesto__sel")[0];
        const pin = q<HTMLElement>(".manifesto__pin")[0];
        const box = (i: number) => {
          const w = words[i].getBoundingClientRect();
          const p = pin.getBoundingClientRect();
          return { top: w.top - p.top, left: w.left - p.left, width: w.width, height: w.height };
        };

        gsap.set(texts, { autoAlpha: 0, y: 30 });
        gsap.set(sel, { ...box(0), scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=260%",
            pin: ".manifesto__pin",
            scrub: 0.6,
            invalidateOnRefresh: true,
            snap: { snapTo: "labels", duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut", delay: 0.05 },
          },
        });

        tl.addLabel("s0")
          .to(sel, { scaleX: 1, duration: 0.5, ease: EASE.camera })
          .to(words[0], { color: "#ededE8", duration: 0.2 }, "<")
          .to(texts[0], { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.1")
          .to({}, { duration: 0.6 })
          .addLabel("c0");

        for (let i = 1; i < items.length; i++) {
          tl.to(texts[i - 1], { autoAlpha: 0, y: -30, duration: 0.3 })
            .to(sel, { top: () => box(i).top, width: () => box(i).width, height: () => box(i).height, duration: 0.6, ease: EASE.camera }, "<")
            .to(words[i - 1], { color: "#3a3a37", duration: 0.3 }, "<")
            .to(words[i], { color: "#ededE8", duration: 0.3 }, "<0.25")
            .to(texts[i], { autoAlpha: 1, y: 0, duration: 0.4 }, "<0.1")
            .to({}, { duration: 0.6 })
            .addLabel(`c${i}`);
        }
      });

      mm.add(MQ.mobile, () => {
        q<HTMLElement>(".manifesto__item").forEach((item) => {
          gsap
            .timeline({ scrollTrigger: { trigger: item, start: "top 70%", toggleActions: "play none none reverse" } })
            .fromTo(item.querySelector(".manifesto__item-sel"), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: EASE.camera })
            .to(item.querySelector(".manifesto__word"), { color: "#ededE8", duration: 0.2 }, 0)
            .from(item.querySelector(".manifesto__text"), { autoAlpha: 0, y: 20, duration: 0.6, ease: EASE.reveal }, 0.2);
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="manifesto section" aria-labelledby="manifesto-title">
      <h2 id="manifesto-title" className="visually-hidden">
        {t(ui.manifesto.heading)}
      </h2>
      <div className="manifesto__pin wrap">
        <ul className="manifesto__list">
          {items.map((it) => (
            <li key={it.word} className="manifesto__item">
              <span className="manifesto__word-wrap">
                <span className="manifesto__word display">{it.word}</span>
                <span className="manifesto__item-sel" aria-hidden="true" />
              </span>
              <p className="manifesto__text">{t(it.text)}</p>
            </li>
          ))}
        </ul>
        <span className="manifesto__sel" aria-hidden="true" />
      </div>
    </section>
  );
}
