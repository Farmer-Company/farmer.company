import React from 'react';
import { Tractor, ShoppingCart, Store, Truck, Network, Shield, Microscope } from 'lucide-react';
import { motion } from 'framer-motion';

export const EcosystemSection = () => {
  return (
    <section className="w-full bg-[#030303] py-24 border-b border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4ADE80]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest mb-4 block" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            THE FOUR-PLAYER ECOSYSTEM
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
            Digital Orchard is a four-player protocol.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: '"Inter", sans-serif' }}>
            Each player runs their own dashboard and agent: FarmerOS, VendorOS, LogisticsOS, and ResearchOS, with Global Buyers plugged into the same unified fabric.
          </p>
        </div>

        {/* Visual Ring Diagram */}
        <div className="relative max-w-4xl mx-auto h-[600px] flex items-center justify-center">
          
          {/* Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2 2" className="animate-[spin_60s_linear_infinite]" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(74,222,128,0.1)" strokeWidth="0.2" />
            
            {/* Cross Lines connecting to center */}
            <line x1="50" y1="20" x2="50" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="50" y1="80" x2="50" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="20" y1="50" x2="40" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <line x1="80" y1="50" x2="60" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          </svg>

          {/* Center: Protocol + Agents */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="absolute z-20 flex flex-col items-center justify-center w-[160px] h-[160px] rounded-full bg-black border border-[#4ADE80]/30 shadow-[0_0_40px_rgba(74,222,128,0.15)]"
          >
            <div className="absolute inset-2 rounded-full border border-white/5 flex flex-col items-center justify-center bg-[#050505]">
              <Network size={28} className="text-[#4ADE80] mb-2" />
              <div className="text-white font-bold text-sm tracking-tight text-center" style={{ fontFamily: '"Inter", sans-serif' }}>
                Protocol<br />+ AI Agents
              </div>
            </div>
          </motion.div>

          {/* Top: Farmer */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-[#4ADE80]/40 flex items-center justify-center shadow-lg mb-3">
              <Tractor size={24} className="text-[#4ADE80]" />
            </div>
            <div className="text-white font-bold tracking-tight bg-black px-4 py-1.5 rounded-full border border-white/10 text-sm">Farmer / FPO</div>
          </motion.div>

          {/* Bottom: Logistics */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-20"
          >
            <div className="text-white font-bold tracking-tight bg-black px-4 py-1.5 rounded-full border border-white/10 text-sm mb-3">Logistics Fleet</div>
            <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-[#FBBF24]/40 flex items-center justify-center shadow-lg">
              <Truck size={24} className="text-[#FBBF24]" />
            </div>
          </motion.div>

          {/* Left: Vendors */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-row items-center gap-4 z-20"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-[#38BDF8]/40 flex items-center justify-center shadow-lg shrink-0">
              <Store size={24} className="text-[#38BDF8]" />
            </div>
            <div className="text-white font-bold tracking-tight bg-black px-4 py-1.5 rounded-full border border-white/10 text-sm">Vendors / Processors</div>
          </motion.div>

          {/* Right: Buyers */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-row items-center gap-4 z-20"
          >
            <div className="text-white font-bold tracking-tight bg-black px-4 py-1.5 rounded-full border border-white/10 text-sm">FMCG / Buyers</div>
            <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-[#A78BFA]/40 flex items-center justify-center shadow-lg shrink-0">
              <ShoppingCart size={24} className="text-[#A78BFA]" />
            </div>
          </motion.div>

          {/* Overlay: Research & Policy */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute top-10 right-10 flex flex-col items-center z-30"
          >
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full shadow-xl">
              <Microscope size={16} className="text-[#f472b6]" />
              <span className="text-white/80 font-bold text-xs uppercase tracking-widest">Research & Policy Overlay</span>
            </div>
          </motion.div>

          {/* Overlay: Security */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-10 left-10 flex flex-col items-center z-30"
          >
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full shadow-xl">
              <Shield size={16} className="text-[#4ADE80]" />
              <span className="text-white/80 font-bold text-xs uppercase tracking-widest">Escrow-Backed Escrow</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
