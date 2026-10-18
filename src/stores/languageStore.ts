import { create } from 'zustand';
import { translations, Language } from '@/src/lib/LanguageContext'; // We will refactor this shortly

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, variables?: Record<string, string>) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: (localStorage.getItem('preferred_language') as Language) || 'en',
  setLanguage: (lang) => {
    localStorage.setItem('preferred_language', lang);
    set({ language: lang });
  },
  t: (key, variables) => {
    const { language } = get();

    // Using the same logic from context for translation
    const keys = key.split('.');
    let translation: any = translations[language];

    for (const k of keys) {
      if (translation && typeof translation === 'object' && k in translation) {
        translation = translation[k];
      } else {
        // Fallback to English
        let enTranslation: any = translations['en'];
        for (const enK of keys) {
          if (enTranslation && typeof enTranslation === 'object' && enK in enTranslation) {
            enTranslation = enTranslation[enK];
          } else {
            return key; // Return key if not found in both
          }
        }
        translation = enTranslation;
        break;
      }
    }

    if (typeof translation !== 'string') return key;

    let result = translation;
    if (variables) {
      Object.entries(variables).forEach(([k, v]) => {
        result = result.replace(new RegExp(`{${k}}`, 'g'), v);
      });
    }

    return result;
  }
}));
