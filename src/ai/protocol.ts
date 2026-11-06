/** Wire format shared by the browser client and the Express endpoint. */
export type ChatTurn = { role: "user" | "assistant"; content: string };

export type AskRequest = { messages: ChatTurn[]; lang: "pt" | "en" };

export type Source = { id: string; title: string; href: string };

export type AskResponse = {
  answer: string;
  sources: Source[];
  mode: "llm" | "demo";
  lang: "pt" | "en";
};

export type AskError = { error: string; code: "rate_limited" | "invalid" | "unavailable" | "too_long" };

export const LIMITS = {
  messageChars: 500,
  historyTurns: 8,
} as const;
