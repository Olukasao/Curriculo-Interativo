import { useId, useRef, useState, type KeyboardEvent } from "react";
import { PointCloudCanvas } from "../components/expertise/PointCloudCanvas";
import { universes } from "../content/expertise";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import "./Expertise.css";

/**
 * Three universes as tabs. Switching tabs reorganises the same point cloud into a new form
 * and swaps the list of skills. Arrow keys move between tabs.
 */
export function Expertise() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const u = universes[active];

  const onKey = (e: KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + universes.length) % universes.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="expertise" className="expertise section wrap" aria-labelledby="expertise-title">
      <header className="expertise__head">
        <h2 id="expertise-title" className="label">
          {t(ui.expertise.heading)}
        </h2>
        <p className="expertise__intro muted">{t(ui.expertise.intro)}</p>
      </header>

      <div className="expertise__body">
        <div className="expertise__stage">
          <PointCloudCanvas shape={u.id} />
        </div>

        <div className="expertise__panel">
          <div className="expertise__tabs" role="tablist" aria-label={t(ui.expertise.heading)} onKeyDown={onKey}>
            {universes.map((x, i) => (
              <button
                key={x.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`${base}-tab-${x.id}`}
                role="tab"
                type="button"
                aria-selected={i === active}
                aria-controls={`${base}-panel`}
                tabIndex={i === active ? 0 : -1}
                className="expertise__tab display"
                onClick={() => setActive(i)}
              >
                {x.name}
              </button>
            ))}
          </div>

          <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${u.id}`} className="expertise__content" key={u.id}>
            <p className="expertise__thesis">{t(u.thesis)}</p>
            <ul className="expertise__skills">
              {u.skills.map((s) => (
                <li key={s.name}>
                  {s.name}
                  {s.note && <span className="expertise__note"> ({t(s.note)})</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
