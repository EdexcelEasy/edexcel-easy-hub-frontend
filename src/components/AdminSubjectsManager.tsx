import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { BookOpen, ChevronDown, ChevronRight, Edit, ImageIcon, Layers3, ListPlus, Plus, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
import { ADMIN_API_URL } from "@/lib/admin-api";

type SubjectCategory = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  kicker?: string | null;
};

type Subject = {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  description: string | null;
  logo_url?: string | null;
  heading?: string | null;
  subheading?: string | null;
  resources_text?: string | null;
  subject_categories?: {
    title: string;
    slug: string;
  };
};

type Unit = {
  id: string;
  title: string;
  subject_id: string;
};

type Topic = {
  id: string;
  title: string;
  unit_id: string;
};

type SubjectResource = {
  id: string;
  subject_id: string;
  title: string;
  slug: string;
  description: string | null;
  icon: string;
  color: string;
  access_type: "free" | "paid";
  status: "available" | "coming_soon";
};

type SubjectResourceItem = {
  id: string;
  resource_id: string;
  title: string;
  description: string | null;
  url: string | null;
  file_url: string | null;
  file_type: string | null;
  access_type: "free" | "paid";
};

type AdminSubjectData = {
  categories: SubjectCategory[];
  subjects: Subject[];
  units: Unit[];
  topics: Topic[];
  resources: SubjectResource[];
  resourceItems: SubjectResourceItem[];
};

type Props = {
  token: string;
  onStatus: (message: string) => void;
  onError: (message: string) => void;
  mode?: "subjects" | "resources";
};

type DeleteTarget = {
  path: string;
  label: string;
  note: string;
} | null;

