import marketData from './Market.json';

export interface MarketData {
 node_id: number;
 State: string;
 District: string;
 Market: string;
 total_arrivals: number;
 node_tier: string;
}

export const markets: MarketData[] = marketData as any[];

export const allStates = Array.from(new Set(markets.map(m => m.State))).sort();
export const allTiers = Array.from(new Set(markets.map(m => m.node_tier))).sort();
export const allDistricts = Array.from(new Set(markets.map(m => m.District))).sort();

export const stateToDistrictsMap = markets.reduce((acc, market) => {
  if (!acc[market.State]) {
    acc[market.State] = new Set<string>();
  }
  acc[market.State].add(market.District);
  return acc;
}, {} as Record<string, Set<string>>);

// Convert sets to sorted arrays
for (const state in stateToDistrictsMap) {
  stateToDistrictsMap[state] = new Set(Array.from(stateToDistrictsMap[state]).sort());
}
