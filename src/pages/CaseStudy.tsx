import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { KollectLogo } from "../components/KollectLogo";
import { LabGrid } from "../components/lab/LabGrid";
import { Media } from "../components/Media";
import { WorkscapeDemo } from "../components/workscape/WorkscapeDemo";
import { previews } from "../content/previews";
import { projectBySlug, projects } from "../content/projects";
import { ui } from "../content/ui";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useI18n } from "../lib/i18n";
import { EASE, gsap, useGSAP } from "../lib/motion";
import NotFound from "./NotFound";
import "./CaseStudy.css";

type Capability = "nogl" | "weak" | null;

/** Cheap check before downloading ~60 MB of 3D models: no WebGL, or a software/very small GPU. */
function gpuCapability(): Capability {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return "nogl";
    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = ext ? String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL)) : "";
    if (/swiftshader|llvmpipe|software|basic render/i.test(renderer)) return "weak";
    const nav = navigator as Navigator & { deviceMemory?: number };
    if ((nav.deviceMemory && nav.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2)) return "weak";
    return null;
  } catch {
    return "nogl";
  }
}

/** Premium loading veil: the floor plan draws itself while the team "arrives". */
function LiveLoader({ steps }: { steps: string[] }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setN((v) => (v + 1) % steps.length), 1700);
    return () => clearInterval(id);
  }, [steps.length]);
  return (
    <div className="live-loader" role="status" aria-live="polite">
      <svg className="live-loader__plan" viewBox="0 0 200 120" aria-hidden="true">
        <g className="live-loader__walls" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path pathLength="1" d="M10 10H190V110H10Z" />
          <path pathLength="1" d="M70 10V44M70 60V110" />
          <path pathLength="1" d="M10 60H34M48 60H190" />
        </g>
        <g className="live-loader__desks" fill="none">
          {[0, 1, 2, 3].map((k) => (
            <rect key={`a${k}`} pathLength="1" x={84 + k * 26} y="24" width="16" height="8" rx="1.5" style={{ animationDelay: `${1.0 + k * 0.15}s` }} />
          ))}
          {[0, 1, 2, 3].map((k) => (
            <rect key={`b${k}`} pathLength="1" x={84 + k * 26} y="44" width="16" height="8" rx="1.5" style={{ animationDelay: `${1.5 + k * 0.15}s` }} />
          ))}
          <rect pathLength="1" x="22" y="24" width="34" height="14" rx="2" style={{ animationDelay: "1.1s" }} />
        </g>
        <g className="live-loader__people">
          <circle r="2.4" cx="0" cy="0">
            <animateMotion dur="7s" repeatCount="indefinite" path="M92 72 L130 72 L130 92 L170 92 L170 72 L92 72" />
          </circle>
          <circle r="2.4" cx="0" cy="0">
            <animateMotion dur="9s" repeatCount="indefinite" path="M170 92 L100 92 L100 72 L40 72 L40 92 L170 92" />
          </circle>
          <circle r="2.4" cx="0" cy="0">
            <animateMotion dur="8s" repeatCount="indefinite" path="M30 85 L30 100 L60 100 L60 85 L30 85" />
          </circle>
        </g>
      </svg>
      <p className="live-loader__title display">{steps[n]}</p>
      <span className="live-loader__bar" aria-hidden="true" />
    </div>
  );
}

