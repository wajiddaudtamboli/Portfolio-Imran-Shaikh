-- Error-Free Storage Setup
-- This script creates buckets and basic policies that should work without permission issues
-- Run this in Supabase SQL Editor
-- 1. Create storage buckets (if they don't exist)
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
        ARRAY ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    ),
    (
        'avatars',
        'avatars',
        true,
        5242880,
        ARRAY ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    ),
    (
        'resumes',
        'resumes',
        true,
        10485760,
        ARRAY ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    ),
    (
        'project-images',
        'project-images',
        true,
        5242880,
        ARRAY ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    ) ON CONFLICT (id) DO NOTHING;
-- 2. Enable RLS (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
-- 3. Create simple policies that allow all operations (for development)
-- These policies are more permissive and should work without permission issues
-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public Access portfolio-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload portfolio-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update portfolio-assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete portfolio-assets" ON storage.objects;
DROP POLICY IF EXISTS "Public Access avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete avatars" ON storage.objects;
DROP POLICY IF EXISTS "Public Access resumes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload resumes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update resumes" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete resumes" ON storage.objects;
DROP POLICY IF EXISTS "Public Access project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update project-images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete project-images" ON storage.objects;
-- 4. Create simple policies that allow all operations
CREATE POLICY "Allow all portfolio-assets" ON storage.objects FOR ALL USING (bucket_id = 'portfolio-assets');
CREATE POLICY "Allow all avatars" ON storage.objects FOR ALL USING (bucket_id = 'avatars');
CREATE POLICY "Allow all resumes" ON storage.objects FOR ALL USING (bucket_id = 'resumes');
CREATE POLICY "Allow all project-images" ON storage.objects FOR ALL USING (bucket_id = 'project-images');
-- 5. Grant necessary permissions
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT ALL ON storage.objects TO anon;
GRANT ALL ON storage.buckets TO anon;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;
-- Success message
SELECT 'Storage setup completed successfully! All buckets and policies have been created.' as status;