import { FormEvent, useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
  Upload,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  Quote,
  Code,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  Image as ImageIcon,
  Type,
  Tag,
  type LucideIcon
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CKEditorField } from "@/components/blog/CKEditorField";
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
  uploadImageKit
} from "@/lib/blog";
import { blogPostPath } from "@/lib/routes";

const today = () => new Date().toISOString().slice(0, 10);

const emptyArticle = (): BlogArticleInput => ({
  id: "",
  slug: { id: "", en: "" },
  title: { id: "", en: "" },
  seoTitle: { id: "", en: "" },
  metaDescription: { id: "", en: "" },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const session = useQuery({ queryKey: ["blog-admin", "session"], queryFn: fetchAdminSession, retry: false });
  const articles = useQuery({
    queryKey: ["blog-admin", "articles"],
    queryFn: fetchAdminArticles,
    enabled: session.data === true,
  });
  
  const [view, setView] = useState<"list" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogArticleInput>(emptyArticle);
  
  // Dynamic list state for excerpt (ringkasan)
  const [excerptPoints, setExcerptPoints] = useState<string[]>([""]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  useEffect(() => {
    if (!articles.data) return;
    const action = searchParams.get("action");
    const editId = searchParams.get("id");

    if (action === "edit" && editId) {
      if (editingId !== editId) {
        const article = articles.data.find((a) => a.id === editId);
        if (article) {
          setEditingId(article.id);
          setForm(fromAdminArticle(article));
          setExcerptPoints(article.excerpt.id ? article.excerpt.id.split("\n") : [""]);
          setView("edit");
        } else {
          setSearchParams({});
        }
      }
    } else if (action === "new") {
      if (editingId !== null || view !== "edit") {
        setEditingId(null);
        setForm(emptyArticle());
        setExcerptPoints([""]);
        setView("edit");
      }
    } else {
      if (view !== "list") {
        setView("list");
        setEditingId(null);
      }
    }
  }, [searchParams, articles.data, editingId, view, setSearchParams]);

  const refresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ["blog-admin"] });
    await queryClient.invalidateQueries({ queryKey: ["blog"] });
  };

  const save = useMutation({
    mutationFn: () => {
      const payload = {
        ...form,
        excerpt: {
          id: excerptPoints.filter(Boolean).join("\n"),
          en: excerptPoints.filter(Boolean).join("\n"),
        }
      };
      return editingId ? updateBlogArticle(editingId, payload) : createBlogArticle(payload);
    },
    onSuccess: async (article) => {
      setEditingId(article.id);
      setForm(fromAdminArticle(article));
      await refresh();
      toast.success("Artikel berhasil disimpan.");
      setSearchParams({});
    },
    onError: (error) => toast.error(errorMessage(error)),
  });

  const remove = useMutation({
    mutationFn: deleteBlogArticle,
    onSuccess: async () => {
      setEditingId(null);
      setForm(emptyArticle());
      setExcerptPoints([""]);
      await refresh();
      toast.success("Artikel berhasil dihapus.");
      setSearchParams({});
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

  const startNew = () => {
    setSearchParams({ action: "new" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEdit = (article: AdminBlogArticle) => {
    setSearchParams({ action: "edit", id: article.id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = (event?: FormEvent) => {
    if (event) event.preventDefault();
    save.mutate();
  };

  const handleInsertMarkdown = (prefix: string, suffix = "") => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = form.content.id;
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    const newText = before + prefix + selected + suffix + after;
    setForm(f => ({ ...f, content: { id: newText, en: newText } }));
    
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          const url = await uploadImageKit(base64, file.name);
          setForm(f => ({ ...f, featuredImage: url }));
          toast.success("Gambar berhasil diupload!");
        } catch (error) {
          toast.error(errorMessage(error));
        } finally {
          setUploadingImage(false);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error("Gagal membaca file.");
      setUploadingImage(false);
    }
  };

  if (view === "list") {
    return (
      <main className="min-h-screen bg-muted/30">
        <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-widest">BULETIN</p>
              <h1 className="text-xl font-bold">Editorial dashboard</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild><Link to="/blog"><ExternalLink className="mr-2 h-4 w-4" />Lihat blog</Link></Button>
              <Button variant="ghost" size="sm" onClick={() => logout.mutate()}><LogOut className="h-4 w-4" /></Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Semua Artikel</h2>
            <Button onClick={startNew} className="bg-red-700 hover:bg-red-800 text-white"><FilePlus2 className="mr-2 h-4 w-4" />Artikel Baru</Button>
          </div>
          
          {articles.isLoading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin" /></div> : articles.isError ? <p className="text-sm text-destructive">{errorMessage(articles.error)}</p> : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {articles.data?.map((article) => (
                <Card key={article.id} className="hover:border-primary cursor-pointer transition-colors" onClick={() => startEdit(article)}>
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-start justify-between gap-2">
                      <Badge variant={article.status === "published" ? "default" : "secondary"}>{article.status}</Badge>
                      <span className="text-xs text-muted-foreground">{article.publishedAt}</span>
                    </div>
                    <h3 className="line-clamp-2 text-lg font-bold mb-2">{article.title.id}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{article.excerpt.id?.split("\n")[0] || ""}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); startEdit(article); }}><Pencil className="mr-2 h-3.5 w-3.5" />Edit</Button>
                      {article.status === "published" && <Button size="icon" variant="ghost" asChild onClick={(e) => e.stopPropagation()}><Link to={blogPostPath(article.slug.id, "id")} target="_blank"><ExternalLink className="h-4 w-4" /></Link></Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {!articles.data?.length && <div className="col-span-full rounded-lg border border-dashed p-12 text-center text-muted-foreground">Belum ada artikel. Klik "Artikel Baru" untuk membuat.</div>}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30 pb-20">
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold text-red-600 uppercase tracking-widest">BULETIN</p>
            <h1 className="text-xl font-bold">Editorial dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild><Link to="/blog"><ExternalLink className="mr-2 h-4 w-4" />Lihat blog</Link></Button>
            <Button variant="ghost" size="sm" onClick={() => logout.mutate()}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <Button variant="link" className="px-0 text-muted-foreground mb-2" onClick={() => setSearchParams({})}>
          &larr; Kembali ke daftar
        </Button>
        
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* Main Content Area */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-0 shadow-sm">
              <CardHeader className="flex-row items-start justify-between gap-4 bg-white border-b px-8 py-6">
                <div>
                  <p className="text-xs font-bold text-red-600 uppercase tracking-widest">EDIT ARTIKEL</p>
                  <CardTitle className="text-2xl mt-1">Konten dan optimasi SEO</CardTitle>
                </div>
                <Button type="button" className="bg-red-700 hover:bg-red-800 text-white shadow" onClick={() => submit()} disabled={save.isPending}>
                  {save.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Simpan artikel
                </Button>
              </CardHeader>
              <CardContent className="bg-white px-8 py-8 space-y-8">
                
                {/* Judul */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Judul artikel</Label>
                  <Input 
                    className="text-lg py-6"
                    value={form.title.id} 
                    onChange={e => setForm(f => ({ ...f, title: { id: e.target.value, en: e.target.value } }))} 
                    placeholder="Masukkan judul artikel"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Slug URL</Label>
                  <Input 
                    value={form.slug.id} 
                    onChange={e => setForm(f => ({ ...f, slug: { id: e.target.value, en: e.target.value } }))} 
                  />
                  <p className="text-xs text-muted-foreground">/blog/{form.slug.id}</p>
                </div>

                {/* Ringkasan Poin */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold flex items-center gap-2">Ringkasan <span className="text-muted-foreground font-normal text-sm">(poin-poin penting)</span></Label>
                  <div className="space-y-2">
                    {excerptPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 font-medium text-sm mt-1">
                          {idx + 1}
                        </div>
                        <Textarea 
                          value={point}
                          rows={2}
                          className="min-h-[60px] resize-y"
                          onChange={(e) => {
                            const newPoints = [...excerptPoints];
                            newPoints[idx] = e.target.value;
                            setExcerptPoints(newPoints);
                          }} 
                          onPaste={(e) => {
                            const pastedText = e.clipboardData.getData("text/plain") || e.clipboardData.getData("Text");
                            if (pastedText.includes('\n')) {
                              e.preventDefault();
                              const splitText = pastedText.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
                              if (splitText.length > 0) {
                                let newPoints = [...excerptPoints];
                                newPoints.splice(idx, 1, ...splitText);
                                newPoints = newPoints.slice(0, 8); // Max 8 points
                                setExcerptPoints(newPoints);
                              }
                            }
                          }}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            if (excerptPoints.length === 1) {
                              setExcerptPoints([""]);
                            } else {
                              setExcerptPoints(excerptPoints.filter((_, i) => i !== idx));
                            }
                          }}
                          className="text-muted-foreground hover:text-destructive mt-1 shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    {excerptPoints.length < 8 ? (
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="w-full border-dashed text-muted-foreground hover:text-foreground"
                        onClick={() => setExcerptPoints([...excerptPoints, ""])}
                      >
                        + Tambah poin
                      </Button>
                    ) : <span />}
                    <span className="text-xs text-muted-foreground min-w-max ml-4">{excerptPoints.length} / 8 poin</span>
                  </div>
                </div>

                {/* Isi Artikel */}
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Isi artikel</Label>
                  <div className="mt-2">
                    <CKEditorField 
                      value={form.content.id} 
                      onChange={html => setForm(f => ({ ...f, content: { id: html, en: html } }))}
                    />
                  </div>
                </div>

                {/* Extra (Author) */}
                <div className="pt-8 border-t space-y-4">
                  <Label className="text-base font-semibold">Info Penulis <span className="text-muted-foreground font-normal text-sm">(Opsional)</span></Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2"><Label>Nama</Label><Input value={form.author.name} onChange={e => setForm(f => ({ ...f, author: { ...f.author, name: e.target.value } }))} /></div>
                    <div className="space-y-2"><Label>Peran</Label><Input value={form.author.role.id} onChange={e => setForm(f => ({ ...f, author: { ...f.author, role: { id: e.target.value, en: e.target.value } } }))} /></div>
                  </div>
                </div>

                {editingId && (
                  <div className="pt-4 flex justify-end">
                    <Button type="button" variant="destructive" onClick={() => { if (window.confirm("Hapus artikel ini secara permanen?")) remove.mutate(); }}>
                      <Trash2 className="mr-2 h-4 w-4" /> Hapus Artikel
                    </Button>
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-6 pt-6"><CardTitle className="text-base">Publikasi</CardTitle></CardHeader>
              <CardContent className="px-6 pb-6">
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" 
                  value={form.status} 
                  onChange={e => setForm({ ...form, status: e.target.value as "draft" | "published" })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Terbitkan</option>
                </select>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-6 pt-6"><CardTitle className="text-base">Kategori</CardTitle></CardHeader>
              <CardContent className="px-6 pb-6 space-y-3">
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={["Teknologi Pendidikan", "AI dalam Bisnis", "Transformasi Digital"].includes(form.category.id) ? form.category.id : "custom"}
                  onChange={e => {
                    if (e.target.value !== "custom") {
                      setForm(f => ({ ...f, category: { id: e.target.value, en: e.target.value } }));
                    }
                  }}
                >
                  <option value="Teknologi Pendidikan">Teknologi Pendidikan</option>
                  <option value="AI dalam Bisnis">AI dalam Bisnis</option>
                  <option value="Transformasi Digital">Transformasi Digital</option>
                  <option value="custom">Kategori Lain...</option>
                </select>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Atau ketik kategori kustom:</Label>
                  <Input 
                    value={form.category.id} 
                    onChange={e => setForm(f => ({ ...f, category: { id: e.target.value, en: e.target.value } }))} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-6 pt-6"><CardTitle className="text-base">Gambar utama</CardTitle></CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                {form.featuredImage ? (
                  <div className="relative aspect-video rounded-md overflow-hidden bg-muted group">
                    <img src={form.featuredImage} alt="Featured" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>Ganti Gambar</Button>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video rounded-md border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground p-4 text-center bg-muted/20">
                    <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
                    <span className="text-xs">Belum ada gambar utama</span>
                  </div>
                )}
                
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  Upload ke ImageKit
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3 px-6 pt-6"><CardTitle className="text-base flex items-center gap-2"><Tag className="h-4 w-4 text-red-600" /> SEO & Kata Kunci</CardTitle></CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Focus keyword</Label>
                  <Input 
                    value={form.tags[0] || ""} 
                    onChange={e => {
                      const newTags = [...form.tags];
                      newTags[0] = e.target.value;
                      setForm(f => ({ ...f, tags: newTags.filter(Boolean) }));
                    }}
                  />
                  <p className="text-[10px] text-muted-foreground">Kata kunci utama yang ingin diraih</p>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Kata kunci pendukung</Label>
                  <Textarea 
                    rows={3}
                    value={form.tags.slice(1).join(", ")} 
                    onChange={e => {
                      const focus = form.tags[0] || "";
                      const rest = splitList(e.target.value);
                      setForm(f => ({ ...f, tags: [focus, ...rest].filter(Boolean) }));
                    }}
                    placeholder="Pendidikan Indonesia 2026, pembelajaran..."
                  />
                  <p className="text-[10px] text-muted-foreground">Pisahkan dengan koma</p>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">SEO title</Label>
                  <Input 
                    value={form.seoTitle?.id || ""} 
                    onChange={e => setForm(f => ({ ...f, seoTitle: { id: e.target.value, en: e.target.value } }))}
                  />
                  <p className="text-[10px] text-muted-foreground">Ideal 50-60 karakter - {form.seoTitle?.id?.length || 0}/60</p>
                </div>

                <div className="space-y-2">
                  <Label className="font-semibold">Meta description</Label>
                  <Textarea 
                    rows={4}
                    value={form.metaDescription?.id || ""} 
                    onChange={e => setForm(f => ({ ...f, metaDescription: { id: e.target.value, en: e.target.value } }))}
                  />
                  <p className="text-[10px] text-muted-foreground">Ideal 140-160 karakter - {form.metaDescription?.id?.length || 0}/160</p>
                </div>
              </CardContent>
            </Card>

          </aside>
        </div>
      </div>
    </main>
  );
};

export default BlogDashboardPage;
