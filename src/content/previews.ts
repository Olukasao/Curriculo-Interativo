import type { L } from "./types";

type View = { id: string; label: L; src: string; note: L; phone?: boolean };
type Preview = { title: L; views: View[]; /** Where "back" goes; defaults to the case study. */ back?: string };

/** Live previews: static builds in /public/apps, each running against simulated data. */
export const previews: Record<string, Preview> = {
  workscape: {
    title: { pt: "Workscape — demonstração ao vivo", en: "Workscape — live demo" },
    views: [
      {
        id: "noc",
        label: { pt: "Painel NOC", en: "NOC dashboard" },
        src: "/apps/workscape/index.html?auto#/dashboard",
        note: { pt: "Painel NOC com números e chamados em andamento fictícios.", en: "NOC dashboard with fictional numbers and running tickets." },
      },
      {
        id: "app",
        label: { pt: "Aplicativo completo", en: "Full app" },
        src: "/apps/workscape/index.html",
        note: {
          pt: "O front-end real do Workscape, com dados e servidor simulados. Entre com o acesso já preenchido.",
          en: "The real Workscape front end, with simulated data and server. Sign in with the prefilled access.",
        },
      },
    ],
  },
  acessanet: {
    title: { pt: "AcessaNet — prévia ao vivo", en: "AcessaNet — live preview" },
    views: [
      {
        id: "site",
        label: { pt: "Site", en: "Website" },
        src: "/apps/acessanet-site/index.html",
        note: {
          pt: "O site real. Para ver a Central do Assinante, abra Cliente e entre com o CPF de demonstração 123.456.789-09.",
          en: "The real website. To see the subscriber portal, open Cliente and sign in with the demo CPF 123.456.789-09.",
        },
      },
      {
        id: "app",
        label: { pt: "App Android", en: "Android app" },
        src: "/apps/acessanet-app/index.html?auto",
        phone: true,
        note: {
          pt: "A Central do Assinante do app Android, no navegador e em modo demonstração (sem dados de clientes).",
          en: "The Android subscriber app running in the browser in demo mode (no customer data).",
        },
      },
    ],
  },
  "chat-interno": {
    title: { pt: "Chat interno — demonstração ao vivo", en: "Internal chat — live demo" },
    back: "/#demos",
    views: [
      {
        id: "chat",
        label: { pt: "Conversa direta", en: "Direct chat" },
        src: "/apps/chat-interno/index.html?auto#/chat?conversa=2",
        note: {
          pt: "O chat interno (projeto próprio) com dados fictícios: conversas, grupos, arquivos, reações e respostas simuladas.",
          en: "The internal chat (its own project) with fictional data: conversations, groups, files, reactions and simulated replies.",
        },
      },
      {
        id: "grupo",
        label: { pt: "Grupo", en: "Group" },
        src: "/apps/chat-interno/index.html?auto#/chat?grupo=201",
        note: { pt: "Grupo com imagens, arquivos, links e reações. Escreva algo e veja alguém responder.", en: "Group with images, files, links and reactions. Write something and watch someone reply." },
      },
      {
        id: "intranet",
        label: { pt: "Intranet", en: "Intranet" },
        src: "/apps/chat-interno/index.html?auto#/",
        note: { pt: "A página inicial da intranet que envolve o chat.", en: "The intranet home page that wraps the chat." },
      },
    ],
  },
  "agenda-tecnicos": {
    title: { pt: "Agenda de técnicos — demonstração ao vivo", en: "Technician schedule — live demo" },
    back: "/#demos",
    views: [
      {
        id: "agenda",
        label: { pt: "Agenda de técnicos", en: "Technician schedule" },
        src: "/apps/agenda-tecnicos/index.html",
        note: {
          pt: "O painel NOC da agenda (projeto próprio) com dados fictícios: agenda, coordenador de rota, mapa de chamados e horários.",
          en: "The schedule NOC panel (its own project) with fictional data: schedule, route coordinator, tickets map and shifts.",
        },
      },
    ],
  },
};
