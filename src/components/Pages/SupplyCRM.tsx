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
 CheckCircle2,
 Clock
} from 'lucide-react';

export const SupplyCRMPage = () => {
 return (
 <div className="pt-24 pb-20 px-6 min-h-screen bg-background">
 {/* Hero Section */}
 <section className="max-w-7xl mx-auto mb-20">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
 <div className="space-y-6 max-w-2xl">
 <div className="flex items-center gap-3">
 <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-medium normal-case rounded-full border border-primary/20">
 B2B Protocol
 </span>
 <span className="text-white/20 mono text-[10px]">Institutional Grade</span>
 </div>
 <h1 className="display text-5xl md:text-7xl font-light text-white normal-case tracking-tight leading-[0.85]">
 Supply CRM
 </h1>
 <p className="text-foreground-muted text-lg md:text-xl font-light leading-relaxed">
 Manage your farm as a global supply node. Direct contracting, trade finance, compliance, and multi‑buyer relationship management – all in one protocol.
 </p>
 <div className="flex flex-wrap gap-4 pt-4">
 <button className="px-8 py-4 bg-primary text-black font-medium normal-case text-xs flex items-center gap-3 hover:bg-primary/90 transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(29,185,84,0.3)]">
 Access Global Procurement Network <ArrowRight size={16} />
 </button>
 </div>
 </div>
 <div className="hidden lg:block w-px h-48 bg-white/5" />
 </div>
 </section>

 {/* Metrics Row */}
 <section className="max-w-7xl mx-auto mb-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 overflow-hidden">
 <MetricBox value="Private Beta" label="Access Status" sub="Applications open" />
 <MetricBox value="12" label="Countries in Buyer Network" sub="EU, Gulf, SEA, US" />
 <MetricBox value="Institutional" label="Contract Standard" sub="Digital signatures, milestone tracking" />
 <MetricBox value="Zero" label="Middlemen in the Chain" isPrimary sub="Farm → Buyer direct" />
 </section>

 {/* Core Features Grid */}
 <section className="max-w-7xl mx-auto mb-32">
 <div className="flex items-center gap-4 mb-12">
 <div className="h-px flex-1 bg-white/5" />
 <h2 className="mono text-[10px] text-white/40 normal-case font-medium">Institutional Modules</h2>
 <div className="h-px flex-1 bg-white/5" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5">
 <FeatureCard 
 icon={<Globe className="text-primary" size={24} />}
 title="Buyer Portfolio"
 desc="Verified global counterparties with credit ratings, payment history, and KYB onboarding. Every buyer on the network is pre-qualified before they can send an RFQ."
 action="Add Global Buyer"
 />
 <FeatureCard 
 icon={<FileText className="text-primary" size={24} />}
 title="Contract Lifecycle"
 desc="Institutional offtake agreements with digital signatures, version control, and milestone tracking. Built to international trade standards."
 action="Draft Contract"
 />
 <FeatureCard 
 icon={<ShieldCheck className="text-primary" size={24} />}
 title="Global Compliance"
 desc="Auto-generate phytosanitary certificates, Certificate of Origin, and commercial invoices for any destination. EU, US, and Gulf standards pre-loaded."
 action="Compliance Check"
 />
 <FeatureCard 
 icon={<TrendingUp className="text-primary" size={24} />}
 title="Matching Engine"
 desc="Publish supply availabilities and receive institutional RFQs from pre-approved buyers. Algorithmic matching on commodity, grade, volume, and delivery window."
 action="Post Availability"
 />
 <FeatureCard 
 icon={<Truck className="text-primary" size={24} />}
 title="Logistics & Finance"
 desc="Letter of Credit facilitation, invoice factoring, and real-time container tracking via Maersk and MSC integration. Trade finance without the bank relationship overhead."
 action="Shipment Workflow"
 />
 <FeatureCard 
 icon={<BarChart3 className="text-primary" size={24} />}
 title="Supply Analytics"
 desc="Margin analysis, counterparty risk scores, and forecast accuracy per commodity and region. Know which buyers pay fastest and which markets give best realisation."
 action="View Performance"
 />
 </div>
 </section>

 {/* Workflow Section */}
 <section className="max-w-7xl mx-auto mb-32 bg-[#050505] border border-white/5 p-8 md:p-16 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
 
 <div className="relative z-10">
 <h2 className="display text-4xl md:text-5xl font-light text-white normal-case tracking-tight mb-16">
 Institutional Supply Workflow
 </h2>
 
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
 <WorkflowStep num="01" title="Onboard" desc="Complete export readiness profile and upload certifications." />
 <WorkflowStep num="02" title="Publish" desc="Post volume, grades, and target price to the procurement network." />
 <WorkflowStep num="03" title="Negotiate" desc="Receive institutional RFQs and settle contract terms digitally." />
 <WorkflowStep num="04" title="Fulfill" desc="Generate compliance docs and track shipment to destination." />
 </div>
 </div>
 </section>

 {/* Final CTA */}
 <section className="max-w-3xl mx-auto text-center py-20">
 <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
 <ShieldCheck className="text-primary" size={32} />
 </div>
 <h2 className="display text-3xl md:text-5xl font-light text-white normal-case tracking-tight mb-6">
 Apply for Supply CRM Access
 </h2>
 <p className="text-foreground-muted text-lg font-light mb-10">
 Supply CRM is in private beta. We onboard verified exporters, large-scale farmers, and institutional buyers in cohorts. Apply below — we'll review your supply profile and respond within 48 hours.
 </p>
 <button className="px-10 py-5 bg-white text-black font-medium normal-case text-xs hover:bg-primary transition-all rounded-sm shadow-2xl">
 Request B2B Access
 </button>
 </section>
 </div>
 );
};

const MetricBox = ({ value, label, sub, isPrimary }: any) => (
 <div className="bg-[#050505] p-8 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
 <div className="space-y-1">
 <span className={`mono text-3xl font-light ${isPrimary ? 'text-primary' : 'text-white'}`}>{value}</span>
 <p className="text-[10px] font-medium text-white/40 normal-case leading-tight">{label}</p>
 </div>
 <div className="mt-4 flex items-center gap-2">
 <div className={`w-1 h-1 rounded-full ${isPrimary ? 'bg-primary' : 'bg-white/20'}`} />
 <span className="mono text-[8px] text-white/20 normal-case ">{sub}</span>
 </div>
 </div>
);

const FeatureCard = ({ icon, title, desc, action }: any) => (
 <div className="bg-[#050505] p-10 flex flex-col justify-between group hover:bg-[#080808] transition-all relative overflow-hidden">
 <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
 {icon}
 </div>
 <div className="space-y-6">
 <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-primary/10 transition-colors">
 {icon}
 </div>
 <div className="space-y-3">
 <h3 className="text-xl font-medium text-white normal-case tracking-tight">{title}</h3>
 <p className="text-sm font-light text-foreground-muted leading-relaxed">{desc}</p>
 </div>
 </div>
 <div className="mt-10">
 <button className="flex items-center gap-2 text-[10px] font-medium text-primary normal-case border-b border-primary/20 pb-1 hover:border-primary transition-all">
 {action} <Plus size={12} />
 </button>
 </div>
 </div>
);

const WorkflowStep = ({ num, title, desc }: any) => (
 <div className="space-y-6">
 <span className="display text-6xl font-light text-white/5 leading-none">{num}</span>
 <div className="space-y-3">
 <h4 className="text-xl font-medium text-white normal-case tracking-tight">{title}</h4>
 <p className="text-sm font-light text-foreground-muted leading-relaxed">{desc}</p>
 </div>
 </div>
);
