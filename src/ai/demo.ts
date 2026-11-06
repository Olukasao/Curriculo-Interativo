/**
 * Demo mode: answers assembled only from knowledge-base sentences.
 * Used when no LLM is configured, and in the browser when the API is unreachable.
 */
import { detectLang, retrieve } from "./retrieve";
import type { AskResponse, Source } from "./protocol";

const MIN_SCORE = 1.2;

const lead = {
  pt: "Pelo que está no portfólio:",
  en: "From what's in the portfolio:",
};

const unknown = {
  pt: "Não encontrei isso no portfólio, e prefiro não supor. Posso falar sobre os projetos (Workscape, AcessaNet, Creative Lab, Kollect), a experiência com IA, as tecnologias, a trajetória ou o contato.",
  en: "I couldn't find that in the portfolio, and I'd rather not guess. I can talk about the projects (Workscape, AcessaNet, Creative Lab, Kollect), AI experience, technologies, career or contact.",
};

export function demoAnswer(question: string, uiLang: "pt" | "en"): AskResponse {
  const lang = detectLang(question, uiLang);
  const hits = retrieve(question, 4);
  if (!hits.length || hits[0].score < MIN_SCORE) {
    return { answer: unknown[lang], sources: [], mode: "demo", lang };
  }
  const top = hits[0];
  const picked = [top, ...hits.slice(1).filter((h) => h.score >= top.score * 0.75)].slice(0, 2);
  const answer = [lead[lang], ...picked.map((h) => h.chunk.text[lang])].join("\n\n");
  return { answer, sources: toSources(hits, lang), mode: "demo", lang };
}

export function toSources(hits: { chunk: { id: string; title: { pt: string; en: string }; href?: string } }[], lang: "pt" | "en"): Source[] {
  const seen = new Set<string>();
  const out: Source[] = [];
  for (const h of hits) {
    if (!h.chunk.href || seen.has(h.chunk.href)) continue;
    seen.add(h.chunk.href);
    out.push({ id: h.chunk.id, title: h.chunk.title[lang], href: h.chunk.href });
  }
  return out.slice(0, 3);
}
