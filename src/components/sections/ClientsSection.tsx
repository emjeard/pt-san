import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";
import { Reveal } from "@/components/ui-custom/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { fetchPublishedClients } from "@/lib/clients";

const copy = {
  id: {
    label: "Klien Kami",
    title: "Dipercaya untuk membangun solusi digital",
    subtitle: "Kami berkolaborasi dengan organisasi yang ingin bertumbuh melalui produk dan sistem yang andal.",
  },
  en: {
    label: "Our Clients",
    title: "Trusted to build digital solutions",
    subtitle: "We collaborate with organizations that want to grow through reliable products and systems.",
  },
} as const;

const ClientsSection = () => {
  const { lang } = useLanguage();
  const clients = useQuery({
    queryKey: ["clients", "published"],
    queryFn: fetchPublishedClients,
    staleTime: 60_000,
  });
  const content = copy[lang];

  if (!clients.data?.length) return null;

  return (
    <section id="clients" aria-labelledby="clients-heading" className="section-padding bg-muted/30">
      <div className="container-narrow">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{content.label}</p>
          <h2 id="clients-heading" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h2>
          <p className="mt-4 text-muted-foreground">{content.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.data.map((client, index) => {
            const clientContent = (
              <>
                <div className="flex h-16 items-center justify-center rounded-lg border bg-white p-3">
                  <img src={client.logoUrl} alt={`${client.name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  {client.websiteUrl && <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
                </div>
              </>
            );

            return (
              <Reveal key={client.id} delay={index * 60} className="h-full">
                {client.websiteUrl ? (
                  <a href={client.websiteUrl} target="_blank" rel="noreferrer" className="block h-full rounded-xl border bg-background p-5 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    {clientContent}
                  </a>
                ) : (
                  <article className="h-full rounded-xl border bg-background p-5">
                    {clientContent}
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
