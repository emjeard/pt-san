import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  ExternalLink,
  FilePlus2,
  Loader2,
  LogOut,
  Pencil,
  Save,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BlogApiError,
  type AdminBlogArticle,
  type BlogArticleInput,
  createBlogArticle,
  deleteBlogArticle,
  fetchAdminArticles,
  fetchAdminSession,
  loginBlogAdmin,
  logoutBlogAdmin,
  updateBlogArticle,
} from "@/lib/blog";
import { blogPostPath } from "@/lib/routes";

const today = () => new Date().toISOString().slice(0, 10);

const emptyArticle = (): BlogArticleInput => ({
  id: "",
  slug: { id: "", en: "" },
  title: { id: "", en: "" },
  excerpt: { id: "", en: "" },
  content: { id: "", en: "" },
  publishedAt: today(),
  readTimeMinutes: 5,
  category: { id: "", en: "" },
  author: {
    name: "",
    role: { id: "", en: "" },
    bio: { id: "", en: "" },
  },
  tags: [],
  relatedServiceIds: [],
  relatedCaseStudyIds: [],
  status: "draft",
});

const fromAdminArticle = (article: AdminBlogArticle): BlogArticleInput => ({
  ...article,
  status: article.status,
});

const splitList = (value: string) =>
  value.split(",").map((item) => item.trim()).filter(Boolean);

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Permintaan gagal.";

type TranslatedFieldProps = {
  label: string;
  value: { id: string; en: string };
  onChange: (locale: "id" | "en", value: string) => void;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
};

const TranslatedField = ({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  required = true,
}: TranslatedFieldProps) => (
  <div className="grid gap-4 md:grid-cols-2">
    {(["id", "en"] as const).map((locale) => (
      <div className="space-y-2" key={locale}>
        <Label>{label} ({locale.toUpperCase()})</Label>
        {multiline ? (
          <Textarea
            value={value[locale]}
            onChange={(event) => onChange(locale, event.target.value)}
            rows={rows}
            required={required}
          />
        ) : (
          <Input
            value={value[locale]}
            onChange={(event) => onChange(locale, event.target.value)}
            required={required}
          />
        )}
      </div>
    ))}
  </div>
);

