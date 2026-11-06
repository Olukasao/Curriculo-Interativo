import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ui } from "../../content/ui";
import { useI18n } from "../../lib/i18n";
import { useAsk } from "./AskProvider";
import "./AskLauncher.css";

/** Persistent entry to the assistant. On the home page it appears once the hero is behind you. */
export function AskLauncher() {
  const { t } = useI18n();
  const ask = useAsk();
  const { pathname } = useLocation();
  const [shown, setShown] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") return setShown(true);
    const onScroll = () => setShown(scrollY > innerHeight * 0.8);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/cv") return null;

  return (
    <button
      type="button"
      className={`ask-launcher${shown && !ask.isOpen ? " is-shown" : ""}`}
      onClick={() => ask.open()}
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
    >
      <span className="ask-launcher__caret" aria-hidden="true" />
      {t(ui.ask.open)}
    </button>
  );
}
