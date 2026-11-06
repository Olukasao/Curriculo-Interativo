import type { L, LabCategory, LabItem } from "./types";

export const labCategories: { id: LabCategory; label: L }[] = [
  { id: "motion", label: { pt: "Motion", en: "Motion" } },
  { id: "kinetic", label: { pt: "Kinetic type", en: "Kinetic type" } },
  { id: "campaign", label: { pt: "Campanhas", en: "Campaigns" } },
  { id: "identity", label: { pt: "Identidade", en: "Identity" } },
  { id: "logo", label: { pt: "Logotipos", en: "Logos" } },
  { id: "vector", label: { pt: "Vetor", en: "Vector" } },
  { id: "social", label: { pt: "Redes sociais", en: "Social" } },
  { id: "composition", label: { pt: "Composição", en: "Composition" } },
  { id: "direction", label: { pt: "Direção de arte", en: "Art direction" } },
];

/**
 * Creative Lab entries. Videos come from /public/media/<slug>/.
 * Add a piece: encode it with `npm run media -- <file> <slug>`, then append an entry.
 */
export const lab: LabItem[] = [
  {
    id: "acessanet-kinetic",
    title: "AcessaNet — Kinetic",
    client: "AcessaNet",
    categories: ["kinetic", "motion"],
    media: { kind: "video", slug: "acessanet-kinetic", aspect: "16/9", alt: { pt: "Kinetic typography AcessaNet", en: "AcessaNet kinetic typography" } },
    description: {
      pt: "Kinetic typography em 16:9 e 9:16 para a marca AcessaNet.",
      en: "Kinetic typography in 16:9 and 9:16 for the AcessaNet brand.",
    },
    project: "acessanet",
  },
  {
    id: "kollect-your-world",
    title: "Kollect your world",
    client: "Kollect",
    categories: ["identity", "motion", "direction"],
    media: { kind: "video", slug: "kollect-your-world", aspect: "16/9", alt: { pt: "Filme da identidade Kollect", en: "Kollect identity film" } },
    description: {
      pt: "O O de WORLD atravessa oito universos em 27 segundos, em loop. KOLLECT, o mascote e o restante da assinatura nunca se movem.",
      en: "The O in WORLD travels through eight universes in 27 seconds, looping. KOLLECT, the mascot and the rest of the signature never move.",
    },
    project: "kollect",
  },
  {
    id: "acessanet-nao-pode-parar",
    title: "A internet não pode te parar",
    client: "AcessaNet",
    categories: ["kinetic", "social", "campaign"],
    media: { kind: "video", slug: "acessanet-nao-pode-parar", aspect: "9/16", alt: { pt: "Peça vertical AcessaNet", en: "AcessaNet vertical piece" } },
    description: {
      pt: "Peça vertical de kinetic typography para redes sociais.",
      en: "Vertical kinetic typography piece for social media.",
    },
    project: "acessanet",
  },
  {
    id: "acessanet-outubro-rosa",
    title: "Outubro Rosa",
    client: "AcessaNet",
    categories: ["campaign", "social"],
    media: { kind: "video", slug: "acessanet-outubro-rosa", aspect: "9/16", alt: { pt: "Campanha Outubro Rosa", en: "Pink October campaign" } },
    description: {
      pt: "Campanha de Outubro Rosa em formato vertical.",
      en: "Pink October campaign in vertical format.",
    },
    project: "acessanet",
  },
  {
    id: "kollect-four-worlds",
    title: "Kollect — Mundos",
    client: "Kollect",
    categories: ["motion", "identity", "social"],
    media: { kind: "video", slug: "kollect-four-worlds", aspect: "4/5", alt: { pt: "Kollect mundos", en: "Kollect worlds" } },
    description: {
      pt: "Em cada cena o objeto chega primeiro e a tipografia reage a ele: pneu, bloco de grama, bola, globo.",
      en: "In every scene the object arrives first and the type reacts to it: tyre, grass block, ball, globe.",
    },
    project: "kollect",
  },
  {
    id: "acessanet-comercial",
    title: "AcessaNet — Comercial",
    client: "AcessaNet",
    categories: ["campaign", "motion"],
    media: { kind: "video", slug: "acessanet-comercial", aspect: "16/9", alt: { pt: "Comercial AcessaNet", en: "AcessaNet commercial" } },
    description: { pt: "Filme comercial em 16:9.", en: "Commercial film in 16:9." },
    project: "acessanet",
  },
  {
    id: "izes-brinquedos",
    title: "Izes Brinquedos",
    client: "Izes Brinquedos",
    categories: ["campaign", "social"],
    media: { kind: "video", slug: "izes-brinquedos", aspect: "9/16", alt: { pt: "Campanha Izes Brinquedos", en: "Izes Brinquedos campaign" } },
    description: {
      pt: "“A diversão começa aqui” — campanha vertical.",
      en: "“A diversão começa aqui” — vertical campaign.",
    },
  },
  {
    id: "acessanet-premium",
    title: "AcessaNet Premium",
    client: "AcessaNet",
    categories: ["motion", "campaign"],
    media: { kind: "video", slug: "acessanet-premium", aspect: "16/9", alt: { pt: "Filme AcessaNet Premium", en: "AcessaNet Premium film" } },
    description: { pt: "Filme de apresentação do plano premium.", en: "Presentation film for the premium plan." },
    project: "acessanet",
  },
  {
    id: "kollect-comercial",
    title: "Kollect — Comercial",
    client: "Kollect",
    categories: ["campaign", "motion"],
    media: { kind: "video", slug: "kollect-comercial", aspect: "16/9", alt: { pt: "Comercial Kollect", en: "Kollect commercial" } },
    description: { pt: "Filme comercial da marca.", en: "Brand commercial." },
    project: "kollect",
  },
  {
    id: "todo-logos",
    title: "Logotipos",
    categories: ["logo", "vector", "identity"],
    media: {
      kind: "placeholder",
      aspect: "1/1",
      label: { pt: "Logotipos", en: "Logos" },
      todo: "Logo sheet export from Behance (PNG/WebP, 1600px).",
    },
    description: { pt: "Seleção de logotipos — material a adicionar.", en: "Logo selection — material to be added." },
  },
  {
    id: "todo-social",
    title: "Artes para redes sociais",
    categories: ["social", "direction"],
    media: {
      kind: "placeholder",
      aspect: "4/5",
      label: { pt: "Redes sociais", en: "Social" },
      todo: "3–6 social posts (4:5), e.g. the Ortobom work.",
    },
    description: { pt: "Posts e campanhas para redes — material a adicionar.", en: "Social posts and campaigns — material to be added." },
  },
  {
    id: "todo-vector",
    title: "Design vetorial",
    categories: ["vector"],
    media: {
      kind: "placeholder",
      aspect: "1/1",
      label: { pt: "Vetor", en: "Vector" },
      todo: "Vector illustrations (SVG or PNG).",
    },
    description: { pt: "Ilustrações vetoriais — material a adicionar.", en: "Vector illustrations — material to be added." },
  },
];
