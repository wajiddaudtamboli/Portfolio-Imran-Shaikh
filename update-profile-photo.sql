-- Quick Update: Set Profile Photo
-- Run this in your Supabase SQL Editor to update just the profile photo
UPDATE public.portfolio_settings
SET setting_value = jsonb_set(
        setting_value,
        '{profile_image}',
        '"https://drive.google.com/file/d/1bYlbvHBgw2tVntfWZ3v-2qzmdlOfiDLI/view?usp=sharing"'
    ),
    updated_at = NOW()
WHERE setting_key = 'profile_info';
-- Verify the update
SELECT setting_key,
    setting_value->>'profile_image' as profile_image
FROM public.portfolio_settings
WHERE setting_key = 'profile_info';