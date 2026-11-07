// Demonstração do painel Agenda de Técnicos: o front-end original roda no navegador, sem servidor.
// `io` e `fetch` são simulados aqui, com dados 100% fictícios.
import { agendaDoDia, tecnicos as tecs, usuarios } from "./fixtures";
import * as h from "./fixtures3";

const hoje = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
const primeiros = tecs.map((t) => t.nome.split(" ")[0]);
const POP = ["Franco da Rocha", "Caieiras", "Francisco Morato"];
const CORES_EQUIPE = ["azul", "verde", "roxo", "laranja", "vermelho", "cinza"];

// Almoços e pausas (bloqueios de horário), equipes e ausências do dia, tudo fictício.
const bloqueios = (data: string) => {
  const out: any[] = [];
  let id = 1;
  primeiros.forEach((nome, i) => {
    const almocoIni = 12 * 60 + (i % 4) * 30;
    const hm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
    out.push({ id: id++, tecnicoId: nome, data, tipo: "almoco", descricao: "", horaInicio: hm(almocoIni), horaFim: hm(almocoIni + 60) });
    out.push({ id: id++, tecnicoId: nome, data, tipo: "outro", descricao: "Pausa para café", horaInicio: "15:30", horaFim: "15:45" });
    if (i % 5 === 1) out.push({ id: id++, tecnicoId: nome, data, tipo: "reuniao", descricao: "Alinhamento com a coordenação", horaInicio: "09:00", horaFim: "09:30" });
    if (i % 6 === 3) out.push({ id: id++, tecnicoId: nome, data, tipo: "treinamento", descricao: "Treinamento de fibra óptica", horaInicio: "14:00", horaFim: "15:00" });
    if (i % 7 === 4) out.push({ id: id++, tecnicoId: nome, data, tipo: "compromisso", descricao: "Consulta médica", horaInicio: "10:00", horaFim: "11:00" });
  });
  return out;
};
const equipes = (data: string) =>
  primeiros.map((nome, i) => ({ id: i + 1, technician_id: nome, team_date: data, team_color: CORES_EQUIPE[Math.floor(i / 2) % CORES_EQUIPE.length] }));
const ausencias = (data: string) => [
  { id: 1, technician_id: primeiros[9], absence_date: data, absence_reason: "Férias", absence_note: "Férias até o fim da semana" },
  { id: 2, technician_id: primeiros[11], absence_date: data, absence_reason: "Atestado", absence_note: "Atestado médico de 1 dia" },
];

const agendaItens = (data: string) =>
  (agendaDoDia(data) as any[]).map((o, i) => ({
    ...o,
    status: o.status === "Agendada" ? "Aberta" : o.status,
    pop: POP[i % 3],
    hora: o.hora,
  }));

type Fn = (...a: any[]) => void;
class Sock {
  connected = false;
  id = "demo";
  private h = new Map<string, Fn[]>();
  on(ev: string, fn: Fn) { (this.h.get(ev) ?? this.h.set(ev, []).get(ev)!).push(fn); if (ev === "connect" && this.connected) setTimeout(fn, 0); return this; }
  off() { return this; }
  once(ev: string, fn: Fn) { return this.on(ev, fn); }
  fire(ev: string, ...a: any[]) { (this.h.get(ev) || []).forEach((f) => { try { f(...a); } catch (e) { console.error(e); } }); }
  emit(ev: string, ...a: any[]) {
    if (ev === "filtrarData") {
      const d = String(a[0] || hoje());
      setTimeout(() => this.fire("agenda", agendaItens(d)), 250);
    }
    return this;
  }
  connect() { return this; }
  disconnect() { return this; }
}
const instancias: Sock[] = [];
(window as any).io = () => {
  const s = new Sock();
  instancias.push(s);
  setTimeout(() => { s.connected = true; s.fire("connect"); }, 30);
  return s;
};

const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
const ok = () => json({ ok: true });

const coordenador = (data: string) => {
  const c: any = h.coordenadorRota(data);
  c.chamados = c.chamados.map((x: any, i: number) => ({
    ...x, possuiLocalizacao: true, prioridade: i % 7 === 3 ? "critica" : "normal", tecnicoAtualId: x.tecnicoId, tecnicoDesignadoId: x.tecnicoId,
    ordemAtendimento: (i % 3) + 1, nomeCliente: x.cliente,
  }));
  c.localizacaoResumo = { comLocalizacao: c.chamados.length, semLocalizacao: 0, suspeitos: 0 };
  return c;
};

const segunda = () => {
  const d = new Date(); const dow = (d.getDay() + 6) % 7; d.setDate(d.getDate() - dow);
  return d.toISOString().slice(0, 10);
};
const horarios = (weekStart?: string | null) => {
  const pessoas = tecs.map((t) => ({ id: t.id, technicianId: t.id, name: t.nome.split(" ")[0] }));
  const turno = (id: string, name: string, startTime: string, endTime: string, lista: typeof pessoas, order: number, next: string) => ({
    id, name, startTime, endTime, sortOrder: order, active: true, nextShiftId: next, nextShiftName: "", rotationGroups: [],
    technicians: lista.map((t, i) => ({ ...t, shiftId: id, source: "rotation", sortOrder: i + 1, active: true })),
  });
  return {
    weekStart: weekStart || segunda(), cyclePosition: 0, cycleLength: 1, rotationGroups: [], rotationWarnings: [], availableTechnicians: pessoas,
    shifts: [turno("manha", "Manhã", "08:00", "17:00", pessoas.slice(0, 5), 1, "tarde"), turno("tarde", "Tarde", "12:00", "21:00", pessoas.slice(5, 9), 2, "noite"), turno("noite", "Noite", "16:00", "23:59", pessoas.slice(9), 3, "manha")],
  };
};

