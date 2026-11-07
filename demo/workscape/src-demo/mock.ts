import type { AxiosAdapter, InternalAxiosRequestConfig } from "axios";
import * as f from "./fixtures";
import * as g from "./fixtures2";
import * as h from "./fixtures3";

type Ctx = { path: string; method: string; params: Record<string, string>; body: any; match: RegExpMatchArray };
type Handler = (c: Ctx) => unknown;

let nextId = 5000;
const extra = {
  direta: {} as Record<number, any[]>,
  grupo: {} as Record<number, any[]>,
  lembretes: g.lembretesIniciais() as any[],
  memorias: [] as { id: number; texto: string; origem: string; criada_em: string }[],
  notas: [] as any[],
};

const routes: [string, RegExp, Handler][] = [
  ["POST", /^\/login$/, () => ({ token: "demo-token", user: f.me })],
  ["GET", /^\/me$/, () => f.me],
  ["GET", /^\/me\/quick-access$/, () => ({ available: [], items: [] })],
  ["GET", /^\/chat\/usuarios$/, () => f.usuarios],
  ["GET", /^\/chat\/conversas-diretas$/, () => f.conversas],
  ["GET", /^\/chat\/grupos$/, () => f.grupos],
  ["GET", /^\/chat\/grupo\/(\d+)\/membros$/, ({ match }) => f.membrosGrupo(Number(match[1]))],
  ["GET", /^\/chat\/conversa-direta\/(\d+)$/, ({ match }) => {
    const uid = Number(match[1]);
    const base = f.mensagensDiretas[uid] || [];
    return { conversa_id: 100 + uid, mensagens: [...base, ...(extra.direta[uid] || [])], pinned_message: f.fixadaDireta[uid] || null };
  }],
  ["GET", /^\/chat\/grupo\/(\d+)$/, ({ match }) => {
    const gid = Number(match[1]);
    return { mensagens: [...(f.mensagensGrupo[gid] || []), ...(extra.grupo[gid] || [])], pinned_message: null };
  }],
  ["POST", /^\/chat\/enviar-direto$/, ({ body }) => {
    const m = {
      id: nextId++, conversa_id: 100 + body.usuario_id, remetente_id: 1, remetente_nome: f.me.nome, mensagem: body.mensagem,
      tipo_mensagem: body.tipo_mensagem || "texto", criada_em: new Date().toISOString(), lida: false, status: "enviada", reacoes: [],
    };
    (extra.direta[body.usuario_id] ||= []).push(m);
    return m;
  }],
  ["POST", /^\/chat\/enviar-grupo$/, ({ body }) => {
    const m = {
      id: nextId++, conversa_id: body.grupo_id, grupo_id: body.grupo_id, remetente_id: 1, remetente_nome: f.me.nome, mensagem: body.mensagem,
      tipo_mensagem: body.tipo_mensagem || "texto", criada_em: new Date().toISOString(), reacoes: [],
    };
    (extra.grupo[body.grupo_id] ||= []).push(m);
    return m;
  }],
  ["GET", /^\/chat\/appearance/, () => ({})],
  ["GET", /^\/avisos-internos$/, () => []],
  ["GET", /^\/banner-home$/, () => ({})],
  ["GET", /^\/purchase-permissions\/me$/, () => ({ permissions: [] })],
  ["GET", /^\/messages\/favorites$/, () => []],
  ["GET", /^\/notes$/, () => extra.notas],
  ["POST", /^\/notes$/, ({ body }) => { const n = { id: nextId++, ...body, criada_em: new Date().toISOString() }; extra.notas.push(n); return n; }],
  // Agenda de técnicos
  ["GET", /^\/agenda-tecnicos\/tecnicos(-sgp)?$/, () => f.tecnicos],
  ["GET", /^\/agenda-instalacao\/tecnicos$/, () => h.instaladores],
  ["GET", /^\/agenda-instalacao\/agenda$/, ({ params }) => h.agendaInstalacao(params.data || f.hoje())],
  ["GET", /^\/agenda-tecnicos\/mapa-chamados$/, () => h.mapaChamados()],
  ["GET", /^\/agenda-tecnicos\/coordenador-rota$/, ({ params }) => h.coordenadorRota(params.data || f.hoje())],
  ["GET", /^\/agenda-tecnicos\/coordenador-rota\/posicoes-tempo-real$/, () => h.posicoesTempoReal(f.hoje())],
  ["GET", /^\/agenda-tecnicos\/historico$/, () => h.historico()],
  ["GET", /^\/technician-team-colors$/, () => []],
  ["GET", /^\/technician-absences$/, () => []],
  // Assistente de IA
  ["GET", /^\/ia\/assistente\/status$/, () => ({ configurada: true, busca: false, modelos: [{ id: "auto", nome: "Automático" }], imagens: false, fontes: ["agenda", "painel", "rede", "chamados", "mudancas"] })],
  ["POST", /^\/ia\/assistente\/conversar$/, ({ body }) => {
    const last = String(body?.mensagens?.at(-1)?.content ?? body?.mensagens?.at(-1)?.texto ?? "");
    const hit = f.respostasIa.find(([re]) => re.test(last));
    return { resposta: hit ? hit[1] : f.respostaIaPadrao, fontes: [], busca: "nao_pedida", modelo: "demo", dadosUsados: [], memorizado: [] };
  }],
  ["GET", /^\/ia\/assistente\/memorias$/, () => ({ memorias: extra.memorias, maximo: 20 })],
  ["POST", /^\/ia\/assistente\/memorias$/, ({ body }) => { extra.memorias.push({ id: nextId++, texto: String(body.texto), origem: "pedido", criada_em: new Date().toISOString() }); return { ok: true }; }],
  ["DELETE", /^\/ia\/assistente\/memorias(\/\d+)?$/, ({ match }) => { if (match[1]) extra.memorias = extra.memorias.filter((m) => m.id !== Number(match[1].slice(1))); else extra.memorias = []; return { ok: true }; }],
  ["GET", /^\/internal-notices\/pending$/, () => []],
  ["GET", /^\/lembretes\/(hoje|alarmes)$/, () => []],
  ["GET", /^\/phone\/diretorio$/, () => []],
  ["GET", /^\/agenda-tecnicos\/resumo$/, () => ({ total: 13, concluidas: 4, emExecucao: 3, agendadas: 6 })],
  ["POST", /^\/ia\/assistente\/resumo$/, () => ({ resumo: "Resumo de demonstração: dia tranquilo, 15 OS na agenda, rede estável e fila de suporte sob controle." })],
  ["GET", /^\/agenda-tecnicos\/indicadores$/, ({ params }) => f.indicadores(params.de, params.ate)],
  // Lembretes
  ["GET", /^\/lembretes$/, () => ({ lembretes: extra.lembretes })],
  ["POST", /^\/lembretes$/, ({ body }) => { for (const r of body.lembretes || []) extra.lembretes.push({ ...r, id: nextId++, ativo: true, descricao: r.descricao || "Lembrete criado na demonstração", proximo: null }); return { ok: true }; }],
  ["POST", /^\/lembretes\/interpretar$/, ({ body }) => ({ lembretes: [{ texto: String(body.texto || "Lembrete"), tipo: "diario", horarios: ["09:00"], dias_semana: [1, 2, 3, 4, 5], dia_mes: null, data: null, avisar_chat: 1, descricao: "Todo dia útil às 09:00" }] })],
  ["PUT", /^\/lembretes\/(\d+)$/, ({ match, body }) => { extra.lembretes = extra.lembretes.map((l) => (l.id === Number(match[1]) ? { ...l, ...body } : l)); return { ok: true }; }],
  ["PATCH", /^\/lembretes\/(\d+)\/ativo$/, ({ match, body }) => { extra.lembretes = extra.lembretes.map((l) => (l.id === Number(match[1]) ? { ...l, ativo: !!body.ativo } : l)); return { ok: true }; }],
  ["DELETE", /^\/lembretes\/(\d+)$/, ({ match }) => { extra.lembretes = extra.lembretes.filter((l) => l.id !== Number(match[1])); return { ok: true }; }],
  ["GET", /^\/lembretes\/hoje$/, () => ({ lembretes: extra.lembretes.filter((l) => l.ativo).slice(0, 2).map((l) => ({ id: l.id, texto: l.texto, hora: l.horarios?.[0] || "09:00" })) })],
  ["GET", /^\/lembretes\/alarmes$/, () => ({ alarmes: [] })],
  // Chamados do site
  ["GET", /^\/chamados\/site$/, ({ params }) => g.chamadosSite(Number(params.page) || 1, Number(params.limit) || 25)],
  ["GET", /^\/chamados\/site\/(\d+)$/, ({ match }) => g.chamadoDetalhe(Number(match[1]))],
  // Cursos
  ["GET", /^\/cursos\/permissoes$/, () => ({ gestor: false })],
  ["GET", /^\/cursos\/painel$/, () => g.painelCursos()],
  ["GET", /^\/cursos\/catalogo$/, () => ({ cursos: g.cursosLista(), temMais: false })],
  ["GET", /^\/cursos\/categorias$/, () => ({ categorias: [{ id: 1, nome: "Redes" }, { id: 2, nome: "Atendimento" }, { id: 3, nome: "Suporte técnico" }, { id: 4, nome: "Comercial" }] })],
  ["GET", /^\/cursos\/curso\/(\d+)$/, ({ match }) => g.cursoDetalhe(Number(match[1]))],
  ["GET", /^\/cursos\/aula\/(\d+)$/, ({ match }) => g.aulaConteudo(Number(match[1]))],
  ["GET", /^\/cursos\/ranking$/, () => g.ranking()],
  ["GET", /^\/cursos\/trilhas$/, () => ({ trilhas: [{ id: 1, titulo: "Operação de redes", descricao: "Do básico ao avançado em redes ópticas.", progresso: 40, cursos: g.cursosLista().slice(0, 3) }] })],
  ["GET", /^\/cursos\/anotacoes$/, () => ({ anotacoes: [] })],
  ["GET", /^\/cursos\/certificados$/, () => ({ certificados: [] })],
  ["GET", /^\/cursos\/busca$/, () => ({ cursos: [], aulas: [] })],
  ["GET", /^\/cursos\/materiais$/, () => ({ materiais: [] })],
  ["GET", /^\/agenda-tecnicos\/almocos$/, () => []],
  ["PUT", /^\/integrations\/olt\/ignorados$/, () => ({ ok: true })],
  // Administração
  ["GET", /^\/admin\/resumo$/, () => ({ status: "online", total_usuarios: f.usuarios.length + 1, total_grupos: f.grupos.length })],
  ["GET", /^\/admin\/usuarios$/, () => [f.me, ...f.usuarios].map((u: any) => ({ ...u, ativo: 1, setor_id: 1, criado_em: new Date().toISOString() }))],
  ["GET", /^\/admin\/grupos$/, () => f.grupos.map((g) => ({ ...g, setor_id: 1, setor_nome: "Geral", fixo: g.id === 203, total_membros: 6 }))],
  ["GET", /^\/admin\/setores$/, () => ["Suporte N1", "Suporte N2", "Operações", "Comercial", "Infraestrutura", "Financeiro", "Desenvolvimento"].map((nome, i) => ({ id: i + 1, nome }))],
  ["GET", /^\/admin\/aviso-geral$/, () => ({ titulo: "Manutenção programada no domingo", mensagem: "Haverá manutenção na rede às 02:00. Avisos de demonstração.", ativo: true, tipo: "Comunicado", categoria: "Geral" })],
  ["GET", /^\/admin\/workspace\/online$/, () => f.usuarios.filter((u) => u.status === "online").map((u) => ({ id: u.id, nome: u.nome, email: u.email, setor_nome: u.setor_nome, avatar: null, versao: "0.5.117", desde: new Date(Date.now() - 3600_000 * (1 + u.id % 4)).toISOString(), janelas: 1 }))],
  ["GET", /^\/feedbacks(\/resolvidos)?$/, () => []],
  ["GET", /^\/admin\/boas-praticas-duvidas\/perguntas$/, () => []],
  // Painel
  ["GET", /^\/integrations\/dashboard$/, () => ({ connected: true, update: f.painelNoc(), customers: f.clientesBase() })],
  ["GET", /^\/integrations\/olt\/incidentes$/, () => ({ configurada: true, atualizadoEm: new Date().toISOString(), incidentes: [
    { id: "i1", tipo: "pon_loss", oltId: "1", olt: "OLT-Centro", inicio: new Date(Date.now() - 25 * 60_000).toISOString(), descricao: "Queda de PON", totalDispositivos: 48, dispositivosAtivos: 31, pon: "1/3", slotPon: "1", cto: "CTO-12" },
    { id: "i2", tipo: "no_power", oltId: "2", olt: "OLT-Norte", inicio: new Date(Date.now() - 8 * 60_000).toISOString(), descricao: "Sem energia", totalDispositivos: 16, dispositivosAtivos: 4, pon: "2/1", slotPon: "2", cto: "CTO-07" },
    { id: "i3", tipo: "cto_loss", oltId: "1", olt: "OLT-Centro", inicio: new Date(Date.now() - 90 * 60_000).toISOString(), descricao: "LOS em CTO", totalDispositivos: 8, dispositivosAtivos: 6, pon: "1/5", slotPon: "1", cto: "CTO-31" }] })],
  ["GET", /^\/integrations\/olt\/panorama$/, () => ({ configurada: true, atualizadoEm: new Date().toISOString(), total: 1240, online: 1198, semEnergia: 12, loss: 30, porOlt: [{ olt: "OLT-Centro", semEnergia: 4, loss: 22 }, { olt: "OLT-Norte", semEnergia: 8, loss: 8 }], pons: [], totalPons: 24 })],
  ["GET", /^\/integrations\/olt\/incidentes\/[^/]+\/clientes$/, () => ({ configurada: true, total: 2, exibidos: 2, clientes: [{ contrato: "100231", nome: "Ana Paula S.", serie: "ZTEG-10A2F1", ultimaQueda: new Date(Date.now() - 20 * 60_000).toISOString() }, { contrato: "100877", nome: "Mercado Boa Compra", serie: "ZTEG-77B3C9", ultimaQueda: new Date(Date.now() - 22 * 60_000).toISOString() }] })],
  ["GET", /^\/integrations\/olt/, () => ({ incidentes: [], negado: false })],
];

