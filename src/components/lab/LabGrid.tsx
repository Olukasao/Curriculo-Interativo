import { useMemo, useState } from "react";
import { lab, labCategories } from "../../content/lab";
import type { LabCategory, LabItem } from "../../content/types";
import { ui } from "../../content/ui";
import { useCanHover } from "../../hooks/useMedia";
import { useI18n } from "../../lib/i18n";
import { Media } from "../Media";
import { LabViewer } from "./LabViewer";
import "./Lab.css";

export function LabGrid({ items = lab }: { items?: LabItem[] }) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<LabCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const present = useMemo(() => labCategories.filter((c) => items.some((i) => i.categories.includes(c.id))), [items]);
  const shown = filter === "all" ? items : items.filter((i) => i.categories.includes(filter));

  return (
    <div className="lab">
      <div className="lab__filters" role="group" aria-label={t(ui.lab.filter)}>
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          {t(ui.lab.all)}
          <sup>{items.length}</sup>
        </button>
        {present.map((c) => (
          <button key={c.id} type="button" aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>
            {t(c.label)}
            <sup>{items.filter((i) => i.categories.includes(c.id)).length}</sup>
          </button>
        ))}
      </div>

      <ul className="lab__grid" key={filter}>
        {shown.map((item, i) => (
          <li key={item.id} className="lab__cell" style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}>
            <LabCard item={item} onOpen={() => setOpen(i)} />
          </li>
        ))}
      </ul>

      <LabViewer items={shown} index={open} onIndex={setOpen} />
    </div>
  );
}

function LabCard({ item, onOpen }: { item: LabItem; onOpen: () => void }) {
  const { t } = useI18n();
  const canHover = useCanHover();
  const [hover, setHover] = useState(false);
  const cats = item.categories
    .map((c) => labCategories.find((x) => x.id === c))
    .filter(Boolean)
    .map((c) => t(c!.label))
    .join(", ");

  return (
    <button
      type="button"
      className="lab-card"
      onClick={onOpen}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <span className="lab-card__media">
        <Media media={item.media} mode={canHover ? "hover" : "inview"} playing={hover} />
      </span>
      <span className="lab-card__text">
        <span className="lab-card__title">{item.title}</span>
        <span className="lab-card__meta">{cats}</span>
      </span>
    </button>
  );
}
