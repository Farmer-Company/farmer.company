import React, { useEffect, useState } from 'react';
import { encodeDigipin } from '@/src/lib/digipin';
import { MapPin, Target, WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ACCURACY_LEVELS = [
  { length: 8, size: '200 km', useCase: 'Country-region routing' },
  { length: 10, size: '30 km', useCase: 'District / city zone' },
  { length: 12, size: '1 km', useCase: 'Industrial cluster / village' },
  { length: 14, size: '50 m', useCase: 'Building block / warehouse wing' },
  { length: 16, size: '1.5 m', useCase: 'Loading dock / pallet position' }
];

function getRecommendedLevel(accuracyMeters: number) {
  if (accuracyMeters <= 1.5) return ACCURACY_LEVELS[4];
  if (accuracyMeters <= 50) return ACCURACY_LEVELS[3];
  if (accuracyMeters <= 1000) return ACCURACY_LEVELS[2];
  if (accuracyMeters <= 30000) return ACCURACY_LEVELS[1];
  return ACCURACY_LEVELS[0];
}

export const LocationPanel = () => {
  const [locationData, setLocationData] = useState<{ 
    lat: number, 
    lon: number, 
    accuracy: number,
    address: string,
    isOffline: boolean
  } | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        
        let address = "Unknown Location";
        let isOffline = !navigator.onLine;
        
        if (!isOffline) {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&email=contact@farmer.company`);
            if (res.ok) {
              const data = await res.json();
              address = data.display_name || "Unknown Location";
            } else {
              isOffline = true;
              address = "Address unavailable (API Error)";
            }
          } catch (e) {
            console.error("Geocoding error:", e);
            isOffline = true;
            address = "Address unavailable (Offline)";
          }
        } else {
          address = "Address unavailable (Offline)";
        }
        
        setLocationData({ lat, lon, accuracy, address, isOffline });
      }, (err) => {
        console.error("Geolocation error:", err);
      }, {
        enableHighAccuracy: true, // Request best possible accuracy
        timeout: 10000,
        maximumAge: 0
      });
    }
  }, []);

  if (!locationData) return null;

  const level = getRecommendedLevel(locationData.accuracy);
  const pin = encodeDigipin(locationData.lat, locationData.lon, level.length);

  return (
    <div className="fixed top-20 right-4 lg:right-8 z-[100] flex flex-col items-end gap-2 pointer-events-auto">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 hover:border-primary/50 text-white/80 hover:text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors shadow-lg cursor-pointer"
      >
        <Target size={14} className="text-primary" />
        DIGIPIN Location
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="w-[320px] sm:w-[360px] bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col gap-4 text-white"
          >
            <div className="flex items-start gap-3 border-b border-white/10 pb-3">
              <div className="mt-1 bg-primary/20 p-2 rounded-full relative">
                <MapPin size={18} className="text-primary" />
                {locationData.isOffline && (
                  <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                    <WifiOff size={10} className="text-red-500" />
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-0.5">Detected Address</span>
                  {locationData.isOffline ? (
                     <span className="text-[9px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded flex items-center gap-1"><WifiOff size={8} /> Offline</span>
                  ) : (
                     <span className="text-[9px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded flex items-center gap-1"><Wifi size={8} /> Online</span>
                  )}
                </div>
                <span className="text-[13px] font-medium leading-tight">{locationData.address}</span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Coordinates</span>
                  <span className="text-[11px] text-white/70 font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                    {locationData.lat.toFixed(6)}, {locationData.lon.toFixed(6)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Generated DIGIPIN</span>
                <span className="text-[10px] text-white/40">GPS Accuracy: ±{locationData.accuracy.toFixed(1)}m</span>
              </div>
              
              <div className="bg-white/5 rounded-lg border border-white/10 p-3 flex flex-col gap-1">
                <div className="text-2xl font-mono text-primary font-medium tracking-widest">
                  {pin}
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-white/10 pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/40 uppercase">Precision</span>
                    <span className="text-xs text-white/70 font-medium">{level.size}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
