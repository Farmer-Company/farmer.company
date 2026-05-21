import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowRight, TrendingUp, IndianRupee } from 'lucide-react';

const CROPS = [
  { id: 'tomato', name: 'Tomato', avgCurrentPrice: 12, orchardPrice: 22, unit: 'kg' },
  { id: 'onion', name: 'Onion', avgCurrentPrice: 18, orchardPrice: 28, unit: 'kg' },
  { id: 'potato', name: 'Potato', avgCurrentPrice: 15, orchardPrice: 24, unit: 'kg' },
  { id: 'mango', name: 'Mango (Alphonso)', avgCurrentPrice: 40, orchardPrice: 75, unit: 'kg' },
];

export const InteractiveDemo = () => {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [volume, setVolume] = useState<number>(1000);

  const traditionalRevenue = selectedCrop.avgCurrentPrice * volume;
  const orchardRevenue = selectedCrop.orchardPrice * volume;
  const savings = orchardRevenue - traditionalRevenue;
  const increasePercent = Math.round((savings / traditionalRevenue) * 100);

  return (
    <section id="interactive-demo" className="w-full py-24 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 opacity-50 pointer-events-none" />
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="mono text-[10px] text-primary font-medium normal-case tracking-widest mb-4 block">
            INTERACTIVE PROTOCOL
          </span>
          <h2 className="text-[34px] md:text-[48px] font-semibold text-white tracking-[-0.02em] leading-[1.1] mb-6">
            Calculate your true yield.
          </h2>
          <p className="text-foreground-muted text-[17px] font-normal leading-[1.5]">
            Stop guessing your margins. See exactly how much value is lost to commission agents and middlemen—and how much you recover by plugging into Digital Orchard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Calculator UI */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0A0A0A] border border-white/10 p-8 md:p-10 rounded-2xl shadow-2xl relative"
          >
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-primary text-black px-4 py-1 font-bold text-sm rounded-sm flex items-center gap-2">
              <Calculator size={16} /> Impact Calculator
            </div>

            <div className="space-y-8 mt-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-3 uppercase tracking-wider">Select Commodity</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CROPS.map(crop => (
                    <button
                      key={crop.id}
                      onClick={() => setSelectedCrop(crop)}
                      className={`py-3 px-2 text-sm font-medium rounded-lg border transition-all ${
                        selectedCrop.id === crop.id 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-transparent border-white/10 text-white hover:border-white/30'
                      }`}
                    >
                      {crop.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="block text-sm font-medium text-white/60 uppercase tracking-wider">Harvest Volume ({selectedCrop.unit})</label>
                  <span className="text-primary font-mono font-medium">{volume.toLocaleString()} {selectedCrop.unit}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="10000" 
                  step="100" 
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-primary h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/40 mt-2 font-mono">
                  <span>100</span>
                  <span>10,000</span>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-white/60">
                  <span>Traditional Mandi Revenue</span>
                  <span className="font-mono text-lg">₹{traditionalRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-primary">
                  <span className="font-semibold flex items-center gap-2">
                    <IndianRupee size={18} /> Digital Orchard Revenue
                  </span>
                  <span className="font-mono text-2xl font-bold">₹{orchardRevenue.toLocaleString()}</span>
                </div>
                
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6 flex items-start gap-4">
                  <TrendingUp className="text-primary mt-1 flex-shrink-0" size={24} />
                  <div>
                    <p className="text-white font-medium">You recover <span className="text-primary font-bold">₹{savings.toLocaleString()}</span></p>
                    <p className="text-sm text-white/50 mt-1">That's a {increasePercent}% increase in your net realization, simply by bypassing 3 layers of middlemen.</p>
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
            <div className="space-y-4 text-foreground-muted text-[17px] font-normal leading-[1.6]">
              <p>
                Our infrastructure completely bypasses the traditional APMC Mandi system. 
                Instead of handing your crop to a local aggregator who takes a 10% cut, 
                then a commission agent who takes another 8%, and a wholesaler who takes 15%...
              </p>
              <p>
                <strong className="text-white block mt-6 mb-2 text-xl font-medium">You sell directly to the final buyer.</strong>
                Whether that's a regional supermarket chain, a global exporter, or an institutional kitchen. We handle the logistics, quality verification, and guarantee the payment.
              </p>
            </div>

            <ul className="space-y-6 mt-8">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Instant Price Discovery</h4>
                  <p className="text-white/60 text-sm mt-1">Check real-time prices across 3,000+ markets before you harvest.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Create Farm Listing</h4>
                  <p className="text-white/60 text-sm mt-1">Upload photos, volume, and quality specs. Set your own price.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg">Guaranteed Payout</h4>
                  <p className="text-white/60 text-sm mt-1">Buyer pays into escrow. You get paid the moment the truck is loaded.</p>
                </div>
              </li>
            </ul>

            <Button variant="primary" className="mt-8 gap-2 px-8">
              Try the full Sandbox Demo <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
