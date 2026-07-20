import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import type { SiteLocale } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { trackEvent } from "@/lib/analytics";
import { processHashPath, routeFor, routes } from "@/lib/routes";
import { cn } from "@/lib/utils";

export type NavbarProps = {
  locale: SiteLocale;
  /** Equivalent Indonesian URL for language switcher */
  idPath?: string;
  /** Equivalent English URL for language switcher */
  enPath?: string;
};

type NavItem = {
  label: { id: string; en: string };
  href: string;
};

const navLabels = {
  services: { id: "Layanan", en: "Services" },
  caseStudies: { id: "Studi Kasus", en: "Case Studies" },
  about: { id: "Tentang", en: "About" },
  process: { id: "Proses", en: "Process" },
  contact: { id: "Kontak", en: "Contact" },
  cta: { id: "Konsultasi Gratis", en: "Free Consultation" },
  menu: { id: "Menu navigasi", en: "Navigation menu" },
  openMenu: { id: "Buka menu", en: "Open menu" },
  closeMenu: { id: "Tutup menu", en: "Close menu" },
} as const;

const buildNavItems = (locale: SiteLocale): NavItem[] => [
  { label: navLabels.services, href: routeFor("services", locale) },
  { label: navLabels.caseStudies, href: routeFor("caseStudies", locale) },
  { label: navLabels.about, href: routeFor("about", locale) },
  { label: navLabels.process, href: processHashPath(locale) },
  { label: navLabels.contact, href: routeFor("contact", locale) },
];

const navLinkClass =
  "inline-flex min-h-11 items-center rounded-md px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export const Navbar = ({
  locale,
  idPath = routes.home.id,
  enPath = routes.home.en,
}: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuId = useId();
  const items = buildNavItems(locale);
  const homeHref = routeFor("home", locale);
  const contactHref = routeFor("contact", locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      requestAnimationFrame(() => menuTriggerRef.current?.focus());
    }
  };

  const handleCtaClick = () => {
    trackEvent("consultation_cta_click", { location: "navbar", locale });
  };

  const closeMobile = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-card/95 backdrop-blur-sm transition-[border-color,box-shadow,background-color] duration-200",
        scrolled
          ? "border-border shadow-sm bg-card/98"
          : "border-border/60",
      )}
    >
      <div className="container-narrow flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <Link
          to={homeHref}
          className="inline-flex min-h-11 items-center gap-2 rounded-md font-heading text-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="h-8 w-auto rounded-md"
          />
          <span>
            <span className="text-gradient">SAN</span> Solution
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={navLinkClass}
            >
              {item.label[locale]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher
            currentLocale={locale}
            idPath={idPath}
            enPath={enPath}
          />
          <Button asChild size="sm" className="min-h-11">
            <Link to={contactHref} onClick={handleCtaClick}>
              {navLabels.cta[locale]}
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher
            currentLocale={locale}
            idPath={idPath}
            enPath={enPath}
          />
          <button
            ref={menuTriggerRef}
            type="button"
            className={cn(
              "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
            aria-expanded={open}
            aria-controls={mobileMenuId}
            aria-label={open ? navLabels.closeMenu[locale] : navLabels.openMenu[locale]}
            onClick={() => handleOpenChange(!open)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          id={mobileMenuId}
          side="right"
          className="w-[min(100vw-2rem,20rem)]"
          aria-describedby={undefined}
        >
          <SheetHeader>
            <SheetTitle>{navLabels.menu[locale]}</SheetTitle>
          </SheetHeader>
          <nav
            className="mt-6 flex flex-col gap-1"
            aria-label={locale === "id" ? "Navigasi mobile" : "Mobile navigation"}
          >
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={closeMobile}
                className="inline-flex min-h-11 items-center rounded-md px-3 text-base font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {item.label[locale]}
              </Link>
            ))}
            <Button asChild className="mt-4 min-h-11 w-full">
              <Link to={contactHref} onClick={() => { handleCtaClick(); closeMobile(); }}>
                {navLabels.cta[locale]}
              </Link>
            </Button>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};
