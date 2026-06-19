import marketData from './Market.json';

export interface MarketData {
 node_id: number;
 State: string;
 District: string;
 Market: string;
 total_arrivals: number;
 unique_commodities: number;
 node_tier: string;
}

export const markets: MarketData[] = marketData as any[];

export const allStates = [...new Set(markets.map((m) => m.State))].sort();
export const allTiers = [...new Set(markets.map((m) => m.node_tier))].sort();
export const allDistricts = [...new Set(markets.map((m) => m.District))].sort();

export const stateToDistrictsMap: Record<string, string[]> = {};
for (const state of allStates) {
  stateToDistrictsMap[state] = [
    ...new Set(markets.filter((m) => m.State === state).map((m) => m.District)),
  ].sort();
}
