/**
 * The assistant's knowledge base, derived from the same content files the site renders.
 * Nothing here is written separately, so the assistant can't drift from the page.
 */
import { experience } from "../content/experience";
import { universes } from "../content/expertise";
import { lab } from "../content/lab";
import { links, profile } from "../content/profile";
import { projects } from "../content/projects";
import type { L } from "../content/types";

export type Chunk = {
  id: string;
  title: L;
  text: L;
  /** In-site route the visitor can jump to. */
  href?: string;
  /** Concepts this chunk answers (keys of CONCEPTS in retrieve.ts). Matching ones get a score bonus. */
  tags: string[];
  /** Extra plain words that should find this chunk. */
  keywords?: string[];
};

const join = (parts: L[], sep = " "): L => ({
  pt: parts.map((p) => p.pt).join(sep),
  en: parts.map((p) => p.en).join(sep),
});
const same = (s: string): L => ({ pt: s, en: s });

function buildChunks(): Chunk[] {
  const chunks: Chunk[] = [];

  chunks.push({
    id: "who",
    title: { pt: "Quem é Lucas Soares", en: "Who Lucas Soares is" },
    text: {
      pt: "Lucas Soares é desenvolvedor de software, desenvolvedor full stack, designer gráfico e creative technologist. Desenvolve software de ponta a ponta — interface, backend e a inteligência artificial que conecta os dois — e também desenha a forma como ele é visto. Começou pelo design gráfico (logotipos, campanhas, vídeo) e depois passou a desenvolver sistemas corporativos completos, APIs, integrações, agentes de IA e automações.",
      en: "Lucas Soares is a software developer, full stack developer, graphic designer and creative technologist. He builds software end to end — interface, backend and the AI that connects them — and also designs how it is seen. He started in graphic design (logos, campaigns, video) and moved on to building complete business systems, APIs, integrations, AI agents and automations.",
    },
    href: "/#about",
    tags: ["who"],
  });

  chunks.push({
    id: "education",
    title: { pt: "Formação", en: "Education" },
    text: join(
      profile.education.map((e) => ({
        pt: `${e.title.pt}${e.place ? ` — ${e.place}` : ""} (${e.status.pt}).`,
        en: `${e.title.en}${e.place ? ` — ${e.place}` : ""} (${e.status.en}).`,
      })),
    ),
    href: "/#about",
    tags: ["education"],
  });

  chunks.push({
    id: "languages",
    title: { pt: "Idiomas", en: "Languages" },
    text: {
      pt: "Idiomas: " + profile.languages.map((l) => `${l.name.pt} (${l.level.pt})`).join(", ") + ".",
      en: "Languages: " + profile.languages.map((l) => `${l.name.en} (${l.level.en})`).join(", ") + ".",
    },
    tags: ["languages"],
  });

  chunks.push({
    id: "career",
    title: { pt: "Trajetória profissional", en: "Career" },
    text: {
      pt: "Empresas, da mais recente para a mais antiga: " +
        experience.map((x) => `${x.company} (${x.role.pt}${x.current ? ", atual" : ""})`).join("; ") + ".",
      en: "Companies, most recent first: " +
        experience.map((x) => `${x.company} (${x.role.en}${x.current ? ", current" : ""})`).join("; ") + ".",
    },
    href: "/#experience",
    tags: ["career"],
  });

  for (const x of experience) {
    chunks.push({
      id: `exp-${x.company.toLowerCase().replace(/\s+/g, "-")}`,
      title: same(x.company),
      text: {
        pt: `${x.company} — ${x.role.pt}${x.engagement ? ` (${x.engagement.pt})` : ""}${x.period ? `, ${x.period.pt}` : ""}. ${x.summary.pt}`,
        en: `${x.company} — ${x.role.en}${x.engagement ? ` (${x.engagement.en})` : ""}${x.period ? `, ${x.period.en}` : ""}. ${x.summary.en}`,
      },
      href: "/#experience",
      tags: ["career"],
      keywords: [x.company.toLowerCase()],
    });
  }

  for (const p of projects) {
    chunks.push({
      id: `project-${p.slug}`,
      title: same(p.title),
      text: {
        pt: `${p.title} (${p.category.pt}). ${p.line.pt} Problema: ${p.problem.pt} Solução: ${p.solution.pt} Participação de Lucas: ${p.role.pt} Tecnologias: ${p.tech.join(", ")}.`,
        en: `${p.title} (${p.category.en}). ${p.line.en} Problem: ${p.problem.en} Solution: ${p.solution.en} Lucas's role: ${p.role.en} Technologies: ${p.tech.join(", ")}.`,
      },
      href: `/work/${p.slug}`,
      tags: ["projects", ...(p.slug === "workscape" ? ["workscape"] : [])],
      keywords: p.keywords,
    });
    if (p.features?.length) {
      chunks.push({
        id: `features-${p.slug}`,
        title: { pt: `${p.title} — funcionalidades`, en: `${p.title} — features` },
        text: {
          pt: `Funcionalidades do ${p.title}: ${p.features.map((f) => f.pt).join("; ")}.`,
          en: `${p.title} features: ${p.features.map((f) => f.en).join("; ")}.`,
        },
        href: `/work/${p.slug}`,
        tags: p.slug === "workscape" ? ["workscape"] : [],
        keywords: ["funcionalidades", "features", "modulos", "modules", ...p.keywords],
      });
    }
  }

  chunks.push({
    id: "projects",
    title: { pt: "Projetos", en: "Projects" },
    text: {
      pt: "Projetos em destaque: " + projects.map((p) => `${p.title} — ${p.line.pt}`).join(" "),
      en: "Selected projects: " + projects.map((p) => `${p.title} — ${p.line.en}`).join(" "),
    },
    href: "/#work",
    tags: ["projects"],
  });

  chunks.push({
    id: "systems",
    title: { pt: "Sistemas desenvolvidos", en: "Systems built" },
    text: {
      pt: "Sistemas que Lucas desenvolveu: o Workscape, uma plataforma corporativa modular com chat em tempo real, chat com IA, agentes, automações, dashboard, agenda técnica, permissões, base de conhecimento e integrações; na AcessaNet, aplicações, sistemas internos, interfaces e automações; na MK Academy, um novo controle de usuários e computadores.",
      en: "Systems Lucas has built: Workscape, a modular business platform with real-time chat, AI chat, agents, automations, a dashboard, a technical schedule, permissions, a knowledge base and integrations; at AcessaNet, applications, internal systems, interfaces and automations; at MK Academy, a new user and computer management system.",
    },
    href: "/work/workscape",
    tags: ["systems"],
  });

  const ws = projects.find((p) => p.slug === "workscape")!;
  chunks.push({
    id: "workscape-role",
    title: { pt: "Participação no Workscape", en: "Role in Workscape" },
    text: {
      pt: `No Workscape, Lucas foi responsável por: ${ws.role.pt.charAt(0).toLowerCase()}${ws.role.pt.slice(1)} Stack: ${ws.tech.join(", ")}.`,
      en: `In Workscape, Lucas: ${ws.role.en.charAt(0).toLowerCase()}${ws.role.en.slice(1)} Stack: ${ws.tech.join(", ")}.`,
    },
    href: "/work/workscape",
    tags: ["workscape"],
  });

  chunks.push({
    id: "skills",
    title: { pt: "Tecnologias e competências", en: "Technologies and skills" },
    text: {
      pt: universes.map((u) => `${u.name}: ${u.skills.map((s) => s.name).join(", ")}.`).join(" "),
      en: universes.map((u) => `${u.name}: ${u.skills.map((s) => s.name).join(", ")}.`).join(" "),
    },
    href: "/#expertise",
    tags: ["skills"],
  });

  for (const u of universes) {
    chunks.push({
      id: `skills-${u.id}`,
      title: same(u.name),
      text: {
        pt: `${u.name}: ${u.thesis.pt} ${u.skills.map((s) => s.name + (s.note ? ` (${s.note.pt})` : "")).join(", ")}.`,
        en: `${u.name}: ${u.thesis.en} ${u.skills.map((s) => s.name + (s.note ? ` (${s.note.en})` : "")).join(", ")}.`,
      },
      href: "/#expertise",
      tags: [u.id === "intelligence" ? "ai" : u.id === "creative" ? "design" : "engineering"],
      keywords: [u.id],
    });
  }

  chunks.push({
    id: "backend",
    title: { pt: "Backend", en: "Backend" },
    text: {
      pt: "Sim. No backend, Lucas trabalha com Node.js, Express, APIs REST, WebSockets, bancos SQL e NoSQL, Linux e Nginx. O Workscape usa Node.js, Express, Socket.IO e MariaDB.",
      en: "Yes. On the backend Lucas works with Node.js, Express, REST APIs, WebSockets, SQL and NoSQL databases, Linux and Nginx. Workscape runs on Node.js, Express, Socket.IO and MariaDB.",
    },
    href: "/work/workscape",
    tags: ["backend"],
  });

  chunks.push({
    id: "ai-experience",
    title: { pt: "Experiência com IA", en: "AI experience" },
    text: {
      pt: "Lucas integra modelos de linguagem (LLMs) a sistemas, desenvolve e mantém agentes de IA e cria automações inteligentes. No Workscape, implementou um chat com IA, a integração de IA aos módulos do sistema, agentes, automações e envio automático de mensagens.",
      en: "Lucas integrates language models (LLMs) into systems, builds and maintains AI agents, and creates intelligent automations. In Workscape he implemented an AI chat, AI integrated into the system's modules, agents, automations and automatic message sending.",
    },
    href: "/work/workscape",
    tags: ["ai"],
  });

  const motion = lab.filter((i) => i.media.kind === "video");
  chunks.push({
    id: "motion",
    title: { pt: "Motion design", en: "Motion design" },
    text: {
      pt: "Projetos de motion design e kinetic typography (Creative Lab): " + motion.map((i) => `${i.title}${i.client ? ` (${i.client})` : ""}`).join(", ") + ". Mais trabalhos no Behance.",
      en: "Motion design and kinetic typography projects (Creative Lab): " + motion.map((i) => `${i.title}${i.client ? ` (${i.client})` : ""}`).join(", ") + ". More work on Behance.",
    },
    href: "/#lab",
    tags: ["motion", "design"],
  });

  const contact = [
    links.email && `e-mail ${links.email}`,
    links.github && `GitHub ${links.github}`,
    links.behance && `Behance ${links.behance}`,
    links.linkedin && `LinkedIn ${links.linkedin}`,
  ].filter(Boolean);
  chunks.push({
    id: "contact",
    title: { pt: "Contato", en: "Contact" },
    text: {
      pt: `Contato: ${contact.join(", ")}. O currículo completo está em /cv.`,
      en: `Contact: ${contact.join(", ")}. The full résumé is at /cv.`,
    },
    href: "/#contact",
    tags: ["contact"],
  });

  return chunks;
}

export const knowledge: Chunk[] = buildChunks();

/** Plain-text dump used to ground the LLM. */
export function knowledgeAsText(lang: "pt" | "en", subset: Chunk[] = knowledge): string {
  return subset.map((c) => `[${c.id}] ${c.title[lang]}\n${c.text[lang]}`).join("\n\n");
}
