import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { getSavedTradeIntents } from './tradeIntents.js';

describe('getSavedTradeIntents', () => {
    let originalWindow: any;

    beforeEach(() => {
        originalWindow = global.window;
    });

    afterEach(() => {
        global.window = originalWindow;
    });

    test('returns empty array when window is undefined', () => {
        // Just in case it was set
        const temp = global.window;
        delete (global as any).window;
        assert.deepEqual(getSavedTradeIntents(), []);
        global.window = temp;
    });

    test('returns empty array when localStorage returns null', () => {
        let calledWithKey = '';
        (global as any).window = {
            localStorage: {
                getItem: (key: string) => {
                    calledWithKey = key;
                    return null;
                }
            }
        };
        assert.deepEqual(getSavedTradeIntents(), []);
        assert.equal(calledWithKey, 'farmer-company-trade-intents');
    });

    test('returns empty array when JSON.parse throws', () => {
        (global as any).window = {
            localStorage: {
                getItem: (key: string) => 'invalid json'
            }
        };
        assert.deepEqual(getSavedTradeIntents(), []);
    });

    test('returns empty array when parsed value is not an array', () => {
        (global as any).window = {
            localStorage: {
                getItem: (key: string) => JSON.stringify({ a: 1 })
            }
        };
        assert.deepEqual(getSavedTradeIntents(), []);
    });

    test('returns parsed array when valid array is stored', () => {
        const intents = [{ id: '1', type: 'buy' }];
        (global as any).window = {
            localStorage: {
                getItem: (key: string) => JSON.stringify(intents)
            }
        };
        assert.deepEqual(getSavedTradeIntents(), intents);
    });
});
