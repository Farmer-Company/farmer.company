import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LOADING_STEPS = [
  "Establishing Secure Connection",
  "Syncing Global Supply Nodes",
  "Verifying Market Integrity",
  "Loading Digital Orchard"
];

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const duration = 1500; // Matches the timeout in App.tsx
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
      exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle Grain & Gradient Background */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(29,185,84,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 noise-bg opacity-20" />

      {/* Floating Network Nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              scale: [0.8, 1.2, 0.8],
              x: Math.sin(i * 45) * 150,
              y: Math.cos(i * 45) * 150
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-48 h-48 -mt-24 -ml-24 bg-primary/5 rounded-full blur-[40px]"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-8">
        
        {/* Brand Reveal */}
        <div className="mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-2"
          >
            {/* Minimalist Crest / Logo Mark */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mb-8 relative flex items-center justify-center"
            >
              <div className="absolute inset-0 border border-white/5 rounded-full" />
              <div className="absolute inset-3 border border-primary/20 rounded-full border-t-primary" />
              <div className="absolute inset-6 border border-white/10 rounded-full border-b-white/40" />
              <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_12px_rgba(29,185,84,1)]" />
            </motion.div>

            <h1 className="display text-3xl font-black uppercase tracking-tight text-white flex items-center gap-1">
              DIGITAL<span className="text-primary">ORCHARD</span>
            </h1>
            <p className="mono text-[9px] text-white/40 tracking-[0.4em] uppercase mt-2">B2B Agricultural OS</p>
          </motion.div>
        </div>

        {/* Elegant Progress Line */}
        <div className="w-full space-y-4">
          <div className="flex justify-between items-end px-1">
            <motion.span 
              key={stepIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mono text-[8px] text-white/50 uppercase tracking-widest"
            >
              {LOADING_STEPS[stepIndex]}
            </motion.span>
            <span className="mono text-[9px] text-primary font-bold">{Math.round(progress)}%</span>
          </div>
          
          <div className="h-[1px] w-full bg-white/10 overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: `${progress}%` }}
            />
            {/* Moving flare on the progress bar */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-24 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
