import { Link } from "react-router-dom";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import "./LiveDemos.css";

const demos = [
  { to: "/work/chat-interno/live", key: "chat" },
  { to: "/work/agenda-tecnicos/live", key: "agenda" },
  { to: "/work/workscape/live", key: "workscape" },
  { to: "/work/acessanet/live", key: "site" },
  { to: "/work/acessanet/live?view=app", key: "app" },
] as const;

/** Shortcuts to the running previews, right under the project index. */
export function LiveDemos() {
  const { t } = useI18n();
  return (
    <section id="demos" className="live-demos section wrap" aria-labelledby="demos-title" tabIndex={-1}>
      <header className="live-demos__head">
        <h2 id="demos-title" className="label">
          {t(ui.demos.heading)}
        </h2>
        <p className="live-demos__intro">{t(ui.demos.intro)}</p>
      </header>
      <ul className="live-demos__grid">
        {demos.map((d) => (
          <li key={d.key}>
            <Link to={d.to} className="live-demo">
              <span className="live-demo__kind label">{t(ui.demos[d.key].kind)}</span>
              <span className="live-demo__title display">{t(ui.demos[d.key].title)}</span>
              <span className="live-demo__line">{t(ui.demos[d.key].line)}</span>
              <span className="live-demo__cta">{t(ui.demos.open)} →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
