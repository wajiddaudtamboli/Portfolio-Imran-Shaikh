-- Alternative Storage Setup for Portfolio Assets
-- Run this in Supabase SQL Editor
-- Uses a different bucket name that might work better
-- Create storage bucket for portfolio assets
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
-- Note: The 'avatars' bucket is often pre-configured in Supabase
-- and may have better default permissions