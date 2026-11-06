import { useEffect, useRef, useState } from "react";
import type { Media as MediaT } from "../content/types";
import { ui } from "../content/ui";
import { useI18n } from "../lib/i18n";
import { videoSources } from "../lib/media";
import { prefersReducedMotion } from "../lib/motion";
import "./Media.css";

type Mode =
  /** Silent preview; plays while `playing` is true (hover / focus / tap). */
  | "hover"
  /** Silent preview that plays while on screen. */
  | "inview"
  /** Full piece with sound and native controls. */
  | "full";

type Props = {
  media: MediaT;
  mode?: Mode;
  playing?: boolean;
  className?: string;
  /** Fill the parent instead of keeping the media's own aspect ratio. */
  cover?: boolean;
  /** Load as soon as mounted (above the fold). */
  eager?: boolean;
};

export function Media({ media, mode = "inview", playing, className = "", cover, eager }: Props) {
  const { t } = useI18n();
  const style = cover ? undefined : { aspectRatio: media.aspect };
  const cls = `media${cover ? " media--cover" : ""} ${className}`;

  if (media.kind === "placeholder") return <Placeholder media={media} className={cls} style={style} />;
  if (media.kind === "image") {
    return (
      <figure className={cls} style={style}>
        <img src={media.src} alt={t(media.alt)} loading={eager ? "eager" : "lazy"} decoding="async" />
      </figure>
    );
  }
  return <Video media={media} mode={mode} playing={playing} className={cls} style={style} eager={eager} />;
}

function Video({
  media,
  mode,
  playing,
  className,
  style,
  eager,
}: {
  media: Extract<MediaT, { kind: "video" }>;
  mode: Mode;
  playing?: boolean;
  className: string;
  style?: React.CSSProperties;
  eager?: boolean;
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLElement>(null);
  const [near, setNear] = useState(Boolean(eager));
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const src = videoSources(media.slug);

  // Attach the source only when the element approaches the viewport.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
        setVisible(entry.intersectionRatio >= 0.35);
      },
      { rootMargin: "300px 0px", threshold: [0, 0.35] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const shouldPlay =
    mode === "full" ? false : mode === "hover" ? Boolean(playing) && near : visible && near && !prefersReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v || mode === "full") return;
    if (shouldPlay) {
      v.play().then(
        () => setActive(true),
        () => setActive(false),
      );
    } else {
      v.pause();
      setActive(false);
    }
  }, [shouldPlay, mode]);

  const label = t(media.alt);

  if (mode === "full") {
    return (
      <figure ref={box} className={className} style={style}>
        <video
          ref={ref}
          src={near ? src.full : undefined}
          poster={src.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={label}
        />
      </figure>
    );
  }

  return (
    <figure ref={box} className={`${className}${active ? " is-playing" : ""}`} style={style}>
      <img className="media__poster" src={src.poster} alt={label} loading={eager ? "eager" : "lazy"} decoding="async" />
      <video
        ref={ref}
        className="media__video"
        src={near ? src.preview : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
    </figure>
  );
}

function Placeholder({
  media,
  className,
  style,
}: {
  media: Extract<MediaT, { kind: "placeholder" }>;
  className: string;
  style?: React.CSSProperties;
}) {
  const { t } = useI18n();
  return (
    <figure className={`${className} media--placeholder`} style={style} data-todo={media.todo}>
      <span className="media__ph-label">{t(media.label)}</span>
      <figcaption className="media__ph-note">
        {t(ui.lab.toAdd)}
        {import.meta.env.DEV && <span className="media__ph-todo">{media.todo}</span>}
      </figcaption>
    </figure>
  );
}
