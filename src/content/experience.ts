import type { Experience } from "./types";

/**
 * Most recent first. Dates are only filled where a source confirms them
 * (the Indecon period comes from the résumé PDF). Add `period` as you confirm others.
 */
export const experience: Experience[] = [
  {
    company: "Dias Gestão",
    role: { pt: "Desenvolvedor de Software", en: "Software Developer" },
    period: { pt: "Atual", en: "Current" },
    current: true,
    summary: {
      pt: "Desenvolvimento de software e criação de soluções digitais, com participação em projetos de design e marketing.",
      en: "Software development and digital solutions, also contributing to design and marketing projects.",
    },
  },
  {
    company: "AcessaNet",
    role: { pt: "Desenvolvimento de Software e Design Gráfico", en: "Software Development & Graphic Design" },
    summary: {
      pt: "Aplicações, sistemas internos, interfaces digitais e automações — junto com materiais gráficos e peças de motion para a marca.",
      en: "Applications, internal systems, digital interfaces and automations — alongside graphic materials and motion pieces for the brand.",
    },
  },
  {
    company: "Ortobom",
    role: { pt: "Marketing e Design", en: "Marketing & Design" },
    engagement: { pt: "PJ", en: "Contractor" },
    summary: {
      pt: "Comunicação visual e conteúdo para campanhas e redes sociais: imagens, banners e vídeos.",
      en: "Visual communication and content for campaigns and social media: images, banners and video.",
    },
  },
  {
    company: "MK Academy",
    role: { pt: "Tecnologia da Informação", en: "Information Technology" },
    engagement: { pt: "PJ", en: "Contractor" },
    summary: {
      pt: "Criação e manutenção de um novo controle de usuários e computadores.",
      en: "Built and maintained a new user and computer management system.",
    },
  },
  {
    company: "Indecon",
    role: { pt: "Office Boy / Apoio Administrativo", en: "Office Assistant" },
    period: { pt: "2018 – 2021", en: "2018 – 2021" },
    summary: {
      pt: "Rotinas administrativas em escritório contábil: entrada, controle e arquivamento de notas fiscais.",
      en: "Administrative routines at an accounting firm: invoice intake, control and filing.",
    },
  },
];
