import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui-custom/Reveal";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqSection, homepageFaq } from "@/data/faq";
import { t } from "@/data/translations";
import { absoluteUrl } from "@/config/site";

const FAQSection = () => {
  const { lang } = useLanguage();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homepageFaq.map((item) => ({
      "@type": "Question",
      name: t(item.question, lang),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(item.answer, lang),
      },
    })),
  };

  return (
    <section id="faq" className="section-padding">
      <div className="container-narrow max-w-3xl">
        <SectionHeading
          label={t(faqSection.label, lang)}
          title={t(faqSection.title, lang)}
          subtitle={t(faqSection.subtitle, lang)}
          align="center"
          className="mx-auto mb-10"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <Reveal>
          <Accordion
            type="single"
            collapsible
            className="rounded-2xl border border-border bg-white px-6 shadow-sm"
            aria-label={t(faqSection.title, lang)}
          >
          {homepageFaq.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger
                className="text-left text-base hover:no-underline"
                aria-controls={`faq-content-${item.id}`}
              >
                {t(item.question, lang)}
              </AccordionTrigger>
              <AccordionContent
                id={`faq-content-${item.id}`}
                className="text-muted-foreground"
                role="region"
              >
                {t(item.answer, lang)}
              </AccordionContent>
            </AccordionItem>
          ))}
          </Accordion>
        </Reveal>

        <p className="sr-only">
          {lang === "id"
            ? `FAQ tersedia di ${absoluteUrl("/")}#faq`
            : `FAQ available at ${absoluteUrl("/en")}#faq`}
        </p>
      </div>
    </section>
  );
};

export default FAQSection;
