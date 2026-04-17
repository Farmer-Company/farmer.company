import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/src/lib/LanguageContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'ecosystem', path: '/' },
  { label: 'market', path: '/market' },
  { label: 'prices', path: '/prices' },
  { label: 'insights', path: '/insights' },
  { label: 'configure', path: '/configure' },
];

export const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar is visible if:
  // 1. Not on home page
  // 2. Scrolled on home page
  // 3. Hovering at top on home page
  const isVisible = !isHome || scrolled || isHovered;

  return (
    <>
      {/* Hover Trigger Zone (Home only) */}
      {isHome && (
        <div 
          className="fixed top-0 left-0 w-full h-10 z-[105] pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      )}

      <nav 
        className={`fixed top-0 left-0 z-[110] w-full px-12 py-8 flex flex-row justify-between items-center transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-12 pointer-events-none'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left - Logo */}
        <div className="flex-1 flex justify-start">
          <motion.div
            animate={isVisible ? { y: 0, opacity: 1, scale: 1 } : { y: 20, opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="pointer-events-auto"
          >
            <Link to="/" className="logo text-white font-black text-2xl tracking-tighter uppercase focus:outline-none flex items-center gap-1 group">
              <span className="bg-primary text-black px-1.5 leading-none py-0.5">FARMER</span>
              <span className="text-white group-hover:text-primary transition-colors">COMPANY</span>
            </Link>
          </motion.div>
        </div>

        {/* Center - Navigation Links */}
        <motion.div 
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex items-center gap-1 pointer-events-auto bg-black/40 backdrop-blur-2xl px-2 py-1.5 rounded-full border border-white/10 shadow-xl"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full mono text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 relative group ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-white/40 hover:text-white'
                }`}
              >
                {t(item.label)}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                )}
              </Link>
            );
          })}
        </motion.div>

        {/* Right - CTA & Lang */}
        <motion.div 
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="flex-1 flex justify-end"
        >
          <div className="flex items-center gap-6 pointer-events-auto bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 shadow-lg">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent border-none text-[10px] font-bold text-foreground-muted uppercase tracking-[2px] outline-none cursor-pointer hover:text-white"
            >
              <option value="en" className="bg-[#050505]">EN</option>
              <option value="hi" className="bg-[#050505]">हिन्दी</option>
              <option value="ta" className="bg-[#050505]">தமிழ்</option>
              <option value="kn" className="bg-[#050505]">ಕನ್ನಡ</option>
              <option value="te" className="bg-[#050505]">తెలుగు</option>
              <option value="mr" className="bg-[#050505]">मराठी</option>
              <option value="bn" className="bg-[#050505]">বাংলা</option>
            </select>
            
            <div className="w-px h-4 bg-white/10" />

            <button 
              onClick={() => navigate('/auth')}
              className="text-[11px] font-bold text-white uppercase tracking-[2px] hover:text-primary transition-colors cursor-pointer"
            >
              {t('signIn')}
            </button>
            <Button 
              variant="outline" 
              size="sm" 
              className="px-6 border-white/20 h-9 rounded-full hover:border-primary text-[10px] uppercase font-black tracking-widest"
              onClick={() => navigate('/auth')}
            >
              {t('getStarted')}
            </Button>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

