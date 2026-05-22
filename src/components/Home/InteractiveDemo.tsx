import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight, TrendingUp, IndianRupee, ShieldCheck } from 'lucide-react';

const CROPS = [
  { id: 'tomato', name: 'Tomato', basePrice: 20, unit: 'kg' },
  { id: 'onion', name: 'Onion', basePrice: 25, unit: 'kg' },
  { id: 'wheat', name: 'Wheat', basePrice: 30, unit: 'kg' },
  { id: 'mango', name: 'Mango (Export)', basePrice: 60, unit: 'kg' },
];

type Role = 'farmer' | 'buyer' | 'logistics';

export const InteractiveDemo = () => {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [volume, setVolume] = useState<number>(1000);
  const [role, setRole] = useState<Role>('farmer');
  const [isCleanVerified, setIsCleanVerified] = useState(false);

  // Math logic
  const baseValue = selectedCrop.basePrice * volume;
  
  // Calculate states based on role
  let legacyRevenue = 0;
  let protocolRevenue = 0;
  let metricLabel = '';
  let legacyBars = [];
  let protocolBars = [];
  let accentColor = '';

  if (role === 'farmer') {
    accentColor = '#4ADE80';
    metricLabel = 'Net Farm Realization';
    const legacyCut = 0.60;
    legacyRevenue = baseValue * legacyCut;
    
    let protocolCut = 0.85;
    let premium = isCleanVerified ? 1.15 : 1.0;
    protocolRevenue = (baseValue * premium) * protocolCut;

    legacyBars = [
      { label: 'Farmer (60%)', percent: 60, color: 'bg-white/40' },
      { label: 'Middlemen (25%)', percent: 25, color: 'bg-red-500/40' },
      { label: 'Wastage (15%)', percent: 15, color: 'bg-orange-500/40' }
    ];
    protocolBars = [
      { label: `Farmer (${isCleanVerified ? '85% + Premium' : '85%'})`, percent: 85, color: 'bg-[#4ADE80]' },
      { label: 'Logistics (10%)', percent: 10, color: 'bg-white/20' },
      { label: 'Protocol (5%)', percent: 5, color: 'bg-white/10' }
    ];
  } else if (role === 'buyer') {
    accentColor = '#A78BFA';
    metricLabel = 'Total Procurement Cost';
    const legacyMarkup = 1.30; // Buyers pay 30% more due to intermediaries
    legacyRevenue = baseValue * legacyMarkup;
    
    // In protocol, they pay base value (which is 100%), no hidden markups
    protocolRevenue = baseValue * (isCleanVerified ? 1.15 : 1.0); 

    legacyBars = [
      { label: 'Farm Gate (70%)', percent: 70, color: 'bg-white/40' },
      { label: 'Hidden Markups (30%)', percent: 30, color: 'bg-red-500/40' }
    ];
    protocolBars = [
      { label: `Direct Farm Pay (${isCleanVerified ? '85% + Premium' : '85%'})`, percent: 85, color: 'bg-[#A78BFA]' },
      { label: 'Logistics (10%)', percent: 10, color: 'bg-white/20' },
      { label: 'Protocol (5%)', percent: 5, color: 'bg-white/10' }
    ];
  } else if (role === 'logistics') {
    accentColor = '#FBBF24';
    metricLabel = 'Fleet Profitability';
    // Base logistics value
    const logBase = baseValue * 0.15; 
    
    // Legacy: 40% empty backhauls hurts profitability
    legacyRevenue = logBase * 0.60;
    
    // Protocol: AI routing guarantees 95% utilization
    protocolRevenue = logBase * 0.95;

    legacyBars = [
      { label: 'Paid Miles (60%)', percent: 60, color: 'bg-white/40' },
      { label: 'Empty Backhaul (40%)', percent: 40, color: 'bg-red-500/40' }
    ];
    protocolBars = [
      { label: 'Optimized Paid Miles (95%)', percent: 95, color: 'bg-[#FBBF24]' },
      { label: 'Idle (5%)', percent: 5, color: 'bg-white/10' }
    ];
  }

  const diff = role === 'buyer' ? legacyRevenue - protocolRevenue : protocolRevenue - legacyRevenue;
  const increasePercent = Math.round((diff / legacyRevenue) * 100);

  return (
    <section id="interactive-demo" className="w-full py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <div className={`absolute -top-[200px] -right-[200px] w-[600px] h-[600px] blur-[100px] rounded-full pointer-events-none opacity-10 transition-colors duration-700`} style={{ backgroundColor: accentColor }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] font-bold uppercase tracking-widest mb-4 block transition-colors duration-500" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', color: accentColor }}>
            INTERACTIVE PROTOCOL
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase leading-[1.05] mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
            Calculate your <span className="transition-colors duration-500" style={{ color: accentColor }}>true value.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: '"Inter", sans-serif' }}>
            See exactly how much value is lost to fragmented intermediaries, and how much you recover by plugging into the Digital Orchard protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Calculator UI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 relative overflow-hidden rounded-sm transition-all duration-500"
            style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              backdropFilter: 'blur(12px)',
              boxShadow: `inset 0 1px 1px rgba(255,255,255,0.05), 0 0 40px ${accentColor}10`
            }}
          >
            <div className="absolute top-0 right-8 transform -translate-y-1/2 text-black px-4 py-1 font-bold text-[11px] uppercase tracking-widest rounded-sm flex items-center gap-2 transition-colors duration-500" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', backgroundColor: accentColor }}>
              <Calculator size={14} /> Protocol Simulator
            </div>

            <div className="space-y-8 mt-4">
              
              {/* Role Selector */}
              <div className="flex bg-black/50 p-1 rounded-sm border border-white/10">
                {(['farmer', 'buyer', 'logistics'] as Role[]).map(r => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-sm transition-all ${
                      role === r ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white/40 mb-4 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Select Commodity</label>
                <div className="grid grid-cols-2 gap-3">
                  {CROPS.map(crop => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                      className={`py-3 px-3 text-sm font-bold tracking-tight rounded-sm transition-all ${
                        selectedCrop.id === crop.id 
                        ? 'border bg-white/5' 
                        : 'bg-black/50 border border-white/10 text-white/70 hover:border-white/30'
                      }`}
                      style={{ 
                        fontFamily: '"Inter", sans-serif',
                        borderColor: selectedCrop.id === crop.id ? accentColor : '',
                        color: selectedCrop.id === crop.id ? accentColor : ''
                      }}
                    >
                      {crop.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Contract Volume ({selectedCrop.unit})</label>
                  <span className="font-mono font-medium transition-colors duration-500" style={{ color: accentColor }}>{volume.toLocaleString()} {selectedCrop.unit}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: accentColor }}
                />
              </div>

              {/* Verified Clean Toggle (Only for Farmer & Buyer) */}
              <AnimatePresence>
                {(role === 'farmer' || role === 'buyer') && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between bg-black/30 p-4 border border-white/5 rounded-sm"
                  >
                    <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                      <ShieldCheck size={16} style={{ color: accentColor }} />
                      Verified Clean Ledger (+15% Premium)
                    </div>
                    <button 
                      onClick={() => setIsCleanVerified(!isCleanVerified)}
                      className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${isCleanVerified ? 'bg-white/20' : 'bg-white/5'}`}
                    >
                      <motion.div 
                        layout
                        className="w-4 h-4 rounded-full absolute top-0.5"
                        style={{ backgroundColor: isCleanVerified ? accentColor : '#666' }}
                        animate={{ left: isCleanVerified ? 'calc(100% - 1.125rem)' : '0.125rem' }}
                      />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-8 border-t border-white/10 space-y-6">
                
                {/* Visual Stacked Bars */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/50 font-medium font-mono">
                      <span>Legacy Chain</span>
                      <span>₹{legacyRevenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-3 flex rounded-full overflow-hidden bg-white/5">
                      {legacyBars.map((bar, i) => (
                        <motion.div 
                          key={i}
                          layout
                          className={`h-full ${bar.color}`}
                          style={{ width: `${bar.percent}%` }}
                          title={bar.label}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium font-mono transition-colors duration-500" style={{ color: accentColor }}>
                      <span>Digital Orchard</span>
                      <span>₹{protocolRevenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-3 flex rounded-full overflow-hidden bg-white/5">
                      {protocolBars.map((bar, i) => (
                        <motion.div 
                          key={i}
                          layout
                          className={`h-full ${bar.color}`}
                          style={{ width: `${bar.percent}%` }}
                          title={bar.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-sm p-5 flex items-start gap-4">
                  <TrendingUp className="mt-1 flex-shrink-0 transition-colors duration-500" size={20} style={{ color: accentColor }} />
                  <div>
                    <p className="text-white font-medium tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
                      {role === 'buyer' ? 'Savings Generated: ' : 'Recovered Margin: '}
                      <span className="font-bold transition-colors duration-500" style={{ color: accentColor }}>₹{diff.toLocaleString()}</span>
                    </p>
                    <p className="text-sm text-white/50 mt-2 leading-relaxed">
                      That's a {increasePercent}% {role === 'buyer' ? 'decrease in procurement costs' : 'increase in net realization'} by bypassing fragmented intermediaries.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Value Prop Text */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6 text-white/60 text-lg font-normal leading-[1.6]" style={{ fontFamily: '"Inter", sans-serif' }}>
              <p>
                In the traditional chain, 30–40% of value disappears into layers of intermediaries, empty logistics miles, and wastage.
              </p>
              <p>
                <strong className="text-white block mt-6 mb-2 text-2xl font-bold tracking-tight">Direct institutional sync.</strong>
                With Digital Orchard, supply moves directly between verified farms, processors, FMCG brands and retailers while we handle logistics, quality verification and escrow-backed payments.
              </p>
            </div>

            <ul className="space-y-6 mt-10">
              <li className="flex gap-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold font-mono text-sm border transition-colors duration-500" style={{ color: accentColor, backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30` }}>
                  01
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Predictive Price Discovery</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">Access real-time commodity indices across 3,000+ global markets before harvesting.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold font-mono text-sm border transition-colors duration-500" style={{ color: accentColor, backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30` }}>
                  02
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Verified Quality Ledgers</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">Upload computer-vision verified crop specs to the institutional procurement network.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold font-mono text-sm border transition-colors duration-500" style={{ color: accentColor, backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30` }}>
                  03
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Automated Escrow</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">Institutional funds are locked in escrow. Capital is released the second the digital Bill of Lading is signed.</p>
                </div>
              </li>
            </ul>

            {/* Agent Log Simulation */}
            <div className="mt-12 bg-[#050505] border border-white/10 rounded-lg p-5 font-mono text-sm space-y-3 relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-2 border-b border-white/5 pb-3">
                <div className="w-2 h-2 rounded-full animate-pulse transition-colors duration-500" style={{ backgroundColor: accentColor }} />
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Live Agent Stream</span>
              </div>
              <div className="space-y-2">
                <motion.div initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-white/50">
                  <span className="transition-colors duration-500" style={{ color: accentColor }}>{`> `}</span>Demand Agent forecasts 18% increase in onion demand in Q3.
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }} className="text-white/50">
                  <span className="transition-colors duration-500" style={{ color: accentColor }}>{`> `}</span>Matchmaking Agent proposes contract between TN FPO and European FMCG.
                </motion.div>
                <motion.div initial={{ opacity: 0, x: -5 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 2.8 }} className="text-white/50">
                  <span className="transition-colors duration-500" style={{ color: accentColor }}>{`> `}</span>Awaiting human confirmation on pricing parameters...
                </motion.div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};
