export interface WeatherData {
 temp: number;
 condition: string;
 location: string;
 icon: string;
}

// Simplistic condition mapping based on WMO code
export const getCondition = (code: number) => {
 if (code === 0) return 'Clear';
 if (code <= 3) return 'Partly Cloudy';
 if (code >= 45 && code <= 48) return 'Foggy';
 if (code >= 51 && code <= 67) return 'Rainy';
 if (code >= 71 && code <= 77) return 'Snowy';
 if (code >= 80 && code <= 82) return 'Showers';
 if (code >= 95) return 'Stormy';
 return 'Cloudy';
};

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
 try {
 const response = await fetch(
 `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
 );
 const data = await response.json();
 
 let locationName = 'Local Region';
 try {
 const geoResponse = await fetch(
 `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
 );
 const geoData = await geoResponse.json();
 locationName = geoData.city || geoData.locality || geoData.principalSubdivision || 'Local Region';
 } catch (e) {
 console.warn('Reverse geocode failed:', e);
 }

 return {
 temp: Math.round(data.current_weather.temperature),
 condition: getCondition(data.current_weather.weathercode),
 location: locationName,
 icon: data.current_weather.weathercode.toString()
 };
 } catch (error) {
 console.error('Weather fetch failed:', error);
 throw error;
 }
};
