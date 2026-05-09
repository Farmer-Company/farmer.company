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

const districtsByState: Record<string, Set<string>> = {};
markets.forEach((m) => {
  if (!districtsByState[m.State]) {
    districtsByState[m.State] = new Set();
  }
  districtsByState[m.State].add(m.District);
});

export const stateToDistrictsMap: Record<string, string[]> = {};
for (const state in districtsByState) {
  stateToDistrictsMap[state] = [...districtsByState[state]].sort();
}
