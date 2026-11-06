import { useState } from "react";
import { Compare } from "../components/manipulation/Compare";
import { ImageViewer } from "../components/manipulation/ImageViewer";
import { comparisons, comparisonSrc, series, seriesSrc } from "../content/manipulation";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import "./Manipulation.css";

/**
 * Image manipulation: a before/after comparator for the composites, then the
 * Kollect collectible series as a tabbed gallery with a full-screen viewer.
 */
export function Manipulation() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const c = comparisons[active];
  const src = comparisonSrc(c.id);
  const s = series[tab];
  const images = Array.from({ length: s.count }, (_, i) => ({
    ...seriesSrc(s.id, i),
    alt: `${t(s.title)} — ${s.client} ${i + 1}`,
  }));

  return (
    <section id="manipulacao" className="manip section wrap" aria-labelledby="manip-title">
      <header className="manip__head">
        <p className="label">{t(ui.manipulation.label)}</p>
        <h2 id="manip-title" className="manip__title display">
          {t(ui.manipulation.heading)}
        </h2>
        <p className="manip__intro">{t(ui.manipulation.intro)}</p>
      </header>

      <div className="manip__compare">
        <div className="manip__stage">
          <Compare
            key={c.id}
            before={src.before}
            after={src.after}
            ratio={c.ratio}
            beforeLabel={t(c.beforeLabel)}
            afterLabel={t(ui.manipulation.final)}
            label={`${t(ui.manipulation.slider)}: ${c.title}`}
            alt={`${c.title} — ${t(c.note)}`}
          />
        </div>

        <aside className="manip__side">
          <div className="manip__caption" aria-live="polite">
            <h3 className="manip__piece">{c.title}</h3>
            <p className="muted">
              {c.client ? `${c.client}. ` : ""}
              {t(c.note)}
            </p>
            <a className="sel-link manip__link" href={c.behance} target="_blank" rel="noreferrer">
              {t(ui.manipulation.onBehance)}
            </a>
          </div>
          <ul className="manip__thumbs" aria-label={t(ui.manipulation.pieces)}>
            {comparisons.map((x, i) => (
              <li key={x.id}>
                <button type="button" aria-pressed={i === active} onClick={() => setActive(i)} title={x.title}>
                  <img src={comparisonSrc(x.id).thumb} alt={x.title} loading="lazy" decoding="async" />
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="manip__series">
        <header className="manip__series-head">
          <h3 className="manip__series-title display">{t(ui.manipulation.seriesHeading)}</h3>
          <p className="muted">{t(ui.manipulation.seriesIntro)}</p>
        </header>

        <div className="manip__tabs" role="tablist" aria-label={t(ui.manipulation.seriesHeading)}>
          {series.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              type="button"
              aria-selected={i === tab}
              onClick={() => setTab(i)}
            >
              {t(x.title)}
              <sup>{x.count}</sup>
            </button>
          ))}
        </div>

        <p className="manip__series-note">
          {t(s.note)}{" "}
          <a className="sel-link" href={s.behance} target="_blank" rel="noreferrer">
            {t(ui.manipulation.onBehance)}
          </a>
        </p>

        <ul className="manip__grid" role="tabpanel" key={s.id}>
          {images.map((img, i) => (
            <li key={img.small} style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <button type="button" onClick={() => setOpen(i)} aria-label={`${t(ui.manipulation.open)}: ${img.alt}`}>
                <img src={img.small} alt={img.alt} loading="lazy" decoding="async" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ImageViewer
        images={images.map((i) => ({ src: i.full, alt: i.alt }))}
        index={open}
        onIndex={setOpen}
        title={t(s.title)}
      />
    </section>
  );
}
