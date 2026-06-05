import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const scrollToRoles = () => {
    document.getElementById('role-selector')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';
    let hls: Hls | null = null;

    const handleSafariPlay = () => {
      video.play().catch(e => console.log('Autoplay prevented', e));
    };

    if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: false,
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log('Autoplay prevented', e));
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', handleSafariPlay);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
      video.removeEventListener('loadedmetadata', handleSafariPlay);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden bg-[#070b0a] flex items-center justify-center pt-16 md:pt-20 noise-bg">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/80 to-transparent hidden md:block z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[#070b0a]/75 md:hidden z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a]/30 to-transparent z-0 pointer-events-none" />

      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[25%] w-px bg-gradient-to-b from-white/12 via-white/5 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-gradient-to-b from-white/12 via-white/5 to-transparent" />
        <div className="absolute top-0 bottom-0 left-[75%] w-px bg-gradient-to-b from-white/12 via-white/5 to-transparent" />
      </div>

      <div className="absolute top-0 left-1/2 w-full max-w-[800px] aspect-square pointer-events-none z-0 opacity-55 blur-[130px] hero-central-glow" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center md:items-start pt-6 md:pt-0 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-[130px] h-[130px] sm:w-[155px] sm:h-[155px] md:w-[220px] md:h-[220px] flex flex-col justify-center items-center p-3 md:p-6 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] mb-6 md:mb-8 rounded-sm hero-glass-card"
        >
          <div className="absolute inset-0 pointer-events-none rounded-sm hero-glass-card-border" />
          <div className="text-white/60 text-[10px] md:text-[14px] mb-1.5 md:mb-3 tracking-widest font-mono">[ 2026 ]</div>
          <h3 className="text-white text-[13px] sm:text-[15px] md:text-[18px] leading-snug mb-1.5 md:mb-3 px-1">
            <span className="font-serif-italic text-[15px] sm:text-[19px] md:text-[24px]">Global Supply Chain</span> Protocol
          </h3>
          <p className="text-white/40 text-[8px] md:text-[11px] uppercase tracking-wider font-mono">Connecting Ecosystems</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center md:items-start gap-5 max-w-3xl"
        >
          <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest font-plus-jakarta">
            GLOBAL SUPPLY CHAIN PROTOCOL
          </span>

          <h1 className="text-white font-extrabold uppercase tracking-tighter leading-[1.05] hero-title">
            THE AGRICULTURAL <br className="hidden lg:block" />OPERATING SYSTEM<span className="text-[#4ADE80]">.</span>
          </h1>

          <p className="text-white/70 text-sm sm:text-base md:text-lg leading-relaxed w-full max-w-[90%] sm:max-w-lg md:max-w-xl mt-4 md:mt-6 font-inter">
            Autonomous AI orchestration for global supply chains, starting from the farm gate. Predict pricing, match supply to verified demand, coordinate logistics, and settle trade through escrow-backed workflows.
          </p>

          <p className="text-white/90 text-[15px] md:text-[17px] font-medium leading-relaxed w-full max-w-[90%] sm:max-w-lg md:max-w-xl mt-2 border-l-2 border-[#4ADE80] pl-4 font-inter">
            For farmers, retailers, MSMEs, vendors, logistics fleets, researchers and global buyers who want direct agri trade with AI agents managing the complexity.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/signin')}
              className="flex items-center justify-center gap-3 bg-[#4ADE80] text-[#070b0a] uppercase font-bold text-[13px] tracking-wider rounded-full px-8 py-4 hover:bg-[#38c96f] transition-all duration-300 transform hover:scale-105 group font-inter"
            >
              Join Beta - Free
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToRoles}
              className="flex items-center justify-center gap-3 bg-white/5 text-white border border-white/15 uppercase font-bold text-[13px] tracking-wider rounded-full px-8 py-4 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group font-inter"
            >
              Get started - Choose your role
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="mt-4 text-white/50 text-[12px] font-inter">
            Early access for Tamil Nadu farmers, logistics fleets and FMCG partners.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
