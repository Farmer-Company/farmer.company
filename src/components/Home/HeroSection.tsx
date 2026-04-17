import React from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue } from 'motion/react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const [textIndex, setTextIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState('');
  const [isDeleting, setIsDeleting] = React.useState(false);
  
  const strings = ["DIGITAL ORCHARD", "FARMER.COMPANY"];
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseDuration = 3000;

  React.useEffect(() => {
    const currentString = strings[textIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentString) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % strings.length);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentString.slice(0, displayText.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, textIndex]);

  // Split text for the two-line layout
  const splitIndex = displayText.indexOf(' ');
  const line1 = splitIndex !== -1 ? displayText.substring(0, splitIndex) : (displayText.includes('.') ? displayText.split('.')[0] : displayText);
  const line2 = splitIndex !== -1 ? displayText.substring(splitIndex + 1) : (displayText.includes('.') ? '.' + displayText.split('.')[1] : '');

  return (
    <section
      onMouseMove={handleMouseMove}
      className="bg-background relative overflow-hidden min-h-screen flex flex-col justify-center px-10 md:px-20 noise-bg cursor-default"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 os-grid opacity-20 pointer-events-none" />
      <div className="scanline" />

      {/* Interactive Focal Glow */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Vertical Meta */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden md:block z-20">
        <span className="vertical-meta">EST. 2026 / FARMER.COMPANY ORCHARD OS v.ALPHA</span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-0 text-white italic-serif-sub min-h-[20vw]">
            <h1 className="text-[10vw] font-black leading-[0.85] uppercase tracking-[-0.06em] select-none">
              {line1}<br />
              <span className="text-primary">{line2}</span>
              <span className="inline-block w-[2px] h-[0.8em] bg-primary ml-2 animate-pulse align-middle" />
            </h1>
          </div>
          <p className="pl-0 py-2 mt-12 display text-xl font-medium text-white/50 max-w-3xl uppercase tracking-[0.2em] leading-tight">
            {t('heroHeadline')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="ml-0 mt-8"
        >
          <p className="text-2xl font-light text-foreground-muted max-w-2xl leading-relaxed">
            {t('heroSubtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <div className="flex flex-col gap-2 p-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-sm">
              <span className="text-2xl">📊</span>
              <h3 className="mono text-[10px] font-bold text-primary uppercase tracking-widest">Price Intelligence</h3>
              <p className="text-xs text-white/40 leading-relaxed uppercase tracking-wider">Compare 3,000+ markets instantly</p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-sm">
              <span className="text-2xl">📈</span>
              <h3 className="mono text-[10px] font-bold text-primary uppercase tracking-widest">90-Day Forecasts</h3>
              <p className="text-xs text-white/40 leading-relaxed uppercase tracking-wider">Know exactly when to sell</p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-sm">
              <span className="text-2xl">🛒</span>
              <h3 className="mono text-[10px] font-bold text-primary uppercase tracking-widest">Direct Marketplace</h3>
              <p className="text-xs text-white/40 leading-relaxed uppercase tracking-wider">Sell directly without middlemen</p>
            </div>
            <div className="flex flex-col gap-2 p-6 bg-black/40 backdrop-blur-xl border border-white/5 rounded-sm">
              <span className="text-2xl">👨‍🌾</span>
              <h3 className="mono text-[10px] font-bold text-primary uppercase tracking-widest">Farmer Portfolio</h3>
              <p className="text-xs text-white/40 leading-relaxed uppercase tracking-wider">Your lifetime contribution, SKU-by-SKU</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute right-10 bottom-10 hidden lg:flex"
      >
        <div className="cta-orb group bg-primary/20 hover:bg-primary/40" onClick={() => navigate('/get-started')}>
          <span className="group-hover:text-white transition-colors cursor-pointer text-center">
            Join Beta<br />Free
          </span>
        </div>
      </motion.div>

      {/* Mobile CTAs */}
      <div className="md:hidden mt-12 flex flex-col gap-4">
        <Button variant="primary" onClick={() => navigate('/get-started')}>{t('getStarted')} →</Button>
        <Button variant="outline" onClick={() => navigate('/prices')}>{t('prices')}</Button>
      </div>
    </section>
  );
};

