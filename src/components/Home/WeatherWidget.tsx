import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchWeather, WeatherData } from '@/src/lib/WeatherService';
import { Cloud, Sun, CloudRain, CloudLightning, Loader2, Thermometer } from 'lucide-react';

export const WeatherWidget = () => {
 const [weather, setWeather] = useState<WeatherData | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(false);

 useEffect(() => {
 if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(
 async (position) => {
 try {
 const data = await fetchWeather(position.coords.latitude, position.coords.longitude);
 setWeather(data);
 } catch {
 setError(true);
 } finally {
 setLoading(false);
 }
 },
 () => {
 setLoading(false);
 setError(true);
 }
 );
 } else {
 setLoading(false);
 }
 }, []);

 if (loading) return (
 <div className="flex items-center gap-3 px-6 py-4 border border-white/5 bg-white/[0.02] rounded-sm">
 <Loader2 className="animate-spin text-primary/40" size={16} />
 <span className="mono text-[10px] text-white/20 normal-case ">Scanning local atmosphere...</span>
 </div>
 );

 if (error || !weather) return null;

 return (
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 className="flex items-center gap-6 px-8 py-6 border border-white/10 bg-[#0A0A0A] relative overflow-hidden group hover:border-primary/40 transition-colors"
 >
 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition-colors" />
 
 <div className="flex flex-col gap-1">
 <span className="mono text-[10px] text-primary font-medium normal-case ">Atmosphere Node</span>
 <div className="flex items-center gap-2">
 <WeatherIcon condition={weather.condition} />
 <span className="display text-3xl font-light text-white">{weather.temp}°C</span>
 </div>
 </div>

 <div className="w-px h-10 bg-white/5" />

 <div className="flex flex-col gap-0.5">
 <span className="mono text-[9px] text-white/30 normal-case ">{weather.location}</span>
 <span className="display text-sm font-medium text-white normal-case tracking-tight italic">{weather.condition}</span>
 </div>

 <div className="ml-4">
 <Thermometer className="text-white/10 group-hover:text-primary/20 transition-colors" size={32} />
 </div>
 </motion.div>
 );
};

const WeatherIcon = ({ condition }: { condition: string }) => {
 const cond = condition.toLowerCase();
 if (cond.includes('clear')) return <Sun size={20} className="text-yellow-500" />;
 if (cond.includes('rain')) return <CloudRain size={20} className="text-blue-500" />;
 if (cond.includes('storm')) return <CloudLightning size={20} className="text-primary" />;
 return <Cloud size={20} className="text-white/40" />;
};
