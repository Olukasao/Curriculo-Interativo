import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { askPortfolio } from "../../ai/client";
import { LIMITS, type AskResponse, type ChatTurn, type Source } from "../../ai/protocol";
import { links } from "../../content/profile";
import { ui } from "../../content/ui";
import { useI18n } from "../../lib/i18n";
import { prefersReducedMotion } from "../../lib/motion";
import { useScroller } from "../../lib/smoothScroll";
import "./AskPanel.css";

type Entry =
  | { role: "user"; text: string }
  | { role: "assistant"; text: string; sources: Source[]; mode: AskResponse["mode"] }
  | { role: "error"; text: string };

type Props = {
  open: boolean;
  onClose: () => void;
  pending: { q: string; id: number } | null;
  onPendingHandled: () => void;
};

export default function AskPanel({ open, onClose, pending, onPendingHandled }: Props) {
  const { t, lang } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<AskResponse["mode"] | null>(null);
  const scroller = useScroller();
  const navigate = useNavigate();

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      scroller.stop();
      requestAnimationFrame(() => input.current?.focus());
    } else if (!open && d.open) {
      d.close();
    }
  }, [open, scroller]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onNativeClose = () => {
      scroller.start();
      onClose();
    };
    d.addEventListener("close", onNativeClose);
    return () => d.removeEventListener("close", onNativeClose);
  }, [onClose, scroller]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [entries, busy]);

  const send = useCallback(
    async (text: string) => {
      const q = text.trim();
      if (!q || busy) return;
      if (q.length > LIMITS.messageChars) {
        setEntries((e) => [...e, { role: "error", text: t(ui.ask.tooLong) }]);
        return;
      }
      const history: ChatTurn[] = entries
        .filter((e): e is Exclude<Entry, { role: "error" }> => e.role !== "error")
        .map((e) => ({ role: e.role, content: e.text }));
      const messages: ChatTurn[] = [...history, { role: "user" as const, content: q }].slice(-LIMITS.historyTurns);

      setEntries((e) => [...e, { role: "user", text: q }]);
      setDraft("");
      setBusy(true);
      abort.current = new AbortController();
      try {
        const res = await askPortfolio(messages, lang, abort.current.signal);
        if ("error" in res) {
          setEntries((e) => [...e, { role: "error", text: res.code === "rate_limited" ? t(ui.ask.rateLimited) : res.error }]);
        } else {
          setMode(res.mode);
          setEntries((e) => [...e, { role: "assistant", text: res.answer, sources: res.sources, mode: res.mode }]);
        }
      } catch {
        /* aborted */
      } finally {
        setBusy(false);
      }
    },
    [busy, entries, lang, t],
  );

  useEffect(() => {
    if (pending && open) {
      onPendingHandled();
      void send(pending.q);
    }
  }, [pending, open, send, onPendingHandled]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(draft);
  };

  const go = (href: string) => {
    dialog.current?.close();
    navigate(href);
    if (href.includes("#")) {
      const hash = href.slice(href.indexOf("#"));
      setTimeout(() => scroller.to(hash), 60);
    }
  };

  const reset = () => {
    abort.current?.abort();
    setEntries([]);
    setBusy(false);
    input.current?.focus();
  };

  return (
    <dialog
      ref={dialog}
      className="ask"
      aria-labelledby="ask-title"
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      <div className="ask__panel">
        <header className="ask__head">
          <h2 id="ask-title" className="ask__title">
            {t(ui.ask.heading)}
          </h2>
          <div className="ask__head-actions">
            {entries.length > 0 && (
              <button type="button" className="sel-link" onClick={reset}>
                {t(ui.ask.clear)}
              </button>
            )}
            <button type="button" className="sel-link" onClick={() => dialog.current?.close()}>
              {t(ui.nav.close)}
            </button>
          </div>
        </header>

        <div ref={log} className="ask__log" aria-live="polite" aria-busy={busy}>
          {entries.length === 0 && (
            <div className="ask__empty">
              <p className="ask__lede">{t(ui.ask.intro)}</p>
              <ul className="ask__suggestions">
                {ui.ask.suggestions.map((s) => (
                  <li key={s.pt}>
                    <button type="button" onClick={() => send(t(s))}>
                      {t(s)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {entries.map((e, i) => (
            <article key={i} className={`ask__entry ask__entry--${e.role}`}>
              <p className="ask__who">{e.role === "user" ? t(ui.ask.you) : t(ui.ask.assistant)}</p>
              {e.role === "assistant" ? (
                <Reveal text={e.text} animate={i === entries.length - 1} />
              ) : (
                <p className="ask__text">{e.text}</p>
              )}
              {e.role === "assistant" && e.sources.length > 0 && (
                <nav className="ask__sources" aria-label={t(ui.ask.related)}>
                  <span className="label">{t(ui.ask.related)}</span>
                  {e.sources.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      className="ask__source"
                      onClick={(ev) => {
                        ev.preventDefault();
                        go(s.href);
                      }}
                    >
                      {s.title}
                    </a>
                  ))}
                </nav>
              )}
            </article>
          ))}

          {busy && (
            <p className="ask__thinking" role="status">
              {t(ui.ask.thinking)}
              <span className="ask__dots" aria-hidden="true" />
            </p>
          )}
        </div>

        <form className="ask__form" onSubmit={onSubmit}>
          <label htmlFor="ask-input" className="visually-hidden">
            {t(ui.ask.placeholder)}
          </label>
          <textarea
            id="ask-input"
            ref={input}
            rows={2}
            maxLength={LIMITS.messageChars}
            value={draft}
            placeholder={t(ui.ask.placeholder)}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(draft);
              }
            }}
          />
          <button type="submit" className="btn btn--solid" disabled={busy || !draft.trim()}>
            {t(ui.ask.send)}
          </button>
        </form>

        <footer className="ask__foot">
          <p>{mode === "llm" ? t(ui.ask.llm) : t(ui.ask.demo)}</p>
          <p className="ask__foot-links">
            {links.github && (
              <a className="sel-link" href={links.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {links.behance && (
              <a className="sel-link" href={links.behance} target="_blank" rel="noreferrer">
                Behance
              </a>
            )}
          </p>
        </footer>
      </div>
    </dialog>
  );
}

/** Reveals an answer progressively, like it's being written. Instant for reduced motion. */
function Reveal({ text, animate }: { text: string; animate: boolean }) {
  const [n, setN] = useState(animate && !prefersReducedMotion() ? 0 : text.length);
  useEffect(() => {
    if (n >= text.length) return;
    const id = requestAnimationFrame(() => setN((v) => Math.min(text.length, v + Math.max(2, Math.ceil(text.length / 90)))));
    return () => cancelAnimationFrame(id);
  }, [n, text.length]);
  const shown = text.slice(0, n);
  return (
    <div className="ask__text" aria-label={text}>
      {shown.split(/\n{2,}/).map((para, i) => (
        <p key={i} aria-hidden="true">
          {para}
        </p>
      ))}
    </div>
  );
}
