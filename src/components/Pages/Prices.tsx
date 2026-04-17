import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { commodities } from '@/src/data/commodities';
import { markets, MarketData } from '@/src/data/markets';
import { Search, MapPin, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export const PricesPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'commodities' | 'markets'>('commodities');
  const [filter, setFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  // Commodity filtering
  const filteredCommodities = commodities.filter(c => 
    c.name.toLowerCase().includes(filter.toLowerCase()) ||
    c.code.includes(filter)
  );

  // Market filtering
  const filteredMarkets = useMemo(() => {
    return markets.filter(m => {
      const matchesSearch = m.Market.toLowerCase().includes(filter.toLowerCase()) || 
                           m.District.toLowerCase().includes(filter.toLowerCase());
      const matchesState = !stateFilter || m.State === stateFilter;
      const matchesDistrict = !districtFilter || m.District === districtFilter;
      return matchesSearch && matchesState && matchesDistrict;
    });
  }, [filter, stateFilter, districtFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);
  const paginatedMarkets = filteredMarkets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Filter options
  const states = useMemo(() => [...new Set(markets.map(m => m.State))].sort(), []);
  const districts = useMemo(() => {
    const filtered = stateFilter ? markets.filter(m => m.State === stateFilter) : markets;
    return [...new Set(filtered.map(m => m.District))].sort();
  }, [stateFilter]);

  return (
    <div className="pt-32 px-6 md:px-10 min-h-screen bg-background text-white pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
          <div className="space-y-4">
            <h1 className="display text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {activeTab === 'commodities' ? t('prices') : 'Markets'}<span className="text-primary">.</span>
            </h1>
            <p className="text-foreground-muted uppercase tracking-[2px] md:tracking-[3px] text-[10px] md:text-sm font-bold">
              {activeTab === 'commodities' ? 'Real-time Commodity Arbitration Feed' : 'Global Node Directory for Indian Agriculture'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Tab Switcher */}
            <div className="flex bg-[#0D0D0D] p-1 border border-white/5 rounded-sm">
              <button 
                onClick={() => { setActiveTab('commodities'); setFilter(''); }}
                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'commodities' ? 'bg-primary text-black' : 'text-white/40 hover:text-white'}`}
              >
                Commodities
              </button>
              <button 
                onClick={() => { setActiveTab('markets'); setFilter(''); setCurrentPage(1); }}
                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'markets' ? 'bg-primary text-black' : 'text-white/40 hover:text-white'}`}
              >
                Markets
              </button>
            </div>

            {/* Search Input */}
            <div className="relative group w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder={activeTab === 'commodities' ? "Search Commodities..." : "Search Markets..."}
                value={filter}
                onChange={(e) => { setFilter(e.target.value); setCurrentPage(1); }}
                className="w-full bg-[#0D0D0D] border border-white/10 h-14 pl-12 pr-6 focus:border-primary outline-none mono text-xs uppercase tracking-widest transition-all"
              />
            </div>
          </div>
        </div>

        {/* Filters Bar (Only for Markets) */}
        {activeTab === 'markets' && (
          <div className="flex flex-wrap gap-3 md:gap-4 mb-8 p-4 md:p-6 bg-[#080808] border border-white/5 items-center">
            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-widest mr-4">
              <Filter size={12} className="text-primary" />
              <span>Advanced Filters</span>
            </div>
            
            <select 
              value={stateFilter}
              onChange={(e) => { setStateFilter(e.target.value); setDistrictFilter(''); setCurrentPage(1); }}
              className="flex-1 md:flex-none bg-black border border-white/10 px-4 py-2 mono text-[10px] text-white/60 focus:border-primary outline-none uppercase tracking-widest"
              title="Filter by State"
            >
              <option value="" className="bg-[#0D0D0D]">All States</option>
              {states.map(s => <option key={s} value={s} className="bg-[#0D0D0D]">{s}</option>)}
            </select>

            <select 
              value={districtFilter}
              onChange={(e) => { setDistrictFilter(e.target.value); setCurrentPage(1); }}
              className="flex-1 md:flex-none bg-black border border-white/10 px-4 py-2 mono text-[10px] text-white/60 focus:border-primary outline-none uppercase tracking-widest"
              title="Filter by District"
            >
              <option value="" className="bg-[#0D0D0D]">All Districts</option>
              {districts.map(d => <option key={d} value={d} className="bg-[#0D0D0D]">{d}</option>)}
            </select>

            <div className="w-full md:w-auto md:ml-auto mono text-[9px] md:text-[10px] text-primary font-black uppercase tracking-widest text-center">
              {filteredMarkets.length} Nodes Found
            </div>
          </div>
        )}
        
        {/* Data Table */}
        <div className="overflow-x-auto border border-white/5 bg-[#080808] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#0D0D0D]">
                {activeTab === 'commodities' ? (
                  <>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">Code</th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">Commodity</th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">Modal Price</th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">Action</th>
                  </>
                ) : (
                  <>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">Node ID</th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">Market / Node</th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">State / District</th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">Arrivals</th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">Tier</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeTab === 'commodities' ? (
                filteredCommodities.map((item, i) => (
                  <tr key={`${item.code}-${i}`} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-8 px-8 mono text-xs text-foreground-muted uppercase tracking-widest">#{item.code.padStart(3, '0')}</td>
                    <td className="py-8 px-8 font-black text-xl uppercase tracking-tighter group-hover:text-primary transition-colors">{item.name}</td>
                    <td className="py-8 px-8 mono text-2xl font-black text-white/90">₹{(15 + (parseInt(item.code) % 50) + (i % 10)).toFixed(2)}</td>
                    <td className="py-8 px-8">
                      <button className="text-[10px] font-black uppercase tracking-[2px] text-primary hover:text-white transition-colors">Historical Feed →</button>
                    </td>
                  </tr>
                ))
              ) : (
                paginatedMarkets.map((market) => (
                  <tr key={market.node_id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-8 px-8 mono text-[10px] text-foreground-muted uppercase tracking-widest">
                      NODE_{market.node_id.toString().padStart(4, '0')}
                    </td>
                    <td className="py-8 px-8">
                      <div className="flex flex-col gap-1">
                        <span className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">{market.Market}</span>
                        <span className="mono text-[9px] text-white/20 uppercase tracking-[2px]">{market.unique_commodities} COMMODITIES REGISTERED</span>
                      </div>
                    </td>
                    <td className="py-8 px-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={10} className="text-primary" /> {market.State}
                        </span>
                        <span className="mono text-[10px] text-white/20 uppercase">{market.District}</span>
                      </div>
                    </td>
                    <td className="py-8 px-8 mono text-lg font-black text-white/90">
                      {market.total_arrivals.toLocaleString()} <small className="text-[10px] opacity-40 font-normal">MT</small>
                    </td>
                    <td className="py-8 px-8">
                      <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${
                        market.node_tier === 'Regional Hub' ? 'bg-primary/10 border-primary text-primary' : 'bg-white/5 border-white/10 text-white/40'
                      }`}>
                        {market.node_tier}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {((activeTab === 'commodities' && filteredCommodities.length === 0) || 
            (activeTab === 'markets' && filteredMarkets.length === 0)) && (
            <div className="py-20 text-center text-foreground-muted uppercase mono text-xs tracking-widest">
              No matching nodes found in the protocol ledger.
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {activeTab === 'markets' && totalPages > 1 && (
          <div className="mt-12 flex justify-between items-center bg-[#0D0D0D] p-6 border border-white/5">
            <div className="mono text-[10px] text-white/30 uppercase tracking-[3px]">
              Page <span className="text-white font-black">{currentPage}</span> of {totalPages}
            </div>
            <div className="flex gap-4">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-primary disabled:opacity-20 disabled:hover:border-white/10 transition-all"
                title="Previous Page"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-primary disabled:opacity-20 disabled:hover:border-white/10 transition-all"
                title="Next Page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

