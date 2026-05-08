import type { MarketData } from '@/src/data/markets';

export interface MarketSignal {
 label: 'High activity' | 'Steady activity' | 'Early activity';
 guidance: string;
 source: string;
 freshness: string;
}

export const getMarketSignal = (market: MarketData): MarketSignal => {
 if (market.total_arrivals >= 12000) {
 return {
 label: 'High activity',
 guidance: 'High arrivals volume. Use this as a discovery signal — live quote verification available through the ops desk.',
 source: 'Internal arrivals dataset',
 freshness: 'Beta dataset snapshot',
 };
 }

 if (market.total_arrivals >= 4000) {
 return {
 label: 'Steady activity',
 guidance: 'Moderate arrivals indicate a workable trading window. Validate quantity and quality before outreach.',
 source: 'Internal arrivals dataset',
 freshness: 'Beta dataset snapshot',
 };
 }

 return {
 label: 'Early activity',
 guidance: 'Lower arrivals may require assisted sourcing. Use callback flow to verify availability before committing.',
 source: 'Internal arrivals dataset',
 freshness: 'Beta dataset snapshot',
 };
};
