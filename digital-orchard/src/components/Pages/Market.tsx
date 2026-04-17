import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ShoppingCart, ArrowLeft, ArrowRight, Activity, Filter } from 'lucide-react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { markets } from '@/src/data/markets';

export const MarketPage = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [tierFilter, setTierFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Filter options
  const states = useMemo(() => [...new Set(markets.map(m => m.State))].sort(), []);
  const districts = useMemo(() => {
    const filtered = stateFilter ? markets.filter(m => m.State === stateFilter) : markets;
    return [...new Set(filtered.map(m => m.District))].sort();
  }, [stateFilter]);
  const tiers = useMemo(() => [...new Set(markets.map(m => m.node_tier))].sort(), []);

  // Filter markets based on all criteria
  const filteredNodes = useMemo(() => {
    return markets.filter(m => {
      const matchesSearch = m.Market.toLowerCase().includes(filter.toLowerCase()) || 
                           m.District.toLowerCase().includes(filter.toLowerCase());
      const matchesState = !stateFilter || m.State === stateFilter;
      const matchesDistrict = !districtFilter || m.District === districtFilter;
      const matchesTier = !tierFilter || m.node_tier === tierFilter;
      
      return matchesSearch && matchesState && matchesDistrict && matchesTier;
    });
  }, [filter, stateFilter, districtFilter, tierFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredNodes.length / itemsPerPage);
  const paginatedNodes = useMemo(() => {
    return filteredNodes.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredNodes, currentPage]);

  return (
    <div className="pt-32 px-10 min-h-screen bg-background text-white pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="display text-6xl font-black uppercase tracking-tighter">
              {t('market')}<span className="text-primary">.</span>
            </h1>
            <p className="text-foreground-muted uppercase tracking-[3px] text-sm font-bold opacity-60">Industrial Procurement & Logistics Protocol</p>
          </div>
          
          <div className="w-full md:w-96 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search Global Market Nodes..."
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
              className="w-full bg-[#0D0D0D] border border-white/10 h-14 pl-12 pr-6 focus:border-primary outline-none mono text-[10px] uppercase tracking-widest transition-all"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap gap-4 mb-12 p-6 bg-[#080808] border border-white/5 items-center">
          <div className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[4px] mr-4">
            <Filter size={14} className="text-primary" />
            <span>Region Matrix</span>
          </div>
          
          <select 
            value={stateFilter}
            onChange={(e) => { setStateFilter(e.target.value); setDistrictFilter(''); setCurrentPage(1); }}
            className="bg-black border border-white/10 px-4 py-3 mono text-[10px] text-white/60 focus:border-primary outline-none uppercase tracking-widest min-w-[160px] cursor-pointer hover:bg-white/5 transition-colors"
            title="Filter by State"
          >
            <option value="" className="bg-[#0D0D0D]">All States</option>
            {states.map(s => <option key={s} value={s} className="bg-[#0D0D0D]">{s}</option>)}
          </select>

          <select 
            value={districtFilter}
            onChange={(e) => { setDistrictFilter(e.target.value); setCurrentPage(1); }}
            className="bg-black border border-white/10 px-4 py-3 mono text-[10px] text-white/60 focus:border-primary outline-none uppercase tracking-widest min-w-[160px] cursor-pointer hover:bg-white/5 transition-colors"
            title="Filter by District"
          >
            <option value="" className="bg-[#0D0D0D]">All Districts</option>
            {districts.map(d => <option key={d} value={d} className="bg-[#0D0D0D]">{d}</option>)}
          </select>

          <select 
            value={tierFilter}
            onChange={(e) => { setTierFilter(e.target.value); setCurrentPage(1); }}
            className="bg-black border border-white/10 px-4 py-3 mono text-[10px] text-white/60 focus:border-primary outline-none uppercase tracking-widest min-w-[160px] cursor-pointer hover:bg-white/5 transition-colors"
            title="Filter by Node Tier"
          >
            <option value="" className="bg-[#0D0D0D]">All Tiers</option>
            {tiers.map(t => <option key={t} value={t} className="bg-[#0D0D0D]">{t}</option>)}
          </select>

          <div className="ml-auto mono text-[10px] text-primary font-black uppercase tracking-widest bg-primary/5 px-4 py-2 border border-primary/20">
            {filteredNodes.length.toLocaleString()} Nodes Identified
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar / System Status */}
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-[#080808] border border-white/5 space-y-8">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[4px]">Active Nodes</span>
                <div className="text-4xl font-black text-primary tracking-tighter">{filteredNodes.length.toLocaleString()}</div>
              </div>
              
              <div className="h-px bg-white/5" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[2px]">System Load</span>
                  <span className="mono text-[10px] text-primary">Normal</span>
                </div>
                <div className="w-full h-1 bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full bg-primary/40"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-4">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-[4px]">Procurement Protocol</span>
                <div className="text-xl font-black uppercase tracking-tight">Direct Arbitrage V2.1</div>
              </div>

              <Button className="w-full bg-primary text-black font-black uppercase tracking-widest text-[10px] h-14 hover:scale-[1.02] transition-all">
                Access Node Registry
              </Button>
            </div>

            <div className="p-8 border border-white/5 border-dashed bg-[#050505] flex flex-col gap-4">
              <Activity size={24} className="text-primary opacity-40" />
              <p className="mono text-[9px] leading-relaxed text-white/40 uppercase tracking-[2px]">
                Global Inventory Ledger synchronized. All node data derived from the official Digital Orchard Industrial Index.
              </p>
            </div>
          </div>

          {/* Main Node List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[4px]">Verified Procurement Units</span>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="mono text-[10px] text-primary uppercase font-black">Syncing Live Ledger</span>
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
                {paginatedNodes.map((market) => (
                  <div key={market.node_id} className="p-8 bg-[#0D0D0D] border border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden">
                    {/* Hover Glow Effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                      <div className="space-y-5 flex-1">
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary mono text-[9px] font-black uppercase border border-primary/20 tracking-widest">Node_Online</span>
                          <span className="mono text-[10px] text-white/20 uppercase tracking-[3px]">UID: #{market.node_id.toString().padStart(4, '0')}</span>
                        </div>
                        
                        <h3 className="display text-4xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                          {market.Market}
                        </h3>
                        
                        <div className="flex flex-wrap gap-10">
                          <div className="flex items-center gap-3">
                            <MapPin size={14} className="text-primary opacity-60" />
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-white uppercase tracking-widest">{market.District}</span>
                              <span className="mono text-[9px] text-white/20 uppercase">{market.State}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Activity size={14} className="text-primary opacity-60" />
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-white uppercase tracking-widest">{market.total_arrivals.toLocaleString()} MT</span>
                              <span className="mono text-[9px] text-white/20 uppercase">Total Arrivals</span>
                            </div>
                          </div>

                          <div className="flex flex-col justify-center">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Tier</span>
                            <span className="mono text-[9px] text-white/40 uppercase">{market.node_tier}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-white/5">
                        <div className="flex-1 md:text-right">
                          <div className="text-[10px] font-black text-primary uppercase tracking-[2px] mb-1">Alpha Bid</div>
                          <div className="text-3xl font-black uppercase tracking-tighter text-white">
                            ₹{((market.total_arrivals % 500) + 2200).toLocaleString()}
                            <span className="text-sm opacity-40 ml-1">/Q</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button 
                            className="h-14 w-14 flex items-center justify-center border border-white/10 hover:border-primary group/icon transition-all bg-white/5 active:scale-95"
                            title="Add to Settlement List"
                          >
                            <ShoppingCart size={20} className="text-white/40 group-hover:text-primary transition-colors" />
                          </button>
                          <Button className="h-14 bg-white text-black font-black uppercase tracking-[3px] text-[10px] px-8 hover:bg-primary transition-all hover:translate-x-1 active:scale-95 shadow-xl">
                            Settle Node
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 mt-12">
                <button 
                  onClick={() => { setCurrentPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary disabled:opacity-20 disabled:pointer-events-none transition-all"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                  <span className="border-b border-transparent group-hover:border-primary pb-0.5">Previous Ledger</span>
                </button>
                
                <div className="flex items-center gap-6 px-8 py-4 bg-[#0D0D0D] border border-white/5 rounded-sm">
                  <span className="mono text-[10px] text-white/20 uppercase tracking-widest">Block</span>
                  <div className="text-lg font-black text-white mono w-12 text-center">
                    {currentPage.toString().padStart(2, '0')}
                  </div>
                  <span className="mono text-[10px] text-white/20 uppercase tracking-widest">of {totalPages.toLocaleString()}</span>
                </div>

                <button 
                  onClick={() => { setCurrentPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-primary disabled:opacity-20 disabled:pointer-events-none transition-all"
                >
                  <span className="border-b border-transparent group-hover:border-primary pb-0.5">Next Ledger</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
            
            {/* Info Footer */}
            <div className="pt-12 text-center">
              <p className="mono text-[9px] text-white/20 uppercase tracking-[4px]">
                End of synchronized protocol buffer. Digital Orchard Architecture v4.0.2
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

