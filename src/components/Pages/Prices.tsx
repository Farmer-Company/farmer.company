import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { commodities } from '@/src/data/commodities';
import { markets } from '@/src/data/markets';
import { Button } from '@/components/ui/button';

export const PricesPage = () => {
 const { t } = useLanguage();
 const [selectedCommodity, setSelectedCommodity] = useState('');
 const [selectedState, setSelectedState] = useState('');
 const [email, setEmail] = useState('');
 const [submitted, setSubmitted] = useState(false);

 const states = useMemo(() => [...new Set(markets.map((market) => market.State))].sort(), []);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setSubmitted(true);
 // Real implementation would save to DB
 };

 return (
 <div className="pt-32 px-6 md:px-10 min-h-screen bg-background text-white pb-24">
 <div className="max-w-4xl mx-auto space-y-16">
 <div className="space-y-6">
 <h1 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.02em] leading-none">
 Prices<span className="text-primary">.</span>
 </h1>
 <div className="text-foreground-muted space-y-4 text-[17px] leading-[1.47] max-w-3xl">
 <p className="font-semibold text-white">Verified price intelligence across 2,487 active markets — in active integration.</p>
 <p>We're connecting Agmarknet and TN Agmark feeds for real-time, timestamped, validated rupee prices across every commodity. Until source integration is complete for your commodity and region, exact prices stay hidden — we don't publish unverified data.</p>
 <p>Request early access below. We'll notify you the moment your commodity goes live.</p>
 </div>
 </div>

 <div className="bg-[#050505] border border-white/10 p-8 md:p-12 rounded-2xl">
 {submitted ? (
 <div className="text-center py-12 space-y-4">
 <h3 className="text-[24px] font-semibold text-primary tracking-[-0.02em]">Request Received</h3>
 <p className="text-white/60 text-[17px]">We'll notify {email} when {selectedCommodity} data goes live in {selectedState}.</p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-[14px] font-medium text-white/60">Select Commodity</label>
 <select
 required
 title="Select Commodity"
 value={selectedCommodity}
 onChange={(e) => setSelectedCommodity(e.target.value)}
 className="w-full bg-black border border-white/10 h-12 px-5 rounded-full focus:border-primary outline-none text-[17px] text-white/80 cursor-pointer transition-colors"
 >
 <option value="" className="bg-[#0D0D0D]">Select Commodity...</option>
 {commodities.map((c) => (
 <option key={c.code} value={c.name} className="bg-[#0D0D0D]">{c.name} ({c.code})</option>
 ))}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-[14px] font-medium text-white/60">Select State / Region</label>
 <select
 required
 title="Select State / Region"
 value={selectedState}
 onChange={(e) => setSelectedState(e.target.value)}
 className="w-full bg-black border border-white/10 h-12 px-5 rounded-full focus:border-primary outline-none text-[17px] text-white/80 cursor-pointer transition-colors"
 >
 <option value="" className="bg-[#0D0D0D]">Select State / Region...</option>
 {states.map((s) => (
 <option key={s} value={s} className="bg-[#0D0D0D]">{s}</option>
 ))}
 </select>
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-[14px] font-medium text-white/60">Email Address</label>
 <input
 required
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="name@company.com"
 className="w-full bg-black border border-white/10 h-12 px-5 rounded-full focus:border-primary outline-none text-[17px] transition-colors"
 />
 </div>
 <Button type="submit" className="w-full h-12 mt-4">
 Request Early Access
 </Button>
 </form>
 )}
 </div>

 <div className="space-y-8">
 <p className="text-[17px] text-foreground-muted leading-[1.47]">
 You'll receive a notification when verified price data goes live for your selection.<br/>
 <span className="text-white mt-2 inline-block">Currently in active integration: Tamil Nadu (pilot region) — coconut, tomato, onion, banana.</span>
 </p>

 <div className="border border-white/5 bg-[#080808] overflow-hidden rounded-2xl">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-white/10 bg-[#0D0D0D]">
 <th className="py-4 px-6 text-[14px] font-semibold text-white/60">Commodity</th>
 <th className="py-4 px-6 text-[14px] font-semibold text-white/60">Region</th>
 <th className="py-4 px-6 text-[14px] font-semibold text-white/60">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-white/5">
 {[
 { name: 'Coconut', region: 'Tamil Nadu', status: '🟡 Pilot Integration' },
 { name: 'Tomato', region: 'Tamil Nadu', status: '🟡 Pilot Integration' },
 { name: 'Onion', region: 'Tamil Nadu', status: '🟡 Pilot Integration' },
 { name: 'Banana', region: 'Tamil Nadu', status: '🟡 Pilot Integration' },
 { name: 'All other commodities', region: 'All other regions', status: '⬜ Queued — Join waitlist above' }
 ].map((row, i) => (
 <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
 <td className="py-5 px-6 font-medium text-[17px]">{row.name}</td>
 <td className="py-5 px-6 text-[17px] text-white/60">{row.region}</td>
 <td className="py-5 px-6 text-[17px] font-medium text-white/80">{row.status}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>

 <p className="mono text-[9px] text-white/40 normal-case leading-relaxed italic">
 *Pilot integration means data is being validated against source timestamps before publishing. We publish nothing unverified.
 </p>
 </div>
 </div>
 </div>
 );
};
