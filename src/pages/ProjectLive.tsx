import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { previews } from "../content/previews";
import { ui } from "../content/ui";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useI18n } from "../lib/i18n";
import NotFound from "./NotFound";
import "./ProjectLive.css";

/** A real front end running in the browser against simulated data (see /demo in the repo). */
export default function ProjectLive() {
  const { slug = "" } = useParams();
  const { t } = useI18n();
  const preview = previews[slug];
  const [params] = useSearchParams();
  const [viewId, setViewId] = useState(params.get("view") ?? preview?.views[0].id);
  useDocumentTitle(preview ? t(preview.title) : undefined);
  if (!preview) return <NotFound />;
  const view = preview.views.find((v) => v.id === viewId) ?? preview.views[0];

  return (
    <div className="plive">
      <header className="plive__bar">
        <Link to={preview.back ?? `/work/${slug}`} className="plive__back">
          ← {t(ui.workscape.liveBack)}
        </Link>
        {preview.views.length > 1 ? (
          <div className="plive__tabs" role="group" aria-label={t(preview.title)}>
            {preview.views.map((v) => (
              <button key={v.id} type="button" className="plive__tab" aria-pressed={v.id === view.id} onClick={() => setViewId(v.id)}>
                {t(v.label)}
              </button>
            ))}
          </div>
        ) : null}
        <p className="plive__note">{t(view.note)}</p>
        <a className="plive__open" href={view.src} target="_blank" rel="noreferrer">
          {t(ui.workscape.liveOpen)}
        </a>
      </header>
      <p className="plive__narrow">{t(ui.workscape.liveNarrow)}</p>
      <main id="main" className={`plive__stage${view.phone ? " plive__stage--phone" : ""}`}>
        {view.phone ? (
          <div className="plive__phone">
            <iframe key={view.id} className="plive__frame" src={view.src} title={`${t(preview.title)} — ${t(view.label)}`} allow="clipboard-write" />
          </div>
        ) : (
          <iframe key={view.id} className="plive__frame" src={view.src} title={`${t(preview.title)} — ${t(view.label)}`} allow="clipboard-write" />
        )}
      </main>
    </div>
  );
}
