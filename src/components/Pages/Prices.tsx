import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { commodities } from '@/src/data/commodities';
import { markets } from '@/src/data/markets';
import { ChevronLeft, ChevronRight, Filter, MapPin, Search } from 'lucide-react';

export const PricesPage = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'commodities' | 'markets'>('commodities');
  const [filter, setFilter] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  const filteredCommodities = commodities.filter(
    (commodity) =>
      commodity.name.toLowerCase().includes(filter.toLowerCase()) ||
      commodity.code.includes(filter)
  );

  const filteredMarkets = useMemo(() => {
    return markets.filter((market) => {
      const matchesSearch =
        market.Market.toLowerCase().includes(filter.toLowerCase()) ||
        market.District.toLowerCase().includes(filter.toLowerCase());
      const matchesState = !stateFilter || market.State === stateFilter;
      const matchesDistrict = !districtFilter || market.District === districtFilter;
      return matchesSearch && matchesState && matchesDistrict;
    });
  }, [districtFilter, filter, stateFilter]);

  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage);
  const paginatedMarkets = filteredMarkets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const states = useMemo(() => [...new Set(markets.map((market) => market.State))].sort(), []);
  const districts = useMemo(() => {
    const filtered = stateFilter ? markets.filter((market) => market.State === stateFilter) : markets;
    return [...new Set(filtered.map((market) => market.District))].sort();
  }, [stateFilter]);
  const verifiedMarketCoverage = filteredMarkets.filter(
    (market) => market.total_arrivals >= 4000
  ).length;

  return (
    <div className="pt-32 px-6 md:px-10 min-h-screen bg-background text-white pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-16">
          <div className="space-y-4">
            <h1 className="display text-4xl md:text-6xl font-black uppercase tracking-tighter">
              {activeTab === 'commodities' ? t('prices') : 'Markets'}
              <span className="text-primary">.</span>
            </h1>
            <p className="text-foreground-muted uppercase tracking-[2px] md:tracking-[3px] text-[10px] md:text-sm font-bold">
              {activeTab === 'commodities'
                ? 'Trust-ready price coverage for beta trade discovery'
                : 'Verified market coverage for Indian agriculture'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex bg-[#0D0D0D] p-1 border border-white/5 rounded-sm">
              <button
                onClick={() => {
                  setActiveTab('commodities');
                  setFilter('');
                }}
                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'commodities'
                    ? 'bg-primary text-black'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Commodities
              </button>
              <button
                onClick={() => {
                  setActiveTab('markets');
                  setFilter('');
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === 'markets'
                    ? 'bg-primary text-black'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                Markets
              </button>
            </div>

            <div className="relative group w-full sm:w-80">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors"
                size={16}
              />
              <input
                type="text"
                placeholder={
                  activeTab === 'commodities'
                    ? 'Search commodities...'
                    : 'Search markets...'
                }
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#0D0D0D] border border-white/10 h-14 pl-12 pr-6 focus:border-primary outline-none mono text-xs uppercase tracking-widest transition-all"
              />
            </div>
          </div>
        </div>

        {activeTab === 'markets' && (
          <div className="flex flex-wrap gap-3 md:gap-4 mb-8 p-4 md:p-6 bg-[#080808] border border-white/5 items-center">
            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-widest mr-4">
              <Filter size={12} className="text-primary" />
              <span>Advanced Filters</span>
            </div>

            <select
              value={stateFilter}
              onChange={(e) => {
                setStateFilter(e.target.value);
                setDistrictFilter('');
                setCurrentPage(1);
              }}
              className="flex-1 md:flex-none bg-black border border-white/10 px-4 py-2 mono text-[10px] text-white/60 focus:border-primary outline-none uppercase tracking-widest"
              title="Filter by state"
            >
              <option value="" className="bg-[#0D0D0D]">
                All States
              </option>
              {states.map((state) => (
                <option key={state} value={state} className="bg-[#0D0D0D]">
                  {state}
                </option>
              ))}
            </select>

            <select
              value={districtFilter}
              onChange={(e) => {
                setDistrictFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 md:flex-none bg-black border border-white/10 px-4 py-2 mono text-[10px] text-white/60 focus:border-primary outline-none uppercase tracking-widest"
              title="Filter by district"
            >
              <option value="" className="bg-[#0D0D0D]">
                All Districts
              </option>
              {districts.map((district) => (
                <option key={district} value={district} className="bg-[#0D0D0D]">
                  {district}
                </option>
              ))}
            </select>

            <div className="w-full md:w-auto md:ml-auto mono text-[9px] md:text-[10px] text-primary font-black uppercase tracking-widest text-center">
              {filteredMarkets.length} nodes found
            </div>
          </div>
        )}

        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="border border-white/5 bg-[#080808] p-5">
            <div className="mono text-[9px] uppercase tracking-[3px] text-white/25 mb-2">
              Price source
            </div>
            <div className="text-lg font-black uppercase tracking-tight text-white">
              Verification in progress
            </div>
            <p className="text-sm text-white/55 mt-2">
              Beta uses curated commodity and market coverage while Agmarknet or equivalent verified feed integration is completed.
            </p>
          </div>
          <div className="border border-white/5 bg-[#080808] p-5">
            <div className="mono text-[9px] uppercase tracking-[3px] text-white/25 mb-2">
              Freshness
            </div>
            <div className="text-lg font-black uppercase tracking-tight text-white">
              Dataset snapshot
            </div>
            <p className="text-sm text-white/55 mt-2">
              Exact live rupee prices stay hidden until a source, timestamp, and validation path are available in-product.
            </p>
          </div>
          <div className="border border-white/5 bg-[#080808] p-5">
            <div className="mono text-[9px] uppercase tracking-[3px] text-white/25 mb-2">
              Coverage
            </div>
            <div className="text-lg font-black uppercase tracking-tight text-white">
              {verifiedMarketCoverage} active markets
            </div>
            <p className="text-sm text-white/55 mt-2">
              Use market activity and arrivals as discovery inputs, then confirm quotes through the assisted ops workflow.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto border border-white/5 bg-[#080808] shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#0D0D0D]">
                {activeTab === 'commodities' ? (
                  <>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      Code
                    </th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      Commodity
                    </th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      Pricing Status
                    </th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      Source / Next Step
                    </th>
                  </>
                ) : (
                  <>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      Node ID
                    </th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      Market / Node
                    </th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      State / District
                    </th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      Arrivals
                    </th>
                    <th className="py-6 px-8 text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">
                      Tier
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeTab === 'commodities' ? (
                filteredCommodities.map((item, i) => (
                  <tr
                    key={`${item.code}-${i}`}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-8 px-8 mono text-xs text-foreground-muted uppercase tracking-widest">
                      #{item.code.padStart(3, '0')}
                    </td>
                    <td className="py-8 px-8 font-black text-xl uppercase tracking-tighter group-hover:text-primary transition-colors">
                      {item.name}
                    </td>
                    <td className="py-8 px-8">
                      <div className="flex flex-col gap-2">
                        <span className="inline-flex w-fit px-3 py-1 text-[9px] font-black uppercase tracking-[2px] border border-amber-500/30 bg-amber-500/10 text-amber-300">
                          Awaiting verified quote
                        </span>
                        <span className="mono text-[10px] text-white/35 uppercase tracking-[2px]">
                          No exact price published yet
                        </span>
                      </div>
                    </td>
                    <td className="py-8 px-8">
                      <div className="space-y-2">
                        <p className="text-[11px] leading-relaxed text-white/60">
                          Source integration is still pending. Use this row to track commodity availability, not to price a trade.
                        </p>
                        <button className="text-[10px] font-black uppercase tracking-[2px] text-primary hover:text-white transition-colors">
                          Request verified callback →
                        </button>
                      </div>
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
                        <span className="font-black text-lg uppercase tracking-tight group-hover:text-primary transition-colors">
                          {market.Market}
                        </span>
                        <span className="mono text-[9px] text-white/20 uppercase tracking-[2px]">
                          {market.unique_commodities} commodities registered
                        </span>
                      </div>
                    </td>
                    <td className="py-8 px-8">
                      <div className="flex flex-col gap-1">
                        <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={10} className="text-primary" /> {market.State}
                        </span>
                        <span className="mono text-[10px] text-white/20 uppercase">
                          {market.District}
                        </span>
                      </div>
                    </td>
                    <td className="py-8 px-8 mono text-lg font-black text-white/90">
                      {market.total_arrivals.toLocaleString()}{' '}
                      <small className="text-[10px] opacity-40 font-normal">MT</small>
                    </td>
                    <td className="py-8 px-8">
                      <span
                        className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${
                          market.node_tier === 'Regional Hub'
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
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

        {activeTab === 'markets' && totalPages > 1 && (
          <div className="mt-12 flex justify-between items-center bg-[#0D0D0D] p-6 border border-white/5">
            <div className="mono text-[10px] text-white/30 uppercase tracking-[3px]">
              Page <span className="text-white font-black">{currentPage}</span> of {totalPages}
            </div>
            <div className="flex gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-primary disabled:opacity-20 disabled:hover:border-white/10 transition-all"
                title="Previous page"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                className="w-12 h-12 flex items-center justify-center border border-white/10 hover:border-primary disabled:opacity-20 disabled:hover:border-white/10 transition-all"
                title="Next page"
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
