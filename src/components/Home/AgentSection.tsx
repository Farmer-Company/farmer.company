import React from 'react';
import { Bot, LineChart, FileText, Route } from 'lucide-react';
import { motion } from 'framer-motion';

export const AgentSection = () => {
  return (
    <section className="w-full bg-[#0a0a0a] py-24 border-b border-white/5 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-12 h-12 bg-[#4ADE80]/10 border border-[#4ADE80]/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot size={24} className="text-[#4ADE80]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
            Your own AI agent in the agricultural protocol.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Farm Agent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#111] border border-white/10 p-8 rounded-xl hover:border-white/20 transition-colors"
          >
            <LineChart size={28} className="text-[#4ADE80] mb-6" />
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: '"Inter", sans-serif' }}>Farm Agent</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Watches prices, demand and logistics. Suggests when to plant, when to sell, and to whom.
            </p>
          </motion.div>

          {/* Buyer Agent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#111] border border-white/10 p-8 rounded-xl hover:border-white/20 transition-colors"
          >
            <FileText size={28} className="text-[#A78BFA] mb-6" />
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: '"Inter", sans-serif' }}>Buyer Agent</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Scans thousands of farms and vendors for your exact quality and price band, then drafts escrow-backed contracts for you to approve.
            </p>
          </motion.div>

          {/* Logistics Agent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#111] border border-white/10 p-8 rounded-xl hover:border-white/20 transition-colors"
          >
            <Route size={28} className="text-[#FBBF24] mb-6" />
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: '"Inter", sans-serif' }}>Logistics Agent</h3>
            <p className="text-white/60 leading-relaxed text-sm">
              Fills your trucks with pre-matched loads, reducing empty miles and spoilage.
            </p>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="text-white/40 text-sm font-medium tracking-wide uppercase" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            Every agent is linked to a real human account. <br className="md:hidden" />
            <span className="text-white/80">You set the limits; the agent does the heavy lifting.</span>
          </p>
        </motion.div>

      </div>
    </section>
  );
};
