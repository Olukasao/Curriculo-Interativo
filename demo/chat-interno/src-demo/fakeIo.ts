// Substitui socket.io-client na demonstração: nada conecta à rede, o "servidor" é simulado aqui.
import * as f from "./fixtures";

type Fn = (...a: any[]) => void;
const live = new Set<FakeSocket>();

class FakeSocket {
  connected = false;
  id = "demo-" + Math.random().toString(36).slice(2, 8);
  auth: unknown = {};
  io: any = { opts: {}, engine: { transport: { name: "websocket" } }, on() { return this; }, off() { return this; } };
  private handlers = new Map<string, Set<Fn>>();
  private timers: ReturnType<typeof setTimeout>[] = [];
  constructor(public url: string, public path: string) {
    live.add(this);
  }
  on(ev: string, fn: Fn) { (this.handlers.get(ev) ?? this.handlers.set(ev, new Set()).get(ev)!).add(fn); return this; }
  once(ev: string, fn: Fn) { const w: Fn = (...a) => { this.off(ev, w); fn(...a); }; return this.on(ev, w); }
  off(ev?: string, fn?: Fn) { if (!ev) this.handlers.clear(); else if (fn) this.handlers.get(ev)?.delete(fn); else this.handlers.delete(ev); return this; }
  removeAllListeners() { this.handlers.clear(); return this; }
  listeners(ev: string) { return [...(this.handlers.get(ev) ?? [])]; }
  hasListeners(ev: string) { return (this.handlers.get(ev)?.size ?? 0) > 0; }
  fire(ev: string, ...a: any[]) { this.handlers.get(ev)?.forEach((fn) => { try { fn(...a); } catch (e) { console.error(e); } }); }
  later(ms: number, fn: () => void) { this.timers.push(setTimeout(fn, ms)); }
  connect() {
    if (this.connected) return this;
    this.later(40, () => {
      this.connected = true;
      this.fire("connect");
      this.onConnected();
    });
    return this;
  }
  disconnect() { this.timers.forEach(clearTimeout); this.timers = []; if (this.connected) { this.connected = false; this.fire("disconnect", "io client disconnect"); } return this; }
  close() { return this.disconnect(); }
  get isDashboard() { return this.url.includes("dashboard.demo"); }
  get isAgenda() { return this.url.includes("agenda.demo"); }
  private onConnected() {
    if (this.isDashboard) {
      this.fire("update", f.painelNoc());
      this.fire("clientes", f.clientesBase());
      const t = setInterval(() => { if (this.connected) this.fire("update", f.painelNoc()); }, 15000);
      this.timers.push(t as any);
    }
  }
  emit(ev: string, ...args: any[]) {
    const p = args[0];
    if (this.isAgenda && ev === "filtrarData") {
      const date = String(p);
      this.later(150, () => this.fire("agenda", { date, items: f.agendaDoDia(date) }));
    } else if (ev === "send_direct_message") {
      const id = Number(p?.usuario_id);
      const pool = f.respostasContato[id] || ["Ok!"];
      this.later(900, () => live.forEach((s) => s.fire("user_typing_direct", { usuario_id: id, conversa_id: p.conversa_id })));
      this.later(2400, () => {
        const m = {
          id: 9000 + Math.floor(Math.random() * 90000), conversa_id: p.conversa_id, remetente_id: id,
          remetente_nome: f.usuarios.find((u) => u.id === id)?.nome || "Contato", mensagem: pool[Math.floor(Math.random() * pool.length)],
          tipo_mensagem: "texto", criada_em: new Date().toISOString(), reacoes: [], destinatario_id: 1, usuario_id: 1,
        };
        live.forEach((s) => { s.fire("user_stop_typing_direct", { usuario_id: id, conversa_id: p.conversa_id }); s.fire("receive_direct_message", m); });
      });
    }
    if (ev === "send_group_message") {
      const gid = Number(p?.grupo_id);
      const outros = f.membrosGrupo(gid).filter((u: any) => u.id !== 1);
      const autor: any = outros[Math.floor(Math.random() * outros.length)] || f.usuarios[0];
      const pool = ["Beleza, anotado!", "Boa, obrigado por avisar 👍", "Combinado. Qualquer coisa falo aqui.", "Perfeito!"];
      this.later(1000, () => live.forEach((s) => s.fire("user_typing_group", { usuario_id: autor.id, usuario_nome: autor.nome, grupo_id: gid })));
      this.later(2600, () => {
        const m = {
          id: 9000 + Math.floor(Math.random() * 90000), grupo_id: gid, remetente_id: autor.id, remetente_nome: autor.nome,
          mensagem: pool[Math.floor(Math.random() * pool.length)], tipo_mensagem: "texto", criada_em: new Date().toISOString(), reacoes: [], mencoes: [],
        };
        live.forEach((s) => { s.fire("user_stop_typing_group", { usuario_id: autor.id, grupo_id: gid }); s.fire("receive_group_message", m); });
      });
    }
    return this;
  }
}

export const io = (url?: any, opts: any = {}) => {
  const s = new FakeSocket(typeof url === "string" ? url : "", opts?.path || "/socket.io");
  if (opts?.autoConnect !== false) s.connect();
  return s;
};
export const Manager = class {};
export default io;
export type Socket = FakeSocket;
