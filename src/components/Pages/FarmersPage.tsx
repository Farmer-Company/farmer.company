import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, TrendingUp, ShieldCheck, MapPin, CheckCircle, Users, Tractor, BarChart3, Sun, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const FarmersPage = () => {
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
            FOR FARMERS & FPOS / விவசாயிகள்
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
            The Global Cultivation <span className="text-[#4ADE80]">Protocol.</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed max-w-3xl" style={{ fontFamily: '"Inter", sans-serif' }}>
            Predict demand. Cultivate precision. Keep the margins.
            <br/><br/>
            Digital Orchard puts satellite-backed intelligence, predictive pricing, and global direct-trade capabilities in the hands of every farmer. Bypass the mandi, meet global FMCG standards, and command the premium you deserve.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/get-started')} className="uppercase font-bold tracking-wider rounded-full px-8">
              Join the Network
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider rounded-full px-8" onClick={() => navigate('/story')}>
              Learn About FPO Hubs
            </Button>
          </div>
        </motion.div>

        {/* Pillars of Value */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-3xl font-light tracking-tight text-white" style={{ fontFamily: '"Inter", sans-serif' }}>Cultivation OS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<TrendingUp size={24} />}
              title="Global Price Access"
              desc="Skip the mandi. Earn significantly more by selling directly to verified global FMCG vendors and enterprise processors on our marketplace."
            />
            <FeatureCard 
              icon={<Sprout size={24} />}
              title="Demand Forecasting"
              desc="Know exactly what the market will need 90 days from now based on macroeconomic data. Plant the right crop at the right time."
            />
            <FeatureCard 
              icon={<ShieldCheck size={24} />}
              title="Verified Clean Premium"
              desc="Use our AI to optimize chemical usage. Earn up to a 25% premium from buyers for maintaining a high Farm Intelligence Score."
            />
            <FeatureCard 
              icon={<MapPin size={24} />}
              title="Farm-Gate Logistics"
              desc="No more transport exploitation. Our automated logistics network dispatches trucks directly to your farm gate upon sale."
            />
          </div>
        </div>

        {/* Farmer Advisor Agent Highlight */}
        <div className="bg-primary/5 border border-primary/20 p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center rounded-sm relative overflow-hidden mt-12 mb-12">
          <div className="flex-1 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-mono uppercase tracking-widest mb-2">
              <Sprout size={14} /> AI Cultivation Coach
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
              The Farmer Advisor Agent.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed font-medium">
              Your AI cultivation coach — in your language, on your phone.
            </p>
            <p className="text-white/60 leading-relaxed">
              No more guessing. The Advisor Agent uses satellite data, localized weather, and global demand forecasts to tell you exactly when to sow, how much to irrigate, and when to pause pesticides. Voice-first interaction ensures you can simply talk to it in regional languages.
            </p>
            <ul className="space-y-3 pt-4 font-mono text-sm">
              <li className="flex items-center gap-3 text-white/70">
                <span className="text-primary">{`>`}</span> "Pause irrigation. Heavy rain predicted in 14 hours."
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <span className="text-primary">{`>`}</span> "Optimal sowing window for Tomato opens next Tuesday."
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <span className="text-primary">{`>`}</span> "Chemical usage logged. Verified Clean status maintained."
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-5/12 bg-black border border-white/10 p-6 rounded-xl relative shadow-2xl">
            <div className="absolute -top-4 -left-4 bg-primary text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm">
              Voice Interface Active
            </div>
            <div className="space-y-4 mt-2">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/40 text-xs font-mono">Today's Action</span>
                  <Sun size={14} className="text-yellow-500" />
                </div>
                <p className="text-white text-sm">High heat stress detected. Recommend 20% increase in drip irrigation for block B.</p>
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-primary text-black text-xs font-bold py-2 rounded-sm uppercase tracking-wide">Execute</button>
                  <button className="flex-1 bg-white/10 text-white text-xs font-bold py-2 rounded-sm uppercase tracking-wide hover:bg-white/20 transition-colors">Ask Why</button>
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-lg border border-white/10 opacity-70">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/40 text-xs font-mono">Market Alert</span>
                  <TrendingUp size={14} className="text-primary" />
                </div>
                <p className="text-white/80 text-sm">FMCG Buyer XYZ is offering a 15% premium for zero-residue onions. Contract available.</p>
              </div>
            </div>
          </div>
        </div>

        {/* AgriOS Highlight */}
        <div className="bg-[#050505] border border-white/5 p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center rounded-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/5 to-transparent pointer-events-none" />
          
          <div className="flex-1 space-y-6 relative z-10">
            <h2 className="text-3xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>The Farm Intelligence Score</h2>
            <p className="text-white/60 leading-relaxed">
              Every action you take in the AgriOS app—from pest-spotting with computer vision to localized weather-based irrigation—contributes to your verified digital ledger. High-scoring farms unlock priority bidding from international buyers and lower-interest capital from financial partners.
            </p>
            <ul className="space-y-3 pt-4">
              <li className="flex items-center gap-3 text-sm text-white/70"><CheckCircle size={16} className="text-[#4ADE80]" /> Satellite soil monitoring integration</li>
              <li className="flex items-center gap-3 text-sm text-white/70"><CheckCircle size={16} className="text-[#4ADE80]" /> AI-based disease diagnosis</li>
              <li className="flex items-center gap-3 text-sm text-white/70"><CheckCircle size={16} className="text-[#4ADE80]" /> Automated ledger compliance</li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/3 aspect-square bg-black border border-white/10 flex items-center justify-center relative overflow-hidden rounded-xl">
             <div className="absolute inset-0 bg-[#4ADE80]/10 blur-[50px] rounded-full" />
             <div className="text-center relative z-10">
               <span className="text-7xl text-[#4ADE80] font-light block mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>92</span>
               <span className="text-[11px] font-bold text-white/50 tracking-widest uppercase" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Verified Clean Score</span>
             </div>
          </div>
        </div>

        {/* OS Modules */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-3xl font-light tracking-tight text-white" style={{ fontFamily: '"Inter", sans-serif' }}>Modules for Growth</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            <ModuleBlock 
              title="AgriOS Mobile App"
              items={[
                "Available in 12+ regional languages with voice-first interfaces.",
                "Daily localized weather, soil moisture predictions, and pest alerts.",
                "One-click listing of estimated harvest volumes to the global marketplace."
              ]}
            />
            <ModuleBlock 
              title="Direct Contracting"
              items={[
                "Sign smart contracts with enterprise buyers before you even sow the seeds.",
                "Lock in minimum guarantee prices to hedge against spot market crashes.",
                "Escrow-backed payments ensure you get paid the day the truck leaves your farm."
              ]}
            />
            <ModuleBlock 
              title="Capital & Credit Hub"
              items={[
                "Your Farm Intelligence Score acts as a digital credit profile.",
                "Access low-interest loans from institutional partners based on your verified contracts.",
                "Subsidized crop insurance integrated directly into the platform."
              ]}
            />
            <ModuleBlock 
              title="FPO Management Suite"
              items={[
                "Aggregate output from hundreds of smallholders to fulfill massive FMCG orders.",
                "Manage member payouts, input subsidies, and shared machinery booking.",
                "Transparent ledger for state alliance audits."
              ]}
            />
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col items-center text-center space-y-8 py-20 border-t border-white/5">
          <h2 className="text-4xl font-extrabold text-white uppercase tracking-tighter" style={{ fontFamily: '"Inter", sans-serif' }}>
            Reclaim your value.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/get-started')} className="uppercase font-bold tracking-wider rounded-full px-8">
              Download AgriOS
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider rounded-full px-8" onClick={() => navigate('/story')}>
              View Success Stories
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
