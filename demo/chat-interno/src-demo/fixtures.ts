// Dados 100% fictícios para a demonstração pública do Workscape.
const iso = (d: Date) => d.toISOString();
const ago = (min: number) => iso(new Date(Date.now() - min * 60_000));
export const hoje = () =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

export const me = {
  id: 1, nome: "Lucas Soares", email: "demo@workscape.app", perfil: "admin", empresa_id: 1,
  empresa_nome: "Nexa Telecom (demo)", setor_nome: "Desenvolvimento", avatar: "", permissions: ["*"],
  status: "online",
};

export const usuarios = [
  { id: 2, nome: "Marina Alves", email: "marina@demo", status: "online", setor_nome: "Suporte N2", perfil: "usuario", empresa_id: 1 },
  { id: 3, nome: "Rafael Costa", email: "rafael@demo", status: "online", setor_nome: "Operações", perfil: "usuario", empresa_id: 1 },
  { id: 4, nome: "Beatriz Nunes", email: "beatriz@demo", status: "ausente", setor_nome: "Comercial", perfil: "usuario", empresa_id: 1 },
  { id: 5, nome: "Diego Martins", email: "diego@demo", status: "online", setor_nome: "Infraestrutura", perfil: "usuario", empresa_id: 1 },
  { id: 6, nome: "Camila Rocha", email: "camila@demo", status: "offline", setor_nome: "Financeiro", perfil: "usuario", empresa_id: 1 },
  { id: 7, nome: "Paulo Ferraz", email: "paulo@demo", status: "online", setor_nome: "Suporte N1", perfil: "usuario", empresa_id: 1 },
];

export const conversas = [
  { id: 101, usuario_outro_id: 2, usuario_outro_nome: "Marina Alves", ultima_mensagem: "Consegue olhar o chamado do bairro Centro?", nao_lidas: 2, ultima_mensagem_em: ago(4) },
  { id: 102, usuario_outro_id: 3, usuario_outro_nome: "Rafael Costa", ultima_mensagem: "Equipe 2 já saiu para a instalação.", nao_lidas: 0, ultima_mensagem_em: ago(35) },
  { id: 103, usuario_outro_id: 5, usuario_outro_nome: "Diego Martins", ultima_mensagem: "OLT estabilizada, pode fechar o massivo.", nao_lidas: 0, ultima_mensagem_em: ago(90) },
  { id: 104, usuario_outro_id: 4, usuario_outro_nome: "Beatriz Nunes", ultima_mensagem: "Fechei mais 3 contratos hoje 🎉", nao_lidas: 0, ultima_mensagem_em: ago(180) },
];

export const grupos = [
  { id: 201, nome: "Suporte Técnico", nao_lidas: 3, total_membros: 4, membros_online: 3, tem_acesso: true, ultima_mensagem: "Fila zerada por enquanto.", ultima_mensagem_em: ago(10) },
  { id: 202, nome: "Operações de Campo", nao_lidas: 0, total_membros: 3, membros_online: 2, tem_acesso: true, ultima_mensagem: "Rota de amanhã publicada.", ultima_mensagem_em: ago(60) },
  { id: 203, nome: "Geral", nao_lidas: 0, total_membros: 7, membros_online: 4, tem_acesso: true, ultima_mensagem: "Bom dia, time!", ultima_mensagem_em: ago(600) },
];

