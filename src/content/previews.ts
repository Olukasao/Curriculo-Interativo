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
        src: "/apps/acessanet-app/index.html?logout#/cliente",
        phone: true,
        note: {
          pt: "A Central do Assinante do app Android, começando no login (CPF e senha já preenchidos). Faturas, chamados e avisos são fictícios.",
          en: "The Android subscriber app, starting at the sign-in (CPF and password prefilled). Bills, tickets and notices are fictional.",
        },
      },
      {
        id: "app-logado",
        label: { pt: "App (já logado)", en: "App (signed in)" },
        src: "/apps/acessanet-app/index.html?auto",
        phone: true,
        note: { pt: "O mesmo app, já dentro da conta de demonstração.", en: "The same app, already inside the demo account." },
      },
    ],
  },
  "chat-interno": {
    title: { pt: "Chat interno — demonstração ao vivo", en: "Internal chat — live demo" },
    back: "/#demos",
    views: [
      {
        id: "login",
        label: { pt: "Login", en: "Sign in" },
        src: "/apps/chat-interno/index.html?logout#/login",
        note: { pt: "Tela de login real do chat. O acesso já vem preenchido: é só entrar.", en: "The chat's real sign-in screen. Access is prefilled: just sign in." },
      },
      {
        id: "intranet",
        label: { pt: "Intranet e acessos rápidos", en: "Intranet and quick access" },
        src: "/apps/chat-interno/index.html?auto#/",
        note: { pt: "Página inicial da intranet, com Meu Acesso Rápido e todos os acessos por categoria.", en: "The intranet home, with My Quick Access and every shortcut by category." },
      },
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
    ],
  },
  "agenda-tecnicos": {
    title: { pt: "Agenda de técnicos — demonstração ao vivo", en: "Technician schedule — live demo" },
    back: "/#demos",
    views: [
      {
        id: "agenda",
        label: { pt: "Com login", en: "With sign-in" },
        src: "/apps/agenda-tecnicos/index.html",
        note: {
          pt: "O painel NOC da agenda (projeto próprio): entre pela tela de login e veja 12 técnicos, almoços, pausas, equipes e ausências.",
          en: "The schedule NOC panel (its own project): sign in, then see 12 technicians, lunches, breaks, teams and absences.",
        },
      },
      {
        id: "direto",
        label: { pt: "Direto na agenda", en: "Straight to the schedule" },
        src: "/apps/agenda-tecnicos/index.html?auto",
        note: { pt: "Mesma agenda, sem passar pelo login.", en: "Same schedule, skipping the sign-in." },
      },
    ],
  },
};
