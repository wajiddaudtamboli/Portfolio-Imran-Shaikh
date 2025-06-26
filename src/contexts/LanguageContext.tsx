
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience", 
      projects: "Projects",
      skills: "Skills",
      education: "Education",
      contact: "Contact"
    },
    home: {
      greeting: "Hello, I'm",
      name: "Imran Usman Shaikh",
      title: "Senior Design Engineer",
      subtitle: "Specializing in Civil & Structural Design, 3D Modeling, and Production Engineering",
      yearsExp: "5+ Years Experience",
      downloadCV: "Download Resume",
      contactMe: "Contact Me"
    },
    about: {
      title: "About Me",
      description: "Experienced Senior Design Engineer with 5+ years of expertise in Civil & Structural Design, 3D Modeling, and Production Engineering. Specialized in AutoCAD, Revit Architecture, and STAAD Pro with extensive experience in steel engineering and scaffolding systems."
    },
    experience: {
      title: "Professional Experience",
      current: "Current Position",
      previous: "Previous Roles"
    },
    skills: {
      title: "Technical Skills",
      software: "Software Expertise",
      technical: "Technical Abilities"
    },
    education: {
      title: "Education & Certifications"
    },
    contact: {
      title: "Get In Touch",
      name: "Your Name",
      email: "Your Email",
      message: "Your Message",
      send: "Send Message",
      info: "Contact Information"
    }
  },
  hi: {
    nav: {
      home: "होम",
      about: "परिचय",
      experience: "अनुभव",
      projects: "प्रोजेक्ट्स",
      skills: "कौशल",
      education: "शिक्षा",
      contact: "संपर्क"
    },
    home: {
      greeting: "नमस्ते, मैं हूँ",
      name: "इमरान उस्मान शेख",
      title: "सीनियर डिज़ाइन इंजीनियर",
      subtitle: "सिविल और स्ट्रक्चरल डिज़ाइन, 3D मॉडलिंग और प्रोडक्शन इंजीनियरिंग में विशेषज्ञता",
      yearsExp: "5+ साल का अनुभव",
      downloadCV: "रिज्यूमे डाउनलोड करें",
      contactMe: "संपर्क करें"
    },
    about: {
      title: "मेरे बारे में",
      description: "5+ साल के अनुभव के साथ अनुभवी सीनियर डिज़ाइन इंजीनियर। सिविल और स्ट्रक्चरल डिज़ाइन, 3D मॉडलिंग और प्रोडक्शन इंजीनियरिंग में विशेषज्ञता। AutoCAD, Revit Architecture और STAAD Pro में दक्षता।"
    },
    experience: {
      title: "व्यावसायिक अनुभव",
      current: "वर्तमान पद",
      previous: "पिछली भूमिकाएं"
    },
    skills: {
      title: "तकनीकी कौशल",
      software: "सॉफ्टवेयर विशेषज्ञता",
      technical: "तकनीकी क्षमताएं"
    },
    education: {
      title: "शिक्षा और प्रमाणपत्र"
    },
    contact: {
      title: "संपर्क में रहें",
      name: "आपका नाम",
      email: "आपका ईमेल",
      message: "आपका संदेश",
      send: "संदेश भेजें",
      info: "संपर्क जानकारी"
    }
  },
  mr: {
    nav: {
      home: "मुख्यपृष्ठ",
      about: "माझ्याबद्दल",
      experience: "अनुभव",
      projects: "प्रकल्प",
      skills: "कौशल्ये",
      education: "शिक्षण",
      contact: "संपर्क"
    },
    home: {
      greeting: "नमस्कार, मी आहे",
      name: "इम्रान उस्मान शेख",
      title: "वरिष्ठ डिझाइन अभियंता",
      subtitle: "सिव्हिल आणि स्ट्रक्चरल डिझाइन, 3D मॉडेलिंग आणि प्रोडक्शन इंजिनीअरिंगमध्ये तज्ञता",
      yearsExp: "5+ वर्षांचा अनुभव",
      downloadCV: "रिझ्युमे डाउनलोड करा",
      contactMe: "संपर्क साधा"
    },
    about: {
      title: "माझ्याबद्दल",
      description: "5+ वर्षांच्या अनुभवासह अनुभवी वरिष्ठ डिझाइन अभियंता. सिव्हिल आणि स्ट्रक्चरल डिझाइन, 3D मॉडेलिंग आणि प्रोडक्शन इंजिनीअरिंगमध्ये तज्ञता. AutoCAD, Revit Architecture आणि STAAD Pro मध्ये दक्षता."
    },
    experience: {
      title: "व्यावसायिक अनुभव",
      current: "सध्याचे पद",
      previous: "मागील भूमिका"
    },
    skills: {
      title: "तांत्रिक कौशल्ये",
      software: "सॉफ्टवेअर तज्ञता",
      technical: "तांत्रिक क्षमता"
    },
    education: {
      title: "शिक्षण आणि प्रमाणपत्रे"
    },
    contact: {
      title: "संपर्कात रहा",
      name: "तुमचे नाव",
      email: "तुमचा ईमेल",
      message: "तुमचा संदेश",
      send: "संदेश पाठवा",
      info: "संपर्क माहिती"
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      translations: translations[language as keyof typeof translations]
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