const msg = (id: number, conversa: number, de: number, nome: string, texto: string, min: number) => ({
  id, conversa_id: conversa, remetente_id: de, remetente_nome: nome, mensagem: texto, tipo_mensagem: "texto",
  criada_em: ago(min), lida: true, status: "lida", reacoes: [] as unknown[],
});
export const mensagensDiretas: Record<number, ReturnType<typeof msg>[]> = {
  2: [
    msg(1001, 101, 2, "Marina Alves", "Oi Lucas, bom dia! Tudo certo por aí?", 42),
    msg(1002, 101, 1, "Lucas Soares", "Bom dia, Marina! Tudo certo. Em que posso ajudar?", 40),
    msg(1003, 101, 2, "Marina Alves", "Apareceu uma OS de troca de roteador no Centro sem técnico atribuído.", 6),
    msg(1004, 101, 2, "Marina Alves", "Consegue olhar o chamado do bairro Centro?", 4),
  ],
  3: [msg(1011, 102, 3, "Rafael Costa", "A equipe 2 já saiu para a instalação.", 35)],
  5: [msg(1021, 103, 5, "Diego Martins", "OLT estabilizada, pode fechar o massivo.", 90)],
  4: [msg(1031, 104, 4, "Beatriz Nunes", "Fechei mais 3 contratos hoje 🎉", 180)],
};
export const mensagensGrupo: Record<number, ReturnType<typeof msg>[]> = {
  201: [
    msg(2001, 201, 7, "Paulo Ferraz", "Bom dia! Começando a fila de suporte.", 120),
    msg(2002, 201, 2, "Marina Alves", "Temos 2 casos de lentidão na região Norte, já abri o diagnóstico.", 60),
    msg(2003, 201, 7, "Paulo Ferraz", "Fila zerada por enquanto.", 10),
  ],
  202: [msg(2011, 202, 3, "Rafael Costa", "Rota de amanhã publicada.", 60)],
  203: [msg(2021, 203, 6, "Camila Rocha", "Bom dia, time!", 600)],
};

export const respostasContato: Record<number, string[]> = {
  2: ["Perfeito, obrigada! Vou atribuir a OS à equipe 1.", "Beleza. Qualquer novidade eu te aviso aqui."],
  3: ["Fechado! Te mando o status assim que chegarem.", "Anotado. A equipe 2 deve terminar por volta das 16h."],
  4: ["Boa! Vamos comemorar na sexta 😄", "Valeu, Lucas!"],
  5: ["Show. Deixo o monitoramento aberto por mais uma hora.", "Tudo estável do meu lado."],
  6: ["Vou conferir e te retorno.", "Ok, obrigada!"],
  7: ["Pode deixar!", "Entendido."],
};

const nomesTec = ["Anderson Lima", "Bruno Teixeira", "Carlos Ribeiro", "Daniel Moraes", "Eduardo Pires", "Felipe Duarte"];
export const tecnicos = nomesTec.map((nome, i) => ({ id: String(i + 1), nome, ativo: true, sgp_id: String(300 + i) }));

const bairros: [string, number, number][] = [
  ["Centro", -23.3215, -46.7261], ["Jardim das Flores", -23.3302, -46.7194], ["Vila Nova", -23.3118, -46.7355],
  ["Parque Industrial", -23.3401, -46.7102], ["Santa Luzia", -23.3254, -46.7413], ["Alto da Serra", -23.3069, -46.7208],
];
const clientes = ["Ana Paula S.", "João Mendes", "Mercado Boa Compra", "Clínica Vida", "Luciana Prado", "Pedro Henrique", "Padaria Estrela", "Sandra Oliveira", "Escritório Atlas", "Marcos Vieira", "Tatiane Gomes", "Colégio Horizonte"];
const motivos = ["Instalação nova", "Troca de roteador", "Sem sinal / LOS", "Lentidão", "Mudança de endereço", "Manutenção preventiva", "Retirada de equipamento", "Atenuação alta"];
const horas = ["08:00", "09:30", "11:00", "13:30", "15:00", "16:30"];
const statuses = ["Concluída", "Concluída", "Em execução", "Agendada", "Agendada", "Agendada"];
export function agendaDoDia(data: string) {
  const items: Record<string, unknown>[] = [];
  let n = 0;
  nomesTec.forEach((tec, ti) => {
    for (let k = 0; k < 2 + (ti % 2); k++) {
      const [bairro, lat, lng] = bairros[(ti + k) % bairros.length];
      const idx = (ti * 3 + k) % clientes.length;
      items.push({
        id: 9000 + n, idOrdemServico: 9000 + n, idCliente: 4000 + n, tecnico: tec, tecnicoResponsavelSgpId: String(300 + ti),
        cliente: clientes[idx], hora: horas[(ti + k * 2) % horas.length], status: statuses[(ti + k) % statuses.length],
        motivo: motivos[(ti + k * 3) % motivos.length], bairro, enderecoCompleto: `Rua Exemplo ${100 + n * 7}, ${bairro}`,
        latitude: lat + (n % 5) * 0.002, longitude: lng - (n % 4) * 0.002, responsavelStatus: "ok", turnoHorario: k === 0 ? "Manhã" : "Tarde", data,
      });
      n++;
    }
  });
  return items;
}

