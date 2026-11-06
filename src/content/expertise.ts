import type { Universe } from "./types";

export const universes: Universe[] = [
  {
    id: "engineering",
    name: "Engineering",
    thesis: {
      pt: "Sistemas completos: da interface ao servidor, do banco de dados ao deploy em Linux.",
      en: "Complete systems: from interface to server, from database to Linux deploy.",
    },
    skills: [
      { name: "Full Stack Development" },
      { name: "Software Engineering" },
      { name: "React" },
      { name: "JavaScript" },
      // TypeScript: add when there is a confirmed project to point to.
      { name: "Node.js" },
      { name: "Express" },
      { name: "REST APIs" },
      { name: "WebSockets" },
      { name: "SQL & NoSQL" },
      { name: "Linux" },
      { name: "Git" },
      { name: "Nginx" },
      { name: "Electron" },
      { name: "System integrations" },
      { name: "Reverse engineering" },
    ],
  },
  {
    id: "intelligence",
    name: "Intelligence",
    thesis: {
      pt: "Modelos de linguagem e agentes colocados para trabalhar dentro de sistemas reais.",
      en: "Language models and agents put to work inside real systems.",
    },
    skills: [
      { name: "AI Integration" },
      { name: "LLM Integration" },
      { name: "AI Agents" },
      { name: "AI Automation" },
      { name: "Workflow Automation" },
      { name: "Intelligent Systems" },
      { name: "Prompt Engineering" },
      { name: "Agent Maintenance" },
      { name: "Blockchain", note: { pt: "conhecimentos", en: "working knowledge" } },
    ],
  },
  {
    id: "creative",
    name: "Creative",
    thesis: {
      pt: "Marcas, campanhas e movimento — a parte que as pessoas veem primeiro.",
      en: "Brands, campaigns and motion — the part people see first.",
    },
    skills: [
      { name: "Graphic Design" },
      { name: "Motion Design" },
      { name: "Image Manipulation" },
      { name: "Branding" },
      { name: "Visual Identity" },
      { name: "Vector Art" },
      { name: "Logo Design" },
      { name: "Kinetic Typography" },
      { name: "Digital Marketing" },
      { name: "Social Media Design" },
      { name: "Creative Direction" },
    ],
  },
];
