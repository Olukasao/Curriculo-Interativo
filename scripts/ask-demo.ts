/** Quick check of demo-mode answers: `npx tsx scripts/ask-demo.ts` */
import { demoAnswer } from "../src/ai/demo";
import { retrieve } from "../src/ai/retrieve";

const questions = process.argv.slice(2).length
  ? process.argv.slice(2)
  : [
      "Quais sistemas Lucas desenvolveu?",
      "Qual é a experiência dele com inteligência artificial?",
      "Ele trabalha com desenvolvimento backend?",
      "Mostre os projetos de motion design.",
      "Quais tecnologias ele domina?",
      "Qual foi sua participação no Workscape?",
      "Onde ele trabalhou?",
      "How can I contact him?",
      "Does he know React?",
      "Qual a cor favorita dele?",
    ];
for (const q of questions) {
  const r = demoAnswer(q, "pt");
  const hits = retrieve(q, 3).map((h) => `${h.chunk.id}:${h.score.toFixed(1)}`).join(" ");
  console.log(`\nQ ${q}\n  [${hits}]\n  ${r.answer.replace(/\n+/g, " | ").slice(0, 220)}\n  → ${r.sources.map((s) => s.href).join(" ")}`);
}
