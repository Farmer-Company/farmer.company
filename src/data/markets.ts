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

export const allStates = [...new Set(markets.map((m) => m.State))].sort();
export const allTiers = [...new Set(markets.map((m) => m.node_tier))].sort();
export const allDistricts = [...new Set(markets.map((m) => m.District))].sort();

const tempMap = markets.reduce((acc, m) => {
  if (!acc[m.State]) acc[m.State] = new Set<string>();
  acc[m.State].add(m.District);
  return acc;
}, {} as Record<string, Set<string>>);

export const stateToDistrictsMap: Record<string, string[]> = {};
Object.keys(tempMap).forEach(state => {
  stateToDistrictsMap[state] = [...tempMap[state]].sort();
});
