import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Box, ShieldCheck, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const VendorsPage = () => {
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
          <span className="mono text-[10px] text-primary font-medium">FOR VENDORS / விற்பனையாளர்கள்</span>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.05]">
            Direct sourcing.<br />
            <span className="text-primary">Verified margins.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Eliminate procurement markup. Source verified, traceable produce directly from farms, track inventory in real-time, and capture premium margins with our "Verified Clean" certification.
          </p>
          <Button variant="primary" className="mt-4" onClick={() => navigate('/get-started')}>
            Join as a Vendor
          </Button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<ShoppingBag size={24} />}
            title="Direct Farm Sourcing"
            desc="Buy directly from farmers. No commission agents, no hidden markups, absolute price transparency."
          />
          <FeatureCard 
            icon={<Box size={24} />}
            title="Supply CRM"
            desc="Manage repeat orders, track incoming logistics, and predict your inventory needs all in one dashboard."
          />
          <FeatureCard 
            icon={<ShieldCheck size={24} />}
            title="Verified Clean Crops"
            desc="Command 15-25% premium pricing from customers by selling produce with verifiable low-pesticide scores."
          />
          <FeatureCard 
            icon={<BarChart2 size={24} />}
            title="Price Intelligence"
            desc="Always know the true market rate. Compare against 6,900+ mandis to ensure you're buying at the right price."
          />
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
