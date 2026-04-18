-- Create table to store textbook PDF links per subject/curriculum
CREATE TABLE public.textbook_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  curriculum TEXT NOT NULL,
  subject TEXT NOT NULL,
  book_number INTEGER NOT NULL,
  title TEXT,
  link TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (curriculum, subject, book_number)
);

ALTER TABLE public.textbook_links ENABLE ROW LEVEL SECURITY;

-- Public read access (same pattern as worksheet_links)
CREATE POLICY "Textbook links are publicly readable"
ON public.textbook_links
FOR SELECT
USING (true);

-- Auto-update updated_at
CREATE TRIGGER update_textbook_links_updated_at
BEFORE UPDATE ON public.textbook_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed rows for all IAL subjects (Physics, Mathematics, Biology, Information Technology)
-- Physics Book 1 gets the provided link; the rest are placeholders you can update later.
INSERT INTO public.textbook_links (curriculum, subject, book_number, title, link) VALUES
  ('ial', 'physics', 1, 'Physics Book 1', 'https://drive.google.com/file/d/1F33YiFDTVeEOu2rtR8qC_SepXaXBuWCz/view?usp=share_link'),
  ('ial', 'physics', 2, 'Physics Book 2', ''),
  ('ial', 'mathematics', 1, 'Mathematics Book 1', ''),
  ('ial', 'mathematics', 2, 'Mathematics Book 2', ''),
  ('ial', 'biology', 1, 'Biology Book 1', ''),
  ('ial', 'biology', 2, 'Biology Book 2', ''),
  ('ial', 'information-technology', 1, 'Information Technology Book 1', ''),
  ('ial', 'information-technology', 2, 'Information Technology Book 2', '');
