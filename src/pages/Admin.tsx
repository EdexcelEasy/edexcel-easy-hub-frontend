import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Database,
  Edit,
  FileText,
  ChevronDown,
  ChevronRight,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
const CUSTOM_CURRICULA_STORAGE_KEY = "admin_custom_curricula";
const HIDDEN_CURRICULA_STORAGE_KEY = "admin_hidden_curricula";
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
  "past-paper-curriculum",
  "past-paper-subject",
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
  { id: "past-papers", label: "Past Papers", Icon: FileText },
  { id: "admins", label: "Admins", Icon: Users },
] as const;

const examMonthOptions = [
  { value: "jan", label: "Jan" },
  { value: "jun", label: "Jun" },
  { value: "nov", label: "Nov" },
];

const examVariantOptions = [
  { value: "standard", label: "Standard" },
  { value: "r", label: "Regional R" },
];

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
  const [pendingDeleteAdmin, setPendingDeleteAdmin] = useState<AdminUser | null>(null);
  const [items, setItems] = useState<SiteContent[]>([]);
  const [form, setForm] = useState<ContentForm>(emptyForm);
  const [editingContentId, setEditingContentId] = useState("");
  const [selectedContentId, setSelectedContentId] = useState("");
  const [fileType, setFileType] = useState("asset");
  const [bucket, setBucket] = useState("site-assets");
  const [folder, setFolder] = useState("uploads");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [collapsedPastPaperCurricula, setCollapsedPastPaperCurricula] = useState<Record<string, boolean>>({});
  const [collapsedPastPaperSubjects, setCollapsedPastPaperSubjects] = useState<Record<string, boolean>>({});
  const [newCurriculumTitle, setNewCurriculumTitle] = useState("");
  const [newCurriculumSlug, setNewCurriculumSlug] = useState("");
  const [newSubjectTitle, setNewSubjectTitle] = useState("");
  const [newSubjectCurriculum, setNewSubjectCurriculum] = useState("igcse");
  const [editingSubjectSlug, setEditingSubjectSlug] = useState("");
  const [customCurricula, setCustomCurricula] = useState<{ title: string; slug: string }[]>(() => (
    readJsonFromStorage(CUSTOM_CURRICULA_STORAGE_KEY, [])
  ));
  const [hiddenCurricula, setHiddenCurricula] = useState<string[]>(() => (
    readJsonFromStorage(HIDDEN_CURRICULA_STORAGE_KEY, [])
  ));
  const [editingCurriculumSlug, setEditingCurriculumSlug] = useState("");

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedContentId),
    [items, selectedContentId],
  );
  const pastPaperItems = useMemo(
    () => items.filter((item) => item.type === "past-paper"),
    [items],
  );
  const pastPaperCurriculumItems = useMemo(
    () => items.filter((item) => item.type === "past-paper-curriculum"),
    [items],
  );
  const pastPaperSubjectItems = useMemo(
    () => items.filter((item) => item.type === "past-paper-subject"),
    [items],
  );
  const groupedPastPapers = useMemo(() => groupPastPapers(pastPaperItems), [pastPaperItems]);
  const curriculumOptions = useMemo(
    () => getCurriculumOptions(pastPaperItems, pastPaperCurriculumItems, customCurricula, hiddenCurricula),
    [customCurricula, hiddenCurricula, pastPaperCurriculumItems, pastPaperItems],
  );
  const paperStructureSubjectOptions = useMemo(
    () => getSubjectOptions(pastPaperItems, pastPaperSubjectItems, form.curriculum || "igcse"),
    [form.curriculum, pastPaperItems, pastPaperSubjectItems],
  );
  const subjectBuilderOptions = useMemo(
    () => getSubjectOptions(pastPaperItems, pastPaperSubjectItems, newSubjectCurriculum || form.curriculum || "igcse"),
    [form.curriculum, newSubjectCurriculum, pastPaperItems, pastPaperSubjectItems],
  );
  const paperUnitOptions = useMemo(() => getPaperUnitOptions(form.curriculum, form.unit), [form.curriculum, form.unit]);
  const sessionParts = parseSessionParts(
    form.exam_session,
    `${getMetadataField("year_folder")} ${getMetadataField("exam_year")} ${getMetadataField("exam_month")} ${getMetadataField("exam_variant")}`,
  );

  useEffect(() => {
    if (token) localStorage.setItem("admin_api_token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem(CUSTOM_CURRICULA_STORAGE_KEY, JSON.stringify(customCurricula));
  }, [customCurricula]);

  useEffect(() => {
    localStorage.setItem(HIDDEN_CURRICULA_STORAGE_KEY, JSON.stringify(hiddenCurricula));
  }, [hiddenCurricula]);

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

  const deleteAdminUser = async (admin: AdminUser) => {
    if (admin.email === currentAdmin) {
      setError("You cannot delete your own admin account while logged in.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await request(`/api/admin/users/${admin.id}`, { method: "DELETE" });
      setStatus(`Admin "${admin.email}" deleted.`);
      setPendingDeleteAdmin(null);
      await loadAdmins();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete admin.");
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
    const section = activeSection === "past-papers" ? "past-papers" : "content";
    setForm(section === "past-papers" ? { ...emptyForm, type: "past-paper", curriculum: "igcse" } : emptyForm);
    setEditingContentId("");
    setSelectedContentId("");
    setActiveSection(section);
    setStatus("Ready for a new item.");
  };

  const editItem = (item: SiteContent) => {
    setEditingContentId(item.id);
    setSelectedContentId(item.id);
    setForm(contentToForm(item));
    setActiveSection(item.type === "past-paper" ? "past-papers" : "content");
    setStatus(`Editing "${item.title}".`);
  };

  const deleteItem = async (item: SiteContent) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setLoading(true);
    setError("");
    try {
      await request(`/api/admin/content/${item.id}`, { method: "DELETE" });
      setStatus("Content deleted.");
      if (editingContentId === item.id || selectedContentId === item.id) resetForm();
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
      const editingId = form.id || editingContentId;
      const path = editingId ? `/api/admin/content/${editingId}` : "/api/admin/content";
      const method = editingId ? "PUT" : "POST";
      const result = await request(path, {
        method,
        body: JSON.stringify(payload),
      });

      if (form.type === "past-paper" && !editingId) {
        setStatus(result.updatedExisting ? "Existing past paper updated. Ready for another paper." : "Past paper created. Ready for another paper.");
        setEditingContentId("");
        setSelectedContentId("");
        setForm(createNextPastPaperForm(form));
      } else {
        setStatus(editingId ? "Content updated." : "Content created.");
        setEditingContentId(result.data.id);
        setSelectedContentId(result.data.id);
        setForm(contentToForm(result.data));
      }
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
                onClick={() => openSection(id)}
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
                {activeSection === "subject-resources" && "Create resources, files, and links for each subject."}
                {activeSection === "past-papers" && "Create and manage past paper records by curriculum, subject, session, and paper code."}
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

            {(activeSection === "content" || activeSection === "past-papers") && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeSection === "past-papers"
                      ? form.id
                        ? "Edit Past Paper"
                        : "Create Past Paper"
                      : form.id
                      ? "Edit Content"
                      : "Create Content"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
              {activeSection !== "past-papers" && (
                <>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="Type">
                      <Select
                        value={form.type}
                        onValueChange={(value) => setFormField("type", value)}
                      >
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
                </>
              )}

              {activeSection === "past-papers" && (
                <div className="space-y-4 rounded-lg border bg-background p-4">
                  <div>
                    <h3 className="text-sm font-bold text-primary">Curriculum Builder</h3>
                    <p className="text-xs text-muted-foreground">Add a curriculum option, then choose it in Paper Structure.</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                    <Field label="Curriculum Name">
                      <Input
                        value={newCurriculumTitle}
                        onChange={(event) => {
                          setNewCurriculumTitle(event.target.value);
                          setNewCurriculumSlug(slugifyText(event.target.value));
                        }}
                        placeholder="A Level"
                      />
                    </Field>
	                    <div className="flex items-end">
	                      <Button type="button" onClick={() => void addCurriculumOption()} disabled={!newCurriculumTitle.trim()}>
	                        {editingCurriculumSlug ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
	                        {editingCurriculumSlug ? "Update" : "Add"}
	                      </Button>
                      {editingCurriculumSlug && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingCurriculumSlug("");
                            setNewCurriculumTitle("");
                            setNewCurriculumSlug("");
                          }}
                        >
                          Cancel
                        </Button>
                      )}
	                    </div>
	                  </div>
                  <div className="space-y-2">
                    {curriculumOptions.map((curriculum) => {
                      const isCustom = customCurricula.some((item) => item.slug === curriculum.slug);
                      const isUsed = pastPaperItems.some((item) => slugifyText(item.curriculum || "") === curriculum.slug);
                      const deleteReason = isUsed
                        ? "Used by saved papers"
                        : "";
                      return (
                        <div key={curriculum.slug} className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-secondary/30 px-3 py-2">
                          <div>
                            <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                              {curriculum.title}
                              {deleteReason && (
                                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                  {deleteReason}
                                </span>
                              )}
                            </p>
                            <p className="text-xs text-muted-foreground">{curriculum.slug}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button type="button" size="icon" variant="ghost" onClick={() => editCurriculumOption(curriculum)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() => void deleteCurriculumOption(curriculum.slug)}
                              title={deleteReason || "Delete curriculum"}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
	                </div>
	              )}

              {activeSection === "past-papers" && (
                <div className="space-y-4 rounded-lg border bg-background p-4">
                  <div>
                    <h3 className="text-sm font-bold text-primary">Subject Builder</h3>
                    <p className="text-xs text-muted-foreground">Add subjects under a curriculum, then choose them in Paper Structure.</p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                    <Field label="Curriculum">
                      <Select
                        value={newSubjectCurriculum || form.curriculum || "igcse"}
                        onValueChange={(value) => setNewSubjectCurriculum(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose curriculum" />
                        </SelectTrigger>
                        <SelectContent>
                          {curriculumOptions.map((curriculum) => (
                            <SelectItem key={curriculum.slug} value={curriculum.slug}>
                              {curriculum.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Subject Name">
                      <Input
                        value={newSubjectTitle}
                        onChange={(event) => setNewSubjectTitle(event.target.value)}
                        placeholder="Physics"
                      />
                    </Field>
                    <div className="flex items-end gap-2">
                      <Button type="button" onClick={() => void addSubjectOption()} disabled={!newSubjectTitle.trim()}>
                        {editingSubjectSlug ? <Save className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {editingSubjectSlug ? "Update" : "Add"}
                      </Button>
                      {editingSubjectSlug && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingSubjectSlug("");
                            setNewSubjectTitle("");
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {subjectBuilderOptions.length === 0 ? (
                      <p className="rounded-md border border-dashed bg-secondary/20 px-3 py-2 text-sm text-muted-foreground">
                        No subjects added for this curriculum yet.
                      </p>
                    ) : (
                      subjectBuilderOptions.map((subject) => {
                        const isUsed = pastPaperItems.some((item) => (
                          slugifyText(item.curriculum || "") === subject.curriculum
                          && slugifyText(item.subject || "") === subject.slug
                        ));
                        const deleteReason = isUsed ? "Used by saved papers" : "";
                        return (
                          <div key={`${subject.curriculum}-${subject.slug}`} className="flex flex-wrap items-center justify-between gap-2 rounded-md border bg-secondary/30 px-3 py-2">
                            <div>
                              <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                                {subject.title}
                                {deleteReason && (
                                  <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                    {deleteReason}
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">{subject.slug}</p>
                            </div>
                            <div className="flex gap-1">
                              <Button type="button" size="icon" variant="ghost" onClick={() => editSubjectOption(subject)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => void deleteSubjectOption(subject)}
                                title={deleteReason || "Delete subject"}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {activeSection === "past-papers" && (
                <div className="space-y-4 rounded-lg border bg-secondary/20 p-4">
                  <div>
                    <h3 className="text-sm font-bold text-primary">Paper Structure</h3>
                    <p className="text-xs text-muted-foreground">Build each subject, paper or unit, and exam session exactly as it should appear on the frontend.</p>
                  </div>

                  <div className="space-y-3 rounded-lg border bg-white p-4">
                    <h4 className="text-sm font-semibold text-primary">Subject</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Curriculum">
                        <Select value={form.curriculum || "igcse"} onValueChange={(value) => setPaperStructureCurriculum(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose curriculum" />
                          </SelectTrigger>
                          <SelectContent>
                            {curriculumOptions.map((curriculum) => (
                              <SelectItem key={curriculum.slug} value={curriculum.slug}>
                                {curriculum.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Subject Name">
                        <Select value={form.subject || undefined} onValueChange={(value) => setFormField("subject", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {paperStructureSubjectOptions.map((subject) => (
                              <SelectItem key={`${subject.curriculum}-${subject.slug}`} value={subject.slug}>
                                {subject.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg border bg-white p-4">
                    <h4 className="text-sm font-semibold text-primary">Paper or Unit</h4>
                    <div className="grid gap-4">
                      <Field label="Paper / Unit Name">
                        <Select value={form.unit || undefined} onValueChange={(value) => setPaperName(value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose paper or unit" />
                          </SelectTrigger>
                          <SelectContent>
                            {paperUnitOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg border bg-white p-4">
                    <h4 className="text-sm font-semibold text-primary">Year & Month</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Field label="Year">
                        <Input
                          value={sessionParts.year}
                          onChange={(event) => setSessionPart("year", event.target.value)}
                          placeholder="2024"
                          inputMode="numeric"
                        />
                      </Field>
                      <Field label="Month">
                        <Select value={sessionParts.month || "jun"} onValueChange={(value) => setSessionPart("month", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose month" />
                          </SelectTrigger>
                          <SelectContent>
                            {examMonthOptions.map((month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field label="Variant">
                        <Select value={sessionParts.variant || "standard"} onValueChange={(value) => setSessionPart("variant", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose variant" />
                          </SelectTrigger>
                          <SelectContent>
                            {examVariantOptions.map((variant) => (
                              <SelectItem key={variant.value} value={variant.value}>
                                {variant.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Exam Session">
                        <Input value={form.exam_session} readOnly placeholder="2024 - Jun" />
                      </Field>
                      <Field label="Year Folder">
                        <Input value={getMetadataField("year_folder")} readOnly placeholder="2024-jun" />
                      </Field>
                    </div>
                  </div>

                  <div className="space-y-3 rounded-lg border bg-white p-4">
                    <h4 className="text-sm font-semibold text-primary">Links</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label="Question Paper URL">
                      <Input
                          value={getMetadataField("qp_url")}
                          onChange={(event) => setMetadataField("qp_url", event.target.value)}
                          placeholder="https://..."
                      />
                      </Field>
                      <Field label="Mark Scheme URL">
                        <Input
                          value={getMetadataField("ms_url")}
                          onChange={(event) => setMetadataField("ms_url", event.target.value)}
                          placeholder="https://..."
                        />
                      </Field>
                      <Field label="Data File URL">
                        <Input
                          value={getMetadataField("data_url")}
                          onChange={(event) => setMetadataField("data_url", event.target.value)}
                          placeholder="Optional"
                        />
                      </Field>
                      <Field label="Video URL">
                        <Input
                          value={getMetadataField("video_url")}
                          onChange={(event) => setMetadataField("video_url", event.target.value)}
                          placeholder="Optional"
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              )}

              {activeSection !== "past-papers" && (
                <>
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
                </>
              )}

              {activeSection !== "past-papers" && (
                <Field label="Metadata JSON">
                  <Textarea
                    value={form.metadata}
                    onChange={(event) => setFormField("metadata", event.target.value)}
                    className="font-mono text-xs"
                  />
                </Field>
              )}

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

            {activeSection === "past-papers" && (
              <Card>
                <CardHeader>
                  <CardTitle>Past Paper Records</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pastPaperItems.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No past papers yet.</p>
                  ) : (
                    groupedPastPapers.map((curriculumGroup) => {
                      const curriculumCollapsed = collapsedPastPaperCurricula[curriculumGroup.curriculum] ?? true;
                      return (
                      <div key={curriculumGroup.curriculum} className="rounded-lg border bg-background p-4">
                        <button
                          type="button"
                          className="flex w-full flex-wrap items-center justify-between gap-2 border-b pb-3 text-left"
                          onClick={() => togglePastPaperCurriculum(curriculumGroup.curriculum)}
                        >
                          <span className="flex items-center gap-2 text-lg font-bold text-primary">
                            {curriculumCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            {formatCurriculumLabel(curriculumGroup.curriculum)}
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            {curriculumGroup.total} paper{curriculumGroup.total === 1 ? "" : "s"}
                          </span>
                        </button>

                        {!curriculumCollapsed && (
                        <div className="mt-4 space-y-4">
                          {curriculumGroup.subjects.map((subjectGroup) => (
                            <div key={`${curriculumGroup.curriculum}-${subjectGroup.subject}`} className="rounded-md border bg-secondary/30 p-3">
                              <button
                                type="button"
                                className="flex w-full flex-wrap items-center justify-between gap-2 text-left"
                                onClick={() => togglePastPaperSubject(curriculumGroup.curriculum, subjectGroup.subject)}
                              >
                                <span className="flex items-center gap-2 font-semibold text-foreground">
                                  {(collapsedPastPaperSubjects[getPastPaperSubjectKey(curriculumGroup.curriculum, subjectGroup.subject)] ?? true)
                                    ? <ChevronRight className="h-4 w-4" />
                                    : <ChevronDown className="h-4 w-4" />}
                                  {formatSubjectLabel(subjectGroup.subject)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {subjectGroup.items.length} record{subjectGroup.items.length === 1 ? "" : "s"}
                                </span>
                              </button>

                              {!(collapsedPastPaperSubjects[getPastPaperSubjectKey(curriculumGroup.curriculum, subjectGroup.subject)] ?? true) && (
                              <div className="mt-3 space-y-2">
                                {subjectGroup.items.map((item) => (
                                  <div key={item.id} className="rounded-md border bg-background p-3">
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <h5 className="font-semibold text-foreground">{item.title}</h5>
                                        <p className="text-xs text-muted-foreground">{item.slug}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                          {[item.exam_session, item.paper_code].filter(Boolean).join(" • ") || "No paper details"}
                                        </p>
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
                                ))}
                              </div>
                              )}
                            </div>
                          ))}
                        </div>
                        )}
                      </div>
                      );
                    })
                  )}
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
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                  admin.active
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {admin.active ? "Active" : "Inactive"}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => setPendingDeleteAdmin(admin)}
                                disabled={loading || admin.email === currentAdmin}
                                title={
                                  admin.email === currentAdmin
                                    ? "You cannot delete your own admin account"
                                    : `Delete ${admin.email}`
                                }
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
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
      <AlertDialog
        open={Boolean(pendingDeleteAdmin)}
        onOpenChange={(open) => {
          if (!open && !loading) setPendingDeleteAdmin(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Admin Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove {pendingDeleteAdmin?.email || "this admin"} from the admin dashboard.
              They will no longer be able to sign in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={loading || !pendingDeleteAdmin}
              onClick={(event) => {
                event.preventDefault();
                if (pendingDeleteAdmin) void deleteAdminUser(pendingDeleteAdmin);
              }}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete Admin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );

  function setFormField<K extends keyof ContentForm>(key: K, value: ContentForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function setMetadataField(key: string, value: string) {
    setForm((current) => {
      let metadata: Record<string, unknown> = {};
      try {
        metadata = current.metadata.trim() ? JSON.parse(current.metadata) : {};
      } catch {
        metadata = {};
      }
      return {
        ...current,
        metadata: JSON.stringify({ ...metadata, [key]: value }, null, 2),
      };
    });
  }

  function getMetadataField(key: string) {
    try {
      const metadata = form.metadata.trim() ? JSON.parse(form.metadata) : {};
      return typeof metadata[key] === "string" ? metadata[key] : "";
    } catch {
      return "";
    }
  }

  function setPaperName(value: string) {
    setForm((current) => {
      const metadata = parseMetadataJson(current.metadata);
      return {
        ...current,
        unit: value,
        paper_code: slugifyText(value),
        metadata: JSON.stringify({ ...metadata, paper_label: value }, null, 2),
      };
    });
  }

  function setSessionPart(key: "year" | "month" | "variant", value: string) {
    setForm((current) => {
      const metadata = parseMetadataJson(current.metadata);
      const parts = parseSessionParts(
        current.exam_session,
        `${String(metadata.year_folder || "")} ${String(metadata.exam_year || "")} ${String(metadata.exam_month || "")} ${String(metadata.exam_variant || "")}`,
      );
      const nextParts = {
        year: parts.year,
        month: parts.month || "jun",
        variant: parts.variant || "standard",
        [key]: key === "year" ? value.replace(/\D/g, "").slice(0, 4) : value,
      };
      const examSession = buildExamSession(nextParts.year, nextParts.month, nextParts.variant);
      const yearFolder = buildYearFolder(nextParts.year, nextParts.month, nextParts.variant);

      return {
        ...current,
        exam_session: examSession,
        metadata: JSON.stringify({
          ...metadata,
          exam_year: nextParts.year,
          year_folder: yearFolder,
          exam_month: nextParts.month,
          exam_variant: nextParts.variant,
        }, null, 2),
      };
    });
  }

  function setPaperStructureCurriculum(value: string) {
    const nextSubjectOptions = getSubjectOptions(pastPaperItems, pastPaperSubjectItems, value);
    setForm((current) => {
      const currentSubject = slugifyText(current.subject);
      const subjectStillExists = nextSubjectOptions.some((subject) => subject.slug === currentSubject);
      return {
        ...current,
        curriculum: value,
        subject: subjectStillExists ? currentSubject : "",
      };
    });
    setNewSubjectCurriculum(value);
  }

  function togglePastPaperCurriculum(curriculum: string) {
    setCollapsedPastPaperCurricula((current) => ({ ...current, [curriculum]: !(current[curriculum] ?? true) }));
  }

  function togglePastPaperSubject(curriculum: string, subject: string) {
    const key = getPastPaperSubjectKey(curriculum, subject);
    setCollapsedPastPaperSubjects((current) => ({ ...current, [key]: !(current[key] ?? true) }));
  }

  async function addCurriculumOption() {
    const slug = slugifyText(newCurriculumTitle);
    const title = newCurriculumTitle.trim() || formatCurriculumLabel(slug);
    if (!slug) return;
    const oldSlug = editingCurriculumSlug;

    setLoading(true);
    setError("");
    try {
      const conflict = curriculumOptions.some((curriculum) => (
        curriculum.slug === slug && curriculum.slug !== oldSlug
      ));
      if (conflict) {
        throw new Error("A curriculum with this name already exists.");
      }

      const existing = pastPaperCurriculumItems.find((item) => (
        item.slug === oldSlug
        || slugifyText(item.curriculum || "") === oldSlug
        || item.slug === slug
        || slugifyText(item.curriculum || "") === slug
      ));
      const payload = {
        type: "past-paper-curriculum",
        slug,
        title,
        curriculum: slug,
        published: true,
        sort_order: 0,
        metadata: {},
      };

      await request(existing ? `/api/admin/content/${existing.id}` : "/api/admin/content", {
        method: existing ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      if (oldSlug && oldSlug !== slug) {
        const papersToMove = pastPaperItems.filter((item) => slugifyText(item.curriculum || "") === oldSlug);
        await Promise.all(
          papersToMove.map((item) => request(`/api/admin/content/${item.id}`, {
            method: "PUT",
            body: JSON.stringify(toPayload({
              ...contentToForm(item),
              curriculum: slug,
              slug: "",
              title: "",
            })),
          })),
        );
      }

      setCustomCurricula((current) => {
        const withoutEditing = oldSlug
          ? current.filter((curriculum) => curriculum.slug !== oldSlug)
          : current;
        const exists = withoutEditing.some((curriculum) => curriculum.slug === slug);
        return exists ? withoutEditing : [...withoutEditing, { title, slug }];
      });
      if (oldSlug && form.curriculum === oldSlug) {
        setFormField("curriculum", slug);
      }
      setHiddenCurricula((current) => current.filter((curriculum) => curriculum !== slug && curriculum !== oldSlug));
      setFormField("curriculum", slug);
      setEditingCurriculumSlug("");
      setNewCurriculumTitle("");
      setNewCurriculumSlug("");
      setStatus(`Curriculum "${title}" saved.`);
      await loadContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save curriculum.");
    } finally {
      setLoading(false);
    }
  }

  function editCurriculumOption(curriculum: { title: string; slug: string }) {
    setEditingCurriculumSlug(curriculum.slug);
    setNewCurriculumTitle(curriculum.title);
    setNewCurriculumSlug(curriculum.slug);
  }

  async function deleteCurriculumOption(slug: string) {
    const isCustom = customCurricula.some((curriculum) => curriculum.slug === slug);
    const isUsed = pastPaperItems.some((item) => slugifyText(item.curriculum || "") === slug);
    if (isUsed) {
      setError("This curriculum has saved past papers. Move or delete those papers first.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const existing = pastPaperCurriculumItems.find((item) => item.slug === slug || slugifyText(item.curriculum || "") === slug);
      if (existing) {
        await request(`/api/admin/content/${existing.id}`, { method: "DELETE" });
      }

      if (isCustom) {
        setCustomCurricula((current) => current.filter((curriculum) => curriculum.slug !== slug));
      } else {
        setHiddenCurricula((current) => current.includes(slug) ? current : [...current, slug]);
      }
      if (form.curriculum === slug) {
        const nextCurriculum = curriculumOptions.find((curriculum) => curriculum.slug !== slug)?.slug || "";
        setFormField("curriculum", nextCurriculum);
      }
      if (editingCurriculumSlug === slug) {
        setEditingCurriculumSlug("");
        setNewCurriculumTitle("");
        setNewCurriculumSlug("");
      }
      setStatus("Curriculum deleted.");
      await loadContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete curriculum.");
    } finally {
      setLoading(false);
    }
  }

  async function addSubjectOption() {
    const curriculum = slugifyText(newSubjectCurriculum || form.curriculum || "igcse");
    const slug = slugifyText(newSubjectTitle);
    const title = newSubjectTitle.trim() || formatSubjectLabel(slug);
    if (!curriculum || !slug) return;
    const oldSlug = editingSubjectSlug;

    setLoading(true);
    setError("");
    try {
      const conflict = getSubjectOptions(pastPaperItems, pastPaperSubjectItems, curriculum).some((subject) => (
        subject.slug === slug && subject.slug !== oldSlug
      ));
      if (conflict) {
        throw new Error("A subject with this name already exists in this curriculum.");
      }

      const existing = pastPaperSubjectItems.find((item) => {
        const itemCurriculum = slugifyText(item.curriculum || "");
        const itemSubject = slugifyText(item.subject || item.slug || "");
        return itemCurriculum === curriculum && (itemSubject === oldSlug || itemSubject === slug);
      });
      const payload = {
        type: "past-paper-subject",
        slug: `${curriculum}-${slug}`,
        title,
        curriculum,
        subject: slug,
        published: true,
        sort_order: 0,
        metadata: {},
      };

      await request(existing ? `/api/admin/content/${existing.id}` : "/api/admin/content", {
        method: existing ? "PUT" : "POST",
        body: JSON.stringify(payload),
      });

      if (oldSlug && oldSlug !== slug) {
        const papersToMove = pastPaperItems.filter((item) => (
          slugifyText(item.curriculum || "") === curriculum
          && slugifyText(item.subject || "") === oldSlug
        ));
        await Promise.all(
          papersToMove.map((item) => request(`/api/admin/content/${item.id}`, {
            method: "PUT",
            body: JSON.stringify(toPayload({
              ...contentToForm(item),
              subject: slug,
              slug: "",
              title: "",
            })),
          })),
        );
      }

      if (slugifyText(form.curriculum) === curriculum && (!form.subject || form.subject === oldSlug)) {
        setFormField("subject", slug);
      }
      setEditingSubjectSlug("");
      setNewSubjectTitle("");
      setStatus(`Subject "${title}" saved.`);
      await loadContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save subject.");
    } finally {
      setLoading(false);
    }
  }

  function editSubjectOption(subject: { title: string; slug: string; curriculum: string }) {
    setEditingSubjectSlug(subject.slug);
    setNewSubjectTitle(subject.title);
    setNewSubjectCurriculum(subject.curriculum);
  }

  async function deleteSubjectOption(subject: { title: string; slug: string; curriculum: string }) {
    const isUsed = pastPaperItems.some((item) => (
      slugifyText(item.curriculum || "") === subject.curriculum
      && slugifyText(item.subject || "") === subject.slug
    ));
    if (isUsed) {
      setError("This subject has saved past papers. Move or delete those papers first.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const existing = pastPaperSubjectItems.find((item) => (
        slugifyText(item.curriculum || "") === subject.curriculum
        && slugifyText(item.subject || item.slug || "") === subject.slug
      ));
      if (existing) {
        await request(`/api/admin/content/${existing.id}`, { method: "DELETE" });
      }

      if (form.curriculum === subject.curriculum && form.subject === subject.slug) {
        const nextSubject = subjectBuilderOptions.find((item) => item.slug !== subject.slug)?.slug || "";
        setFormField("subject", nextSubject);
      }
      if (editingSubjectSlug === subject.slug && newSubjectCurriculum === subject.curriculum) {
        setEditingSubjectSlug("");
        setNewSubjectTitle("");
      }
      setStatus("Subject deleted.");
      await loadContent();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete subject.");
    } finally {
      setLoading(false);
    }
  }

  function openSection(section: AdminSection) {
    setActiveSection(section);
    if (section === "past-papers") {
      setCollapsedPastPaperCurricula({});
      setCollapsedPastPaperSubjects({});
      setForm((current) => current.id && current.type === "past-paper" ? current : { ...emptyForm, type: "past-paper", curriculum: "igcse" });
      setEditingContentId((current) => form.type === "past-paper" ? current : "");
    }
  }
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {children}
  </div>
);

function contentToForm(item: SiteContent): ContentForm {
  return {
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
  };
}

function createNextPastPaperForm(current: ContentForm): ContentForm {
  const metadata = parseMetadataJson(current.metadata);
  const nextMetadata = {
    year_folder: metadata.year_folder || "",
    exam_year: metadata.exam_year || "",
    exam_month: metadata.exam_month || "jun",
    exam_variant: metadata.exam_variant || "standard",
  };

  return {
    ...emptyForm,
    type: "past-paper",
    curriculum: current.curriculum || "igcse",
    subject: current.subject,
    exam_session: current.exam_session,
    published: true,
    metadata: JSON.stringify(nextMetadata, null, 2),
  };
}

function toPayload(form: ContentForm) {
  let metadata: Record<string, unknown>;
  try {
    metadata = parseMetadataJson(form.metadata);
  } catch {
    throw new Error("Metadata must be valid JSON.");
  }

  if (form.type === "past-paper") {
    const curriculum = slugifyText(form.curriculum || "igcse");
    const subject = slugifyText(form.subject);
    const paperCode = form.paper_code.trim() || derivePaperCode(form.unit);
    const yearFolder = String(metadata.year_folder || sessionToYearFolder(form.exam_session)).trim();
    const paperLabel = form.unit.trim() || String(metadata.paper_label || "").trim() || formatPaperCode(paperCode);
    metadata = {
      ...metadata,
      year_folder: yearFolder,
      paper_label: paperLabel,
    };
    form = {
      ...form,
      curriculum,
      subject,
      unit: paperLabel,
      paper_code: paperCode,
    };
  }

  const isPastPaper = form.type === "past-paper";
  const slug = isPastPaper
    ? slugifyText(`${form.curriculum}-${form.subject}-${metadata.year_folder || form.exam_session}-${form.paper_code}`)
    : form.slug;
  const title = isPastPaper
    ? `${form.curriculum.toUpperCase()} ${formatSubjectName(form.subject)} ${form.exam_session} ${formatPaperCode(form.paper_code)}`.trim()
    : form.title;

  return {
    type: form.type,
    slug,
    title,
    subtitle: isPastPaper ? null : emptyToNull(form.subtitle),
    summary: isPastPaper ? null : emptyToNull(form.summary),
    body: isPastPaper ? null : emptyToNull(form.body),
    curriculum: emptyToNull(form.curriculum),
    subject: emptyToNull(form.subject),
    unit: emptyToNull(form.unit),
    exam_session: emptyToNull(form.exam_session),
    paper_code: emptyToNull(form.paper_code),
    sort_order: isPastPaper ? 0 : Number(form.sort_order || 0),
    published: form.published,
    metadata,
  };
}

function slugifyText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sessionToYearFolder(value: string) {
  const normalized = value.toLowerCase();
  const year = normalized.match(/\b(20\d{2})\b/)?.[1] || "";
  const month = normalized.includes("jan")
    ? "jan"
    : normalized.includes("jun")
    ? "jun"
    : normalized.includes("nov")
    ? "nov"
    : "";
  const variant = /\br\b/.test(normalized) ? "-r" : "";
  return year && month ? `${year}-${month}${variant}` : "";
}

function formatPaperCode(value: string) {
  const paperMatch = value.match(/^paper-?(\d+)$/i);
  if (paperMatch) return `Paper ${paperMatch[1]}`;
  const unitMatch = value.match(/^unit-?(\d+)$/i);
  if (unitMatch) return `Unit ${unitMatch[1]}`;
  return value;
}

function derivePaperCode(unit: string) {
  return slugifyText(unit);
}

function parseMetadataJson(value: string) {
  return value.trim() ? JSON.parse(value) as Record<string, unknown> : {};
}

function parseSessionParts(examSession = "", yearFolder = "") {
  const source = `${examSession} ${yearFolder}`.toLowerCase();
  const year = source.match(/\b(20\d{0,2}|\d{1,4})\b/)?.[1] || "";
  const month = source.includes("jan")
    ? "jan"
    : source.includes("jun")
    ? "jun"
    : source.includes("nov")
    ? "nov"
    : "";
  const variant = /\br\b/.test(source) || /-r\b/.test(source) ? "r" : "standard";

  return { year, month, variant };
}

function buildExamSession(year: string, month: string, variant: string) {
  const monthLabel = getMonthLabel(month);
  if (year.length !== 4 || !monthLabel) return "";
  return variant === "r" ? `${year} - ${monthLabel} - R` : `${year} - ${monthLabel}`;
}

function buildYearFolder(year: string, month: string, variant: string) {
  if (year.length !== 4 || !month) return "";
  return variant === "r" ? `${year}-${month}-r` : `${year}-${month}`;
}

function getMonthLabel(value: string) {
  return examMonthOptions.find((month) => month.value === value)?.label || "";
}

function formatSubjectName(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function groupPastPapers(items: SiteContent[]) {
  const curriculumMap = new Map<string, Map<string, SiteContent[]>>();

  for (const item of items) {
    const curriculum = item.curriculum || "uncategorized";
    const subject = item.subject || "uncategorized";
    if (!curriculumMap.has(curriculum)) curriculumMap.set(curriculum, new Map());
    const subjectMap = curriculumMap.get(curriculum)!;
    if (!subjectMap.has(subject)) subjectMap.set(subject, []);
    subjectMap.get(subject)!.push(item);
  }

  return Array.from(curriculumMap.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([curriculum, subjectMap]) => {
      const subjects = Array.from(subjectMap.entries())
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([subject, subjectItems]) => ({
          subject,
          items: subjectItems.sort(comparePastPapers),
        }));

      return {
        curriculum,
        subjects,
        total: subjects.reduce((sum, subject) => sum + subject.items.length, 0),
      };
    });
}

function comparePastPapers(left: SiteContent, right: SiteContent) {
  return (
    (right.exam_session || "").localeCompare(left.exam_session || "")
    || (left.paper_code || "").localeCompare(right.paper_code || "")
    || left.title.localeCompare(right.title)
  );
}

function formatCurriculumLabel(value: string) {
  if (value === "uncategorized") return "Uncategorized";
  if (value === "igcse") return "IGCSE";
  if (value === "ial") return "IAL";
  if (value === "igcse-modular") return "IGCSE Modular";
  return value.toUpperCase();
}

function formatSubjectLabel(value: string) {
  if (value === "uncategorized") return "Uncategorized";
  return formatSubjectName(value);
}

function getCurriculumOptions(
  pastPaperItems: SiteContent[],
  pastPaperCurriculumItems: SiteContent[],
  customCurricula: { title: string; slug: string }[],
  hiddenCurricula: string[],
) {
  const options = new Map<string, { title: string; slug: string }>([
    ["igcse", { title: "IGCSE", slug: "igcse" }],
    ["ial", { title: "IAL", slug: "ial" }],
    ["igcse-modular", { title: "IGCSE Modular", slug: "igcse-modular" }],
  ]);

  for (const slug of hiddenCurricula) {
    options.delete(slug);
  }

  for (const item of pastPaperItems) {
    const slug = slugifyText(item.curriculum || "");
    if (slug && !options.has(slug)) {
      options.set(slug, { title: formatCurriculumLabel(slug), slug });
    }
  }

  for (const item of pastPaperCurriculumItems) {
    const slug = slugifyText(item.curriculum || item.slug || "");
    if (slug && !options.has(slug)) {
      options.set(slug, { title: item.title || formatCurriculumLabel(slug), slug });
    }
  }

  for (const curriculum of customCurricula) {
    if (!options.has(curriculum.slug)) options.set(curriculum.slug, curriculum);
  }

  return Array.from(options.values()).sort((left, right) => left.title.localeCompare(right.title));
}

function getSubjectOptions(
  pastPaperItems: SiteContent[],
  pastPaperSubjectItems: SiteContent[],
  curriculum: string,
) {
  const curriculumSlug = slugifyText(curriculum || "igcse");
  const options = new Map<string, { title: string; slug: string; curriculum: string }>();

  for (const item of pastPaperItems) {
    if (slugifyText(item.curriculum || "") !== curriculumSlug) continue;
    const slug = slugifyText(item.subject || "");
    if (slug && !options.has(slug)) {
      options.set(slug, {
        title: formatSubjectLabel(slug),
        slug,
        curriculum: curriculumSlug,
      });
    }
  }

  for (const item of pastPaperSubjectItems) {
    if (slugifyText(item.curriculum || "") !== curriculumSlug) continue;
    const slug = slugifyText(item.subject || "");
    if (slug && !options.has(slug)) {
      options.set(slug, {
        title: item.title || formatSubjectLabel(slug),
        slug,
        curriculum: curriculumSlug,
      });
    }
  }

  return Array.from(options.values()).sort((left, right) => left.title.localeCompare(right.title));
}

function getPaperUnitOptions(curriculum: string, currentValue: string) {
  const options = ["Paper 1", "Paper 2", "Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"];

  const trimmedCurrent = currentValue.trim();
  return trimmedCurrent && !options.includes(trimmedCurrent)
    ? [...options, trimmedCurrent]
    : options;
}

function getPastPaperSubjectKey(curriculum: string, subject: string) {
  return `${curriculum}:${subject}`;
}

function readJsonFromStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
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
