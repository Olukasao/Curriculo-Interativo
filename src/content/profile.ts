import type { L } from "./types";

/**
 * ─── CONFIGURE HERE ──────────────────────────────────────────────────────────
 * Contact data. `null` hides the link in production and shows a
 * "to configure" marker in development, so nothing is ever invented.
 */
export const links = {
  /** From the résumé PDF (github.com/Olukasao). */
  github: "https://github.com/Olukasao" as string | null,
  behance: "https://www.behance.net/lucassoares205" as string | null,
  linkedin: "https://www.linkedin.com/in/lucas-soares-gon%C3%A7alves-/" as string | null,
  /** From the 2025 résumé PDF. TODO: confirm this is the address to publish. */
  email: "lukasao.11@hotmail.com" as string | null,
  /**
   * Optional static PDF in /public/cv/. When null, "Download PDF" prints the
   * always-current résumé page at /cv instead.
   */
  resumePdf: "/cv/Lucas_Soares_Curriculo_2026.pdf" as string | null,
};

export const profile = {
  name: "Lucas Soares",
  first: "Lucas",
  last: "Soares",
  roles: ["Software Developer", "Full Stack Developer", "Graphic Designer", "Creative Technologist"],
  headline: {
    pt: "Software Developer / Creative Technologist",
    en: "Software Developer / Creative Technologist",
  } satisfies L,
  intro: {
    pt: "Desenvolvo software de ponta a ponta — interface, backend e a inteligência artificial que conecta os dois — e desenho a forma como ele é visto.",
    en: "I build software end to end — interface, backend and the AI that connects them — and I design how it is seen.",
  } satisfies L,
  about: [
    {
      pt: "Comecei pelo design gráfico: logotipos, campanhas, vídeo. Ali aprendi que uma peça só funciona quando alguém entende o que ela diz em poucos segundos.",
      en: "I started in graphic design: logos, campaigns, video. That is where I learned a piece only works when someone understands what it says within seconds.",
    },
    {
      pt: "A programação veio depois e mudou a escala do problema. Hoje desenvolvo sistemas corporativos completos, APIs e integrações, e coloco modelos de linguagem e agentes para trabalhar dentro deles.",
      en: "Programming came next and changed the scale of the problem. Today I build complete business systems, APIs and integrations, and put language models and agents to work inside them.",
    },
    {
      pt: "As duas práticas não disputam espaço. O design define o que o sistema precisa comunicar; a engenharia garante que ele faça isso de forma confiável. Trabalho nos dois lados para que nada se perca entre a ideia e o produto publicado.",
      en: "The two practices do not compete. Design decides what the system has to communicate; engineering makes sure it does so reliably. I work on both sides so nothing is lost between the idea and the shipped product.",
    },
  ] satisfies L[],
  education: [
    {
      title: { pt: "Ciência da Computação", en: "Computer Science" },
      place: "Universidade Anchieta",
      status: { pt: "Em andamento · início em 2022", en: "In progress · started 2022" },
    },
    {
      title: { pt: "Design Gráfico", en: "Graphic Design" },
      place: null as string | null, // TODO: institution
      status: { pt: "Formação concluída", en: "Completed" },
    },
  ],
  languages: [
    { name: { pt: "Português", en: "Portuguese" }, level: { pt: "Nativo", en: "Native" } },
    { name: { pt: "Inglês", en: "English" }, level: { pt: "Avançado", en: "Advanced" } },
    { name: { pt: "Espanhol", en: "Spanish" }, level: { pt: "Básico", en: "Basic" } },
  ],
};
