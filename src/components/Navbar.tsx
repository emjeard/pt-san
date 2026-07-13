import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const nav = translations.nav;

  const links = [
    { label: t(nav.about, lang), href: "#about" },
    { label: t(nav.services, lang), href: "#services" },
    { label: t(nav.portfolio, lang), href: "#portfolio" },
    { label: t(nav.tech, lang), href: "#tech" },
    { label: t(nav.contact, lang), href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container-narrow flex items-center justify-between h-16 px-4">
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="text-gradient">SAN</span> Solution
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-mono border border-border rounded-full px-3 py-1.5 hover:border-primary/50 transition-colors"
          >
            <span className={lang === "en" ? "text-primary font-semibold" : "text-muted-foreground"}>EN</span>
            <span className="text-muted-foreground">/</span>
            <span className={lang === "id" ? "text-primary font-semibold" : "text-muted-foreground"}>ID</span>
          </button>
          <Button size="sm" asChild>
            <a href="#contact">{t(nav.getInTouch, lang)}</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 text-xs font-mono border border-border rounded-full px-2.5 py-1 hover:border-primary/50 transition-colors"
          >
            <span className={lang === "en" ? "text-primary font-semibold" : "text-muted-foreground"}>EN</span>
            <span className="text-muted-foreground">/</span>
            <span className={lang === "id" ? "text-primary font-semibold" : "text-muted-foreground"}>ID</span>
          </button>
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground py-2"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" className="w-full" asChild>
            <a href="#contact" onClick={() => setOpen(false)}>{t(nav.getInTouch, lang)}</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
