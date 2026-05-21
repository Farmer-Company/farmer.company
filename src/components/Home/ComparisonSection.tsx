import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';

export const ComparisonSection = () => {
  return (
    <section className="py-24 md:py-32 bg-black relative border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-[#4ADE80]/5 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest mb-4 block" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            SYSTEM ARCHITECTURE ANALYSIS
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase leading-[1.05] mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
            The difference is in the <span className="text-[#4ADE80]">Protocol.</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: '"Inter", sans-serif' }}>
            See exactly where value leaks in legacy fragmented supply chains, and how the Global Agri OS secures and distributes that value.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full overflow-x-auto"
        >
          <div className="min-w-[800px] border border-white/10 rounded-sm overflow-hidden bg-black/50"
               style={{ backdropFilter: 'blur(10px)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}>
            <table className="w-full text-left border-collapse" style={{ fontFamily: '"Inter", sans-serif' }}>
              <thead>
                <tr className="border-b border-white/10" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <th className="p-6 w-1/3 font-bold text-white/40 text-[11px] uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Metric</th>
                  <th className="p-6 w-1/3 font-bold text-white/40 text-[11px] uppercase tracking-widest border-l border-white/10 bg-red-950/20" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Legacy Fragmented Systems</th>
                  <th className="p-6 w-1/3 font-bold text-[#4ADE80] text-[11px] uppercase tracking-widest border-l border-white/10 bg-[#4ADE80]/5" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Global Agri OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-bold tracking-tight">Price Discovery</td>
                  <td className="p-6 text-white/60 border-l border-white/5 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> Asymmetric. Local aggregators dictate prices based on isolation.</span>
                  </td>
                  <td className="p-6 text-white border-l border-[#4ADE80]/10 bg-[#4ADE80]/5 group-hover:bg-[#4ADE80]/10 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><Check size={18} className="text-[#4ADE80] mt-0.5 shrink-0" /> Symmetric. Live predictive data from 6,900+ global indices.</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-bold tracking-tight">Intermediary Margins</td>
                  <td className="p-6 text-white/60 border-l border-white/5 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> 30-40% of gross value lost to 3-5 layers of middlemen.</span>
                  </td>
                  <td className="p-6 text-white border-l border-[#4ADE80]/10 bg-[#4ADE80]/5 group-hover:bg-[#4ADE80]/10 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><Check size={18} className="text-[#4ADE80] mt-0.5 shrink-0" /> 0% intermediary leakage. Direct peer-to-peer contracting.</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-bold tracking-tight">Settlement Protocol</td>
                  <td className="p-6 text-white/60 border-l border-white/5 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> High default risk. Settlements delayed by 15-45 days.</span>
                  </td>
                  <td className="p-6 text-white border-l border-[#4ADE80]/10 bg-[#4ADE80]/5 group-hover:bg-[#4ADE80]/10 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><Check size={18} className="text-[#4ADE80] mt-0.5 shrink-0" /> Cryptographic escrow. Instant release upon digital BoL signing.</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-bold tracking-tight">Post-Harvest Loss</td>
                  <td className="p-6 text-white/60 border-l border-white/5 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> 20-30% loss due to uncoordinated transport and spoilage.</span>
                  </td>
                  <td className="p-6 text-white border-l border-[#4ADE80]/10 bg-[#4ADE80]/5 group-hover:bg-[#4ADE80]/10 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><Check size={18} className="text-[#4ADE80] mt-0.5 shrink-0" /> <span dangerouslySetInnerHTML={{ __html: '&lt;2%' }} /> loss. Capacities are pre-booked and routed autonomously.</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-bold tracking-tight">Quality Traceability</td>
                  <td className="p-6 text-white/60 border-l border-white/5 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> Zero provenance. Commodities are blindly mixed at aggregation.</span>
                  </td>
                  <td className="p-6 text-white border-l border-[#4ADE80]/10 bg-[#4ADE80]/5 group-hover:bg-[#4ADE80]/10 transition-colors">
                    <span className="flex items-start gap-3 text-sm leading-relaxed"><Check size={18} className="text-[#4ADE80] mt-0.5 shrink-0" /> Immutable ledger. Every batch carries a verified Farm Intelligence Score.</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <div className="mt-16 text-center">
          <p className="text-white/50 text-sm mb-6 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
            By shifting from a fragmented, speculative model to an integrated, data-driven protocol, we don't just optimize the supply chain—we rewrite the underlying economics of global agriculture.
          </p>
          <button className="text-[#4ADE80] hover:text-white transition-colors font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 mx-auto" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Read the Architecture Whitepaper <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
