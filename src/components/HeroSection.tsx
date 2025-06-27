
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail, Phone, Linkedin, Github, Twitter } from 'lucide-react';

const HeroSection = () => {
  const { translations } = useLanguage();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-background to-teal-50/30 dark:from-emerald-950/20 dark:via-background dark:to-teal-950/20" />
      <div className="absolute inset-0 opacity-10">
        <svg width="60" height="60" viewBox="0 0 60 60" className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="dots" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="2" fill="currentColor" fillOpacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>
      
      {/* Side Margins */}
      <div className="w-full max-w-8xl mx-auto px-8 lg:px-16 xl:px-24 py-32 relative z-10">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-xl text-emerald-700 dark:text-emerald-400 font-medium">
                  {translations.home.greeting}
                </p>
                <h1 className="text-6xl lg:text-8xl font-bold text-emerald-900 dark:text-emerald-100 leading-tight">
                  {translations.home.name}
                </h1>
                <h2 className="text-3xl lg:text-4xl font-semibold text-teal-700 dark:text-teal-300">
                  {translations.home.title}
                </h2>
                <p className="text-xl text-emerald-800 dark:text-emerald-200 leading-relaxed max-w-2xl">
                  {translations.home.subtitle}
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">5+</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">{translations.home.yearsExp}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">50+</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">3</div>
                  <div className="text-sm text-emerald-700 dark:text-emerald-300">Companies</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="h-14 px-10 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Download className="mr-2 h-5 w-5" />
                  {translations.home.downloadCV}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-10 border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-300 dark:hover:bg-emerald-950"
                  onClick={scrollToContact}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {translations.home.contactMe}
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <Phone className="h-4 w-4" />
                  <span>+91 8698839883</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                  <Mail className="h-4 w-4" />
                  <span>imraanshaikh039@gmail.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://www.linkedin.com/in/imran-shaikh-06785a3a00" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800 transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a 
                  href="mailto:imraanshaikh039@gmail.com" 
                  className="flex items-center gap-2 px-4 py-2 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full hover:bg-teal-200 dark:hover:bg-teal-800 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">Email</span>
                </a>
                <a 
                  href="tel:+918698839883" 
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Call</span>
                </a>
              </div>
            </div>

            {/* Profile Image with Tech Stack */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Media Frame - Desktop/Tablet View */}
                <div className="hidden md:block relative">
                  <div className="w-[450px] h-[450px] rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-800 dark:to-teal-900 p-6 shadow-2xl border-4 border-emerald-200 dark:border-emerald-700">
                    <img 
                      src="/lovable-uploads/6951f3b5-4950-4d9c-bf95-55f92fb12c5b.png" 
                      alt="Imran Usman Shaikh - Senior Design Engineer"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Media Frame - Mobile View */}
                <div className="md:hidden relative">
                  <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-800 dark:to-teal-900 p-4 shadow-2xl border-4 border-emerald-200 dark:border-emerald-700">
                    <img 
                      src="/lovable-uploads/6951f3b5-4950-4d9c-bf95-55f92fb12c5b.png" 
                      alt="Imran Usman Shaikh - Senior Design Engineer"
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>
                </div>

                {/* Tech Stack Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500 dark:bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  📐
                </div>
                <div className="absolute -bottom-4 -left-4 w-18 h-18 bg-teal-500 dark:bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                  🏗️
                </div>
                <div className="absolute top-1/4 -left-6 w-12 h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                  ⚙️
                </div>
                <div className="absolute bottom-1/4 -right-6 w-12 h-12 bg-emerald-600 dark:bg-emerald-700 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
                  🖥️
                </div>
                <div className="absolute top-8 right-1/4 w-10 h-10 bg-teal-600 dark:bg-teal-700 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                  📊
                </div>

                {/* Portfolio Skills Labels */}
                <div className="absolute -bottom-16 left-0 right-0 flex justify-center gap-2 flex-wrap">
                  <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">AutoCAD</span>
                  <span className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-medium">STAAD Pro</span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium">Revit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
