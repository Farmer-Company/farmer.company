import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Quote, Star } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#4ADE80]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-20">
          <div className="space-y-6 max-w-2xl">
            <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest block" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              FIELD VALIDATION
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
              Built in the field.<br />
              Proven by <span className="text-[#4ADE80]">volume.</span>
            </h2>
            <p className="text-white/60 text-lg font-normal leading-[1.6]" style={{ fontFamily: '"Inter", sans-serif' }}>
              Tamil Nadu operations, farm gate trading, market data and verified transaction stories give the protocol its proof base before global scale.
            </p>
          </div>

          <div className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-sm p-5" style={{ backdropFilter: 'blur(10px)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}>
            <div className="w-12 h-12 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-full flex items-center justify-center text-[#4ADE80]">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-white font-bold text-2xl tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Tamil Nadu</p>
              <p className="text-[#4ADE80] text-[10px] font-bold uppercase tracking-widest mt-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Active Field Grounding</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#050505] border border-white/10 rounded-sm overflow-hidden flex flex-col lg:flex-row mb-16 group hover:border-[#4ADE80]/30 transition-colors duration-500"
          style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
        >
          <div className="lg:w-2/5 bg-black relative min-h-[300px] border-r border-white/10">
            <div className="absolute inset-0 opacity-40 grayscale mix-blend-luminosity" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <span className="bg-[#4ADE80] text-black text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest mb-4 inline-block" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Enterprise Case Study</span>
              <h3 className="text-white text-3xl font-bold tracking-tight mb-1" style={{ fontFamily: '"Inter", sans-serif' }}>K. Muthusamy</h3>
              <p className="text-white/50 text-sm font-medium uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>FPO Lead - 500+ Acres</p>
            </div>
          </div>
          <div className="lg:w-3/5 p-10 md:p-16 flex flex-col justify-center relative">
            <Quote className="absolute top-10 right-10 text-[#4ADE80]/10 w-32 h-32" />
            <h4 className="text-2xl md:text-3xl text-white font-medium leading-[1.4] mb-10 relative z-10" style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic' }}>
              "Before the OS, we accepted whatever the local agent offered. Last season, we aggregated 50 tons of tomatoes and executed a direct contract with a verified buyer. Our net realization increased, with capital secured in escrow."
            </h4>
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10 relative z-10">
              <CaseMetric label="Legacy margin" value="Rs 14/kg" muted />
              <CaseMetric label="Protocol margin" value="Rs 18/kg" primary />
              <CaseMetric label="Net increase" value="+28.5%" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="The predictive intelligence helped us wait instead of panic selling. We used the signal to plan harvest timing and buyer conversations."
            name="S. Raman"
            role="Onion Aggregator"
            location="Dindigul"
          />
          <TestimonialCard
            quote="Escrow changed the payment conversation. The buyer knew the lot was verified and we knew the money was already locked."
            name="R. Lakshmi"
            role="Mango Export Co."
            location="Salem"
          />
          <TestimonialCard
            quote="Traceability matters for institutional buying. The protocol gives us source, quality and logistics context in one workflow."
            name="A. Kumar"
            role="Procurement"
            location="FMCG"
            isBuyer
          />
        </div>
      </div>
    </section>
  );
};

const CaseMetric = ({ label, value, primary = false, muted = false }: { label: string; value: string; primary?: boolean; muted?: boolean }) => (
  <div>
    <p className={`${primary ? 'text-[#4ADE80]/50' : 'text-white/40'} text-[10px] font-bold uppercase tracking-widest mb-2`} style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{label}</p>
    <p className={`${primary ? 'text-[#4ADE80] font-bold' : muted ? 'text-white' : 'text-white font-bold'} text-2xl font-mono tracking-tight`}>{value}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role, location, isBuyer }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-black border border-white/10 p-10 rounded-sm hover:border-[#4ADE80]/30 transition-colors flex flex-col"
    style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
  >
    <div className="flex gap-1 text-[#4ADE80] mb-8">
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
      <Star size={14} fill="currentColor" />
    </div>
    <p className="text-white/80 text-base leading-[1.7] mb-10 flex-1" style={{ fontFamily: '"Inter", sans-serif' }}>
      "{quote}"
    </p>
    <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
      <div className={`w-10 h-10 rounded-sm flex items-center justify-center font-bold text-lg ${isBuyer ? 'bg-white/10 text-white' : 'bg-[#4ADE80]/20 text-[#4ADE80]'}`} style={{ fontFamily: '"Inter", sans-serif' }}>
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-white font-bold text-sm tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>{name}</p>
        <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{role} - {location}</p>
      </div>
    </div>
  </motion.div>
);
