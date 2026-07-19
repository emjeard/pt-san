import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Language } from "@/data/translations";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "san-solution-language";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const readStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
    // Migrate legacy key once
    const legacy = localStorage.getItem("nexus-lang");
    if (legacy === "id" || legacy === "en") {
      localStorage.setItem(STORAGE_KEY, legacy);
      localStorage.removeItem("nexus-lang");
      return legacy;
    }
  } catch {
    // ignore storage errors
  }
  return siteConfig.defaultLocale;
};

export const LanguageProvider = ({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang?: Language;
}) => {
  const [lang, setLangState] = useState<Language>(() => initialLang ?? readStoredLanguage());

  const setLang = (l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => setLang(lang === "en" ? "id" : "en");

  useEffect(() => {
    if (initialLang && initialLang !== lang) {
      setLangState(initialLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLang]);

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
