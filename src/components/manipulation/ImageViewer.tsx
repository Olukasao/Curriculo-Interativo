import { useEffect, useRef } from "react";
import { ui } from "../../content/ui";
import { useI18n } from "../../lib/i18n";
import { useScroller } from "../../lib/smoothScroll";

export type ViewerImage = { src: string; alt: string };

/** Full-screen image viewer with previous/next and arrow keys. */
export function ImageViewer({
  images,
  index,
  onIndex,
  title,
}: {
  images: ViewerImage[];
  index: number | null;
  onIndex: (i: number | null) => void;
  title: string;
}) {
  const { t } = useI18n();
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useScroller();
  const image = index === null ? null : images[index];
  const step = (d: number) => index !== null && onIndex((index + d + images.length) % images.length);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (image && !d.open) {
      d.showModal();
      scroller.stop();
    }
    if (!image && d.open) d.close();
  }, [image, scroller]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      scroller.start();
      onIndex(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    d.addEventListener("close", onClose);
    d.addEventListener("keydown", onKey);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("keydown", onKey);
    };
  });

  return (
    <dialog
      ref={dialog}
      className="image-viewer"
      aria-label={title}
      onClick={(e) => e.target === dialog.current && dialog.current?.close()}
    >
      {image && (
        <>
          <img key={image.src} src={image.src} alt={image.alt} className="image-viewer__img" />
          <div className="image-viewer__bar">
            <button type="button" className="sel-link" onClick={() => step(-1)}>
              {t(ui.manipulation.prev)}
            </button>
            <span className="label">
              {title} {index! + 1} / {images.length}
            </span>
            <button type="button" className="sel-link" onClick={() => step(1)}>
              {t(ui.manipulation.next)}
            </button>
            <button type="button" className="sel-link image-viewer__close" onClick={() => dialog.current?.close()} autoFocus>
              {t(ui.nav.close)}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
