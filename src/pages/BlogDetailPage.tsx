import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Loader2, Tag, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { SiteLocale } from "@/config/site";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SEOHead } from "@/components/seo/SEOHead";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { t } from "@/data/translations";
import {
  BlogApiError,
  fetchPublishedArticle,
  fetchPublishedArticles,
} from "@/lib/blog";
import { blogPostPath, routeFor, routes } from "@/lib/routes";
import NotFound from "./NotFound";

export type BlogDetailPageProps = {
  locale: SiteLocale;
};

const BlogDetailPage = ({ locale }: BlogDetailPageProps) => {
  const { slug } = useParams<{ slug: string }>();
  const articleQuery = useQuery({
    queryKey: ["blog", "article", locale, slug],
    queryFn: () => fetchPublishedArticle(slug!, locale),
    enabled: Boolean(slug),
    retry: (failureCount, error) =>
      !(error instanceof BlogApiError && error.status === 404) && failureCount < 2,
  });
  const articlesQuery = useQuery({
    queryKey: ["blog", "published-articles"],
    queryFn: fetchPublishedArticles,
  });

  if (articleQuery.isLoading) {
    return (
      <SiteLayout locale={locale} idPath={routes.blog.id} enPath={routes.blog.en}>
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
          {locale === "id" ? "Memuat artikel..." : "Loading article..."}
        </div>
      </SiteLayout>
    );
  }

  if (
    !slug ||
    (articleQuery.error instanceof BlogApiError && articleQuery.error.status === 404)
  ) {
    return <NotFound />;
  }

  const post = articleQuery.data;
  if (!post) {
    return (
      <SiteLayout locale={locale} idPath={routes.blog.id} enPath={routes.blog.en}>
        <div className="container-narrow section-padding text-center">
          <h1 className="text-2xl font-bold">
            {locale === "id" ? "Artikel belum dapat dimuat" : "Article could not be loaded"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {locale === "id"
              ? "Silakan coba lagi beberapa saat."
              : "Please try again in a moment."}
          </p>
        </div>
      </SiteLayout>
    );
  }

  const title = t(post.title, locale);
  const description = t(post.excerpt, locale);
  const category = t(post.category, locale);
  const content = t(post.content, locale);
  const canonicalPath = blogPostPath(post.slug[locale], locale);
  const alternateIdPath = blogPostPath(post.slug.id, "id");
  const alternateEnPath = blogPostPath(post.slug.en, "en");

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: t(post.author.role, locale),
    },
    publisher: {
      "@type": "Organization",
      name: "SAN Solution",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sansolution.tech/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.sansolution.tech${canonicalPath}`,
    },
  };

  const relatedPosts = (articlesQuery.data || [])
    .filter((p) => p.id !== post.id)
    .slice(0, 2);

  return (
    <SiteLayout
      locale={locale}
      idPath={alternateIdPath}
      enPath={alternateEnPath}
    >
      <SEOHead
        title={`${title} | SAN Solution Blog`}
        description={description}
        canonicalPath={canonicalPath}
        locale={locale}
        alternateIdPath={alternateIdPath}
        alternateEnPath={alternateEnPath}
        jsonLd={blogPostingJsonLd}
      />

      <article className="section-padding">
        <div className="container-narrow">
          <Breadcrumbs
            className="mb-8"
            items={[
              { label: locale === "id" ? "Beranda" : "Home", href: routeFor("home", locale) },
              { label: "Blog", href: routeFor("blog", locale) },
              { label: title },
            ]}
          />

          <header className="mx-auto mb-10 max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="bg-softmint/40 text-xs font-semibold text-primary">
                {category}
              </Badge>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {post.publishedAt}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTimeMinutes} {locale === "id" ? "menit baca" : "min read"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              {title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </header>

          <div className="mx-auto max-w-3xl">
            {/* E-E-A-T Author Card Header */}
            <div className="mb-10 flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <div className="text-base font-bold text-foreground">{post.author.name}</div>
                <div className="text-xs font-medium text-primary">{t(post.author.role, locale)}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t(post.author.bio, locale)}</div>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary leading-relaxed text-foreground">
              {content.split("\n\n").map((paragraph, idx) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h2 key={idx} className="mt-10 mb-4 text-2xl font-bold">
                      {paragraph.replace("### ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("#### ")) {
                  return (
                    <h3 key={idx} className="mt-8 mb-3 text-xl font-semibold">
                      {paragraph.replace("#### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <ul key={idx} className="my-4 list-disc pl-6 space-y-2">
                      {paragraph.split("\n").map((line, lIdx) => (
                        <li key={lIdx}>{line.replace("- ", "")}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="my-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary/5 via-softmint/30 to-white p-8 border border-primary/20 text-center shadow-soft">
              <h3 className="text-xl font-bold text-foreground">
                {locale === "id"
                  ? "Butuh Konsultasi Solusi Sistem & ERP Enterprise?"
                  : "Need Enterprise Systems & ERP Consultation?"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {locale === "id"
                  ? "Tim ahli SAN Solution siap mendiskusikan kebutuhan arsitektur dan efisiensi operasional bisnis Anda."
                  : "SAN Solution experts are ready to discuss your system architecture and business efficiency goals."}
              </p>
              <Button size="lg" className="mt-6 gap-2" asChild>
                <Link to={routeFor("contact", locale)}>
                  {locale === "id" ? "Hubungi Tim SAN Solution" : "Contact SAN Solution Squad"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 border-t border-border pt-12">
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  {locale === "id" ? "Artikel Terkait" : "Related Articles"}
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedPosts.map((rPost) => (
                    <div
                      key={rPost.id}
                      className="rounded-xl border border-border bg-white p-5 shadow-sm transition-all hover:border-primary/30"
                    >
                      <Badge variant="outline" className="mb-2 text-[10px]">
                        {t(rPost.category, locale)}
                      </Badge>
                      <h4 className="font-bold text-foreground">
                        <Link
                          to={blogPostPath(rPost.slug[locale], locale)}
                          className="hover:text-primary"
                        >
                          {t(rPost.title, locale)}
                        </Link>
                      </h4>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                        {t(rPost.excerpt, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back Button */}
            <div className="mt-12 text-center">
              <Button variant="ghost" asChild>
                <Link to={routeFor("blog", locale)} className="inline-flex items-center gap-2 text-muted-foreground">
                  <ArrowLeft className="h-4 w-4" />
                  {locale === "id" ? "Kembali ke Indeks Blog" : "Back to Blog Index"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
};

export default BlogDetailPage;
