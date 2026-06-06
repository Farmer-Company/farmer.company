import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Clipboard, ExternalLink, Layers3, MapPin, Target, Wifi, WifiOff } from 'lucide-react';
import {
  buildDigipinRepresentations,
  encodeDigipin,
  formatCellSize,
  formatDigipin,
  getRecommendedDigipinLevel,
} from '@/src/lib/digipin';

type LocationData = {
  lat: number;
  lon: number;
  accuracy: number;
  address: string;
  isOffline: boolean;
};

export const LocationPanel = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      let address = 'Unknown location';
      let isOffline = !navigator.onLine;

      if (!isOffline) {
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&email=contact@farmer.company`);
          if (res.ok) {
            const data = await res.json();
            address = data.display_name || 'Unknown location';
          } else {
            isOffline = true;
            address = 'Address unavailable';
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          isOffline = true;
          address = 'Address unavailable offline';
        }
      } else {
        address = 'Address unavailable offline';
      }

      setLocationData({ lat, lon, accuracy, address, isOffline });
    }, (error) => {
      console.error('Geolocation error:', error);
    }, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, []);

  if (!locationData) return null;

  const level = getRecommendedDigipinLevel(locationData.accuracy);
  const rawPin = encodeDigipin(locationData.lat, locationData.lon, level.length);
  const formattedPin = formatDigipin(rawPin);
  const ladder = buildDigipinRepresentations(locationData.lat, locationData.lon);
  const cellSize = formatCellSize(level.length, locationData.lat);

  const copyPin = async () => {
    await navigator.clipboard.writeText(formattedPin);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

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
            className="w-[330px] sm:w-[390px] bg-black/[0.92] backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl flex flex-col gap-4 text-white"
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

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold mb-0.5">Detected Address</span>
                  {locationData.isOffline ? (
                    <span className="text-[9px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0"><WifiOff size={8} /> Offline</span>
                  ) : (
                    <span className="text-[9px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0"><Wifi size={8} /> Online</span>
                  )}
                </div>
                <span className="text-[13px] font-medium leading-tight line-clamp-2">{locationData.address}</span>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">Coordinates</span>
                  <span className="text-[11px] text-white/70 font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                    {locationData.lat.toFixed(6)}, {locationData.lon.toFixed(6)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg border border-white/10 p-4 flex flex-col gap-3">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Recommended DIGIPIN</span>
                  <div className="text-[26px] leading-none font-mono text-primary font-medium tracking-[0.16em] mt-2 break-all">
                    {formattedPin}
                  </div>
                </div>
                <button
                  onClick={copyPin}
                  className="h-9 px-3 rounded-md bg-black/50 border border-white/10 hover:border-primary/40 text-white/70 hover:text-white transition-colors flex items-center gap-2 text-[11px]"
                >
                  {copied ? <CheckCircle2 size={14} className="text-primary" /> : <Clipboard size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
                <InfoCell label="Level" value={`${level.length} chars`} />
                <InfoCell label="Cell" value={cellSize} />
                <InfoCell label="GPS" value={`+/-${locationData.accuracy.toFixed(1)}m`} />
              </div>

              <p className="text-[11px] text-white/45 leading-relaxed">
                {level.label}: {level.useCase}. Use the grouped code for human sharing and the raw code for API storage.
              </p>
            </div>

            <div className="border border-white/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <Layers3 size={14} className="text-primary" />
                <span className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Precision ladder</span>
              </div>
              <div className="space-y-2">
                {ladder.map((item) => {
                  const active = item.length === level.length;
                  return (
                    <div key={item.length} className={`grid grid-cols-[54px_1fr_auto] gap-2 items-center text-[10px] rounded-md px-2 py-1.5 ${active ? 'bg-primary/10 text-white' : 'text-white/42'}`}>
                      <span className={active ? 'text-primary font-semibold' : ''}>{item.length} chars</span>
                      <span className="font-mono truncate">{item.formatted}</span>
                      <span>{item.cellSize}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              to="/digipin"
              className="flex items-center justify-between border border-primary/20 bg-primary/[0.04] hover:bg-primary/[0.08] text-white px-4 py-3 rounded-lg transition-colors"
            >
              <span className="text-sm font-medium">How to use DIGIPIN</span>
              <ExternalLink size={15} className="text-primary" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoCell = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0">
    <span className="text-[9px] text-white/35 uppercase tracking-widest block">{label}</span>
    <span className="text-[11px] text-white/75 font-mono leading-tight block mt-1">{value}</span>
  </div>
);
