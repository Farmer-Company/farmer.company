import React from 'react';
import { motion } from 'motion/react';
import { Truck, Map, Clock, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LogisticsPage = () => {
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
          <span className="mono text-[10px] text-primary font-medium">FOR LOGISTICS / தளவாட பங்காளர்கள்</span>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.05]">
            Zero empty miles.<br />
            <span className="text-primary">Predictable revenue.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Stop waiting for calls. Digital Orchard gives you guaranteed transaction volumes by matching you with farm pickups and vendor drop-offs before the produce is even harvested.
          </p>
          <Button variant="primary" className="mt-4" onClick={() => navigate('/get-started')}>
            Join as a Partner
          </Button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Truck size={24} />}
            title="Guaranteed Volumes"
            desc="Tap into the massive flow of direct farm-to-vendor transactions. Predictable loads every single day."
          />
          <FeatureCard 
            icon={<Map size={24} />}
            title="Route Optimization"
            desc="AI-driven routing ensures you pick up multiple loads efficiently, saving fuel and time."
          />
          <FeatureCard 
            icon={<ArrowRightLeft size={24} />}
            title="Zero Empty Miles"
            desc="Match backhauls automatically. If you drop off in the city, you'll have a return load waiting."
          />
          <FeatureCard 
            icon={<Clock size={24} />}
            title="Instant Payments"
            desc="No more chasing transport dues. Payments are escrowed and released instantly upon delivery confirmation."
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
