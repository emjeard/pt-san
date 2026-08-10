import { Check } from "lucide-react";
import type { SiteLocale } from "@/config/site";

export const ProcessPathsSection = ({ locale }: { locale: SiteLocale }) => {
  const ready = locale === "id" ? ["Pilih solusi", "Kirim informasi bisnis", "Konfigurasi branding dan konten", "Review", "Launch"] : ["Choose solution", "Send business information", "Configure branding and content", "Review", "Launch"];
  const custom = locale === "id" ? ["Discovery", "Scope dan arsitektur", "Design dan development", "QA", "Deployment dan support"] : ["Discovery", "Scope and architecture", "Design and development", "QA", "Deployment and support"];
  return (
    <section id="process" className="section-padding" aria-labelledby="process-heading">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{locale === "id" ? "Cara kerja" : "How it works"}</p><h2 id="process-heading" className="mt-3 text-3xl sm:text-4xl">{locale === "id" ? "Alur yang jelas untuk setiap jalur" : "A clear flow for every path"}</h2></div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[{title: locale === "id" ? "Solusi siap pakai" : "Ready solution", items: ready}, {title: locale === "id" ? "Custom engineering" : "Custom engineering", items: custom}].map((path) => <article key={path.title} className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8"><h3 className="text-xl font-semibold">{path.title}</h3><ol className="mt-6 space-y-3">{path.items.map((item, index) => <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-softmint text-xs font-bold text-primary">{index + 1}</span><span>{item}</span>{index === path.items.length - 1 ? <Check className="ml-auto h-4 w-4 text-primary" aria-hidden="true" /> : null}</li>)}</ol></article>)}
        </div>
      </div>
    </section>
  );
};
