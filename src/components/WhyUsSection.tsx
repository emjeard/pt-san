import { Shield, Zap, TrendingUp } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Proven Reliability",
    description:
      "Experience handling mission-critical systems for national companies like PLN, Pertamina, and Telkom — with 99%+ uptime track records.",
  },
  {
    icon: Zap,
    title: "Speed & Innovation",
    description:
      "Utilizing AI-assisted coding workflows for faster delivery without compromising quality. Modern tooling meets veteran expertise.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description:
      "Systems designed to handle growth from Day 1. Microservices, containerization, and cloud-native approaches built into every project.",
  },
];

const WhyUsSection = () => {
  return (
    <section id="why-us" className="section-padding">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Why Us</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Nexus Logic
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="text-center p-8 rounded-xl border border-border bg-card-gradient hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <reason.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
