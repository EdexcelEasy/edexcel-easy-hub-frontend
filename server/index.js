import http from "node:http";
import { Buffer } from "node:buffer";
import crypto from "node:crypto";
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

loadEnv();

const PORT = Number(process.env.PORT || 3001);
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN;
const ADMIN_SETUP_PASSWORD = process.env.ADMIN_SETUP_PASSWORD || ADMIN_API_TOKEN;
const PUBLIC_ORIGIN = process.env.PUBLIC_ORIGIN || "*";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const PASSWORD_ITERATIONS = 210000;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !ADMIN_API_TOKEN) {
  throw new Error(
    "Missing SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, or ADMIN_API_TOKEN. See .env.example.",
  );
}

class NoopWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = NoopWebSocket.CLOSED;

  addEventListener() {}
  removeEventListener() {}
  close() {}
  send() {
    throw new Error("Realtime is disabled for the admin API.");
  }
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  realtime: {
    transport: NoopWebSocket,
  },
});

const server = http.createServer(async (req, res) => {
  try {
    setCorsHeaders(req, res);

    if (req.method === "OPTIONS") {
      return sendJson(res, 204);
    }

    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const pathname = stripTrailingSlash(url.pathname);

    if (req.method === "GET" && pathname === "/favicon.ico") {
      return sendFile(res, "public/favicon.ico", "image/x-icon");
    }

    if (req.method === "GET" && pathname === "/") {
      return sendJson(res, 200, {
        ok: true,
        name: "Edexcel Easy Admin API",
        routes: ["/health", "/api/content", "/api/content/:type/:slug"],
      });
    }

    if (req.method === "GET" && pathname === "/health") {
      return sendJson(res, 200, { ok: true });
    }

    if (req.method === "GET" && pathname === "/api/content") {
      return await listContent(req, res, url);
    }

    if (req.method === "GET" && pathname.startsWith("/api/content/")) {
      return await getContentBySlug(req, res, pathname);
    }

    if (req.method === "GET" && pathname === "/api/subjects/categories") {
      return await listSubjectCategories(req, res);
    }

    if (req.method === "GET" && pathname.startsWith("/api/subjects/categories/")) {
      return await getSubjectCategory(req, res, pathname);
    }

    if (req.method === "GET" && pathname.startsWith("/api/subjects/")) {
      return await getSubjectDetail(req, res, pathname);
    }

    if (req.method === "GET" && pathname.startsWith("/api/subject-resources/")) {
      return await getSubjectResources(req, res, pathname);
    }

    if (req.method === "POST" && pathname === "/api/admin/login") {
      return await loginAdmin(req, res);
    }

    if (req.method === "POST" && pathname === "/api/admin/bootstrap") {
      return await bootstrapAdmin(req, res);
    }

    if (pathname.startsWith("/api/admin/")) {
      await requireAdmin(req);
    }

    if (req.method === "GET" && pathname === "/api/admin/users") {
      return await listAdminUsers(req, res);
    }

    if (req.method === "POST" && pathname === "/api/admin/users") {
      return await createAdminUser(req, res);
    }

    if (req.method === "GET" && pathname === "/api/admin/subject-data") {
      return await getSubjectAdminData(req, res);
    }

    if (req.method === "POST" && pathname === "/api/admin/subject-categories") {
      return await createSubjectCategory(req, res);
    }

    if (req.method === "PUT" && pathname.startsWith("/api/admin/subject-categories/")) {
      return await updateSubjectCategory(req, res, pathname);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/admin/subject-categories/")) {
      return await deleteSubjectCategory(req, res, pathname);
    }

    if (req.method === "POST" && pathname === "/api/admin/subjects") {
      return await createSubject(req, res);
    }

    if (req.method === "PUT" && pathname.startsWith("/api/admin/subjects/")) {
      return await updateSubject(req, res, pathname);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/admin/subjects/")) {
      return await deleteSubject(req, res, pathname);
    }

    if (req.method === "POST" && pathname === "/api/admin/subject-units") {
      return await createSubjectUnit(req, res);
    }

    if (req.method === "PUT" && pathname.startsWith("/api/admin/subject-units/")) {
      return await updateSubjectUnit(req, res, pathname);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/admin/subject-units/")) {
      return await deleteSubjectUnit(req, res, pathname);
    }

    if (req.method === "POST" && pathname === "/api/admin/subject-topics") {
      return await createSubjectTopic(req, res);
    }

    if (req.method === "PUT" && pathname.startsWith("/api/admin/subject-topics/")) {
      return await updateSubjectTopic(req, res, pathname);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/admin/subject-topics/")) {
      return await deleteSubjectTopic(req, res, pathname);
    }

    if (req.method === "POST" && pathname === "/api/admin/subject-resources") {
      return await createSubjectResource(req, res);
    }

    if (req.method === "PUT" && pathname.startsWith("/api/admin/subject-resources/")) {
      return await updateSubjectResource(req, res, pathname);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/admin/subject-resources/")) {
      return await deleteSubjectResource(req, res, pathname);
    }

    if (req.method === "POST" && pathname === "/api/admin/subject-resource-items") {
      return await createSubjectResourceItem(req, res);
    }

    if (req.method === "PUT" && pathname.startsWith("/api/admin/subject-resource-items/")) {
      return await updateSubjectResourceItem(req, res, pathname);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/admin/subject-resource-items/")) {
      return await deleteSubjectResourceItem(req, res, pathname);
    }

    if (req.method === "POST" && pathname === "/api/admin/content") {
      return await createContent(req, res);
    }

    if (req.method === "PUT" && pathname.startsWith("/api/admin/content/")) {
      return await updateContent(req, res, pathname);
    }

    if (req.method === "DELETE" && pathname.startsWith("/api/admin/content/")) {
      return await deleteContent(req, res, pathname);
    }

    if (req.method === "POST" && pathname === "/api/admin/upload") {
      return await uploadFile(req, res);
    }

    if (req.method === "POST" && pathname.match(/^\/api\/admin\/content\/[^/]+\/files$/)) {
      return await uploadContentFile(req, res, pathname);
    }

    return sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    const status = error.statusCode || 500;
    return sendJson(res, status, { error: formatError(error) });
  }
});

