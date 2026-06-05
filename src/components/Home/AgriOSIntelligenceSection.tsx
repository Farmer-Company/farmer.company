import React from 'react';
import { CheckCircle2, Crosshair, Leaf, ScanLine, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';

const modules = [
  {
    title: 'Pest & Weed Detection Engine',
    copy: 'Identify threats through a smartphone camera and recommend spot treatments instead of blanket sprays.',
  },
  {
    title: 'Input Optimization Dashboard',
    copy: 'Benchmark fertilizer and pesticide use to qualify for premium FMCG and export pricing.',
  },
  {
    title: 'Surplus-to-Biocontrol Loop',
    copy: 'Route unsold organic matter to biocontrol and composting partners instead of landfill leakage.',
  },
];

export const AgriOSIntelligenceSection = () => {
  return (
    <section className="w-full bg-[#050505] py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(74,222,128,0.08),transparent_32%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-center"
        >
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 text-primary rounded-sm">
                <Sprout size={24} />
              </div>
              <span className="mono text-[10px] text-primary font-medium normal-case">NEW MODULE - AGRIOS INTELLIGENCE</span>
            </div>

            <div>
              <h2 className="text-[34px] md:text-[52px] font-semibold text-white tracking-[-0.02em] leading-[1.05]">
                Clean-input scoring for global food and FMCG.
              </h2>
              <p className="text-foreground-muted text-[17px] font-normal leading-[1.55] mt-5 max-w-2xl">
                AgriOS Intelligence sits on top of the protocol. It turns field-level crop observations into a Farm Intelligence Score that can move across buyers, labels, brands, regulators, and export desks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {modules.map((item) => (
                <div key={item.title} className="flex items-start gap-4 border border-white/10 bg-black/35 p-5 rounded-lg">
                  <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed mt-1">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-[15px] text-white/80 font-medium leading-relaxed">
                Target outcome: help clean, verified crops earn a 15-25% premium through field data that FMCG brands and regulators can trust.
              </p>
            </div>
          </div>

          <div className="relative min-h-[420px] md:min-h-[520px] bg-[#021f0d] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-black/70" />
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] text-white/45 font-mono uppercase tracking-widest">
              <span>AI Computer Vision Target</span>
              <span>Live Crop Feed</span>
            </div>

            <div className="relative w-[240px] h-[240px] border border-primary/35 rounded-full flex items-center justify-center">
              <div className="absolute inset-8 border border-primary/20 rounded-full" />
              <ScanLine size={76} className="text-primary/80" />
              <div className="absolute top-8 right-3 bg-black/70 border border-primary/25 px-3 py-2 rounded-sm text-[10px] text-primary font-mono">LEAF STRESS</div>
              <div className="absolute bottom-10 left-0 bg-black/70 border border-white/15 px-3 py-2 rounded-sm text-[10px] text-white/70 font-mono">LOW SPRAY ZONE</div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              {[
                { label: 'Clean score', value: '82', icon: Leaf },
                { label: 'Threats', value: '2', icon: Crosshair },
                { label: 'Premium band', value: '15-25%', icon: Sprout },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-black/65 border border-white/10 p-3 rounded-sm">
                    <Icon size={14} className="text-primary mb-2" />
                    <p className="text-white font-mono text-lg leading-none">{item.value}</p>
                    <p className="text-white/35 text-[9px] mt-2 normal-case">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
