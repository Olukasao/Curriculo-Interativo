import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { L, Lang } from "../content/types";

type I18n = { lang: Lang; setLang: (l: Lang) => void; t: (s: L) => string };

const Ctx = createContext<I18n | null>(null);
const KEY = "ls-lang";

function initialLang(): Lang {
  try {
    const stored = localStorage.getItem(KEY);
    if (stored === "pt" || stored === "en") return stored;
  } catch {
    /* storage unavailable */
  }
  return typeof navigator !== "undefined" && !navigator.language.toLowerCase().startsWith("pt") ? "en" : "pt";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* storage unavailable */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  }, [lang]);

  const value = useMemo<I18n>(() => ({ lang, setLang, t: (s) => s[lang] }), [lang, setLang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n outside LangProvider");
  return ctx;
}
