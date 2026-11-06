import { lazy, Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AskLauncher } from "./components/ask/AskLauncher";
import { AskProvider } from "./components/ask/AskProvider";
import { Header } from "./components/Header";
import { ui } from "./content/ui";
import { useI18n } from "./lib/i18n";
import { ScrollTrigger } from "./lib/motion";
import { useScroller } from "./lib/smoothScroll";
import Home from "./pages/Home";

const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Route changes: jump to the hash target if any, otherwise to the top. */
function useRouteScroll() {
  const { pathname, hash } = useLocation();
  const scroller = useScroller();
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (hash) scroller.to(hash, { immediate: true });
      else scroller.to(0, { immediate: true });
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}

export default function App() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  useRouteScroll();
  const bare = pathname === "/cv";

  return (
    <AskProvider>
      <a className="skip-link" href="#main">
        {t(ui.skip)}
      </a>
      {!bare && <Header />}
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/cv" element={<Resume />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <AskLauncher />
    </AskProvider>
  );
}
