export interface WeatherData {
 temp: number;
 condition: string;
 location: string;
 icon: string;
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
 try {
 const weatherPromise = fetch(
 `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
 ).then((res) => res.json());

 const geoPromise = fetch(
 `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
 )
 .then((res) => res.json())
 .catch((e) => {
 console.warn('Reverse geocode failed:', e);
 return null;
 });

 const [data, geoData] = await Promise.all([weatherPromise, geoPromise]);

 let locationName = 'Local Region';
 if (geoData) {
 locationName = geoData.city || geoData.locality || geoData.principalSubdivision || 'Local Region';
 }
 
 // Simplistic condition mapping based on WMO code
 const getCondition = (code: number) => {
 if (code === 0) return 'Clear';
 if (code <= 3) return 'Partly Cloudy';
 if (code >= 45 && code <= 48) return 'Foggy';
 if (code >= 51 && code <= 67) return 'Rainy';
 if (code >= 71 && code <= 77) return 'Snowy';
 if (code >= 80 && code <= 82) return 'Showers';
 if (code >= 95) return 'Stormy';
 return 'Cloudy';
 };

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