export function painelNoc() {
  const agora = Date.now();
  return {
    total: 61,
    atualizado: agora,
    grupos: {
      "SUPORTE TÉCNICO": 9, "SUPORTE N1": 6, "SUPORTE N2": 4, "SUPORTE N3": 1,
      BAIXA: 11, REGULAR: 14, ALTA: 5,
      OFFLINE: 18, ROTEADOR: 7, "ATENUAÇÃO": 5, "RETIRADA DE EQUIPAMENTO": 3,
      "ATIVAÇÃO DE CONTRATO - COMUM": 8, "ATIVAÇÃO DE CONTRATO - MUDANÇA DE ENDEREÇO": 2, "MUDANÇA DE PONTO INTERNO": 1,
      "BACKBONE GPON NEXA | MRT": 0, "BACKBONE GPON NEXA | DAS": 1, "BACKBONE GPON NEXA | SRP": 0,
      "BACKBONE GPON NEXA | PV": 0, "BACKBONE GPON NEXA | LRJ": 0,
      "COMERCIAL CONTRATAÇÃO": 6, "COMERCIAL PENDENTE DOC": 2,
      FINANCEIRO: 4, "RETENÇÃO": 2, "CANCELAMENTO CONTRATO": 1, "ACORDO/ NEGOCIAÇÃO": 3, CONGELAMENTO: 1,
      PROCON: 0, ANATEL: 0, "RECLAME AQUI": 1, ALMOXARIFADO: 2,
    },
    pedidosAbertos: { vendasEmExecucao: 8, atualizado: agora },
    emAndamento: {
      total: 3, atualizado: agora,
      chamados: [
        { id: 9002, protocolo: "20260711-0042", cliente: "Mercado Boa Compra", tecnico: "Bruno Teixeira", equipe: "Equipe 2", tipo: "Instalação nova", status: "Em execução", bairro: "Centro", inicioExecucaoISO: ago(35) },
        { id: 9005, protocolo: "20260711-0047", cliente: "Luciana Prado", tecnico: "Daniel Moraes", equipe: "Equipe 1", tipo: "Sem sinal / LOS", status: "Em execução", bairro: "Vila Nova", inicioExecucaoISO: ago(18) },
        { id: 9011, protocolo: "20260711-0051", cliente: "Clínica Vida", tecnico: "Felipe Duarte", equipe: "Equipe 3", tipo: "Troca de roteador", status: "Em execução", bairro: "Santa Luzia", inicioExecucaoISO: ago(7) },
      ],
    },
  };
}
export const clientesBase = () => ({ total: 12840, ativos: 11392, reduzido: 612, suspensos: 584, cancelados: 252, atualizado: Date.now() });

export const respostasIa: [RegExp, string][] = [
  [/t[eé]cnico|os\b|agenda|chamado/i, "Hoje há **15 ordens de serviço** na agenda. **Bruno Teixeira**, **Daniel Moraes** e **Felipe Duarte** têm 3 cada, e há OS em execução agora no Centro, Vila Nova e Santa Luzia.\n\n_Resposta simulada a partir de dados fictícios da demonstração._"],
  [/massivo|rede|olt|offline/i, "A rede está **operacional**: 18 clientes offline no total e apenas 1 chamado no backbone **DAS**, abaixo do limite de alerta.\n\n_Resposta simulada a partir de dados fictícios da demonstração._"],
  [/workscape|o que (é|voc)|quem/i, "O **Workscape** é a plataforma corporativa que centraliza chat interno, agenda de técnicos, painel NOC, telefone, lembretes e este assistente de IA conectado aos próprios módulos.\n\n_Esta é uma demonstração com dados fictícios._"],
];
export const respostaIaPadrao =
  "Esta é uma **demonstração** do assistente do Workscape. Na versão real, ele consulta a agenda, o painel NOC e a rede da empresa para responder. Experimente perguntar sobre _técnicos_, _massivos_ ou _o que é o Workscape_.";

