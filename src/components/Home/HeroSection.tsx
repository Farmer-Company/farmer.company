import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const videoSrc = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: false, // Ensures stability in sandboxed environments
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log('Autoplay prevented', e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari native HLS support
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log('Autoplay prevented', e));
      });
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#070b0a] flex items-center justify-center pt-20">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0a]/50 to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-transparent to-transparent z-0 pointer-events-none" />

      {/* Grid Lines (25%, 50%, 75%) */}
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[25%] w-px bg-white/10" />
        <div className="absolute top-0 bottom-0 left-[50%] w-px bg-white/10" />
        <div className="absolute top-0 bottom-0 left-[75%] w-px bg-white/10" />
      </div>

      {/* Central Glow (Cyan/Dark Green hue) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-square pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
          <defs>
            <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>
          <ellipse cx="50" cy="20" rx="30" ry="10" fill="#4ADE80" filter="url(#glow-blur)" />
          <ellipse cx="50" cy="20" rx="40" ry="15" fill="#0EA5E9" filter="url(#glow-blur)" opacity="0.3" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center items-center md:items-start pt-12 md:pt-0 text-center md:text-left">
        
        {/* Liquid Glass Card */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-[200px] h-[200px] flex flex-col justify-center items-center p-6 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] mb-8 rounded-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.01)',
            backgroundBlendMode: 'luminosity',
            backdropFilter: 'blur(4px)',
            transform: 'translateY(-50px)'
          }}
        >
          {/* Border Effect via pseudo-element simulation */}
          <div className="absolute inset-0 pointer-events-none rounded-sm"
               style={{
                 padding: '1.4px',
                 background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)',
                 WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                 WebkitMaskComposite: 'xor',
                 maskComposite: 'exclude',
               }}
          />
          <div className="text-white/60 text-[14px] mb-3 tracking-widest font-mono">[ 2026 ]</div>
          <h3 className="text-white text-[18px] leading-snug mb-3">
            <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400, fontSize: '22px' }}>Global Supply Chain</span> Protocol
          </h3>
          <p className="text-white/40 text-[11px] uppercase tracking-wider font-mono">Connecting Ecosystems</p>
        </motion.div>

        {/* Hero Typography */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center md:items-start gap-5 max-w-3xl"
        >
          <span 
            className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest"
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            2026 · Global Supply Chain Protocol
          </span>
          
          <h1 
            className="text-white font-extrabold uppercase tracking-tighter leading-[1.05]"
            style={{ 
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)'
            }}
          >
            THE OPERATING SYSTEM FOR FOOD & FMCG<span className="text-[#4ADE80]">.</span>
          </h1>
          
          <p 
            className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-[700px]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Connecting farmers, FMCG brands, logistics and global buyers in a single, real-time protocol—starting in India, built for the world.
          </p>

          <p 
            className="text-white/70 text-[14px] leading-relaxed max-w-[600px]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Zero middlemen. Live price intelligence. Guaranteed, escrow-backed payments at the farm gate.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full md:w-auto">
            <button 
              onClick={() => navigate('/get-started')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#4ADE80] text-[#070b0a] uppercase font-bold text-[13px] tracking-wider rounded-sm px-10 py-4 hover:bg-white transition-all duration-300 transform hover:scale-105 group"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Join Beta — Free
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/market')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/5 border border-white/20 text-white uppercase font-bold text-[13px] tracking-wider rounded-sm px-10 py-4 hover:bg-white/10 transition-all duration-300"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Explore Live Markets
            </button>
          </div>
          
          <p className="text-white/40 text-[11px] font-medium tracking-wide mt-2 text-center md:text-left">
            For farmers, vendors, logistics, FMCG brands, retailers and researchers. One protocol, different dashboards.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
