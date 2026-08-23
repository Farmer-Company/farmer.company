import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'ta' | 'kn' | 'te' | 'mr' | 'bn';

interface LanguageContextType {
 language: Language;
 setLanguage: (lang: Language) => void;
 suggestedLanguage: Language | null;
 t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
 en: {
 welcome: 'Welcome to Digital Orchard',
 grow: 'Orchard Prosperity',
 pureGrowth: 'Digital Orchard',
 balancing: 'The OS for Indian Agriculture',
 heroHeadline: 'The Operating System for Indian Agriculture',
 heroSubtitle: 'One platform for real‑time market prices, AI forecasts, direct farm‑to-buyer sales, and a permanent digital portfolio for every farmer.',
 signIn: 'Sign In',
 getStarted: 'Join Beta – Free',
 story: 'Our Story',
 market: 'Market',
 prices: 'Prices',
 insights: 'Insights',
 configure: 'Configure',
 farmersActive: 'Active Farmer Portfolios',
 avgPrice: 'Markets Covered',
 cheaper: 'Commodities Tracked',
 middlemen: '30‑Day Forecast Accuracy',
 role_farmer: 'Farmer',
 role_vendor: 'Retailer / Buyer / Vendor',
 role_logistics: 'Logistics Partner',
 role_government: 'Government',
 role_researcher: 'Researcher',
 role_admin: 'Administrator',
 priceOS: 'Price Intelligence',
 forecastOS: 'AI Forecasts',
 routeOS: 'Logistics Optimization',
 riskOS: 'Risk Management',
 portfolioOS: 'Farmer Portfolio',
 supplyCRM: 'Supply CRM',
 },
 hi: {
 welcome: 'Digital Orchard में आपका स्वागत है',
 grow: 'ऑपरेटिंग सिस्टम',
 pureGrowth: 'कृषि ऑपरेटिंग सिस्टम',
 balancing: 'किसान को संतुलित करना',
 heroSubtitle: 'भारत के लिए प्रत्यक्ष खरीद, अनुकूलित लॉजिस्टिक्स और पारदर्शी बाज़ार प्रोटोकॉल।',
 signIn: 'साइन इन करें',
 getStarted: 'शुरू करें',
 market: 'बाज़ार',
 prices: 'कीमतें',
 insights: 'अन्तर्दृष्टि',
 configure: 'कॉन्फ़िगर करें',
 farmersActive: 'सक्रिय किसान',
 avgPrice: 'औसत फार्म गेट मूल्य',
 cheaper: 'खरीददारों के लिए सस्ता',
 middlemen: 'बिचौलिए',
 supplyCRM: 'आपूर्ति CRM',
 },
 ta: {
 welcome: 'Digital Orchard-க்கு வரவேற்கிறோம்',
 grow: 'இயக்க முறைமை',
 pureGrowth: 'வேளாண் இயக்க முறைமை',
 balancing: 'விவசாயியை சமநிலைப்படுத்துதல்',
 heroSubtitle: 'இந்தியாவிற்கான நேரடி கொள்முதல், உகந்த தளவாடங்கள் மற்றும் வெளிப்படையான சந்தை நெறிமுறைகள்.',
 signIn: 'உள்நுழைய',
 getStarted: 'தொடங்கவும்',
 market: 'சந்தை',
 prices: 'விலைகள்',
 insights: 'நுண்ணறிவு',
 configure: 'கட்டமைக்கவும்',
 farmersActive: 'செயலில் உள்ள விவசாயிகள்',
 avgPrice: 'சராசரி பண்ணை விலை',
 cheaper: 'வாங்குபவர்களுக்கு மலிவானது',
 middlemen: 'இடைத்தரகர்கள்',
 supplyCRM: 'வழங்கல் CRM',
 },
 kn: {
 welcome: 'Digital Orchard ಗೆ ಸ್ವಾಗತ',
 grow: 'ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್',
 pureGrowth: 'ಕೃಷಿ ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್',
 balancing: 'ರೈತರನ್ನು ಸಮತೋಲನಗೊಳಿಸುವುದು',
 heroSubtitle: 'ನೇರ ಸಂಗ್ರಹಣೆ, ಆಪ್ಟಿಮೈಸ್ಡ್ ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಮತ್ತು ಭಾರತಕ್ಕಾಗಿ ಪಾರದರ್ಶಕ ಮಾರುಕಟ್ಟೆ ಪ್ರೋಟೋಕಾಲ್ಗಳು.',
 signIn: 'ಸೈನ್ ಇನ್',
 getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
 market: 'ಮಾರುಕಟ್ಟೆ',
 prices: 'ಬೆಲೆಗಳು',
 insights: 'ಒಳನೋಟಗಳು',
 configure: 'ಕಾನ್ಫಿಗರ್ ಮಾಡಿ',
 farmersActive: 'ಸಕ್ರಿಯ ರೈತರು',
 avgPrice: 'ಸರಾಸರಿ ಫಾರ್ಮ್ ಗೇಟ್ ಬೆಲೆ',
 cheaper: 'ಖರೀದಿದಾರರಿಗೆ ಅಗ್ಗ',
 middlemen: 'ಮಧ್ಯವರ್ತಿಗಳು',
 },
 te: {
 welcome: 'Digital Orchard కి స్వాగతం',
 grow: 'ఆపరేటింగ్ సిస్టమ్',
 pureGrowth: 'అగ్రి ఆపరేటింగ్ సిస్టమ్',
 balancing: 'రైతును సమతుల్యం చేయడం',
 heroSubtitle: 'నేరుగా సేకరణ, ఆప్టిమైజ్ చేసిన లాజిస్టిక్స్ మరియు భారతదేశం కోసం పారదర్శక మార్కెట్ ప్రోటోకాల్‌లు.',
 signIn: 'సైన్ ఇన్',
 getStarted: 'ప్రారంభించండి',
 market: 'మార్కెట్',
 prices: 'ధరలు',
 insights: 'అంతర్దృష్టులు',
 configure: 'కాన్ఫಿಗర్ చేయండి',
 farmersActive: 'క్రియాశీల రైతులు',
 avgPrice: 'సగటు ఫార్మ్ గేట్ ధర',
 cheaper: 'కొనుగోలుదారులకు చౌక',
 middlemen: 'మధ్యవర్తులు',
 },
 mr: {
 welcome: 'Digital Orchard मध्ये आपले स्वागत आहे',
 grow: 'ऑपरेटिंग सिस्टीम',
 pureGrowth: 'अ‍ॅग्री ऑपरेटिंग सिस्टीम',
 balancing: 'शेतकऱ्याला संतुलित करणे',
 heroSubtitle: 'थेट खरेदी, अनुकूल लॉजिस्टिक आणि भारतासाठी पारदर्शक मार्केटप्लेस प्रोटोकॉल.',
 signIn: 'साइन इन करा',
 getStarted: 'सुरू करा',
 market: 'बाजार',
 prices: 'किंमती',
 insights: 'अंतर्दृष्टी',
 configure: 'कॉन्फ़िगर करा',
 farmersActive: 'सक्रिय शेतकरी',
 avgPrice: 'सरासरी फार्म गेट किंमत',
 cheaper: 'खरेदीदारांसाठी स्वस्त',
 middlemen: 'मध्यस्थ',
 },
 bn: {
 welcome: 'Digital Orchard-তে স্বাগতম',
 grow: 'অপারেটিং সিস্টেম',
 pureGrowth: 'অগ্ৰি অপারেটিং সিস্টেম',
 balancing: 'কৃষককে ভারসাম্যপূর্ণ করা',
 heroSubtitle: 'ভারতের জন্য সরাসরি ক্রয়, অপ্টিমাইজড লজিস্টিক এবং স্বচ্ছ মার্কেটপ্লেস প্রোটোকল।',
 signIn: 'সাইন ইন করুন',
 getStarted: 'শুরু করুন',
 market: 'বাজার',
 prices: 'দাম',
 insights: 'অন্তর্দৃষ্টি',
 configure: 'কনফিগার করুন',
 farmersActive: 'সক্রিয় কৃষক',
 avgPrice: 'গড় খামার মূল্য',
 cheaper: 'ক্রেতাদের জন্য সস্তা',
 middlemen: 'মধ্যস্বত্বভোগী',
 }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [language, setLanguageState] = useState<Language>(() => {
 if (typeof window !== 'undefined') {
 const stored = localStorage.getItem('farmer-company-language');
 if (stored) return stored as Language;
 }
 return 'en';
 });

