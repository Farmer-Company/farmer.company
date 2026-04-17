import React from 'react';
import { useLanguage } from '@/src/lib/LanguageContext';

export const InsightsPage = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-32 px-10 min-h-screen bg-background text-white">
      <h1 className="display text-6xl font-black uppercase tracking-tighter mb-4">
        {t('insights')}<span className="text-primary">.</span>
      </h1>
      <p className="text-foreground-muted uppercase tracking-[3px] text-sm">Predictive Agricultural Intelligence</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-16 pb-24">
        <div className="lg:col-span-3 space-y-8">
          {[
            { 
              module: 'ForecastOS', 
              title: 'Price Forecast', 
              body: 'Onion prices predicted to rise 12% in Nashik region over next 30 days. Modal price target: ₹1,650/q.', 
              type: 'Profit' 
            },
            { 
              module: 'RiskOS', 
              title: 'Volatility Alert', 
              body: 'Tomato price volatility index at 0.32 (High). Consider immediate liquidation or using cold-chain hedging.', 
              type: 'Warning' 
            },
            { 
              module: 'PolicyOS', 
              title: 'Policy Compliance', 
              body: 'MSP for wheat increased by 5%. Ensure your trade records align with the new district-level compliance standards.', 
              type: 'Regulatory' 
            }
          ].map((item, i) => (
            <div key={i} className="p-12 border border-white/10 bg-[#0D0D0D] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-primary/50 transition-all">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-[4px]">{item.module} // {item.type}</span>
                <h3 className="display text-4xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-foreground-muted text-lg font-light max-w-xl">{item.body}</p>
              </div>
              <div className="h-px w-24 bg-white/10 hidden md:block" />
              <button className="px-8 h-12 text-[10px] hover:bg-primary hover:text-black transition-all text-white font-black uppercase tracking-widest bg-white/5 border border-white/10 shrink-0">
                View OS
              </button>
            </div>
          ))}

          {/* New Price Sentiment Section */}
          <div className="p-12 border border-white/5 bg-black/40 backdrop-blur-xl mt-12 rounded-sm border-l-2 border-l-primary/60">
            <h3 className="mono text-xs font-black text-primary uppercase tracking-[4px] mb-8">PriceOS Real-time Intelligence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="space-y-2">
                <span className="mono text-[10px] text-white/40 uppercase">Tomato</span>
                <p className="text-xs text-white uppercase tracking-wider">CHEAPEST: <span className="text-primary">KOLAR (₹800/q)</span></p>
                <p className="text-[10px] text-red-400 uppercase tracking-tighter">MAX: AZADPUR (₹1,300/q)</p>
              </div>
              <div className="space-y-2">
                <span className="mono text-[10px] text-white/40 uppercase">Onion</span>
                <p className="text-xs text-white uppercase tracking-wider">CHEAPEST: <span className="text-primary">LASALGAON (₹1,200/q)</span></p>
                <p className="text-[10px] text-red-400 uppercase tracking-tighter">MAX: AZADPUR (₹1,600/q)</p>
              </div>
              <div className="space-y-2">
                <span className="mono text-[10px] text-white/40 uppercase">Potato</span>
                <p className="text-xs text-white uppercase tracking-wider">CHEAPEST: <span className="text-primary">KOLAR (₹600/q)</span></p>
                <p className="text-[10px] text-red-400 uppercase tracking-tighter">MAX: NASHIK (₹750/q)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-10 bg-[#080808] border border-white/10 space-y-8">
            <div className="space-y-2">
              <h4 className="text-lg font-black uppercase tracking-tighter text-white leading-none">Intelligence<br />Active Pulse</h4>
              <div className="w-12 h-1 bg-primary" />
            </div>

            <div className="space-y-6">
              {[
                { geo: 'MH / PUNE', status: 'Stable', intensity: '82%' },
                { geo: 'KA / BLR', status: 'High Demand', intensity: '94%' },
                { geo: 'TN / CHE', status: 'High Volume', intensity: '61%' }
              ].map((node, i) => (
                <div key={i} className="space-y-2 group/node">
                  <div className="flex justify-between items-center text-[10px] mono">
                    <span className="text-white/40 group-hover/node:text-primary transition-colors">{node.geo}</span>
                    <span className="text-white font-black uppercase">{node.status}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: node.intensity }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[9px] text-foreground-muted uppercase tracking-widest leading-loose pt-4">
              Real-time sentiment aggregated from 25 years of clean data moats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
