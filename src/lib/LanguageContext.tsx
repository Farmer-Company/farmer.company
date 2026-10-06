import React, { createContext, useContext } from 'react';
import { useLanguageStore } from '../stores/languageStore';

type Language = 'en' | 'hi' | 'ta' | 'kn' | 'te' | 'mr' | 'bn';

interface LanguageContextType {
 language: Language;
 setLanguage: (lang: Language) => void;
 suggestedLanguage: Language | null;
 t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const store = useLanguageStore();

 return (
 <LanguageContext.Provider value={{ ...store }}>
 {children}
 </LanguageContext.Provider>
 );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
 const context = useContext(LanguageContext);
 const store = useLanguageStore();
 if (!context) {
    return store;
 }
 return context;
};