server.listen(PORT, () => {
  console.log(`Admin API running on http://localhost:${PORT}`);
});

async function listContent(req, res, url) {
  const type = url.searchParams.get("type");
  const curriculum = url.searchParams.get("curriculum");
  const subject = url.searchParams.get("subject");
  const includeDrafts = url.searchParams.get("includeDrafts") === "true";
  if (includeDrafts) await requireAdmin(req);

  let query = supabase
    .from("site_content")
    .select("*, content_files(*)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (type) query = query.eq("type", type);
  if (curriculum) query = query.eq("curriculum", curriculum);
  if (subject) query = query.eq("subject", subject);
  if (!includeDrafts) query = query.eq("published", true);

  const { data, error } = await query;
  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function getContentBySlug(_req, res, pathname) {
  const [, , , type, slug] = pathname.split("/");
  if (!type || !slug) {
    return sendJson(res, 400, { error: "Use /api/content/:type/:slug" });
  }

  const { data, error } = await supabase
    .from("site_content")
    .select("*, content_files(*)")
    .eq("type", decodeURIComponent(type))
    .eq("slug", decodeURIComponent(slug))
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return sendJson(res, 404, { error: "Content not found" });
  return sendJson(res, 200, { data });
}

async function listSubjectCategories(_req, res) {
  const { data, error } = await supabase
    .from("subject_categories")
    .select("*, subjects(id,title,slug,description,logo_url,sort_order,published)")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return sendJson(res, 200, { data: sortSubjectTree(data || []) });
}

async function getSubjectCategory(_req, res, pathname) {
  const slug = decodeURIComponent(pathname.split("/").pop() || "");
  const { data, error } = await supabase
    .from("subject_categories")
    .select("*, subjects(id,title,slug,description,logo_url,sort_order,published)")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return sendJson(res, 404, { error: "Subject category not found" });

  data.subjects = (data.subjects || [])
    .filter((subject) => subject.published)
    .sort(bySortOrderThenTitle);
  return sendJson(res, 200, { data });
}

async function getSubjectDetail(_req, res, pathname) {
  const slug = decodeURIComponent(pathname.split("/").pop() || "");
  const { data, error } = await supabase
    .from("subjects")
    .select(
      "*, subject_categories(id,title,slug,description,kicker), subject_units(id,title,sort_order,subject_topics(id,title,sort_order))",
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (error) throw error;
  if (!data || !data.subject_categories?.slug) {
    return sendJson(res, 404, { error: "Subject not found" });
  }

  data.subject_units = (data.subject_units || []).sort(bySortOrderThenTitle).map((unit) => ({
    ...unit,
    subject_topics: (unit.subject_topics || []).sort(bySortOrderThenTitle),
  }));
  return sendJson(res, 200, { data });
}

async function getSubjectResources(_req, res, pathname) {
  const parts = pathname.split("/").map(decodeURIComponent);
  const subjectSlug = parts[3];
  const resourceSlug = parts[4];

  if (!subjectSlug) return sendJson(res, 400, { error: "Subject slug is required" });

  const subjectQuery = supabase
    .from("subjects")
    .select("id,title,slug,subject_categories(title,slug)")
    .eq("slug", subjectSlug)
    .eq("published", true)
    .maybeSingle();

  const { data: subject, error: subjectError } = await subjectQuery;
  if (subjectError) throw subjectError;
  if (!subject) return sendJson(res, 404, { error: "Subject not found" });

  let query = supabase
    .from("subject_resources")
    .select("*, subject_resource_items(*)")
    .eq("subject_id", subject.id)
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (resourceSlug) query = query.eq("slug", resourceSlug);

  const { data, error } = await query;
  if (error) throw error;

  const resources = (data || []).map((resource) => ({
    ...resource,
    subject_resource_items: (resource.subject_resource_items || [])
      .filter((item) => item.published)
      .sort(bySortOrderThenTitle),
  }));

  if (resourceSlug && resources.length === 0) {
    return sendJson(res, 404, { error: "Resource not found" });
  }

  return sendJson(res, 200, {
    data: resourceSlug ? resources[0] : resources,
    subject,
  });
}

async function createContent(req, res) {
  const body = await readJson(req);
  const payload = sanitizeContentPayload(body);

  const { data, error } = await supabase
    .from("site_content")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function loginAdmin(req, res) {
  const body = await readJson(req);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const { data: admin, error } = await supabase
    .from("admin_users")
    .select("id,email,password_hash,display_name,active")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  if (!admin || !admin.active || !(await verifyPassword(password, admin.password_hash))) {
    const authError = new Error("Invalid email or password");
    authError.statusCode = 401;
    throw authError;
  }

  await supabase
    .from("admin_users")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", admin.id);

  return sendJson(res, 200, {
    token: signAdminSession({
      id: admin.id,
      email: admin.email,
      display_name: admin.display_name,
    }),
    user: {
      id: admin.id,
      email: admin.email,
      display_name: admin.display_name,
    },
  });
}

async function bootstrapAdmin(req, res) {
  const body = await readJson(req);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const setupPassword = String(body.setup_password || "");
  const displayName = String(body.display_name || "").trim() || null;

  if (!email || !password || !setupPassword) {
    const error = new Error("Email, password, and setup password are required");
    error.statusCode = 400;
    throw error;
  }

  requireSetupPassword(setupPassword);

  if (password.length < 8) {
    const error = new Error("Password must be at least 8 characters");
    error.statusCode = 400;
    throw error;
  }

  const { count, error: countError } = await supabase
    .from("admin_users")
    .select("id", { count: "exact", head: true });

  if (countError) throw countError;
  if (count && count > 0) {
    const error = new Error("Admin profile already exists");
    error.statusCode = 409;
    throw error;
  }

  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      email,
      display_name: displayName,
      password_hash: await hashPassword(password),
    })
    .select("id,email,display_name,active,created_at")
    .single();

  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function listAdminUsers(_req, res) {
  const { data, error } = await supabase
    .from("admin_users")
    .select("id,email,display_name,active,last_login_at,created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function createAdminUser(req, res) {
  const body = await readJson(req);
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const displayName = String(body.display_name || "").trim() || null;

  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  if (password.length < 8) {
    const error = new Error("Password must be at least 8 characters");
    error.statusCode = 400;
    throw error;
  }

  const { data, error } = await supabase
    .from("admin_users")
    .insert({
      email,
      display_name: displayName,
      password_hash: await hashPassword(password),
      active: body.active !== false,
    })
    .select("id,email,display_name,active,last_login_at,created_at")
    .single();

  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function getSubjectAdminData(_req, res) {
  const { data: categories, error: categoryError } = await supabase
    .from("subject_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (categoryError) throw categoryError;

  const { data: subjects, error: subjectError } = await supabase
    .from("subjects")
    .select("*, subject_categories(id,title,slug)")
    .order("sort_order", { ascending: true });
  if (subjectError) throw subjectError;

  const { data: units, error: unitError } = await supabase
    .from("subject_units")
    .select("*, subjects(id,title,slug)")
    .order("sort_order", { ascending: true });
  if (unitError) throw unitError;

  const { data: topics, error: topicError } = await supabase
    .from("subject_topics")
    .select("*, subject_units(id,title,subject_id)")
    .order("sort_order", { ascending: true });
  if (topicError) throw topicError;

  const { data: resources, error: resourceError } = await supabase
    .from("subject_resources")
    .select("*, subjects(id,title,slug)")
    .order("sort_order", { ascending: true });
  if (resourceError) throw resourceError;

  const { data: resourceItems, error: resourceItemError } = await supabase
    .from("subject_resource_items")
    .select("*, subject_resources(id,title,subject_id)")
    .order("sort_order", { ascending: true });
  if (resourceItemError) throw resourceItemError;

  return sendJson(res, 200, {
    data: {
      categories: categories || [],
      subjects: subjects || [],
      units: units || [],
      topics: topics || [],
      resources: resources || [],
      resourceItems: resourceItems || [],
    },
  });
}

async function createSubjectCategory(req, res) {
  const body = await readJson(req);
  const payload = sanitizeSubjectCategoryPayload(body);

  const { data, error } = await supabase
    .from("subject_categories")
    .insert(payload)
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function updateSubjectCategory(req, res, pathname) {
  const id = pathname.split("/").pop();
  const body = await readJson(req);
  const payload = sanitizeSubjectCategoryPayload(body, { partial: true });

  const { data, error } = await supabase
    .from("subject_categories")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function deleteSubjectCategory(_req, res, pathname) {
  const id = pathname.split("/").pop();
  const { error } = await supabase.from("subject_categories").delete().eq("id", id);
  if (error) throw error;
  return sendJson(res, 200, { ok: true });
}

async function createSubject(req, res) {
  const body = await readJson(req);
  const payload = sanitizeSubjectPayload(body);

  const { data, error } = await supabase.from("subjects").insert(payload).select("*").single();
  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function updateSubject(req, res, pathname) {
  const id = pathname.split("/").pop();
  const body = await readJson(req);
  const payload = sanitizeSubjectPayload(body, { partial: true });

  const { data, error } = await supabase
    .from("subjects")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function deleteSubject(_req, res, pathname) {
  const id = pathname.split("/").pop();
  const { error } = await supabase.from("subjects").delete().eq("id", id);
  if (error) throw error;
  return sendJson(res, 200, { ok: true });
}

async function createSubjectUnit(req, res) {
  const body = await readJson(req);
  const payload = sanitizeSubjectUnitPayload(body);

  const { data, error } = await supabase.from("subject_units").insert(payload).select("*").single();
  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function updateSubjectUnit(req, res, pathname) {
  const id = pathname.split("/").pop();
  const body = await readJson(req);
  const payload = sanitizeSubjectUnitPayload(body, { partial: true });

  const { data, error } = await supabase
    .from("subject_units")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function deleteSubjectUnit(_req, res, pathname) {
  const id = pathname.split("/").pop();
  const { error } = await supabase.from("subject_units").delete().eq("id", id);
  if (error) throw error;
  return sendJson(res, 200, { ok: true });
}

async function createSubjectTopic(req, res) {
  const body = await readJson(req);
  const payload = sanitizeSubjectTopicPayload(body);

  const { data, error } = await supabase.from("subject_topics").insert(payload).select("*").single();
  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function updateSubjectTopic(req, res, pathname) {
  const id = pathname.split("/").pop();
  const body = await readJson(req);
  const payload = sanitizeSubjectTopicPayload(body, { partial: true });

  const { data, error } = await supabase
    .from("subject_topics")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function deleteSubjectTopic(_req, res, pathname) {
  const id = pathname.split("/").pop();
  const { error } = await supabase.from("subject_topics").delete().eq("id", id);
  if (error) throw error;
  return sendJson(res, 200, { ok: true });
}

async function createSubjectResource(req, res) {
  const body = await readJson(req);
  const payload = sanitizeSubjectResourcePayload(body);

  const { data, error } = await supabase
    .from("subject_resources")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function updateSubjectResource(req, res, pathname) {
  const id = pathname.split("/").pop();
  const body = await readJson(req);
  const payload = sanitizeSubjectResourcePayload(body, { partial: true });

  const { data, error } = await supabase
    .from("subject_resources")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function deleteSubjectResource(_req, res, pathname) {
  const id = pathname.split("/").pop();
  const { error } = await supabase.from("subject_resources").delete().eq("id", id);
  if (error) throw error;
  return sendJson(res, 200, { ok: true });
}

async function createSubjectResourceItem(req, res) {
  const body = await readJson(req);
  const payload = sanitizeSubjectResourceItemPayload(body);

  const { data, error } = await supabase
    .from("subject_resource_items")
    .insert(payload)
    .select("*")
    .single();
  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function updateSubjectResourceItem(req, res, pathname) {
  const id = pathname.split("/").pop();
  const body = await readJson(req);
  const payload = sanitizeSubjectResourceItemPayload(body, { partial: true });

  const { data, error } = await supabase
    .from("subject_resource_items")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function deleteSubjectResourceItem(_req, res, pathname) {
  const id = pathname.split("/").pop();
  const { error } = await supabase.from("subject_resource_items").delete().eq("id", id);
  if (error) throw error;
  return sendJson(res, 200, { ok: true });
}

async function updateContent(req, res, pathname) {
  const id = pathname.split("/").pop();
  const body = await readJson(req);
  const payload = sanitizeContentPayload(body, { partial: true });

  const { data, error } = await supabase
    .from("site_content")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 200, { data });
}

async function deleteContent(_req, res, pathname) {
  const id = pathname.split("/").pop();
  const { error } = await supabase.from("site_content").delete().eq("id", id);
  if (error) throw error;
  return sendJson(res, 200, { ok: true });
}

async function uploadContentFile(req, res, pathname) {
  const contentId = pathname.split("/")[4];
  const body = await readJson(req, { limitBytes: 60 * 1024 * 1024 });
  const result = await uploadToStorage(body);

  const { data, error } = await supabase
    .from("content_files")
    .insert({
      content_id: contentId,
      bucket: result.bucket,
      path: result.path,
      public_url: result.publicUrl,
      label: body.label || body.fileName || null,
      file_type: body.fileType || null,
      mime_type: body.contentType,
      size_bytes: result.sizeBytes,
      sort_order: Number(body.sortOrder || 0),
      metadata: body.metadata || {},
    })
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function uploadFile(req, res) {
  const body = await readJson(req, { limitBytes: 60 * 1024 * 1024 });
  const result = await uploadToStorage(body);

  const { data, error } = await supabase
    .from("content_files")
    .insert({
      bucket: result.bucket,
      path: result.path,
      public_url: result.publicUrl,
      label: body.label || body.fileName || null,
      file_type: body.fileType || null,
      mime_type: body.contentType,
      size_bytes: result.sizeBytes,
      sort_order: Number(body.sortOrder || 0),
      metadata: body.metadata || {},
    })
    .select("*")
    .single();

  if (error) throw error;
  return sendJson(res, 201, { data });
}

async function uploadToStorage(body) {
  const bucket = body.bucket || "site-documents";
  const fileName = body.fileName || "upload";
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
  const folder = body.folder ? `${String(body.folder).replace(/^\/|\/$/g, "")}/` : "";
  const path = body.path || `${folder}${Date.now()}-${safeName}`;
  const contentType = body.contentType || "application/octet-stream";

  if (!body.base64) {
    const error = new Error("base64 is required");
    error.statusCode = 400;
    throw error;
  }

  const fileBuffer = Buffer.from(stripDataUrlPrefix(body.base64), "base64");
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, fileBuffer, {
      contentType,
      upsert: body.upsert === true,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return {
    bucket,
    path,
    publicUrl: data.publicUrl,
    sizeBytes: fileBuffer.byteLength,
  };
}

function sanitizeContentPayload(body, options = {}) {
  const fields = [
    "type",
    "slug",
    "title",
    "subtitle",
    "summary",
    "body",
    "curriculum",
    "subject",
    "unit",
    "exam_session",
    "paper_code",
    "sort_order",
    "published",
    "metadata",
  ];

  const payload = {};
  for (const field of fields) {
    if (body[field] !== undefined) payload[field] = body[field];
  }

  if (!options.partial) {
    for (const field of ["type", "slug", "title"]) {
      if (!payload[field]) {
        const error = new Error(`${field} is required`);
        error.statusCode = 400;
        throw error;
      }
    }
  }

  if (payload.sort_order !== undefined) payload.sort_order = Number(payload.sort_order);
  if (payload.metadata === undefined) payload.metadata = {};
  return payload;
}

function sanitizeSubjectCategoryPayload(body, options = {}) {
  const payload = pickPayload(body, ["title", "slug", "description", "kicker", "sort_order", "published"]);
  if (!options.partial) payload.title = requireString(payload.title, "Title");
  if (payload.title !== undefined) payload.title = requireString(payload.title, "Title");
  if (payload.slug !== undefined || (!options.partial && payload.title)) {
    payload.slug = slugify(payload.slug || payload.title);
  }
  if (payload.description !== undefined) payload.description = optionalString(payload.description);
  if (payload.kicker !== undefined) payload.kicker = optionalString(payload.kicker);
  if (payload.sort_order !== undefined) payload.sort_order = Number(payload.sort_order || 0);
  if (payload.published !== undefined) payload.published = payload.published !== false;
  return payload;
}

function sanitizeSubjectPayload(body, options = {}) {
  const payload = pickPayload(body, [
    "category_id",
    "title",
    "slug",
    "description",
    "logo_url",
    "heading",
    "subheading",
    "resources_text",
    "sort_order",
    "published",
  ]);
  if (!options.partial) {
    payload.category_id = requireString(payload.category_id, "Category");
    payload.title = requireString(payload.title, "Title");
  }
  if (payload.category_id !== undefined) payload.category_id = requireString(payload.category_id, "Category");
  if (payload.title !== undefined) payload.title = requireString(payload.title, "Title");
  if (payload.slug !== undefined || (!options.partial && payload.title)) {
    payload.slug = slugify(payload.slug || payload.title);
  }
  for (const field of ["description", "logo_url", "heading", "subheading", "resources_text"]) {
    if (payload[field] !== undefined) payload[field] = optionalString(payload[field]);
  }
  if (payload.sort_order !== undefined) payload.sort_order = Number(payload.sort_order || 0);
  if (payload.published !== undefined) payload.published = payload.published !== false;
  return payload;
}

function sanitizeSubjectUnitPayload(body, options = {}) {
  const payload = pickPayload(body, ["subject_id", "title", "sort_order"]);
  if (!options.partial) {
    payload.subject_id = requireString(payload.subject_id, "Subject");
    payload.title = requireString(payload.title, "Unit title");
  }
  if (payload.subject_id !== undefined) payload.subject_id = requireString(payload.subject_id, "Subject");
  if (payload.title !== undefined) payload.title = requireString(payload.title, "Unit title");
  if (payload.sort_order !== undefined) payload.sort_order = Number(payload.sort_order || 0);
  return payload;
}

function sanitizeSubjectTopicPayload(body, options = {}) {
  const payload = pickPayload(body, ["unit_id", "title", "sort_order"]);
  if (!options.partial) {
    payload.unit_id = requireString(payload.unit_id, "Unit");
    payload.title = requireString(payload.title, "Topic title");
  }
  if (payload.unit_id !== undefined) payload.unit_id = requireString(payload.unit_id, "Unit");
  if (payload.title !== undefined) payload.title = requireString(payload.title, "Topic title");
  if (payload.sort_order !== undefined) payload.sort_order = Number(payload.sort_order || 0);
  return payload;
}

function sanitizeSubjectResourcePayload(body, options = {}) {
  const payload = pickPayload(body, [
    "subject_id",
    "title",
    "slug",
    "description",
    "icon",
    "color",
    "access_type",
    "status",
    "sort_order",
    "published",
  ]);
  if (!options.partial) {
    payload.subject_id = requireString(payload.subject_id, "Subject");
    payload.title = requireString(payload.title, "Resource title");
  }
  if (payload.subject_id !== undefined) payload.subject_id = requireString(payload.subject_id, "Subject");
  if (payload.title !== undefined) payload.title = requireString(payload.title, "Resource title");
  if (payload.slug !== undefined || (!options.partial && payload.title)) {
    payload.slug = slugify(payload.slug || payload.title);
  }
  if (payload.description !== undefined) payload.description = optionalString(payload.description);
  if (payload.icon !== undefined) payload.icon = optionalString(payload.icon) || "file";
  if (payload.color !== undefined) payload.color = optionalString(payload.color) || "blue";
  if (payload.access_type !== undefined) payload.access_type = enumValue(payload.access_type, ["free", "paid"], "free");
  if (payload.status !== undefined) payload.status = enumValue(payload.status, ["available", "coming_soon"], "available");
  if (payload.sort_order !== undefined) payload.sort_order = Number(payload.sort_order || 0);
  if (payload.published !== undefined) payload.published = payload.published !== false;
  return payload;
}

function sanitizeSubjectResourceItemPayload(body, options = {}) {
  const payload = pickPayload(body, [
    "resource_id",
    "title",
    "description",
    "url",
    "file_url",
    "file_type",
    "access_type",
    "sort_order",
    "published",
  ]);
  if (!options.partial) {
    payload.resource_id = requireString(payload.resource_id, "Resource");
    payload.title = requireString(payload.title, "Item title");
  }
  if (payload.resource_id !== undefined) payload.resource_id = requireString(payload.resource_id, "Resource");
  if (payload.title !== undefined) payload.title = requireString(payload.title, "Item title");
  for (const field of ["description", "url", "file_url", "file_type"]) {
    if (payload[field] !== undefined) payload[field] = optionalString(payload[field]);
  }
  if (payload.access_type !== undefined) payload.access_type = enumValue(payload.access_type, ["free", "paid"], "free");
  if (payload.sort_order !== undefined) payload.sort_order = Number(payload.sort_order || 0);
  if (payload.published !== undefined) payload.published = payload.published !== false;
  return payload;
}

function enumValue(value, allowed, fallback) {
  const text = String(value || "").trim();
  return allowed.includes(text) ? text : fallback;
}

function pickPayload(body, fields) {
  const payload = {};
  for (const field of fields) {
    if (body[field] !== undefined) payload[field] = body[field];
  }
  return payload;
}

function requireString(value, label) {
  const text = String(value || "").trim();
  if (!text) {
    const error = new Error(`${label} is required`);
    error.statusCode = 400;
    throw error;
  }
  return text;
}

function optionalString(value) {
  const text = String(value || "").trim();
  return text ? text : null;
}

function slugify(value) {
  return requireString(value, "Slug")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sortSubjectTree(categories) {
  return categories.map((category) => ({
    ...category,
    subjects: (category.subjects || [])
      .filter((subject) => subject.published)
      .sort(bySortOrderThenTitle),
  }));
}

function bySortOrderThenTitle(left, right) {
  const sortDiff = Number(left.sort_order || 0) - Number(right.sort_order || 0);
  if (sortDiff !== 0) return sortDiff;
  return String(left.title || "").localeCompare(String(right.title || ""));
}

async function requireAdmin(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token === ADMIN_API_TOKEN) return { type: "api-token" };

  const session = verifyAdminSession(token);
  if (!session) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  return session;
}

function requireSetupPassword(setupPassword) {
  const expected = Buffer.from(ADMIN_SETUP_PASSWORD);
  const actual = Buffer.from(setupPassword);
  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) {
    const error = new Error("Invalid setup password");
    error.statusCode = 401;
    throw error;
  }
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("base64url");
  const hash = await pbkdf2(password, salt, PASSWORD_ITERATIONS);
  return `pbkdf2$${PASSWORD_ITERATIONS}$${salt}$${hash}`;
}

async function verifyPassword(password, storedHash) {
  const [scheme, iterationsValue, salt, expectedHash] = String(storedHash || "").split("$");
  if (scheme !== "pbkdf2" || !iterationsValue || !salt || !expectedHash) return false;

  const actualHash = await pbkdf2(password, salt, Number(iterationsValue));
  const expected = Buffer.from(expectedHash);
  const actual = Buffer.from(actualHash);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function pbkdf2(password, salt, iterations) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, 32, "sha256", (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey.toString("base64url"));
    });
  });
}

function signAdminSession(user) {
  const payload = {
    ...user,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", ADMIN_API_TOKEN)
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

function verifyAdminSession(token) {
  const [encodedPayload, signature] = String(token || "").split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = crypto
    .createHmac("sha256", ADMIN_API_TOKEN)
    .update(encodedPayload)
    .digest("base64url");
  const expected = Buffer.from(expectedSignature);
  const actual = Buffer.from(signature);

  if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

function setCorsHeaders(req, res) {
  const requestOrigin = req.headers.origin;
  const allowedOrigins = new Set([
    PUBLIC_ORIGIN,
    "http://localhost:8080",
    "http://127.0.0.1:8080",
  ]);

  res.setHeader(
    "Access-Control-Allow-Origin",
    requestOrigin && allowedOrigins.has(requestOrigin) ? requestOrigin : PUBLIC_ORIGIN,
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

function sendJson(res, status, payload = null) {
  res.statusCode = status;
  if (status === 204) return res.end();
  res.setHeader("Content-Type", "application/json");
  return res.end(JSON.stringify(payload));
}

function sendFile(res, filePath, contentType) {
  if (!fs.existsSync(filePath)) {
    return sendJson(res, 404, { error: "File not found" });
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", contentType);
  return res.end(fs.readFileSync(filePath));
}

function formatError(error) {
  if (!error) return "Server error";
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  if (error.error_description) return error.error_description;
  if (error.details) return error.details;
  try {
    return JSON.stringify(error);
  } catch {
    return "Server error";
  }
}

function stripTrailingSlash(pathname) {
  return pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
}

function stripDataUrlPrefix(base64) {
  return String(base64).replace(/^data:[^;]+;base64,/, "");
}

function readJson(req, options = {}) {
  const limitBytes = options.limitBytes || 1024 * 1024;

  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        const error = new Error("Request body too large");
        error.statusCode = 413;
        reject(error);
        req.destroy();
        return;
      }
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        const error = new Error("Invalid JSON body");
        error.statusCode = 400;
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function loadEnv() {
  try {
    if (!fs.existsSync(".env")) return;

    const lines = fs.readFileSync(".env", "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const equalIndex = trimmed.indexOf("=");
      if (equalIndex === -1) continue;

      const key = trimmed.slice(0, equalIndex).trim();
      const rawValue = trimmed.slice(equalIndex + 1).trim();
      const value = rawValue.replace(/^['"]|['"]$/g, "");
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // The API can still run with real environment variables.
  }
}
