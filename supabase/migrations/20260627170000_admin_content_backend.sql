-- Generic admin-managed content for homepage sections, courses, booklets,
-- blogs, resources, worksheets, textbooks, and past-paper metadata.

CREATE TABLE public.site_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  summary TEXT,
  body TEXT,
  curriculum TEXT,
  subject TEXT,
  unit TEXT,
  exam_session TEXT,
  paper_code TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (type, slug)
);

CREATE INDEX site_content_type_idx ON public.site_content (type);
CREATE INDEX site_content_subject_idx ON public.site_content (curriculum, subject);
CREATE INDEX site_content_published_idx ON public.site_content (published);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published site content is publicly readable"
ON public.site_content
FOR SELECT
USING (published = true);

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.content_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_id UUID REFERENCES public.site_content(id) ON DELETE CASCADE,
  bucket TEXT NOT NULL,
  path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  label TEXT,
  file_type TEXT,
  mime_type TEXT,
  size_bytes BIGINT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (bucket, path)
);

CREATE INDEX content_files_content_id_idx ON public.content_files (content_id);
CREATE INDEX content_files_file_type_idx ON public.content_files (file_type);

ALTER TABLE public.content_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Content files are publicly readable"
ON public.content_files
FOR SELECT
USING (
  content_id IS NULL
  OR EXISTS (
    SELECT 1
    FROM public.site_content
    WHERE site_content.id = content_files.content_id
      AND site_content.published = true
  )
);

CREATE TRIGGER update_content_files_updated_at
BEFORE UPDATE ON public.content_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Public buckets for uploaded website assets and documents.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  (
    'site-assets',
    'site-assets',
    true,
    10485760,
    ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']
  ),
  (
    'site-documents',
    'site-documents',
    true,
    52428800,
    ARRAY['application/pdf', 'image/png', 'image/jpeg', 'image/webp']
  )
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Public can read site assets"
ON storage.objects
FOR SELECT
USING (bucket_id IN ('site-assets', 'site-documents'));
