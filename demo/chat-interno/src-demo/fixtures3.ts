// Agenda de técnicos completa (fictícia): coordenador de rotas, mapa de chamados, histórico e agenda de instalação.
import { agendaDoDia, tecnicos } from "./fixtures";

const min = (m: number) => new Date(Date.now() - m * 60_000).toISOString();
const CORES = ["#2f6bff", "#17b26a", "#f5a524", "#a855f7", "#06b6d4", "#ef4444"];
const REGIOES = ["Centro", "Zona Norte", "Zona Sul", "Industrial", "Centro", "Zona Norte"];
const STATUS_AGENDA: Record<string, string> = { "Concluída": "Encerrada", "Em execução": "Em execução", Agendada: "Aberta" };

export function coordenadorRota(data: string) {
  const os = agendaDoDia(data) as any[];
  const chamados = os.map((o) => {
    const ti = tecnicos.findIndex((t) => t.nome === o.tecnico);
    return {
      id: String(o.id), cliente: o.cliente, motivo: o.motivo, enderecoCompleto: o.enderecoCompleto, bairro: o.bairro,
      status: STATUS_AGENDA[o.status] || "Aberta", horario: o.hora, latitude: o.latitude, longitude: o.longitude,
      tecnicoAtualNome: o.tecnico, corTecnico: CORES[ti % CORES.length], tecnicoId: String(ti + 1),
    };
  });
  const tecs = tecnicos.map((t, i) => {
    const meus = chamados.filter((c) => c.tecnicoAtualNome === t.nome);
    const pend = meus.filter((c) => c.status !== "Encerrada").length;
    const ref = meus[0];
    return {
      id: t.id, nome: t.nome, regiao: REGIOES[i], status: pend ? "Em rota" : "Livre",
      latitude: ref ? ref.latitude + 0.0015 : -23.3215, longitude: ref ? ref.longitude - 0.001 : -46.7261,
      fonteLocalizacaoLabel: "Rastreador do veículo", ultimaAtualizacaoLocalizacao: min(1 + i),
      statusPosicaoGps: i === 4 ? "antiga" : i === 5 ? "atual" : "tempo_real",
      veiculo: { placa: `DEM-${1000 + i * 111}`, nome: `Fiorino ${i + 1}`, velocidade: i % 2 ? 0 : 32 + i * 4, ignicao: true, ultimaPosicao: min(1 + i) },
      chamadosAtribuidos: meus.length, chamadosPendentes: pend, distanciaEstimadaKm: 6 + i * 2.4, tempoEstimadoMin: 35 + i * 9,
      cor: CORES[i % CORES.length], alertaChamadosSimultaneos: false,
    };
  });
  const rotas = tecs.map((t, i) => ({
    id: `r${t.id}`, tecnico_id: t.id, cor: t.cor,
    itens: chamados.filter((c) => c.tecnicoAtualNome === t.nome).map((c, k) => ({ latitude: c.latitude, longitude: c.longitude, ordem: k + 1 })),
  }));
  return {
    tecnicos: tecs, chamados, rotas,
    pontosFixos: [
      { id: 1, nome: "Sede da operação", icone: "🏢", cor: "#2f6bff", latitude: -23.3215, longitude: -46.7261, ativo: true },
      { id: 2, nome: "Almoxarifado", icone: "📦", cor: "#f5a524", latitude: -23.3345, longitude: -46.7152, ativo: true },
      { id: 3, nome: "POP Norte", icone: "📡", cor: "#a855f7", latitude: -23.3068, longitude: -46.7219, ativo: true },
    ],
    resumo: { tecnicos: tecs.length, chamados: chamados.length, distanciaTotalKm: Math.round(tecs.reduce((a, t) => a + t.distanciaEstimadaKm, 0)) },
    gpsTecnicosResumo: { atual: 5, antigo: 1, desatualizado: 0, semVeiculoVinculado: 0 },
    opcoes: { regioes: [...new Set(REGIOES)], tecnicos: tecnicos.map((t) => t.nome), status: ["Aberta", "Em execução", "Encerrada"], motivos: [...new Set(chamados.map((c) => c.motivo as string))] },
    chamadosSemLocalizacao: [], chamadosLocalizacaoSuspeita: [],
    tecnicosSemLocalizacao: [], tecnicosSemUsuarioSgp: [],
    sugestoes: [{ id: "s1", chamadoId: String(chamados[3]?.id), cliente: chamados[3]?.cliente, tecnicoSugeridoNome: "Carlos Ribeiro", motivo: "Mais próximo" }],
    chamadosSimultaneos: { totalTecnicos: 0, tecnicos: [] },
  };
}

export function posicoesTempoReal(data: string) {
  const c = coordenadorRota(data);
  return {
    sincronizadoEm: new Date().toISOString(), realtimeStatus: "ok", resumo: { gpsTempoReal: 4, gpsAtual: 1 },
    tecnicos: c.tecnicos.map((t, i) => ({ ...t, latitude: t.latitude + Math.sin(Date.now() / 20000 + i) * 0.0006, longitude: t.longitude + Math.cos(Date.now() / 20000 + i) * 0.0006 })),
    veiculosSemVinculo: [{ placa: "DEM-9999", nomeVeiculo: "Reserva 1", latitude: -23.3205, longitude: -46.7248, velocidade: 0, ignicao: false }],
  };
}

