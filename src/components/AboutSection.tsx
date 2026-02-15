import { Code2, Server } from "lucide-react";

const founders = [
  {
    icon: Code2,
    title: "Product & Innovation Lead",
    name: "M. Jeffri",
    description:
      "8+ years of experience in Fullstack Development (Next.js, Golang, Python) & Mobile (Flutter). Built SaaS platforms like Jetkios POS and tourism apps. Pioneered AI-assisted development workflows for faster delivery.",
    skills: ["Next.js", "Golang", "Flutter", "Python", "PostgreSQL"],
  },
  {
    icon: Server,
    title: "System Architect & Enterprise Lead",
    name: "Zainal Abidin",
    description:
      "15+ years building mission-critical enterprise systems with .NET/C# for major organizations including PLN, Pertamina, and Telkom. Specialist in Legacy System Modernization and High-Availability Infrastructure.",
    skills: [".NET Core", "C#", "SQL Server", "Docker", "Linux"],
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Who We Are</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Led by Senior Experts
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Two complementary leaders combining deep enterprise experience with modern product innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {founders.map((founder) => (
            <div
              key={founder.name}
              className="bg-card-gradient border border-border rounded-xl p-8 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <founder.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{founder.name}</h3>
                  <p className="text-sm text-primary">{founder.title}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                {founder.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {founder.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-secondary text-xs text-secondary-foreground font-mono"
                  >
                    {skill}
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

export default AboutSection;
