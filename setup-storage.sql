-- Setup Storage Buckets for Portfolio Assets
-- Run this in Supabase SQL Editor
-- Create storage bucket for portfolio assets
INSERT INTO storage.buckets (
        id,
        name,
        public,
        file_size_limit,
        allowed_mime_types
    )
VALUES (
        'portfolio-assets',
        'portfolio-assets',
        true,
        10485760,
        -- 10MB limit
        ARRAY [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
    ) ON CONFLICT (id) DO NOTHING;
-- Create storage policies for public read access
CREATE POLICY "Public read access for portfolio assets" ON storage.objects FOR
SELECT USING (bucket_id = 'portfolio-assets');
-- Create storage policies for authenticated uploads
CREATE POLICY "Authenticated users can upload portfolio assets" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'portfolio-assets'
        AND auth.role() = 'authenticated'
    );
-- Create storage policies for authenticated updates
CREATE POLICY "Authenticated users can update portfolio assets" ON storage.objects FOR
UPDATE USING (
        bucket_id = 'portfolio-assets'
        AND auth.role() = 'authenticated'
    );
-- Create storage policies for authenticated deletes
CREATE POLICY "Authenticated users can delete portfolio assets" ON storage.objects FOR DELETE USING (
    bucket_id = 'portfolio-assets'
    AND auth.role() = 'authenticated'
);
-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
-- Create folders structure (optional - will be created automatically when files are uploaded)
-- profile-images/ - for profile photos
-- resumes/ - for resume files
-- project-images/ - for project screenshots (future use)
-- Grant necessary permissions
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;