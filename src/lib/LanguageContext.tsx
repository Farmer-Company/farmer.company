import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLanguageStore } from '@/src/stores/languageStore';

export type Language = 'en' | 'hi' | 'ta' | 'kn' | 'te' | 'mr' | 'bn';

interface LanguageContextType {
 language: Language;
 setLanguage: (lang: Language) => void;
 suggestedLanguage: Language | null;
 t: (key: string) => string;
}

export const translations: Record<Language, Record<string, string>> = {
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
 welcome: 'डिजिटल ऑर्चर्ड में आपका स्वागत है',
 grow: 'ऑर्चर्ड समृद्धि',
 pureGrowth: 'डिजिटल ऑर्चर्ड',
 balancing: 'भारतीय कृषि के लिए ओएस',
 heroHeadline: 'भारतीय कृषि के लिए ऑपरेटिंग सिस्टम',
 heroSubtitle: 'वास्तविक समय के बाजार मूल्य, एआई पूर्वानुमान, प्रत्यक्ष फार्म-टू-क्रेता बिक्री, और हर किसान के लिए एक स्थायी डिजिटल पोर्टफोलियो के लिए एक मंच।',
 signIn: 'साइन इन करें',
 getStarted: 'मुफ्त में शुरू करें',
 story: 'हमारी कहानी',
 market: 'बाजार',
 prices: 'कीमतें',
 insights: 'अंतर्दृष्टि',
 configure: 'कॉन्फ़िगर',
 farmersActive: 'सक्रिय किसान पोर्टफोलियो',
 avgPrice: 'शामिल बाजार',
 cheaper: 'ट्रैक की गई वस्तुएं',
 middlemen: '30-दिवसीय पूर्वानुमान सटीकता',
 role_farmer: 'किसान',
 role_vendor: 'विक्रेता / खरीदार',
 role_logistics: 'लॉजिस्टिक्स',
 role_government: 'सरकार',
 role_researcher: 'शोधकर्ता',
 role_admin: 'व्यवस्थापक',
 priceOS: 'मूल्य खुफिया',
 forecastOS: 'एआई पूर्वानुमान',
 routeOS: 'लॉजिस्टिक्स अनुकूलन',
 riskOS: 'जोखिम प्रबंधन',
 portfolioOS: 'किसान पोर्टफोलियो',
 supplyCRM: 'सप्लाई CRM',
 },
 ta: {
 welcome: 'டிஜிட்டல் ஆர்ச்சர்டுக்கு வரவேற்கிறோம்',
 grow: 'பழத்தோட்ட செழிப்பு',
 pureGrowth: 'டிஜிட்டல் ஆர்ச்சர்ட்',
 balancing: 'இந்திய விவசாயத்திற்கான OS',
 heroHeadline: 'இந்திய விவசாயத்திற்கான இயங்குதளம்',
 heroSubtitle: 'நிகழ்நேர சந்தை விலைகள், AI கணிப்புகள், நேரடி பண்ணை விற்பனை மற்றும் ஒவ்வொரு விவசாயிக்கும் நிரந்தர டிஜிட்டல் போர்ட்ஃபோலியோவிற்கான ஒரு தளம்.',
 signIn: 'உள்நுழைக',
 getStarted: 'இலவசமாகத் தொடங்குங்கள்',
 story: 'எங்கள் கதை',
 market: 'சந்தை',
 prices: 'விலைகள்',
 insights: 'நுண்ணறிவு',
 configure: 'கட்டமைக்கவும்',
 farmersActive: 'செயலில் உள்ள விவசாயி போர்ட்ஃபோலியோக்கள்',
 avgPrice: 'சந்தைகள் அடங்கும்',
 cheaper: 'பொருட்கள் கண்காணிக்கப்பட்டன',
 middlemen: '30-நாள் முன்னறிவிப்பு துல்லியம்',
 role_farmer: 'விவசாயி',
 role_vendor: 'விற்பனையாளர் / வாங்குபவர்',
 role_logistics: 'தளவாடங்கள்',
 role_government: 'அரசு',
 role_researcher: 'ஆராய்ச்சியாளர்',
 role_admin: 'நிர்வாகி',
 priceOS: 'விலை நுண்ணறிவு',
 forecastOS: 'AI கணிப்புகள்',
 routeOS: 'லாஜிஸ்டிக்ஸ் மேம்படுத்தல்',
 riskOS: 'இடர் மேலாண்மை',
 portfolioOS: 'விவசாயி போர்ட்ஃபோலியோ',
 supplyCRM: 'சப்ளை CRM',
 },
 kn: {
 welcome: 'ಡಿಜಿಟಲ್ ಆರ್ಚರ್ಡ್‌ಗೆ ಸುಸ್ವಾಗತ',
 grow: 'ಆರ್ಚರ್ಡ್ ಸಮೃದ್ಧಿ',
 pureGrowth: 'ಡಿಜಿಟಲ್ ಆರ್ಚರ್ಡ್',
 balancing: 'ಭಾರತೀಯ ಕೃಷಿಗಾಗಿ OS',
 heroHeadline: 'ಭಾರತೀಯ ಕೃಷಿಗಾಗಿ ಆಪರೇಟಿಂಗ್ ಸಿಸ್ಟಮ್',
 heroSubtitle: 'ನೈಜ-ಸಮಯದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು, AI ಮುನ್ಸೂಚನೆಗಳು, ನೇರ ಮಾರಾಟ, ಮತ್ತು ಪ್ರತಿ ರೈತರಿಗೆ ಶಾಶ್ವತ ಡಿಜಿಟಲ್ ಪೋರ್ಟ್‌ಫೋಲಿಯೊಗಾಗಿ ಒಂದು ವೇದಿಕೆ.',
 signIn: 'ಸೈನ್ ಇನ್',
 getStarted: 'ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ',
 story: 'ನಮ್ಮ ಕಥೆ',
 market: 'ಮಾರುಕಟ್ಟೆ',
 prices: 'ಬೆಲೆಗಳು',
 insights: 'ಒಳನೋಟಗಳು',
 configure: 'ಸಂರಚಿಸು',
 farmersActive: 'ಸಕ್ರಿಯ ರೈತ ಪೋರ್ಟ್‌ಫೋಲಿಯೊಗಳು',
 avgPrice: 'ಒಳಗೊಂಡಿರುವ ಮಾರುಕಟ್ಟೆಗಳು',
 cheaper: 'ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ ಸರಕುಗಳು',
 middlemen: '30-ದಿನದ ಮುನ್ಸೂಚನೆ ನಿಖರತೆ',
 role_farmer: 'ರೈತ',
 role_vendor: 'ಮಾರಾಟಗಾರ / ಖರೀದಿದಾರ',
 role_logistics: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್',
 role_government: 'ಸರ್ಕಾರ',
 role_researcher: 'ಸಂಶೋಧಕ',
 role_admin: 'ನಿರ್ವಾಹಕ',
 priceOS: 'ಬೆಲೆ ಬುದ್ಧಿಮತ್ತೆ',
 forecastOS: 'AI ಮುನ್ಸೂಚನೆಗಳು',
 routeOS: 'ಲಾಜಿಸ್ಟಿಕ್ಸ್ ಆಪ್ಟಿಮೈಸೇಶನ್',
 riskOS: 'ಅಪಾಯ ನಿರ್ವಹಣೆ',
 portfolioOS: 'ರೈತ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ',
 supplyCRM: 'ಪೂರೈಕೆ CRM',
 },
 te: {
 welcome: 'డిజిటల్ ఆర్చర్డ్‌కు స్వాగతం',
 grow: 'ఆర్చర్డ్ శ్రేయస్సు',
 pureGrowth: 'డిజిటల్ ఆర్చర్డ్',
 balancing: 'భారతీయ వ్యవసాయం కోసం OS',
 heroHeadline: 'భారతీయ వ్యవసాయం కోసం ఆపరేటింగ్ సిస్టమ్',
 heroSubtitle: 'నిజ-సమయ మార్కెట్ ధరలు, AI సూచనలు, ప్రత్యక్ష విక్రయాలు మరియు ప్రతి రైతుకు శాశ్వత డిజిటల్ పోర్ట్‌ఫోలియో కోసం ఒక వేదిక.',
 signIn: 'సైన్ ఇన్',
 getStarted: 'ఉచితంగా ప్రారంభించండి',
 story: 'మా కథ',
 market: 'మార్కెట్',
 prices: 'ధరలు',
 insights: 'అంతర్దృష్టులు',
 configure: 'ఆకృతీకరించు',
 farmersActive: 'క్రియాశీల రైతు పోర్ట్‌ఫోలియోలు',
 avgPrice: 'కవర్ చేయబడిన మార్కెట్లు',
 cheaper: 'ట్రాక్ చేయబడిన వస్తువులు',
 middlemen: '30-రోజుల సూచన ఖచ్చితత్వం',
 role_farmer: 'రైతు',
 role_vendor: 'విక్రేత / కొనుగోలుదారు',
 role_logistics: 'లాజిస్టిక్స్',
 role_government: 'ప్రభుత్వం',
 role_researcher: 'పరిశోధకుడు',
 role_admin: 'అడ్మినిస్ట్రేటర్',
 priceOS: 'ధర ఇంటెలిజెన్స్',
 forecastOS: 'AI సూచనలు',
 routeOS: 'లాజిస్టిక్స్ ఆప్టిమైజేషన్',
 riskOS: 'రిస్క్ మేనేజ్‌మెంట్',
 portfolioOS: 'రైతు పోర్ట్‌ఫోలియో',
 supplyCRM: 'సరఫరా CRM',
 },
 mr: {
 welcome: 'डिजिटल ऑर्चर्ड मध्ये आपले स्वागत आहे',
 grow: 'ऑर्चर्ड समृद्धी',
 pureGrowth: 'डिजिटल ऑर्चर्ड',
 balancing: 'भारतीय शेतीसाठी OS',
 heroHeadline: 'भारतीय शेतीसाठी ऑपरेटिंग सिस्टम',
 heroSubtitle: 'रिअल-टाइम बाजारभाव, AI अंदाज, थेट विक्री आणि प्रत्येक शेतकऱ्यासाठी कायमस्वरूपी डिजिटल पोर्टफोलिओसाठी एक व्यासपीठ.',
 signIn: 'साइन इन करा',
 getStarted: 'विनामूल्य सुरू करा',
 story: 'आमची कथा',
 market: 'बाजार',
 prices: 'किमती',
 insights: 'इनसाइट्स',
 configure: 'कॉन्फिगर करा',
 farmersActive: 'सक्रिय शेतकरी पोर्टफोलिओ',
 avgPrice: 'कव्हर केलेले बाजार',
 cheaper: 'ट्रॅक केलेल्या वस्तू',
 middlemen: '30-दिवसीय अंदाज अचूकता',
 role_farmer: 'शेतकरी',
 role_vendor: 'विक्रेता / खरेदीदार',
 role_logistics: 'लॉजिस्टिक्स',
 role_government: 'सरकार',
 role_researcher: 'संशोधक',
 role_admin: 'प्रशासक',
 priceOS: 'किंमत बुद्धिमत्ता',
 forecastOS: 'AI अंदाज',
 routeOS: 'लॉजिस्टिक्स ऑप्टिमायझेशन',
 riskOS: 'धोका व्यवस्थापन',
 portfolioOS: 'शेतकरी पोर्टफोलिओ',
 supplyCRM: 'पुरवठा CRM',
 },
 bn: {
 welcome: 'ডিজিটাল অর্চার্ডে স্বাগতম',
 grow: 'অর্চার্ড সমৃদ্ধি',
 pureGrowth: 'ডিজিটাল অর্চার্ড',
 balancing: 'ভারতীয় কৃষির জন্য OS',
 heroHeadline: 'ভারতীয় কৃষির জন্য অপারেটিং সিস্টেম',
 heroSubtitle: 'রিয়েল-টাইম বাজার মূল্য, এআই পূর্বাভাস, সরাসরি বিক্রয় এবং প্রতিটি কৃষকের জন্য একটি স্থায়ী ডিজিটাল পোর্টফোলিওর জন্য একটি প্ল্যাটফর্ম।',
 signIn: 'সাইন ইন করুন',
 getStarted: 'বিনামূল্যে শুরু করুন',
 story: 'আমাদের গল্প',
 market: 'বাজার',
 prices: 'দাম',
 insights: 'অন্তর্দৃষ্টি',
 configure: 'কনফিগার করুন',
 farmersActive: 'সক্রিয় কৃষক পোর্টফোলিও',
 avgPrice: 'কভার করা বাজার',
 cheaper: 'ট্র্যাক করা পণ্য',
 middlemen: '৩০ দিনের পূর্বাভাসের নির্ভুলতা',
 role_farmer: 'কৃষক',
 role_vendor: 'বিক্রেতা / ক্রেতা',
 role_logistics: 'লজিস্টিকস',
 role_government: 'সরকার',
 role_researcher: 'গবেষক',
 role_admin: 'অ্যাডমিনিস্ট্রেটর',
 priceOS: 'মূল্য বুদ্ধিমত্তা',
 forecastOS: 'এআই পূর্বাভাস',
 routeOS: 'লজিস্টিকস অপ্টিমাইজেশন',
 riskOS: 'ঝুঁকি ব্যবস্থাপনা',
 portfolioOS: 'কৃষক পোর্টফোলিও',
 supplyCRM: 'সাপ্লাই CRM',
 },
};

