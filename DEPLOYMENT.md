# Deployment Guide for Render

## Prerequisites

1. **GitHub Account**: Make sure your code is pushed to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Supabase Project**: Ensure your Supabase project is set up and running

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository

Make sure your code is committed and pushed to GitHub with the following files:

- `render.yaml` (deployment configuration)
- `.nvmrc` (Node.js version specification)
- `public/_redirects` (for proper routing)

### 2. Set Up Supabase Environment Variables

Before deploying, you need to set up your Supabase environment variables in Render:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - Project URL
   - Anon/Public Key

### 3. Deploy on Render

#### Option A: Using render.yaml (Recommended)

1. **Connect GitHub Repository**:

   - Log in to Render
   - Click "New +" and select "Blueprint"
   - Connect your GitHub account
   - Select your portfolio repository
   - Render will automatically detect the `render.yaml` file

2. **Configure Environment Variables**:

   - In the deployment settings, add these environment variables:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Deploy**:
   - Click "Apply" to start the deployment
   - Render will automatically build and deploy your site

#### Option B: Manual Setup

1. **Create Static Site**:

   - Log in to Render
   - Click "New +" and select "Static Site"
   - Connect your GitHub repository

2. **Configure Build Settings**:

   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18.0.0

3. **Add Environment Variables**:

   - Go to Environment tab
   - Add the Supabase environment variables:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Deploy**:
   - Click "Create Static Site"
   - Wait for the build to complete

### 4. Custom Domain (Optional)

1. **Add Custom Domain**:

   - Go to your site settings in Render
   - Click "Custom Domains"
   - Add your domain name
   - Follow the DNS configuration instructions

2. **SSL Certificate**:
   - Render automatically provides SSL certificates
   - No additional configuration needed

### 5. Post-Deployment Checklist

- [ ] Test all pages and functionality
- [ ] Verify Supabase connections work
- [ ] Check that images and assets load correctly
- [ ] Test contact forms and admin panel
- [ ] Verify responsive design on mobile devices

## Troubleshooting

### Common Issues

1. **Build Failures**:

   - Check that all dependencies are in `package.json`
   - Verify Node.js version compatibility
   - Check build logs for specific errors

2. **Environment Variables**:

   - Ensure all Supabase variables are set correctly
   - Check that variable names match your code (VITE\_ prefix)

3. **Routing Issues**:

   - Verify `public/_redirects` file is present
   - Check that React Router is configured correctly

4. **Supabase Connection**:
   - Verify your Supabase project is active
   - Check that RLS policies allow public access where needed
   - Ensure CORS settings are configured correctly

### Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Supabase Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **Render Support**: Available through the Render dashboard

## Cost Information

- **Static Sites on Render**: Free tier available
- **Custom Domains**: Free with SSL
- **Bandwidth**: Generous free tier included
- **Build Minutes**: Free tier includes 750 minutes/month

## Performance Optimization

1. **Image Optimization**: Consider using WebP format for images
2. **Code Splitting**: Vite automatically handles this
3. **Caching**: Render provides automatic CDN caching
4. **Compression**: Static assets are automatically compressed
