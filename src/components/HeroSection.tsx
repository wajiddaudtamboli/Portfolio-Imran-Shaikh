
import React from 'react';
import { GoldButton } from '@/components/ui/gold-button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Mail, Phone, MapPin, Calendar, Award } from 'lucide-react';

const HeroSection = () => {
  const { translations } = useLanguage();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = () => {
    // Placeholder PDF download
    const link = document.createElement('a');
    link.href = '/placeholder-resume.pdf';
    link.download = 'Imran_Usman_Shaikh_Resume.pdf';
    link.click();
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Engineering Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop" 
            alt="Engineering blueprint background"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Blueprint grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100" height="100" viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <defs>
              <pattern id="blueprint" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="50" cy="50" r="2" fill="currentColor" fillOpacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blueprint)"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Professional Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Award className="h-5 w-5" />
                  <span>Senior Design Engineer</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                  <span className="luxury-heading">Imran Usman Shaikh</span>
                </h1>
                
                <h2 className="text-2xl lg:text-3xl font-semibold text-primary/80">
                  Transforming Concepts into Precision Structures
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  With 5+ years of expertise in civil and structural engineering, I specialize in 
                  steel design, scaffolding systems, and precision fabrication drawings. 
                  From concept to construction, I deliver engineering excellence.
                </p>
              </div>

              {/* Professional Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-card/50 rounded-lg border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-card/50 rounded-lg border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center p-4 bg-card/50 rounded-lg border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div className="text-center p-4 bg-card/50 rounded-lg border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>

              {/* Professional CTAs */}
              <div className="flex flex-wrap gap-4">
                <GoldButton 
                  goldVariant="luxury" 
                  size="lg" 
                  className="h-14 px-8"
                  onClick={downloadResume}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download My Resume
                </GoldButton>
                <GoldButton 
                  goldVariant="outline" 
                  size="lg" 
                  className="h-14 px-8"
                  onClick={scrollToContact}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Discuss Your Project
                </GoldButton>
              </div>

              {/* Quick Contact Info */}
              <div className="flex flex-wrap gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 8698839883</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>imraanshaikh039@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Pune, Maharashtra</span>
                </div>
              </div>
            </div>

            {/* Professional Profile Visual */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main profile container with engineering theme */}
                <div className="relative w-96 h-96 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border-2 border-primary/20 shadow-2xl">
                  {/* Placeholder professional photo */}
                  <div className="w-80 h-80 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                      alt="Professional Engineer Portrait"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Engineering badges */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    CAD
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                    5+ YRS
                  </div>
                  <div className="absolute top-4 -left-6 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-black font-bold text-xs shadow-lg">
                    3D
                  </div>
                </div>

                {/* Floating skill indicators */}
                <div className="absolute -right-8 top-1/4 transform -translate-y-1/2">
                  <div className="flex flex-col gap-3">
                    <div className="bg-card p-3 rounded-lg shadow-lg border border-primary/20">
                      <div className="text-xs text-muted-foreground">AutoCAD</div>
                      <div className="text-sm font-bold text-primary">Expert</div>
                    </div>
                    <div className="bg-card p-3 rounded-lg shadow-lg border border-primary/20">
                      <div className="text-xs text-muted-foreground">Structural</div>
                      <div className="text-sm font-bold text-primary">Advanced</div>
                    </div>
                  </div>
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
