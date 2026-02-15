import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4">
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <a href="#" className="text-lg font-bold tracking-tight">
            <span className="text-gradient">Nexus</span>Logic
          </a>
          <p className="text-sm text-muted-foreground mt-1">
            Engineering scalable digital solutions.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://linkedin.com/in/znlabidin"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/zamon"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Nexus Logic. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
