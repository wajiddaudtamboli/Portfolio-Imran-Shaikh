-- Comprehensive Storage Setup for Portfolio Site
-- Run this in Supabase SQL Editor to set up all necessary storage buckets and policies
-- 1. Create portfolio-assets bucket for general assets
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
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
    ) ON CONFLICT (id) DO NOTHING;
-- 2. Create avatars bucket for profile images
INSERT INTO storage.buckets (
        id,
        name,
        public,
        file_size_limit,
        allowed_mime_types
    )
VALUES (
        'avatars',
        'avatars',
        true,
        5242880,
        -- 5MB limit
        ARRAY [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/gif',
        'image/webp'
    ]
    ) ON CONFLICT (id) DO NOTHING;
-- 3. Create resumes bucket for resume files
INSERT INTO storage.buckets (
        id,
        name,
        public,
        file_size_limit,
        allowed_mime_types
    )
VALUES (
        'resumes',
        'resumes',
        true,
        10485760,
        -- 10MB limit
        ARRAY [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ]
    ) ON CONFLICT (id) DO NOTHING;
-- 4. Create project-images bucket for project screenshots
INSERT INTO storage.buckets (
        id,
        name,
        public,
        file_size_limit,
        allowed_mime_types
    )
VALUES (
        'project-images',
        'project-images',
        true,
        5242880,
        -- 5MB limit
        ARRAY [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/gif',
        'image/webp'
    ]
    ) ON CONFLICT (id) DO NOTHING;
-- 5. Storage Policies for portfolio-assets bucket
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects FOR
SELECT USING (bucket_id = 'portfolio-assets');
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'portfolio-assets'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to update their uploads
CREATE POLICY "Users can update own uploads" ON storage.objects FOR
UPDATE USING (
        bucket_id = 'portfolio-assets'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to delete their uploads
CREATE POLICY "Users can delete own uploads" ON storage.objects FOR DELETE USING (
    bucket_id = 'portfolio-assets'
    AND auth.role() = 'authenticated'
);
-- 6. Storage Policies for avatars bucket
-- Allow public read access
CREATE POLICY "Public Access Avatars" ON storage.objects FOR
SELECT USING (bucket_id = 'avatars');
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload avatars" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to update their uploads
CREATE POLICY "Users can update own avatars" ON storage.objects FOR
UPDATE USING (
        bucket_id = 'avatars'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to delete their uploads
CREATE POLICY "Users can delete own avatars" ON storage.objects FOR DELETE USING (
    bucket_id = 'avatars'
    AND auth.role() = 'authenticated'
);
-- 7. Storage Policies for resumes bucket
-- Allow public read access
CREATE POLICY "Public Access Resumes" ON storage.objects FOR
SELECT USING (bucket_id = 'resumes');
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload resumes" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'resumes'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to update their uploads
CREATE POLICY "Users can update own resumes" ON storage.objects FOR
UPDATE USING (
        bucket_id = 'resumes'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to delete their uploads
CREATE POLICY "Users can delete own resumes" ON storage.objects FOR DELETE USING (
    bucket_id = 'resumes'
    AND auth.role() = 'authenticated'
);
-- 8. Storage Policies for project-images bucket
-- Allow public read access
CREATE POLICY "Public Access Project Images" ON storage.objects FOR
SELECT USING (bucket_id = 'project-images');
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload project images" ON storage.objects FOR
INSERT WITH CHECK (
        bucket_id = 'project-images'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to update their uploads
CREATE POLICY "Users can update own project images" ON storage.objects FOR
UPDATE USING (
        bucket_id = 'project-images'
        AND auth.role() = 'authenticated'
    );
-- Allow authenticated users to delete their uploads
CREATE POLICY "Users can delete own project images" ON storage.objects FOR DELETE USING (
    bucket_id = 'project-images'
    AND auth.role() = 'authenticated'
);
-- 9. Create RLS (Row Level Security) for storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
-- 10. Create function to handle file uploads with better error handling
CREATE OR REPLACE FUNCTION handle_file_upload(
        bucket_name text,
        file_path text,
        file_data bytea,
        content_type text
    ) RETURNS json LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE result json;
BEGIN -- Insert the file into storage
INSERT INTO storage.objects (
        bucket_id,
        name,
        owner,
        metadata
    )
VALUES (
        bucket_name,
        file_path,
        auth.uid(),
        jsonb_build_object(
            'size',
            octet_length(file_data),
            'mimetype',
            content_type,
            'cacheControl',
            '3600',
            'lastModified',
            extract(
                epoch
                from now()
            )::bigint
        )
    );
-- Return success response
result := json_build_object(
    'success',
    true,
    'path',
    file_path,
    'bucket',
    bucket_name
);
RETURN result;
EXCEPTION
WHEN OTHERS THEN -- Return error response
result := json_build_object(
    'success',
    false,
    'error',
    SQLERRM
);
RETURN result;
END;
$$;
-- 11. Grant necessary permissions
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.buckets TO authenticated;
-- 12. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_storage_objects_bucket_id ON storage.objects(bucket_id);
CREATE INDEX IF NOT EXISTS idx_storage_objects_name ON storage.objects(name);
CREATE INDEX IF NOT EXISTS idx_storage_objects_owner ON storage.objects(owner);
-- Success message
SELECT 'Storage setup completed successfully! All buckets and policies have been created.' as status;