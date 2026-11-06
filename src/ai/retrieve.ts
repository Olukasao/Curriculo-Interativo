/**
 * Small bilingual BM25 retriever. No embeddings needed at this size, and it runs
 * identically in the browser (demo mode) and on the server (grounding + sources).
 */
import { knowledge, type Chunk } from "./knowledge";

const fold = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Maps PT and EN vocabulary onto shared concepts so either language finds the same chunk. */
const CONCEPTS: Record<string, string[]> = {
  ai: ["ia", "ai", "inteligencia", "artificial", "intelligence", "llm", "llms", "agente", "agentes", "agent", "agents", "gpt", "claude", "modelo", "modelos", "prompt", "automacao", "automacoes", "automation", "automations"],
  backend: ["backend", "back", "servidor", "server", "api", "apis", "node", "nodejs", "express", "banco", "database", "sql", "websocket", "websockets"],
  motion: ["motion", "animacao", "animacoes", "animation", "kinetic", "video", "videos", "filme", "film"],
  design: ["design", "designer", "grafico", "graphic", "branding", "marca", "brand", "identidade", "identity", "logo", "logos", "logotipo", "logotipos", "visual", "criativo", "creative"],
  skills: ["tecnologia", "tecnologias", "technologies", "technology", "stack", "ferramentas", "tools", "domina", "skills", "habilidades", "competencias", "sabe"],
  career: ["experiencia", "experience", "trabalhou", "worked", "trabalha", "works", "empresa", "empresas", "companies", "company", "carreira", "career", "emprego", "trajetoria"],
  projects: ["projeto", "projetos", "project", "projects", "case", "cases", "trabalhos", "work"],
  systems: ["sistema", "sistemas", "system", "systems", "desenvolveu", "built", "plataforma", "platform", "software"],
  contact: ["contato", "contact", "email", "e-mail", "linkedin", "github", "behance", "falar", "reach", "hire", "contratar"],
  education: ["formacao", "education", "faculdade", "universidade", "university", "estudou", "studied", "graduacao", "degree", "curso"],
  languages: ["idioma", "idiomas", "ingles", "english", "espanhol", "spanish", "language", "languages", "fala", "speak"],
  manipulation: ["manipulacao", "manipulation", "photoshop", "composicao", "compositing", "retoque", "retouch", "fotomontagem", "imagem", "imagens"],
  who: ["quem", "who", "sobre", "about", "apresente", "introduce", "perfil", "profile"],
  engineering: ["engenharia", "engineering", "fullstack", "full-stack", "frontend", "front-end", "react", "javascript"],
  workscape: ["workscape", "participacao", "role", "papel"],
};
const WORD_TO_CONCEPT = new Map<string, string>();
for (const [concept, words] of Object.entries(CONCEPTS)) for (const w of words) WORD_TO_CONCEPT.set(w, concept);

const STOP = new Set(
  "a o as os e de da do das dos em no na nos nas um uma uns umas que qual quais para por com ele ela seu sua dele is the a an of to in on and or what which does do he his him with for me show mostre about".split(" "),
);

export function tokenize(text: string): string[] {
  const words = fold(text).match(/[a-z0-9.+#-]+/g) ?? [];
  const out: string[] = [];
  for (const w of words) {
    if (STOP.has(w) || w.length < 2) continue;
    out.push(w);
    const concept = WORD_TO_CONCEPT.get(w);
    if (concept) out.push(`#${concept}`);
  }
  return out;
}

type Doc = { chunk: Chunk; terms: Map<string, number>; length: number };

/** A chunk whose declared concept matches the question's concept gets this bonus per match. */
const CONCEPT_BONUS = 3;

const docs: Doc[] = knowledge.map((chunk) => {
  const tokens = [
    ...tokenize(`${chunk.title.pt} ${chunk.title.en} ${chunk.text.pt} ${chunk.text.en}`),
    ...(chunk.keywords ?? []).flatMap((k) => tokenize(k)),
  ];
  const terms = new Map<string, number>();
  for (const t of tokens) terms.set(t, (terms.get(t) ?? 0) + 1);
  return { chunk, terms, length: tokens.length };
});
const avgLength = docs.reduce((s, d) => s + d.length, 0) / docs.length;
const df = new Map<string, number>();
for (const d of docs) for (const t of d.terms.keys()) df.set(t, (df.get(t) ?? 0) + 1);

export type Hit = { chunk: Chunk; score: number };

export function retrieve(query: string, k = 4): Hit[] {
  const q = [...new Set(tokenize(query))];
  // Generic concepts only count when the question has nothing more specific.
  let concepts = q.filter((t) => t.startsWith("#")).map((t) => t.slice(1));
  const specific = concepts.filter((c) => c !== "projects" && c !== "who");
  if (specific.length) concepts = specific;
  const N = docs.length;
  const k1 = 1.4;
  const b = 0.6;
  return docs
    .map((d) => {
      let score = 0;
      for (const t of q) {
        const f = d.terms.get(t);
        if (!f) continue;
        const idf = Math.log(1 + (N - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5));
        score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.length) / avgLength)));
      }
      for (const t of concepts) if (d.chunk.tags.includes(t)) score += CONCEPT_BONUS;
      return { chunk: d.chunk, score };
    })
    .filter((h) => h.score > 0)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, k);
}

export function detectLang(text: string, fallback: "pt" | "en"): "pt" | "en" {
  const t = ` ${fold(text)} `;
  const pt = (t.match(/ (que|qual|quais|ele|voce|projetos|tecnologias|como|sobre|tem|trabalha|experiencia|mostre|dele) /g) ?? []).length + (/[ãõçáéêí]/.test(text) ? 2 : 0);
  const en = (t.match(/ (what|which|does|he|his|projects|technologies|how|about|has|works|experience|show|the) /g) ?? []).length;
  if (pt === en) return fallback;
  return pt > en ? "pt" : "en";
}
