import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/src/lib/languageStore';
import { X } from 'lucide-react';

export const LanguagePopup = () => {
 const { language, suggestedLanguage, setLanguage } = useLanguage();
 const [isVisible, setIsVisible] = useState(false);
 const popupRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 if (suggestedLanguage && suggestedLanguage !== language) {
 const timer = setTimeout(() => setIsVisible(true), 1500);
 return () => clearTimeout(timer);
 }
 }, [suggestedLanguage, language]);

 useEffect(() => {
 const handleClickOutside = (event: MouseEvent) => {
 if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
 setIsVisible(false);
 }
 };

 if (isVisible) {
 document.addEventListener('mousedown', handleClickOutside);
 }
 return () => {
 document.removeEventListener('mousedown', handleClickOutside);
 };
 }, [isVisible]);

 const langNames: Record<string, string> = {
 hi: 'हिन्दी',
 ta: 'தமிழ்',
 kn: 'ಕನ್ನಡ',
 te: 'తెలుగు',
 mr: 'मराठी',
 bn: 'বাংলা'
 };

 if (!suggestedLanguage || suggestedLanguage === language) return null;

 return (
 <AnimatePresence>
 {isVisible && (
 <motion.div
 ref={popupRef}
 initial={{ opacity: 0, y: -20, x: 20 }}
 animate={{ opacity: 1, y: 0, x: 0 }}
 exit={{ opacity: 0, scale: 0.95 }}
 className="fixed top-24 right-10 z-[100] w-72 bg-[#0D0D0D] border border-primary/30 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
 >
 <button 
 onClick={() => setIsVisible(false)}
 className="absolute top-3 right-3 text-foreground-muted hover:text-white transition-colors"
 >
 <X size={14} />
 </button>
 
 <div className="space-y-4">
 <div className="flex flex-col gap-1">
 <span className="text-[10px] font-medium text-primary normal-case ">Region Detected</span>
 <p className="text-sm font-medium text-white normal-case tracking-tight leading-snug">
 Switch to {langNames[suggestedLanguage]}?
 </p>
 </div>
 
 <div className="flex gap-3">
 <button
 onClick={() => {
 setLanguage(suggestedLanguage);
 setIsVisible(false);
 }}
 className="flex-1 bg-primary text-black text-[10px] font-medium normal-case py-2.5 hover:bg-white transition-colors"
 >
 Switch
 </button>
 <button
 onClick={() => setIsVisible(false)}
 className="flex-1 border border-white/10 text-white text-[10px] font-medium normal-case py-2.5 hover:border-white transition-colors"
 >
 Ignore
 </button>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 );
};
