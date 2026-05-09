import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getMarketSignal } from './marketSignals';
import type { MarketData } from '../data/markets';

describe('getMarketSignal', () => {
  const baseMarket: Omit<MarketData, 'total_arrivals'> = {
    node_id: 1,
    State: 'Test State',
    District: 'Test District',
    Market: 'Test Market',
    unique_commodities: 10,
    node_tier: 'Tier 1'
  };

  it('should return High activity for arrivals >= 12000', () => {
    const market = { ...baseMarket, total_arrivals: 12000 } as MarketData;
    const signal = getMarketSignal(market);

    assert.equal(signal.label, 'High activity');
    assert.equal(signal.source, 'Internal arrivals dataset');
    assert.equal(signal.freshness, 'Beta dataset snapshot');
    assert.equal(signal.guidance, 'High arrivals volume. Use this as a discovery signal — live quote verification available through the ops desk.');
  });

  it('should return High activity for arrivals > 12000', () => {
    const market = { ...baseMarket, total_arrivals: 15000 } as MarketData;
    const signal = getMarketSignal(market);

    assert.equal(signal.label, 'High activity');
  });

  it('should return Steady activity for arrivals >= 4000 and < 12000', () => {
    const market = { ...baseMarket, total_arrivals: 4000 } as MarketData;
    const signal = getMarketSignal(market);

    assert.equal(signal.label, 'Steady activity');
    assert.equal(signal.guidance, 'Moderate arrivals indicate a workable trading window. Validate quantity and quality before outreach.');
  });

  it('should return Steady activity for arrivals just below 12000', () => {
    const market = { ...baseMarket, total_arrivals: 11999 } as MarketData;
    const signal = getMarketSignal(market);

    assert.equal(signal.label, 'Steady activity');
  });

  it('should return Early activity for arrivals < 4000', () => {
    const market = { ...baseMarket, total_arrivals: 3999 } as MarketData;
    const signal = getMarketSignal(market);

    assert.equal(signal.label, 'Early activity');
    assert.equal(signal.guidance, 'Lower arrivals may require assisted sourcing. Use callback flow to verify availability before committing.');
  });

  it('should return Early activity for 0 arrivals', () => {
    const market = { ...baseMarket, total_arrivals: 0 } as MarketData;
    const signal = getMarketSignal(market);

    assert.equal(signal.label, 'Early activity');
  });
});
