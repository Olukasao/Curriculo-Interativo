import { demoAnswer } from "./demo";
import type { AskError, AskResponse, ChatTurn } from "./protocol";

/**
 * Ask the server; if there's no server (static hosting) or it fails,
 * answer locally in demo mode so the feature always works.
 */
export async function askPortfolio(messages: ChatTurn[], lang: "pt" | "en", signal?: AbortSignal): Promise<AskResponse | AskError> {
  const question = messages[messages.length - 1].content;
  try {
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, lang }),
      signal,
    });
    if (res.ok) return (await res.json()) as AskResponse;
    if (res.status === 429 || res.status === 400) return (await res.json()) as AskError;
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
  }
  return demoAnswer(question, lang);
}
