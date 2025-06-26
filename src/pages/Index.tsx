
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <ContactSection />
          </main>
          
          {/* Footer */}
          <footer className="bg-muted/30 py-8 border-t border-border">
            <div className="container mx-auto px-4">
              <div className="text-center text-muted-foreground">
                <p>&copy; 2025 Imran Usman Shaikh. All rights reserved.</p>
                <p className="text-sm mt-2">Senior Design Engineer | Civil & Structural Design Expert</p>
              </div>
            </div>
          </footer>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default Index;
