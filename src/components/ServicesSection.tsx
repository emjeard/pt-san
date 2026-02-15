import { Building2, Rocket, Smartphone, Cloud } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Enterprise System Integration",
    description:
      "Custom ERP, Visitor Management Systems, and internal tools using .NET Core and Java. Built for security, reliability, and compliance.",
    tags: [".NET Core", "Java", "SQL Server"],
  },
  {
    icon: Rocket,
    title: "SaaS & Product Development",
    description:
      "End-to-end development for startups — from MVP to scale. Modern stacks with Next.js, React, Golang, and Python for rapid iteration.",
    tags: ["Next.js", "React", "Golang"],
  },
  {
    icon: Smartphone,
    title: "Mobile App Ecosystems",
    description:
      "Native Android and cross-platform Flutter apps for retail, tourism, and management. Published on Play Store & App Store.",
    tags: ["Flutter", "Android", "iOS"],
  },
  {
    icon: Cloud,
    title: "DevOps & Infrastructure",
    description:
      "Server management, Docker containerization, CI/CD pipelines, and Linux optimization for high-traffic production environments.",
    tags: ["Docker", "Linux", "CI/CD"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-glow">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Our Services</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What We Build
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From enterprise systems to mobile apps, we deliver solutions that scale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group bg-card-gradient border border-border rounded-xl p-8 hover:border-primary/40 hover:shadow-glow transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
