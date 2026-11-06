import { useEffect, useRef } from "react";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, useGSAP } from "../lib/motion";
import { useScroller } from "../lib/smoothScroll";
import "./Intro.css";

const SEEN = "ls-intro-seen";

export const introWillPlay = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("intro-pending");

/**
 * Opening sequence, ~3.3 s:
 * three words open on the width axis → a selection block inverts them →
 * the selection floods the screen → it lifts away to reveal the name.
 * `onReveal` fires as the lift starts so the hero can enter underneath.
 */
export function Intro({ onReveal }: { onReveal: () => void }) {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const scroller = useScroller();
  const revealed = useRef(false);

  const reveal = () => {
    if (revealed.current) return;
    revealed.current = true;
    onReveal();
  };

  const finish = () => {
    document.documentElement.classList.remove("intro-pending");
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {
      /* storage unavailable */
    }
    scroller.start();
    reveal();
    if (root.current) root.current.style.display = "none";
  };

  useEffect(() => {
    scroller.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const stage = q(".intro__stage")[0] as HTMLElement;
      const words = q(".intro__word");

      gsap.set(words, { yPercent: 110, "--w": 62 });
      gsap.set(".intro__sel", { scaleX: 0 });

      const r = stage.getBoundingClientRect();
      const inset = `${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px`;

      tl.current = gsap
        .timeline({ delay: 0.25, onComplete: finish })
        .to(words[0], { yPercent: 0, "--w": 100, duration: 0.9, ease: EASE.reveal })
        .to(words[1], { yPercent: 0, "--w": 82, duration: 0.9, ease: EASE.reveal }, 0.32)
        .to(words[2], { yPercent: 0, "--w": 112, duration: 1.0, ease: EASE.reveal }, 0.62)
        .to(".intro__sel", { scaleX: 1, duration: 0.55, ease: EASE.camera }, 1.45)
        .fromTo(
          ".intro__flood",
          { clipPath: `inset(${inset})` },
          { clipPath: "inset(0px 0px 0px 0px)", duration: 0.55, ease: "power4.inOut", immediateRender: false },
          2.05,
        )
        .set(stage, { autoAlpha: 0 }, 2.6)
        .add(reveal, 2.62)
        .to(".intro__flood", { clipPath: "inset(0px 0px 100% 0px)", duration: 0.7, ease: "power4.inOut" }, 2.62)
        .to(".intro__skip", { autoAlpha: 0, duration: 0.2 }, 2.6);
    },
    { scope: root },
  );

  const skip = () => {
    if (!tl.current) return finish();
    // Jump to the reveal and play the lift quickly.
    tl.current.seek(2.6).timeScale(1.6);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="intro">
      <div className="intro__stage" aria-hidden="true">
        <span className="line-mask">
          <span className="intro__word display">Design</span>
        </span>
        <span className="line-mask intro__mid">
          <span className="intro__word display">meets</span>
        </span>
        <span className="line-mask">
          <span className="intro__word display">Engineering.</span>
        </span>
        <span className="intro__sel" />
      </div>
      <div className="intro__flood" />
      <button type="button" className="intro__skip sel-link" onClick={skip}>
        {t(ui.intro.skip)}
      </button>
    </div>
  );
}
