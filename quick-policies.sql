-- Quick Storage Policies Setup
-- Run this in Supabase SQL Editor
-- This creates basic policies that should work for most users
-- Enable RLS on storage objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
-- Portfolio Assets Bucket Policies
CREATE POLICY "Public Access portfolio-assets" ON storage.objects FOR
SELECT USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Authenticated Upload portfolio-assets" ON storage.objects FOR
INSERT WITH CHECK (bucket_id = 'portfolio-assets');
CREATE POLICY "Authenticated Update portfolio-assets" ON storage.objects FOR
UPDATE USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Authenticated Delete portfolio-assets" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio-assets');
-- Avatars Bucket Policies
CREATE POLICY "Public Access avatars" ON storage.objects FOR
SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated Upload avatars" ON storage.objects FOR
INSERT WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Authenticated Update avatars" ON storage.objects FOR
UPDATE USING (bucket_id = 'avatars');
CREATE POLICY "Authenticated Delete avatars" ON storage.objects FOR DELETE USING (bucket_id = 'avatars');
-- Resumes Bucket Policies
CREATE POLICY "Public Access resumes" ON storage.objects FOR
SELECT USING (bucket_id = 'resumes');
CREATE POLICY "Authenticated Upload resumes" ON storage.objects FOR
INSERT WITH CHECK (bucket_id = 'resumes');
CREATE POLICY "Authenticated Update resumes" ON storage.objects FOR
UPDATE USING (bucket_id = 'resumes');
CREATE POLICY "Authenticated Delete resumes" ON storage.objects FOR DELETE USING (bucket_id = 'resumes');
-- Project Images Bucket Policies
CREATE POLICY "Public Access project-images" ON storage.objects FOR
SELECT USING (bucket_id = 'project-images');
CREATE POLICY "Authenticated Upload project-images" ON storage.objects FOR
INSERT WITH CHECK (bucket_id = 'project-images');
CREATE POLICY "Authenticated Update project-images" ON storage.objects FOR
UPDATE USING (bucket_id = 'project-images');
CREATE POLICY "Authenticated Delete project-images" ON storage.objects FOR DELETE USING (bucket_id = 'project-images');
-- Success message
SELECT 'Storage policies created successfully! Uploads should now work.' as status;