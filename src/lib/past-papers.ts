import { ADMIN_API_URL } from "@/lib/admin-api";

export type PastPaperRecord = {
  id?: string;
  title: string | null;
  slug: string | null;
  curriculum: string | null;
  subject: string | null;
  unit: string | null;
  exam_session: string | null;
  paper_code: string | null;
  metadata?: {
    year_folder?: string | null;
    paper_label?: string | null;
    qp_url?: string | null;
    ms_url?: string | null;
    data_url?: string | null;
    video_url?: string | null;
  } | null;
};

export type PastPaperSubject = {
  name: string;
  slug: string;
};

export type PastPaperUnit = {
  name: string;
  code: string;
};

export type PastPaperCurriculum = {
  title: string;
  slug: string;
};

export function getPastPaperCurriculumPath(curriculum: string) {
  curriculum = normalizeCurriculumSlug(curriculum);
  if (curriculum === "igcse") return "/igcse-past-papers";
  if (curriculum === "igcse-modular") return "/igcse-modular-past-papers";
  if (curriculum === "ial") return "/ial-past-papers";
  return `/past-papers/${curriculum}`;
}

export function getPastPaperSubjectPath(curriculum: string, subject: string) {
  curriculum = normalizeCurriculumSlug(curriculum);
  if (curriculum === "igcse") return `/igcse-past-papers/${subject}`;
  if (curriculum === "igcse-modular") return `/igcse-modular-past-papers/${subject}`;
  if (curriculum === "ial") return `/ial-past-papers/${subject}`;
  return `/past-papers/${curriculum}/${subject}`;
}

