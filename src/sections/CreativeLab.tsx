import { LabGrid } from "../components/lab/LabGrid";
import { links } from "../content/profile";
import { projectBySlug } from "../content/projects";
import { ui } from "../content/ui";
import { useCanHover } from "../hooks/useMedia";
import { useI18n } from "../lib/i18n";
import "./CreativeLab.css";

const project = projectBySlug("creative-lab")!;

export function CreativeLab() {
  const { t } = useI18n();
  const canHover = useCanHover();
  return (
    <section id="lab" className="creative-lab section wrap" aria-labelledby="lab-title">
      <header className="creative-lab__head">
        <p className="label">
          {project.index} / {t(project.category)}
        </p>
        <h2 id="lab-title" className="creative-lab__title display">
          {t(ui.lab.heading)}
        </h2>
        <p className="creative-lab__intro">{canHover ? t(ui.lab.intro) : t(ui.lab.introTouch)}</p>
        {links.behance && (
          <a href={links.behance} target="_blank" rel="noreferrer" className="sel-link creative-lab__behance">
            {t(ui.lab.behance)}
          </a>
        )}
      </header>
      <LabGrid />
    </section>
  );
}