 const setLanguage = (lang: Language) => {
 setLanguageState(lang);
 if (typeof window !== 'undefined') {
 localStorage.setItem('farmer-company-language', lang);
 }
 };
 
 const [suggestedLanguage, setSuggestedLanguage] = useState<Language | null>(null);

 useEffect(() => {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition((position) => {
 const { latitude, longitude } = position.coords;
 let detected: Language | null = null;
 
 if (latitude >= 8 && latitude <= 14 && longitude >= 76 && longitude <= 81) detected = 'ta';
 else if (latitude >= 11 && latitude <= 19 && longitude >= 74 && longitude <= 78.5) detected = 'kn';
 else if (latitude >= 15.5 && latitude <= 22 && longitude >= 72.5 && longitude <= 81) detected = 'mr';
 else if (latitude >= 12 && latitude <= 19.5 && longitude >= 77 && longitude <= 85) detected = 'te';
 else if (latitude >= 21.5 && latitude <= 27.5 && longitude >= 85.5 && longitude <= 90) detected = 'bn';
 else if (latitude >= 20 && latitude <= 37 && longitude >= 68 && longitude <= 97) detected = 'hi';

 if (detected && detected !== language) {
 setSuggestedLanguage(detected);
 }
 });
 }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const t = (key: string) => {
 return translations[language][key] || translations['en'][key] || key;
 };

 return (
 <LanguageContext.Provider value={{ language, setLanguage, suggestedLanguage, t }}>
 {children}
 </LanguageContext.Provider>
 );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
 const context = useContext(LanguageContext);
 if (!context) throw new Error('useLanguage must be used within LanguageProvider');
 return context;
};