// Resposta vazia que serve tanto como lista quanto como objeto: `.length` é 0 e qualquer
// campo desconhecido (`.items`, `.lembretes`...) vira lista vazia, para o módulo abrir sem erro.
const NEGADOS = new Set(["error", "erro", "negado", "bloqueado", "disabled", "then", "toJSON", "$$typeof"]);
const universalEmpty = (): any =>
  new Proxy([] as any[], {
    get(target, key, receiver) {
      if (typeof key !== "string" || key in target) return Reflect.get(target, key, receiver);
      return NEGADOS.has(key) ? undefined : [];
    },
  });

const unmatched = new Set<string>();

export const demoAdapter: AxiosAdapter = async (config: InternalAxiosRequestConfig) => {
  const method = (config.method || "get").toUpperCase();
  const path = String(config.url || "/").split("?")[0];
  const params: Record<string, string> = { ...(config.params || {}) };
  let body: any = config.data;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { /* texto */ } }
  await new Promise((r) => setTimeout(r, 60 + Math.random() * 120));
  let data: unknown;
  let hit = false;
  for (const [m, re, h] of routes) {
    if (m !== method) continue;
    const match = path.match(re);
    if (match) { data = h({ path, method, params, body, match }); hit = true; break; }
  }
  if (!hit) {
    const key = `${method} ${path}`;
    if (!unmatched.has(key)) { unmatched.add(key); console.debug("[demo] sem mock:", key); }
    data = method === "GET" ? universalEmpty() : { ok: true };
  }
  return { data, status: 200, statusText: "OK", headers: {}, config, request: {} };
};
