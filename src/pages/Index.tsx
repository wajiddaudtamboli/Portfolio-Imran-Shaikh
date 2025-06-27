import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { GoldThemeProvider } from '@/contexts/GoldThemeContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import { GoldParticles } from '@/components/GoldParticles';
const Index = () => {
  return <ThemeProvider>
      <GoldThemeProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-background text-foreground relative">
            <GoldParticles />
            <Header />
            <main className="relative z-10">
              <HeroSection />
              <AboutSection />
              <ContactSection />
            </main>
            
            {/* Premium Footer */}
            <footer className="py-8 border-t border-primary/20 relative bg-fuchsia-950">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              <div className="container mx-auto px-4">
                <div className="text-center text-muted-foreground">
                  <p className="text-lg font-medium mb-2">
                    &copy; 2025 <span className="gold-text font-bold">Imran Usman Shaikh</span>. All rights reserved.
                  </p>
                  <p className="text-sm">Senior Design Engineer | Civil & Structural Design Expert</p>
                  <div className="gold-divider max-w-md mx-auto mt-4" />
                </div>
              </div>
            </footer>
          </div>
        </LanguageProvider>
      </GoldThemeProvider>
    </ThemeProvider>;
};
export default Index;