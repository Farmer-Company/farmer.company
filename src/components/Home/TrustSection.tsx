import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, CreditCard, CheckCircle2 } from 'lucide-react';

export const TrustSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="mono text-[10px] text-primary font-medium normal-case tracking-widest mb-4 block">
            TRUST & SECURITY
          </span>
          <h2 className="text-[34px] md:text-[48px] font-semibold text-white tracking-[-0.02em] leading-[1.1] mb-6">
            Institutional grade. Built for the farm.
          </h2>
          <p className="text-foreground-muted text-[17px] font-normal leading-[1.5]">
            Digital Orchard isn't just an app; it's a secure protocol. We protect your data, guarantee your payments, and operate with complete transparency.
          </p>
        </div>

        {/* Security & Commission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-2xl">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-8">
              <Shield size={24} />
            </div>
            <h3 className="text-2xl text-white font-medium mb-4">Zero Commission. Ever.</h3>
            <p className="text-white/60 mb-6 leading-[1.6]">
              Digital Orchard charges exactly ₹0 commission on farmer sales. You keep 100% of the farm gate price you negotiate.
            </p>
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-white/80 text-sm font-medium mb-2">How we sustain the platform:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-white/50 text-sm">
                  <CheckCircle2 size={16} className="text-primary/50 shrink-0 mt-0.5" />
                  SaaS fees for Enterprise Buyers (Supply CRM)
                </li>
                <li className="flex items-start gap-2 text-white/50 text-sm">
                  <CheckCircle2 size={16} className="text-primary/50 shrink-0 mt-0.5" />
                  Logistics optimization routing fees
                </li>
                <li className="flex items-start gap-2 text-white/50 text-sm">
                  <CheckCircle2 size={16} className="text-primary/50 shrink-0 mt-0.5" />
                  API access for agricultural researchers
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-2xl">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white mb-8">
              <Lock size={24} />
            </div>
            <h3 className="text-2xl text-white font-medium mb-4">Escrow-Backed Payments</h3>
            <p className="text-white/60 mb-6 leading-[1.6]">
              No more chasing buyers for 45 days. Our RBI-compliant escrow system ensures the money is locked before you harvest.
            </p>
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-white/80 text-sm font-medium mb-2">Security Guarantees:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-white/50 text-sm">
                  <CreditCard size={16} className="text-white/30 shrink-0 mt-0.5" />
                  100% Payment Guarantee upon verified pickup
                </li>
                <li className="flex items-start gap-2 text-white/50 text-sm">
                  <Shield size={16} className="text-white/30 shrink-0 mt-0.5" />
                  Bank-grade encryption (AES-256) for all data
                </li>
                <li className="flex items-start gap-2 text-white/50 text-sm">
                  <Lock size={16} className="text-white/30 shrink-0 mt-0.5" />
                  Your farm data is never sold to third parties
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team & Partners */}
        <div className="pt-16 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <span className="mono text-[10px] text-white/40 font-medium normal-case tracking-widest mb-4 block">
                THE TEAM
              </span>
              <h3 className="text-3xl text-white font-medium mb-6">Built by Traders.</h3>
              <p className="text-white/60 leading-[1.6]">
                Before writing a line of code, we traded. We know what data farmers actually need because we've sat across the table from them, negotiated at farm gate, and moved produce through the same broken system we're now replacing.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
              <TeamMember name="Arun K." role="Founder, Operations" img="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80" />
              <TeamMember name="Priya S." role="Head of Agri-Data" img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" />
              <TeamMember name="Vikram R." role="Protocol Engineer" img="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80" />
            </div>
          </div>
        </div>

        {/* Partners */}
        <div className="mt-24 pt-16 border-t border-white/5 text-center">
          <span className="mono text-[10px] text-white/40 font-medium normal-case tracking-widest mb-8 block">
            ECOSYSTEM PARTNERS
          </span>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder logos */}
            <div className="text-xl font-bold font-serif">TAMIL AGRI UNIV</div>
            <div className="text-xl font-bold tracking-tighter">FARM-FINANCE</div>
            <div className="text-xl font-bold font-mono">LOGISTIX_PRO</div>
            <div className="text-xl font-bold">STATE FPO ALLIANCE</div>
            <div className="text-xl font-bold italic">AGRI-RESEARCH INST</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ name, role, img }: any) => (
  <div className="group">
    <div className="aspect-square bg-white/5 rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-primary/30 transition-colors">
      <img src={img} alt={name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 mix-blend-luminosity hover:mix-blend-normal" />
    </div>
    <h4 className="text-white font-medium">{name}</h4>
    <p className="text-white/50 text-[10px] uppercase tracking-wider mt-1">{role}</p>
  </div>
);
