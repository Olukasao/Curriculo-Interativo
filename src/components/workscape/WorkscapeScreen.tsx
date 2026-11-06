import { forwardRef } from "react";
import { workscapeModules } from "../../content/projects";
import { Media } from "../Media";
import "./WorkscapeScreen.css";

/** Logical size of the schematic. Regions are laid out in these units. */
export const SCREEN = { w: 1440, h: 900 } as const;

/** Region rectangles, keyed by module id. */
export const REGIONS: Record<string, { x: number; y: number; w: number; h: number }> = {
  chat: { x: 200, y: 56, w: 520, h: 504 },
  ai: { x: 720, y: 56, w: 720, h: 504 },
  agents: { x: 200, y: 560, w: 520, h: 340 },
  ops: { x: 720, y: 560, w: 380, h: 340 },
  admin: { x: 1100, y: 560, w: 340, h: 170 },
  integrations: { x: 1100, y: 730, w: 340, h: 170 },
};

const sideItems = ["Chat", "IA", "Automações", "Dashboard", "Agenda", "Usuários", "Arquivos", "Conhecimento", "Integrações"];

/**
 * A schematic of Workscape's workspace — not a screenshot. Every region is one of the
 * modules listed in the brief; text is drawn as bars so nothing is invented.
 * When a module has real `media`, that recording replaces the drawing for its region.
 */
export const WorkscapeScreen = forwardRef<HTMLDivElement, { active?: string | null }>(function WorkscapeScreen(
  { active = null },
  ref,
) {
  const media = Object.fromEntries(workscapeModules.map((m) => [m.id, m.media]));
  const cls = (id: string) => `ws-region ws-${id}${active === id ? " is-active" : ""}${active && active !== id ? " is-dim" : ""}`;
  const at = (id: string) => {
    const r = REGIONS[id];
    return { left: r.x, top: r.y, width: r.w, height: r.h };
  };

  return (
    <div ref={ref} className="ws-screen" aria-hidden="true">
      <div className="ws-top">
        <span className="ws-logo">Workscape</span>
        <span className="ws-search" />
        <span className="ws-avatar" />
      </div>

      <div className="ws-side">
        {sideItems.map((s, i) => (
          <span key={s} className={`ws-side__item${i === 0 ? " is-on" : ""}`}>
            <i />
            {s}
          </span>
        ))}
      </div>

      <section className={cls("chat")} style={at("chat")} data-region="chat">
        {media.chat ? (
          <Media media={media.chat} cover />
        ) : (
          <>
            <header className="ws-head">
              Chat <em># equipe</em>
            </header>
            <div className="ws-chat">
              {[62, 40, 75, 30, 55, 68].map((w, i) => (
                <div key={i} className={`ws-msg${i % 3 === 2 ? " is-me" : ""}`} style={{ animationDelay: `${i * 0.6}s` }}>
                  <span className="ws-dot" />
                  <span className="ws-bars">
                    <b style={{ width: `${w}%` }} />
                    {w > 50 && <b style={{ width: `${w - 25}%` }} />}
                  </span>
                </div>
              ))}
            </div>
            <div className="ws-input">
              <span />
              <span className="ws-file">arquivo</span>
            </div>
          </>
        )}
      </section>

      <section className={cls("ai")} style={at("ai")} data-region="ai">
        {media.ai ? (
          <Media media={media.ai} cover />
        ) : (
          <>
            <header className="ws-head">
              Assistente <em>IA</em>
            </header>
            <div className="ws-ai">
              <div className="ws-ai__q">
                <b style={{ width: "46%" }} />
              </div>
              <div className="ws-ai__a">
                <span className="ws-ai__mark">IA</span>
                <span className="ws-bars">
                  <b style={{ width: "92%" }} />
                  <b style={{ width: "84%" }} />
                  <b style={{ width: "88%" }} />
                  <b className="ws-typing" style={{ width: "52%" }} />
                </span>
              </div>
              <div className="ws-ai__ctx">
                <span>Base de conhecimento</span>
                <span>Agenda</span>
                <span>Usuários</span>
              </div>
            </div>
            <div className="ws-input ws-input--ai">
              <span />
            </div>
          </>
        )}
      </section>

      <section className={cls("agents")} style={at("agents")} data-region="agents">
        {media.agents ? (
          <Media media={media.agents} cover />
        ) : (
          <>
            <header className="ws-head">Automações</header>
            <div className="ws-flow">
              <span className="ws-node">Gatilho</span>
              <span className="ws-wire" />
              <span className="ws-node ws-node--agent">Agente</span>
              <span className="ws-wire" />
              <span className="ws-node">Mensagem</span>
            </div>
            <div className="ws-runs">
              {[0, 1, 2].map((i) => (
                <span key={i}>
                  <i />
                  <b style={{ width: `${70 - i * 15}%` }} />
                </span>
              ))}
            </div>
          </>
        )}
      </section>

      <section className={cls("ops")} style={at("ops")} data-region="ops">
        {media.ops ? (
          <Media media={media.ops} cover />
        ) : (
          <>
            <header className="ws-head">Dashboard · Agenda técnica</header>
            <div className="ws-ops">
              <div className="ws-chart">
                {[40, 65, 50, 80, 58, 72, 46].map((h, i) => (
                  <span key={i} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="ws-cal">
                {Array.from({ length: 21 }, (_, i) => (
                  <span key={i} className={[3, 8, 9, 15].includes(i) ? "is-on" : ""} />
                ))}
              </div>
            </div>
          </>
        )}
      </section>

      <section className={cls("admin")} style={at("admin")} data-region="admin">
        {media.admin ? (
          <Media media={media.admin} cover />
        ) : (
          <>
            <header className="ws-head">Permissões</header>
            <div className="ws-perms">
              {[0, 1, 2].map((i) => (
                <span key={i}>
                  <i />
                  <b />
                  <u className={i !== 1 ? "is-on" : ""} />
                </span>
              ))}
            </div>
          </>
        )}
      </section>

      <section className={cls("integrations")} style={at("integrations")} data-region="integrations">
        {media.integrations ? (
          <Media media={media.integrations} cover />
        ) : (
          <>
            <header className="ws-head">Integrações</header>
            <div className="ws-apis">
              <span>API</span>
              <i />
              <span className="is-core">WS</span>
              <i />
              <span>API</span>
            </div>
          </>
        )}
      </section>
    </div>
  );
});
