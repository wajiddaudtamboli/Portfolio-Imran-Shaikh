
import React from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { GoldThemeProvider } from '@/contexts/GoldThemeContext';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import { GoldParticles } from '@/components/GoldParticles';

const Index = () => {
  return (
    <ThemeProvider>
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
            <Footer />
          </div>
        </LanguageProvider>
      </GoldThemeProvider>
    </ThemeProvider>
  );
};

export default Index;
