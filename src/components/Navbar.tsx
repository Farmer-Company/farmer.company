import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/src/lib/LanguageContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const STAKEHOLDER_NAV = [
  { label: 'For Farmers', path: '/farmers' },
  { label: 'For Vendors', path: '/vendors' },
  { label: 'For Logistics', path: '/logistics' },
  { label: 'For Researchers', path: '/story' },
  { label: 'Global Buyers', path: '/customers' },
];

const PLATFORM_NAV = [
  { label: 'Market Data', path: '/market' },
  { label: 'Prices', path: '/prices' },
  { label: 'Insights', path: '/insights' },
  { label: 'Configure', path: '/configure' },
  { label: 'Supply CRM', path: '/supply-crm' },
];

export const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);

  return (
    <>
      <nav 
        className="fixed top-0 left-0 z-[110] w-full px-4 md:px-8 h-[56px] bg-black/80 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-border flex flex-row justify-between items-center transition-all duration-300 opacity-100 translate-y-0 pointer-events-auto"
      >
        <div className="flex-none z-[120]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-auto"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="logo text-white font-medium text-sm md:text-base tracking-tight normal-case focus:outline-none flex items-center gap-[3px] group">
              <span className="bg-primary text-black px-1.5 py-0.5 rounded-none leading-none">FARMER</span>
              <span className="text-white group-hover:text-primary transition-colors hidden sm:inline">COMPANY</span>
            </Link>
          </motion.div>
        </div>

        {/* Center - Navigation Links (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-6 pointer-events-auto"
          >
            {STAKEHOLDER_NAV.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.path}
                  to={item.path}
                  className={`text-[14px] font-normal tracking-tight transition-colors duration-300 ${
                    isActive ? 'text-white font-medium' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t(item.label)}
                </Link>
              );
            })}

            <div 
              className="relative"
              onMouseEnter={() => setIsPlatformOpen(true)}
              onMouseLeave={() => setIsPlatformOpen(false)}
            >
              <button className="text-[14px] font-normal tracking-tight text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-1 py-4">
                {t('Platform')} <ChevronDown size={14} className={`transition-transform ${isPlatformOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isPlatformOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 min-w-[180px] bg-[#0A0A0A] border border-white/10 p-2 shadow-2xl flex flex-col gap-1"
                  >
                    {PLATFORM_NAV.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="px-4 py-2 text-[14px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setIsPlatformOpen(false)}
                      >
                        {t(item.label)}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Right - Desktop Actions & Mobile Toggle */}
        <div className="flex-none flex justify-end items-center gap-4 z-[120]">
          {/* Desktop Right */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden lg:flex items-center gap-6 pointer-events-auto"
          >
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent border-none text-[13px] font-normal text-white/45 hover:text-white outline-none cursor-pointer"
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
            
            <button 
              onClick={() => navigate('/signin')}
              className="text-[13px] font-medium tracking-tight text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              {t('signIn')}
            </button>
            <Button 
              variant="primary"
              size="md"
              className="h-8 text-[13px] px-4"
              onClick={() => navigate('/get-started')}
            >
              Join Beta — Free
            </Button>
          </motion.div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors"
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
              className="fixed inset-0 z-[115] bg-background flex flex-col p-10 pt-32 lg:hidden overflow-y-auto"
            >
              <div className="os-grid absolute inset-0 opacity-10 pointer-events-none" />
              
              <div className="flex flex-col gap-8 relative z-10">
                <span className="text-[10px] font-medium text-primary normal-case tracking-normal">Stakeholders</span>
                <div className="flex flex-col gap-4">
                  {STAKEHOLDER_NAV.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link 
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-3xl font-medium normal-case tracking-tight hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-white'}`}
                      >
                        {t(item.label)}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-white/5 my-2" />

                <span className="text-[10px] font-medium text-primary normal-case tracking-normal">Platform Tools</span>
                <div className="grid grid-cols-2 gap-4">
                  {PLATFORM_NAV.map((item, idx) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                    >
                      <Link 
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-[16px] font-medium normal-case tracking-tight hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-white/60'}`}
                      >
                        {t(item.label)}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-white/5 my-4" />

                <div className="space-y-6">
                  <span className="text-[10px] font-medium text-white/20 normal-case tracking-normal">System Preferences</span>
                  <div className="flex items-center gap-4">
                    <Globe size={16} className="text-primary" />
                    <select 
                      value={language} 
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="bg-transparent border-none text-sm font-medium text-white normal-case tracking-[2px] outline-none"
                      title="Select Interface Language"
                    >
                      <option value="en" className="bg-[#050505]">English</option>
                      <option value="hi" className="bg-[#050505]">Hindi</option>
                      <option value="ta" className="bg-[#050505]">Tamil</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-8 pb-10">
                  <Button 
                    variant="primary"
                    size="lg"
                    className="w-full text-[15px]"
                    onClick={() => { navigate('/get-started'); setIsMenuOpen(false); }}
                  >
                    Join Beta — Free
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg"
                    className="w-full text-[15px]"
                    onClick={() => { navigate('/signin'); setIsMenuOpen(false); }}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

