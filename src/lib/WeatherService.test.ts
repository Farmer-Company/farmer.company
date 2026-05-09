import { describe, it, mock, afterEach } from 'node:test';
import assert from 'node:assert';
import { fetchWeather } from './WeatherService';

describe('WeatherService', () => {
  const originalFetch = global.fetch;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  afterEach(() => {
    global.fetch = originalFetch;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  it('successfully fetches weather and location data', async () => {
    const mockWeatherResponse = {
      json: async () => ({
        current_weather: {
          temperature: 25.4,
          weathercode: 0,
        },
      }),
    };

    const mockGeoResponse = {
      json: async () => ({
        city: 'Mock City',
      }),
    };

    global.fetch = mock.fn(async (url: string | URL | Request) => {
      const urlString = url.toString();
      if (urlString.includes('api.open-meteo.com')) {
        return mockWeatherResponse as unknown as Response;
      }
      if (urlString.includes('api.bigdatacloud.net')) {
        return mockGeoResponse as unknown as Response;
      }
      throw new Error(`Unexpected fetch call: ${urlString}`);
    });

    const result = await fetchWeather(40.7128, -74.0060);

    assert.deepStrictEqual(result, {
      temp: 25,
      condition: 'Clear',
      location: 'Mock City',
      icon: '0',
    });
  });

  it('handles reverse geocode failure gracefully', async () => {
    // Suppress console.warn for this test
    console.warn = mock.fn();

    const mockWeatherResponse = {
      json: async () => ({
        current_weather: {
          temperature: 15.2,
          weathercode: 51,
        },
      }),
    };

    global.fetch = mock.fn(async (url: string | URL | Request) => {
      const urlString = url.toString();
      if (urlString.includes('api.open-meteo.com')) {
        return mockWeatherResponse as unknown as Response;
      }
      if (urlString.includes('api.bigdatacloud.net')) {
        throw new Error('Network failure during geocoding');
      }
      throw new Error(`Unexpected fetch call: ${urlString}`);
    });

    const result = await fetchWeather(51.5074, -0.1278);

    assert.deepStrictEqual(result, {
      temp: 15,
      condition: 'Rainy',
      location: 'Local Region',
      icon: '51',
    });

    // Ensure console.warn was called
    assert.strictEqual((console.warn as any).mock.calls.length > 0, true);
  });

  it('throws error when main weather fetch fails', async () => {
    // Suppress console.error for this test
    console.error = mock.fn();

    const networkError = new Error('Main weather API is down');
    global.fetch = mock.fn(async () => {
      throw networkError;
    });

    await assert.rejects(
      async () => await fetchWeather(34.0522, -118.2437),
      (err) => {
        assert.strictEqual(err, networkError);
        return true;
      }
    );

    // Verify console.error was called with the correct arguments
    const calls = (console.error as any).mock.calls;
    assert.strictEqual(calls.length, 1);
    assert.strictEqual(calls[0].arguments[0], 'Weather fetch failed:');
    assert.strictEqual(calls[0].arguments[1], networkError);
  });
});
