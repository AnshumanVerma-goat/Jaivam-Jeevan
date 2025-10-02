import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ml';

interface Translations {
  [key: string]: {
    en: string;
    ml: string;
  };
}

const translations: Translations = {
  welcome: { en: 'Welcome', ml: 'സ്വാഗതം' },
  login: { en: 'Login', ml: 'ലോഗിൻ' },
  signup: { en: 'Sign Up', ml: 'സൈൻ അപ്പ്' },
  email: { en: 'Email', ml: 'ഇമെയിൽ' },
  password: { en: 'Password', ml: 'പാസ്‌വേഡ്' },
  fullName: { en: 'Full Name', ml: 'പൂർണ്ണ നാമം' },
  dashboard: { en: 'Dashboard', ml: 'ഡാഷ്‌ബോർഡ്' },
  quests: { en: 'Quests', ml: 'ക്വസ്റ്റുകൾ' },
  leaderboard: { en: 'Leaderboard', ml: 'ലീഡർബോർഡ്' },
  chatbot: { en: 'Chatbot', ml: 'ചാറ്റ്‌ബോട്ട്' },
  games: { en: 'Games', ml: 'ഗെയിമുകൾ' },
  selectFarm: { en: 'Select Your Farm', ml: 'നിങ്ങളുടെ ഫാം തിരഞ്ഞെടുക്കുക' },
  createFarm: { en: 'Create New Farm', ml: 'പുതിയ ഫാം സൃഷ്ടിക്കുക' },
  farmName: { en: 'Farm Name', ml: 'ഫാം നാമം' },
  location: { en: 'Location', ml: 'സ്ഥലം' },
  soilType: { en: 'Soil Type', ml: 'മണ്ണിന്റെ തരം' },
  cropType: { en: 'Primary Crop', ml: 'പ്രാഥമിക വിള' },
  logout: { en: 'Logout', ml: 'ലോഗ്ഔട്ട്' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
