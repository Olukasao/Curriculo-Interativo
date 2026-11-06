import { useState, type FormEvent } from "react";
import { useAsk } from "../components/ask/AskProvider";
import { LIMITS } from "../ai/protocol";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import "./AskSection.css";

/** Entry point to the assistant: type a question or pick one; the conversation opens in the panel. */
export function AskSection() {
  const { t } = useI18n();
  const ask = useAsk();
  const [q, setQ] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return ask.open();
    ask.open(q.trim());
    setQ("");
  };

  return (
    <section id="ask" className="ask-section section wrap" aria-labelledby="ask-section-title">
      <h2 id="ask-section-title" className="ask-section__title display">
        {t(ui.ask.heading)}
      </h2>
      <div className="ask-section__body">
        <p className="ask-section__intro">{t(ui.ask.intro)}</p>
        <form className="ask-section__form" onSubmit={submit}>
          <label htmlFor="ask-inline" className="visually-hidden">
            {t(ui.ask.placeholder)}
          </label>
          <span className="ask-section__caret" aria-hidden="true" />
          <input
            id="ask-inline"
            value={q}
            maxLength={LIMITS.messageChars}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t(ui.ask.placeholder)}
            autoComplete="off"
          />
          <button type="submit" className="btn btn--solid">
            {t(ui.ask.send)}
          </button>
        </form>
        <ul className="ask-section__suggestions">
          {ui.ask.suggestions.map((s) => (
            <li key={s.pt}>
              <button type="button" className="sel-link" onClick={() => ask.open(t(s))}>
                {t(s)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