const LanguageContext = createContext<LanguageContextType>({
 language: 'en',
 setLanguage: () => {},
 suggestedLanguage: null,
 t: (key: string) => translations.en[key] || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const { language, setLanguage, t } = useLanguageStore();
 const [suggestedLanguage, setSuggestedLanguage] = useState<Language | null>(null);

 useEffect(() => {
   const getGeoLanguage = async () => {
     try {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(async (position) => {
           const { latitude, longitude } = position.coords;
           const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
           const data = await res.json();

           if (data.principalSubdivision) {
             const state = data.principalSubdivision.toLowerCase();
             let suggested: Language | null = null;

             if (state.includes('maharashtra')) suggested = 'mr';
             else if (state.includes('tamil nadu')) suggested = 'ta';
             else if (state.includes('karnataka')) suggested = 'kn';
             else if (state.includes('andhra') || state.includes('telangana')) suggested = 'te';
             else if (state.includes('west bengal')) suggested = 'bn';
             else if (['uttar pradesh', 'madhya pradesh', 'bihar', 'rajasthan', 'haryana', 'punjab'].some(s => state.includes(s))) suggested = 'hi';

             if (suggested && suggested !== language && !localStorage.getItem('language_dismissed')) {
               setSuggestedLanguage(suggested);
             }
           }
         });
       }
     } catch (e) {
       console.error('Failed to detect location language', e);
     }
   };

   if (!localStorage.getItem('preferred_language')) {
     getGeoLanguage();
   }
 }, [language]);

 return (
   <LanguageContext.Provider value={{
     language,
     setLanguage: (lang) => {
       setLanguage(lang);
       setSuggestedLanguage(null);
     },
     suggestedLanguage,
     t
   }}>
     {children}
   </LanguageContext.Provider>
 );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
