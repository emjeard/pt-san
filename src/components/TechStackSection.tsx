const categories = [
  {
    label: "Backend",
    items: ["Golang", "Python", "C# (.NET)", "PHP (Laravel)", "Java", "Node.js"],
  },
  {
    label: "Frontend",
    items: ["Next.js", "React.js", "Nuxt.js", "Tailwind CSS", "TypeScript"],
  },
  {
    label: "Mobile",
    items: ["Flutter", "Android (Kotlin)", "iOS (Dart)"],
  },
  {
    label: "Database & Infra",
    items: ["PostgreSQL", "SQL Server", "MySQL", "Redis", "Elasticsearch", "Docker", "Linux"],
  },
];

const TechStackSection = () => {
  return (
    <section id="tech" className="section-padding bg-glow">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Technology</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Tech Stack
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Battle-tested technologies powering enterprise-grade solutions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div key={cat.label} className="bg-card-gradient border border-border rounded-xl p-6">
              <h3 className="text-sm font-mono text-primary tracking-wider uppercase mb-4">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-secondary text-sm text-secondary-foreground"
                  >
                    {item}
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

export default TechStackSection;
