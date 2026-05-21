import React from 'react';
import { motion } from 'motion/react';
import { Database, LineChart, CloudRain, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const ResearchersPage = () => {
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
          <span className="mono text-[10px] text-primary font-medium tracking-widest uppercase">FOR RESEARCHERS & POLICY MAKERS</span>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.05]">
            Unearth the <br />
            <span className="text-primary">truth in the soil.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Tap into the world's most comprehensive, real-time agricultural dataset. 
            Analyze supply chain anomalies, forecast crop yields, and shape policy with unparalleled macro-level visibility.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="primary" onClick={() => navigate('/get-started')}>
              Request API Access
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => navigate('/story')}>
              Read the Protocol
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Database size={24} />}
            title="Global Dataset"
            desc="Access anonymized, high-fidelity data across thousands of farms, tracking crop health, yields, and pricing."
          />
          <FeatureCard 
            icon={<LineChart size={24} />}
            title="Yield Predictions"
            desc="Leverage our proprietary AI models to forecast macro supply trends before crops are even harvested."
          />
          <FeatureCard 
            icon={<CloudRain size={24} />}
            title="Climate Integration"
            desc="Cross-reference agricultural output with hyper-local climate data and extreme weather events."
          />
          <FeatureCard 
            icon={<Network size={24} />}
            title="Supply Anomalies"
            desc="Detect inefficiencies and bottlenecks in the logistics network, from farm gate to vendor warehouse."
          />
        </div>

        {/* Highlight Section */}
        <div className="bg-[#050505] border border-white/5 p-10 md:p-16 flex flex-col md:flex-row gap-12 items-center rounded-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex-1 space-y-6 relative z-10">
            <h2 className="text-3xl font-semibold text-white">The Data Sandbox</h2>
            <p className="text-white/60 leading-relaxed">
              We provide authenticated academic institutions and government bodies with dedicated sandbox environments. 
              Run complex multi-variate queries, train your own predictive models, and export pristine datasets without worrying about infrastructure.
            </p>
            <ul className="space-y-3 mt-6">
              {['GraphQL & REST APIs', 'Jupyter Notebook Integrations', 'Daily CSV/JSON Dumps', 'SOC2 Compliant Architecture'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-5/12 bg-[#0a0a0a] border border-white/10 rounded-sm p-6 relative overflow-hidden font-mono text-[11px] leading-relaxed text-white/50 z-10">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
              <span className="text-white/30">query.graphql</span>
              <span className="text-primary">200 OK</span>
            </div>
            <div className="text-primary/80">query {'{'}</div>
            <div className="pl-4">
              <div className="text-white/80">regionalYieldForecast(</div>
              <div className="pl-4 text-white/40">region: "SOUTH_ASIA",</div>
              <div className="pl-4 text-white/40">crop: "WHEAT",</div>
              <div className="pl-4 text-white/40">timeframe: "NEXT_QUARTER"</div>
              <div className="text-white/80">) {'{'}</div>
              <div className="pl-4 text-[#4ADE80]">predictedTonnage</div>
              <div className="pl-4 text-[#4ADE80]">confidenceScore</div>
              <div className="pl-4 text-[#4ADE80]">climateRiskFactor</div>
              <div className="text-white/80">{'}'}</div>
            </div>
            <div className="text-primary/80">{'}'}</div>
          </div>
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-[#050505] p-8 border border-white/5 space-y-6 group hover:border-primary/30 transition-colors rounded-sm h-full flex flex-col">
    <div className="text-primary">{icon}</div>
    <div className="flex-1">
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
    </div>
  </div>
);
