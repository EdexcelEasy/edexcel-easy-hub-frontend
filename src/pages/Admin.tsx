import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Database,
  Edit,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  UploadCloud,
  Users,
  BookOpen,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminSubjectsManager from "@/components/AdminSubjectsManager";
import { ADMIN_API_URL } from "@/lib/admin-api";

type ContentFile = {
  id: string;
  public_url: string;
  label: string | null;
  file_type: string | null;
  mime_type: string | null;
  path: string;
};

type SiteContent = {
  id: string;
  type: string;
  slug: string;
  title: string;
  subtitle: string | null;
  summary: string | null;
  body: string | null;
  curriculum: string | null;
  subject: string | null;
  unit: string | null;
  exam_session: string | null;
  paper_code: string | null;
  sort_order: number;
  published: boolean;
  metadata: Record<string, unknown>;
  content_files?: ContentFile[];
};

type AdminUser = {
  id: string;
  email: string;
  display_name: string | null;
  active: boolean;
  last_login_at: string | null;
  created_at: string;
};

type ContentForm = {
  id?: string;
  type: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  body: string;
  curriculum: string;
  subject: string;
  unit: string;
  exam_session: string;
  paper_code: string;
  sort_order: string;
  published: boolean;
  metadata: string;
};

const API_URL = ADMIN_API_URL;
const emptyForm: ContentForm = {
  type: "blog",
  slug: "",
  title: "",
  subtitle: "",
  summary: "",
  body: "",
  curriculum: "",
  subject: "",
  unit: "",
  exam_session: "",
  paper_code: "",
  sort_order: "0",
  published: true,
  metadata: "{}",
};

const contentTypes = [
  "blog",
  "course",
  "booklet",
  "resource",
  "past-paper",
  "worksheet",
  "textbook",
  "homepage-section",
];

