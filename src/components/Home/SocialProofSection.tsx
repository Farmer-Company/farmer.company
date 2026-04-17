import React, { useRef, useEffect, useCallback, useState } from 'react';
import { rtdb } from '@/src/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { useLanguage } from '@/src/lib/LanguageContext';
import { 
  Activity, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Zap, 
  Users, 
  ShoppingBag, 
  Truck, 
  Target 
} from 'lucide-react';

const FADE_DURATION = 0.6;

const LoopingVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    const { currentTime, duration } = video;
    let opacity = 1;
    if (currentTime < FADE_DURATION) {
      opacity = currentTime / FADE_DURATION;
    } else if (currentTime > duration - FADE_DURATION) {
      opacity = (duration - currentTime) / FADE_DURATION;
    }
    video.style.opacity = String(opacity);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = '0';

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      }, 120);
    };

    video.addEventListener('ended', handleEnded);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      video.removeEventListener('ended', handleEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  return (
    <video
      ref={videoRef}
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260308_114720_3dabeb9e-2c39-4907-b747-bc3544e2d5b7.mp4"
      autoPlay
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{ opacity: 0 }}
    />
  );
};

export const SocialProofSection = () => {
  const [tickerItems, setTickerItems] = useState<any[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    const tickerRef = ref(rtdb, '/live_ticker');
    return onValue(tickerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setTickerItems(Object.values(data));
      } else {
        setTickerItems(new Array(8).fill({
          commodity: 'TOMATO',
          market: 'CHENNAI',
          price: '18',
          change: '2.4',
          direction: 'up'
        }));
      }
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden noise-bg">
      <LoopingVideo />
      
      {/* Dynamic Scan Line effect for section transition */}
      <div className="absolute top-0 left-0 w-full h-px bg-primary/20" />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-[#050505]/40" />

      <div className="z-10 relative flex flex-col items-center pt-20 pb-40 px-6 gap-16">
        <div className="h-48 w-full" />

        {/* Command Center: Live Ticker */}
        <div className="w-full max-w-6xl mx-auto h-12 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center px-2 group hover:border-primary/30 transition-colors">
          <div className="shrink-0 px-4 flex items-center gap-2 border-r border-white/10 h-full py-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot shadow-[0_0_10px_var(--primary)]" />
            <span className="mono text-[10px] font-bold text-white uppercase tracking-widest">REAL-TIME FEED</span>
          </div>
          
          <div className="flex-1 overflow-hidden relative">
            <div className="flex gap-16 animate-marquee whitespace-nowrap">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <div key={i} className="mono text-[11px] text-white/60 flex items-center gap-3">
                  <span className="font-bold text-white">{item.commodity}</span>
                  <span className="text-white/30">{item.market}</span>
                  <span className="text-primary font-black">₹{item.price}</span>
                  <span className={item.direction === 'up' ? 'text-primary' : 'text-red-500'}>
                    {item.direction === 'up' ? '+' : '-'}{item.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Impact Grid */}
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 border-y border-white/5 py-12 gap-12 text-center md:text-left">
          <StatBox number="10,000+" label={t('farmersActive')} sub="Growth Protocol" />
          <StatBox number="3,200+" label={t('avgPrice')} isMono sub="Price Intelligence" />
          <StatBox number="418" label={t('cheaper')} sub="Commodities Tracked" />
          <StatBox number="85%" label={t('middlemen')} isPrimary sub="ForecastOS Accuracy" />
        </div>

        {/* Ecosystem Grid: Players */}
        <div className="w-full max-w-7xl mx-auto mt-20 text-center">
          <div className="space-y-4 mb-20 max-w-2xl mx-auto">
            <span className="mono text-[10px] text-primary font-bold uppercase tracking-[6px]">Stakeholder Access</span>
            <h2 className="display text-6xl font-black text-white uppercase tracking-tighter leading-none">
              A Direct Ecosystem.
            </h2>
            <p className="text-foreground-muted text-lg font-light">Digital Orchard connects every node in the agricultural chain with zero-latency transparency.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            <PlayerCard
              role="FARMER"
              tamil="விவசாயிகள்"
              icon={<Users size={24} />}
              body="Build your lifetime portfolio – every harvest gets a unique SKU. Get price forecasts and sell directly to buyers."
            />
            <PlayerCard
              role="VENDOR"
              tamil="விற்பனையாளர்கள்"
              icon={<ShoppingBag size={24} />}
              body="Source verified produce with full traceability. Use CRM to manage repeat orders and price intelligence to save 15‑30%."
            />
            <PlayerCard
              role="LOGISTICS"
              tamil="தளவாட பங்காளர்கள்"
              icon={<Truck size={24} />}
              body="Price‑aware route optimisation reduces empty trips. Match with guaranteed volumes from the marketplace."
            />
            <PlayerCard
              role="RESEARCHER"
              tamil="ஆராய்ச்சியாளர்கள்"
              icon={<Target size={24} />}
              body="Analyse policy impact, MSP compliance, and market clusters using 25 years of clean data."
            />
          </div>
        </div>

        {/* Prosperity Bento Grid */}
        <div className="w-full max-w-[1400px] mx-auto mt-40 border-t border-white/5 pt-32">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
            <div className="space-y-4">
              <span className="text-primary font-black text-xs uppercase tracking-[5px]">Performance Protocol</span>
              <h2 className="display text-7xl font-black uppercase tracking-tighter text-white leading-[0.85]">Orchard<br />Metrics</h2>
            </div>
            <p className="max-w-md text-foreground-muted leading-relaxed font-light text-xl">
              Our operating system ensures every harvest is verified, every payment is instant, and every route is optimized.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
            <div className="col-span-1 md:col-span-3 row-span-1 bg-[#050505] p-12 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-sm"><Zap fill="currentColor" size={20} /></div>
                <span className="mono text-[10px] text-white/20">PRICE-OS</span>
              </div>
              <div className="mt-12 space-y-4">
                <h3 className="mono text-4xl font-black text-white">3,200+</h3>
                <p className="text-sm text-foreground-muted uppercase tracking-widest font-bold">Markets Tracked</p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3 row-span-1 bg-[#050505] p-12 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-sm"><ShieldCheck size={20} /></div>
                <span className="mono text-[10px] text-white/20">FORECAST-OS</span>
              </div>
              <div className="mt-12 space-y-4">
                <h3 className="mono text-4xl font-black text-white">85% Accuracy</h3>
                <p className="text-sm text-foreground-muted uppercase tracking-widest font-bold">30-Day Predictions</p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 row-span-1 bg-[#050505] p-12 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
               <div className="flex justify-between items-start">
                <div className="p-3 bg-primary/10 text-primary rounded-sm"><Activity size={20} /></div>
                <span className="mono text-[10px] text-white/20">RISK-OS</span>
              </div>
              <div className="mt-12">
                <h3 className="mono text-3xl font-black text-white">10,000+</h3>
                <p className="text-[10px] text-foreground-muted uppercase tracking-widest font-bold mt-2">Active Portfolios</p>
              </div>
            </div>

            <div className="col-span-1 md:col-span-4 row-span-1 bg-primary p-12 flex flex-col justify-between text-black">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-black text-primary rounded-sm"><MapPin size={20} /></div>
                <span className="mono text-[10px] font-bold opacity-40">VALUE-GAIN</span>
              </div>
              <div className="mt-12 flex justify-between items-end">
                <div>
                  <h3 className="display text-6xl font-black uppercase leading-none mt-4">15-20%<br />Price Jump</h3>
                </div>
                <ArrowRight size={48} strokeWidth={3} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const StatBox = ({ number, label, isMono, isPrimary, sub }: any) => (
  <div className="flex flex-col gap-2 p-6">
    <span className={`${isMono ? 'mono' : 'display'} text-6xl font-black ${isPrimary ? 'text-primary' : 'text-white'} tracking-tighter leading-none`}>
      {number}
    </span>
    <div className="space-y-1">
      <p className="text-[10px] font-black text-foreground-muted uppercase tracking-[3px]">{label}</p>
      <p className="text-[9px] text-white/20 uppercase tracking-[1px]">{sub}</p>
    </div>
  </div>
);

const PlayerCard = ({ role, tamil, icon, body }: any) => (
  <div className="bg-[#050505] p-12 flex flex-col gap-8 text-left group transition-all duration-500 hover:bg-[#0A0A0A] relative border-white/5 border overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-px bg-white/5 group-hover:bg-primary/20 transition-colors" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="absolute -inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </div>
    
    <div className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center text-white/5 group-hover:text-primary/20 transition-colors">
      <ArrowRight size={24} />
    </div>

    <div className="space-y-6">
      <div className="w-14 h-14 border border-white/10 flex items-center justify-center text-white group-hover:text-primary group-hover:border-primary/50 transition-all duration-500">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{role}</h3>
        <p className="text-[10px] font-bold text-primary opacity-60 uppercase tracking-[4px] mt-2">{tamil}</p>
      </div>
    </div>

    <p className="text-sm font-light text-foreground-muted leading-relaxed max-w-xs">
      {body}
    </p>

    <div className="pt-8 block">
      <button className="text-[10px] font-black text-white uppercase tracking-[4px] border-b border-primary/40 pb-1 hover:border-primary hover:text-primary transition-all">
        PROTOCOL ACCESS
      </button>
    </div>
  </div>
);

const PARTNERS = [
  { name: 'KISAN-FPO' },
  { name: 'TAMIL-AGRI' },
  { name: 'FARMLINK' },
  { name: 'HARVEST-NET' },
  { name: 'GREEN-ROUTE' },
  { name: 'CROP-DIRECT' },
  { name: 'FIELD-BRIDGE' },
  { name: 'ORCHARD-HUB' },
];
