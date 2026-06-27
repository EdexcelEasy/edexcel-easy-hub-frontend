-- Admin-managed subject menu, category pages, and subject specifications.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TABLE public.subject_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  kicker TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX subject_categories_slug_idx ON public.subject_categories (slug);
CREATE INDEX subject_categories_published_idx ON public.subject_categories (published);

ALTER TABLE public.subject_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published subject categories are publicly readable"
ON public.subject_categories
FOR SELECT
USING (published = true);

CREATE TRIGGER update_subject_categories_updated_at
BEFORE UPDATE ON public.subject_categories
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.subjects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES public.subject_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  heading TEXT,
  subheading TEXT,
  resources_text TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX subjects_category_id_idx ON public.subjects (category_id);
CREATE INDEX subjects_slug_idx ON public.subjects (slug);
CREATE INDEX subjects_published_idx ON public.subjects (published);

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published subjects are publicly readable"
ON public.subjects
FOR SELECT
USING (
  published = true
  AND EXISTS (
    SELECT 1
    FROM public.subject_categories
    WHERE subject_categories.id = subjects.category_id
      AND subject_categories.published = true
  )
);

CREATE TRIGGER update_subjects_updated_at
BEFORE UPDATE ON public.subjects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.subject_units (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX subject_units_subject_id_idx ON public.subject_units (subject_id);

ALTER TABLE public.subject_units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Units for published subjects are publicly readable"
ON public.subject_units
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.subjects
    JOIN public.subject_categories ON subject_categories.id = subjects.category_id
    WHERE subjects.id = subject_units.subject_id
      AND subjects.published = true
      AND subject_categories.published = true
  )
);

CREATE TRIGGER update_subject_units_updated_at
BEFORE UPDATE ON public.subject_units
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.subject_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  unit_id UUID NOT NULL REFERENCES public.subject_units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX subject_topics_unit_id_idx ON public.subject_topics (unit_id);

ALTER TABLE public.subject_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Topics for published subjects are publicly readable"
ON public.subject_topics
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.subject_units
    JOIN public.subjects ON subjects.id = subject_units.subject_id
    JOIN public.subject_categories ON subject_categories.id = subjects.category_id
    WHERE subject_units.id = subject_topics.unit_id
      AND subjects.published = true
      AND subject_categories.published = true
  )
);

CREATE TRIGGER update_subject_topics_updated_at
BEFORE UPDATE ON public.subject_topics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
