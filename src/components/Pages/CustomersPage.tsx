import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Eye, Send, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const CustomersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <span className="text-[#A78BFA] text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            FOR GLOBAL BUYERS, FMCG & PROCESSORS
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
            Direct sourcing.<br />
            <span className="text-[#A78BFA]">Traceable at scale.</span>
          </h1>
          <p className="max-w-3xl text-white/60 text-lg leading-relaxed">
            Built for enterprise procurement, FMCG supply teams, processors, exporters, and institutional buyers that need verified farm supply, compliance documents, and traceable offtake contracts.
          </p>
        </motion.div>

        {/* 1. What you get in 10 seconds */}
        <div className="space-y-8 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
            What you get in 10 seconds
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#050505] border border-white/10 p-8 rounded-lg flex items-start gap-4">
              <div className="mt-1 text-[#A78BFA]"><CheckCircle size={20} /></div>
              <p className="text-white/80 text-lg leading-relaxed">
                Source verified quality produce directly from farms, FPOs, and processors with transparent supply context.
              </p>
            </div>
            <div className="bg-[#050505] border border-white/10 p-8 rounded-lg flex items-start gap-4">
              <div className="mt-1 text-[#A78BFA]"><CheckCircle size={20} /></div>
              <p className="text-white/80 text-lg leading-relaxed">
                Manage institutional offtake with quality rules, compliance records, logistics coordination, and digital agreements.
              </p>
            </div>
          </div>
        </div>

        {/* 2. How it works in 3 steps */}
        <div className="space-y-8 border-t border-white/10 pt-12">
          <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA] font-bold font-mono">1</div>
              <h3 className="text-white font-bold text-lg">Describe your needs</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Input required commodities, SKUs, volumes, certifications, and quality specifications.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA] font-bold font-mono">2</div>
              <h3 className="text-white font-bold text-lg">Connect Buyer Agent</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Let the agent scan verified farms and processors for the right quality, timing, and price band.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA] font-bold font-mono">3</div>
              <h3 className="text-white font-bold text-lg">Execute offtake</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Review matched supply, approve terms, coordinate logistics, and track compliance documents.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Agent Mode Panel */}
        <div className="bg-[#111] border border-white/10 p-8 md:p-12 rounded-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent opacity-50" />
          <h2 className="text-2xl font-bold text-white tracking-tight mb-8" style={{ fontFamily: '"Inter", sans-serif' }}>
            Use Digital Orchard with or without an agent.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-black border border-white/10 p-6 rounded-lg group">
              <div className="flex items-center gap-3 mb-4">
                <Eye size={20} className="text-white/40 group-hover:text-white transition-colors" />
                <h3 className="font-bold text-white">Manual</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                You do everything yourself. Manually search the farm directory and negotiate terms.
              </p>
            </div>

            <div className="bg-black border border-white/10 p-6 rounded-lg group">
              <div className="flex items-center gap-3 mb-4">
                <Send size={20} className="text-[#FBBF24]/60 group-hover:text-[#FBBF24] transition-colors" />
                <h3 className="font-bold text-white">Co-pilot</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Your Buyer Agent curates farm matches, drafts RFQs, and suggests contract terms; you approve.
              </p>
            </div>

            <div className="bg-black border border-[#A78BFA]/30 p-6 rounded-lg shadow-[0_0_30px_rgba(167,139,250,0.1)] relative">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#A78BFA]/10 text-[#A78BFA] text-[10px] uppercase tracking-widest font-bold rounded-bl-lg">Advanced</div>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-[#A78BFA]" />
                <h3 className="font-bold text-white">Autopilot</h3>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                For experienced buyers. Your agent can reserve commodities when they hit your exact price, quality, and delivery thresholds.
              </p>
            </div>

          </div>
        </div>

        {/* 4. Bottom CTAs */}
        <div className="flex flex-col items-start space-y-6 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Button size="lg" onClick={() => navigate('/signin')} className="uppercase font-bold tracking-wider rounded-full px-8 flex items-center justify-center gap-2 bg-[#A78BFA] hover:bg-[#8b5cf6] text-white">
              Create your free Buyer profile <ArrowRight size={16} />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider rounded-full px-8" onClick={() => navigate('/story')}>
              See a 3-minute demo
            </Button>
          </div>
          <p className="text-white/40 text-[13px]">
            Takes 3 minutes. No card required. Agent features are optional.
          </p>
        </div>

      </div>
    </div>
  );
};
