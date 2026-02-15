import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding bg-glow">
      <div className="container-narrow max-w-2xl">
        <div className="text-center mb-12">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Build Something Great
          </h2>
          <p className="text-muted-foreground">
            Tell us about your project and we'll get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-card-gradient border border-border rounded-xl p-8">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Name</label>
              <Input placeholder="Your name" required className="bg-secondary border-border" />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input type="email" placeholder="you@company.com" required className="bg-secondary border-border" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Project Type</label>
            <Input placeholder="e.g. Enterprise System, Mobile App, SaaS" className="bg-secondary border-border" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <Textarea
              placeholder="Tell us about your project..."
              rows={5}
              required
              className="bg-secondary border-border resize-none"
            />
          </div>
          <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
            <Send className="w-4 h-4" />
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
