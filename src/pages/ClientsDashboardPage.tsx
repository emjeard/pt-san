import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, FilePlus2, Loader2, LogOut, Pencil, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type AdminSiteClient,
  type SiteClientInput,
  createSiteClient,
  deleteSiteClient,
  fetchAdminClients,
  updateSiteClient,
} from "@/lib/clients";
import { BlogApiError, fetchAdminSession, loginBlogAdmin, logoutBlogAdmin } from "@/lib/blog";

const emptyClient = (): SiteClientInput => ({
  id: "",
  name: "",
  logoUrl: "",
  websiteUrl: "",
  displayOrder: 0,
  status: "draft",
});

const fromAdminClient = (client: AdminSiteClient): SiteClientInput => ({ ...client, status: client.status });

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Permintaan gagal.";

const ClientsDashboardPage = () => {
  const queryClient = useQueryClient();
  const session = useQuery({ queryKey: ["blog-admin", "session"], queryFn: fetchAdminSession, retry: false });
  const clients = useQuery({
    queryKey: ["clients-admin", "clients"],
    queryFn: fetchAdminClients,
    enabled: session.data === true,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<SiteClientInput>(emptyClient);
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = "Dashboard Klien | SAN Solution";
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
    await queryClient.invalidateQueries({ queryKey: ["clients-admin"] });
    await queryClient.invalidateQueries({ queryKey: ["clients"] });
  };

  const login = useMutation({
    mutationFn: loginBlogAdmin,
    onSuccess: () => {
      setPassword("");
      queryClient.invalidateQueries({ queryKey: ["blog-admin", "session"] });
    },
  });
  const save = useMutation({
    mutationFn: () => editingId ? updateSiteClient(editingId, form) : createSiteClient(form),
    onSuccess: async (client) => {
      setEditingId(client.id);
      setForm(fromAdminClient(client));
      await refresh();
      toast.success("Klien berhasil disimpan.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
  const remove = useMutation({
    mutationFn: deleteSiteClient,
    onSuccess: async () => {
      setEditingId(null);
      setForm(emptyClient());
      await refresh();
      toast.success("Klien berhasil dihapus.");
    },
    onError: (error) => toast.error(errorMessage(error)),
  });
  const logout = useMutation({
    mutationFn: logoutBlogAdmin,
    onSuccess: () => {
      queryClient.setQueryData(["blog-admin", "session"], false);
      queryClient.removeQueries({ queryKey: ["clients-admin"] });
    },
  });

  const startNew = () => {
    setEditingId(null);
    setForm(emptyClient());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const startEdit = (client: AdminSiteClient) => {
    setEditingId(client.id);
    setForm(fromAdminClient(client));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (session.isLoading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="h-7 w-7 animate-spin text-primary" /></div>;
  }
  if (session.isError && !(session.error instanceof BlogApiError && session.error.status === 401)) {
    return <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4"><Card className="max-w-lg"><CardHeader><CardTitle>Dashboard belum siap</CardTitle><CardDescription>{errorMessage(session.error)}</CardDescription></CardHeader></Card></main>;
  }
  if (!session.data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader><CardTitle>Dashboard Klien</CardTitle><CardDescription>Masuk untuk mengelola Our Clients SAN Solution.</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={(event: FormEvent) => { event.preventDefault(); login.mutate(password); }} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="client-admin-password">Password admin</Label><Input id="client-admin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div>
              {login.isError && <p className="text-sm text-destructive">{errorMessage(login.error)}</p>}
              <Button className="w-full" type="submit" disabled={login.isPending}>{login.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Masuk</Button>
              <Button variant="ghost" className="w-full" asChild><Link to="/dashboard/blog"><ArrowLeft className="mr-2 h-4 w-4" />Kembali ke dashboard blog</Link></Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div><h1 className="text-xl font-bold">Manajemen Our Clients</h1><p className="text-xs text-muted-foreground">SAN Solution · NeonDB</p></div>
          <div className="flex gap-2"><Button variant="outline" size="sm" asChild><Link to="/dashboard/blog">Artikel blog</Link></Button><Button variant="ghost" size="sm" onClick={() => logout.mutate()}><LogOut className="mr-2 h-4 w-4" />Keluar</Button></div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Card>
          <CardHeader className="flex-row items-start justify-between gap-4"><div><CardTitle>{editingId ? "Edit klien" : "Klien baru"}</CardTitle><CardDescription>Masukkan nama, logo, tautan opsional, dan urutan tampilan.</CardDescription></div><Button type="button" variant="outline" size="sm" onClick={startNew}><FilePlus2 className="mr-2 h-4 w-4" />Baru</Button></CardHeader>
          <CardContent>
            <form onSubmit={(event: FormEvent) => { event.preventDefault(); save.mutate(); }} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label>Status</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as "draft" | "published" })}><option value="draft">Draft</option><option value="published">Published</option></select></div><div className="space-y-2"><Label>Urutan tampil</Label><Input type="number" min={0} max={10000} value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) })} required /></div></div>
              <div className="space-y-2"><Label>Nama klien</Label><Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></div>
              <div className="space-y-2"><Label>URL logo</Label><Input placeholder="https://example.com/logo.svg atau /logo.svg" value={form.logoUrl} onChange={(event) => setForm({ ...form, logoUrl: event.target.value })} required /></div>
              <div className="space-y-2"><Label>URL website (opsional)</Label><Input placeholder="https://example.com atau /halaman" value={form.websiteUrl || ""} onChange={(event) => setForm({ ...form, websiteUrl: event.target.value })} /></div>
              <div className="flex flex-wrap justify-between gap-3 border-t pt-6">{editingId ? <Button type="button" variant="destructive" disabled={remove.isPending} onClick={() => { if (window.confirm("Hapus klien ini secara permanen?")) remove.mutate(editingId); }}><Trash2 className="mr-2 h-4 w-4" />Hapus</Button> : <span />}<Button type="submit" disabled={save.isPending}>{save.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Simpan klien</Button></div>
            </form>
          </CardContent>
        </Card>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start"><div className="flex items-center justify-between"><h2 className="font-semibold">Semua klien</h2><Badge variant="secondary">{clients.data?.length || 0}</Badge></div>{clients.isLoading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin" /></div> : clients.isError ? <p className="text-sm text-destructive">{errorMessage(clients.error)}</p> : <div className="max-h-[calc(100vh-160px)] space-y-3 overflow-y-auto pr-1">{clients.data?.map((client) => <Card key={client.id} className={editingId === client.id ? "border-primary" : ""}><CardContent className="p-4"><div className="mb-2 flex items-start justify-between gap-2"><Badge variant={client.status === "published" ? "default" : "secondary"}>{client.status}</Badge><span className="text-xs text-muted-foreground">#{client.displayOrder}</span></div><h3 className="text-sm font-semibold">{client.name}</h3><p className="mt-1 truncate text-xs text-muted-foreground">{client.logoUrl}</p><div className="mt-3 flex gap-2"><Button size="sm" variant="outline" className="flex-1" onClick={() => startEdit(client)}><Pencil className="mr-2 h-3.5 w-3.5" />Edit</Button>{client.websiteUrl && <Button size="icon" variant="ghost" asChild><a href={client.websiteUrl} target="_blank" rel="noreferrer"><ExternalLink className="h-4 w-4" /></a></Button>}</div></CardContent></Card>)}</div>}</aside>
      </div>
    </main>
  );
};

export default ClientsDashboardPage;
