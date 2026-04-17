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

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/src/lib/LanguageContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
  // 4. Mobile menu is open
  const isVisible = !isHome || scrolled || isHovered || isMenuOpen;

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
        className={`fixed top-0 left-0 z-[110] w-full px-6 md:px-12 py-6 md:py-8 flex flex-row justify-between items-center transition-all duration-700 ${
          isVisible 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-12 pointer-events-none'
        } ${scrolled ? 'bg-background/80 backdrop-blur-xl border-b border-white/5' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left - Logo */}
        <div className="flex-1 flex justify-start z-[120]">
          <motion.div
            animate={isVisible ? { y: 0, opacity: 1, scale: 1 } : { y: 20, opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="pointer-events-auto"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="logo text-white font-black text-xl md:text-2xl tracking-tighter uppercase focus:outline-none flex items-center gap-1 group">
              <span className="bg-primary text-black px-1.5 leading-none py-0.5">FARMER</span>
              <span className="text-white group-hover:text-primary transition-colors hidden sm:inline">COMPANY</span>
            </Link>
          </motion.div>
        </div>

        {/* Center - Navigation Links (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-center">
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
        </div>

        {/* Right - Desktop Actions & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-4 z-[120]">
          {/* Desktop Right */}
          <motion.div 
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="hidden lg:flex items-center gap-6 pointer-events-auto bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 shadow-lg"
          >
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent border-none text-[10px] font-bold text-foreground-muted uppercase tracking-[2px] outline-none cursor-pointer hover:text-white"
              title="Select Interface Language"
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
              onClick={() => navigate('/signin')}
              className="text-[11px] font-bold text-white uppercase tracking-[2px] hover:text-primary transition-colors cursor-pointer"
            >
              {t('signIn')}
            </button>
            <Button 
              variant="outline" 
              size="sm" 
              className="px-6 border-white/20 h-9 rounded-full hover:border-primary text-[10px] uppercase font-black tracking-widest"
              onClick={() => navigate('/get-started')}
            >
              {t('getStarted')}
            </Button>
          </motion.div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-full text-white hover:border-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[115] bg-background flex flex-col p-10 pt-32 lg:hidden"
            >
              <div className="os-grid absolute inset-0 opacity-10 pointer-events-none" />
              
              <div className="flex flex-col gap-8 relative z-10">
                <span className="text-[10px] font-black text-primary uppercase tracking-[4px]">Navigation Matrix</span>
                <div className="flex flex-col gap-4">
                  {NAV_ITEMS.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link 
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-4xl font-black uppercase tracking-tighter hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-white'}`}
                      >
                        {t(item.label)}<span className="text-primary opacity-20 ml-2">.</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-white/5 my-4" />

                <div className="space-y-6">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[4px]">System Preferences</span>
                  <div className="flex items-center gap-4">
                    <Globe size={16} className="text-primary" />
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="bg-transparent border-none text-sm font-bold text-white uppercase tracking-[2px] outline-none"
                    >
                      <option value="en" className="bg-[#050505]">English</option>
                      <option value="hi" className="bg-[#050505]">Hindi</option>
                      <option value="ta" className="bg-[#050505]">Tamil</option>
                      {/* Add others as needed */}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <Button 
                    className="h-16 w-full text-xs font-black uppercase tracking-widest"
                    onClick={() => { navigate('/get-started'); setIsMenuOpen(false); }}
                  >
                    Initialize Protocol
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-16 w-full text-xs font-black uppercase tracking-widest border-white/10"
                    onClick={() => { navigate('/signin'); setIsMenuOpen(false); }}
                  >
                    Authorize Identity
                  </Button>
                </div>
              </div>

              <div className="mt-auto pt-10 text-center">
                <p className="mono text-[8px] text-white/20 uppercase tracking-[3px]">Digital Orchard Mobile Interface v1.0.4</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

