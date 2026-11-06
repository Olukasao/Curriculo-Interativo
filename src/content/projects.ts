import type { L, Media, Project } from "./types";

const ph = (label: L, todo: string, aspect: Media["aspect"] = "16/9"): Media => ({
  kind: "placeholder",
  aspect,
  label,
  todo,
});

/**
 * Workscape modules, in the order the camera visits them on the home page.
 * Each entry only restates features listed in the project brief.
 * Drop a screen recording into /public/media/workscape-<id>/ via `npm run media`
 * and set `media` to replace the schematic for that module.
 */
export const workscapeModules: {
  id: string;
  title: L;
  body: L;
  media?: Media;
}[] = [
  {
    id: "chat",
    title: { pt: "Comunicação em tempo real", en: "Real-time communication" },
    body: {
      pt: "Chat corporativo e comunicação interna, com compartilhamento de arquivos entre equipes.",
      en: "Company chat and internal communication, with file sharing between teams.",
    },
  },
  {
    id: "ai",
    title: { pt: "Inteligência artificial integrada", en: "Built-in artificial intelligence" },
    body: {
      pt: "Um chat com IA e a IA ligada aos próprios módulos do sistema, não isolada em uma janela.",
      en: "An AI chat, and AI wired into the system's own modules rather than isolated in a window.",
    },
  },
  {
    id: "agents",
    title: { pt: "Agentes e automações", en: "Agents and automations" },
    body: {
      pt: "Agentes, fluxos automatizados e envio automático de mensagens.",
      en: "Agents, automated workflows and automatic message sending.",
    },
  },
  {
    id: "ops",
    title: { pt: "Operação", en: "Operations" },
    body: {
      pt: "Dashboard administrativo, agenda técnica e gerenciamento operacional.",
      en: "Admin dashboard, technical schedule and operations management.",
    },
  },
  {
    id: "admin",
    title: { pt: "Controle e conhecimento", en: "Control and knowledge" },
    body: {
      pt: "Usuários, permissões, módulos administrativos e uma base de conhecimento.",
      en: "Users, permissions, admin modules and a knowledge base.",
    },
  },
  {
    id: "integrations",
    title: { pt: "Integrações", en: "Integrations" },
    body: {
      pt: "Conexão com APIs e sistemas externos.",
      en: "Connections to APIs and external systems.",
    },
  },
];

