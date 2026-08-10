import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
import type { SiteLocale } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/data/blogPosts";
import { t } from "@/data/translations";
import { blogPostPath } from "@/lib/routes";

type BlogPostCardProps = {
  post: BlogPost;
  locale: SiteLocale;
};

export const BlogPostCard = ({ post, locale }: BlogPostCardProps) => {
  const detailPath = blogPostPath(post.slug[locale], locale);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:border-primary/30 hover:shadow-soft">
      {post.featuredImage && (
        <div className="aspect-[2/1] w-full overflow-hidden border-b border-border bg-muted">
          <img
            src={post.featuredImage}
            alt={t(post.title, locale)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <Badge variant="outline" className="bg-softmint/30 text-xs font-semibold text-primary">
            {t(post.category, locale)}
          </Badge>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {post.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTimeMinutes} {locale === "id" ? "menit baca" : "min read"}
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link to={detailPath}>{t(post.title, locale)}</Link>
        </h2>

        <div className="mt-3 flex-1 space-y-2 text-sm leading-relaxed text-muted-foreground">
          {t(post.excerpt, locale).split('\n').filter(Boolean).slice(0, 2).map((point, i) => (
            <p key={i} className="flex gap-2">
              <span className="text-primary mt-1 shrink-0">•</span>
              <span className="line-clamp-2">{point}</span>
            </p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <User className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>{post.author.name}</span>
          </div>

          <Button variant="link" className="h-auto p-0 text-primary" asChild>
            <Link to={detailPath} className="inline-flex items-center gap-1 text-sm font-semibold">
              {locale === "id" ? "Baca Artikel" : "Read Article"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
