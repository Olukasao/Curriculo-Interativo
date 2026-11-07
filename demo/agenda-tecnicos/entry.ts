// Demonstração do painel Agenda de Técnicos: o front-end original roda no navegador, sem servidor.
// `io` e `fetch` são simulados aqui, com dados 100% fictícios.
import { agendaDoDia, tecnicos as tecs, usuarios } from "./fixtures";
import * as h from "./fixtures3";

const hoje = () => new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
const primeiros = tecs.map((t) => t.nome.split(" ")[0]);
const POP = ["Franco da Rocha", "Caieiras", "Francisco Morato"];

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
    shifts: [turno("manha", "Manhã", "08:00", "17:00", pessoas.slice(0, 3), 1, "tarde"), turno("tarde", "Tarde", "12:00", "21:00", pessoas.slice(3), 2, "manha")],
  };
};

function rota(url: URL, method: string): Response | null {
  const p = url.pathname;
  const q = url.searchParams;
  const data = q.get("data") || q.get("date") || hoje();
  if (method !== "GET") return p === "/api/agenda-tecnicos/horarios-semana" ? json(horarios()) : ok();
  if (p === "/api/agenda-tecnicos/tecnicos") return json({ tecnicos: primeiros });
  if (p === "/api/technician-absences") return json({ absences: [] });
  if (p === "/api/technician-team-colors") return json({ teamColors: [] });
  if (p === "/api/agenda-tecnicos/almocos") return json({ almocos: [], permissoes: { canManage: true } });
  if (p === "/api/tecnico-responsaveis-servicos") return json({ responsaveis: {} });
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
