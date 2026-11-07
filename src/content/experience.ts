import type { Experience } from "./types";

/** Most recent first. Source: currículo 2026 (PDF). */
export const experience: Experience[] = [
  {
    company: "Dias Gestão",
    role: { pt: "Desenvolvedor de Software", en: "Software Developer" },
    period: { pt: "Atual", en: "Current" },
    current: true,
    summary: {
      pt: "Programação e desenvolvimento de soluções digitais para diferentes empresas atendidas pela prestadora de serviços, além de logotipos, identidades visuais, conteúdo para Instagram, motion graphics, animações e vídeos.",
      en: "Programming and digital solutions for the different companies served by the service provider, plus logos, visual identities, Instagram content, motion graphics, animations and video.",
    },
  },
  {
    company: "AcessaNet",
    role: { pt: "Desenvolvimento Full Stack e Design Gráfico", en: "Full Stack Development & Graphic Design" },
    period: { pt: "2026", en: "2026" },
    summary: {
      pt: "Workscape, chat corporativo, agenda técnica, dashboards e integrações operacionais com sistemas de telecomunicações; site institucional e Central do Assinante; interfaces, identidades visuais e peças para campanhas digitais.",
      en: "Workscape, company chat, technical schedule, dashboards and operational integrations with telecom systems; the institutional website and subscriber portal; interfaces, visual identities and pieces for digital campaigns.",
    },
  },
  {
    company: "Freelancer",
    role: { pt: "Desenvolvimento Web e Design Gráfico", en: "Web Development & Graphic Design" },
    period: { pt: "Desde 2021", en: "Since 2021" },
    summary: {
      pt: "Sites, identidade de marcas, logos, comunicação para redes sociais e projetos independentes, incluindo a Kollect. Continuo atendendo projetos em paralelo.",
      en: "Websites, brand identities, logos, social media communication and independent projects, including Kollect. I still take on projects alongside my main role.",
    },
  },
  {
    company: "MK Academy",
    role: { pt: "Profissional de TI", en: "IT Professional" },
    engagement: { pt: "PJ", en: "Contractor" },
    period: { pt: "2022", en: "2022" },
    summary: {
      pt: "Suporte técnico, manutenção de computadores e gestão de usuários e equipamentos.",
      en: "Technical support, computer maintenance and user and equipment management.",
    },
  },
  {
    company: "Ortobom",
    role: { pt: "Social Media e Design", en: "Social Media & Design" },
    period: { pt: "2021 – 2022", en: "2021 – 2022" },
    summary: {
      pt: "Criação de campanhas, peças gráficas e conteúdo para redes sociais; apoio ao marketing.",
      en: "Campaigns, graphic pieces and social media content; marketing support.",
    },
  },
  {
    company: "Indecon Escritório Contábil",
    role: { pt: "Apoio Administrativo", en: "Administrative Support" },
    period: { pt: "2018 – 2021", en: "2018 – 2021" },
    summary: {
      pt: "Lançamento e organização de documentos fiscais e rotinas administrativas.",
      en: "Entry and organization of tax documents and administrative routines.",
    },
  },
];
