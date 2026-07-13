import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const ContactSection = () => {
  const { toast } = useToast();
  const { lang } = useLanguage();
  const c = translations.contact;
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: t(c.toastTitle, lang),
        description: t(c.toastDescription, lang),
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding bg-glow">
      <div className="container-narrow max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">{t(c.label, lang)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t(c.title, lang)}</h2>
          <p className="text-muted-foreground">{t(c.subtitle, lang)}</p>
          <p className="text-sm text-muted-foreground mt-3">
            {t(c.supportLabel, lang)}{" "}
            <a href={`mailto:${c.supportEmail}`} className="text-primary hover:underline font-medium">
              {c.supportEmail}
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-card-gradient border border-border rounded-xl p-8">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium mb-2 block">{t(c.name, lang)}</label>
              <Input placeholder={t(c.namePlaceholder, lang)} required className="bg-secondary border-border" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">{t(c.email, lang)}</label>
              <Input type="email" placeholder={t(c.emailPlaceholder, lang)} required className="bg-secondary border-border" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t(c.projectType, lang)}</label>
            <Input placeholder={t(c.projectTypePlaceholder, lang)} className="bg-secondary border-border" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">{t(c.message, lang)}</label>
            <Textarea
              placeholder={t(c.messagePlaceholder, lang)}
              rows={5}
              required
              className="bg-secondary border-border resize-none"
            />
          </div>
          <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
            <Send className="w-4 h-4" />
            {loading ? t(c.sending, lang) : t(c.send, lang)}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
