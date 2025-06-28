-- Minimal Storage Setup for Portfolio Assets
-- Run this in Supabase SQL Editor
-- This only creates the bucket without modifying policies
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
-- Note: Storage policies are managed through the Supabase Dashboard
-- Go to Storage > Policies to configure access if needed