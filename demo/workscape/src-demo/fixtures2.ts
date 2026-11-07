// Mais dados fictícios: lembretes, chamados do site e o módulo de Cursos.
const iso = (min: number) => new Date(Date.now() + min * 60_000).toISOString();
const ymd = (offsetDays: number) => {
  const d = new Date(Date.now() + offsetDays * 86400_000);
  return d.toISOString().slice(0, 10);
};

export const lembretesIniciais = () => [
  { id: 1, texto: "Conferir fila do suporte N2", tipo: "diario", horarios: ["09:00", "14:00"], dias_semana: [1, 2, 3, 4, 5], dia_mes: null, data: null, avisar_chat: 1, ativo: true, descricao: "Todo dia útil às 09:00 e 14:00", proximo: `${ymd(0)} 14:00:00` },
  { id: 2, texto: "Fechar relatório semanal de OS", tipo: "semanal", horarios: ["17:00"], dias_semana: [5], dia_mes: null, data: null, avisar_chat: 1, ativo: true, descricao: "Toda sexta às 17:00", proximo: `${ymd(1)} 17:00:00` },
  { id: 3, texto: "Revisar permissões de usuários", tipo: "mensal", horarios: ["10:00"], dias_semana: [], dia_mes: 1, data: null, avisar_chat: 0, ativo: false, descricao: "Todo dia 1 às 10:00", proximo: null },
];

const status = [["aberto", "Aberto"], ["andamento", "Em andamento"], ["fechado", "Fechado"]];
const titulos = ["Dúvida sobre fatura", "Quero mudar de plano", "Sem conexão desde ontem", "Troca de endereço de instalação", "Lentidão no Wi-Fi", "Segunda via de boleto", "Instalação de ponto extra", "Cancelamento de serviço"];
const nomes = ["Ana Paula S.", "João Mendes", "Luciana Prado", "Pedro Henrique", "Sandra Oliveira", "Marcos Vieira", "Tatiane Gomes", "Carlos Eduardo"];
export const chamadosSite = (page = 1, limit = 25) => {
  const items = Array.from({ length: 18 }, (_, i) => {
    const [st, label] = status[i % 3];
    return { activityId: 7000 + i, protocol: `2026${String(1100 + i)}`, customerName: nomes[i % nomes.length], cpfMasked: "***.***.***-**", title: titulos[i % titulos.length], openedAt: iso(-60 * (i + 2)), status: st, statusLabel: label };
  });
  return { items: items.slice((page - 1) * limit, page * limit), page, limit, total: items.length, truncated: false };
};
export const chamadoDetalhe = (id: number) => {
  const base = chamadosSite(1, 100).items.find((c) => c.activityId === id) || chamadosSite(1, 100).items[0];
  return { ...base, description: "Cliente relatou o problema pelo site. Registro de demonstração com dados fictícios.", closureReason: base.status === "fechado" ? "Resolvido por contato telefônico." : null, closedAt: base.status === "fechado" ? iso(-30) : null, contractId: "100" + base.activityId };
};