const adminSections = [
  { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { id: "content", label: "Content Editor", Icon: FileText },
  { id: "uploads", label: "Uploads", Icon: UploadCloud },
  { id: "records", label: "Records", Icon: Database },
  { id: "subjects", label: "Subjects", Icon: BookOpen },
  { id: "subject-resources", label: "Subject Resources", Icon: FolderOpen },
  { id: "admins", label: "Admins", Icon: Users },
] as const;

type AdminSection = (typeof adminSections)[number]["id"];

const Admin = () => {
  const [token, setToken] = useState(() => localStorage.getItem("admin_api_token") || "");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminDisplayName, setNewAdminDisplayName] = useState("");
  const [currentAdmin, setCurrentAdmin] = useState(() => localStorage.getItem("admin_email") || "");
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [items, setItems] = useState<SiteContent[]>([]);
  const [form, setForm] = useState<ContentForm>(emptyForm);
  const [selectedContentId, setSelectedContentId] = useState("");
  const [fileType, setFileType] = useState("asset");
  const [bucket, setBucket] = useState("site-assets");
  const [folder, setFolder] = useState("uploads");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedContentId),
    [items, selectedContentId],
  );

  useEffect(() => {
    if (token) localStorage.setItem("admin_api_token", token);
  }, [token]);

  useEffect(() => {
    if (token) {
      void loadContent();
      void loadAdmins();
    }
  }, []);

  const request = async (path: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "Request failed");
    }
    return payload;
  };

  const loadContent = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = await request("/api/content?includeDrafts=true");
      setItems(payload.data || []);
      setStatus("Content loaded.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load content.");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || "Login failed");

      setToken(payload.token);
      setCurrentAdmin(payload.user?.email || adminEmail);
      localStorage.setItem("admin_api_token", payload.token);
      localStorage.setItem("admin_email", payload.user?.email || adminEmail);
      setStatus("Logged in.");
      await loadContentWithToken(payload.token);
      await loadAdminsWithToken(payload.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const loadContentWithToken = async (authToken: string) => {
    const response = await fetch(`${API_URL}/api/content?includeDrafts=true`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Could not load content");
    setItems(payload.data || []);
  };

  const loadAdmins = async () => {
    setError("");
    try {
      const payload = await request("/api/admin/users");
      setAdmins(payload.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load admins.");
    }
  };

  const loadAdminsWithToken = async (authToken: string) => {
    const response = await fetch(`${API_URL}/api/admin/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Could not load admins");
    setAdmins(payload.data || []);
  };

  const createAdminUser = async () => {
    setLoading(true);
    setError("");
    try {
      await request("/api/admin/users", {
        method: "POST",
        body: JSON.stringify({
          email: newAdminEmail,
          password: newAdminPassword,
          display_name: newAdminDisplayName,
        }),
      });
      setNewAdminEmail("");
      setNewAdminPassword("");
      setNewAdminDisplayName("");
      setStatus("New admin created.");
      await loadAdmins();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create admin profile.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    setCurrentAdmin("");
    localStorage.removeItem("admin_api_token");
    localStorage.removeItem("admin_email");
    setItems([]);
    setAdmins([]);
    setStatus("Logged out.");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedContentId("");
    setActiveSection("content");
    setStatus("Ready for a new item.");
  };

  const editItem = (item: SiteContent) => {
    setSelectedContentId(item.id);
    setForm({
      id: item.id,
      type: item.type,
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle || "",
      summary: item.summary || "",
      body: item.body || "",
      curriculum: item.curriculum || "",
      subject: item.subject || "",
      unit: item.unit || "",
      exam_session: item.exam_session || "",
      paper_code: item.paper_code || "",
      sort_order: String(item.sort_order || 0),
      published: item.published,
      metadata: JSON.stringify(item.metadata || {}, null, 2),
    });
    setActiveSection("content");
    setStatus(`Editing "${item.title}".`);
  };

  const deleteItem = async (item: SiteContent) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setLoading(true);
    setError("");
    try {
      await request(`/api/admin/content/${item.id}`, { method: "DELETE" });
      setStatus("Content deleted.");
      if (selectedContentId === item.id) resetForm();
      await loadContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = toPayload(form);
      const path = form.id ? `/api/admin/content/${form.id}` : "/api/admin/content";
      const method = form.id ? "PUT" : "POST";
      const result = await request(path, {
        method,
        body: JSON.stringify(payload),
      });

      setStatus(form.id ? "Content updated." : "Content created.");
      setSelectedContentId(result.data.id);
      setForm((current) => ({ ...current, id: result.data.id }));
      await loadContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      setError("Choose a file first.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const base64 = await fileToBase64(file);
      const target = selectedContentId
        ? `/api/admin/content/${selectedContentId}/files`
        : "/api/admin/upload";
      await request(target, {
        method: "POST",
        body: JSON.stringify({
          bucket,
          folder,
          fileName: file.name,
          contentType: file.type || "application/octet-stream",
          fileType,
          base64,
          upsert: true,
        }),
      });
      setStatus(selectedContentId ? "File uploaded and attached." : "File uploaded.");
      setFile(null);
      await loadContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 px-4 py-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl items-center justify-center">
          <div className="grid w-full gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <section className="space-y-5">
              <div className="inline-flex rounded-full border border-amber-200 bg-amber-100/80 px-4 py-1.5 text-sm font-semibold text-primary">
                Edexcel Easy Admin
              </div>
              <div>
                <h1 className="text-4xl font-bold leading-tight text-primary md:text-5xl">
                  Sign in to manage your website.
                </h1>
                <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
                  Upload resources, publish blog posts, manage courses, and keep your Edexcel Easy content updated from one dashboard.
                </p>
              </div>
            </section>

            <div className="space-y-4">
              <Card className="border-primary/10 shadow-xl">
                <CardHeader>
                  <CardTitle>Admin Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Field label="Email">
                    <Input
                      type="email"
                      value={adminEmail}
                      onChange={(event) => setAdminEmail(event.target.value)}
                      placeholder="admin@example.com"
                    />
                  </Field>
                  <Field label="Password">
                    <Input
                      type="password"
                      value={adminPassword}
                      onChange={(event) => setAdminPassword(event.target.value)}
                      placeholder="Admin password"
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && adminEmail && adminPassword) void login();
                      }}
                    />
                  </Field>
                  <Button type="button" className="w-full" onClick={login} disabled={!adminEmail || !adminPassword || loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Login
                  </Button>
                </CardContent>
              </Card>

              {(status || error) && (
                <div
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    error
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {error || status}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-primary/10 bg-white/90 p-4 shadow-sm backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <div>
            <p className="text-sm font-semibold text-primary">Edexcel Easy</p>
            <h1 className="text-2xl font-bold text-primary">Admin</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Manage uploads and content.
            </p>
          </div>

          <nav className="mt-6 grid gap-2">
            {adminSections.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSection(id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  activeSection === id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-primary hover:bg-primary/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-6 rounded-lg bg-secondary/70 p-3 text-xs text-secondary-foreground">
            {currentAdmin ? (
              <>
                <span className="block text-muted-foreground">Signed in as</span>
                <span className="font-semibold text-primary">{currentAdmin}</span>
              </>
            ) : (
              "Signed in"
            )}
          </div>

          <div className="mt-4 grid gap-2">
            <Button type="button" variant="outline" onClick={loadContent} disabled={!token || loading}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button type="button" variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            <Button type="button" onClick={resetForm}>
              <Plus className="h-4 w-4" />
              New
            </Button>
          </div>
        </aside>

        <section className="px-4 py-6 md:px-6">
          <div className="mx-auto max-w-6xl space-y-5">
            <header className="border-b border-primary/10 pb-5">
              <h2 className="text-3xl font-bold text-primary md:text-4xl">
                {adminSections.find((section) => section.id === activeSection)?.label}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {activeSection === "dashboard" && "Overview of website content and admin tools."}
                {activeSection === "content" && "Create and edit website content records."}
                {activeSection === "uploads" && "Upload files to Supabase Storage and attach them to content."}
                {activeSection === "records" && "Browse, edit, and delete existing content records."}
                {activeSection === "subjects" && "Build subject categories, subject pages, units, and subtopics."}
                {activeSection === "subject-resources" && "Create free or paid resources, files, and links for each subject."}
                {activeSection === "admins" && "Create admin logins and review who can access this dashboard."}
              </p>
            </header>

            {(status || error) && (
              <div
                className={`rounded-lg border px-4 py-3 text-sm ${
                  error
                    ? "border-red-200 bg-red-50 text-red-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {error || status}
              </div>
            )}

            {activeSection === "dashboard" && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Total Records</p>
                    <p className="mt-2 text-4xl font-bold text-primary">{items.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="mt-2 text-4xl font-bold text-emerald-600">
                      {items.filter((item) => item.published).length}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Attached Files</p>
                    <p className="mt-2 text-4xl font-bold text-sky-600">
                      {items.reduce((total, item) => total + (item.content_files?.length || 0), 0)}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-sm text-muted-foreground">Admins</p>
                    <p className="mt-2 text-4xl font-bold text-amber-600">{admins.length}</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "content" && (
              <Card>
                <CardHeader>
                  <CardTitle>{form.id ? "Edit Content" : "Create Content"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Type">
                  <Select value={form.type} onValueChange={(value) => setFormField("type", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Slug">
                  <Input value={form.slug} onChange={(event) => setFormField("slug", event.target.value)} />
                </Field>
                <Field label="Sort Order">
                  <Input
                    type="number"
                    value={form.sort_order}
                    onChange={(event) => setFormField("sort_order", event.target.value)}
                  />
                </Field>
              </div>

              <Field label="Title">
                <Input value={form.title} onChange={(event) => setFormField("title", event.target.value)} />
              </Field>
              <Field label="Subtitle">
                <Input value={form.subtitle} onChange={(event) => setFormField("subtitle", event.target.value)} />
              </Field>
              <Field label="Summary">
                <Textarea value={form.summary} onChange={(event) => setFormField("summary", event.target.value)} />
              </Field>
              <Field label="Body">
                <Textarea
                  value={form.body}
                  onChange={(event) => setFormField("body", event.target.value)}
                  className="min-h-36"
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Curriculum">
                  <Input
                    value={form.curriculum}
                    onChange={(event) => setFormField("curriculum", event.target.value)}
                    placeholder="igcse, ial"
                  />
                </Field>
                <Field label="Subject">
                  <Input value={form.subject} onChange={(event) => setFormField("subject", event.target.value)} />
                </Field>
                <Field label="Unit">
                  <Input value={form.unit} onChange={(event) => setFormField("unit", event.target.value)} />
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Exam Session">
                  <Input
                    value={form.exam_session}
                    onChange={(event) => setFormField("exam_session", event.target.value)}
                    placeholder="Jan 2026"
                  />
                </Field>
                <Field label="Paper Code">
                  <Input
                    value={form.paper_code}
                    onChange={(event) => setFormField("paper_code", event.target.value)}
                    placeholder="paper1"
                  />
                </Field>
              </div>

              <Field label="Metadata JSON">
                <Textarea
                  value={form.metadata}
                  onChange={(event) => setFormField("metadata", event.target.value)}
                  className="font-mono text-xs"
                />
              </Field>

              <label className="flex items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) => setFormField("published", event.target.checked)}
                />
                Published
              </label>

              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={saveContent} disabled={!token || loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  Save Content
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Clear
                </Button>
              </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "uploads" && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload File</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <Field label="Attach To Content">
                  <Select value={selectedContentId || "none"} onValueChange={(value) => setSelectedContentId(value === "none" ? "" : value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="No content selected" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No content selected</SelectItem>
                      {items.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.type}: {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {selectedItem && (
                  <p className="rounded-md bg-secondary px-3 py-2 text-xs text-secondary-foreground">
                    Attaching to {selectedItem.title}
                  </p>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Bucket">
                    <Select value={bucket} onValueChange={setBucket}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="site-assets">site-assets</SelectItem>
                        <SelectItem value="site-documents">site-documents</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="File Type">
                    <Input value={fileType} onChange={(event) => setFileType(event.target.value)} />
                  </Field>
                </div>

                <Field label="Folder">
                  <Input value={folder} onChange={(event) => setFolder(event.target.value)} />
                </Field>

                <Field label="File">
                  <Input type="file" onChange={(event) => setFile(event.target.files?.[0] || null)} />
                </Field>

                <Button type="button" onClick={uploadFile} disabled={!token || !file || loading}>
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                  Upload
                </Button>
                </CardContent>
              </Card>
            )}

            {activeSection === "records" && (
              <Card>
                <CardHeader>
                  <CardTitle>Content Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No content yet.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="rounded-lg border bg-background p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase text-primary">{item.type}</p>
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <p className="text-xs text-muted-foreground">{item.slug}</p>
                          {item.content_files && item.content_files.length > 0 && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {item.content_files.length} file{item.content_files.length === 1 ? "" : "s"}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button type="button" size="icon" variant="ghost" onClick={() => editItem(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button type="button" size="icon" variant="ghost" onClick={() => void deleteItem(item)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                </CardContent>
              </Card>
            )}

            {activeSection === "subjects" && (
              <AdminSubjectsManager
                token={token}
                onStatus={setStatus}
                onError={setError}
                mode="subjects"
              />
            )}

            {activeSection === "subject-resources" && (
              <AdminSubjectsManager
                token={token}
                onStatus={setStatus}
                onError={setError}
                mode="resources"
              />
            )}

            {activeSection === "admins" && (
              <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Admin</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Field label="Display Name">
                      <Input
                        value={newAdminDisplayName}
                        onChange={(event) => setNewAdminDisplayName(event.target.value)}
                        placeholder="Edexcel Easy Admin"
                      />
                    </Field>
                    <Field label="Email">
                      <Input
                        type="email"
                        value={newAdminEmail}
                        onChange={(event) => setNewAdminEmail(event.target.value)}
                        placeholder="admin@example.com"
                      />
                    </Field>
                    <Field label="Password">
                      <Input
                        type="password"
                        value={newAdminPassword}
                        onChange={(event) => setNewAdminPassword(event.target.value)}
                        placeholder="Minimum 8 characters"
                      />
                    </Field>
                    <Button
                      type="button"
                      onClick={createAdminUser}
                      disabled={!newAdminEmail || newAdminPassword.length < 8 || loading}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                      Create Admin
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle>Admin Accounts</CardTitle>
                      <Button type="button" variant="outline" size="sm" onClick={loadAdmins} disabled={loading}>
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {admins.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No admin accounts found.</p>
                    ) : (
                      admins.map((admin) => (
                        <div key={admin.id} className="rounded-lg border bg-background p-3">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {admin.display_name || "Unnamed Admin"}
                              </h3>
                              <p className="text-sm text-muted-foreground">{admin.email}</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Last login: {formatDate(admin.last_login_at)}
                              </p>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                admin.active
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {admin.active ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );

  function setFormField<K extends keyof ContentForm>(key: K, value: ContentForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {children}
  </div>
);

function toPayload(form: ContentForm) {
  let metadata: Record<string, unknown> = {};
  try {
    metadata = form.metadata.trim() ? JSON.parse(form.metadata) : {};
  } catch {
    throw new Error("Metadata must be valid JSON.");
  }

  return {
    type: form.type,
    slug: form.slug,
    title: form.title,
    subtitle: emptyToNull(form.subtitle),
    summary: emptyToNull(form.summary),
    body: emptyToNull(form.body),
    curriculum: emptyToNull(form.curriculum),
    subject: emptyToNull(form.subject),
    unit: emptyToNull(form.unit),
    exam_session: emptyToNull(form.exam_session),
    paper_code: emptyToNull(form.paper_code),
    sort_order: Number(form.sort_order || 0),
    published: form.published,
    metadata,
  };
}

function emptyToNull(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function formatDate(value: string | null) {
  if (!value) return "Never";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

export default Admin;