export async function fetchPastPapers(curriculum: string, subject?: string) {
  const curriculumSlug = normalizeCurriculumSlug(curriculum);
  const subjectSlug = subject ? slugifyText(subject) : "";
  const response = await fetch(`${ADMIN_API_URL}/api/content?type=past-paper`, { cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Could not load past papers.");
  }

  const records = ((payload.data || []) as PastPaperRecord[]).filter((record) => (
    normalizeCurriculumSlug(record.curriculum || "") === curriculumSlug
    && (subjectSlug ? slugifyText(record.subject || "") === subjectSlug : Boolean(record.subject))
  ));

  return records.sort(comparePastPaperRecords);
}

export async function fetchPastPaperCurricula() {
  const [papersResponse, curriculaResponse] = await Promise.all([
    fetch(`${ADMIN_API_URL}/api/content?type=past-paper`, { cache: "no-store" }),
    fetch(`${ADMIN_API_URL}/api/content?type=past-paper-curriculum`, { cache: "no-store" }),
  ]);
  const papersPayload = await papersResponse.json().catch(() => ({}));
  const curriculaPayload = await curriculaResponse.json().catch(() => ({}));
  if (!papersResponse.ok) {
    throw new Error(papersPayload.error || "Could not load past paper curricula.");
  }
  if (!curriculaResponse.ok) {
    throw new Error(curriculaPayload.error || "Could not load past paper curricula.");
  }

  const curricula = new Map<string, PastPaperCurriculum>();
  for (const record of (curriculaPayload.data || []) as PastPaperRecord[]) {
    const slug = normalizeCurriculumSlug(record.curriculum || record.slug || "");
    if (!slug || curricula.has(slug)) continue;
    curricula.set(slug, {
      slug,
      title: record.title || formatCurriculumName(slug),
    });
  }

  for (const record of (papersPayload.data || []) as PastPaperRecord[]) {
    const slug = normalizeCurriculumSlug(record.curriculum || "");
    if (!slug || curricula.has(slug)) continue;
    curricula.set(slug, {
      slug,
      title: formatCurriculumName(slug),
    });
  }

  return Array.from(curricula.values()).sort((left, right) => left.title.localeCompare(right.title));
}

export async function fetchPastPaperSubjects(curriculum: string) {
  const curriculumSlug = normalizeCurriculumSlug(curriculum);
  const [records, subjectsResponse] = await Promise.all([
    fetchPastPapers(curriculum),
    fetch(`${ADMIN_API_URL}/api/content?type=past-paper-subject`, { cache: "no-store" }),
  ]);
  const subjectsPayload = await subjectsResponse.json().catch(() => ({}));
  if (!subjectsResponse.ok) {
    throw new Error(subjectsPayload.error || "Could not load past paper subjects.");
  }

  const subjects = new Map<string, PastPaperSubject>();

  for (const record of (subjectsPayload.data || []) as PastPaperRecord[]) {
    if (normalizeCurriculumSlug(record.curriculum || "") !== curriculumSlug) continue;
    const slug = slugifyText(record.subject || record.slug || "");
    if (!slug || subjects.has(slug)) continue;
    subjects.set(slug, {
      slug,
      name: record.title || formatSubjectName(record.subject || slug),
    });
  }

  for (const record of records) {
    const slug = slugifyText(record.subject || "");
    if (!slug || subjects.has(slug)) continue;
    subjects.set(slug, {
      slug,
      name: formatSubjectName(record.subject || slug),
    });
  }

  return Array.from(subjects.values()).sort((left, right) => left.name.localeCompare(right.name));
}

export function getPaperUnits(records: PastPaperRecord[]) {
  const units = new Map<string, PastPaperUnit>();

  for (const record of records) {
    const code = getPaperRecordCode(record);
    if (!code || units.has(code)) continue;
    units.set(code, {
      code,
      name: record.unit || record.metadata?.paper_label || formatPaperCode(code),
    });
  }

  return Array.from(units.values()).sort((left, right) => left.name.localeCompare(right.name, undefined, { numeric: true }));
}

export function getPaperSessions(records: PastPaperRecord[], paperCode: string) {
  const sessions = new Set<string>();

  for (const record of records) {
    if (getPaperRecordCode(record) === paperCode && record.exam_session) {
      sessions.add(record.exam_session);
    }
  }

  return Array.from(sessions).sort(compareSessions);
}

export function findPaperRecord(records: PastPaperRecord[], paper: string, year: string) {
  const paperCode = getPaperPrefix(paper);
  const yearSlug = slugifyText(year);

  return records.find((record) => {
    const recordYear = record.metadata?.year_folder || record.exam_session || "";
    return getPaperRecordCode(record) === paperCode && (
      slugifyText(recordYear) === yearSlug
      || slugifyText(record.exam_session || "") === yearSlug
    );
  });
}

export function getPaperRecordCode(record: PastPaperRecord) {
  return normalizePaperCode(record.paper_code || record.unit || record.metadata?.paper_label || "");
}

export function getPaperPrefix(paper: string) {
  return normalizePaperCode(paper);
}

export function slugifyText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function normalizeCurriculumSlug(value: string) {
  const slug = slugifyText(value);
  if (slug === "edexcel-ial" || slug === "international-a-level" || slug === "international-advanced-level") return "ial";
  if (slug === "edexcel-igcse" || slug === "international-gcse") return "igcse";
  return slug;
}

export function formatSubjectName(value: string) {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.length <= 3 ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatCurriculumName(value: string) {
  if (value === "igcse") return "IGCSE";
  if (value === "ial") return "IAL";
  if (value === "igcse-modular") return "IGCSE Modular";
  return value.toUpperCase();
}

export function formatPaperCode(value: string) {
  const normalized = normalizePaperCode(value);
  const paperMatch = normalized.match(/^paper-(\d+)$/);
  if (paperMatch) return `Paper ${paperMatch[1]}`;
  const unitMatch = normalized.match(/^unit-(\d+)$/);
  if (unitMatch) return `Unit ${unitMatch[1]}`;
  return value.toUpperCase();
}

function normalizePaperCode(value: string) {
  const slug = slugifyText(value);
  const paperMatch = slug.match(/^paper-?(\d+)$/);
  if (paperMatch) return `paper-${paperMatch[1]}`;
  const unitMatch = slug.match(/^unit-?(\d+)$/);
  if (unitMatch) return `unit-${unitMatch[1]}`;
  return slug;
}

function comparePastPaperRecords(left: PastPaperRecord, right: PastPaperRecord) {
  return (
    compareSessions(left.exam_session || "", right.exam_session || "")
    || getPaperRecordCode(left).localeCompare(getPaperRecordCode(right), undefined, { numeric: true })
    || (left.title || "").localeCompare(right.title || "")
  );
}

function compareSessions(left: string, right: string) {
  const leftYear = Number(left.match(/\b(20\d{2})\b/)?.[1] || 0);
  const rightYear = Number(right.match(/\b(20\d{2})\b/)?.[1] || 0);
  if (leftYear !== rightYear) return rightYear - leftYear;
  return monthScore(right) - monthScore(left) || left.localeCompare(right);
}

function monthScore(value: string) {
  const text = value.toLowerCase();
  if (text.includes("nov") || text.includes("oct")) return 3;
  if (text.includes("jun")) return 2;
  if (text.includes("jan")) return 1;
  return 0;
}
