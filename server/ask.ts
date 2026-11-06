import { Router, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import { demoAnswer, toSources } from "../src/ai/demo";
import { LIMITS, type AskError, type AskRequest, type AskResponse, type ChatTurn } from "../src/ai/protocol";
import { detectLang, retrieve } from "../src/ai/retrieve";
import { askClaude, llmEnabled } from "./llm";

export const askRouter = Router();

const perIp = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_PER_10MIN ?? 20),
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (_req, res) =>
    res.status(429).json({ error: "Too many questions in a short time. Try again in a few minutes.", code: "rate_limited" } satisfies AskError),
});

/** Global ceiling on paid LLM calls per UTC day; beyond it the assistant falls back to demo mode. */
const dailyCap = Number(process.env.DAILY_LLM_CAP ?? 500);
let day = new Date().toISOString().slice(0, 10);
let used = 0;
function takeBudget(): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== day) {
    day = today;
    used = 0;
  }
  if (used >= dailyCap) return false;
  used += 1;
  return true;
}

function parse(body: unknown): { ok: true; value: AskRequest } | { ok: false; error: AskError } {
  const b = body as Partial<AskRequest> | undefined;
  const lang = b?.lang === "en" ? "en" : "pt";
  if (!b || !Array.isArray(b.messages) || b.messages.length === 0) {
    return { ok: false, error: { error: "Send at least one message.", code: "invalid" } };
  }
  const messages: ChatTurn[] = b.messages.slice(-LIMITS.historyTurns).map((m) => ({
    role: m?.role === "assistant" ? "assistant" : "user",
    content: typeof m?.content === "string" ? m.content.trim() : "",
  }));
  if (messages.some((m) => !m.content)) return { ok: false, error: { error: "Messages can't be empty.", code: "invalid" } };
  if (messages.some((m) => m.role === "user" && m.content.length > LIMITS.messageChars)) {
    return { ok: false, error: { error: `Keep questions under ${LIMITS.messageChars} characters.`, code: "too_long" } };
  }
  // The API requires the conversation to open with a user turn and alternate.
  while (messages.length && messages[0].role !== "user") messages.shift();
  const alternating = messages.every((m, i) => m.role === (i % 2 === 0 ? "user" : "assistant"));
  if (!messages.length || !alternating || messages[messages.length - 1].role !== "user") {
    return { ok: false, error: { error: "The conversation must alternate and end with a question.", code: "invalid" } };
  }
  return { ok: true, value: { messages, lang } };
}

askRouter.get("/health", (_req, res) => {
  res.json({ ok: true, assistant: llmEnabled ? "llm" : "demo" });
});

askRouter.post("/ask", perIp, async (req: Request, res: Response) => {
  const parsed = parse(req.body);
  if (!parsed.ok) return res.status(400).json(parsed.error);

  const { messages, lang: uiLang } = parsed.value;
  const question = messages[messages.length - 1].content;

  if (!llmEnabled || !takeBudget()) {
    return res.json(demoAnswer(question, uiLang));
  }

  const lang = detectLang(question, uiLang);
  try {
    const answer = await askClaude(messages, lang);
    const hits = retrieve(`${question} ${answer}`, 5);
    return res.json({ answer, sources: toSources(hits, lang), mode: "llm", lang } satisfies AskResponse);
  } catch (err) {
    console.error("[ask] LLM call failed, serving demo answer:", err instanceof Error ? err.message : err);
    return res.json(demoAnswer(question, uiLang));
  }
});
