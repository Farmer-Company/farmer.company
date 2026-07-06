import React from 'react';
import { motion } from 'framer-motion';
import { 
 Globe, 
 FileText, 
 ShieldCheck, 
 TrendingUp, 
 Truck, 
 BarChart3, 
 ArrowRight,
 Plus,
} from 'lucide-react';

export const SupplyCRMPage = () => {
 return (
 <div className="pt-32 pb-20 px-6 min-h-screen bg-black relative overflow-hidden">
 {/* Background Gradients */}
 <div className="absolute inset-0 bg-gradient-to-b from-[#4ADE80]/5 to-transparent pointer-events-none" />
 <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#4ADE80]/5 blur-[150px] rounded-full pointer-events-none" />

 {/* Hero Section */}
 <section className="max-w-7xl mx-auto mb-32 relative z-10">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
 <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="space-y-8 max-w-3xl"
 >
 <div className="flex items-center gap-4">
 <span className="px-3 py-1.5 bg-[#4ADE80]/10 text-[#4ADE80] text-[10px] font-bold uppercase tracking-widest rounded-sm border border-[#4ADE80]/20" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Institutional Protocol
 </span>
 <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Global Trade Enabled</span>
 </div>
 <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter uppercase leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
 Supply <span className="text-[#4ADE80]">CRM</span>
 </h1>
 <p className="text-white/60 text-lg md:text-xl font-normal leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
 Manage your supply node as a global enterprise. Direct institutional contracting, automated compliance, and real-time escrow settlement—all within a single cryptographic protocol.
 </p>
 <div className="flex flex-wrap gap-4 pt-6">
 <button className="px-8 py-4 bg-[#4ADE80] text-black font-bold uppercase tracking-wider text-[11px] flex items-center gap-3 hover:bg-white transition-colors rounded-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Access Procurement Network <ArrowRight size={16} />
 </button>
 </div>
 </motion.div>
 </div>
 </section>

 {/* Metrics Row */}
 <motion.section 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="max-w-7xl mx-auto mb-32 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden rounded-sm relative z-10"
  style={{ backdropFilter: 'blur(10px)', boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}
 >
 <MetricBox value="Private Beta" label="Access Status" sub="Applications open" />
 <MetricBox value="12" label="Countries in Network" sub="EU, Gulf, SEA, US" />
 <MetricBox value="Institutional" label="Contract Standard" sub="Digital signatures" />
 <MetricBox value="Zero" label="Intermediaries" isPrimary sub="Farm → Buyer direct" />
 </motion.section>

 {/* Core Features Grid */}
 <section className="max-w-7xl mx-auto mb-40 relative z-10">
 <div className="flex items-center gap-6 mb-16">
 <div className="h-px flex-1 bg-white/10" />
 <h2 className="text-[11px] text-white/40 font-bold uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Protocol Modules</h2>
 <div className="h-px flex-1 bg-white/10" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5 rounded-sm overflow-hidden" style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}>
 <FeatureCard 
 icon={<Globe className="text-[#4ADE80]" size={24} />}
 title="Global Counterparties"
 desc="Access verified institutional buyers with public credit ratings, payment history, and KYB. Every buyer is cryptographically verified before they issue an RFQ."
 action="View Network"
 />
 <FeatureCard 
 icon={<FileText className="text-[#4ADE80]" size={24} />}
 title="Smart Contracts"
 desc="Execute institutional offtake agreements with digital signatures, automated milestone tracking, and self-executing escrow releases."
 action="Review Standards"
 />
 <FeatureCard 
 icon={<ShieldCheck className="text-[#4ADE80]" size={24} />}
 title="Automated Compliance"
 desc="Auto-generate Phytosanitary Certificates, Certificates of Origin, and Commercial Invoices instantly. EU, US, and Gulf protocols natively integrated."
 action="Verify Compliance"
 />
 <FeatureCard 
 icon={<TrendingUp className="text-[#4ADE80]" size={24} />}
 title="Algorithmic Matching"
 desc="Publish supply metrics and receive institutional RFQs instantly. The OS matches based on commodity grade, volume, and predictive delivery windows."
 action="Simulate Match"
 />
 <FeatureCard 
 icon={<Truck className="text-[#4ADE80]" size={24} />}
 title="Escrow & Logistics"
 desc="Letter of Credit facilitation and real-time Maersk/MSC tracking via API. Execute international trade finance without legacy banking overhead."
 action="Track Shipment"
 />
 <FeatureCard 
 icon={<BarChart3 className="text-[#4ADE80]" size={24} />}
 title="Yield Analytics"
 desc="Real-time margin analysis, dynamic counterparty risk scoring, and forecast accuracy metrics. Optimize your yield against predictive market data."
 action="View Dashboards"
 />
 </div>
 </section>

 {/* Workflow Section */}
 <section className="max-w-7xl mx-auto mb-40 bg-black border border-white/10 p-10 md:p-20 relative overflow-hidden rounded-sm" style={{ boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.05)' }}>
 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4ADE80]/5 blur-[150px] rounded-full pointer-events-none" />
 
 <div className="relative z-10">
 <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest block mb-6" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 EXECUTION PROTOCOL
 </span>
 <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tighter mb-20" style={{ fontFamily: '"Inter", sans-serif' }}>
 Institutional Workflow
 </h2>
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
 <WorkflowStep num="01" title="Initialize" desc="Complete export readiness profile and upload required institutional certifications." />
 <WorkflowStep num="02" title="Broadcast" desc="Publish verified volume, grades, and smart contract terms to the global network." />
 <WorkflowStep num="03" title="Sync" desc="Receive direct institutional RFQs and digitally sign offtake agreements." />
 <WorkflowStep num="04" title="Execute" desc="Generate compliance docs, load containers, and trigger automatic escrow release." />
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="max-w-3xl mx-auto text-center py-20 relative z-10">
 <div className="w-20 h-20 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(74,222,128,0.1)]">
 <ShieldCheck className="text-[#4ADE80]" size={36} />
 </div>
 <h2 className="text-4xl md:text-6xl font-extrabold text-white uppercase tracking-tighter mb-8" style={{ fontFamily: '"Inter", sans-serif' }}>
 Request Node Access
 </h2>
 <p className="text-white/60 text-lg font-normal leading-relaxed mb-12" style={{ fontFamily: '"Inter", sans-serif' }}>
 The Global Agri OS is currently in private beta. We are onboarding verified exporters, commercial farms, and institutional buyers in limited cohorts. Apply below for network clearance.
 </p>
 <button className="px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-[11px] hover:bg-[#4ADE80] transition-colors rounded-sm shadow-2xl" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Initialize Application
 </button>
 </section>
 </div>
 );
};

const MetricBox = ({ value, label, sub, isPrimary }: any) => (
 <div className="bg-black/50 p-10 flex flex-col justify-between group hover:bg-[#4ADE80]/5 transition-colors">
 <div className="space-y-2">
 <span className={`text-4xl font-extrabold tracking-tighter ${isPrimary ? 'text-[#4ADE80]' : 'text-white'}`} style={{ fontFamily: '"Inter", sans-serif' }}>{value}</span>
 <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{label}</p>
 </div>
 <div className="mt-8 flex items-center gap-3">
 <div className={`w-1.5 h-1.5 rounded-full ${isPrimary ? 'bg-[#4ADE80]' : 'bg-white/20'}`} />
 <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>{sub}</span>
 </div>
 </div>
);

const FeatureCard = ({ icon, title, desc, action }: any) => (
 <div className="bg-black/80 p-12 flex flex-col justify-between group hover:bg-black transition-all relative overflow-hidden">
 <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
 {icon}
 </div>
 <div className="space-y-8">
 <div className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-[#4ADE80]/10 border border-transparent group-hover:border-[#4ADE80]/20 transition-colors">
 {icon}
 </div>
 <div className="space-y-4">
 <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>{title}</h3>
 <p className="text-base text-white/50 leading-relaxed font-normal" style={{ fontFamily: '"Inter", sans-serif' }}>{desc}</p>
 </div>
 </div>
 <div className="mt-12">
 <button className="flex items-center gap-2 text-[11px] font-bold text-[#4ADE80] uppercase tracking-widest border-b border-[#4ADE80]/20 pb-1 hover:border-[#4ADE80] transition-all" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 {action} <Plus size={14} />
 </button>
 </div>
 </div>
);

const WorkflowStep = ({ num, title, desc }: any) => (
 <div className="space-y-6 relative">
 <span className="text-8xl font-extrabold text-white/5 tracking-tighter leading-none block -ml-2" style={{ fontFamily: '"Inter", sans-serif' }}>{num}</span>
 <div className="space-y-4 relative z-10 -mt-10">
 <h4 className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>{title}</h4>
 <p className="text-sm text-white/50 leading-relaxed font-normal" style={{ fontFamily: '"Inter", sans-serif' }}>{desc}</p>
 </div>
 </div>
);
