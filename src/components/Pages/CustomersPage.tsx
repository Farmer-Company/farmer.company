import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Leaf, ShieldCheck, HeartPulse, Percent, CheckCircle, Smartphone, Building, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const CustomersPage = () => {
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
            FOR CONSUMERS & INSTITUTIONS / வாடிக்கையாளர்கள்
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
            The Global Transparency <span className="text-[#4ADE80]">Protocol.</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed max-w-3xl" style={{ fontFamily: '"Inter", sans-serif' }}>
            Traceable to the soil. Verified at scale.
            <br/><br/>
            By eliminating the 5 middlemen between the global farm and your plate, we deliver fresher, cleaner produce backed by immutable supply chain logs. Scan any item to see exactly who grew it and how.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/get-started')} className="uppercase font-bold tracking-wider rounded-full px-8">
              Find a Local Retailer
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider rounded-full px-8" onClick={() => navigate('/story')}>
              Explore the Ledger
            </Button>
          </div>
        </motion.div>

        {/* Pillars of Value */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-3xl font-light tracking-tight text-white" style={{ fontFamily: '"Inter", sans-serif' }}>Pillars of Trust</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Percent size={24} />}
              title="Zero Information Asymmetry"
              desc="You pay less, and farmers earn more. The value that used to be lost in the supply chain now stays in your pocket."
            />
            <FeatureCard 
              icon={<Leaf size={24} />}
              title="Verified Clean Standard"
              desc="Buy produce backed by the Farm Intelligence Score. Know exactly what pesticides were (or weren't) used during cultivation."
            />
            <FeatureCard 
              icon={<QrCode size={24} />}
              title="Cryptographic Traceability"
              desc="Scan the QR code on your produce to see the exact farm it came from, the harvest date, and its entire logistical journey."
            />
            <FeatureCard 
              icon={<HeartPulse size={24} />}
              title="Hyper-Local Freshness"
              desc="Direct farm-to-vendor routing means your food spends less time in trucks and warehouses, and more time on your plate."
            />
          </div>
        </div>

        {/* OS Modules */}
        <div className="space-y-12 relative p-8 md:p-16 border border-white/10 rounded-sm overflow-hidden"
             style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(10px)' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/5 to-transparent pointer-events-none" />
          
          <div className="border-b border-white/10 pb-4 mb-12 relative z-10">
            <h2 className="text-3xl font-light tracking-tight text-white" style={{ fontFamily: '"Inter", sans-serif' }}>Transparency Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 relative z-10">
            <ModuleBlock 
              title="Consumer Traceability App"
              items={[
                "Instantly scan QR codes on Digital Orchard packaged goods.",
                "View high-resolution farm profiles and farmer stories.",
                "Verify harvest dates, logistics transit times, and cold-chain integrity."
              ]}
            />
            <ModuleBlock 
              title="Verified Clean Ledger"
              items={[
                "Access publicly verifiable logs of pesticide usage and soil health.",
                "View third-party quality assay certificates attached to each batch.",
                "Ensure compliance with global organic and sustainable farming standards."
              ]}
            />
            <ModuleBlock 
              title="Direct Quality Feedback"
              items={[
                "Rate produce quality directly through the app, sending feedback straight to the farmer.",
                "Automatically flag logistical bottlenecks if produce arrives sub-optimally.",
                "Participate in decentralized quality control."
              ]}
            />
            <ModuleBlock 
              title="Institutional Dashboard"
              items={[
                "For large buyers: Track scope-3 emissions and sustainability metrics.",
                "Monitor the exact origin of thousands of tonnes of procured commodities.",
                "Generate automated compliance reports for global ESG standards."
              ]}
            />
          </div>
        </div>

        {/* Target Personas */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-3xl font-light tracking-tight text-white">Who benefits from our protocol</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PersonaCard 
              icon={<Users size={24} />}
              title="Conscious Consumers"
              desc="Families who want to know exactly where their food comes from, ensuring it is safe, sustainable, and ethically sourced."
            />
            <PersonaCard 
              icon={<Building size={24} />}
              title="Corporate Cafeterias"
              desc="Large tech campuses and corporate kitchens looking to supply their workforce with verified clean, direct-from-farm meals."
            />
            <PersonaCard 
              icon={<Smartphone size={24} />}
              title="D2C Agri-Brands"
              desc="Brands building trust by embedding our cryptographic traceability directly into their native consumer-facing applications."
            />
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col items-center text-center space-y-8 py-20 border-t border-white/5">
          <h2 className="text-4xl font-extrabold text-white uppercase tracking-tighter" style={{ fontFamily: '"Inter", sans-serif' }}>
            Demand Transparency.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/get-started')} className="uppercase font-bold tracking-wider rounded-full px-8">
              Find a Local Retailer
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider rounded-full px-8" onClick={() => navigate('/story')}>
              Explore the Ledger
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
