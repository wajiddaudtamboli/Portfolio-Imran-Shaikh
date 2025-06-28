# Troubleshooting Guide

## Common Issues and Solutions

### 1. `net::ERR_NAME_NOT_RESOLVED` Error with `ffffff`

**Problem**: You see repeated network errors for `ffffff:1` in the browser console.

**Cause**: This was caused by a placeholder image URL that couldn't be resolved.

**Solution**: ✅ **FIXED** - The placeholder image has been replaced with a local SVG data URL that doesn't require external network requests.

### 2. Photo and Resume Upload Issues in Admin Panel

**Problem**: Files won't upload through the admin panel.

**Causes and Solutions**:

#### A. Storage Buckets Not Configured

**Symptoms**: "Storage Not Configured" error message
**Solution**:

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run the `comprehensive-storage-setup.sql` script
4. This creates all necessary storage buckets and policies

#### B. Authentication Issues

**Symptoms**: "Upload Failed" or permission errors
**Solution**:

1. Make sure you're logged into the admin panel
2. Check that your Supabase authentication is working
3. Verify the user has the correct permissions

#### C. File Size or Type Restrictions

**Symptoms**: "File Too Large" or "Invalid File Type" errors
**Solution**:

- Profile images: Max 5MB, JPG/PNG only
- Resumes: Max 10MB, PDF/DOC/DOCX/TXT only

#### D. Network Issues

**Symptoms**: Timeout or connection errors
**Solution**:

1. Check your internet connection
2. Try uploading smaller files first
3. Use the URL option instead of file upload

### 3. Alternative Upload Methods

If file upload continues to fail, you can:

#### For Profile Images:

1. Upload your image to a service like:
   - Imgur
   - Cloudinary
   - Google Drive (make public)
   - GitHub (in a repository)
2. Copy the direct URL
3. Paste it in the "Or Enter Image URL" field in the admin panel

#### For Resumes:

1. Upload your resume to:
   - Google Drive (make public)
   - Dropbox (create shareable link)
   - GitHub (in a repository)
2. Copy the direct URL
3. Paste it in the "Or Enter Resume URL" field in the admin panel

### 4. Database Connection Issues

**Problem**: Admin panel can't load or save data

**Solutions**:

1. Check your Supabase URL and API key in `src/integrations/supabase/client.ts`
2. Verify your Supabase project is active
3. Check if you've run the database setup scripts:
   - `database-setup.sql`
   - `comprehensive-storage-setup.sql`

### 5. TypeScript Errors

**Problem**: Type errors related to Supabase tables

**Solution**:

1. The types file may need to be regenerated
2. Run `npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts`
3. Or temporarily use `any` types for development

### 6. Performance Issues

**Problem**: Site loads slowly or images don't load

**Solutions**:

1. Optimize image sizes before uploading
2. Use WebP format for images when possible
3. Consider using a CDN for large files
4. Check your Supabase region and choose one close to your users

### 7. Mobile Responsiveness Issues

**Problem**: Site doesn't look good on mobile

**Solution**:

1. The site is built with responsive design
2. Test on different devices and screen sizes
3. Check that all images have proper `alt` attributes
4. Verify touch targets are large enough (44px minimum)

## Getting Help

If you continue to have issues:

1. Check the browser console for specific error messages
2. Look at the Network tab in DevTools to see failed requests
3. Check the Supabase Dashboard for any error logs
4. Verify all setup scripts have been run successfully

## Quick Fix Checklist

- [ ] Run `comprehensive-storage-setup.sql` in Supabase
- [ ] Run `database-setup.sql` in Supabase
- [ ] Check Supabase URL and API key
- [ ] Verify authentication is working
- [ ] Try uploading smaller files
- [ ] Use URL fallback for uploads
- [ ] Clear browser cache and try again