const LoginPanel = ({ onSuccess }: { onSuccess: () => void }) => {
  const [password, setPassword] = useState("");
  const login = useMutation({
    mutationFn: loginBlogAdmin,
    onSuccess: () => {
      setPassword("");
      onSuccess();
    },
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    login.mutate(password);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Dashboard Blog</CardTitle>
          <CardDescription>Masuk untuk mengelola artikel SAN Solution.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="blog-admin-password">Password admin</Label>
              <Input
                id="blog-admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {login.isError && (
              <p className="text-sm text-destructive">{errorMessage(login.error)}</p>
            )}
            <Button className="w-full" type="submit" disabled={login.isPending}>
              {login.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Masuk
            </Button>
            <Button variant="ghost" className="w-full" asChild>
              <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Kembali ke blog</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

const BlogDashboardPage = () => {
  const queryClient = useQueryClient();
  const session = useQuery({ queryKey: ["blog-admin", "session"], queryFn: fetchAdminSession, retry: false });
  const articles = useQuery({
    queryKey: ["blog-admin", "articles"],
    queryFn: fetchAdminArticles,
    enabled: session.data === true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogArticleInput>(emptyArticle);

  useEffect(() => {
    document.title = "Dashboard Blog | SAN Solution";
    const existing = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousContent = existing?.content;
    const robots = existing || document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    if (!existing) document.head.appendChild(robots);

    return () => {
      if (existing) robots.content = previousContent || "index, follow";
      else robots.remove();
    };
  }, []);

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["blog-admin"] });
    await queryClient.invalidateQueries({ queryKey: ["blog"] });
  };

  const save = useMutation({
    mutationFn: () => editingId
      ? updateBlogArticle(editingId, form)
      : createBlogArticle(form),
    onSuccess: async (article) => {
      setEditingId(article.id);
      setForm(fromAdminArticle(article));
      await refresh();
      toast.success("Artikel berhasil disimpan.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const remove = useMutation({
    mutationFn: deleteBlogArticle,
    onSuccess: async () => {
      setEditingId(null);
      setForm(emptyArticle());
      await refresh();
      toast.success("Artikel berhasil dihapus.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const logout = useMutation({
    mutationFn: logoutBlogAdmin,
    onSuccess: async () => {
      queryClient.setQueryData(["blog-admin", "session"], false);
      queryClient.removeQueries({ queryKey: ["blog-admin", "articles"] });
    },
  });

  if (session.isLoading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>;
  }
  if (session.isError && !(session.error instanceof BlogApiError && session.error.status === 401)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="max-w-lg"><CardHeader><CardTitle>Dashboard belum siap</CardTitle><CardDescription>{errorMessage(session.error)}</CardDescription></CardHeader></Card>
      </main>
    );
  }
  if (!session.data) {
    return <LoginPanel onSuccess={() => queryClient.invalidateQueries({ queryKey: ["blog-admin", "session"] })} />;
  }

  const updateTranslated = (
    field: "slug" | "title" | "excerpt" | "content" | "category",
    locale: "id" | "en",
    value: string,
  ) => setForm((current) => ({ ...current, [field]: { ...current[field], [locale]: value } }));

  const startNew = () => {
    setEditingId(null);
    setForm(emptyArticle());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEdit = (article: AdminBlogArticle) => {
    setEditingId(article.id);
    setForm(fromAdminArticle(article));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    save.mutate();
  };

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold">Manajemen Artikel Blog</h1>
            <p className="text-xs text-muted-foreground">SAN Solution · NeonDB</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild><Link to="/dashboard/clients">Our Clients</Link></Button>
            <Button variant="outline" size="sm" asChild><Link to="/blog"><ExternalLink className="mr-2 h-4 w-4" />Lihat blog</Link></Button>
            <Button variant="ghost" size="sm" onClick={() => logout.mutate()}><LogOut className="mr-2 h-4 w-4" />Keluar</Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div><CardTitle>{editingId ? "Edit artikel" : "Artikel baru"}</CardTitle><CardDescription>Isi versi Bahasa Indonesia dan English sebelum menyimpan.</CardDescription></div>
            <Button type="button" variant="outline" size="sm" onClick={startNew}><FilePlus2 className="mr-2 h-4 w-4" />Baru</Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-7">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2"><Label>Status</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as "draft" | "published" })}><option value="draft">Draft</option><option value="published">Published</option></select></div>
                <div className="space-y-2"><Label>Tanggal terbit</Label><Input type="date" value={form.publishedAt} onChange={(event) => setForm({ ...form, publishedAt: event.target.value })} required /></div>
                <div className="space-y-2"><Label>Waktu baca (menit)</Label><Input type="number" min={1} max={180} value={form.readTimeMinutes} onChange={(event) => setForm({ ...form, readTimeMinutes: Number(event.target.value) })} required /></div>
              </div>

              <TranslatedField label="Slug" value={form.slug} onChange={(locale, value) => updateTranslated("slug", locale, value)} />
              <TranslatedField label="Judul" value={form.title} onChange={(locale, value) => updateTranslated("title", locale, value)} />
              <TranslatedField label="Kategori" value={form.category} onChange={(locale, value) => updateTranslated("category", locale, value)} />
              <TranslatedField label="Ringkasan" value={form.excerpt} multiline rows={4} onChange={(locale, value) => updateTranslated("excerpt", locale, value)} />
              <TranslatedField label="Konten Markdown" value={form.content} multiline rows={16} onChange={(locale, value) => updateTranslated("content", locale, value)} />

              <div className="border-t pt-6">
                <h2 className="mb-4 font-semibold">Penulis</h2>
                <div className="space-y-4">
                  <div className="space-y-2"><Label>Nama</Label><Input value={form.author.name} onChange={(event) => setForm({ ...form, author: { ...form.author, name: event.target.value } })} required /></div>
                  <TranslatedField label="Peran" value={form.author.role} onChange={(locale, value) => setForm((current) => ({ ...current, author: { ...current.author, role: { ...current.author.role, [locale]: value } } }))} />
                  <TranslatedField label="Bio" value={form.author.bio} multiline onChange={(locale, value) => setForm((current) => ({ ...current, author: { ...current.author, bio: { ...current.author.bio, [locale]: value } } }))} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Tag (pisahkan dengan koma)</Label><Input value={form.tags.join(", ")} onChange={(event) => setForm({ ...form, tags: splitList(event.target.value) })} /></div>
                <div className="space-y-2"><Label>URL gambar utama</Label><Input value={form.featuredImage || ""} onChange={(event) => setForm({ ...form, featuredImage: event.target.value })} /></div>
                <div className="space-y-2"><Label>ID layanan terkait</Label><Input value={form.relatedServiceIds.join(", ")} onChange={(event) => setForm({ ...form, relatedServiceIds: splitList(event.target.value) })} /></div>
                <div className="space-y-2"><Label>ID studi kasus terkait</Label><Input value={form.relatedCaseStudyIds.join(", ")} onChange={(event) => setForm({ ...form, relatedCaseStudyIds: splitList(event.target.value) })} /></div>
              </div>

              <div className="flex flex-wrap justify-between gap-3 border-t pt-6">
                {editingId ? <Button type="button" variant="destructive" disabled={remove.isPending} onClick={() => { if (window.confirm("Hapus artikel ini secara permanen?")) remove.mutate(editingId); }}><Trash2 className="mr-2 h-4 w-4" />Hapus</Button> : <span />}
                <Button type="submit" disabled={save.isPending}>{save.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Simpan artikel</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-center justify-between"><h2 className="font-semibold">Semua artikel</h2><Badge variant="secondary">{articles.data?.length || 0}</Badge></div>
          {articles.isLoading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin" /></div> : articles.isError ? <p className="text-sm text-destructive">{errorMessage(articles.error)}</p> : (
            <div className="max-h-[calc(100vh-160px)] space-y-3 overflow-y-auto pr-1">
              {articles.data?.map((article) => (
                <Card key={article.id} className={editingId === article.id ? "border-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-start justify-between gap-2"><Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge><span className="text-xs text-muted-foreground">{article.publishedAt}</span></div>
                    <h3 className="line-clamp-2 text-sm font-semibold">{article.title.id}</h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">/{article.slug.id}</p>
                    <div className="mt-3 flex gap-2"><Button size="sm" variant="outline" className="flex-1" onClick={() => startEdit(article)}><Pencil className="mr-2 h-3.5 w-3.5" />Edit</Button>{article.status === "published" && <Button size="icon" variant="ghost" asChild><Link to={blogPostPath(article.slug.id, "id")} target="_blank"><ExternalLink className="h-4 w-4" /></Link></Button>}</div>
                  </CardContent>
                </Card>
              ))}
              {!articles.data?.length && <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">Belum ada artikel.</p>}
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default BlogDashboardPage;
