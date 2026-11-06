import { lab } from "../content/lab";
import { videoSources } from "../lib/media";
import "./BehanceMosaic.css";

/** Preview for the Behance row: a contact sheet of real Creative Lab posters. */
const posters = lab
  .filter((i) => i.media.kind === "video")
  .slice(0, 6)
  .map((i) => (i.media.kind === "video" ? videoSources(i.media.slug).poster : ""));

export function BehanceMosaic() {
  return (
    <div className="behance-mosaic">
      {posters.map((src) => (
        <img key={src} src={src} alt="" loading="lazy" decoding="async" />
      ))}
      <span className="behance-mosaic__mark">Bē</span>
    </div>
  );
}
