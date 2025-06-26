
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail, Phone } from 'lucide-react';

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
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
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
                  {translations.home.name}
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-primary">
                  {translations.home.title}
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
                <Button size="lg" className="h-12 px-8">
                  <Download className="mr-2 h-4 w-4" />
                  {translations.home.downloadCV}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-12 px-8"
                  onClick={scrollToContact}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {translations.home.contactMe}
                </Button>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+91 8698839883</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>imraanshaikh039@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <div className="w-72 h-72 lg:w-88 lg:h-88 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-6xl font-bold">
                    IS
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  3D
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  CAD
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