// Cursos
const curso = (id: number, titulo: string, nivel: string, cat: string, aulas: number, progresso: number, extra: Record<string, unknown> = {}) => ({
  id, titulo, descricao: `Curso de demonstração: ${titulo.toLowerCase()}.`, instrutor: "Equipe Workscape", instrutor_url: null, nivel, categoria_id: 1, categoria: cat, capa: null,
  carga_horaria_min: aulas * 12, emite_certificado: 1, obrigatorio: false, acessos: 40 + id * 7, criado_em: iso(-60 * 24 * (10 - id)), modulos: 2, aulas,
  matriculado: progresso > 0, prazoEm: null, ultimaAulaId: progresso > 0 ? id * 10 + 1 : null, ultimoAcesso: progresso > 0 ? iso(-120) : null,
  concluido: progresso === 100, progresso, favorito: id === 1, certificado: null, ...extra,
});
export const cursosLista = () => [
  curso(1, "Fundamentos de redes GPON", "basico", "Redes", 6, 66),
  curso(2, "Atendimento de excelência ao cliente", "basico", "Atendimento", 5, 100),
  curso(3, "Diagnóstico de lentidão e perda de pacotes", "intermediario", "Suporte técnico", 8, 25),
  curso(4, "Introdução ao Workscape", "basico", "Plataforma", 4, 0, { obrigatorio: true, prazoEm: iso(60 * 24 * 7) }),
  curso(5, "Roteamento BGP na prática", "avancado", "Redes", 10, 0),
  curso(6, "Vendas consultivas para provedores", "intermediario", "Comercial", 6, 0),
];
export const painelCursos = () => {
  const l = cursosLista();
  return {
    usuario: { nome: "Lucas Soares", setor: "Desenvolvimento" }, destaque: l[3], continuar: [l[0], l[2]],
    estatisticas: { progressoGeral: 48, horas: 6, cursosConcluidos: 1, certificados: 1, pontos: 420, sequencia: 3 },
    proximas: [{ tipo: "prazo", cursoId: 4, titulo: l[3].titulo, prazoEm: iso(60 * 24 * 7), obrigatorio: true }],
    recomendados: [l[4], l[5]], novos: [l[5], l[4], l[3]], maisAcessados: [l[0], l[1], l[2]],
    conquistas: [{ id: "primeiro", titulo: "Primeiro curso concluído", descricao: "Você concluiu seu primeiro curso." }, { id: "sequencia", titulo: "3 dias seguidos", descricao: "Estudou três dias em sequência." }],
  };
};
export const cursoDetalhe = (id: number) => {
  const c = cursosLista().find((x) => x.id === id) || cursosLista()[0];
  const aula = (n: number, feita: boolean) => ({ id: id * 10 + n, titulo: `Aula ${n}`, tipo: "conteudo" as const, duracaoMin: 10 + n, estado: feita ? ("concluida" as const) : n === 1 ? ("andamento" as const) : ("nao_iniciada" as const) });
  const feitas = Math.round((c.progresso / 100) * c.aulas);
  const todas = Array.from({ length: c.aulas }, (_, i) => aula(i + 1, i < feitas));
  const meio = Math.ceil(todas.length / 2);
  return {
    curso: { id: c.id, titulo: c.titulo, descricao: c.descricao, objetivos: "Entender os conceitos e aplicá-los no dia a dia.", prerequisitos: null, instrutor: c.instrutor, instrutorUrl: null, nivel: c.nivel, categoria: c.categoria, capa: null, cargaHorariaMin: c.carga_horaria_min, status: "publicado", emiteCertificado: true, obrigatorio: c.obrigatorio, notaFinalMinima: 70, cursoRequisito: null, requisitoCumprido: true },
    modulos: [{ id: id * 100 + 1, titulo: "Conceitos", aulas: todas.slice(0, meio) }, { id: id * 100 + 2, titulo: "Prática", aulas: todas.slice(meio) }],
    progresso: { total: c.aulas, feitas, percentual: c.progresso, concluido: c.progresso === 100 }, matriculado: c.matriculado, concluidoEm: null, prazoEm: c.prazoEm,
    proximaAulaId: id * 10 + feitas + 1, ultimaAulaId: c.ultimaAulaId, ultimaPosicao: 0, certificado: null, favorito: c.favorito, feedback: null, previa: false,
  };
};
export const aulaConteudo = (id: number) => {
  const cursoId = Math.floor(id / 10);
  return {
    aula: { id, cursoId, titulo: `Aula ${id % 10}`, tipo: "conteudo", duracaoMin: 12, moduloId: cursoId * 100 + 1 },
    blocos: [
      { id: "b1", tipo: "titulo", nivel: 1, texto: "Conteúdo de demonstração" },
      { id: "b2", tipo: "paragrafo", texto: "Esta aula mostra como o módulo de Cursos do Workscape apresenta o conteúdo: texto, destaques, listas e exercícios, com progresso salvo por usuário." },
      { id: "b3", tipo: "destaque", tom: "info", texto: "Dica: o conteúdo real das aulas é cadastrado pela equipe no painel de gestão." },
      { id: "b4", tipo: "lista", ordenada: false, itens: ["Aulas em texto, vídeo, áudio e PDF", "Provas com correção automática", "Certificados e ranking"] },
    ],
    arquivos: {}, progresso: { posicao: 0, concluida: false }, anotacao: "", anterior: id % 10 > 1 ? id - 1 : null, proxima: id + 1, previa: false,
  };
};
export const ranking = () => ({
  ranking: [["Marina Alves", 980, 6], ["Rafael Costa", 760, 5], ["Lucas Soares", 420, 3], ["Diego Martins", 350, 3], ["Beatriz Nunes", 210, 2]].map(([nome, pontos, cursos], i) => ({ posicao: i + 1, nome, pontos, cursos, voce: nome === "Lucas Soares" })),
});
