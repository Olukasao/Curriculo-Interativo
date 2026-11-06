import { Link } from "react-router-dom";
import { ui } from "../content/ui";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useI18n } from "../lib/i18n";

export default function NotFound() {
  const { t } = useI18n();
  useDocumentTitle(t(ui.notFound.title));
  return (
    <main id="main" className="wrap" style={{ minHeight: "100svh", display: "grid", alignContent: "center", gap: "1.5rem" }}>
      <h1 className="display" style={{ fontSize: "var(--t-chapter)", ["--w" as string]: 70 }}>
        404
      </h1>
      <p>{t(ui.notFound.body)}</p>
      <p>
        <Link to="/" className="btn">
          {t(ui.nav.home)}
        </Link>
      </p>
    </main>
  );
}
