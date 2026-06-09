import test from 'node:test';
import assert from 'node:assert';
import { getMarketSignal } from './marketSignals';
import type { MarketData } from '@/src/data/markets';

// Helper to create a mock MarketData object with a specific total_arrivals value
const createMockMarket = (total_arrivals: number): MarketData => ({
  node_id: 1,
  State: 'Test State',
  District: 'Test District',
  Market: 'Test Market',
  total_arrivals,
  unique_commodities: 5,
  node_tier: 'Tier 1'
});

test('getMarketSignal', async (t) => {
  await t.test('returns High activity signal for total_arrivals >= 12000', () => {
    // Exact boundary
    const signal12000 = getMarketSignal(createMockMarket(12000));
    assert.strictEqual(signal12000.label, 'High activity');
    assert.ok(signal12000.guidance.includes('High arrivals volume'));

    // Above boundary
    const signal15000 = getMarketSignal(createMockMarket(15000));
    assert.strictEqual(signal15000.label, 'High activity');
  });

  await t.test('returns Steady activity signal for total_arrivals between 4000 and 11999', () => {
    // Just below High activity boundary
    const signal11999 = getMarketSignal(createMockMarket(11999));
    assert.strictEqual(signal11999.label, 'Steady activity');
    assert.ok(signal11999.guidance.includes('Moderate arrivals'));

    // Steady activity boundary
    const signal4000 = getMarketSignal(createMockMarket(4000));
    assert.strictEqual(signal4000.label, 'Steady activity');

    // Middle of the range
    const signal8000 = getMarketSignal(createMockMarket(8000));
    assert.strictEqual(signal8000.label, 'Steady activity');
  });

  await t.test('returns Early activity signal for total_arrivals < 4000', () => {
    // Just below Steady activity boundary
    const signal3999 = getMarketSignal(createMockMarket(3999));
    assert.strictEqual(signal3999.label, 'Early activity');
    assert.ok(signal3999.guidance.includes('Lower arrivals'));

    // Well below
    const signal1000 = getMarketSignal(createMockMarket(1000));
    assert.strictEqual(signal1000.label, 'Early activity');

    // Zero
    const signal0 = getMarketSignal(createMockMarket(0));
    assert.strictEqual(signal0.label, 'Early activity');
  });
});
