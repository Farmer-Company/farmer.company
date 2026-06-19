import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getMarketSignal } from './marketSignals';
import type { MarketData } from '@/src/data/markets';

describe('getMarketSignal', () => {
  it('should return High activity signal when total_arrivals is >= 12000', () => {
    const market = { total_arrivals: 12000 } as MarketData;
    const result = getMarketSignal(market);

    assert.deepStrictEqual(result, {
      label: 'High activity',
      guidance: 'High arrivals volume. Use this as a discovery signal — live quote verification available through the ops desk.',
      source: 'Internal arrivals dataset',
      freshness: 'Beta dataset snapshot',
    });
  });

  it('should return Steady activity signal when total_arrivals is >= 4000 and < 12000', () => {
    const market = { total_arrivals: 4000 } as MarketData;
    const result = getMarketSignal(market);

    assert.deepStrictEqual(result, {
      label: 'Steady activity',
      guidance: 'Moderate arrivals indicate a workable trading window. Validate quantity and quality before outreach.',
      source: 'Internal arrivals dataset',
      freshness: 'Beta dataset snapshot',
    });

    const marketUpper = { total_arrivals: 11999 } as MarketData;
    const resultUpper = getMarketSignal(marketUpper);

    assert.strictEqual(resultUpper.label, 'Steady activity');
  });

  it('should return Early activity signal when total_arrivals is < 4000', () => {
    const market = { total_arrivals: 3999 } as MarketData;
    const result = getMarketSignal(market);

    assert.deepStrictEqual(result, {
      label: 'Early activity',
      guidance: 'Lower arrivals may require assisted sourcing. Use callback flow to verify availability before committing.',
      source: 'Internal arrivals dataset',
      freshness: 'Beta dataset snapshot',
    });

    const marketZero = { total_arrivals: 0 } as MarketData;
    const resultZero = getMarketSignal(marketZero);

    assert.strictEqual(resultZero.label, 'Early activity');
  });
});
