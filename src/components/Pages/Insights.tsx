import { useLanguage } from '@/src/lib/LanguageContext';

export const InsightsPage = () => {
 const { t } = useLanguage();
 return (
 <div className="pt-32 px-10 min-h-screen bg-background text-white">
 <h1 className="display text-6xl font-light normal-case tracking-tight mb-4">
 {t('insights')}<span className="text-primary">.</span>
 </h1>
 <p className="text-foreground-muted normal-case text-sm leading-relaxed max-w-4xl">Predictive intelligence from 25 years of clean arrivals data. During beta, sample intelligence is shown below — live signals go active as price feed integration completes by region.</p>

 <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium leading-relaxed mb-4">
 ⚡ DEMO INTELLIGENCE — These cards show the type of signals Digital Orchard will surface. Live intelligence activates region-by-region as verified price feeds come online. Tamil Nadu goes live first.
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-16 pb-24">
 <div className="lg:col-span-3 space-y-8">
 {[
 { 
 module: 'ForecastOS', 
 title: 'Onion prices predicted to rise 12% in Nashik over next 30 days', 
 body: 'Modal price target: ₹1,650/q. Supply deficit detected across Maharashtra markets. Early sellers face 8% discount vs. mid-month window.', 
 type: 'Profit Signal' 
 },
 { 
 module: 'RiskOS', 
 title: 'Tomato price volatility index at 0.32 — classified High', 
 body: 'Volatility above 0.25 triggers hedging advisory. Consider cold-chain storage or immediate liquidation. Kolar and Azadpur showing divergent signals.', 
 type: 'Volatility Alert' 
 },
 { 
 module: 'PolicyOS', 
 title: 'Wheat MSP increased 5% — district-level compliance update required', 
 body: 'Ensure trade records align with new MSP floor. Digital Orchard compliance module auto-flags non-compliant transactions before they\'re recorded.', 
 type: 'Compliance' 
 },
 { 
 module: 'SupplyCRM', 
 title: 'Grade A Basmati demand surge from EU buyers — 3 new RFQs active', 
 body: 'Pre-qualified buyers in Germany and Netherlands. Average contract size ₹18L. Export readiness checklist available in Supply CRM.', 
 type: 'Export Demand' 
 },
 { 
 module: 'SupplyCRM', 
 title: 'Certificate of Origin required for upcoming UAE shipment', 
 body: 'Auto-generate phytosanitary certificates, COO, and export invoices in one click. Gulf Cooperation Council standards pre-loaded.', 
 type: 'Compliance Alert' 
 }
 ].map((item, i) => (
 <div key={i} className="p-12 border border-white/10 bg-[#0D0D0D] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-primary/50 transition-all relative overflow-hidden">
 <div className="space-y-4">
 <div className="flex items-center gap-4">
 <span className="text-[10px] font-medium text-primary normal-case ">{item.module} // {item.type}</span>
 <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[9px] font-medium normal-case ">DEMO DATA</span>
 </div>
 <h3 className="display text-3xl font-light normal-case tracking-tight group-hover:text-primary transition-colors max-w-2xl">{item.title}</h3>
 <p className="text-foreground-muted text-lg font-light max-w-xl">{item.body}</p>
 </div>
 <div className="h-px w-24 bg-white/10 hidden md:block" />
 <button className="px-8 h-12 text-[10px] hover:bg-primary hover:text-black transition-all text-white font-medium normal-case bg-white/5 border border-white/10 shrink-0">
 View OS
 </button>
 </div>
 ))}

 {/* New Price Sentiment Section */}
 <div className="p-12 border border-white/5 bg-black/40 backdrop-blur-xl mt-12 rounded-sm border-l-2 border-l-primary/60 relative">
 <div className="absolute top-6 right-8">
 <span className="px-2 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-medium normal-case ">DEMO DATA</span>
 </div>
 <h3 className="mono text-xs font-medium text-primary normal-case mb-8 pr-24">PriceOS Sample Intelligence — Tamil Nadu Pilot Live Soon</h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
 <div className="space-y-2">
 <span className="mono text-[10px] text-white/40 normal-case">Tomato</span>
 <p className="text-xs text-white normal-case ">CHEAPEST: <span className="text-primary">KOLAR (₹800/q)*Sample</span></p>
 <p className="text-[10px] text-red-400 normal-case tracking-tight">MAX: AZADPUR (₹1,300/q)*Sample</p>
 </div>
 <div className="space-y-2">
 <span className="mono text-[10px] text-white/40 normal-case">Onion</span>
 <p className="text-xs text-white normal-case ">CHEAPEST: <span className="text-primary">LASALGAON (₹1,200/q)*Sample</span></p>
 <p className="text-[10px] text-red-400 normal-case tracking-tight">MAX: AZADPUR (₹1,600/q)*Sample</p>
 </div>
 <div className="space-y-2">
 <span className="mono text-[10px] text-white/40 normal-case">Potato</span>
 <p className="text-xs text-white normal-case ">CHEAPEST: <span className="text-primary">KOLAR (₹600/q)*Sample</span></p>
 <p className="text-[10px] text-red-400 normal-case tracking-tight">MAX: NASHIK (₹750/q)*Sample</p>
 </div>
 </div>
 </div>
 </div>

 <div className="space-y-8">
 <div className="p-10 bg-[#080808] border border-white/10 space-y-8">
 <div className="space-y-2">
 <h4 className="text-lg font-medium normal-case tracking-tight text-white leading-none">Intelligence<br />Active Pulse</h4>
 <div className="w-12 h-1 bg-primary" />
 </div>

 <div className="space-y-6">
 {[
 { geo: 'MH / PUNE', status: '🔵 In Queue', intensity: 'w-[10%]', isPilot: false },
 { geo: 'KA / BLR', status: '🔵 In Queue', intensity: 'w-[10%]', isPilot: false },
 { geo: 'TN / CHE', status: '🟡 Pilot Active', intensity: 'w-[100%]', isPilot: true }
 ].map((node, i) => (
 <div key={i} className="space-y-2 group/node">
 <div className="flex justify-between items-center text-[10px] mono">
 <span className="text-white/40 group-hover/node:text-primary transition-colors">{node.geo}</span>
 <span className="text-white font-medium normal-case ">{node.status}</span>
 </div>
 <div className="h-1 w-full bg-white/5">
 <div 
 className={`h-full ${node.isPilot ? 'bg-amber-500' : 'bg-blue-500'} ${node.intensity}`}
 />
 </div>
 </div>
 ))}
 </div>

 <p className="text-[9px] text-foreground-muted normal-case leading-loose pt-4">
 Regional intelligence activates as verified price feeds come online. Tamil Nadu pilot is first.
 </p>
 </div>
 </div>
 </div>
 </div>
 );
};
