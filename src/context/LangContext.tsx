"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Lang } from "@/i18n/dict";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("TR");

  useEffect(() => {
    const saved = localStorage.getItem("site-lang") as Lang | null;
    if (saved === "TR" || saved === "EN") {
      setLangState(saved);
    }
  }, []);

  const setLang = (value: Lang) => {
    setLangState(value);
    localStorage.setItem("site-lang", value);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error("useLang must be used inside LangProvider");
  }

  return context;
}