export function indicadores(de: string, ate: string) {
  const dias: string[] = [];
  for (let d = new Date(`${de}T12:00:00Z`); d <= new Date(`${ate}T12:00:00Z`) && dias.length < 31; d.setUTCDate(d.getUTCDate() + 1)) dias.push(d.toISOString().slice(0, 10));
  const grupo = (seed: number) => {
    const total = 10 + (seed * 3) % 7;
    const atendidos = Math.round(total * 0.78), adiados = Math.round(total * 0.12), naoAtendidos = Math.max(0, total - atendidos - adiados - 1);
    return { total, atendidos, adiados, naoAtendidos, pendentes: total - atendidos - adiados - naoAtendidos };
  };
  const soma = (gs: ReturnType<typeof grupo>[]) => gs.reduce((a, g) => ({ total: a.total + g.total, atendidos: a.atendidos + g.atendidos, adiados: a.adiados + g.adiados, naoAtendidos: a.naoAtendidos + g.naoAtendidos, pendentes: a.pendentes + g.pendentes }), { total: 0, atendidos: 0, adiados: 0, naoAtendidos: 0, pendentes: 0 });
  const taxa = (g: { total: number; atendidos: number }) => (g.total ? Math.round((g.atendidos / g.total) * 1000) / 10 : null);
  const porDia = dias.map((data, i) => { const g = grupo(i + 2); return { data, ...g, taxa: taxa(g) }; });
  const totais = soma(porDia);
  const ranking = nomesTec.map((tecnico, i) => { const g = grupo(i + 5); return { tecnico, ...g, taxa: taxa(g), avaliacoes: 4 + i, notaMedia: 4.2 + (i % 4) * 0.2 }; }).sort((a, b) => (b.taxa ?? 0) - (a.taxa ?? 0));
  const porMotivo = motivos.map((motivo, i) => ({ motivo, ...grupo(i + 1) }));
  return { de, ate, geradoEm: new Date().toISOString(), totais: { ...totais, taxa: taxa(totais) }, porDia, ranking, porMotivo, avaliacoesDisponivel: false, avaliacoes: [] };
}

