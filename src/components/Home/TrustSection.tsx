import React from 'react';
import { CheckCircle2, CreditCard, Lock, Shield } from 'lucide-react';

export const TrustSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="mono text-[10px] text-primary font-medium normal-case tracking-widest mb-4 block">
            TRUST, SECURITY & BUSINESS MODEL
          </span>
          <h2 className="text-[34px] md:text-[48px] font-semibold text-white tracking-[-0.02em] leading-[1.1] mb-6">
            Trust, security and how we make money.
          </h2>
          <p className="text-foreground-muted text-[17px] font-normal leading-[1.5]">
            The protocol is built to protect farmers, buyers, fleets and researchers without hiding the business model behind crop commissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-8">
              <Shield size={24} />
            </div>
            <h3 className="text-2xl text-white font-medium mb-4">Zero commission on farmer sales</h3>
            <p className="text-white/60 mb-6 leading-[1.6]">
              Farmers pay Rs 0 commission on crop sales. Platform revenue comes from enterprise software, logistics routing and research APIs, not from taking a cut at the farm gate.
            </p>
            <ul className="space-y-3 pt-6 border-t border-white/10">
              {[
                'SaaS fees for enterprise buyers and Supply CRM teams',
                'Logistics optimization and routing fees',
                'API access for agricultural researchers and institutions',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-white/50 text-sm">
                  <CheckCircle2 size={16} className="text-primary/60 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-lg">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-white mb-8">
              <Lock size={24} />
            </div>
            <h3 className="text-2xl text-white font-medium mb-4">Escrow-backed payments</h3>
            <p className="text-white/60 mb-6 leading-[1.6]">
              Buyer funds are locked before pickup. Payment is released after verified pickup and digital documentation, addressing the 15-45 day settlement pain point.
            </p>
            <ul className="space-y-3 pt-6 border-t border-white/10">
              {[
                { icon: CreditCard, label: '100% payment guarantee upon verified pickup' },
                { icon: Shield, label: 'Bank-grade encryption for sensitive trade data' },
                { icon: Lock, label: 'Farm data is not sold to third parties' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-start gap-2 text-white/50 text-sm">
                    <Icon size={16} className="text-white/35 shrink-0 mt-0.5" />
                    <span>{item.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="pt-14 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
            <div>
              <span className="mono text-[10px] text-white/40 font-medium normal-case tracking-widest mb-4 block">
                THE TEAM
              </span>
              <h3 className="text-3xl text-white font-medium leading-tight">Built by farmers, not consultants.</h3>
            </div>
            <div className="text-white/60 leading-[1.65] space-y-4">
              <p className="text-white text-xl font-medium">Before writing a line of code, we farmed and traded our own crops.</p>
              <p>
                Digital Orchard is led by people who have lived the volatility of yields, prices, logistics failures and delayed payments first-hand.
              </p>
              <p>
                We know what data farmers actually need because we have stood at the farm gate, negotiated with commission agents and moved produce through the same broken system we are rebuilding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
