import { Github, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";
import { siteConfig } from "@/config/site";

const Footer = () => {
  const { lang } = useLanguage();
  const f = translations.footer;

  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#" className="flex items-center justify-center md:justify-start gap-2 text-lg font-bold tracking-tight">
            <img src="/logo.png" alt="SAN Solution Logo" className="h-8 w-auto rounded-md" />
            <span><span className="text-gradient">SAN</span> Solution</span>
          </a>
          <p className="text-sm text-muted-foreground mt-1">
            {t(f.tagline, lang)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} SAN Solution. {t(f.rights, lang)}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
