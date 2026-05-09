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
