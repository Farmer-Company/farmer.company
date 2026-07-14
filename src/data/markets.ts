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

export const allStates = [...new Set(markets.map(m => m.State))].filter(Boolean).sort();
export const allTiers = [...new Set(markets.map(m => m.node_tier))].filter(Boolean).sort();
export const allDistricts = [...new Set(markets.map(m => m.District))].filter(Boolean).sort();

export const stateToDistrictsMap = markets.reduce((acc, m) => {
  if (m.State && m.District) {
    if (!acc[m.State]) acc[m.State] = new Set<string>();
    acc[m.State].add(m.District);
  }
  return acc;
}, {} as Record<string, Set<string>>);

export const getDistrictsForState = (state: string) => {
  if (!state) return allDistricts;
  const districts = stateToDistrictsMap[state];
  return districts ? [...districts].sort() : [];
};
