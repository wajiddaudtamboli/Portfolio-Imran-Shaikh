-- Create portfolio_sections table to store all content
CREATE TABLE public.portfolio_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type TEXT NOT NULL,
  title TEXT,
  content JSONB NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Create portfolio_settings table for general settings
CREATE TABLE public.portfolio_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Enable RLS
ALTER TABLE public.portfolio_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;
-- Create policies for portfolio_sections
CREATE POLICY "Anyone can read portfolio sections" ON public.portfolio_sections FOR
SELECT USING (true);
CREATE POLICY "Admins can manage portfolio sections" ON public.portfolio_sections FOR ALL USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = auth.uid()
      AND profiles.username = 'Imran'
  )
);
-- Create policies for portfolio_settings
CREATE POLICY "Anyone can read portfolio settings" ON public.portfolio_settings FOR
SELECT USING (true);
CREATE POLICY "Admins can manage portfolio settings" ON public.portfolio_settings FOR ALL USING (
  EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE profiles.id = auth.uid()
      AND profiles.username = 'Imran'
  )
);
-- Insert default settings
INSERT INTO public.portfolio_settings (setting_key, setting_value)
VALUES (
    'contact_info',
    '{"email": "imran.shaikh.contact@gmail.com", "phone": "+91 8698839883", "whatsapp": "918698839883", "linkedin": "https://www.linkedin.com/in/imran-shaikh-06785a3a00", "resume": "https://drive.google.com/file/d/1s4DrpZOhWF5NqQWPHVmR-qiPxyuZmgMH/view?usp=sharing"}'
  ),
  (
    'profile_info',
    '{"name": "Imran Usman Shaikh", "title": "Senior Design Engineer", "profile_image": "/placeholder.svg"}'
  );
-- Insert default portfolio sections
INSERT INTO public.portfolio_sections (section_type, title, content, order_index)
VALUES (
    'about',
    'About Me',
    '{"description": "Experienced Senior Design Engineer with 4+ years in steel engineering, scaffolding systems, and aluminium fabrication. Specializing in 3D modeling, 2D drafting, and structural design.", "highlights": ["3D Modeling & 2D Drafting", "Structural Design", "Fabrication Drawing", "Building Estimation"]}',
    1
  ),
  (
    'experience',
    'Professional Experience',
    '{"experiences": [{"company": "Mfs Formwork Systems LLP", "position": "Senior Design Engineer", "duration": "2021 - Present", "location": "Pune, Maharashtra", "responsibilities": ["Structural design and analysis", "3D modeling in AutoCAD", "Fabrication drawing preparation", "BOM creation and estimation"]}]}',
    2
  ),
  (
    'projects',
    'Projects',
    '{"projects": [{"title": "Structural Design Project", "description": "Complete structural analysis and design for construction project", "technologies": ["AutoCAD", "STAAD Pro", "Excel"], "status": "Completed"}]}',
    3
  ),
  (
    'skills',
    'Technical Skills',
    '{"skills": [{"category": "Design Software", "items": ["AutoCAD", "STAAD Pro", "Revit", "Excel"]}, {"category": "Engineering", "items": ["Structural Design", "3D Modeling", "Fabrication Drawing", "Building Estimation"]}]}',
    4
  ),
  (
    'education',
    'Education',
    '{"education": [{"degree": "Bachelor of Engineering", "field": "Civil Engineering", "institution": "Engineering College", "year": "2017", "grade": "First Class"}]}',
    5
  );