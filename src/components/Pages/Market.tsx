import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
 Activity,
 ArrowLeft,
 ArrowRight,
 CheckCircle2,
 Filter,
 MapPin,
 PhoneCall,
 Search,
 ShoppingCart,
} from 'lucide-react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { useAuth } from '@/src/lib/AuthContext';
import { Button } from '@/components/ui/button';
import { markets, type MarketData } from '@/src/data/markets';
import { getMarketSignal } from '@/src/lib/marketSignals';
import {
 createTradeIntent,
 getSavedTradeIntents,
 type TradeIntentType,
} from '@/src/lib/tradeIntents';

const SAVED_MARKETS_KEY = 'farmer-company-saved-markets';

type IntentFormState = {
 marketId: number;
 marketName: string;
 district: string;
 state: string;
 type: TradeIntentType;
 commodityName: string;
 quantityTonnes: string;
 contactName: string;
 phone: string;
 targetPrice: string;
 notes: string;
};

const createIntentDraft = (
 market: MarketData,
 type: TradeIntentType,
 fullName: string,
 phoneNumber: string
): IntentFormState => ({
 marketId: market.node_id,
 marketName: market.Market,
 district: market.District,
 state: market.State,
 type,
 commodityName: '',
 quantityTonnes: '',
 contactName: fullName,
 phone: phoneNumber,
 targetPrice: '',
 notes: '',
});

