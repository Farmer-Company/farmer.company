import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, RadioTower, Route, Satellite, ShieldCheck, Zap } from 'lucide-react';
import { onValue, ref } from 'firebase/database';
import { rtdb } from '@/src/lib/firebase';

const fallbackTicker = new Array(8).fill({
  commodity: 'TOMATO',
  market: 'CHENNAI',
  price: '18',
  change: '2.4',
  direction: 'up',
});

const currentMetrics = [
  { number: '6,944', label: 'Markets mapped', link: '/market', icon: RadioTower },
  { number: '250+', label: 'Commodities tracked', icon: Activity },
  { number: 'Tamil Nadu', label: 'Active pilot region', icon: Route },
  { number: 'Alpha', label: 'Current build stage', icon: ShieldCheck, primary: true },
];

const roadmapMetrics = [
  { number: '85%', label: 'Target forecast accuracy', icon: Zap },
  { number: 'Real-time', label: 'Verified quote integration', icon: Satellite },
  { number: 'Farmer SKU', label: 'Portfolio system', icon: ShieldCheck },
  { number: 'Live', label: 'Price feed active', icon: Activity, primary: true },
];

export const NetworkMetricsSection = () => {
  const [tickerItems, setTickerItems] = useState<any[]>(fallbackTicker);

  useEffect(() => {
    const tickerRef = ref(rtdb, '/live_ticker');
    return onValue(tickerRef, (snapshot) => {
      const data = snapshot.val();
      setTickerItems(data ? Object.values(data) : fallbackTicker);
    });
  }, []);

  return (
    <section className="w-full bg-[#030303] py-24 md:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(74,222,128,0.08),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-end mb-12">
          <div>
            <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest block mb-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              NETWORK & ROADMAP
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter uppercase leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
              Beta infrastructure,<br />
              live now.
            </h2>
          </div>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl" style={{ fontFamily: '"Inter", sans-serif' }}>
            Current coverage, roadmap targets, and live market signals sit in one band so buyers, farmers, fleets, and researchers can understand what is operational today.
          </p>
        </div>

        <div className="w-full h-12 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center px-2 group hover:border-primary/30 transition-colors mb-8">
          <div className="shrink-0 px-3 md:px-4 flex items-center gap-2 border-r border-white/10 h-full py-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot shadow-[0_0_10px_var(--primary)]" />
            <span className="mono text-[8px] md:text-[10px] font-medium text-white normal-case">LIVE FEED</span>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-10 md:gap-16 animate-marquee whitespace-nowrap">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <div key={`${item.commodity}-${item.market}-${i}`} className="mono text-[10px] md:text-[11px] text-white/60 flex items-center gap-2 md:gap-3">
                  <span className="font-medium text-white">{item.commodity}</span>
                  <span className="text-white/30 hidden sm:inline">{item.market}</span>
                  <span className="text-primary font-medium">Rs {item.price}</span>
                  <span className={item.direction === 'up' ? 'text-primary' : 'text-red-500'}>
                    {item.direction === 'up' ? '+' : '-'}{item.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <MetricPanel title="Beta infrastructure - live now" items={currentMetrics} />
            <MetricPanel title="Building toward - roadmap" items={roadmapMetrics} muted />
          </div>

          <div className="bg-[#050505] border border-white/10 p-6 md:p-7 rounded-lg font-mono text-sm min-h-[280px] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Live Agent Stream</span>
              </div>
              <span className="text-[10px] text-white/25">HUMAN APPROVAL ON</span>
            </div>
            <div className="space-y-4 text-white/55 flex-1">
              <p><span className="text-[#4ADE80]">{'> '}</span>Demand Agent forecasts onion demand pressure in Q3.</p>
              <p><span className="text-[#4ADE80]">{'> '}</span>Routing Agent suggests paired pickup from farm to warehouse.</p>
              <p><span className="text-[#4ADE80]">{'> '}</span>Buyer Agent drafts an escrow-backed offtake request.</p>
              <p><span className="text-[#4ADE80]">{'> '}</span>Awaiting human confirmation on price and quality limits.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MetricPanel = ({ title, items, muted = false }: { title: string; items: typeof currentMetrics; muted?: boolean }) => (
  <div className={`border rounded-lg p-6 md:p-7 ${muted ? 'border-dashed border-white/10 bg-white/[0.01]' : 'border-primary/10 bg-primary/[0.02]'}`}>
    <p className={`mono text-[10px] font-medium normal-case mb-6 ${muted ? 'text-white/45' : 'text-primary'}`}>{title}</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <div className="h-full bg-black/35 border border-white/10 p-5 rounded-lg group hover:border-primary/30 transition-colors">
            <Icon size={18} className={item.primary ? 'text-primary mb-5' : 'text-white/45 mb-5'} />
            <p className={`text-3xl font-light tracking-tight leading-none ${item.primary ? 'text-primary' : 'text-white'}`}>{item.number}</p>
            <p className="text-[11px] text-white/45 normal-case mt-3">{item.label}</p>
          </div>
        );

        return item.link ? (
          <Link key={item.label} to={item.link} className="block h-full">
            {content}
          </Link>
        ) : (
          <div key={item.label}>{content}</div>
        );
      })}
    </div>
    {muted && <p className="text-[10px] text-white/35 mt-5 italic">Roadmap metrics are targets, not current actuals.</p>}
  </div>
);
