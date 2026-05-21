import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';

export const ComparisonSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="mono text-[10px] text-primary font-medium normal-case tracking-widest mb-4 block">
            SUPPLY CHAIN ANALYSIS
          </span>
          <h2 className="text-[34px] md:text-[48px] font-semibold text-white tracking-[-0.02em] leading-[1.1] mb-6">
            The difference is in the data.
          </h2>
          <p className="text-foreground-muted text-[17px] font-normal leading-[1.5]">
            See exactly where value leaks in the traditional system, and how the Digital Orchard protocol secures it.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full overflow-x-auto"
        >
          <div className="min-w-[800px] border border-white/10 rounded-2xl overflow-hidden bg-[#0A0A0A]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-6 w-1/3 font-medium text-white/60 text-sm uppercase tracking-wider">Metric</th>
                  <th className="p-6 w-1/3 font-medium text-white/60 text-sm uppercase tracking-wider border-l border-white/10 bg-red-950/10">Traditional System</th>
                  <th className="p-6 w-1/3 font-medium text-primary text-sm uppercase tracking-wider border-l border-white/10 bg-primary/5">Digital Orchard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-medium">Price Discovery</td>
                  <td className="p-6 text-white/60 border-l border-white/10 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-2"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> Local aggregator dictates price</span>
                  </td>
                  <td className="p-6 text-white border-l border-white/10 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <span className="flex items-start gap-2"><Check size={18} className="text-primary mt-0.5 shrink-0" /> Live data from 6,900+ markets</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-medium">Middlemen Margins</td>
                  <td className="p-6 text-white/60 border-l border-white/10 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-2"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> 30-40% lost to 3-5 layers</span>
                  </td>
                  <td className="p-6 text-white border-l border-white/10 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <span className="flex items-start gap-2"><Check size={18} className="text-primary mt-0.5 shrink-0" /> Zero commission. 0% middlemen</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-medium">Payment Terms</td>
                  <td className="p-6 text-white/60 border-l border-white/10 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-2"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> Delayed 15-45 days, high default risk</span>
                  </td>
                  <td className="p-6 text-white border-l border-white/10 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <span className="flex items-start gap-2"><Check size={18} className="text-primary mt-0.5 shrink-0" /> Instant escrow release at pickup</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-medium">Post-Harvest Loss</td>
                  <td className="p-6 text-white/60 border-l border-white/10 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-2"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> 20-30% rots waiting for buyers</span>
                  </td>
                  <td className="p-6 text-white border-l border-white/10 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <span className="flex items-start gap-2"><Check size={18} className="text-primary mt-0.5 shrink-0" /> Pre-booked before harvest</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-white font-medium">Data & Portfolio</td>
                  <td className="p-6 text-white/60 border-l border-white/10 bg-red-950/5 group-hover:bg-red-950/20 transition-colors">
                    <span className="flex items-start gap-2"><X size={18} className="text-red-500 mt-0.5 shrink-0" /> None. Anonymous supply.</span>
                  </td>
                  <td className="p-6 text-white border-l border-white/10 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                    <span className="flex items-start gap-2"><Check size={18} className="text-primary mt-0.5 shrink-0" /> Permanent digital farm portfolio</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <div className="mt-12 text-center">
          <p className="text-white/60 text-sm mb-6 max-w-2xl mx-auto">
            By shifting from a fragmented, speculative model to an integrated, data-driven protocol, we don't just optimize the chain—we rewrite the economics of agriculture.
          </p>
          <button className="text-primary hover:text-white transition-colors font-medium flex items-center gap-2 mx-auto">
            Read the full whitepaper <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