function rota(url: URL, method: string): Response | null {
  const p = url.pathname;
  const q = url.searchParams;
  const data = q.get("data") || q.get("date") || hoje();
  if (method !== "GET") return p === "/api/agenda-tecnicos/horarios-semana" ? json(horarios()) : ok();
  if (p === "/api/agenda-tecnicos/tecnicos") return json({ tecnicos: primeiros });
  if (p === "/api/technician-absences") return json({ absences: ausencias(data) });
  if (p === "/api/technician-team-colors") return json({ teamColors: equipes(data) });
  if (p === "/api/agenda-tecnicos/almocos") return json({ almocos: bloqueios(data), permissoes: { canManage: true } });
  if (p === "/api/tecnico-responsaveis-servicos") return json({ responsaveis: primeiros.map((n, i) => ({ tecnico_id: n, responsavel_nome: ["Marina", "Rafael", "Beatriz", "Diego", "Camila", "Paulo"][i % 6] })) });
  if (p === "/api/agenda-tecnicos/chat-interno/usuarios") return json({ usuarios: usuarios.map((u) => ({ id: u.id, nome: u.nome, email: u.email, setor_nome: u.setor_nome, avatar: null })) });
  if (p === "/api/agenda-tecnicos/coordenador-rota") return json(coordenador(data));
  if (p === "/api/agenda-tecnicos/coordenador-rota/posicoes-tempo-real") return json(h.posicoesTempoReal(data));
  if (p === "/api/agenda-tecnicos/coordenador-rota/pontos-fixos") return json({ pontos: h.coordenadorRota(data).pontosFixos, pontosFixos: h.coordenadorRota(data).pontosFixos });
  if (p === "/api/agenda-tecnicos/coordenador-rota/desenhos") return json({ desenhos: [] });
  if (p === "/api/agenda-tecnicos/horarios-semana") return json(horarios(q.get("weekStart")));
  if (p === "/api/agenda-tecnicos/mapa-chamados") return json(h.mapaChamados());
  if (p === "/api/agenda-tecnicos/impacto-bairros") return json({ chamados: agendaItens(data) });
  if (p === "/api/agenda-tecnicos/massivos/historico") return json({ total: 0, massivos: [], periodo: { dataInicio: data, dataFim: data } });
  return json({});
}

const nativo = window.fetch.bind(window);
window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  const href = typeof input === "string" ? input : input instanceof URL ? input.href : (input as Request).url;
  const url = new URL(href, location.href);
  const local = url.origin === location.origin || url.port === "8600";
  if (local && (url.pathname.startsWith("/api/") || url.port === "8600")) {
    const r = rota(url, (init?.method || "GET").toUpperCase());
    if (r) return new Promise((res) => setTimeout(() => res(r), 80));
  }
  return nativo(input as any, init);
};
export {};

// Tela de acesso de demonstração: o painel original recebe a sessão do Chat Interno, sem tela própria.
if (!location.search.includes("auto")) {
  const montar = () => {
    const box = document.createElement("div");
    box.id = "demo-login";
    box.innerHTML = `
      <form class="demo-login__card" autocomplete="off">
        <div class="demo-login__brand"><img src="./imgs/logo.svg" alt="" width="140"/></div>
        <h1>Agenda de Técnicos</h1>
        <p>Entre com a conta do Chat Interno para acompanhar a operação.</p>
        <label>E-mail corporativo<input type="email" value="demo@nexa.example" required /></label>
        <label>Senha<input type="password" value="demo1234" required /></label>
        <button type="submit">Entrar na agenda →</button>
        <small>Demonstração: qualquer credencial funciona e os dados são fictícios.</small>
      </form>`;
    const st = document.createElement("style");
    st.textContent = `#demo-login{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;background:radial-gradient(circle at 20% 20%,#12214a,#050b1f 60%);font-family:Inter,system-ui,sans-serif;color:#e6ecff}
    .demo-login__card{width:min(380px,92vw);display:grid;gap:14px;padding:28px;border:1px solid #1f3566;border-radius:18px;background:rgba(10,18,42,.92);box-shadow:0 30px 80px rgba(0,0,0,.55)}
    .demo-login__card h1{margin:0;font-size:22px}.demo-login__card p{margin:0;font-size:13px;opacity:.7}
    .demo-login__card label{display:grid;gap:6px;font-size:12px;font-weight:600;opacity:.9}
    .demo-login__card input{padding:11px 12px;border-radius:10px;border:1px solid #243a73;background:#070e24;color:#fff;font:inherit}
    .demo-login__card button{padding:12px;border:0;border-radius:10px;background:linear-gradient(135deg,#2f6bff,#22b8ff);color:#fff;font-weight:700;cursor:pointer;font:inherit;font-weight:700}
    .demo-login__card small{font-size:11px;opacity:.55}`;
    document.head.appendChild(st);
    document.body.appendChild(box);
    box.querySelector("form")!.addEventListener("submit", (e) => { e.preventDefault(); box.remove(); });
  };
  if (document.body) montar(); else document.addEventListener("DOMContentLoaded", montar);
}
