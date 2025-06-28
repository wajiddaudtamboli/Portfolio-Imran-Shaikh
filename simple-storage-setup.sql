-- Simple Storage Setup - Buckets Only
-- This script only creates storage buckets without policies
-- Run this in Supabase SQL Editor
-- 1. Create portfolio-assets bucket
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
        'text/plain'
    ]
  ) ON CONFLICT (id) DO NOTHING;
-- 2. Create avatars bucket
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
-- 3. Create resumes bucket
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
-- 4. Create project-images bucket
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
-- Success message
SELECT 'Storage buckets created successfully! You may need to configure policies manually in the Dashboard.' as status;