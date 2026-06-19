import test, { describe, it, mock } from 'node:test';
import assert from 'node:assert';
import { getCondition, fetchWeather } from '../WeatherService';

describe('WeatherService', () => {
  describe('getCondition', () => {
    it('returns Clear for code 0', () => {
      assert.strictEqual(getCondition(0), 'Clear');
    });

    it('returns Partly Cloudy for codes 1 to 3', () => {
      assert.strictEqual(getCondition(1), 'Partly Cloudy');
      assert.strictEqual(getCondition(2), 'Partly Cloudy');
      assert.strictEqual(getCondition(3), 'Partly Cloudy');
      assert.strictEqual(getCondition(-1), 'Partly Cloudy'); // Based on logic code <= 3
    });

    it('returns Foggy for codes 45 to 48', () => {
      assert.strictEqual(getCondition(45), 'Foggy');
      assert.strictEqual(getCondition(46), 'Foggy');
      assert.strictEqual(getCondition(48), 'Foggy');
    });

    it('returns Rainy for codes 51 to 67', () => {
      assert.strictEqual(getCondition(51), 'Rainy');
      assert.strictEqual(getCondition(60), 'Rainy');
      assert.strictEqual(getCondition(67), 'Rainy');
    });

    it('returns Snowy for codes 71 to 77', () => {
      assert.strictEqual(getCondition(71), 'Snowy');
      assert.strictEqual(getCondition(75), 'Snowy');
      assert.strictEqual(getCondition(77), 'Snowy');
    });

    it('returns Showers for codes 80 to 82', () => {
      assert.strictEqual(getCondition(80), 'Showers');
      assert.strictEqual(getCondition(81), 'Showers');
      assert.strictEqual(getCondition(82), 'Showers');
    });

    it('returns Stormy for codes >= 95', () => {
      assert.strictEqual(getCondition(95), 'Stormy');
      assert.strictEqual(getCondition(96), 'Stormy');
      assert.strictEqual(getCondition(100), 'Stormy');
    });

    it('returns Cloudy for unknown or unmapped codes', () => {
      assert.strictEqual(getCondition(4), 'Cloudy');
      assert.strictEqual(getCondition(44), 'Cloudy');
      assert.strictEqual(getCondition(49), 'Cloudy');
      assert.strictEqual(getCondition(50), 'Cloudy');
      assert.strictEqual(getCondition(68), 'Cloudy');
      assert.strictEqual(getCondition(70), 'Cloudy');
      assert.strictEqual(getCondition(78), 'Cloudy');
      assert.strictEqual(getCondition(79), 'Cloudy');
      assert.strictEqual(getCondition(83), 'Cloudy');
      assert.strictEqual(getCondition(94), 'Cloudy');
    });
  });

  describe('fetchWeather', () => {
    let originalFetch: typeof global.fetch;

    test.beforeEach(() => {
      originalFetch = global.fetch;
    });

    test.afterEach(() => {
      global.fetch = originalFetch;
    });

    it('fetches weather and falls back to Local Region when reverse geocoding fails', async () => {
      global.fetch = mock.fn(async (url: string | URL | globalThis.Request) => {
        const urlStr = url.toString();
        if (urlStr.includes('api.open-meteo.com')) {
          return {
            json: async () => ({
              current_weather: {
                temperature: 20.4,
                weathercode: 0,
              },
            }),
          } as Response;
        }
        if (urlStr.includes('api.bigdatacloud.net')) {
          throw new Error('Network error');
        }
        throw new Error('Unexpected URL');
      });

      const data = await fetchWeather(52.52, 13.41);

      assert.strictEqual(data.temp, 20);
      assert.strictEqual(data.condition, 'Clear');
      assert.strictEqual(data.location, 'Local Region');
      assert.strictEqual(data.icon, '0');
    });

    it('fetches weather and uses reverse geocoding city', async () => {
      global.fetch = mock.fn(async (url: string | URL | globalThis.Request) => {
        const urlStr = url.toString();
        if (urlStr.includes('api.open-meteo.com')) {
          return {
            json: async () => ({
              current_weather: {
                temperature: 15.6,
                weathercode: 45,
              },
            }),
          } as Response;
        }
        if (urlStr.includes('api.bigdatacloud.net')) {
          return {
            json: async () => ({
              city: 'Berlin',
            }),
          } as Response;
        }
        throw new Error('Unexpected URL');
      });

      const data = await fetchWeather(52.52, 13.41);

      assert.strictEqual(data.temp, 16);
      assert.strictEqual(data.condition, 'Foggy');
      assert.strictEqual(data.location, 'Berlin');
      assert.strictEqual(data.icon, '45');
    });

    it('throws error when open-meteo fails', async () => {
      global.fetch = mock.fn(async () => {
        throw new Error('API failed');
      });

      await assert.rejects(
        () => fetchWeather(52.52, 13.41),
        (err: Error) => {
          assert.strictEqual(err.message, 'API failed');
          return true;
        }
      );
    });
  });
});
