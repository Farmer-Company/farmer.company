import React from 'react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, TrendingUp, ShieldAlert, BarChart3, Globe } from 'lucide-react';

export const InsightsPage = () => {
 const { t } = useLanguage();
 return (
 <div className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white pb-24 relative overflow-hidden">
 {/* Background Gradients */}
 <div className="absolute inset-0 bg-gradient-to-b from-[#4ADE80]/5 to-transparent pointer-events-none" />
 <div className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] bg-[#4ADE80]/5 blur-[150px] rounded-full pointer-events-none" />

 <div className="max-w-7xl mx-auto relative z-10">
 <div className="space-y-6 max-w-4xl mb-16">
 <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest block" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 PREDICTIVE INTELLIGENCE
 </span>
 <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
 {t('insights')} <span className="text-[#4ADE80]">Protocol.</span>
 </h1>
 <p className="text-white/60 text-lg md:text-xl font-normal leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
 Algorithmic price forecasting powered by 25 years of institutional arrivals data. Use live predictive signals to optimize harvest timing and maximize yield realization.
 </p>
 </div>

 <div className="mt-8 p-5 bg-[#4ADE80]/10 border border-[#4ADE80]/20 text-[#4ADE80] text-sm font-medium leading-relaxed mb-12 rounded-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] flex items-start gap-4" style={{ fontFamily: '"Inter", sans-serif' }}>
 <Activity size={20} className="shrink-0 mt-0.5" />
 <div>
 <strong className="block mb-1 tracking-tight text-[#4ADE80]" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', textTransform: 'uppercase', fontSize: '11px', fontWeight: 'bold' }}>Live Intelligence Active</strong>
 The feed below represents live algorithmic advisories. Institutional models update continuously as verified global price feeds sync with the OS.
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 pb-24">
 <div className="lg:col-span-3 space-y-6">
 {[
 { 
 module: 'Forecast Engine', 
 title: 'Onion indices predict a 12% rise in Nashik over the next 30-day window.', 
 body: 'Algorithmic modal price target: ₹1,650/q. A critical supply deficit has been detected across major Maharashtra aggregation nodes. Early sellers face an 8% discount vs. the projected mid-month window.', 
 type: 'Yield Optimization',
 icon: <TrendingUp size={20} className="text-[#4ADE80]" />
 },
 { 
 module: 'Risk OS', 
 title: 'Tomato price volatility index has spiked to 0.32 — Classified: High.', 
 body: 'Volatility exceeding 0.25 triggers an immediate hedging advisory. Recommend shifting to cold-chain storage or immediate liquidation. Kolar and Azadpur nodes are showing divergent predictive signals.', 
 type: 'Volatility Alert',
 icon: <ShieldAlert size={20} className="text-[#4ADE80]" />
 },
 { 
 module: 'Compliance Node', 
 title: 'Institutional Wheat MSP increased 5% — Compliance update required.', 
 body: 'Ensure all smart contracts and trade ledgers align with the new MSP floor. The Agri OS compliance module will automatically flag non-compliant transactions before ledger recording.', 
 type: 'Regulatory Protocol',
 icon: <Activity size={20} className="text-[#4ADE80]" />
 },
 { 
 module: 'Supply CRM', 
 title: 'Grade A Basmati demand surge from EU institutional buyers — 3 RFQs live.', 
 body: 'Pre-qualified enterprise buyers in Germany and the Netherlands are actively sourcing. Average smart contract size: ₹18M. Export readiness protocols are available in your Supply CRM dashboard.', 
 type: 'Global Demand',
 icon: <Globe size={20} className="text-[#4ADE80]" />
 }
 ].map((item, i) => (
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ delay: i * 0.1 }}
 key={i} 
 className="p-8 md:p-12 border border-white/10 bg-black/50 backdrop-blur-md rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-[#4ADE80]/40 transition-all relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
 >
 <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#4ADE80]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
 <div className="space-y-5 relative z-10 flex-1">
 <div className="flex items-center gap-4">
 <div className="p-2 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-sm">
 {item.icon}
 </div>
 <div className="flex flex-col">
 <span className="text-[10px] font-bold text-[#4ADE80] uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{item.module}</span>
 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{item.type}</span>
 </div>
 </div>
 <h3 className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white group-hover:text-[#4ADE80] transition-colors leading-[1.2]" style={{ fontFamily: '"Inter", sans-serif' }}>
 {item.title}
 </h3>
 <p className="text-white/60 text-sm md:text-base font-normal leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
 {item.body}
 </p>
 </div>
 <div className="hidden md:flex shrink-0 items-center justify-center w-14 h-14 bg-white/5 border border-white/10 rounded-sm group-hover:bg-[#4ADE80]/10 group-hover:border-[#4ADE80]/30 transition-all relative z-10 cursor-pointer">
 <ArrowRight size={20} className="text-white/60 group-hover:text-[#4ADE80] transition-colors" />
 </div>
 </motion.div>
 ))}

 {/* Price Sentiment Section */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 className="p-10 md:p-12 border border-[#4ADE80]/20 bg-[#4ADE80]/5 backdrop-blur-xl mt-12 rounded-sm relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
 >
 <div className="flex items-center gap-3 mb-10">
 <BarChart3 className="text-[#4ADE80]" size={24} />
 <h3 className="text-[11px] font-bold text-[#4ADE80] uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Live Arbitrage Opportunities
 </h3>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
 <div className="space-y-4 p-6 bg-black/40 border border-white/5 rounded-sm">
 <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Tomato</span>
 <div className="space-y-2">
 <p className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
 LOW: <span className="text-[#4ADE80]">KOLAR (₹800/q)</span>
 </p>
 <p className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
 MAX: <span className="text-red-400">AZADPUR (₹1,300/q)</span>
 </p>
 </div>
 </div>
 <div className="space-y-4 p-6 bg-black/40 border border-white/5 rounded-sm">
 <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Onion</span>
 <div className="space-y-2">
 <p className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
 LOW: <span className="text-[#4ADE80]">LASALGAON (₹1,200/q)</span>
 </p>
 <p className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
 MAX: <span className="text-red-400">AZADPUR (₹1,600/q)</span>
 </p>
 </div>
 </div>
 <div className="space-y-4 p-6 bg-black/40 border border-white/5 rounded-sm">
 <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Potato</span>
 <div className="space-y-2">
 <p className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
 LOW: <span className="text-[#4ADE80]">KOLAR (₹600/q)</span>
 </p>
 <p className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
 MAX: <span className="text-red-400">NASHIK (₹750/q)</span>
 </p>
 </div>
 </div>
 </div>
 </motion.div>
 </div>

 <div className="lg:col-span-1 space-y-8">
 <div className="p-10 bg-black/80 border border-white/10 rounded-sm space-y-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md">
 <div className="space-y-3">
 <h4 className="text-2xl font-extrabold tracking-tighter text-white leading-none uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
 Intelligence<br />Node Status
 </h4>
 <div className="w-16 h-1 bg-[#4ADE80] rounded-full" />
 </div>

 <div className="space-y-8 pt-4">
 {[
 { geo: 'MH / PUNE', status: 'Sync Pending', intensity: 'w-[10%]', isActive: false },
 { geo: 'KA / BLR', status: 'Sync Pending', intensity: 'w-[10%]', isActive: false },
 { geo: 'TN / CHE', status: 'Live Feed', intensity: 'w-[100%]', isActive: true }
 ].map((node, i) => (
 <div key={i} className="space-y-3 group/node">
 <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 <span className="text-white/40 group-hover/node:text-[#4ADE80] transition-colors">{node.geo}</span>
 <span className={`${node.isActive ? 'text-[#4ADE80]' : 'text-white/60'}`}>{node.status}</span>
 </div>
 <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
 <div 
 className={`h-full ${node.isActive ? 'bg-[#4ADE80]' : 'bg-white/20'} ${node.intensity} rounded-full transition-all duration-1000`}
 />
 </div>
 </div>
 ))}
 </div>

 <div className="pt-6 border-t border-white/10 mt-6">
 <p className="text-xs text-white/50 font-medium leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
 Regional intelligence nodes activate dynamically as cryptographically verified price feeds synchronize with the global OS.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};
