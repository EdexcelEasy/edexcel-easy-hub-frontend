-- Admin-managed resources for each subject: notes, videos, worksheets,
-- formula booklets, cheatsheets, and any custom resource type.

CREATE TABLE public.subject_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  icon TEXT NOT NULL DEFAULT 'file',
  color TEXT NOT NULL DEFAULT 'blue',
  access_type TEXT NOT NULL DEFAULT 'free' CHECK (access_type IN ('free', 'paid')),
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'coming_soon')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (subject_id, slug)
);

CREATE INDEX subject_resources_subject_id_idx ON public.subject_resources (subject_id);
CREATE INDEX subject_resources_slug_idx ON public.subject_resources (slug);

ALTER TABLE public.subject_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published subject resources are publicly readable"
ON public.subject_resources
FOR SELECT
USING (
  published = true
  AND EXISTS (
    SELECT 1
    FROM public.subjects
    JOIN public.subject_categories ON subject_categories.id = subjects.category_id
    WHERE subjects.id = subject_resources.subject_id
      AND subjects.published = true
      AND subject_categories.published = true
  )
);

CREATE TRIGGER update_subject_resources_updated_at
BEFORE UPDATE ON public.subject_resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.subject_resource_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id UUID NOT NULL REFERENCES public.subject_resources(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  file_url TEXT,
  file_type TEXT,
  access_type TEXT NOT NULL DEFAULT 'free' CHECK (access_type IN ('free', 'paid')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX subject_resource_items_resource_id_idx ON public.subject_resource_items (resource_id);

ALTER TABLE public.subject_resource_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published subject resource items are publicly readable"
ON public.subject_resource_items
FOR SELECT
USING (
  published = true
  AND EXISTS (
    SELECT 1
    FROM public.subject_resources
    JOIN public.subjects ON subjects.id = subject_resources.subject_id
    JOIN public.subject_categories ON subject_categories.id = subjects.category_id
    WHERE subject_resources.id = subject_resource_items.resource_id
      AND subject_resources.published = true
      AND subjects.published = true
      AND subject_categories.published = true
  )
);

CREATE TRIGGER update_subject_resource_items_updated_at
BEFORE UPDATE ON public.subject_resource_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
