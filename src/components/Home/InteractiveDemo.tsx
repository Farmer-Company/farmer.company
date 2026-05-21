import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight, TrendingUp, IndianRupee } from 'lucide-react';

const CROPS = [
  { id: 'tomato', name: 'Tomato', avgCurrentPrice: 12, orchardPrice: 22, unit: 'kg' },
  { id: 'onion', name: 'Onion', avgCurrentPrice: 18, orchardPrice: 28, unit: 'kg' },
  { id: 'wheat', name: 'Wheat', avgCurrentPrice: 21, orchardPrice: 29, unit: 'kg' },
  { id: 'mango', name: 'Mango (Export)', avgCurrentPrice: 40, orchardPrice: 75, unit: 'kg' },
];

export const InteractiveDemo = () => {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [volume, setVolume] = useState<number>(1000);

  const traditionalRevenue = selectedCrop.avgCurrentPrice * volume;
  const orchardRevenue = selectedCrop.orchardPrice * volume;
  const savings = orchardRevenue - traditionalRevenue;
  const increasePercent = Math.round((savings / traditionalRevenue) * 100);

  return (
    <section id="interactive-demo" className="w-full py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#4ADE80]/5 to-transparent pointer-events-none" />
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-[#4ADE80]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest mb-4 block" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            INTERACTIVE PROTOCOL
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase leading-[1.05] mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
            Calculate your <span className="text-[#4ADE80]">true yield across the chain.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: '"Inter", sans-serif' }}>
            See exactly how much value is lost to commission agents, middlemen and fragmented logistics—and how much you recover by plugging into the Digital Orchard protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Calculator UI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 relative overflow-hidden rounded-sm"
            style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              backdropFilter: 'blur(12px)',
              boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)'
            }}
          >
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#4ADE80] text-black px-4 py-1 font-bold text-[11px] uppercase tracking-widest rounded-sm flex items-center gap-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              <Calculator size={14} /> Protocol Simulator
            </div>

            <div className="space-y-10 mt-4">
              <div>
                <label className="block text-[11px] font-bold text-white/40 mb-4 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Select Commodity</label>
                <div className="grid grid-cols-2 gap-3">
                  {CROPS.map(crop => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                      className={`py-4 px-3 text-sm font-bold tracking-tight rounded-sm transition-all ${
                        selectedCrop.id === crop.id 
                        ? 'bg-[#4ADE80]/10 border-[#4ADE80]/50 text-[#4ADE80] border' 
                        : 'bg-black/50 border border-white/10 text-white/70 hover:border-white/30'
                      }`}
                      style={{ fontFamily: '"Inter", sans-serif' }}
                    >
                      {crop.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="block text-[11px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Contract Volume ({selectedCrop.unit})</label>
                  <span className="text-[#4ADE80] font-mono font-medium">{volume.toLocaleString()} {selectedCrop.unit}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#4ADE80' }}
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-3 font-mono">
                  <span>100</span>
                  <span>10,000</span>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 space-y-5">
                <div className="flex justify-between items-center text-white/50" style={{ fontFamily: '"Inter", sans-serif' }}>
                  <span className="font-medium text-sm">Legacy Mandi Revenue</span>
                  <span className="font-mono text-lg">₹{traditionalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[#4ADE80]">
                  <span className="font-bold flex items-center gap-2 text-sm uppercase tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
                    <IndianRupee size={16} /> Protocol Revenue
                  </span>
                  <span className="font-mono text-3xl font-bold">₹{orchardRevenue.toLocaleString()}</span>
                </div>
                
                <div className="bg-[#4ADE80]/5 border border-[#4ADE80]/20 rounded-sm p-5 mt-8 flex items-start gap-4">
                  <TrendingUp className="text-[#4ADE80] mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-white font-medium tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Recovered Margin: <span className="text-[#4ADE80] font-bold">₹{savings.toLocaleString()}</span></p>
                    <p className="text-sm text-white/50 mt-2 leading-relaxed">That's a {increasePercent}% increase in net realization by bypassing 3 layers of fragmented intermediaries.</p>
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
                In the traditional chain, 30–40% of value disappears into 3–5 layers of intermediaries, delays and wastage.
              </p>
              <p>
                <strong className="text-white block mt-6 mb-2 text-2xl font-bold tracking-tight">Direct institutional sync.</strong>
                With Digital Orchard, supply moves directly between verified farms, processors, FMCG brands and retailers while we handle logistics, quality verification and escrow-backed payments.
              </p>
            </div>

            <ul className="space-y-6 mt-10">
              <li className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#4ADE80]/10 flex items-center justify-center text-[#4ADE80] shrink-0 font-bold font-mono text-sm border border-[#4ADE80]/20">
                  01
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Predictive Price Discovery</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">Access real-time commodity indices across 3,000+ global markets before harvesting.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#4ADE80]/10 flex items-center justify-center text-[#4ADE80] shrink-0 font-bold font-mono text-sm border border-[#4ADE80]/20">
                  02
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Verified Quality Ledgers</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">Upload computer-vision verified crop specs to the institutional procurement network.</p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="w-10 h-10 rounded-full bg-[#4ADE80]/10 flex items-center justify-center text-[#4ADE80] shrink-0 font-bold font-mono text-sm border border-[#4ADE80]/20">
                  03
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Automated Escrow</h4>
                  <p className="text-white/50 text-sm mt-1 leading-relaxed">Institutional funds are locked in escrow. Capital is released the second the digital Bill of Lading is signed.</p>
                </div>
              </li>
            </ul>

            <Button variant="primary" className="mt-10 gap-2 px-8 uppercase font-bold tracking-wider rounded-full h-12">
              Launch Sandbox Demo <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
