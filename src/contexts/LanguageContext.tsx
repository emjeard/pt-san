import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Language } from "@/data/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("nexus-lang");
    return (stored === "id" ? "id" : "en") as Language;
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("nexus-lang", l);
  };

  const toggleLang = () => setLang(lang === "en" ? "id" : "en");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
