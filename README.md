# Imran Usman Shaikh - Senior Design Engineer Portfolio

A modern, responsive portfolio website showcasing the professional experience and expertise of Imran Usman Shaikh, a Senior Design Engineer specializing in Civil & Structural Design, 3D Modeling, and Production Engineering.

![Portfolio Preview](https://drive.google.com/file/d/1bYlbvHBgw2tVntfWZ3v-2qzmdlOfiDLI/view?usp=sharing)

## 🌟 Features

### 🎨 **Modern Design & UI/UX**

- **Premium Gold Theme** with elegant gradients and animations
- **Responsive Design** optimized for all devices (Desktop, Tablet, Mobile)
- **Dark/Light Mode** toggle with system preference detection
- **Smooth Animations** and hover effects using Framer Motion
- **Professional Typography** with Playfair Display and Montserrat fonts
- **Interactive Particles** background for visual appeal

### 📱 **Multi-Language Support**

- **Language Context** for easy internationalization
- **Translation System** ready for multiple languages
- **Dynamic Content** switching between languages

### 🔧 **Dynamic Content Management**

- **Admin Panel** with full CRUD operations
- **Real-time Updates** without page refresh
- **Database Integration** with Supabase
- **File Upload System** for profile images and resumes
- **Content Sections:**
  - [About Section](#about) - Professional background and highlights
  - [Experience Section](#experience) - Work history and responsibilities
  - [Projects Section](#projects) - Portfolio of completed projects
  - [Skills Section](#skills) - Technical expertise and competencies
  - [Education Section](#education) - Academic background and certifications
  - [Contact Section](#contact) - Professional contact information

### 📁 **File Upload Features**

- **Profile Image Upload** - Support for JPG/PNG files (max 5MB)
- **Resume Upload** - Support for PDF/DOC/DOCX/TXT files (max 10MB)
- **Secure Storage** using Supabase Storage
- **File Validation** with type and size checks
- **Preview Functionality** for uploaded images
- **Fallback URL Support** for external file links

### 🛡️ **Security & Authentication**

- **JWT Authentication** for admin access
- **Role-based Access Control** (Admin/Public)
- **Secure API Endpoints** with proper validation
- **Session Management** with timeout handling
- **File Upload Security** with type validation and size limits

### 📊 **Performance & SEO**

- **Vite Build System** for fast development and optimized builds
- **SEO Optimized** with meta tags and structured data
- **Lazy Loading** for better performance
- **Accessibility Compliant** with ARIA labels and semantic HTML

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account (for database and storage)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/imran-shaikh-portfolio.git
cd imran-shaikh-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
imran-shaikh-portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AboutSection.tsx
│   │   ├── AdminPanel.tsx  # Admin panel with file uploads
│   │   ├── ContactSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── SkillsSection.tsx
│   ├── contexts/           # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── LanguageContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/              # Custom hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/       # External integrations
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── pages/              # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                 # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── whatsapp-icon.svg
├── supabase/              # Database migrations
│   ├── config.toml
│   └── migrations/
├── database-setup.sql     # Database setup script
├── setup-storage.sql      # Storage bucket setup script
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Admin Credentials
VITE_ADMIN_USERNAME=Imran
VITE_ADMIN_PASSWORD=Imran@123

# Contact Information
VITE_CONTACT_EMAIL=imran.shaikh.contact@gmail.com
VITE_CONTACT_PHONE=+91 8698839883
VITE_WHATSAPP_NUMBER=918698839883
VITE_LINKEDIN_URL=https://www.linkedin.com/in/imran-shaikh-06785a3a00
VITE_RESUME_URL=https://drive.google.com/file/d/1s4DrpZOhWF5NqQWPHVmR-qiPxyuZmgMH/view?usp=sharing
```

## 🗄️ Database Setup

### Option 1: Using SQL Scripts (Recommended)

1. **Go to Supabase Dashboard:**

   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor:**

   - Click "SQL Editor" → "New Query"

3. **Run Database Setup:**

   ```sql
   -- Copy and paste the content from database-setup.sql
   -- Click "Run" to execute
   ```

4. **Run Storage Setup:**
   ```sql
   -- Copy and paste the content from comprehensive-storage-setup.sql
   -- Click "Run" to execute
   ```

### Option 2: Manual Setup

1. **Create Tables:**

   - `portfolio_sections` - Content sections
   - `portfolio_settings` - Configuration settings

2. **Create Storage Bucket:**

   - Bucket name: `portfolio-assets`
   - Public access enabled
   - File size limit: 10MB
   - Allowed types: Images (JPG/PNG), Documents (PDF/DOC/DOCX/TXT)

3. **Insert Default Data:**

   - Contact information
   - Profile details
   - Sample content for all sections

4. **Set Permissions:**
   - Enable RLS (Row Level Security)
   - Configure access policies for storage

## 🔧 Troubleshooting

### Common Issues

#### 1. `net::ERR_NAME_NOT_RESOLVED` Error

**Problem**: Browser console shows repeated `ffffff:1` errors
**Solution**: ✅ **FIXED** - This was caused by a placeholder image URL and has been resolved.

#### 2. File Upload Issues

**Problem**: Photos and resumes won't upload in admin panel
**Solutions**:

- Run `comprehensive-storage-setup.sql` in Supabase SQL Editor
- Check file size limits (5MB for images, 10MB for resumes)
- Use URL fallback option in admin panel
- Verify Supabase authentication is working

#### 3. Database Connection Issues

**Problem**: Admin panel can't load or save data
**Solutions**:

- Verify Supabase URL and API key in `src/integrations/supabase/client.ts`
- Run `database-setup.sql` in Supabase
- Check that your Supabase project is active

### Testing Your Setup

Run the storage test script to verify configuration:

```bash
node test-storage.js
```

This will test:

- Database connection
- Storage bucket accessibility
- API key permissions

### Alternative Upload Methods

If file upload continues to fail:

**For Profile Images:**

1. Upload to Imgur, Cloudinary, or Google Drive
2. Copy the direct URL
3. Paste in "Or Enter Image URL" field

**For Resumes:**

1. Upload to Google Drive or Dropbox
2. Create a shareable link
3. Paste in "Or Enter Resume URL" field

### Getting Help

1. Check the browser console for specific error messages
2. Look at the Network tab in DevTools
3. Check Supabase Dashboard for error logs
4. Verify all setup scripts have been run

For detailed troubleshooting, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Linting & Formatting
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier

# Type Checking
npm run type-check   # Run TypeScript compiler
```

## 🎯 Key Sections

### [About Section](#about)

- Professional background and expertise
- Key highlights and specializations
- Personal information and interests
- Core strengths and competencies

### [Experience Section](#experience)

- Work history with detailed responsibilities
- Company information and duration
- Key achievements and contributions
- Location and role details

### [Projects Section](#projects)

- Portfolio of completed projects
- Project descriptions and technologies
- Status indicators (Completed, In Progress)
- Links to project demos (if available)

### [Skills Section](#skills)

- Technical skills categorization
- Proficiency indicators
- Software and tool expertise
- Engineering competencies

### [Education Section](#education)

- Academic background and qualifications
- Institution details and graduation year
- Certifications and achievements
- Professional development

### [Contact Section](#contact)

- Professional contact information
- Social media links
- Resume download (file upload or URL)
- Contact form for inquiries

## 🔐 Admin Panel Features

### Authentication

- **Username:** Imran
- **Password:** Imran@123
- **Session Management** with timeout
- **Secure Access** to admin functions

### Content Management

- **Real-time Updates** to all sections
- **Rich Text Editing** for descriptions
- **File Upload System** for images and documents
- **Contact Information** updates
- **Profile Settings** customization

### File Upload System

- **Profile Image Upload:**
  - Supported formats: JPG, PNG
  - Maximum size: 5MB
  - Preview functionality
  - Automatic storage to Supabase
- **Resume Upload:**
  - Supported formats: PDF, DOC, DOCX, TXT
  - Maximum size: 10MB
  - File validation and error handling
  - Secure storage with public access

### Data Management

- **CRUD Operations** for all content
- **Bulk Operations** for efficiency
- **Data Validation** and error handling
- **Backup and Restore** capabilities

## 🛠️ Technologies Used

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Backend & Database

- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Supabase Storage** - File storage system
- **Row Level Security** - Data protection
- **Real-time Subscriptions** - Live updates

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Git** - Version control

## 🚀 Deployment

### Vercel Deployment (Recommended)

#### Prerequisites

- GitHub account with your repository
- Vercel account (free tier available)
- Supabase project with database and storage configured

#### Step-by-Step Deployment

1. **Prepare Your Repository:**

   ```bash
   # Ensure all changes are committed
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository: `wajiddaudtamboli/Portfolio-Imran-Shaikh`
   - Vercel will auto-detect it's a Vite project

3. **Configure Build Settings:**

   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Set Environment Variables:**
   In Vercel dashboard, add these environment variables:

   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ADMIN_USERNAME=Imran
   VITE_ADMIN_PASSWORD=Imran@123
   VITE_CONTACT_EMAIL=imran.shaikh.contact@gmail.com
   VITE_CONTACT_PHONE=+91 8698839883
   VITE_WHATSAPP_NUMBER=918698839883
   VITE_LINKEDIN_URL=https://www.linkedin.com/in/imran-shaikh-06785a3a00
   VITE_RESUME_URL=https://drive.google.com/file/d/1s4DrpZOhWF5NqQWPHVmR-qiPxyuZmgMH/view?usp=sharing
   ```

5. **Deploy:**

   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)
   - Your site will be live at `https://your-project-name.vercel.app`

6. **Post-Deployment:**
   - Test all functionality (admin panel, file uploads, contact links)
   - Set up custom domain if needed
   - Configure automatic deployments for future updates

#### Vercel CLI Deployment (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Deploy to production
vercel --prod
```

#### Environment Variables Setup

1. **Get Supabase Credentials:**

   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy your Project URL and anon/public key

2. **Add to Vercel:**

   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add each variable with the correct name and value

3. **Redeploy After Changes:**
   - After adding environment variables, redeploy your project
   - Go to Deployments → Redeploy

#### Troubleshooting Vercel Deployment

**Common Issues:**

1. **Build Fails:**

   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

2. **Environment Variables Not Working:**

   - Ensure variable names start with `VITE_`
   - Redeploy after adding variables
   - Check for typos in variable names

3. **Supabase Connection Issues:**

   - Verify Supabase URL and keys
   - Check Supabase project is active
   - Ensure database tables are created

4. **File Upload Not Working:**
   - Verify Supabase Storage is configured
   - Check storage bucket policies
   - Ensure environment variables are set

**Support:**

- Check Vercel build logs for detailed error messages
- Verify all environment variables are correctly set
- Test locally with `npm run build` before deploying

### Netlify Deployment

1. **Build and Deploy:**

   ```bash
   npm run build
   # Upload dist/ folder to Netlify
   ```

2. **Environment Variables:**
   - Set environment variables in Netlify dashboard

### Manual Deployment

1. **Build the Project:**

   ```bash
   npm run build
   ```

2. **Upload Files:**
   - Upload `dist/` folder to your hosting service
   - Configure server for SPA routing

## 📊 Performance Optimization

- **Code Splitting** for better loading times
- **Image Optimization** with lazy loading
- **Minification** of CSS and JavaScript
- **Caching Strategies** for static assets
- **CDN Integration** for global performance
- **File Compression** for uploads

## 🔒 Security Features

- **JWT Authentication** for admin access
- **CORS Protection** for API security
- **Input Validation** and sanitization
- **XSS Prevention** with proper encoding
- **CSRF Protection** for forms
- **Rate Limiting** for API endpoints
- **File Upload Security** with type and size validation

## 📱 Responsive Design

- **Mobile-First** approach
- **Breakpoint System** for all devices
- **Touch-Friendly** interactions
- **Optimized Images** for different screen sizes
- **Flexible Layouts** that adapt to content

## 🎨 Customization

### Theme Customization

- **Color Scheme** modification in `tailwind.config.ts`
- **Typography** settings in CSS variables
- **Component Styling** in individual components
- **Animation** customization in Framer Motion

### Content Customization

- **Admin Panel** for easy content updates
- **Database** management through Supabase
- **File Uploads** for dynamic content
- **Static Content** in component files
- **Environment Variables** for configuration

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Test changes across different devices
- Update documentation for new features

## 📞 Support & Contact

### Technical Support

- **Email:** wajiddaudtamboli@gmail.com
- **Phone:** +91 9834998734
- **GitHub Issues:** Report bugs and feature requests

### Portfolio Owner

- **Name:** Imran Usman Shaikh
- **Email:** imran.shaikh.contact@gmail.com
- **Phone:** +91 8698839883
- **LinkedIn:** [Imran Shaikh](https://www.linkedin.com/in/imran-shaikh-06785a3a00)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Developer:** Wajid Daud Tamboli
- **Design Inspiration:** Modern portfolio trends
- **Icons:** Lucide React
- **UI Components:** shadcn/ui
- **Backend:** Supabase

## 📈 Future Enhancements

- [ ] **Blog Section** for articles and insights
- [ ] **Testimonials** from clients and colleagues
- [ ] **Portfolio Gallery** with project images
- [ ] **Multi-language Support** (Hindi, Marathi)
- [ ] **Analytics Integration** for visitor tracking
- [ ] **SEO Optimization** for better search rankings
- [ ] **PWA Features** for mobile app experience
- [ ] **Contact Form** with email integration
- [ ] **Project Image Uploads** for portfolio gallery
- [ ] **Bulk File Management** for admin panel

---

**Imran Usman Shaikh** - Senior Design Engineer Portfolio

_Empowering structural design with modern technology and professional excellence!_ 🏗️✨

---

<div align="center">

**Made with ❤️ by [Developer-Wajid Daud Tamboli](mailto:wajiddaudtamboli@gmail.com)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/wajid-tamboli)
[![Email](https://img.shields.io/badge/Email-Contact-red?style=for-the-badge&logo=gmail)](mailto:wajiddaudtamboli@gmail.com)
[![Phone](https://img.shields.io/badge/Phone-Call-green?style=for-the-badge&logo=whatsapp)](tel:+919834998734)

</div>
