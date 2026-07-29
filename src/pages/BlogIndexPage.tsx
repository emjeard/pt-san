import { useState } from "react";
import { Search } from "lucide-react";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { BlogPostCard } from "@/components/ui-custom/BlogPostCard";
import { SectionHeading } from "@/components/ui-custom/SectionHeading";
import { Input } from "@/components/ui/input";
import { blogPosts } from "@/data/blogPosts";
import { t } from "@/data/translations";
import { routeFor, routes } from "@/lib/routes";

const pageCopy = {
  id: {
    title: "Blog & Wawasan Teknologi SAN Solution",
    subtitle:
      "Panduan praktis, arsitektur perangkat lunak, wawasan ERP Odoo, dan strategi transformasi digital skala enterprise.",
    seoTitle: "Blog & Wawasan Teknologi Enterprise | SAN Solution",
    seoDescription:
      "Artikel dan wawasan teknis SAN Solution: Panduan ERP Odoo, arsitektur sistem enterprise, pengembangan SaaS B2B, dan DevOps.",
    home: "Beranda",
    blog: "Blog",
    searchPlaceholder: "Cari artikel, topik, atau kata kunci...",
    noResults: "Tidak ada artikel yang cocok dengan pencarian Anda.",
  },
  en: {
    title: "Blog & Technology Insights | SAN Solution",
    subtitle:
      "Actionable guides, software architecture, Odoo ERP insights, and enterprise digital transformation strategies.",
    seoTitle: "Blog & Technology Insights | SAN Solution",
    seoDescription:
      "SAN Solution technical articles & insights: Odoo ERP guides, enterprise architecture, B2B SaaS engineering, and DevOps.",
    home: "Home",
    blog: "Blog",
    searchPlaceholder: "Search articles, topics, or keywords...",
    noResults: "No articles found matching your search.",
  },
} as const;

export type BlogIndexPageProps = {
  locale: SiteLocale;
};

const BlogIndexPage = ({ locale }: BlogIndexPageProps) => {
  const copy = pageCopy[locale];
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const titleText = t(post.title, locale).toLowerCase();
    const excerptText = t(post.excerpt, locale).toLowerCase();
    const categoryText = t(post.category, locale).toLowerCase();
    const query = searchQuery.toLowerCase().trim();

    if (!query) return true;
    return (
      titleText.includes(query) ||
      excerptText.includes(query) ||
      categoryText.includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <SiteLayout
      locale={locale}
      idPath={routes.blog.id}
      enPath={routes.blog.en}
    >
      <SEOHead
        title={copy.seoTitle}
        description={copy.seoDescription}
        canonicalPath={routes.blog[locale]}
        locale={locale}
        alternateIdPath={routes.blog.id}
        alternateEnPath={routes.blog.en}
      />

      <div className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: copy.home, href: routeFor("home", locale) },
              { label: copy.blog },
            ]}
          />

          <SectionHeading
            title={copy.title}
            subtitle={copy.subtitle}
            className="mb-10"
          />

          <div className="relative mx-auto mb-12 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 border-border/80 pl-11 shadow-sm focus-visible:ring-primary"
            />
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              <p className="text-base font-medium">{copy.noResults}</p>
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
};

export default BlogIndexPage;
