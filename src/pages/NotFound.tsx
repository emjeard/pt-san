import { Link, useLocation } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SEOHead } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { routeFor, routes } from "@/lib/routes";

const copy = {
  id: {
    title: "Halaman tidak ditemukan",
    description: "URL yang Anda buka tidak ada atau sudah dipindahkan.",
    home: "Ke Beranda",
    services: "Lihat Layanan",
    contact: "Hubungi Kami",
    seoTitle: "404 — Halaman Tidak Ditemukan | SAN Solution",
    seoDescription: "Halaman yang Anda cari tidak ditemukan di SAN Solution.",
  },
  en: {
    title: "Page not found",
    description: "The URL you opened does not exist or has been moved.",
    home: "Go to Home",
    services: "View Services",
    contact: "Contact Us",
    seoTitle: "404 — Page Not Found | SAN Solution",
    seoDescription: "The page you are looking for was not found on SAN Solution.",
  },
} as const;

const NotFound = () => {
  const location = useLocation();
  const locale = location.pathname.startsWith("/en") ? "en" : "id";
  const text = copy[locale];

  return (
    <SiteLayout locale={locale}>
      <SEOHead
        title={text.seoTitle}
        description={text.seoDescription}
        canonicalPath={location.pathname}
        locale={locale}
        alternateIdPath={location.pathname}
        alternateEnPath={location.pathname}
        noindex
      />

      <div className="section-padding">
        <div className="container-narrow mx-auto max-w-xl text-center">
          <p className="text-6xl font-bold text-primary" aria-hidden="true">
            404
          </p>
          <h1 className="mt-4 font-heading text-3xl">{text.title}</h1>
          <p className="mt-4 text-muted-foreground">{text.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="min-h-11">
              <Link to={routeFor("home", locale)}>{text.home}</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11">
              <Link to={routeFor("services", locale)}>{text.services}</Link>
            </Button>
            <Button asChild variant="outline" className="min-h-11">
              <Link to={routeFor("contact", locale)}>{text.contact}</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            {locale === "id" ? "Atau coba " : "Or try "}
            <Link to={routes.home[locale === "id" ? "en" : "id"]} className="text-primary hover:underline">
              {locale === "id" ? "versi English" : "Indonesian version"}
            </Link>
          </p>
        </div>
      </div>
    </SiteLayout>
  );
};

export default NotFound;
