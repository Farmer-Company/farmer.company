import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroMapBackground = lazy(() => import('./HeroMapBackground'));

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
  };
};

export const HeroSection = () => {
  const navigate = useNavigate();
  const [shouldLoadMap, setShouldLoadMap] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const reducedData = window.matchMedia?.('(prefers-reduced-data: reduce)');
    const connection = (navigator as NavigatorWithConnection).connection;
    const slowConnection = connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType ?? '');

    if (reducedMotion.matches || reducedData?.matches || slowConnection) {
      return;
    }

    const idleWindow = window as IdleWindow;
    const load = () => setShouldLoadMap(true);
    const idleHandle = idleWindow.requestIdleCallback?.(load, { timeout: 1800 });
    const timeoutHandle = idleHandle ? undefined : window.setTimeout(load, 900);

    return () => {
      if (idleHandle && idleWindow.cancelIdleCallback) idleWindow.cancelIdleCallback(idleHandle);
      if (timeoutHandle) window.clearTimeout(timeoutHandle);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[#070b0a] flex items-center justify-center pt-16 md:pt-20 noise-bg">
      <div className="hero-map-static absolute inset-0 z-0" aria-hidden="true" />
      {shouldLoadMap && (
        <Suspense fallback={null}>
          <HeroMapBackground />
        </Suspense>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/78 to-[#070b0a]/8 hidden md:block z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b0a]/90 via-[#070b0a]/76 to-[#070b0a]/48 md:hidden z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/20 to-transparent z-[1] pointer-events-none" />

      <div className="absolute inset-0 z-[2] hidden md:block pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[25%] w-px bg-gradient-to-b from-white/12 via-white/5 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-white/12 via-white/5 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[75%] w-px bg-gradient-to-b from-white/12 via-white/5 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center md:items-start pt-4 md:pt-0 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full max-w-[280px] md:w-[220px] md:h-[220px] flex flex-col justify-center items-start md:items-center p-4 md:p-6 text-left md:text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] mb-6 md:mb-6 rounded-sm hero-glass-card"
        >
          <div className="absolute inset-0 pointer-events-none rounded-sm hero-glass-card-border" />
          <div className="text-white/60 text-[10px] md:text-[14px] mb-1.5 md:mb-3 tracking-widest font-mono">[ 2026 ]</div>
          <h3 className="text-white text-[13px] sm:text-[15px] md:text-[18px] leading-snug mb-1.5 md:mb-3 px-1">
            <span className="font-serif-italic text-[15px] sm:text-[19px] md:text-[24px]">Global Supply Chain</span> Protocol
          </h3>
          <p className="text-white/40 text-[8px] md:text-[11px] uppercase tracking-wider font-mono">CONNECTING ECOSYSTEMS</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center md:items-start gap-4 max-w-3xl"
        >
          <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest font-plus-jakarta">
            FARMER.COMPANY ECOSYSTEM
          </span>

          <h1 className="text-white font-extrabold uppercase tracking-normal leading-[1.02] hero-title">
            THE AGRICULTURAL <br className="hidden sm:block" />OPERATING <br className="hidden sm:block" />SYSTEM<span className="text-[#4ADE80]">.</span>
          </h1>

          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed w-full max-w-[90%] sm:max-w-lg md:max-w-xl mt-3 md:mt-4 font-inter">
            Connecting Farmers, Vendors, Logistics &amp; Customers. Zero Middlemen. Master your supply chain with real-time price intelligence and direct trade.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/signin')}
              className="flex min-h-14 items-center justify-center gap-3 bg-[#4ADE80] text-[#070b0a] uppercase font-bold text-[13px] tracking-wider rounded-full px-8 py-4 hover:bg-[#38c96f] transition-all duration-300 group font-inter"
            >
              GET STARTED
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
