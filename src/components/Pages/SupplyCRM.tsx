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
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20">
                B2B Protocol
              </span>
              <span className="text-white/20 mono text-[10px]">Institutional Grade</span>
            </div>
            <h1 className="display text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.85]">
              Supply CRM
            </h1>
            <p className="text-foreground-muted text-lg md:text-xl font-light leading-relaxed">
              Manage your farm as a global supply node. Direct contracting, trade finance, compliance, and multi‑buyer relationship management – all in one protocol.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="px-8 py-4 bg-primary text-black font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-primary/90 transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_30px_rgb(29,185,84,0.3)]">
                Access Global Procurement Network <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="hidden lg:block w-px h-48 bg-white/5" />
        </div>
      </section>

      {/* Metrics Row */}
      <section className="max-w-7xl mx-auto mb-20 grid grid-cols-2 md:grid-cols-5 gap-px bg-white/5 border border-white/5 overflow-hidden">
        <MetricBox value="142" label="Active Supply Contracts" sub="Growth +12%" />
        <MetricBox value="38" label="Global Buyers Engaged" sub="12 Countries" />
        <MetricBox value="47,500 MT" label="Volume Managed" sub="Institutional Scale" />
        <MetricBox value="₹2.8 Cr" label="Avg. Contract Value" sub="B2B Standard" />
        <MetricBox value="96%" label="On-Time Fulfilment" isPrimary sub="Accuracy" />
      </section>

      {/* Core Features Grid */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1 bg-white/5" />
          <h2 className="mono text-[10px] text-white/40 uppercase tracking-[5px] font-bold">Institutional Modules</h2>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-white/5 border border-white/5">
          <FeatureCard 
            icon={<Globe className="text-primary" size={24} />}
            title="Buyer Portfolio"
            desc="Verified global counterparties, credit ratings, and payment history. Automated KYB onboarding."
            action="Add Global Buyer"
          />
          <FeatureCard 
            icon={<FileText className="text-primary" size={24} />}
            title="Contract Lifecycle"
            desc="Institutional offtake agreements with digital signatures, version control, and milestone tracking."
            action="Draft Contract"
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-primary" size={24} />}
            title="Global Compliance"
            desc="Auto-generate phytosanitary, COO, and invoices for any destination. EU/US/Gulf standards."
            action="Compliance Check"
          />
          <FeatureCard 
            icon={<TrendingUp className="text-primary" size={24} />}
            title="Matching Engine"
            desc="Publish supply availabilities and receive institutional RFQs from pre-approved global buyers."
            action="Post Availability"
          />
          <FeatureCard 
            icon={<Truck className="text-primary" size={24} />}
            title="Logistics & Finance"
            desc="Letter of Credit facilitation, invoice factoring, and real-time container tracking (Maersk/MSC)."
            action="Shipment Workflow"
          />
          <FeatureCard 
            icon={<BarChart3 className="text-primary" size={24} />}
            title="Supply Analytics"
            desc="Margin analysis, counterparty risk scores, and forecast accuracy per commodity/region."
            action="View Performance"
          />
        </div>
      </section>

      {/* Workflow Section */}
      <section className="max-w-7xl mx-auto mb-32 bg-[#050505] border border-white/5 p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <h2 className="display text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-16">
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
        <h2 className="display text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
          Ready for Global Scale?
        </h2>
        <p className="text-foreground-muted text-lg font-light mb-10">
          Join the Global Procurement Network. We verify every farm and every buyer to ensure zero-latency transparency and guaranteed payments.
        </p>
        <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-[3px] text-xs hover:bg-primary transition-all rounded-sm shadow-2xl">
          Request B2B Access
        </button>
      </section>
    </div>
  );
};

const MetricBox = ({ value, label, sub, isPrimary }: any) => (
  <div className="bg-[#050505] p-8 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
    <div className="space-y-1">
      <span className={`mono text-3xl font-black ${isPrimary ? 'text-primary' : 'text-white'}`}>{value}</span>
      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-tight">{label}</p>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <div className={`w-1 h-1 rounded-full ${isPrimary ? 'bg-primary' : 'bg-white/20'}`} />
      <span className="mono text-[8px] text-white/20 uppercase tracking-widest">{sub}</span>
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
        <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
        <p className="text-sm font-light text-foreground-muted leading-relaxed">{desc}</p>
      </div>
    </div>
    <div className="mt-10">
      <button className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-[3px] border-b border-primary/20 pb-1 hover:border-primary transition-all">
        {action} <Plus size={12} />
      </button>
    </div>
  </div>
);

const WorkflowStep = ({ num, title, desc }: any) => (
  <div className="space-y-6">
    <span className="display text-6xl font-black text-white/5 leading-none">{num}</span>
    <div className="space-y-3">
      <h4 className="text-xl font-black text-white uppercase tracking-tight">{title}</h4>
      <p className="text-sm font-light text-foreground-muted leading-relaxed">{desc}</p>
    </div>
  </div>
);
