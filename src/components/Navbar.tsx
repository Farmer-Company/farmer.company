import React, { useState } from 'react';
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
  { label: 'supplyCRM', path: '/supply-crm' },
];

export const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-[110] w-full px-4 md:px-8 h-[44px] bg-black/80 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-border flex flex-row justify-between items-center transition-all duration-300 opacity-100 translate-y-0 pointer-events-auto">
        <div className="flex-1 flex justify-start z-[120]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pointer-events-auto"
          >
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="logo text-white font-medium text-sm md:text-base tracking-tight normal-case focus:outline-none flex items-center gap-[3px] group"
            >
              <span className="bg-primary text-black px-1.5 py-0.5 rounded-none leading-none">
                FARMER
              </span>
              <span className="text-white group-hover:text-primary transition-colors hidden sm:inline">
                COMPANY
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Center - Navigation Links (Desktop) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-8 pointer-events-auto"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[15px] font-normal tracking-[-0.016px] transition-colors duration-300 ${
                    isActive ? 'text-white font-medium' : 'text-white/45 hover:text-white'
                  }`}
                >
                  {t(item.label)}
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* Right - Desktop Actions & Mobile Toggle */}
        <div className="flex-1 flex justify-end items-center gap-4 z-[120]">
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
              <option value="en" className="bg-[#050505]">
                EN
              </option>
              <option value="hi" className="bg-[#050505]">
                हिन्दी
              </option>
              <option value="ta" className="bg-[#050505]">
                தமிழ்
              </option>
              <option value="kn" className="bg-[#050505]">
                ಕನ್ನಡ
              </option>
              <option value="te" className="bg-[#050505]">
                తెలుగు
              </option>
              <option value="mr" className="bg-[#050505]">
                मराठी
              </option>
              <option value="bn" className="bg-[#050505]">
                বাংলা
              </option>
            </select>

            <button
              onClick={() => navigate('/signin')}
              className="text-[13px] font-medium tracking-tight text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              {t('signIn')}
            </button>
            <Button
              variant="primary"
              size="md"
              className="h-8 text-[13px] px-4"
              onClick={() => navigate('/get-started')}
            >
              {t('getStarted')}
            </Button>
          </motion.div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-8 h-8 flex items-center justify-center text-white hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            title={isMenuOpen ? 'Close Menu' : 'Open Menu'}
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
                <span className="text-[10px] font-medium text-primary normal-case tracking-normal">
                  Navigation Matrix
                </span>
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
                        className={`text-3xl font-medium normal-case tracking-tight hover:text-primary transition-colors ${location.pathname === item.path ? 'text-primary' : 'text-white'}`}
                      >
                        {t(item.label)}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-white/5 my-4" />

                <div className="space-y-6">
                  <span className="text-[10px] font-medium text-white/20 normal-case tracking-normal">
                    System Preferences
                  </span>
                  <div className="flex items-center gap-4">
                    <Globe size={16} className="text-primary" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as any)}
                      className="bg-transparent border-none text-sm font-medium text-white normal-case tracking-[2px] outline-none"
                      title="Select Interface Language"
                    >
                      <option value="en" className="bg-[#050505]">
                        English
                      </option>
                      <option value="hi" className="bg-[#050505]">
                        Hindi
                      </option>
                      <option value="ta" className="bg-[#050505]">
                        Tamil
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-8">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full text-[15px]"
                    onClick={() => {
                      navigate('/get-started');
                      setIsMenuOpen(false);
                    }}
                  >
                    Initialize Protocol
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full text-[15px]"
                    onClick={() => {
                      navigate('/signin');
                      setIsMenuOpen(false);
                    }}
                  >
                    Authorize Identity
                  </Button>
                </div>
              </div>

              <div className="mt-auto pt-10 text-center">
                <p className="mono text-[8px] text-white/20 normal-case tracking-normal">
                  Digital Orchard Mobile Interface v1.0.4
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};
