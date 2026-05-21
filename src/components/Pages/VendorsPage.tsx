import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Box, ShieldCheck, BarChart2, Globe, Activity, FileText, CheckCircle, Store, Building2, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const VendorsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-8"
        >
          <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            FOR VENDORS & FMCG / விற்பனையாளர்கள்
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
            The Global Procurement <span className="text-[#4ADE80]">Protocol.</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed max-w-3xl" style={{ fontFamily: '"Inter", sans-serif' }}>
            Direct sourcing. Traceable at scale. Verified margins.
            <br/><br/>
            Procure verified, traceable agricultural commodities directly from the source. Digital Orchard connects FMCG brands, exporters, and enterprise processors to a global network of verified farmers, bypassing the opaque mandi system entirely.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/get-started')} className="uppercase font-bold tracking-wider rounded-full px-8">
              Join the Network
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider rounded-full px-8" onClick={() => navigate('/story')}>
              Talk to Enterprise Sales
            </Button>
          </div>
        </motion.div>

        {/* Pillars of Value */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-3xl font-light tracking-tight text-white" style={{ fontFamily: '"Inter", sans-serif' }}>Pillars of Value</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<ShoppingBag size={24} />}
              title="Direct Farm Sourcing"
              desc="Buy directly from farmers. No commission agents, no hidden markups, absolute price transparency. Secure multi-ton capacity months in advance."
            />
            <FeatureCard 
              icon={<ShieldCheck size={24} />}
              title="Verified Traceability"
              desc="Every batch is tracked. Command premium retail pricing by guaranteeing low-pesticide, sustainably grown produce to your end consumers."
            />
            <FeatureCard 
              icon={<Globe size={24} />}
              title="Export-Grade Quality"
              desc="Standardized quality grading before the crop leaves the farm gate. Never reject a truckload at the factory again."
            />
            <FeatureCard 
              icon={<BarChart2 size={24} />}
              title="Market Intelligence"
              desc="Always know the true market rate. Compare against 6,900+ global mandis to ensure you are buying at the absolute optimal price."
            />
            <FeatureCard 
              icon={<Box size={24} />}
              title="Automated Logistics"
              desc="Integrated directly with Digital Orchard Logistics. Trucks are dispatched automatically the moment your procurement bid is accepted."
            />
          </div>
        </div>

        {/* OS Modules */}
        <div className="space-y-12 relative p-8 md:p-16 border border-white/10 rounded-sm overflow-hidden"
             style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(10px)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/5 to-transparent pointer-events-none" />
          
          <div className="border-b border-white/10 pb-4 mb-12 relative z-10">
            <h2 className="text-3xl font-light tracking-tight text-white" style={{ fontFamily: '"Inter", sans-serif' }}>Enterprise Procurement Modules</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative z-10">
            <ModuleBlock 
              title="Supply CRM"
              items={[
                "Manage repeat orders, track incoming logistics, and predict your inventory needs.",
                "Build long-term contracts with high-performing FPOs and large-scale farmers.",
                "Consolidated billing and escrow management."
              ]}
            />
            <ModuleBlock 
              title="Quality Assurance Gateway"
              items={[
                "Pre-harvest pesticide and moisture level logging.",
                "Digital quality certificates attached to every single digital bill of lading.",
                "Automated dispute resolution backed by verified farm data."
              ]}
            />
            <ModuleBlock 
              title="Predictive Volume Bidding"
              items={[
                "View satellite-verified harvest predictions 90 days out.",
                "Place bids on future yields to secure supply before spot market volatility hits.",
                "Lock in prices through smart contracts."
              ]}
            />
            <ModuleBlock 
              title="Multi-Modal Sync"
              items={[
                "Sync farm-gate pickups directly with your factory's inward bays or port schedules.",
                "Live temperature and humidity tracking for cold-chain commodities.",
                "Zero wait times at your processing plants."
              ]}
            />
          </div>
        </div>

        {/* Target Personas */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-3xl font-light tracking-tight text-white">Who powers their supply chain with us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PersonaCard 
              icon={<Store size={24} />}
              title="Retail Chains"
              desc="Stock supermarket shelves with fresh, fully traceable produce that commands a premium and builds deep consumer trust."
            />
            <PersonaCard 
              icon={<Factory size={24} />}
              title="FMCG & Processors"
              desc="Secure massive volumes of standardized agricultural inputs (like corn, tomatoes, and wheat) at predictable, contract-locked prices."
            />
            <PersonaCard 
              icon={<Building2 size={24} />}
              title="Global Exporters"
              desc="Source export-grade commodities with digital compliance paperwork ready for immediate port clearance."
            />
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col items-center text-center space-y-8 py-20 border-t border-white/5">
          <h2 className="text-4xl font-extrabold text-white uppercase tracking-tighter" style={{ fontFamily: '"Inter", sans-serif' }}>
            Upgrade your procurement.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/get-started')} className="uppercase font-bold tracking-wider rounded-full px-8">
              Join the Network
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider rounded-full px-8" onClick={() => navigate('/story')}>
              Talk to a Supply Chain Specialist
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-[#050505] p-8 border border-white/5 space-y-6 group hover:border-[#4ADE80]/30 transition-colors rounded-sm flex flex-col"
       style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}>
    <div className="text-[#4ADE80]">{icon}</div>
    <div className="flex-1">
      <h3 className="text-lg font-bold text-white mb-3 tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ModuleBlock = ({ title, items }: { title: string, items: string[] }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>{title}</h3>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
          <div className="mt-1 min-w-4 text-[#4ADE80]"><CheckCircle size={14} /></div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PersonaCard = ({ icon, title, desc }: any) => (
  <div className="p-8 border border-white/5 space-y-5 bg-black hover:bg-[#050505] transition-colors rounded-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
    <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-white/80 mb-6 border border-white/10">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white" style={{ fontFamily: '"Inter", sans-serif' }}>{title}</h3>
    <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
  </div>
);
