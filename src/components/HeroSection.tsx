import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Download, Mail, Phone, MessageCircle } from 'lucide-react';
const HeroSection = () => {
  const {
    translations
  } = useLanguage();
  const [profileInfo, setProfileInfo] = useState<any>({});
  const [contactInfo, setContactInfo] = useState<any>({});
  useEffect(() => {
    fetchProfileInfo();
    fetchContactInfo();
  }, []);
  const fetchProfileInfo = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('portfolio_settings').select('setting_value').eq('setting_key', 'profile_info').single();
      if (error) throw error;
      setProfileInfo(data?.setting_value || {});
    } catch (error) {
      console.error('Error fetching profile info:', error);
    }
  };
  const fetchContactInfo = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('portfolio_settings').select('setting_value').eq('setting_key', 'contact_info').single();
      if (error) throw error;
      setContactInfo(data?.setting_value || {});
    } catch (error) {
      console.error('Error fetching contact info:', error);
    }
  };
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleDownloadResume = () => {
    if (contactInfo.resume) {
      window.open(contactInfo.resume, '_blank');
    }
  };
  return <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 opacity-10">
        <svg width="60" height="60" viewBox="0 0 60 60" className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground font-medium">
                  {translations.home.greeting}
                </p>
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  {profileInfo.name || translations.home.name}
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-primary">
                  {profileInfo.title || translations.home.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {translations.home.subtitle}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">5+</div>
                  <div className="text-sm text-muted-foreground">{translations.home.yearsExp}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-12 px-8" onClick={handleDownloadResume}>
                  <Download className="mr-2 h-4 w-4" />
                  {translations.home.downloadCV}
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8" onClick={scrollToContact}>
                  <Mail className="mr-2 h-4 w-4" />
                  {translations.home.contactMe}
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-6 pt-4">
                <a href={`tel:${contactInfo.phone || "+918698839883"}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Phone className="h-4 w-4" />
                  <span>{contactInfo.phone || "+91 8698839883"}</span>
                </a>
                <a href={`mailto:${contactInfo.email || "imraanshaikh039@gmail.com"}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <Mail className="h-4 w-4" />
                  <span>{contactInfo.email || "imraanshaikh039@gmail.com"}</span>
                </a>
                <a href={`https://wa.me/${contactInfo.whatsapp || "918698839883"}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Profile Image with Tech Stack */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Media Frame - Desktop/Tablet View */}
                <div className="hidden md:block relative">
                  <div className="w-96 h-96 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-6 shadow-2xl">
                    <img src={profileInfo.profile_image || "/lovable-uploads/6951f3b5-4950-4d9c-bf95-55f92fb12c5b.png"} alt={`${profileInfo.name || "Imran Usman Shaikh"} - ${profileInfo.title || "Senior Design Engineer"}`} className="w-full h-full object-contain rounded-xl" />
                  </div>
                </div>

                {/* Media Frame - Mobile View */}
                <div className="md:hidden relative">
                  <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-4 shadow-2xl">
                    <img src={profileInfo.profile_image || "/lovable-uploads/6951f3b5-4950-4d9c-bf95-55f92fb12c5b.png"} alt={`${profileInfo.name || "Imran Usman Shaikh"} - ${profileInfo.title || "Senior Design Engineer"}`} className="w-full h-full object-contain rounded-xl" />
                  </div>
                </div>

                {/* Tech Stack Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  📐
                </div>
                <div className="absolute -bottom-4 -left-4 w-18 h-18 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                  🏗️
                </div>
                <div className="absolute top-1/4 -left-6 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                  ⚙️
                </div>
                <div className="absolute bottom-1/4 -right-6 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                  🖥️
                </div>
                <div className="absolute top-8 right-1/4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                  📊
                </div>

                {/* Portfolio Skills Labels */}
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 flex-wrap">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">AutoCAD</span>
                  <span className="bg-secondary/10 px-3 py-1 rounded-full text-sm font-medium text-gray-50">STAAD Pro</span>
                  <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full text-sm font-medium">Revit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;