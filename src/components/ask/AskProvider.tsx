import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const AskPanel = lazy(() => import("./AskPanel"));

type AskCtx = { open: (question?: string) => void; close: () => void; isOpen: boolean };
const Ctx = createContext<AskCtx | null>(null);

export function AskProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // Each request gets a fresh id so the same suggestion can be asked twice.
  const [pending, setPending] = useState<{ q: string; id: number } | null>(null);

  const open = useCallback((question?: string) => {
    setMounted(true);
    setOpen(true);
    if (question) setPending({ q: question, id: Date.now() });
  }, []);
  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <Ctx.Provider value={value}>
      {children}
      {mounted && (
        <Suspense fallback={null}>
          <AskPanel open={isOpen} onClose={close} pending={pending} onPendingHandled={() => setPending(null)} />
        </Suspense>
      )}
    </Ctx.Provider>
  );
}

export function useAsk() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAsk outside AskProvider");
  return ctx;
}
