import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
} from "lucide-react";
import { useLanguage } from "@/src/lib/LanguageContext";
import { useAuth } from "@/src/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { markets, type MarketData } from "@/src/data/markets";
import { getMarketSignal } from "@/src/lib/marketSignals";
import {
  createTradeIntent,
  getSavedTradeIntents,
  type TradeIntentType,
} from "@/src/lib/tradeIntents";

const SAVED_MARKETS_KEY = "farmer-company-saved-markets";

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
  phoneNumber: string,
): IntentFormState => ({
  marketId: market.node_id,
  marketName: market.Market,
  district: market.District,
  state: market.State,
  type,
  commodityName: "",
  quantityTonnes: "",
  contactName: fullName,
  phone: phoneNumber,
  targetPrice: "",
  notes: "",
});

export const MarketPage = () => {
  const { t } = useLanguage();
  const { user, profile } = useAuth();
  const [filter, setFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedMarketIds, setSavedMarketIds] = useState<number[]>([]);
  const [savedIntentCount, setSavedIntentCount] = useState(0);
  const [intentForm, setIntentForm] = useState<IntentFormState | null>(null);
  const [intentStatus, setIntentStatus] = useState("");
  const [isSubmittingIntent, setIsSubmittingIntent] = useState(false);
  const itemsPerPage = 20;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const raw = window.localStorage.getItem(SAVED_MARKETS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTimeout(() => {
            setSavedMarketIds(
              parsed.filter(
                (value): value is number => typeof value === "number",
              ),
            );
          }, 0);
        }
      }
    } catch {
      // Ignore malformed storage and start from an empty list.
    }

    setTimeout(() => {
      setSavedIntentCount(getSavedTradeIntents().length);
    }, 0);
  }, []);

  const states = useMemo(
    () => [...new Set(markets.map((m) => m.State))].sort(),
    [],
  );
  const districts = useMemo(() => {
    const filtered = stateFilter
      ? markets.filter((m) => m.State === stateFilter)
      : markets;
    return [...new Set(filtered.map((m) => m.District))].sort();
  }, [stateFilter]);
  const tiers = useMemo(
    () => [...new Set(markets.map((m) => m.node_tier))].sort(),
    [],
  );

  const filteredNodes = useMemo(() => {
    return markets.filter((market) => {
      const matchesSearch =
        market.Market.toLowerCase().includes(filter.toLowerCase()) ||
        market.District.toLowerCase().includes(filter.toLowerCase());
      const matchesState = !stateFilter || market.State === stateFilter;
      const matchesDistrict =
        !districtFilter || market.District === districtFilter;
      const matchesTier = !tierFilter || market.node_tier === tierFilter;

      return matchesSearch && matchesState && matchesDistrict && matchesTier;
    });
  }, [districtFilter, filter, stateFilter, tierFilter]);

  const totalPages = Math.ceil(filteredNodes.length / itemsPerPage);
  const paginatedNodes = useMemo(() => {
    return filteredNodes.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage,
    );
  }, [currentPage, filteredNodes]);

  const toggleSavedMarket = (marketId: number) => {
    setSavedMarketIds((prev) => {
      const next = prev.includes(marketId)
        ? prev.filter((id) => id !== marketId)
        : [...prev, marketId];

      if (typeof window !== "undefined") {
        window.localStorage.setItem(SAVED_MARKETS_KEY, JSON.stringify(next));
      }

      return next;
    });
  };

  const openIntentForm = (market: MarketData, type: TradeIntentType) => {
    setIntentStatus("");
    setIntentForm(
      createIntentDraft(
        market,
        type,
        profile?.fullName || "",
        user?.phoneNumber || "",
      ),
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
    setIntentStatus("");

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
      targetPrice: intentForm.targetPrice
        ? Number(intentForm.targetPrice)
        : null,
      notes: intentForm.notes.trim(),
      source: "market_page",
      userId: user?.uid || null,
    });

    setSavedIntentCount(getSavedTradeIntents().length);
    setIntentStatus(
      savedIntent.persistence === "firestore"
        ? "Intent sent to the ops queue. The team can now validate and match this lead."
        : "Intent saved locally for assisted follow-up. Firebase write was unavailable, so the lead stays on this device.",
    );
    setIntentForm(null);
    setIsSubmittingIntent(false);
  };

  return (
    <div className="pt-32 px-6 md:px-10 min-h-screen bg-background text-white pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="space-y-4">
            <h1 className="display text-4xl md:text-6xl font-light normal-case tracking-tight">
              {t("market")}
              <span className="text-primary">.</span>
            </h1>
            <p className="text-foreground-muted normal-case md: text-[10px] md:text-sm font-medium opacity-60 max-w-3xl">
              6,944 markets mapped across India. Use arrivals data and regional
              signals to identify trade opportunities — then confirm live quotes
              through the ops workflow.
            </p>
          </div>

          <div className="w-full md:w-96 relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search markets or districts..."
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#0D0D0D] border border-white/10 h-14 pl-12 pr-6 focus:border-primary outline-none mono text-[10px] normal-case transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 mb-12 p-4 md:p-6 bg-[#080808] border border-white/5 items-center">
          <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-medium text-white/30 normal-case md: mr-4">
            <Filter size={14} className="text-primary" />
            <span>Region Matrix</span>
          </div>

          <select
            value={stateFilter}
            onChange={(e) => {
              setStateFilter(e.target.value);
              setDistrictFilter("");
              setCurrentPage(1);
            }}
            className="flex-1 md:flex-none bg-black border border-white/10 px-4 py-3 mono text-[10px] text-white/60 focus:border-primary outline-none normal-case min-w-[140px] cursor-pointer hover:bg-white/5 transition-colors"
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
            className="flex-1 md:flex-none bg-black border border-white/10 px-4 py-3 mono text-[10px] text-white/60 focus:border-primary outline-none normal-case min-w-[140px] cursor-pointer hover:bg-white/5 transition-colors"
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

          <select
            value={tierFilter}
            onChange={(e) => {
              setTierFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 md:flex-none bg-black border border-white/10 px-4 py-3 mono text-[10px] text-white/60 focus:border-primary outline-none normal-case min-w-[140px] cursor-pointer hover:bg-white/5 transition-colors"
            title="Filter by node tier"
          >
            <option value="" className="bg-[#0D0D0D]">
              All Tiers
            </option>
            {tiers.map((tier) => (
              <option key={tier} value={tier} className="bg-[#0D0D0D]">
                {tier}
              </option>
            ))}
          </select>

          <div className="w-full md:w-auto md:ml-auto mono text-[9px] md:text-[10px] text-primary font-medium normal-case bg-primary/5 px-4 py-2 border border-primary/20 text-center">
            {filteredNodes.length.toLocaleString()} markets identified
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="p-8 bg-[#080808] border border-white/5 space-y-8">
              <div className="space-y-1">
                <span className="text-[10px] font-medium text-white/20 normal-case ">
                  Active Markets
                </span>
                <div className="text-4xl font-light text-primary tracking-tight">
                  {filteredNodes.length.toLocaleString()}
                </div>
              </div>

              <div className="h-px bg-white/5" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-white/40 normal-case ">
                    Beta Status
                  </span>
                  <span className="mono text-[10px] text-primary">
                    Active Directory
                  </span>
                </div>
                <div className="w-full h-1 bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-full h-full bg-primary/40"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-4">
                <span className="text-[10px] font-medium text-white/20 normal-case ">
                  Beta Trust Layer
                </span>
                <div className="text-sm font-medium leading-relaxed tracking-tight text-white/60">
                  Market discovery uses verified arrivals data. Live quote
                  confirmation happens through assisted trade handling — this is
                  by design during beta, not a limitation.
                </div>
              </div>

              <Button
                className="w-full bg-primary text-black font-medium normal-case text-[10px] h-14 hover:scale-[1.02] transition-all"
                onClick={() =>
                  window.scrollTo({ top: 520, behavior: "smooth" })
                }
              >
                Browse Markets
              </Button>
            </div>

            <div className="p-8 border border-white/5 border-dashed bg-[#050505] flex flex-col gap-4">
              <CheckCircle2 size={24} className="text-primary opacity-60" />
              <div className="space-y-3">
                <p className="mono text-[9px] leading-relaxed text-white/40 normal-case ">
                  Market discovery uses arrivals and location coverage from the
                  current beta dataset. Live quote verification still happens
                  through the ops desk.
                </p>
                <div className="grid grid-cols-2 gap-3 text-[9px] normal-case ">
                  <div className="border border-white/5 px-3 py-3">
                    <span className="block text-white/20 mb-1">
                      Saved Markets
                    </span>
                    <span className="mono text-primary font-medium text-sm">
                      {savedMarketIds.length}
                    </span>
                  </div>
                  <div className="border border-white/5 px-3 py-3">
                    <span className="block text-white/20 mb-1">
                      Intent Queue
                    </span>
                    <span className="mono text-primary font-medium text-sm">
                      {savedIntentCount}
                    </span>
                  </div>
                </div>
                {intentStatus && (
                  <p className="text-[10px] leading-relaxed text-primary/90">
                    {intentStatus}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-[10px] font-medium text-white/40 normal-case ">
                Verified Procurement Units
              </span>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="mono text-[10px] text-primary normal-case font-medium">
                  Trust-first beta mode
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
                      className="p-8 bg-[#0D0D0D] border border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden"
                      tabIndex={0}
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
                        <div className="space-y-5 flex-1">
                          <div className="flex items-center gap-4">
                            <span className="px-2 py-0.5 bg-primary/10 text-primary mono text-[9px] font-medium normal-case border border-primary/20 ">
                              Node Online
                            </span>
                            <span className="mono text-[10px] text-white/20 normal-case ">
                              UID: #{market.node_id.toString().padStart(4, "0")}
                            </span>
                          </div>

                          <h3 className="display text-3xl md:text-4xl font-light normal-case tracking-tight group-hover:text-primary transition-colors">
                            {market.Market}
                          </h3>

                          <div className="flex flex-wrap gap-x-10 gap-y-6">
                            <div className="flex items-center gap-3">
                              <MapPin
                                size={14}
                                className="text-primary opacity-60"
                              />
                              <div className="flex flex-col">
                                <span className="text-[10px] font-medium text-white normal-case ">
                                  {market.District}
                                </span>
                                <span className="mono text-[9px] text-white/20 normal-case">
                                  {market.State}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Activity
                                size={14}
                                className="text-primary opacity-60"
                              />
                              <div className="flex flex-col">
                                <span className="text-[10px] font-medium text-white normal-case ">
                                  {market.total_arrivals.toLocaleString()} MT
                                </span>
                                <span className="mono text-[9px] text-white/20 normal-case">
                                  Total Arrivals
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 w-full md:w-auto pt-6 md:pt-0 border-t md:border-t-0 border-white/5">
                          <div className="flex-1 md:text-right space-y-2">
                            <div className="text-[10px] font-medium text-primary normal-case ">
                              Trade Signal
                            </div>
                            <div className="text-2xl md:text-3xl font-light normal-case tracking-tight text-white">
                              {signal.label}
                            </div>
                            <p className="max-w-md md:ml-auto text-[10px] leading-relaxed text-white/55">
                              {signal.guidance}
                            </p>
                            <div className="mono text-[9px] normal-case text-white/25">
                              Source: {signal.source} | Freshness:{" "}
                              {signal.freshness}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => toggleSavedMarket(market.node_id)}
                              className={`h-14 w-14 flex items-center justify-center border transition-all bg-white/5 active:scale-95 ${
                                isSaved
                                  ? "border-primary text-primary"
                                  : "border-white/10 hover:border-primary"
                              }`}
                              title={isSaved ? "Saved market" : "Save market"}
                            >
                              <ShoppingCart
                                size={20}
                                className={
                                  isSaved ? "text-primary" : "text-white/40"
                                }
                              />
                            </button>
                            <Button
                              className="h-14 bg-white text-black font-medium normal-case text-[10px] px-8 hover:bg-primary transition-all hover:translate-x-1 active:scale-95 shadow-xl"
                              onClick={() => openIntentForm(market, "buy")}
                            >
                              Request Buyer Match
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {intentForm && (
              <div className="border border-primary/20 bg-[#070707] p-6 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <PhoneCall size={16} />
                      <span className="mono text-[10px] normal-case font-medium">
                        Ops-assisted lead capture
                      </span>
                    </div>
                    <h3 className="text-2xl font-medium normal-case tracking-tight text-white">
                      {intentForm.type === "buy"
                        ? "Request buyer match"
                        : "List sell intent"}{" "}
                      for {intentForm.marketName}
                    </h3>
                    <p className="text-sm text-white/55">
                      Submit the commodity, quantity, and contact details. The
                      beta ops team can verify the lead and guide the next step
                      offline if needed.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeIntentForm}
                    className="text-[10px] normal-case text-white/40 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                </div>

                <form
                  onSubmit={handleIntentSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <input
                    required
                    type="text"
                    value={intentForm.commodityName}
                    onChange={(e) =>
                      setIntentForm({
                        ...intentForm,
                        commodityName: e.target.value,
                      })
                    }
                    placeholder="Commodity"
                    className="h-14 px-4 bg-black border border-white/10 focus:border-primary outline-none mono text-xs normal-case "
                  />
                  <input
                    required
                    type="number"
                    min="1"
                    step="0.1"
                    value={intentForm.quantityTonnes}
                    onChange={(e) =>
                      setIntentForm({
                        ...intentForm,
                        quantityTonnes: e.target.value,
                      })
                    }
                    placeholder="Quantity (tonnes)"
                    className="h-14 px-4 bg-black border border-white/10 focus:border-primary outline-none mono text-xs normal-case "
                  />
                  <input
                    required
                    type="text"
                    value={intentForm.contactName}
                    onChange={(e) =>
                      setIntentForm({
                        ...intentForm,
                        contactName: e.target.value,
                      })
                    }
                    placeholder="Contact name"
                    className="h-14 px-4 bg-black border border-white/10 focus:border-primary outline-none mono text-xs normal-case "
                  />
                  <input
                    required
                    type="tel"
                    value={intentForm.phone}
                    onChange={(e) =>
                      setIntentForm({ ...intentForm, phone: e.target.value })
                    }
                    placeholder="Phone number"
                    className="h-14 px-4 bg-black border border-white/10 focus:border-primary outline-none mono text-xs normal-case "
                  />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={intentForm.targetPrice}
                    onChange={(e) =>
                      setIntentForm({
                        ...intentForm,
                        targetPrice: e.target.value,
                      })
                    }
                    placeholder="Target price per quintal (optional)"
                    className="h-14 px-4 bg-black border border-white/10 focus:border-primary outline-none mono text-xs normal-case "
                  />
                  <select
                    value={intentForm.type}
                    onChange={(e) =>
                      setIntentForm({
                        ...intentForm,
                        type: e.target.value as TradeIntentType,
                      })
                    }
                    className="h-14 px-4 bg-black border border-white/10 focus:border-primary outline-none mono text-xs normal-case "
                    title="Intent type"
                  >
                    <option value="buy">Buy requirement</option>
                    <option value="sell">Sell availability</option>
                  </select>
                  <textarea
                    value={intentForm.notes}
                    onChange={(e) =>
                      setIntentForm({ ...intentForm, notes: e.target.value })
                    }
                    placeholder="Quality notes, delivery window, or callback preference"
                    className="md:col-span-2 min-h-[120px] px-4 py-4 bg-black border border-white/10 focus:border-primary outline-none text-sm leading-relaxed"
                  />
                  <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-2">
                    <p className="text-[10px] normal-case text-white/35">
                      Market: {intentForm.marketName}, {intentForm.district},{" "}
                      {intentForm.state}
                    </p>
                    <Button
                      type="submit"
                      disabled={isSubmittingIntent}
                      className="h-14 bg-primary text-black font-medium normal-case text-[10px] px-8"
                    >
                      {isSubmittingIntent
                        ? "Submitting lead..."
                        : "Send to ops queue"}
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 mt-12">
                <button
                  onClick={() => {
                    setCurrentPage((page) => Math.max(1, page - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className="group flex items-center gap-3 text-[10px] font-medium normal-case text-white/40 hover:text-primary disabled:opacity-20 disabled:pointer-events-none transition-all"
                >
                  <ArrowLeft
                    size={16}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span className="border-b border-transparent group-hover:border-primary pb-0.5">
                    Previous Ledger
                  </span>
                </button>

                <div className="flex items-center gap-6 px-8 py-4 bg-[#0D0D0D] border border-white/5 rounded-sm">
                  <span className="mono text-[10px] text-white/20 normal-case ">
                    Block
                  </span>
                  <div className="text-lg font-medium text-white mono w-12 text-center">
                    {currentPage.toString().padStart(2, "0")}
                  </div>
                  <span className="mono text-[10px] text-white/20 normal-case ">
                    of {totalPages.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setCurrentPage((page) => Math.min(totalPages, page + 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className="group flex items-center gap-3 text-[10px] font-medium normal-case text-white/40 hover:text-primary disabled:opacity-20 disabled:pointer-events-none transition-all"
                >
                  <span className="border-b border-transparent group-hover:border-primary pb-0.5">
                    Next Ledger
                  </span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            )}

            <div className="pt-12 text-center">
              <p className="mono text-[9px] text-white/20 normal-case ">
                Beta market directory — 6,944 nodes active. Assisted quote
                validation available for all markets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