const FILAS = ["ST", "N1", "N2"];
const CIDADES = ["Franco da Rocha", "Caieiras", "Francisco Morato"];
export function mapaChamados() {
  const os = agendaDoDia(new Date().toISOString().slice(0, 10)) as any[];
  const chamados = os.map((o, i) => {
    const minutos = [20, 75, 190, 600, 1500, 3000, 5000][i % 7];
    return {
      id: `m${o.id}`, numero: `2026${1200 + i}`, fila: FILAS[i % 3], status: "Aberto", cliente: o.cliente, contrato: String(100200 + i),
      motivo: o.motivo, dataAbertura: new Date(Date.now() - minutos * 60_000).toISOString(),
      dataAberturaDia: new Date(Date.now() - minutos * 60_000).toISOString().slice(0, 10), minutosAberto: minutos,
      tempoAbertoLabel: minutos < 60 ? `${minutos} min` : minutos < 1440 ? `${Math.round(minutos / 60)} h` : `${Math.round(minutos / 1440)} dia(s)`,
      prioridadeAntiga: minutos > 1440,
      endereco: { bairro: o.bairro, cidade: CIDADES[i % 3], enderecoCompleto: o.enderecoCompleto },
      latitude: o.latitude, longitude: o.longitude, tecnicoResponsavelNome: i % 4 === 0 ? null : o.tecnico,
    };
  });
  return {
    atualizadoEm: new Date().toISOString(), geradoEm: new Date().toISOString(), chamados,
    concentracoes: [
      { id: 1, bairro: "Centro", centro: { latitude: -23.3215, longitude: -46.7261 }, raioMetros: 650, totalChamados: 4 },
      { id: 2, bairro: "Vila Nova", centro: { latitude: -23.3118, longitude: -46.7355 }, raioMetros: 500, totalChamados: 3 },
    ],
    naoLocalizados: [{ id: "x1" }],
    opcoesFiltro: { cidades: CIDADES, bairros: [...new Set(chamados.map((c) => c.endereco.bairro as string))] },
  };
}

const AUTORES = [{ id: 2, nome: "Marina Alves" }, { id: 3, nome: "Rafael Costa" }, { id: 1, nome: "Lucas Soares" }];
export function historico() {
  const base = [
    { tipo: "troca", titulo: "Trocou o técnico da OS", descricao: "Anderson Lima → Bruno Teixeira", referencia: "OS 9004", tecnico: "Bruno Teixeira", mudancas: [{ campo: "Técnico", de: "Anderson Lima", para: "Bruno Teixeira" }] },
    { tipo: "reagendamento", titulo: "Reagendou o atendimento", descricao: "Cliente pediu outro horário", referencia: "OS 9007", tecnico: "Daniel Moraes", mudancas: [{ campo: "Horário", de: "09:30", para: "15:00" }] },
    { tipo: "bloqueio", titulo: "Criou bloqueio de almoço", descricao: "12:00 às 13:00", referencia: "Equipe 2", tecnico: "Carlos Ribeiro" },
    { tipo: "ausencia", titulo: "Registrou ausência", descricao: "Consulta médica", referencia: "Eduardo Pires", tecnico: "Eduardo Pires" },
    { tipo: "horario", titulo: "Alterou horário de atendimento", descricao: "Turno estendido", referencia: "Felipe Duarte", tecnico: "Felipe Duarte", mudancas: [{ campo: "Fim do turno", de: "17:00", para: "18:00" }] },
    { tipo: "troca", titulo: "Rejeitou sugestão de rota", descricao: "Manteve o técnico atual", referencia: "OS 9010", tecnico: "Felipe Duarte" },
    { tipo: "mapa", titulo: "Abriu o mapa de chamados", descricao: "Filtro: N1", referencia: "Mapa", tecnico: "" },
  ];
  const items = Array.from({ length: 24 }, (_, i) => {
    const b = base[i % base.length];
    return { id: 500 - i, criadoEm: min(15 + i * 95), usuario: AUTORES[i % 3], ip: `10.0.0.${20 + (i % 9)}`, falha: i === 6, ...b };
  });
  return { total: items.length, items, usuarios: AUTORES.map((a) => a.nome) };
}

export const instaladores = [{ id: "i1", nome: "Gustavo Reis" }, { id: "i2", nome: "Henrique Dias" }, { id: "i3", nome: "Igor Santana" }];
export function agendaInstalacao(data: string) {
  const bairros = ["Centro", "Vila Nova", "Santa Luzia", "Parque Industrial"];
  const horas = ["08:00", "10:00", "13:30", "15:30"];
  const items = instaladores.flatMap((t, ti) =>
    Array.from({ length: 3 }, (_, k) => ({
      id: 8000 + ti * 10 + k, idOrdemServico: 8000 + ti * 10 + k, tecnico: t.nome, cliente: ["Residencial Aurora", "Loja Moda Bela", "Dr. Fábio Lins", "Casa 45", "Oficina Central", "Salão Bella"][(ti * 3 + k) % 6],
      hora: horas[(ti + k) % 4], status: k === 0 ? "Concluída" : k === 1 ? "Em execução" : "Agendada", motivo: ["Instalação fibra", "Mudança de endereço", "Ponto adicional"][k],
      bairro: bairros[(ti + k) % 4], enderecoCompleto: `Rua Nova ${30 + ti * 11 + k}, ${bairros[(ti + k) % 4]}`, latitude: -23.32 + k * 0.004, longitude: -46.725 - ti * 0.004, data,
    })),
  );
  return { data, items, tecnicos: instaladores };
}
