import React from 'react';
import { motion } from 'motion/react';
import { Sprout, TrendingUp, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const FarmersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl space-y-6"
        >
          <span className="mono text-[10px] text-primary font-medium">FOR FARMERS / விவசாயிகள்</span>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.05]">
            Grow what sells.<br />
            <span className="text-primary">Keep the profits.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Stop losing 60% of your value to middlemen. Digital Orchard gives you the demand forecast before you plant, and connects you directly to vendors who pay premium prices for clean produce.
          </p>
          <Button variant="primary" className="mt-4" onClick={() => navigate('/get-started')}>
            Join as a Farmer
          </Button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<TrendingUp size={24} />}
            title="₹18 vs ₹10/kg"
            desc="Skip the mandi. Earn significantly more by selling directly to verified vendors on our marketplace."
          />
          <FeatureCard 
            icon={<Sprout size={24} />}
            title="Demand Forecasting"
            desc="Know exactly what the market will need 90 days from now. Plant the right crop at the right time."
          />
          <FeatureCard 
            icon={<ShieldCheck size={24} />}
            title="AgriOS Intelligence"
            desc="Use your smartphone to detect pests. Use fewer chemicals and earn a premium for verified clean crops."
          />
          <FeatureCard 
            icon={<MapPin size={24} />}
            title="Farm Pickups"
            desc="No more transport hassles. Our logistics partners pick up directly from your farm gate."
          />
        </div>

        {/* AgriOS Highlight */}
        <div className="bg-[#050505] border border-white/5 p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center rounded-sm">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-semibold text-white">The Farm Intelligence Score</h2>
            <p className="text-white/60">
              When you use our AI to spot-treat pests instead of blanket-spraying chemicals, your Farm Intelligence Score goes up. Vendors pay up to 25% more for produce with a high clean score. It's that simple.
            </p>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-[#0a0a0a] border border-white/10 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full" />
             <div className="text-center relative z-10">
               <span className="text-6xl text-primary font-light display block mb-2">92</span>
               <span className="text-[10px] mono text-white/40">VERIFIED CLEAN SCORE</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-[#050505] p-8 border border-white/5 space-y-6 group hover:border-primary/30 transition-colors rounded-sm">
    <div className="text-primary">{icon}</div>
    <div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
    </div>
  </div>
);
