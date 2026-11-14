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
  {
    slug: "workspace-3d",
    index: "05",
    title: "Workspace 3D",
    category: { pt: "Produto web / Escritório virtual / 2D e 3D", en: "Web product / Virtual office / 2D and 3D" },
    line: {
      pt: "A planta do escritório vira interface operacional: um mapa vivo, em 3D ou em 2D, com quem está em cada mesa.",
      en: "The office floor plan becomes an operational interface: a live map, in 3D or 2D, showing who is at each desk.",
    },
    summary: {
      pt: "Workspace 3D transforma a planta do escritório em uma interface de trabalho. O administrador monta o andar num editor e publica; a equipe navega pelo mapa, clica numa mesa, impressora ou TV e vê quem está ali e o que dá para fazer. A empresa escolhe entre um escritório 3D ou um 2D em pixel art, e a troca chega a todos ao vivo.",
      en: "Workspace 3D turns the office floor plan into a working interface. The admin builds the floor in an editor and publishes; the team navigates the map, clicks a desk, printer or TV and sees who is there and what can be done. The company picks a 3D office or a pixel-art 2D one, and the switch reaches everyone live.",
    },
    problem: {
      pt: "Em empresas de atendimento, saber quem está em qual mesa, quem está em chamada e como falar com essa pessoa ou acessar o computador dela exige abrir várias ferramentas soltas.",
      en: "In support companies, knowing who sits where, who is on a call and how to reach that person or their computer takes several disconnected tools.",
    },
    solution: {
      pt: "Um só mapa como painel: cada colaborador tem um avatar sentado na própria mesa que mostra, ao vivo, se está online, digitando ou em atendimento. Dali saem o chat, o acesso remoto, a transferência de atendimento e a fila de impressão, com permissões por perfil e trilha de auditoria.",
      en: "A single map as the dashboard: each person has an avatar seated at their own desk showing, live, whether they are online, typing or on a call. From there come chat, remote access, call transfer and the print queue, with per-role permissions and an audit trail.",
    },
    role: {
      pt: "Produto, design e desenvolvimento completos: do editor 3D e do motor 2D ao servidor, à presença em tempo real, aos avatares e aos testes.",
      en: "Complete product, design and development: from the 3D editor and the 2D engine to the server, real-time presence, avatars and tests.",
    },
    tech: ["React", "TypeScript", "Vite", "React Three Fiber", "Three.js", "Phaser", "Node.js", "Express", "SQLite", "MariaDB", "SSE", "Vitest", "Playwright"],
    features: [
      { pt: "Editor 3D do andar: pisos, paredes, portas, mobiliário, rascunho e publicação por revisão", en: "3D floor editor: floors, walls, doors, furniture, drafts and revision-based publishing" },
      { pt: "Modo operacional: clique numa mesa, impressora ou TV para ver quem está ali e agir", en: "Operational mode: click a desk, printer or TV to see who is there and act" },
      { pt: "Troca global entre 3D e 2D pelo administrador, ao vivo para todos, com um só motor gráfico carregado por vez", en: "Global 3D/2D switch by the admin, live for everyone, with a single graphics engine loaded at a time" },
      { pt: "Escritório 2D em pixel art com movimento em tempo real validado pelo servidor", en: "Pixel-art 2D office with real-time movement validated by the server" },
      { pt: "Avatares personalizados, sentados nas mesas, com presença ao vivo: online, digitando, em atendimento", en: "Customizable avatars seated at desks with live presence: online, typing, on a call" },
      { pt: "Chat, acesso remoto, transferência de atendimento e fila de impressão, com adaptadores de demonstração", en: "Chat, remote access, call transfer and print queue, with demo adapters" },
      { pt: "Perfis (administrador, operador, visualizador), isolamento entre empresas e trilha de auditoria", en: "Roles (admin, operator, viewer), company isolation and an audit trail" },
      { pt: "SQLite local e MariaDB em produção, pelo mesmo código", en: "Local SQLite and production MariaDB from the same code" },
      { pt: "146 testes automatizados e verificações em navegador real", en: "146 automated tests and real-browser checks" },
    ],
    tone: { ink: "#8AB4FF", field: "#060A14" },
    hero: {
      kind: "video",
      slug: "workspace-3d-3d",
      aspect: "16/9",
      alt: { pt: "Workspace 3D no modo 3D: câmera orbitando o escritório com mesas, avatares sentados e a lista de postos", en: "Workspace 3D in 3D mode: the camera orbiting the office with desks, seated avatars and the station list" },
    },
    gallery: [
      {
        kind: "video",
        slug: "workspace-3d-2d",
        aspect: "16/9",
        alt: { pt: "Workspace 3D no modo 2D em pixel art: a equipe nas mesas, andando pelo mapa e a TV do atendimento com a equipe ao vivo", en: "Workspace 3D in pixel-art 2D mode: the team at their desks, walking the map and the support TV showing the live team" },
      },
    ],
    links: [{ label: { pt: "Código no GitHub", en: "Code on GitHub" }, href: "https://github.com/Olukasao/Workspace-3d" }],
    keywords: ["workspace", "escritório virtual", "virtual office", "3d", "2d", "pixel art", "phaser", "react three fiber", "three.js", "presença", "presence", "avatar", "planta", "floor plan", "node", "express", "sqlite", "atendimento"],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