export const projects: Project[] = [
  {
    slug: "workscape",
    index: "01",
    title: "Workscape",
    category: { pt: "Software corporativo / IA / Automação", en: "Enterprise software / AI / Automation" },
    line: {
      pt: "Uma plataforma modular que reúne a operação de uma empresa em um só lugar.",
      en: "A modular platform that brings a company's operations into one place.",
    },
    summary: {
      pt: "Workscape é uma plataforma corporativa modular que desenvolvi para centralizar operações e recursos de uma empresa: comunicação, IA, automações, agenda, administração e integrações.",
      en: "Workscape is a modular business platform I built to centralize a company's operations and resources: communication, AI, automations, scheduling, administration and integrations.",
    },
    problem: {
      pt: "Diferentes operações e recursos da empresa precisavam de um ponto comum, em vez de ficarem espalhados entre ferramentas separadas.",
      en: "The company's operations and resources needed a common home instead of being spread across separate tools.",
    },
    solution: {
      pt: "Uma plataforma organizada em módulos — chat em tempo real, chat com IA, agentes e automações, dashboard, agenda técnica, usuários e permissões, arquivos, base de conhecimento e integrações — sobre uma única base de usuários.",
      en: "A platform organized into modules — real-time chat, AI chat, agents and automations, dashboard, technical schedule, users and permissions, files, knowledge base and integrations — on a single user base.",
    },
    role: {
      // TODO: confirm scope wording.
      pt: "Desenvolvimento da plataforma, da interface ao servidor, incluindo a integração de inteligência artificial, os agentes e as automações.",
      en: "Built the platform from interface to server, including the AI integration, the agents and the automations.",
    },
    tech: ["React", "JavaScript", "Node.js", "Express", "Socket.IO", "MariaDB", "Electron", "Linux", "Nginx"],
    features: [
      { pt: "Chat corporativo em tempo real", en: "Real-time company chat" },
      { pt: "Chat com inteligência artificial", en: "AI chat" },
      { pt: "Integração de IA aos sistemas", en: "AI integrated into the systems" },
      { pt: "Agentes e automações", en: "Agents and automations" },
      { pt: "Envio automático de mensagens", en: "Automatic message sending" },
      { pt: "Dashboard administrativo", en: "Admin dashboard" },
      { pt: "Agenda técnica", en: "Technical schedule" },
      { pt: "Gerenciamento operacional", en: "Operations management" },
      { pt: "Comunicação interna", en: "Internal communication" },
      { pt: "Gerenciamento de usuários", en: "User management" },
      { pt: "Controle de permissões", en: "Permission control" },
      { pt: "Compartilhamento de arquivos", en: "File sharing" },
      { pt: "Base de conhecimento", en: "Knowledge base" },
      { pt: "Módulos administrativos", en: "Admin modules" },
      { pt: "Integrações com APIs e sistemas externos", en: "API and external system integrations" },
    ],
    tone: { ink: "#C9D3FF", field: "#05060C" },
    hero: ph(
      { pt: "Gravação de tela do Workscape", en: "Workscape screen recording" },
      "Screen recording of the main workspace (chat + AI panel), 16:9, 10–20 s. Encode with `npm run media -- <file> workscape-hero`.",
    ),
    gallery: [
      ph({ pt: "Chat em tempo real", en: "Real-time chat" }, "Screenshot: company chat with a conversation open."),
      ph({ pt: "Chat com IA", en: "AI chat" }, "Screenshot or recording: AI chat answering a question."),
      ph({ pt: "Automações", en: "Automations" }, "Screenshot: an automation / agent configuration."),
      ph({ pt: "Dashboard e agenda", en: "Dashboard and schedule" }, "Screenshot: admin dashboard and technical schedule."),
      ph({ pt: "Permissões", en: "Permissions" }, "Screenshot: users and permissions screen.", "4/3"),
      ph({ pt: "App desktop", en: "Desktop app" }, "Screenshot: Electron desktop build.", "4/3"),
    ],
    keywords: ["workscape", "enterprise", "corporativo", "plataforma", "chat", "ia", "ai", "agentes", "agents", "automação", "automation", "backend", "socket", "electron", "mariadb", "fullstack"],
  },
  {
    slug: "acessanet",
    index: "02",
    title: "AcessaNet",
    category: { pt: "Desenvolvimento web / Experiência digital / Design", en: "Web development / Digital experience / Visual design" },
    line: {
      pt: "Interfaces, sistemas e a comunicação visual de um provedor de internet.",
      en: "Interfaces, systems and the visual communication of an internet provider.",
    },
    summary: {
      pt: "Na AcessaNet trabalhei nas duas pontas: desenvolvendo interfaces, aplicações e sistemas internos, e criando os materiais gráficos e as peças de motion da marca.",
      en: "At AcessaNet I worked on both ends: building interfaces, applications and internal systems, and creating the brand's graphic materials and motion pieces.",
    },
    problem: {
      pt: "Uma marca que precisa estar presente no site, nas campanhas e nas redes com a mesma voz — e sistemas internos que sustentem a operação.",
      en: "A brand that needs the same voice on its website, in campaigns and on social media — and internal systems that support the operation.",
    },
    solution: {
      pt: "Desenvolvimento de interfaces e aplicações, automações e sistemas internos, somados a campanhas, kinetic typography e filmes de apresentação produzidos para a marca.",
      en: "Interfaces and applications, automations and internal systems, alongside campaigns, kinetic typography and presentation films produced for the brand.",
    },
    role: {
      pt: "Desenvolvimento de software e design gráfico — da interface ao filme de campanha.",
      en: "Software development and graphic design — from the interface to the campaign film.",
    },
    tech: ["React", "JavaScript", "HTML", "CSS", "Node.js", "Motion design"],
    tone: { ink: "#5B9BFF", field: "#020817" },
    hero: {
      kind: "video",
      slug: "acessanet-site-reveal",
      aspect: "16/9",
      alt: {
        pt: "Filme de apresentação do site da AcessaNet com capturas reais da interface em desktop e celular.",
        en: "Presentation film of the AcessaNet website with real interface captures on desktop and mobile.",
      },
    },
    gallery: [
      { kind: "video", slug: "acessanet-kinetic", aspect: "16/9", alt: { pt: "Kinetic typography para a AcessaNet", en: "Kinetic typography for AcessaNet" } },
      { kind: "video", slug: "acessanet-nao-pode-parar", aspect: "9/16", alt: { pt: "Peça vertical “A internet não pode te parar”", en: "Vertical piece “A internet não pode te parar”" } },
      { kind: "video", slug: "acessanet-outubro-rosa", aspect: "9/16", alt: { pt: "Campanha Outubro Rosa", en: "Pink October campaign" } },
      { kind: "video", slug: "acessanet-premium", aspect: "16/9", alt: { pt: "Filme AcessaNet Premium", en: "AcessaNet Premium film" } },
      { kind: "video", slug: "acessanet-comercial", aspect: "16/9", alt: { pt: "Comercial AcessaNet", en: "AcessaNet commercial" } },
      ph({ pt: "Interface do site — desktop", en: "Website interface — desktop" }, "Full-page desktop screenshot of the site."),
      ph({ pt: "Interface do site — celular", en: "Website interface — mobile" }, "Mobile screenshots (2–3 screens).", "9/16"),
    ],
    links: [{ label: { pt: "acessanet.com.br", en: "acessanet.com.br" }, href: "https://acessanet.com.br" }],
    keywords: ["acessanet", "site", "website", "web", "interface", "campanha", "campaign", "motion", "provedor", "isp", "design"],
  },
  {
    slug: "creative-lab",
    index: "03",
    title: "Creative Lab",
    category: { pt: "Motion design / Branding / Comunicação visual", en: "Motion design / Branding / Visual communication" },
    line: {
      pt: "Motion, kinetic typography, campanhas e identidades.",
      en: "Motion, kinetic typography, campaigns and identities.",
    },
    summary: {
      pt: "O laboratório reúne o trabalho criativo: filmes de motion, kinetic typography, campanhas, identidades visuais e composições digitais.",
      en: "The lab collects the creative work: motion films, kinetic typography, campaigns, visual identities and digital compositions.",
    },
    problem: {
      pt: "Cada marca e cada campanha pede uma linguagem própria, que precisa ser entendida em poucos segundos de tela.",
      en: "Every brand and campaign needs its own language, one that reads within a few seconds on screen.",
    },
    solution: {
      pt: "Peças pensadas a partir do ritmo: tipografia que se move com intenção, composição forte e entrega em todos os formatos — 16:9, 9:16, 4:5 e 1:1.",
      en: "Pieces built from rhythm: type that moves with intent, strong composition and delivery in every format — 16:9, 9:16, 4:5 and 1:1.",
    },
    role: {
      pt: "Direção de arte, design e animação.",
      en: "Art direction, design and animation.",
    },
    tech: ["Motion design", "Kinetic typography", "Photoshop", "Sony Vegas"],
    tone: { ink: "#FFFFFF", field: "#000000" },
    hero: {
      kind: "video",
      slug: "acessanet-kinetic",
      aspect: "16/9",
      alt: { pt: "Kinetic typography para a AcessaNet", en: "Kinetic typography for AcessaNet" },
    },
    gallery: [],
    links: [{ label: { pt: "Behance", en: "Behance" }, href: "https://www.behance.net/lucassoares205" }],
    keywords: ["creative", "lab", "motion", "kinetic", "tipografia", "typography", "campanha", "branding", "logo", "design gráfico", "vetor", "social"],
  },
  {
    slug: "kollect",
    index: "04",
    title: "Kollect",
    category: { pt: "Branding / Direção criativa / Empreendedorismo", en: "Branding / Creative direction / Entrepreneurship" },
    line: {
      pt: "Uma marca para o universo dos colecionáveis — da identidade ao filme.",
      en: "A brand for the world of collectibles — from identity to film.",
    },
    summary: {
      pt: "Kollect é um projeto de marca para o universo dos colecionáveis. A assinatura “Kollect your world” sustenta todo o sistema: o O de WORLD se transforma a cada universo, enquanto o mascote no O de KOLLECT permanece fixo.",
      en: "Kollect is a brand project for the world of collectibles. The line “Kollect your world” drives the whole system: the O in WORLD transforms with every universe while the mascot in KOLLECT's O stays fixed.",
    },
    problem: {
      pt: "Colecionáveis atravessam universos muito diferentes. A marca precisava acolher todos eles sem perder a própria cara.",
      en: "Collectibles span very different universes. The brand had to welcome all of them without losing its own face.",
    },
    solution: {
      pt: "Uma regra simples e rígida: o mascote é intocável; só o O de WORLD muda — vira globo, pneu, bloco, bola. A regra gera infinitas peças com uma identidade constante.",
      en: "One strict rule: the mascot is untouchable; only the O in WORLD changes — globe, tyre, block, ball. The rule generates endless pieces with a constant identity.",
    },
    role: {
      pt: "Identidade visual, branding, comunicação e direção criativa.",
      en: "Visual identity, branding, communication and creative direction.",
    },
    tech: ["Branding", "Identidade visual", "Motion design", "Direção criativa"],
    tone: { ink: "#F2C14E", field: "#03100A" },
    hero: {
      kind: "video",
      slug: "kollect-your-world",
      aspect: "16/9",
      alt: { pt: "Filme da identidade Kollect your world", en: "Kollect your world identity film" },
    },
    gallery: [
      { kind: "video", slug: "kollect-four-worlds", aspect: "4/5", alt: { pt: "Kollect — mundos", en: "Kollect — worlds" } },
      { kind: "video", slug: "kollect-comercial", aspect: "16/9", alt: { pt: "Comercial Kollect", en: "Kollect commercial" } },
      ph({ pt: "Aplicações da marca", en: "Brand applications" }, "Packaging, social posts or store mockups.", "4/5"),
    ],
    keywords: ["kollect", "colecionáveis", "collectibles", "marca", "brand", "branding", "identidade", "identity", "mascote", "direção criativa"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
