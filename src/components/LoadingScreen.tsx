import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_STEPS = [
 "INITIALIZING KERNEL",
 "ESTABLISHING SECURE CONNECTION",
 "SYNCING GLOBAL SUPPLY NODES",
 "VERIFYING MARKET INTEGRITY",
 "LOADING FARMER.COMPANY"
];

const taglineVariants: any = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: {
 staggerChildren: 0.08,
 delayChildren: 0.6,
 }
 }
};

const wordVariants: any = {
 hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
 visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

export const LoadingScreen = () => {
 const [progress, setProgress] = useState(0);
 const [stepIndex, setStepIndex] = useState(0);

 useEffect(() => {
 const duration = 2500; // Matches the timeout in App.tsx
 const intervalTime = 20;
 const steps = duration / intervalTime;
 let currentStep = 0;

 const interval = setInterval(() => {
 currentStep++;
 const newProgress = (currentStep / steps) * 100;
 setProgress(Math.min(newProgress, 100));

 if (currentStep >= steps) {
 clearInterval(interval);
 }
 }, intervalTime);

 const stepInterval = setInterval(() => {
 setStepIndex(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
 }, duration / LOADING_STEPS.length);

 return () => {
 clearInterval(interval);
 clearInterval(stepInterval);
 };
 }, []);

 return (
 <motion.div
 initial={{ opacity: 1 }}
 exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
 className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center overflow-hidden"
 >
 {/* Dynamic Background */}
 <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(29,185,84,0.15)_0%,rgba(0,0,0,0)_80%)]" />
 <div className="absolute inset-0 noise-bg opacity-30 mix-blend-overlay" />
 
 {/* Scanlines Effect for OS Terminal Vibe */}
 <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1] bg-[repeating-linear-gradient(transparent,transparent_2px,#000_2px,#000_4px)]" />

 {/* Massive Background Pulse */}
 <motion.div
 animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
 className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -mt-[400px] -ml-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
 />

 <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 max-w-5xl">
 
 {/* Core Typography */}
 <div className="flex flex-col items-center text-center gap-6">
 {/* Logo / Brand Name */}
 <div className="relative">
 <motion.h1 
 initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
 transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
 className="display text-5xl md:text-7xl lg:text-8xl font-light normal-case tracking-tight text-white flex flex-col md:flex-row justify-center items-center"
 >
 <span className="md:mr-3 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">FARMER</span>
 <span className="text-primary drop-shadow-[0_0_20px_rgba(29,185,84,0.2)]">.COMPANY</span>
 </motion.h1>
 </div>

 {/* Tagline Typewriter Effect */}
 <motion.div
 variants={taglineVariants}
 initial="hidden"
 animate="visible"
 className="w-full max-w-2xl"
 >
 <p className="mono text-xs md:text-sm lg:text-base text-white/70 normal-case leading-relaxed font-semibold flex flex-wrap justify-center gap-x-3 md:gap-x-4">
 {"The OS for Agriculture and Global Supply Chain".split(" ").map((word, index) => (
 <motion.span key={index} variants={wordVariants} className="inline-block">
 {word}
 </motion.span>
 ))}
 </p>
 </motion.div>
 </div>

 </div>

 {/* Loading Progress Interface */}
 <div className="absolute bottom-16 md:bottom-24 w-full max-w-md px-6 flex flex-col items-center gap-4 z-20">
 <div className="w-full flex justify-between items-end px-2 h-6 relative">
 <div className="flex-1 relative h-full flex items-end">
 <AnimatePresence>
 <motion.span 
 key={stepIndex}
 initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
 exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
 transition={{ duration: 0.2 }}
 className="absolute bottom-0 left-0 mono text-[10px] md:text-xs text-primary/80 normal-case font-medium whitespace-nowrap"
 >
 {LOADING_STEPS[stepIndex]}
 </motion.span>
 </AnimatePresence>
 </div>
 <motion.span className="mono text-[10px] md:text-xs text-white font-medium relative z-10 w-12 text-right font-mono tabular-nums">
 {Math.round(progress)}%
 </motion.span>
 </div>
 
 {/* High-tech Progress Bar */}
 <div className="h-1.5 md:h-2 w-full bg-white/5 rounded-full overflow-hidden relative backdrop-blur-sm border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]">
 <motion.div 
 className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_15px_rgba(29,185,84,0.8)]"
 style={{ width: `${progress}%` }}
 />
 {/* Shimmer Effect */}
 <motion.div
 animate={{ x: ["-100%", "300%"] }}
 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
 className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
 />
 </div>
 </div>

 </motion.div>
 );
};
