# 🚀 Render Deployment Guide

## Quick Start

Your portfolio site is now ready for deployment on Render! Here's everything you need to know.

## 📋 Prerequisites

- ✅ GitHub repository with your code
- ✅ Render account (free at [render.com](https://render.com))
- ✅ Supabase project set up

## 🛠️ Files Added for Deployment

The following files have been added to your project:

1. **`render.yaml`** - Render deployment configuration
2. **`.nvmrc`** - Node.js version specification
3. **`public/_redirects`** - For proper React Router routing
4. **`DEPLOYMENT.md`** - Detailed deployment guide
5. **`deploy.sh`** - Local deployment script

## 🚀 Step-by-Step Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Add Render deployment configuration"
git push origin main
```

### 2. Deploy on Render

#### Option A: Blueprint Deployment (Recommended)

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Blueprint"
3. Connect your GitHub account
4. Select your portfolio repository
5. Render will automatically detect the `render.yaml` file
6. Add your environment variables:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
7. Click "Apply" to deploy

#### Option B: Manual Static Site

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. Add environment variables (same as above)
6. Click "Create Static Site"

### 3. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy:
   - **Project URL** (for `VITE_SUPABASE_URL`)
   - **Anon/Public Key** (for `VITE_SUPABASE_ANON_KEY`)

## 🌐 Your Site URL

After deployment, your site will be available at:

```
https://your-app-name.onrender.com
```

## 🔧 Environment Variables

Make sure to set these in Render:

| Variable                 | Description               | Example                      |
| ------------------------ | ------------------------- | ---------------------------- |
| `VITE_SUPABASE_URL`      | Your Supabase project URL | `https://abc123.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key    | `eyJhbGciOiJIUzI1NiIs...`    |

## 🎯 Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All pages work correctly
- [ ] Supabase connections work
- [ ] Images and assets load
- [ ] Contact forms function
- [ ] Admin panel works
- [ ] Mobile responsive design

## 🆓 Free Tier Benefits

- **Static Sites**: Completely free
- **Custom Domains**: Free with SSL
- **Bandwidth**: 100GB/month free
- **Build Minutes**: 750 minutes/month free

## 🔍 Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Verify Node.js version (18.0.0)
- Check build logs for specific errors

### Environment Variables Not Working

- Ensure variable names start with `VITE_`
- Check that values are copied correctly
- Redeploy after adding variables

### Routing Issues

- Verify `public/_redirects` file is present
- Check React Router configuration

### Supabase Connection Issues

- Verify your Supabase project is active
- Check RLS policies allow public access
- Ensure CORS settings are correct

## 📞 Support

- **Render Docs**: [docs.render.com](https://docs.render.com)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Render Support**: Available in dashboard

## 🎉 You're All Set!

Your portfolio will be live and accessible worldwide once deployed. The free tier should be more than sufficient for a portfolio site.

---

**Need help?** Check the detailed `DEPLOYMENT.md` file for more information.
