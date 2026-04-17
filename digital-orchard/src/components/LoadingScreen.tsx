import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_LOGS = [
  "INITIALIZING_KERNEL_V4.0.2",
  "MOUNTING_ORCHARD_FILESYSTEM",
  "SYNCING_GLOBAL_NODES",
  "ENCRYPTING_SESSION_LAYER",
  "ESTABLISHING_PROCUREMENT_TUNNEL",
  "CALIBRATING_AGRI_INDEX",
  "READY_FOR_EXECUTION"
];

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [activeLogs, setActiveLogs] = useState<string[]>([]);
  const [status, setStatus] = useState('BOOTING_SYSTEM');

  useEffect(() => {
    // Progress Animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + (Math.random() * 2);
      });
    }, 40);

    // Logs Animation
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < SYSTEM_LOGS.length) {
        setActiveLogs(prev => [...prev.slice(-4), SYSTEM_LOGS[logIndex]]);
        setStatus(SYSTEM_LOGS[logIndex]);
        logIndex++;
      }
    }, 350);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] bg-[#020202] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Holographic Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1DB9541a_1px,transparent_1px),linear-gradient(to_bottom,#1DB9541a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Pulsing Topographic Lines */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <motion.path 
            d="M-100 500 Q 400 300, 900 500 T 1900 500" 
            stroke="#1DB954" strokeWidth="0.5" fill="none"
            animate={{ d: ["M-100 500 Q 400 300, 900 500 T 1900 500", "M-100 500 Q 400 700, 900 500 T 1900 500"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Vertical Data Streams (Scanlines) */}
      <motion.div 
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-[30%] bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"
      />

      {/* Main Interface */}
      <div className="relative z-10 w-full max-w-4xl px-12 flex flex-col items-center">
        
        {/* Top Header Section */}
        <div className="w-full flex justify-between items-end mb-24 opacity-40">
          <div className="flex flex-col gap-2">
            <span className="mono text-[8px] uppercase tracking-[0.5em]">Auth_Status</span>
            <span className="mono text-[10px] text-primary font-bold uppercase">System_Authorized</span>
          </div>
          <div className="text-right flex flex-col gap-2">
            <span className="mono text-[8px] uppercase tracking-[0.5em]">Sector_04_Agri</span>
            <span className="mono text-[10px] text-white uppercase font-bold">Protocol_4.0.2</span>
          </div>
        </div>

        {/* Central Radar / Core */}
        <div className="relative mb-24">
          {/* Animated Outer Rings */}
          {[1, 1.4, 1.8].map((s, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: s, opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              className="absolute inset-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 border border-primary/20 rounded-full"
            />
          ))}

          {/* The Core Scanner */}
          <div className="relative w-48 h-48 rounded-full border border-white/5 bg-black/40 backdrop-blur-3xl flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-t-2 border-primary shadow-[0_-15px_30px_-5px_rgba(29,185,84,0.4)]"
            />
            
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 bg-primary/10 border border-primary/40 flex items-center justify-center rotate-45"
              >
                <div className="w-4 h-4 bg-primary" />
              </motion.div>
              <span className="mono text-[10px] font-black text-white tracking-[0.3em]">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Brand & Progress Section */}
        <div className="w-full max-w-lg space-y-8">
          <div className="flex flex-col items-center gap-2">
            <motion.h2 
              initial={{ letterSpacing: "1em", opacity: 0 }}
              animate={{ letterSpacing: "0.5em", opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="display text-4xl font-black text-white uppercase text-center"
            >
              DIGITAL<span className="text-primary">_ORCHARD</span>
            </motion.h2>
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-white/10" />
              <span className="mono text-[9px] text-primary font-bold uppercase tracking-[0.4em]">{status}</span>
              <div className="h-[1px] w-12 bg-white/10" />
            </div>
          </div>

          {/* Industrial Progress Bar */}
          <div className="relative h-1 bg-white/5 w-full">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_15px_rgba(29,185,84,0.5)]"
              style={{ width: `${progress}%` }}
            />
            {/* Segmented Markers */}
            <div className="absolute inset-0 flex justify-between px-1 pointer-events-none">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-black/40" />
              ))}
            </div>
          </div>

          {/* Dynamic System Logs */}
          <div className="w-full flex flex-col items-center gap-1 min-h-[60px]">
            {activeLogs.map((log, i) => (
              <motion.span
                key={log + i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1 - (activeLogs.length - i - 1) * 0.25, y: 0 }}
                className="mono text-[8px] text-white/40 uppercase tracking-widest"
              >
                {log}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex flex-col items-center gap-6 opacity-20">
        <p className="mono text-[8px] text-white uppercase tracking-[1em]">Execution_Orchard_OS_v4.0.2</p>
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-primary" 
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
