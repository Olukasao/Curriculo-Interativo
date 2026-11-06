import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { useScroller } from "../lib/smoothScroll";
import { useAsk } from "./ask/AskProvider";
import { SectionLink } from "./SectionLink";
import "./Header.css";

export function Header() {
  const { t, lang, setLang } = useI18n();
  const ask = useAsk();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const scroller = useScroller();
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    scroller.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      scroller.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, scroller]);

  const other = lang === "pt" ? "en" : "pt";
  const close = () => setOpen(false);

  const links = (
    <>
      <SectionLink to="#work" className="sel-link" onNavigate={close}>
        {t(ui.nav.work)}
      </SectionLink>
      <SectionLink to="#experience" className="sel-link" onNavigate={close}>
        {t(ui.nav.experience)}
      </SectionLink>
      <button
        type="button"
        className="sel-link"
        onClick={() => {
          close();
          ask.open();
        }}
      >
        {t(ui.nav.ask)}
      </button>
      <SectionLink to="#contact" className="sel-link" onNavigate={close}>
        {t(ui.nav.contact)}
      </SectionLink>
    </>
  );

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="site-header__bar wrap">
        <Link to="/" className="site-header__name" aria-label={`Lucas Soares — ${t(ui.nav.home)}`}>
          Lucas Soares
        </Link>

        <nav className="site-header__nav" aria-label="Principal">
          {links}
        </nav>

        <div className="site-header__actions">
          <Link to="/cv" className="site-header__cv">
            {t(ui.nav.resume)}
          </Link>
          <button
            type="button"
            className="site-header__lang"
            onClick={() => setLang(other)}
            aria-label={t(ui.nav.switchTo)}
            lang={other === "en" ? "en" : "pt-BR"}
          >
            <span aria-hidden="true" className={lang === "pt" ? "is-active" : ""}>
              PT
            </span>
            <span aria-hidden="true">/</span>
            <span aria-hidden="true" className={lang === "en" ? "is-active" : ""}>
              EN
            </span>
          </button>
          <button
            ref={toggleRef}
            type="button"
            className="site-header__toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? t(ui.nav.close) : t(ui.nav.menu)}
          </button>
        </div>
      </div>

      <div id={menuId} className="site-menu" hidden={!open}>
        <nav className="site-menu__links wrap" aria-label="Menu">
          {links}
          <Link to="/cv" className="sel-link" onClick={close}>
            {t(ui.nav.resume)}
          </Link>
        </nav>
      </div>
    </header>
  );
}
