import { Link } from "react-router-dom";
import { experience } from "../content/experience";
import { universes } from "../content/expertise";
import { links, profile } from "../content/profile";
import { projects } from "../content/projects";
import { ui } from "../content/ui";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useI18n } from "../lib/i18n";
import "./Resume.css";

/** The traditional résumé, generated from the same content as the site. Prints to A4. */
export default function Resume() {
  const { t, lang, setLang } = useI18n();
  useDocumentTitle(t(ui.nav.resume));

  const contacts = [
    links.email && { label: links.email, href: `mailto:${links.email}` },
    links.github && { label: links.github.replace(/^https?:\/\//, ""), href: links.github },
    links.behance && { label: links.behance.replace(/^https?:\/\/(www\.)?/, ""), href: links.behance },
    links.linkedin && { label: links.linkedin.replace(/^https?:\/\/(www\.)?/, ""), href: links.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="cv-shell">
      <nav className="cv-toolbar" aria-label={t(ui.nav.resume)}>
        <Link to="/" className="cv-btn">
          {t(ui.resume.back)}
        </Link>
        <span className="cv-toolbar__right">
          <button type="button" className="cv-btn" onClick={() => setLang(lang === "pt" ? "en" : "pt")}>
            {t(ui.nav.switchTo)}
          </button>
          {links.resumePdf ? (
            <a className="cv-btn cv-btn--solid" href={links.resumePdf} download>
              {t(ui.contact.resume)}
            </a>
          ) : (
            <button type="button" className="cv-btn cv-btn--solid" onClick={() => window.print()}>
              {t(ui.resume.print)}
            </button>
          )}
        </span>
      </nav>

      <main id="main" className="cv">
        <header className="cv__head">
          <h1 className="cv__name">{profile.name}</h1>
          <p className="cv__roles">{profile.roles.join(" / ")}</p>
          <ul className="cv__contacts">
            {contacts.map((c) => (
              <li key={c.href}>
                <a href={c.href}>{c.label}</a>
              </li>
            ))}
          </ul>
        </header>

        <section className="cv__section">
          <h2>{t(ui.resume.summary)}</h2>
          <div>
            <p>{t(profile.intro)}</p>
          </div>
        </section>

        <section className="cv__section">
          <h2>{t(ui.about.experience)}</h2>
          <div className="cv__entries">
            {experience.map((x) => (
              <article key={x.company}>
                <h3>
                  {x.company}
                  <span>
                    {t(x.role)}
                    {x.engagement ? ` (${t(x.engagement)})` : ""}
                    {x.period ? `, ${t(x.period)}` : ""}
                  </span>
                </h3>
                <p>{t(x.summary)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cv__section">
          <h2>{t(ui.resume.projects)}</h2>
          <div className="cv__entries">
            {projects.map((p) => (
              <article key={p.slug}>
                <h3>
                  {p.title}
                  <span>{t(p.category)}</span>
                </h3>
                <p>{t(p.line)}</p>
                <p className="cv__tech">{p.tech.join(", ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cv__section">
          <h2>{t(ui.resume.skills)}</h2>
          <div className="cv__entries">
            {universes.map((u) => (
              <article key={u.id}>
                <h3>{u.name}</h3>
                <p>{u.skills.map((s) => s.name + (s.note ? ` (${t(s.note)})` : "")).join(", ")}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cv__section">
          <h2>{t(ui.about.education)}</h2>
          <div className="cv__entries">
            {profile.education.map((e) => (
              <article key={e.title.pt}>
                <h3>
                  {t(e.title)}
                  <span>
                    {e.place ? `${e.place}, ` : ""}
                    {t(e.status)}
                  </span>
                </h3>
              </article>
            ))}
          </div>
        </section>

        <section className="cv__section">
          <h2>{t(ui.about.languages)}</h2>
          <p>{profile.languages.map((l) => `${t(l.name)} (${t(l.level).toLowerCase()})`).join(", ")}</p>
        </section>
      </main>
    </div>
  );
}