export const MarketPage = () => {
 const { t } = useLanguage();
 const { user, profile } = useAuth();
 const [filter, setFilter] = useState('');
 const [stateFilter, setStateFilter] = useState('');
 const [districtFilter, setDistrictFilter] = useState('');
 const [tierFilter, setTierFilter] = useState('');
 const [currentPage, setCurrentPage] = useState(1);
 const [savedMarketIds, setSavedMarketIds] = useState<number[]>([]);
 const [savedIntentCount, setSavedIntentCount] = useState(0);
 const [intentForm, setIntentForm] = useState<IntentFormState | null>(null);
 const [intentStatus, setIntentStatus] = useState('');
 const [isSubmittingIntent, setIsSubmittingIntent] = useState(false);
 const itemsPerPage = 20;

 useEffect(() => {
 if (typeof window === 'undefined') {
 return;
 }

 try {
 const raw = window.localStorage.getItem(SAVED_MARKETS_KEY);
 if (raw) {
 const parsed = JSON.parse(raw);
 if (Array.isArray(parsed)) {
 setSavedMarketIds(
 parsed.filter((value): value is number => typeof value === 'number')
 );
 }
 }
 } catch {
 // Ignore malformed storage and start from an empty list.
 }

 setSavedIntentCount(getSavedTradeIntents().length);
 }, []);

 const states = useMemo(() => [...new Set(markets.map((m) => m.State))].sort(), []);
 const districts = useMemo(() => {
 const filtered = stateFilter ? markets.filter((m) => m.State === stateFilter) : markets;
 return [...new Set(filtered.map((m) => m.District))].sort();
 }, [stateFilter]);
 const tiers = useMemo(() => [...new Set(markets.map((m) => m.node_tier))].sort(), []);

 const filteredNodes = useMemo(() => {
 return markets.filter((market) => {
 const matchesSearch =
 market.Market.toLowerCase().includes(filter.toLowerCase()) ||
 market.District.toLowerCase().includes(filter.toLowerCase());
 const matchesState = !stateFilter || market.State === stateFilter;
 const matchesDistrict = !districtFilter || market.District === districtFilter;
 const matchesTier = !tierFilter || market.node_tier === tierFilter;

 return matchesSearch && matchesState && matchesDistrict && matchesTier;
 });
 }, [districtFilter, filter, stateFilter, tierFilter]);

 const totalPages = Math.ceil(filteredNodes.length / itemsPerPage);
 const paginatedNodes = useMemo(() => {
 return filteredNodes.slice(
 (currentPage - 1) * itemsPerPage,
 currentPage * itemsPerPage
 );
 }, [currentPage, filteredNodes]);

 const toggleSavedMarket = (marketId: number) => {
 setSavedMarketIds((prev) => {
 const next = prev.includes(marketId)
 ? prev.filter((id) => id !== marketId)
 : [...prev, marketId];

 if (typeof window !== 'undefined') {
 window.localStorage.setItem(SAVED_MARKETS_KEY, JSON.stringify(next));
 }

 return next;
 });
 };

 const openIntentForm = (market: MarketData, type: TradeIntentType) => {
 setIntentStatus('');
 setIntentForm(
 createIntentDraft(
 market,
 type,
 profile?.fullName || '',
 user?.phoneNumber || ''
 )
 );
 };

 const closeIntentForm = () => {
 setIntentForm(null);
 setIsSubmittingIntent(false);
 };

 const handleIntentSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!intentForm) {
 return;
 }

 setIsSubmittingIntent(true);
 setIntentStatus('');

 const savedIntent = await createTradeIntent({
 type: intentForm.type,
 marketId: intentForm.marketId,
 marketName: intentForm.marketName,
 state: intentForm.state,
 district: intentForm.district,
 commodityName: intentForm.commodityName.trim(),
 quantityTonnes: Number(intentForm.quantityTonnes),
 contactName: intentForm.contactName.trim(),
 phone: intentForm.phone.trim(),
 targetPrice: intentForm.targetPrice ? Number(intentForm.targetPrice) : null,
 notes: intentForm.notes.trim(),
 source: 'market_page',
 userId: user?.uid || null,
 });

 setSavedIntentCount(getSavedTradeIntents().length);
 setIntentStatus(
  savedIntent.persistence === 'firestore'
  ? 'Intent sent to the ops queue. The team can now validate and match this lead.'
  : `Intent saved locally for assisted follow-up. Firebase write failed, so the lead stays on this device.${savedIntent.failureReason ? ` Reason: ${savedIntent.failureReason}` : ''}`
  );
 setIntentForm(null);
 setIsSubmittingIntent(false);
 };

 return (
 <div className="pt-32 px-6 md:px-10 min-h-screen bg-black text-white pb-24 relative overflow-hidden">
 {/* Background Gradients */}
 <div className="absolute inset-0 bg-gradient-to-b from-[#4ADE80]/5 to-transparent pointer-events-none" />
 <div className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] bg-[#4ADE80]/5 blur-[150px] rounded-full pointer-events-none" />

 <div className="max-w-7xl mx-auto relative z-10">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
 <div className="space-y-4">
 <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest block" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 INTELLIGENCE PROTOCOL
 </span>
 <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
 Market <span className="text-[#4ADE80]">OS</span>
 </h1>
 <p className="text-white/60 text-lg md:text-xl font-normal leading-relaxed max-w-3xl" style={{ fontFamily: '"Inter", sans-serif' }}>
 6,944 global market nodes mapped and tracked. Use predictive indices and regional signals to execute trade opportunities.
 </p>
 </div>

 <div className="w-full md:w-96 relative group">
 <Search
 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#4ADE80] transition-colors"
 size={18}
 />
 <input
 type="text"
 placeholder="Search nodes or districts..."
 value={filter}
 onChange={(e) => {
 setFilter(e.target.value);
 setCurrentPage(1);
 }}
 className="w-full bg-black border border-white/10 h-14 pl-12 pr-6 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none text-sm transition-all rounded-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
 style={{ fontFamily: '"Inter", sans-serif' }}
 />
 </div>
 </div>

 {/* Filters */}
 <div className="flex flex-wrap gap-4 mb-12 p-6 bg-black/50 border border-white/10 rounded-sm items-center backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
 <div className="flex items-center gap-3 text-[11px] font-bold text-white/50 uppercase tracking-widest mr-4" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 <Filter size={16} className="text-[#4ADE80]" />
 <span>Network Matrix</span>
 </div>

 <select
 value={stateFilter}
 onChange={(e) => {
 setStateFilter(e.target.value);
 setDistrictFilter('');
 setCurrentPage(1);
 }}
 className="flex-1 md:flex-none bg-black/80 border border-white/10 px-4 py-3 text-sm font-medium text-white/80 focus:border-[#4ADE80] outline-none min-w-[160px] cursor-pointer hover:bg-white/5 transition-colors rounded-sm"
 title="Filter by state"
 style={{ fontFamily: '"Inter", sans-serif' }}
 >
 <option value="" className="bg-black">All States</option>
 {states.map((state) => (
 <option key={state} value={state} className="bg-black">{state}</option>
 ))}
 </select>

 <select
 value={districtFilter}
 onChange={(e) => {
 setDistrictFilter(e.target.value);
 setCurrentPage(1);
 }}
 className="flex-1 md:flex-none bg-black/80 border border-white/10 px-4 py-3 text-sm font-medium text-white/80 focus:border-[#4ADE80] outline-none min-w-[160px] cursor-pointer hover:bg-white/5 transition-colors rounded-sm"
 title="Filter by district"
 style={{ fontFamily: '"Inter", sans-serif' }}
 >
 <option value="" className="bg-black">All Districts</option>
 {districts.map((district) => (
 <option key={district} value={district} className="bg-black">{district}</option>
 ))}
 </select>

 <select
 value={tierFilter}
 onChange={(e) => {
 setTierFilter(e.target.value);
 setCurrentPage(1);
 }}
 className="flex-1 md:flex-none bg-black/80 border border-white/10 px-4 py-3 text-sm font-medium text-white/80 focus:border-[#4ADE80] outline-none min-w-[160px] cursor-pointer hover:bg-white/5 transition-colors rounded-sm"
 title="Filter by node tier"
 style={{ fontFamily: '"Inter", sans-serif' }}
 >
 <option value="" className="bg-black">All Tiers</option>
 {tiers.map((tier) => (
 <option key={tier} value={tier} className="bg-black">{tier}</option>
 ))}
 </select>

 <div className="w-full md:w-auto md:ml-auto text-[11px] text-[#4ADE80] font-bold uppercase tracking-widest bg-[#4ADE80]/10 px-5 py-3 border border-[#4ADE80]/20 rounded-sm text-center" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 {filteredNodes.length.toLocaleString()} Nodes Identified
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
 <div className="lg:col-span-1 space-y-8">
 {/* Active Markets Panel */}
 <div className="p-8 bg-black/80 border border-white/10 rounded-sm space-y-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md">
 <div className="space-y-2">
 <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Active OS Nodes
 </span>
 <div className="text-5xl font-extrabold text-[#4ADE80] tracking-tighter" style={{ fontFamily: '"Inter", sans-serif' }}>
 {filteredNodes.length.toLocaleString()}
 </div>
 </div>

 <div className="h-px bg-white/10" />

 <div className="space-y-4">
 <div className="flex items-center justify-between">
 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Network Status
 </span>
 <span className="text-[10px] font-bold text-[#4ADE80] uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Live Sync</span>
 </div>
 <div className="w-full h-1 bg-white/10 overflow-hidden rounded-full">
 <motion.div
 initial={{ x: '-100%' }}
 animate={{ x: '0%' }}
 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
 className="w-full h-full bg-[#4ADE80]"
 />
 </div>
 </div>

 <div className="space-y-2 pt-4">
 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Cryptographic Validation
 </span>
 <div className="text-sm font-normal leading-relaxed text-white/60" style={{ fontFamily: '"Inter", sans-serif' }}>
 Market discovery utilizes continuous institutional data feeds. Execution requires smart contract validation.
 </div>
 </div>

 <Button
 className="w-full bg-[#4ADE80] text-black font-bold uppercase tracking-widest text-[11px] h-14 hover:bg-white transition-colors rounded-sm"
 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
 onClick={() => window.scrollTo({ top: 520, behavior: 'smooth' })}
 >
 Browse Global Network
 </Button>
 </div>

 {/* Summary Box */}
 <div className="p-8 border border-[#4ADE80]/20 bg-[#4ADE80]/5 rounded-sm flex flex-col gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md">
 <CheckCircle2 size={28} className="text-[#4ADE80]" />
 <div className="space-y-4">
 <p className="text-sm font-normal leading-relaxed text-white/80" style={{ fontFamily: '"Inter", sans-serif' }}>
 All nodes in the Global Agri OS are mapped against predictive indices. Save nodes or push intents directly to the institutional matching engine.
 </p>
 <div className="grid grid-cols-2 gap-4">
 <div className="border border-[#4ADE80]/20 bg-black/40 px-4 py-4 rounded-sm">
 <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Saved Nodes</span>
 <span className="text-2xl font-extrabold text-[#4ADE80]" style={{ fontFamily: '"Inter", sans-serif' }}>
 {savedMarketIds.length}
 </span>
 </div>
 <div className="border border-[#4ADE80]/20 bg-black/40 px-4 py-4 rounded-sm">
 <span className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>Intent Queue</span>
 <span className="text-2xl font-extrabold text-[#4ADE80]" style={{ fontFamily: '"Inter", sans-serif' }}>
 {savedIntentCount}
 </span>
 </div>
 </div>
 {intentStatus && (
 <p className="text-sm font-medium leading-relaxed text-[#4ADE80] bg-[#4ADE80]/10 p-3 rounded-sm border border-[#4ADE80]/20">{intentStatus}</p>
 )}
 </div>
 </div>
 </div>

 <div className="lg:col-span-3 space-y-6">
 <div className="flex items-center justify-between mb-8 px-2">
 <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Verified Institutional Nodes
 </span>
 <div className="flex items-center gap-3">
 <div className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
 <span className="text-[10px] text-[#4ADE80] uppercase tracking-widest font-bold" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Network Live
 </span>
 </div>
 </div>

 <AnimatePresence mode="wait">
 <motion.div
 key={currentPage + filter}
 initial={{ opacity: 0, y: 10 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: -10 }}
 className="space-y-4"
 >
 {paginatedNodes.map((market) => {
 const signal = getMarketSignal(market);
 const isSaved = savedMarketIds.includes(market.node_id);

 return (
 <div
 key={market.node_id}
 className="p-8 bg-black/50 border border-white/10 hover:border-[#4ADE80]/50 transition-all group relative overflow-hidden rounded-sm backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
 tabIndex={0}
 >
 <div className="absolute inset-0 bg-[#4ADE80]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
 <div className="space-y-5 flex-1">
 <div className="flex items-center gap-4">
 <span className="px-2 py-1 bg-[#4ADE80]/10 text-[#4ADE80] text-[10px] font-bold uppercase tracking-widest border border-[#4ADE80]/20 rounded-sm" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Node Active
 </span>
 <span className="text-[11px] text-white/40 font-mono">
 UID: {market.node_id.toString().padStart(4, '0')}
 </span>
 </div>

 <h3 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tighter group-hover:text-[#4ADE80] transition-colors" style={{ fontFamily: '"Inter", sans-serif' }}>
 {market.Market}
 </h3>

 <div className="flex flex-wrap gap-x-12 gap-y-6">
 <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-sm border border-white/5">
 <MapPin size={16} className="text-[#4ADE80]" />
 <div className="flex flex-col">
 <span className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
 {market.District}
 </span>
 <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-0.5" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 {market.State}
 </span>
 </div>
 </div>

 <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-sm border border-white/5">
 <Activity size={16} className="text-[#4ADE80]" />
 <div className="flex flex-col">
 <span className="text-sm font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
 {market.total_arrivals.toLocaleString()} MT
 </span>
 <span className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-0.5" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Total Volume
 </span>
 </div>
 </div>
 </div>
 </div>

 <div className="flex items-center gap-6 w-full md:w-auto pt-8 md:pt-0 border-t border-white/10 md:border-t-0">
 <div className="flex-1 md:text-right space-y-2">
 <div className="text-[10px] font-bold text-[#4ADE80] uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Signal Intelligence
 </div>
 <div className="text-2xl md:text-3xl font-extrabold tracking-tighter text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
 {signal.label}
 </div>
 <p className="max-w-xs md:ml-auto text-xs leading-relaxed text-white/60 font-medium" style={{ fontFamily: '"Inter", sans-serif' }}>
 {signal.guidance}
 </p>
 <div className="text-[10px] text-white/30 font-mono mt-2">
 SRC: {signal.source} | V: {signal.freshness}
 </div>
 </div>

 <div className="flex flex-col gap-3 shrink-0">
 <Button
 className="h-12 bg-white text-black font-bold uppercase tracking-widest text-[10px] px-8 hover:bg-[#4ADE80] transition-colors rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(74,222,128,0.2)]"
 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
 onClick={() => openIntentForm(market, 'buy')}
 >
 Request Match
 </Button>
 <button
 onClick={() => toggleSavedMarket(market.node_id)}
 className={`h-12 w-full flex items-center justify-center border transition-all rounded-sm font-bold text-[10px] uppercase tracking-widest gap-2 ${
 isSaved
 ? 'border-[#4ADE80] bg-[#4ADE80]/10 text-[#4ADE80]'
 : 'border-white/10 bg-black hover:border-white/30 text-white/60'
 }`}
 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
 >
 <ShoppingCart size={14} className={isSaved ? 'text-[#4ADE80]' : ''} />
 {isSaved ? 'Saved' : 'Save Node'}
 </button>
 </div>
 </div>
 </div>
 </div>
 );
 })}
 </motion.div>
 </AnimatePresence>

 {intentForm && (
 <div className="border border-[#4ADE80]/30 bg-[#050505] p-8 md:p-12 space-y-8 mt-6 rounded-sm shadow-[0_0_50px_rgba(74,222,128,0.05)] backdrop-blur-xl relative z-20">
 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
 <div className="space-y-3">
 <div className="flex items-center gap-3 text-[#4ADE80]">
 <PhoneCall size={18} />
 <span className="text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Secure Network Channel
 </span>
 </div>
 <h3 className="text-3xl font-extrabold tracking-tight text-white" style={{ fontFamily: '"Inter", sans-serif' }}>
 {intentForm.type === 'buy' ? 'Initialize Procurement' : 'Publish Supply'} for{' '}
 <span className="text-[#4ADE80]">{intentForm.marketName}</span>
 </h3>
 <p className="text-base text-white/60 leading-relaxed font-normal max-w-2xl" style={{ fontFamily: '"Inter", sans-serif' }}>
 Submit parameters. The cryptographic matching engine will validate the request and assign an execution specialist if offline verification is required.
 </p>
 </div>
 <button
 type="button"
 onClick={closeIntentForm}
 className="text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-sm border border-white/10"
 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
 >
 Cancel Action
 </button>
 </div>

 <form onSubmit={handleIntentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
 <input
 required
 type="text"
 value={intentForm.commodityName}
 onChange={(e) =>
 setIntentForm({ ...intentForm, commodityName: e.target.value })
 }
 placeholder="Commodity Specification"
 className="h-14 px-5 bg-black border border-white/10 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none text-sm text-white rounded-sm placeholder:text-white/30 transition-all"
 style={{ fontFamily: '"Inter", sans-serif' }}
 />
 <input
 required
 type="number"
 min="1"
 step="0.1"
 value={intentForm.quantityTonnes}
 onChange={(e) =>
 setIntentForm({ ...intentForm, quantityTonnes: e.target.value })
 }
 placeholder="Volume (Metric Tonnes)"
 className="h-14 px-5 bg-black border border-white/10 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none text-sm text-white rounded-sm placeholder:text-white/30 transition-all"
 style={{ fontFamily: '"Inter", sans-serif' }}
 />
 <input
 required
 type="text"
 value={intentForm.contactName}
 onChange={(e) =>
 setIntentForm({ ...intentForm, contactName: e.target.value })
 }
 placeholder="Authorized Representative"
 className="h-14 px-5 bg-black border border-white/10 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none text-sm text-white rounded-sm placeholder:text-white/30 transition-all"
 style={{ fontFamily: '"Inter", sans-serif' }}
 />
 <input
 required
 type="tel"
 value={intentForm.phone}
 onChange={(e) => setIntentForm({ ...intentForm, phone: e.target.value })}
 placeholder="Secure Contact Number"
 className="h-14 px-5 bg-black border border-white/10 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none text-sm text-white rounded-sm placeholder:text-white/30 transition-all"
 style={{ fontFamily: '"Inter", sans-serif' }}
 />
 <input
 type="number"
 min="0"
 step="0.01"
 value={intentForm.targetPrice}
 onChange={(e) =>
 setIntentForm({ ...intentForm, targetPrice: e.target.value })
 }
 placeholder="Target Execution Price (₹/Qtl) - Optional"
 className="h-14 px-5 bg-black border border-white/10 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none text-sm text-white rounded-sm placeholder:text-white/30 transition-all"
 style={{ fontFamily: '"Inter", sans-serif' }}
 />
 <select
 value={intentForm.type}
 onChange={(e) =>
 setIntentForm({
 ...intentForm,
 type: e.target.value as TradeIntentType,
 })
 }
 className="h-14 px-5 bg-black border border-white/10 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none text-sm text-white rounded-sm transition-all"
 title="Intent type"
 style={{ fontFamily: '"Inter", sans-serif' }}
 >
 <option value="buy">Execute Buy Contract</option>
 <option value="sell">Publish Sell Volume</option>
 </select>
 <textarea
 value={intentForm.notes}
 onChange={(e) => setIntentForm({ ...intentForm, notes: e.target.value })}
 placeholder="Additional specifications, delivery windows, or compliance requirements."
 className="md:col-span-2 min-h-[140px] px-5 py-5 bg-black border border-white/10 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none text-sm text-white leading-relaxed rounded-sm placeholder:text-white/30 transition-all resize-y"
 style={{ fontFamily: '"Inter", sans-serif' }}
 />
 <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-6 border-t border-white/5 mt-2">
 <p className="text-[11px] font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Routing to: {intentForm.marketName} Node ({intentForm.district})
 </p>
 <Button
 type="submit"
 disabled={isSubmittingIntent}
 className="h-14 bg-[#4ADE80] text-black font-bold uppercase tracking-widest text-[11px] px-10 hover:bg-white transition-colors rounded-sm"
 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
 >
 {isSubmittingIntent ? 'Encrypting Request...' : 'Transmit Intent'}
 </Button>
 </div>
 </form>
 </div>
 )}

 {totalPages > 1 && (
 <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-12 border-t border-white/10 mt-12">
 <button
 onClick={() => {
 setCurrentPage((page) => Math.max(1, page - 1));
 window.scrollTo({ top: 0, behavior: 'smooth' });
 }}
 disabled={currentPage === 1}
 className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-[#4ADE80] disabled:opacity-20 disabled:pointer-events-none transition-all bg-white/5 px-6 py-3 rounded-sm border border-white/5"
 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
 >
 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
 Previous Block
 </button>

 <div className="flex items-center gap-6 px-8 py-4 bg-black/50 border border-white/10 rounded-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
 <span className="text-[11px] font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Ledger
 </span>
 <div className="text-2xl font-bold text-white tracking-tighter w-12 text-center" style={{ fontFamily: '"Inter", sans-serif' }}>
 {currentPage.toString().padStart(2, '0')}
 </div>
 <span className="text-[11px] font-bold uppercase tracking-widest text-white/40" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 of {totalPages.toLocaleString()}
 </span>
 </div>

 <button
 onClick={() => {
 setCurrentPage((page) => Math.min(totalPages, page + 1));
 window.scrollTo({ top: 0, behavior: 'smooth' });
 }}
 disabled={currentPage === totalPages}
 className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-[#4ADE80] disabled:opacity-20 disabled:pointer-events-none transition-all bg-white/5 px-6 py-3 rounded-sm border border-white/5"
 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
 >
 Next Block
 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
 </button>
 </div>
 )}

 <div className="pt-20 text-center relative z-10">
 <p className="text-[11px] font-bold uppercase tracking-widest text-white/30" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
 Global Market Directory — 6,944 Nodes Secured. Execution validation powered by Digital Orchard OS.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};
