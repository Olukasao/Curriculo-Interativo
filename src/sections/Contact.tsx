import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { links } from "../content/profile";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { gsap, MQ, useGSAP } from "../lib/motion";
import { useScroller } from "../lib/smoothScroll";
import "./Contact.css";

/**
 * The closing mirrors the opening: two lines that close in from opposite sides and
 * open on the width axis as the page runs out.
 */
export function Contact() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const scroller = useScroller();
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: ".contact__type", start: "top 95%", end: "bottom 55%", scrub: true },
          })
          .fromTo(".contact__q", { xPercent: 18, "--w": 62 }, { xPercent: 0, "--w": 100 }, 0)
          .fromTo(".contact__a .contact__row", { xPercent: (i) => (i % 2 ? 16 : -16), "--w": 62 }, { xPercent: 0, "--w": 92 }, 0);
      });
    },
    { scope: root },
  );

  const copy = async () => {
    if (!links.email) return;
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${links.email}`;
    }
  };

  const missing = (label: string) =>
    import.meta.env.DEV ? (
      <li className="contact__item is-missing">
        <span className="contact__k">{label}</span>
        <span className="contact__v muted">{t(ui.contact.toConfigure)} (src/content/profile.ts)</span>
      </li>
    ) : null;

  const external = (label: string, href: string | null, shown?: string) =>
    href ? (
      <li className="contact__item">
        <span className="contact__k">{label}</span>
        <a className="contact__v sel-link" href={href} target="_blank" rel="noreferrer">
          {shown ?? href.replace(/^https?:\/\/(www\.)?/, "")}
        </a>
      </li>
    ) : (
      missing(label)
    );

  // "Let's build / something / remarkable." — three rows so the line fits at any width.
  const words = t(ui.contact.line2).split(" ");
  const line2 = [words.slice(0, 2).join(" "), ...words.slice(2)];

  return (
    <section ref={root} id="contact" className="contact section wrap" aria-labelledby="contact-title" tabIndex={-1}>
      <div className="contact__type">
        <p className="contact__q display">{t(ui.contact.line1)}</p>
        <h2 id="contact-title" className="contact__a display">
          {line2.map((part, i) => (
            <span key={i} className="contact__row">
              {part}
            </span>
          ))}
        </h2>
      </div>

      <ul className="contact__list">
        {links.email ? (
          <li className="contact__item">
            <span className="contact__k">{t(ui.contact.email)}</span>
            <span className="contact__v">
              <a className="sel-link" href={`mailto:${links.email}`}>
                {links.email}
              </a>
              <button type="button" className="contact__copy" onClick={copy} aria-live="polite">
                {copied ? t(ui.contact.copied) : t(ui.contact.copy)}
              </button>
            </span>
          </li>
        ) : (
          missing(t(ui.contact.email))
        )}
        {external("LinkedIn", links.linkedin)}
        {external("GitHub", links.github)}
        {external("Behance", links.behance)}
        <li className="contact__item">
          <span className="contact__k">{t(ui.nav.resume)}</span>
          {links.resumePdf ? (
            <a className="contact__v sel-link" href={links.resumePdf} download>
              {t(ui.contact.resume)}
            </a>
          ) : (
            <Link className="contact__v sel-link" to="/cv">
              {t(ui.contact.resume)}
            </Link>
          )}
        </li>
      </ul>

      <footer className="contact__foot">
        <p className="muted">© {new Date().getFullYear()} Lucas Soares</p>
        <button type="button" className="sel-link" onClick={() => scroller.to(0)}>
          {t(ui.contact.top)}
        </button>
      </footer>
    </section>
  );
}