const AdminSubjectsManager = ({ token, onStatus, onError, mode = "subjects" }: Props) => {
  const resourceMode = mode === "resources";
  const [data, setData] = useState<AdminSubjectData>({ categories: [], subjects: [], units: [], topics: [], resources: [], resourceItems: [] });
  const [editingCategoryId, setEditingCategoryId] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [editingSubjectId, setEditingSubjectId] = useState("");
  const [subjectCategoryId, setSubjectCategoryId] = useState("");
  const [subjectTitle, setSubjectTitle] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectLogoUrl, setSubjectLogoUrl] = useState("");
  const [subjectLogoFile, setSubjectLogoFile] = useState<File | null>(null);
  const [subjectHeading, setSubjectHeading] = useState("");
  const [subjectSubheading, setSubjectSubheading] = useState("");
  const [editingUnitId, setEditingUnitId] = useState("");
  const [unitSubjectId, setUnitSubjectId] = useState("");
  const [unitTitle, setUnitTitle] = useState("");
  const [topicsText, setTopicsText] = useState("");
  const [resourceSubjectId, setResourceSubjectId] = useState("");
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const [resourceIcon, setResourceIcon] = useState("file");
  const [resourceColor, setResourceColor] = useState("blue");
  const [resourceAccessType, setResourceAccessType] = useState<"free" | "paid">("free");
  const [resourceStatus, setResourceStatus] = useState<"available" | "coming_soon">("available");
  const [resourceItemResourceId, setResourceItemResourceId] = useState("");
  const [resourceItemTitle, setResourceItemTitle] = useState("");
  const [resourceItemDescription, setResourceItemDescription] = useState("");
  const [resourceItemUrl, setResourceItemUrl] = useState("");
  const [resourceItemAccessType, setResourceItemAccessType] = useState<"free" | "paid">("free");
  const [resourceItemFile, setResourceItemFile] = useState<File | null>(null);
  const [editingResourceId, setEditingResourceId] = useState("");
  const [editingResourceItemId, setEditingResourceItemId] = useState("");
  const [editingTopicId, setEditingTopicId] = useState("");
  const [editingTopicTitle, setEditingTopicTitle] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});
  const [collapsedSubjects, setCollapsedSubjects] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  const selectedSubjectUnits = useMemo(
    () => data.units.filter((unit) => unit.subject_id === unitSubjectId),
    [data.units, unitSubjectId],
  );

  const selectedResourceLabel = useMemo(() => {
    const resource = data.resources.find((item) => item.id === resourceItemResourceId);
    if (!resource) return "";
    return getResourceLabel(resource, data.subjects, data.categories);
  }, [data.categories, data.resources, data.subjects, resourceItemResourceId]);

  useEffect(() => {
    void loadData();
  }, []);

  const request = async (path: string, options: RequestInit = {}) => {
    const response = await fetch(`${ADMIN_API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Request failed");
    return payload;
  };

  const loadData = async () => {
    setLoading(true);
    onError("");
    try {
      const payload = await request("/api/admin/subject-data");
      setData(payload.data || { categories: [], subjects: [], units: [], topics: [], resources: [], resourceItems: [] });
    } catch (error) {
      onError(error instanceof Error ? error.message : "Could not load subject data.");
    } finally {
      setLoading(false);
    }
  };

  const saveCategory = async () => {
    setLoading(true);
    onError("");
    try {
      await request(editingCategoryId ? `/api/admin/subject-categories/${editingCategoryId}` : "/api/admin/subject-categories", {
        method: editingCategoryId ? "PUT" : "POST",
        body: JSON.stringify({
          title: categoryTitle,
          slug: categoryTitle,
          description: categoryDescription,
        }),
      });
      resetCategoryForm();
      onStatus(editingCategoryId ? "Subject category updated." : "Subject category created.");
      await loadData();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Could not save category.");
    } finally {
      setLoading(false);
    }
  };

  const saveSubject = async () => {
    setLoading(true);
    onError("");
    try {
      const title = subjectTitle;
      const logoUrl = subjectLogoFile ? await uploadSubjectLogo(subjectLogoFile, title) : subjectLogoUrl;
      await request(editingSubjectId ? `/api/admin/subjects/${editingSubjectId}` : "/api/admin/subjects", {
        method: editingSubjectId ? "PUT" : "POST",
        body: JSON.stringify({
          category_id: subjectCategoryId,
          title,
          slug: title,
          description: subjectDescription,
          logo_url: logoUrl,
          heading: subjectHeading || title,
          subheading: subjectSubheading,
        }),
      });
      resetSubjectForm();
      onStatus(editingSubjectId ? "Subject updated." : "Subject created.");
      await loadData();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Could not save subject.");
    } finally {
      setLoading(false);
    }
  };

  const saveUnitWithTopics = async () => {
    setLoading(true);
    onError("");
    try {
      const unitPayload = await request(editingUnitId ? `/api/admin/subject-units/${editingUnitId}` : "/api/admin/subject-units", {
        method: editingUnitId ? "PUT" : "POST",
        body: JSON.stringify({
          subject_id: unitSubjectId,
          title: unitTitle,
          sort_order: selectedSubjectUnits.length,
        }),
      });
      const unitId = editingUnitId || unitPayload.data.id;

      if (editingUnitId) {
        const existingTopics = data.topics.filter((topic) => topic.unit_id === editingUnitId);
        for (const topic of existingTopics) {
          await request(`/api/admin/subject-topics/${topic.id}`, { method: "DELETE" });
        }
      }

      const topics = topicsText
        .split(/\r?\n/)
        .map((topic) => topic.trim())
        .filter(Boolean);

      for (const [index, topic] of topics.entries()) {
        await request("/api/admin/subject-topics", {
          method: "POST",
          body: JSON.stringify({
            unit_id: unitId,
            title: topic,
            sort_order: index,
          }),
        });
      }

      resetUnitForm();
      onStatus(editingUnitId ? "Unit and topics updated." : "Unit and topics created.");
      await loadData();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Could not save unit.");
    } finally {
      setLoading(false);
    }
  };

  const saveResource = async () => {
    setLoading(true);
    onError("");
    try {
      await request(editingResourceId ? `/api/admin/subject-resources/${editingResourceId}` : "/api/admin/subject-resources", {
        method: editingResourceId ? "PUT" : "POST",
        body: JSON.stringify({
          subject_id: resourceSubjectId,
          title: resourceTitle,
          slug: resourceTitle,
          description: resourceDescription,
          icon: resourceIcon,
          color: resourceColor,
          access_type: resourceAccessType,
          status: resourceStatus,
        }),
      });
      resetResourceForm();
      onStatus(editingResourceId ? "Resource updated." : "Resource created.");
      await loadData();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Could not save resource.");
    } finally {
      setLoading(false);
    }
  };

  const saveResourceItem = async () => {
    setLoading(true);
    onError("");
    try {
      const fileUrl = resourceItemFile
        ? await uploadResourceFile(resourceItemFile, resourceItemTitle || "resource")
        : data.resourceItems.find((item) => item.id === editingResourceItemId)?.file_url || "";
      await request(editingResourceItemId ? `/api/admin/subject-resource-items/${editingResourceItemId}` : "/api/admin/subject-resource-items", {
        method: editingResourceItemId ? "PUT" : "POST",
        body: JSON.stringify({
          resource_id: resourceItemResourceId,
          title: resourceItemTitle,
          description: resourceItemDescription,
          url: resourceItemUrl,
          file_url: fileUrl,
          file_type: resourceItemFile?.type || null,
          access_type: resourceItemAccessType,
        }),
      });
      resetResourceItemForm();
      onStatus(editingResourceItemId ? "Resource item updated." : "Resource item created.");
      await loadData();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Could not save resource item.");
    } finally {
      setLoading(false);
    }
  };

  const editCategory = (category: SubjectCategory) => {
    setEditingCategoryId(category.id);
    setCategoryTitle(category.title);
    setCategoryDescription(category.description || "");
  };

  const editSubject = (subject: Subject) => {
    setEditingSubjectId(subject.id);
    setSubjectCategoryId(subject.category_id);
    setSubjectTitle(subject.title);
    setSubjectDescription(subject.description || "");
    setSubjectLogoUrl(subject.logo_url || "");
    setSubjectLogoFile(null);
    setSubjectHeading(subject.heading || "");
    setSubjectSubheading(subject.subheading || "");
  };

  const editUnit = (unit: Unit) => {
    setEditingUnitId(unit.id);
    setUnitSubjectId(unit.subject_id);
    setUnitTitle(unit.title);
    setTopicsText(data.topics.filter((topic) => topic.unit_id === unit.id).map((topic) => topic.title).join("\n"));
  };

  const editTopic = (topic: Topic) => {
    setEditingTopicId(topic.id);
    setEditingTopicTitle(topic.title);
  };

  const editResource = (resource: SubjectResource) => {
    setEditingResourceId(resource.id);
    setResourceSubjectId(resource.subject_id);
    setResourceTitle(resource.title);
    setResourceDescription(resource.description || "");
    setResourceIcon(resource.icon);
    setResourceColor(resource.color);
    setResourceAccessType(resource.access_type);
    setResourceStatus(resource.status);
  };

  const editResourceItem = (item: SubjectResourceItem) => {
    setEditingResourceItemId(item.id);
    setResourceItemResourceId(item.resource_id);
    setResourceItemTitle(item.title);
    setResourceItemDescription(item.description || "");
    setResourceItemUrl(item.url || "");
    setResourceItemAccessType(item.access_type);
    setResourceItemFile(null);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setLoading(true);
    onError("");
    try {
      await request(deleteTarget.path, { method: "DELETE" });
      setDeleteTarget(null);
      onStatus("Deleted.");
      await loadData();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Delete failed.");
    } finally {
      setLoading(false);
    }
  };

  const saveTopicEdit = async () => {
    if (!editingTopicId) return;
    setLoading(true);
    onError("");
    try {
      await request(`/api/admin/subject-topics/${editingTopicId}`, {
        method: "PUT",
        body: JSON.stringify({ title: editingTopicTitle }),
      });
      setEditingTopicId("");
      setEditingTopicTitle("");
      onStatus("Topic updated.");
      await loadData();
    } catch (error) {
      onError(error instanceof Error ? error.message : "Could not update topic.");
    } finally {
      setLoading(false);
    }
  };

  const resetCategoryForm = () => {
    setEditingCategoryId("");
    setCategoryTitle("");
    setCategoryDescription("");
  };

  const resetSubjectForm = () => {
    setEditingSubjectId("");
    setSubjectCategoryId("");
    setSubjectTitle("");
    setSubjectDescription("");
    setSubjectLogoUrl("");
    setSubjectLogoFile(null);
    setSubjectHeading("");
    setSubjectSubheading("");
  };

  const uploadSubjectLogo = async (file: File, subjectName: string) => {
    const base64 = await fileToBase64(file);
    const payload = await request("/api/admin/upload", {
      method: "POST",
      body: JSON.stringify({
        bucket: "site-assets",
        folder: "subject-logos",
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        fileType: "subject-logo",
        label: `${subjectName} logo`,
        base64,
        upsert: true,
      }),
    });
    return payload.data.public_url;
  };

  const uploadResourceFile = async (file: File, label: string) => {
    const base64 = await fileToBase64(file);
    const payload = await request("/api/admin/upload", {
      method: "POST",
      body: JSON.stringify({
        bucket: "site-documents",
        folder: "subject-resources",
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        fileType: "subject-resource",
        label,
        base64,
        upsert: true,
      }),
    });
    return payload.data.public_url;
  };

  const resetUnitForm = () => {
    setEditingUnitId("");
    setUnitSubjectId("");
    setUnitTitle("");
    setTopicsText("");
  };

  const resetResourceForm = () => {
    setEditingResourceId("");
    setResourceSubjectId("");
    setResourceTitle("");
    setResourceDescription("");
    setResourceIcon("file");
    setResourceColor("blue");
    setResourceAccessType("free");
    setResourceStatus("available");
  };

  const resetResourceItemForm = () => {
    setEditingResourceItemId("");
    setResourceItemResourceId("");
    setResourceItemTitle("");
    setResourceItemDescription("");
    setResourceItemUrl("");
    setResourceItemAccessType("free");
    setResourceItemFile(null);
  };

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((current) => ({ ...current, [categoryId]: !current[categoryId] }));
  };

  const toggleSubject = (subjectId: string) => {
    setCollapsedSubjects((current) => ({ ...current, [subjectId]: !current[subjectId] }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-primary">
            {resourceMode ? "Subject Resource Builder" : "Subject Menu Builder"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {resourceMode
              ? "Create free or paid resources and attach files or links for each subject."
              : "Create categories, subjects, units, and subtopics for the public subject pages."}
          </p>
        </div>
        <Button type="button" variant="outline" onClick={loadData} disabled={loading}>
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {!resourceMode && (
      <div className="grid gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers3 className="h-5 w-5" />
              {editingCategoryId ? "Edit Category" : "Category"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdminField label="Title">
              <Input value={categoryTitle} onChange={(event) => setCategoryTitle(event.target.value)} placeholder="IGCSE" />
            </AdminField>
            <AdminField label="Description">
              <Textarea value={categoryDescription} onChange={(event) => setCategoryDescription(event.target.value)} />
            </AdminField>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={saveCategory} disabled={!categoryTitle || loading}>
                {editingCategoryId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingCategoryId ? "Update Category" : "Create Category"}
              </Button>
              {editingCategoryId && (
                <Button type="button" variant="outline" onClick={resetCategoryForm} disabled={loading}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {editingSubjectId ? "Edit Subject" : "Subject"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdminField label="Category">
              <Select value={subjectCategoryId} onValueChange={setSubjectCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  {data.categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AdminField>
            <AdminField label="Subject Name">
              <Input value={subjectTitle} onChange={(event) => setSubjectTitle(event.target.value)} placeholder="Chemistry" />
            </AdminField>
            <AdminField label="Logo">
              <div className="space-y-3">
                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                  onChange={(event) => setSubjectLogoFile(event.target.files?.[0] || null)}
                />
                {(subjectLogoFile || subjectLogoUrl) && (
                  <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border bg-muted">
                      {subjectLogoFile ? (
                        <ImageIcon className="h-5 w-5 text-primary" />
                      ) : (
                        <img src={subjectLogoUrl} alt="" className="h-full w-full object-contain p-1" />
                      )}
                    </div>
                    <div className="min-w-0 text-xs text-muted-foreground">
                      <p className="font-semibold text-primary">
                        {subjectLogoFile ? subjectLogoFile.name : "Current uploaded logo"}
                      </p>
                      <p className="truncate">
                        {subjectLogoFile ? "This file will upload when you save." : subjectLogoUrl}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </AdminField>
            <AdminField label="Description">
              <Textarea value={subjectDescription} onChange={(event) => setSubjectDescription(event.target.value)} />
            </AdminField>
            <AdminField label="Main Heading">
              <Input value={subjectHeading} onChange={(event) => setSubjectHeading(event.target.value)} placeholder="Chemistry" />
            </AdminField>
            <AdminField label="Sub Heading">
              <Textarea value={subjectSubheading} onChange={(event) => setSubjectSubheading(event.target.value)} />
            </AdminField>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={saveSubject} disabled={!subjectCategoryId || !subjectTitle || loading}>
                {editingSubjectId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingSubjectId ? "Update Subject" : "Create Subject"}
              </Button>
              {editingSubjectId && (
                <Button type="button" variant="outline" onClick={resetSubjectForm} disabled={loading}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListPlus className="h-5 w-5" />
              {editingUnitId ? "Edit Unit & Topics" : "Unit & Topics"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdminField label="Subject">
              <Select value={unitSubjectId} onValueChange={setUnitSubjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose subject" />
                </SelectTrigger>
                <SelectContent>
                  {data.subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.subject_categories?.title}: {subject.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AdminField>
            <AdminField label="Unit Name">
              <Input value={unitTitle} onChange={(event) => setUnitTitle(event.target.value)} placeholder="Unit 1: Principles of Chemistry" />
            </AdminField>
            <AdminField label="Subtopics">
              <Textarea
                value={topicsText}
                onChange={(event) => setTopicsText(event.target.value)}
                placeholder={"States of matter\nAtoms\nAtomic structure"}
                className="min-h-36"
              />
            </AdminField>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={saveUnitWithTopics} disabled={!unitSubjectId || !unitTitle || loading}>
                {editingUnitId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingUnitId ? "Update Unit" : "Create Unit"}
              </Button>
              {editingUnitId && (
                <Button type="button" variant="outline" onClick={resetUnitForm} disabled={loading}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      )}

      {resourceMode && (
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {editingResourceId ? "Edit Subject Resource" : "Subject Resource"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdminField label="Subject">
              <Select value={resourceSubjectId} onValueChange={setResourceSubjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose subject" />
                </SelectTrigger>
                <SelectContent>
                  {data.subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.subject_categories?.title}: {subject.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AdminField>
            <AdminField label="Resource Name">
              <Input value={resourceTitle} onChange={(event) => setResourceTitle(event.target.value)} placeholder="Notes" />
            </AdminField>
            <AdminField label="Description">
              <Textarea value={resourceDescription} onChange={(event) => setResourceDescription(event.target.value)} />
            </AdminField>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminField label="Icon">
                <Select value={resourceIcon} onValueChange={setResourceIcon}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="worksheets">Worksheets</SelectItem>
                    <SelectItem value="formula">Formula</SelectItem>
                    <SelectItem value="cheatsheet">Cheatsheet</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                  </SelectContent>
                </Select>
              </AdminField>
              <AdminField label="Color">
                <Select value={resourceColor} onValueChange={setResourceColor}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="amber">Amber</SelectItem>
                  </SelectContent>
                </Select>
              </AdminField>
              <AdminField label="Access">
                <Select value={resourceAccessType} onValueChange={(value: "free" | "paid") => setResourceAccessType(value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </AdminField>
              <AdminField label="Status">
                <Select value={resourceStatus} onValueChange={(value: "available" | "coming_soon") => setResourceStatus(value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="coming_soon">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>
              </AdminField>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={saveResource} disabled={!resourceSubjectId || !resourceTitle || loading}>
                {editingResourceId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingResourceId ? "Update Resource" : "Create Resource"}
              </Button>
              {editingResourceId && <Button type="button" variant="outline" onClick={resetResourceForm}>Cancel</Button>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListPlus className="h-5 w-5" />
              {editingResourceItemId ? "Edit Resource Material" : "Resource Material"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdminField label="Resource">
              <Select value={resourceItemResourceId} onValueChange={setResourceItemResourceId}>
                <SelectTrigger><SelectValue placeholder="Choose resource" /></SelectTrigger>
                <SelectContent>
                  {data.resources.map((resource) => {
                    return (
                      <SelectItem key={resource.id} value={resource.id}>
                        {getResourceLabel(resource, data.subjects, data.categories)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {selectedResourceLabel && (
                <p className="rounded-md border bg-secondary/70 px-3 py-2 text-xs font-semibold text-primary">
                  Selected: {selectedResourceLabel}
                </p>
              )}
            </AdminField>
            <AdminField label="Title">
              <Input value={resourceItemTitle} onChange={(event) => setResourceItemTitle(event.target.value)} placeholder="Chapter 1 Notes" />
            </AdminField>
            <AdminField label="Description">
              <Textarea value={resourceItemDescription} onChange={(event) => setResourceItemDescription(event.target.value)} />
            </AdminField>
            <AdminField label="External Link">
              <Input value={resourceItemUrl} onChange={(event) => setResourceItemUrl(event.target.value)} placeholder="https://..." />
            </AdminField>
            <AdminField label="Upload File">
              <Input type="file" onChange={(event) => setResourceItemFile(event.target.files?.[0] || null)} />
            </AdminField>
            <AdminField label="Access">
              <Select value={resourceItemAccessType} onValueChange={(value: "free" | "paid") => setResourceItemAccessType(value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </AdminField>
            <div className="flex flex-wrap gap-2">
              <Button type="button" onClick={saveResourceItem} disabled={!resourceItemResourceId || !resourceItemTitle || loading}>
                {editingResourceItemId ? <Edit className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingResourceItemId ? "Update Material" : "Create Material"}
              </Button>
              {editingResourceItemId && <Button type="button" variant="outline" onClick={resetResourceItemForm}>Cancel</Button>}
            </div>
          </CardContent>
        </Card>
      </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{resourceMode ? "Current Subject Resources" : "Current Subject Structure"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.categories.map((category) => (
            <div key={category.id} className="rounded-lg border bg-background p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => toggleCategory(category.id)}
                    className="mt-1 h-7 w-7 shrink-0"
                    aria-label={`${collapsedCategories[category.id] ? "Expand" : "Collapse"} ${category.title}`}
                  >
                    {collapsedCategories[category.id] ? (
                      <ChevronRight className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase text-primary">/{category.slug}-subjects</p>
                    <h4 className="font-heading text-lg font-bold text-primary">{category.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <ActionButtons
                  onEdit={() => editCategory(category)}
                  onDelete={() =>
                    setDeleteTarget({
                      path: `/api/admin/subject-categories/${category.id}`,
                      label: category.title,
                      note: "This will delete every subject, unit, and topic inside this category.",
                    })
                  }
                  disabled={loading}
                />
              </div>

              {!collapsedCategories[category.id] && (
              <div className="mt-4 space-y-3">
                {data.subjects
                  .filter((subject) => subject.category_id === category.id)
                  .map((subject) => (
                    <div key={subject.id} className="rounded-lg border bg-secondary/50 p-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex min-w-0 flex-1 items-start gap-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleSubject(subject.id)}
                            className="h-7 w-7 shrink-0"
                            aria-label={`${collapsedSubjects[subject.id] ? "Expand" : "Collapse"} ${subject.title}`}
                          >
                            {collapsedSubjects[subject.id] ? (
                              <ChevronRight className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          <div className="min-w-0">
                            <span className="font-semibold text-primary">{subject.title}</span>
                            <span className="ml-2 text-sm text-muted-foreground">/{subject.slug}</span>
                            <p className="mt-1 text-xs text-muted-foreground">{subject.description}</p>
                          </div>
                        </div>
                        <ActionButtons
                          onEdit={() => editSubject(subject)}
                          onDelete={() =>
                            setDeleteTarget({
                              path: `/api/admin/subjects/${subject.id}`,
                              label: subject.title,
                              note: "This will delete every unit and topic inside this subject.",
                            })
                          }
                          disabled={loading}
                        />
                      </div>

                      {!collapsedSubjects[subject.id] && (
                      <div className="mt-3 space-y-3">
                        {!resourceMode && (
                        <>
                        {data.units
                          .filter((unit) => unit.subject_id === subject.id)
                          .map((unit) => (
                            <div key={unit.id} className="rounded-md border bg-background p-3">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="text-sm font-semibold text-primary">{unit.title}</p>
                                <ActionButtons
                                  onEdit={() => editUnit(unit)}
                                  onDelete={() =>
                                    setDeleteTarget({
                                      path: `/api/admin/subject-units/${unit.id}`,
                                      label: unit.title,
                                      note: "This will delete every topic inside this unit.",
                                    })
                                  }
                                  disabled={loading}
                                />
                              </div>

                              <div className="mt-2 space-y-1">
                                {data.topics
                                  .filter((topic) => topic.unit_id === unit.id)
                                  .map((topic) => (
                                    <div
                                      key={topic.id}
                                      className="flex flex-wrap items-center justify-between gap-2 rounded bg-muted/60 px-3 py-2 text-sm"
                                    >
                                      {editingTopicId === topic.id ? (
                                        <div className="flex flex-1 flex-wrap gap-2">
                                          <Input
                                            value={editingTopicTitle}
                                            onChange={(event) => setEditingTopicTitle(event.target.value)}
                                            className="h-8 min-w-52 flex-1"
                                          />
                                          <Button type="button" size="sm" onClick={saveTopicEdit} disabled={!editingTopicTitle || loading}>
                                            Save
                                          </Button>
                                          <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              setEditingTopicId("");
                                              setEditingTopicTitle("");
                                            }}
                                            disabled={loading}
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      ) : (
                                        <>
                                          <span>{topic.title}</span>
                                          <ActionButtons
                                            onEdit={() => editTopic(topic)}
                                            onDelete={() =>
                                              setDeleteTarget({
                                                path: `/api/admin/subject-topics/${topic.id}`,
                                                label: topic.title,
                                                note: "This will delete this topic only.",
                                              })
                                            }
                                            disabled={loading}
                                            compact
                                          />
                                        </>
                                      )}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </>
                        )}
                        {resourceMode && (
                        <>
                        {data.resources
                          .filter((resource) => resource.subject_id === subject.id)
                          .map((resource) => (
                            <div key={resource.id} className="rounded-md border bg-amber-50/60 p-3">
                              <div className="flex flex-wrap items-start justify-between gap-2">
                                <div>
                                  <p className="text-sm font-semibold text-primary">
                                    {resource.title} <span className="text-xs font-normal text-muted-foreground">/{resource.slug}</span>
                                  </p>
                                  <p className="mt-1 text-xs text-muted-foreground">
                                    {resource.access_type === "paid" ? "Paid" : "Free"} • {resource.status === "coming_soon" ? "Coming Soon" : "Available"}
                                  </p>
                                </div>
                                <ActionButtons
                                  onEdit={() => editResource(resource)}
                                  onDelete={() =>
                                    setDeleteTarget({
                                      path: `/api/admin/subject-resources/${resource.id}`,
                                      label: resource.title,
                                      note: "This will delete every material inside this resource.",
                                    })
                                  }
                                  disabled={loading}
                                />
                              </div>
                              <div className="mt-2 space-y-1">
                                {data.resourceItems
                                  .filter((item) => item.resource_id === resource.id)
                                  .map((item) => (
                                    <div key={item.id} className="flex flex-wrap items-center justify-between gap-2 rounded bg-background px-3 py-2 text-sm">
                                      <span>
                                        {item.title}
                                        <span className="ml-2 text-xs text-muted-foreground">{item.access_type === "paid" ? "Paid" : "Free"}</span>
                                      </span>
                                      <ActionButtons
                                        onEdit={() => editResourceItem(item)}
                                        onDelete={() =>
                                          setDeleteTarget({
                                            path: `/api/admin/subject-resource-items/${item.id}`,
                                            label: item.title,
                                            note: "This will delete this material only.",
                                          })
                                        }
                                        disabled={loading}
                                        compact
                                      />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </>
                        )}
                      </div>
                      )}
                    </div>
                  ))}
              </div>
              )}
            </div>
          ))}
          {data.categories.length === 0 && (
            <p className="rounded-lg border bg-background p-4 text-sm text-muted-foreground">
              No subject categories yet.
            </p>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.label}?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.note} This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
              disabled={loading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

const AdminField = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {children}
  </div>
);

const ActionButtons = ({
  onEdit,
  onDelete,
  disabled,
  compact = false,
}: {
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
  compact?: boolean;
}) => (
  <div className="flex gap-1">
    <Button type="button" size="icon" variant="ghost" onClick={onEdit} disabled={disabled} className={compact ? "h-7 w-7" : ""}>
      <Edit className="h-4 w-4" />
    </Button>
    <Button type="button" size="icon" variant="ghost" onClick={onDelete} disabled={disabled} className={compact ? "h-7 w-7" : ""}>
      <Trash2 className="h-4 w-4 text-red-600" />
    </Button>
  </div>
);

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
    reader.onerror = () => reject(new Error("Could not read logo file."));
    reader.readAsDataURL(file);
  });
}

function getResourceLabel(
  resource: SubjectResource,
  subjects: Subject[],
  categories: SubjectCategory[],
) {
  const subject = subjects.find((item) => item.id === resource.subject_id);
  const category = categories.find((item) => item.id === subject?.category_id);
  return `${category?.title || "Category"} -> ${subject?.title || "Subject"} -> ${resource.title}`;
}

export default AdminSubjectsManager;
