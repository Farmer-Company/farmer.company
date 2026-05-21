import React from 'react';
import { motion } from 'motion/react';
import { QrCode, Leaf, HeartPulse, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const CustomersPage = () => {
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
          <span className="mono text-[10px] text-primary font-medium">FOR CUSTOMERS</span>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.05]">
            Traceable to the soil.<br />
            <span className="text-primary">30-50% cheaper.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            By eliminating the 5 middlemen between the farm and your plate, we give you fresher, cleaner produce at a fraction of supermarket prices. Scan any item to see exactly who grew it and how.
          </p>
          <Button variant="primary" className="mt-4" onClick={() => navigate('/get-started')}>
            Find a Local Store
          </Button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Percent size={24} />}
            title="30-50% Cheaper"
            desc="You pay less, farmers earn more. The value that used to be lost in the supply chain now stays in your pocket."
          />
          <FeatureCard 
            icon={<Leaf size={24} />}
            title="Verified Clean"
            desc="Buy produce backed by the Farm Intelligence Score. Know exactly what pesticides were (or weren't) used."
          />
          <FeatureCard 
            icon={<QrCode size={24} />}
            title="Total Traceability"
            desc="Scan the QR code on your produce to see the exact farm it came from, the harvest date, and its journey."
          />
          <FeatureCard 
            icon={<HeartPulse size={24} />}
            title="Unmatched Freshness"
            desc="Direct farm-to-vendor routing means your food spends less time in trucks and warehouses, and more time on your plate."
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