// ---- Chat completo: anexos, reações, mensagem fixada e conversas mais ricas ----
const svg = (bg1: string, bg2: string, label: string) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></linearGradient></defs><rect width="640" height="400" fill="url(#g)"/><text x="320" y="210" text-anchor="middle" font-family="Arial" font-size="34" fill="#fff" opacity=".9">${label}</text></svg>`);
const fotoPoste = svg("#1d4ed8", "#0f766e", "Foto da CTO-12 (demo)");
const fotoRack = svg("#7c3aed", "#be185d", "Rack da OLT-Centro (demo)");
const arq = (id: number, conv: number, de: number, nome: string, anexo: string, mime: string, min: number) => ({
  ...msg(id, conv, de, nome, "#", min), tipo_mensagem: "arquivo", anexo_nome: anexo, anexo_mime: mime,
});
const img = (id: number, conv: number, de: number, nome: string, url: string, anexo: string, min: number) => ({
  ...msg(id, conv, de, nome, url, min), tipo_mensagem: "imagem", anexo_nome: anexo, anexo_mime: "image/svg+xml",
});
const reac = (emoji: string, total: number, me = false, quem = ["Marina Alves"]) => ({ reaction: emoji, total, reacted_by_me: me, users: quem.map((nome, i) => ({ id: i + 2, nome })) });

mensagensDiretas[2].splice(
  0, mensagensDiretas[2].length,
  msg(1001, 101, 2, "Marina Alves", "Oi Lucas, bom dia! Tudo certo por aí?", 1500),
  msg(1002, 101, 1, "Lucas Soares", "Bom dia, Marina! Tudo certo. Em que posso ajudar?", 1490),
  { ...msg(1003, 101, 2, "Marina Alves", "Aqui está o relatório de ontem, dá uma olhada:", 1440) },
  arq(1004, 101, 2, "Marina Alves", "relatorio-os-semanal.pdf", "application/pdf", 1439),
  { ...msg(1005, 101, 1, "Lucas Soares", "Recebi! Ficou ótimo, obrigado 🙌", 1420), reacoes: [reac("👍", 1, false, ["Marina Alves"])] },
  img(1006, 101, 2, "Marina Alves", fotoPoste, "cto-12.svg", 90),
  { ...msg(1007, 101, 2, "Marina Alves", "Essa é a CTO que caiu hoje cedo. Já abri o chamado.", 89), reacoes: [reac("👀", 1, true, ["Lucas Soares"])] },
  msg(1008, 101, 2, "Marina Alves", "Apareceu uma OS de troca de roteador no Centro sem técnico atribuído.", 6),
  msg(1009, 101, 2, "Marina Alves", "Consegue olhar o chamado do bairro Centro?", 4),
);
mensagensDiretas[3].push(
  msg(1012, 102, 1, "Lucas Soares", "Perfeito, me avisa quando concluir.", 30),
  arq(1013, 102, 3, "Rafael Costa", "rota-equipe-2.xlsx", "application/vnd.ms-excel", 20),
);
mensagensDiretas[5].unshift(img(1020, 103, 5, "Diego Martins", fotoRack, "rack-olt.svg", 130));
export const fixadaDireta: Record<number, unknown> = {
  2: { message_id: 1007, remetente_id: 2, remetente_nome: "Marina Alves", previa: "Essa é a CTO que caiu hoje cedo. Já abri o chamado." },
};
const linkMsg = (id: number, conv: number, de: number, nome: string, texto: string, min: number) => msg(id, conv, de, nome, texto, min);
mensagensGrupo[201].splice(
  0, mensagensGrupo[201].length,
  msg(2001, 201, 7, "Paulo Ferraz", "Bom dia! Começando a fila de suporte.", 300),
  msg(2002, 201, 2, "Marina Alves", "Temos 2 casos de lentidão na região Norte, já abri o diagnóstico.", 240),
  img(2003, 201, 5, "Diego Martins", fotoRack, "rack-olt.svg", 200),
  { ...msg(2004, 201, 5, "Diego Martins", "Esse é o equipamento. Porta 3 está com atenuação alta.", 199), reacoes: [reac("🔧", 2, false, ["Marina Alves", "Paulo Ferraz"])] },
  linkMsg(2005, 201, 7, "Paulo Ferraz", "Procedimento completo: https://wiki.demo.invalid/atenuacao", 120),
  arq(2006, 201, 2, "Marina Alves", "checklist-atenuacao.pdf", "application/pdf", 119),
  { ...msg(2007, 201, 1, "Lucas Soares", "Obrigado, time! Vou deixar o painel NOC aberto.", 60), reacoes: [reac("🙏", 1, false, ["Paulo Ferraz"])] },
  msg(2008, 201, 7, "Paulo Ferraz", "Fila zerada por enquanto.", 10),
);
mensagensGrupo[202].push(msg(2012, 202, 3, "Rafael Costa", "Equipe 1 e 3 saem às 8h, equipe 2 às 9h.", 40), arq(2013, 202, 3, "Rafael Costa", "mapa-de-rotas.pdf", "application/pdf", 39));
mensagensGrupo[203].push(msg(2022, 203, 4, "Beatriz Nunes", "Lembrete: confraternização sexta às 18h 🎉", 400), { ...msg(2023, 203, 6, "Camila Rocha", "Confirmado!", 395), reacoes: [reac("🎉", 3, true, ["Camila Rocha", "Diego Martins", "Lucas Soares"])] });
export const membrosGrupo = (id: number) =>
  (id === 201 ? usuarios.filter((u) => [2, 5, 7].includes(u.id)) : id === 202 ? usuarios.filter((u) => [3, 5].includes(u.id)) : usuarios).concat([me as any]);
