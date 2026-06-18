import { test, describe, afterEach, beforeEach } from 'node:test';
import assert from 'node:assert';
import { fetchWeather } from './WeatherService.js';

describe('WeatherService', () => {
  const originalFetch = global.fetch;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  afterEach(() => {
    global.fetch = originalFetch;
    console.warn = originalConsoleWarn;
    console.error = originalConsoleError;
  });

  test('should return default location when reverse geocoding API throws an error', async () => {
    let warnMessage = '';
    console.warn = (msg, err) => {
      warnMessage = msg;
    };

    global.fetch = async (url) => {
      const urlString = url.toString();
      if (urlString.includes('api.open-meteo.com')) {
        return {
          json: async () => ({
            current_weather: {
              temperature: 20.5,
              weathercode: 0,
            },
          }),
        } as any;
      }
      if (urlString.includes('api.bigdatacloud.net')) {
        throw new Error('Network error');
      }
      throw new Error(`Unexpected fetch call to ${urlString}`);
    };

    const weather = await fetchWeather(40.7128, -74.006);

    assert.strictEqual(weather.temp, 21);
    assert.strictEqual(weather.condition, 'Clear');
    assert.strictEqual(weather.location, 'Local Region');
    assert.strictEqual(weather.icon, '0');
    assert.strictEqual(warnMessage, 'Reverse geocode failed:');
  });

  test('should handle success from both APIs', async () => {
    global.fetch = async (url) => {
      const urlString = url.toString();
      if (urlString.includes('api.open-meteo.com')) {
        return {
          json: async () => ({
            current_weather: {
              temperature: 20.5,
              weathercode: 55, // Rainy
            },
          }),
        } as any;
      }
      if (urlString.includes('api.bigdatacloud.net')) {
        return {
          json: async () => ({
            city: 'New York City',
          }),
        } as any;
      }
      throw new Error(`Unexpected fetch call to ${urlString}`);
    };

    const weather = await fetchWeather(40.7128, -74.006);

    assert.strictEqual(weather.temp, 21);
    assert.strictEqual(weather.condition, 'Rainy');
    assert.strictEqual(weather.location, 'New York City');
    assert.strictEqual(weather.icon, '55');
  });

  test('should throw error when weather API fails', async () => {
    let errorLogged = false;
    console.error = () => {
      errorLogged = true;
    };

    global.fetch = async (url) => {
      const urlString = url.toString();
      if (urlString.includes('api.open-meteo.com')) {
        throw new Error('Weather API error');
      }
      throw new Error(`Unexpected fetch call to ${urlString}`);
    };

    try {
      await fetchWeather(40.7128, -74.006);
      assert.fail('Should have thrown an error');
    } catch (err: any) {
      assert.strictEqual(err.message, 'Weather API error');
    }
    assert.strictEqual(errorLogged, true);
  });
});
