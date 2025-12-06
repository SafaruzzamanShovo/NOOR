import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  'nav.home': { en: 'Home', bn: 'হোম' },
  'nav.read': { en: 'Read Quran', bn: 'কুরআন পড়ুন' },
  'nav.ai_teacher': { en: 'AI Teacher', bn: 'এআই শিক্ষক' },
  'nav.emotions': { en: 'Emotion Search', bn: 'আবেগ অনুসন্ধান' },
  'nav.hifz': { en: 'Hifz Tracker', bn: 'হিফজ ট্র্যাকার' },
  'nav.settings': { en: 'Settings', bn: 'সেটিংস' },
  'nav.prayers': { en: 'Prayer Times', bn: 'নামাজের সময়' },
  'nav.dua': { en: 'Dua & Adhkar', bn: 'দুয়া ও জিকির' },
  'nav.library': { en: 'Library', bn: 'লাইব্রেরি' },
  
  'hero.title': { en: 'Continue Surah', bn: 'সূরা পড়া চালিয়ে যান' },
  'hero.subtitle': { en: 'You left off at Ayah', bn: 'আপনি আয়াত এ থেমেছিলেন' },
  'hero.cta': { en: 'Continue Reciting', bn: 'তিলাওয়াত করুন' },
  'hero.ask_ai': { en: 'Ask AI Teacher', bn: 'এআই কে প্রশ্ন করুন' },
  
  'surah.index': { en: 'Surah Index', bn: 'সূরা সূচী' },
  'surah.meccan': { en: 'Meccan', bn: 'মাক্কী' },
  'surah.medinan': { en: 'Medinan', bn: 'মাদানী' },
  
  'reader.tafsir': { en: 'Tafsir', bn: 'তাফসীর' },
  'reader.translation': { en: 'Translation', bn: 'অনুবাদ' },
  'reader.notes': { en: 'Notes', bn: 'নোট' },
  'reader.hadith': { en: 'Related Hadith', bn: 'সম্পর্কিত হাদিস' },
  'reader.shadow_mode': { en: 'Shadow Mode', bn: 'শ্যাডো মোড' },
  'reader.mushaf_mode': { en: 'Mushaf Mode', bn: 'মুসহাফ মোড' },
  
  'home.hadith_day': { en: 'Hadith of the Day', bn: 'আজকের হাদিস' },
  
  'emotions.title': { en: 'How are you feeling?', bn: 'আপনি কেমন অনুভব করছেন?' },
  'emotions.subtitle': { en: 'The Quran has a remedy for every heart.', bn: 'কুরআনে প্রতিটি হৃদয়ের জন্য নিরাময় রয়েছে।' },
  'emotions.back': { en: 'Back to emotions', bn: 'আবেগে ফিরে যান' },
  'emotions.for_when': { en: 'For when you feel', bn: 'যখন আপনি অনুভব করেন' },

  'library.title': { en: 'Islamic Library', bn: 'ইসলামিক লাইব্রেরি' },
  'library.request': { en: 'Request a Book', bn: 'বই অনুরোধ করুন' },
  'library.read': { en: 'Read Now', bn: 'এখন পড়ুন' },

  'dua.title': { en: 'Daily Duas', bn: 'প্রতিদিনের দুয়া' },
  'dua.category': { en: 'Category', bn: 'বিভাগ' },

  'prayers.next': { en: 'Next Prayer', bn: 'পরবর্তী নামাজ' },
  'prayers.location': { en: 'Dhaka, Bangladesh', bn: 'ঢাকা, বাংলাদেশ' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