/** The real app, running in the hero (no recording): the office lives on its own, in 3D and in 2D. */
function LiveHero({ hero }: { hero: Parameters<typeof Media>[0]["media"] }) {
  const { t } = useI18n();
  const preview = previews["workspace-3d"];
  const mq = "(max-width: 47.99rem)";
  const [narrow, setNarrow] = useState(() => typeof window !== "undefined" && window.matchMedia(mq).matches);
  // phones start in the light 2D office (a few MB); the heavy 3D models only download if they ask for 3D
  const [id, setId] = useState(() => (typeof window !== "undefined" && window.matchMedia(mq).matches ? "2d" : preview.views[0].id));
  const [touched, setTouched] = useState(false);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);
  const [late, setLate] = useState(false);
  const [force, setForce] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const cap = useMemo(() => (typeof document === "undefined" ? null : gpuCapability()), []);
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const view = preview.views.find((v) => v.id === id) ?? preview.views[0];
  const still = hero.kind === "image" ? hero.src : "";
  // 3D needs WebGL; a weak GPU slows both. The user can always override.
  const blocked = !force && (cap === "weak" || (cap === "nogl" && view.id === "3d"));

  // only download the app when the hero is close to the viewport
  useEffect(() => {
    const el = wrap.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    const m = window.matchMedia(mq);
    const on = () => setNarrow(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  // readiness + the zoom wheel handed back by the embedded app, so the page keeps scrolling
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const d = e.data as { o3dWheel?: number; o3dReady?: boolean } | null;
      if (typeof d?.o3dWheel === "number") window.scrollBy({ top: d.o3dWheel });
      if (d?.o3dReady && e.source === frame.current?.contentWindow) setReady(true);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const running = near && !blocked;
  useEffect(() => {
    setReady(false);
    setLate(false);
    if (!running) return;
    const timer = setTimeout(() => setLate(true), 30000);
    return () => clearTimeout(timer);
  }, [id, running, attempt]);

  const steps = [
    t({ pt: "Carregando o escritório…", en: "Loading the office…" }),
    t({ pt: "Montando a planta", en: "Laying out the floor plan" }),
    t({ pt: "Chamando a equipe", en: "Calling the team in" }),
    t({ pt: "Acendendo as luzes", en: "Switching the lights on" }),
  ];

  return (
    <div className="live-hero" ref={wrap}>
      <div className="live-hero__bar">
        <div className="live-hero__switch">
          <span className="live-hero__label label">{t({ pt: "Troque o ambiente", en: "Switch the environment" })}</span>
          <div className="live-hero__tabs" role="group" aria-label={t(preview.title)}>
            {preview.views.map((v) => (
              <button
                key={v.id}
                type="button"
                className={`live-hero__tab${!touched && v.id !== view.id ? " live-hero__tab--hint" : ""}`}
                aria-pressed={v.id === view.id}
                onClick={() => {
                  setId(v.id);
                  setTouched(true);
                }}
              >
                {v.id.toUpperCase()}
                <small>{t(v.label)}</small>
              </button>
            ))}
          </div>
        </div>
        <a className="live-hero__open" href={view.src} target="_blank" rel="noreferrer">
          {t(ui.workscape.liveOpen)}
        </a>
      </div>
      <div className="live-hero__stage">
        {running && <iframe key={`${view.id}-${attempt}`} ref={frame} className="live-hero__frame" src={`${view.src}&embed=1${narrow ? "&compact=1" : ""}`} title={`${t(preview.title)} — ${t(view.label)}`} allow="clipboard-write" />}
        <div className={`live-hero__veil${running && ready ? " is-hidden" : ""}`} aria-hidden={running && ready}>
          {still && <img className="live-hero__veil-img" src={still} alt="" />}
          <div className="live-hero__veil-shade" />
          {blocked ? (
            <div className="live-hero__notice" role="status">
              <p className="live-hero__notice-title display">
                {cap === "nogl" ? t({ pt: "O 3D precisa do WebGL", en: "3D needs WebGL" }) : t({ pt: "Este aparelho pode ficar lento", en: "This device may run slowly" })}
              </p>
              <p className="live-hero__notice-body">
                {cap === "nogl"
                  ? t({ pt: "Seu navegador não liberou a aceleração gráfica. O escritório 2D funciona sem ela.", en: "Your browser has no graphics acceleration. The 2D office works without it." })
                  : t({ pt: "Detectei pouca capacidade gráfica. O escritório é pesado: a imagem ao fundo mostra como ele fica.", en: "Low graphics capability detected. The office is heavy: the image behind shows how it looks." })}
              </p>
              <div className="live-hero__notice-actions">
                {cap === "nogl" && (
                  <button type="button" className="btn btn--solid" onClick={() => setId("2d")}>
                    {t({ pt: "Ver o escritório 2D", en: "See the 2D office" })}
                  </button>
                )}
                <button type="button" className="btn" onClick={() => setForce(true)}>
                  {t({ pt: "Carregar mesmo assim", en: "Load anyway" })}
                </button>
              </div>
            </div>
          ) : late && !ready ? (
            <div className="live-hero__notice" role="status">
              <p className="live-hero__notice-title display">{t({ pt: "Está demorando mais que o normal", en: "Taking longer than usual" })}</p>
              <p className="live-hero__notice-body">{t({ pt: "A conexão pode estar lenta. Você pode esperar ou tentar de novo.", en: "Your connection may be slow. You can wait or try again." })}</p>
              <div className="live-hero__notice-actions">
                <button type="button" className="btn btn--solid" onClick={() => setAttempt((a) => a + 1)}>
                  {t({ pt: "Tentar de novo", en: "Try again" })}
                </button>
              </div>
            </div>
          ) : (
            <LiveLoader steps={steps} />
          )}
        </div>
      </div>
      <p className="live-hero__note">{t(view.note)}</p>
      <p className="live-hero__touch">
        {view.id === "3d"
          ? t({ pt: "Toque num objeto para ver as opções; arraste para girar e use dois dedos para aproximar. Para continuar rolando a página, deslize fora do quadro.", en: "Tap an object for its options; drag to orbit and pinch to zoom. To keep scrolling the page, swipe outside the frame." })
          : t({ pt: "Toque no chão para andar, ou numa pessoa, TV ou impressora. Use + e − para o zoom. Para continuar rolando a página, deslize fora do quadro.", en: "Tap the floor to walk, or a person, TV or printer. Use + and − to zoom. To keep scrolling the page, swipe outside the frame." })}
        {narrow && view.id === "3d" ? " " + t({ pt: "O 3D baixa cerca de 60 MB.", en: "3D downloads about 60 MB." }) : ""}
      </p>
    </div>
  );
}

export default function CaseStudy() {
  const { slug = "" } = useParams();
  const project = projectBySlug(slug);
  if (!project) return <NotFound />;
  return <CaseStudyView key={slug} slug={slug} />;
}

function CaseStudyView({ slug }: { slug: string }) {
  const { t } = useI18n();
  const project = projectBySlug(slug)!;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const root = useRef<HTMLElement>(null);
  const [withSound, setWithSound] = useState(false);
  useDocumentTitle(project.title, t(project.summary));

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".case__title .line-mask > span", { yPercent: 105, "--w": 125, duration: 1.4, ease: EASE.reveal });
        gsap.from(".case__hero-media", { clipPath: "inset(18% 8% 0% 8%)", duration: 1.6, ease: EASE.reveal, delay: 0.15 });
        gsap.fromTo(
          ".case__next-title",
          { "--w": 62 },
          { "--w": 125, ease: "none", scrollTrigger: { trigger: ".case__next", start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  const style = {
    "--field": project.tone.field,
    "--ink": project.tone.ink,
    // Display titles are sized from their length so any project name fits the viewport.
    "--len": project.title.length,
    "--next-len": next.title.length,
  } as React.CSSProperties;
  // Workscape has no recordings yet: its interactive schematic takes the hero slot.
  const demoAsHero = slug === "workscape" && project.hero.kind === "placeholder";

  return (
    <main id="main" ref={root} className="case" style={style} tabIndex={-1}>
      <header className="case__head wrap">
        <p className="label">
          <Link to="/#work" className="sel-link">
            {t(ui.caseStudy.back)}
          </Link>
          <span aria-hidden="true"> / </span>
          {project.index}
        </p>
        <h1 className="case__title display">
          <span className="line-mask">
            <span>{project.title}</span>
          </span>
        </h1>
        <p className="case__line">{t(project.line)}</p>
      </header>

      <div className="case__hero-media wrap">
        {demoAsHero ? (
          <>
            <WorkscapeDemo />
            <p>
              <Link to="/work/workscape/live" className="btn btn--solid">
                {t(ui.workscape.liveCta)}
              </Link>
            </p>
          </>
        ) : slug === "workspace-3d" ? (
          <LiveHero hero={project.hero} />
        ) : withSound && project.hero.kind === "video" ? (
          <Media media={project.hero} mode="full" eager />
        ) : (
          <Media media={project.hero} mode="inview" eager />
        )}
        {project.hero.kind === "video" && !withSound && (
          <button type="button" className="btn case__sound" onClick={() => setWithSound(true)}>
            {t(ui.caseStudy.watch)}
          </button>
        )}
      </div>

      <section className="case__facts wrap" aria-label={t(ui.caseStudy.category)}>
        <p className="case__summary">{t(project.summary)}</p>
        <dl>
          <div>
            <dt className="label">{t(ui.caseStudy.category)}</dt>
            <dd>{t(project.category)}</dd>
          </div>
          <div>
            <dt className="label">{t(ui.caseStudy.role)}</dt>
            <dd>{t(project.role)}</dd>
          </div>
          <div>
            <dt className="label">{t(ui.caseStudy.tech)}</dt>
            <dd>{project.tech.join(", ")}</dd>
          </div>
          {project.links?.length ? (
            <div>
              <dt className="label">{t(ui.caseStudy.links)}</dt>
              <dd className="case__links">
                {project.links.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="sel-link">
                    {t(l.label)}
                  </a>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <section className="case__story wrap">
        {[
          { h: ui.caseStudy.problem, b: project.problem },
          { h: ui.caseStudy.solution, b: project.solution },
        ].map((s) => (
          <div key={s.h.pt} className="case__chapter">
            <h2 className="case__chapter-title display">{t(s.h)}</h2>
            <p className="case__chapter-body">{t(s.b)}</p>
          </div>
        ))}
      </section>

      {slug === "kollect" && (
        <section className="case__brand wrap">
          <div className="case__brand-logo">
            <KollectLogo />
          </div>
          <p className="case__brand-rule display">{t(ui.kollect.rule)}</p>
        </section>
      )}

      {project.features && (
        <section className="case__features wrap" aria-labelledby="features-title">
          <h2 id="features-title" className="label">
            {t(ui.caseStudy.features)}
          </h2>
          <ul>
            {project.features.map((f) => (
              <li key={f.pt}>{t(f)}</li>
            ))}
          </ul>
        </section>
      )}

      {slug === "acessanet" && (
        <section className="case__demo wrap">
          <Link to="/work/acessanet/live" className="btn btn--solid">
            {t(ui.acessanet.liveCta)}
          </Link>
        </section>
      )}

      {slug === "workspace-3d" && (
        <section className="case__demo wrap">
          <Link to="/work/workspace-3d/live" className="btn btn--solid">
            {t(ui.workspace3d.liveCta)}
          </Link>
        </section>
      )}

      {slug === "workscape" && !demoAsHero && (
        <section className="case__demo wrap" aria-labelledby="demo-title">
          <h2 id="demo-title" className="label">
            {t(ui.caseStudy.demo)}
          </h2>
          <WorkscapeDemo />
        </section>
      )}

      {slug === "creative-lab" && (
        <section className="case__lab wrap">
          <LabGrid />
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="case__gallery wrap" aria-labelledby="gallery-title">
          <h2 id="gallery-title" className="label">
            {t(ui.caseStudy.gallery)}
          </h2>
          <ul>
            {project.gallery.map((m, i) => (
              <li key={i} data-aspect={m.aspect}>
                <Media media={m} mode="inview" />
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link to={`/work/${next.slug}`} className="case__next wrap">
        <span className="label">{t(ui.caseStudy.next)}</span>
        <span className="case__next-title display">{next.title}</span>
      </Link>
    </main>
  );
}
