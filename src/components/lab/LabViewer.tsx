import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { labCategories } from "../../content/lab";
import { links } from "../../content/profile";
import type { LabItem } from "../../content/types";
import { ui } from "../../content/ui";
import { useI18n } from "../../lib/i18n";
import { useScroller } from "../../lib/smoothScroll";
import { Media } from "../Media";

/** Expanded view of a Creative Lab piece: the full film with sound, and its notes. */
export function LabViewer({ items, index, onIndex }: { items: LabItem[]; index: number | null; onIndex: (i: number | null) => void }) {
  const { t, lang } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useScroller();
  const item = index === null ? null : items[index];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (item && !d.open) {
      d.showModal();
      scroller.stop();
    }
    if (!item && d.open) d.close();
  }, [item, scroller]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      scroller.start();
      onIndex(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (index === null) return;
      if (e.key === "ArrowRight") onIndex((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + items.length) % items.length);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onIndex, scroller]);

  const prev = lang === "pt" ? "Anterior" : "Previous";
  const next = lang === "pt" ? "Próximo" : "Next";

  return (
    <dialog
      ref={dialog}
      className="lab-viewer"
      aria-labelledby="lab-viewer-title"
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
    >
      {item && (
        <div className="lab-viewer__inner">
          <div className="lab-viewer__stage">
            <Media key={item.id} media={item.media} mode="full" eager />
          </div>
          <aside className="lab-viewer__info">
            <div className="lab-viewer__nav">
              <button type="button" className="sel-link" onClick={() => onIndex((index! - 1 + items.length) % items.length)}>
                {prev}
              </button>
              <span className="label" aria-live="polite">
                {index! + 1} / {items.length}
              </span>
              <button type="button" className="sel-link" onClick={() => onIndex((index! + 1) % items.length)}>
                {next}
              </button>
              <button type="button" className="sel-link lab-viewer__close" onClick={() => dialog.current?.close()} autoFocus>
                {t(ui.nav.close)}
              </button>
            </div>
            <h2 id="lab-viewer-title" className="lab-viewer__title">
              {item.title}
            </h2>
            <p>{t(item.description)}</p>
            <dl className="lab-viewer__facts">
              {item.client && (
                <>
                  <dt>{t(ui.lab.client)}</dt>
                  <dd>{item.client}</dd>
                </>
              )}
              <dt>{t(ui.caseStudy.category)}</dt>
              <dd>{item.categories.map((c) => t(labCategories.find((x) => x.id === c)!.label)).join(", ")}</dd>
            </dl>
            <div className="lab-viewer__links">
              {item.project && (
                <Link to={`/work/${item.project}`} className="btn" onClick={() => dialog.current?.close()}>
                  {t(ui.lab.relatedCase)}
                </Link>
              )}
              {links.behance && (
                <a href={links.behance} target="_blank" rel="noreferrer" className="btn">
                  {t(ui.lab.behance)}
                </a>
              )}
            </div>
          </aside>
        </div>
      )}
    </dialog>
  );
}
