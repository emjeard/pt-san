import { Building2, Clock, Layers, Smartphone } from "lucide-react";
import { Reveal } from "@/components/ui-custom/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/data/translations";

const icons = [Clock, Building2, Smartphone, Layers];

const TrustSection = () => {
  const { lang } = useLanguage();
  const { items } = translations.trust;

  return (
    <section aria-label="Trust highlights" className="border-b border-border bg-white py-12 md:py-14">
      <div className="container-narrow">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={item.title.en} as="li" delay={index * 60} className="list-none">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-softmint text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold">{t(item.title, lang)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(item.description, lang)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default TrustSection;
