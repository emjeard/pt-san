import { Badge } from "@/components/ui/badge";

const projects = [
  {
    tag: "Enterprise",
    title: "Data Center & Visitor Management System",
    client: "PLN (State Electricity Company)",
    description:
      "A complex high-security visitor data and asset management system for Indonesia's national electricity company. Multi-location deployment with Docker containerization.",
    tech: ["ASP.NET Core", "MariaDB", "Docker", "Linux"],
  },
  {
    tag: "SaaS",
    title: "Jetkios POS Platform",
    client: "Small Merchants",
    description:
      "A comprehensive Point of Sales web application for small merchants handling product stock management, transaction recording, and sales reporting.",
    tech: ["Nuxt.js", "PostgreSQL", "Redis"],
  },
  {
    tag: "Public Sector",
    title: "Government Portals",
    client: "Surabaya City Gov & Ministry of Public Works",
    description:
      "Information portals ensuring high accessibility and transparency for government institutions, built with security and compliance standards.",
    tech: ["Laravel", "PHP", "MySQL"],
  },
  {
    tag: "Mobile",
    title: "Smart Tourism & E-Commerce",
    client: "Persija Jakarta, PSS Sleman & Travel Platforms",
    description:
      "Android & iOS apps for Travel Marketplaces and Liga 1 Football Clubs, featuring ticketing, e-commerce, and fan engagement features.",
    tech: ["Flutter", "Android", "Golang", "Next.js"],
  },
];

const tagColors: Record<string, string> = {
  Enterprise: "bg-primary/15 text-primary border-primary/20",
  SaaS: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Public Sector": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  Mobile: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real-world solutions delivered for enterprises, governments, and startups.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group bg-card-gradient border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              {/* Colored top bar */}
              <div className="h-1 bg-gradient-to-r from-primary to-primary/50" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge
                    variant="outline"
                    className={`text-xs font-mono ${tagColors[project.tag] || ""}`}
                  >
                    {project.tag}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{project.client}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-secondary text-xs text-secondary-foreground font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
