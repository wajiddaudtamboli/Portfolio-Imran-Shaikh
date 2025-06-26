
import React, { createContext, useContext, useState, useEffect } from 'react';

interface GoldThemeContextType {
  goldIntensity: number;
  setGoldIntensity: (value: number) => void;
  texture: 'brushed' | 'foil' | 'gloss';
  setTexture: (texture: 'brushed' | 'foil' | 'gloss') => void;
  isPremium: boolean;
  togglePremium: () => void;
}

const GoldThemeContext = createContext<GoldThemeContextType | undefined>(undefined);

export const GoldThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goldIntensity, setGoldIntensity] = useState(70);
  const [texture, setTexture] = useState<'brushed' | 'foil' | 'gloss'>('foil');
  const [isPremium, setIsPremium] = useState(true);

  useEffect(() => {
    const savedIntensity = localStorage.getItem('goldIntensity');
    const savedTexture = localStorage.getItem('goldTexture');
    const savedPremium = localStorage.getItem('isPremium');
    
    if (savedIntensity) {
      setGoldIntensity(parseInt(savedIntensity));
    }
    
    if (savedTexture) {
      setTexture(savedTexture as 'brushed' | 'foil' | 'gloss');
    }
    
    if (savedPremium) {
      setIsPremium(savedPremium === 'true');
    }
  }, []);

  const handleSetGoldIntensity = (value: number) => {
    setGoldIntensity(value);
    localStorage.setItem('goldIntensity', value.toString());
  };

  const handleSetTexture = (newTexture: 'brushed' | 'foil' | 'gloss') => {
    setTexture(newTexture);
    localStorage.setItem('goldTexture', newTexture);
  };

  const togglePremium = () => {
    setIsPremium(prev => {
      const newValue = !prev;
      localStorage.setItem('isPremium', newValue.toString());
      return newValue;
    });
  };

  return (
    <GoldThemeContext.Provider 
      value={{ 
        goldIntensity, 
        setGoldIntensity: handleSetGoldIntensity, 
        texture, 
        setTexture: handleSetTexture,
        isPremium,
        togglePremium
      }}
    >
      {children}
    </GoldThemeContext.Provider>
  );
};

export const useGoldTheme = () => {
  const context = useContext(GoldThemeContext);
  if (context === undefined) {
    throw new Error('useGoldTheme must be used within a GoldThemeProvider');
  }
  return context;
};
