-- Fix Profile Image URL for Vercel Deployment
-- This script updates the profile image to use a proper external URL
-- Run this in your Supabase SQL Editor
-- Update the profile image to use a Google Drive URL or placeholder
UPDATE public.portfolio_settings
SET setting_value = jsonb_set(
        setting_value,
        '{profile_image}',
        '"https://drive.google.com/file/d/1bYlbvHBgw2tVntfWZ3v-2qzmdlOfiDLI/view?usp=sharing"'
    ),
    updated_at = NOW()
WHERE setting_key = 'profile_info';
-- Alternative: Use a placeholder image if you don't have a Google Drive link
-- UPDATE public.portfolio_settings
-- SET setting_value = jsonb_set(
--     setting_value,
--     '{profile_image}',
--     '"https://via.placeholder.com/400x400/1f2937/ffffff?text=Profile+Image"'
-- ),
-- updated_at = NOW()
-- WHERE setting_key = 'profile_info';
-- Verify the update
SELECT setting_key,
    setting_value->>'name' as name,
    setting_value->>'title' as title,
    setting_value->>'profile_image' as profile_image
FROM public.portfolio_settings
WHERE setting_key = 'profile_info';