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

const stateSet = new Set<string>();
const districtSet = new Set<string>();
const tierSet = new Set<string>();
const stateToDistricts = new Map<string, Set<string>>();

for (const m of markets) {
 stateSet.add(m.State);
 districtSet.add(m.District);
 tierSet.add(m.node_tier);

 if (!stateToDistricts.has(m.State)) {
 stateToDistricts.set(m.State, new Set());
 }
 stateToDistricts.get(m.State)!.add(m.District);
}

export const allStates = [...stateSet].sort();
export const allDistricts = [...districtSet].sort();
export const allTiers = [...tierSet].sort();

export const stateToDistrictsMap = new Map<string, string[]>();
for (const [state, districts] of stateToDistricts.entries()) {
 stateToDistrictsMap.set(state, [...districts].sort());
}
