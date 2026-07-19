import type { ReactNode } from "react";
import type { SiteLocale } from "@/config/site";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export type SiteLayoutProps = {
  locale: SiteLocale;
  children: ReactNode;
  /** Equivalent Indonesian URL for language switcher */
  idPath?: string;
  /** Equivalent English URL for language switcher */
  enPath?: string;
};

export const SiteLayout = ({
  locale,
  children,
  idPath,
  enPath,
}: SiteLayoutProps) => (
  <LanguageProvider initialLang={locale}>
    <SkipToContent />
    <Navbar locale={locale} idPath={idPath} enPath={enPath} />
    <main id="main-content" tabIndex={-1} className="outline-none">
      {children}
    </main>
    <Footer />
  </LanguageProvider>
);
