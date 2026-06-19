import test from 'node:test';
import assert from 'node:assert';
import { readLocalIntents } from './tradeIntents.js';

test('readLocalIntents', async (t) => {
  const originalWindow = (global as any).window;

  t.afterEach(() => {
    (global as any).window = originalWindow;
  });

  await t.test('returns empty array when window is undefined', () => {
    (global as any).window = undefined;
    assert.deepStrictEqual(readLocalIntents(), []);
  });

  await t.test('returns empty array when localStorage returns null (no item)', () => {
    (global as any).window = {
      localStorage: {
        getItem: () => null
      }
    };
    assert.deepStrictEqual(readLocalIntents(), []);
  });

  await t.test('returns empty array when localStorage contains invalid JSON', () => {
    (global as any).window = {
      localStorage: {
        getItem: () => '{invalid json}'
      }
    };
    assert.deepStrictEqual(readLocalIntents(), []);
  });

  await t.test('returns empty array when localStorage contains valid JSON but not an array', () => {
    (global as any).window = {
      localStorage: {
        getItem: () => '{"key": "value"}'
      }
    };
    assert.deepStrictEqual(readLocalIntents(), []);
  });

  await t.test('returns parsed array when localStorage contains valid JSON array', () => {
    const mockIntents = [{ id: '1', type: 'buy' }, { id: '2', type: 'sell' }];
    (global as any).window = {
      localStorage: {
        getItem: () => JSON.stringify(mockIntents)
      }
    };
    assert.deepStrictEqual(readLocalIntents(), mockIntents);
  });
});
