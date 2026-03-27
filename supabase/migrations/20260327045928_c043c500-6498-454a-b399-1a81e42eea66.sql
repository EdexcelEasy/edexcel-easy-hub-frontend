-- Create table for worksheet links
CREATE TABLE public.worksheet_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  curriculum TEXT NOT NULL,
  subject TEXT NOT NULL,
  unit TEXT NOT NULL,
  worksheet_number INTEGER NOT NULL DEFAULT 1,
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (curriculum, subject, unit, worksheet_number)
);

-- Enable RLS
ALTER TABLE public.worksheet_links ENABLE ROW LEVEL SECURITY;

-- Everyone can read worksheet links (public content)
CREATE POLICY "Worksheet links are publicly readable"
  ON public.worksheet_links FOR SELECT
  USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_worksheet_links_updated_at
  BEFORE UPDATE ON public.worksheet_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();