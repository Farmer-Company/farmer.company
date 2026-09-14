import React, { useRef, useEffect, useCallback, useState } from 'react';
import { rtdb } from '@/src/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';
import { 
 Activity, 
 ShieldCheck, 
 MapPin, 
 ArrowRight, 
 Zap, 
 Users, 
 ShoppingBag, 
 Building2,
 Truck, 
 Target,
 Globe,
 Sprout
} from 'lucide-react';

const FADE_DURATION = 0.6;

const LoopingVideo = () => {
 const videoRef = useRef<HTMLVideoElement>(null);
 const rafRef = useRef<number>(0);

 const tick = useCallback(function tick() {
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
 className="absolute inset-0 w-full h-full object-cover opacity-0"
 />
 );
};

export const SocialProofSection = () => {
 const [tickerItems, setTickerItems] = useState<any[]>([]);

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

 <div className="z-10 relative flex flex-col items-center pt-10 md:pt-20 pb-20 md:pb-40 px-6 gap-10 md:gap-16">
 <div className="h-20 md:h-48 w-full" />

 {/* Command Center: Live Ticker */}
 <div className="w-full max-w-6xl mx-auto h-12 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center px-2 group hover:border-primary/30 transition-colors">
 <div className="shrink-0 px-3 md:px-4 flex items-center gap-2 border-r border-white/10 h-full py-2">
 <div className="w-2 h-2 rounded-full bg-primary animate-pulse-dot shadow-[0_0_10px_var(--primary)]" />
 <span className="mono text-[8px] md:text-[10px] font-medium text-white normal-case ">LIVE FEED</span>
 </div>
 
 <div className="flex-1 overflow-hidden relative">
 <div className="flex gap-10 md:gap-16 animate-marquee whitespace-nowrap">
 {[...tickerItems, ...tickerItems].map((item, i) => (
 <div key={i} className="mono text-[10px] md:text-[11px] text-white/60 flex items-center gap-2 md:gap-3">
 <span className="font-medium text-white">{item.commodity}</span>
 <span className="text-white/30 hidden sm:inline">{item.market}</span>
 <span className="text-primary font-medium">₹{item.price}</span>
 <span className={item.direction === 'up' ? 'text-primary' : 'text-red-500'}>
 {item.direction === 'up' ? '↑' : '↓'}{item.change}%
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Global Impact Grid */}
 <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-12 border-y border-white/5 py-8 md:py-12">
 {/* Row 1 */}
 <div className="bg-primary/[0.02] border border-primary/10 rounded-2xl p-6 md:p-8">
 <p className="mono text-[10px] text-primary font-medium normal-case mb-6 px-4 flex items-center gap-2">
  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> BETA INFRASTRUCTURE — LIVE NOW
 </p>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center md:text-left">
 <StatBox number="6,944" label="Markets Mapped (Click to view)" sub="" link="/market" />
 <StatBox number="250+" label="Commodities Tracked" isMono sub="" />
 <StatBox number="Tamil Nadu" label="Active Pilot Region" sub="" />
 <StatBox number="Alpha" label="Current Build Stage" isPrimary sub="" />
 </div>
 </div>
 {/* Row 2 */}
 <div className="opacity-60 border border-dashed border-white/10 rounded-2xl p-6 md:p-8 relative bg-white/[0.01]">
 <p className="mono text-[10px] text-foreground-muted font-medium normal-case mb-6 px-4">BUILDING TOWARD — ROADMAP</p>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center md:text-left">
 <StatBox number="85%" label="Target Forecast Accuracy" sub="" />
 <StatBox number="Real-time" label="Verified Quote Integration" isMono sub="" />
 <StatBox number="Farmer SKU" label="Portfolio System" sub="" />
 <StatBox number="₹ Live" label="Price Feed Active" isPrimary sub="" />
 </div>
 <p className="text-[10px] text-foreground-muted mt-6 px-4 italic">*Roadmap metrics are targets, not current actuals.</p>
 </div>
 </div>

 {/* Ecosystem Grid: Players */}
 <div className="w-full max-w-7xl mx-auto mt-10 md:mt-20 text-center">
 <div className="space-y-4 mb-12 md:mb-20 max-w-2xl mx-auto">
 <span className="mono text-[9px] md:text-[10px] text-primary font-medium normal-case md:">Stakeholder Access</span>
 <h2 className="text-[34px] md:text-[56px] font-semibold text-white tracking-[-0.02em] leading-none">
 A Direct Food & FMCG Ecosystem.
 </h2>
 <p className="text-foreground-muted text-[17px] font-normal px-4 leading-[1.47]">Digital Orchard connects every node in the agricultural chain with zero-latency transparency.</p>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-1">
 <PlayerCard
 role="FARMER"
    link="/farmers"
 tamil="விவசாயிகள்"
 icon={<Users size={24} />}
 body="Know what to grow before you plant. List your harvest, set your price, and sell directly to verified buyers—FMCG, retailers, exporters—without commission agents in the middle."
 />
 <PlayerCard
 role="VENDOR"
    link="/vendors"
 tamil="விற்பனையாளர்கள்"
 icon={<ShoppingBag size={24} />}
 body="Source verified, traceable produce directly from farms. Use the Supply CRM to manage repeat orders and price intelligence to eliminate opaque procurement markups."
 />
 <PlayerCard
 role="RETAILERS"
    link="/retailers"
 tamil="Retailers & MSMEs"
 icon={<Building2 size={24} />}
 body="For kirana stores, supermarkets, restaurants, processors and Instacart Business-style buyers: source bulk farm supply, schedule repeat orders, and manage invoices."
 />
 <PlayerCard
 role="LOGISTICS"
    link="/logistics"
 tamil="தளவாட பங்காளர்கள்"
 icon={<Truck size={24} />}
 body="Guaranteed transaction volumes. Price-aware route optimisation. Match with farm, warehouse and retail pickups before they’re dispatched—zero empty miles, predictable revenue."
 />
 <PlayerCard
 role="RESEARCHER"
 tamil="ஆராய்ச்சியாளர்கள்"
 icon={<Target size={24} />}
 body="Analyse MSP compliance, policy impact, market clusters and FMCG supply chains using the largest clean agricultural dataset in India, with district-level granularity and 25+ years of arrivals data."
 />
 <PlayerCard
 role="FMCG & ENTERPRISE BUYERS"
    link="/customers"
 tamil="உலகளாவிய வாங்குபவர்"
 icon={<Globe size={24} />}
 body="Source directly from verified Indian farms and processors. Institutional offtake contracts, compliance, and letters of credit - all inside one protocol that unifies data from field to shelf."
 />
 </div>
 </div>

 
  {/* AgriOS Intelligence Layer */}
  <div className="w-full max-w-[1400px] mx-auto mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#050505] border border-primary/20 p-8 md:p-16 relative overflow-hidden group">
    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    <div className="space-y-8 text-left relative z-10">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 text-primary rounded-sm"><Sprout size={24} /></div>
        <span className="mono text-[10px] text-primary font-medium normal-case">NEW MODULE</span>
      </div>
      <h2 className="text-[34px] md:text-[40px] font-semibold text-white tracking-[-0.02em] leading-[1.1]">
        AgriOS Intelligence.<br />
        Clean-input scoring for global food & FMCG.
      </h2>
      <div className="space-y-4 text-foreground-muted text-[17px] font-normal leading-[1.47]">
        <p>We’re integrating AI for low-pesticide agriculture to build a Farm Intelligence Score that can travel across borders, labels and brands.</p>
        <ul className="space-y-4 mt-4">
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">✓</span>
            <div>
              <strong className="text-white block">Pest & Weed Detection Engine</strong>
              <span className="text-sm">Identify threats via smartphone camera; use spot treatments instead of blanket sprays.</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">✓</span>
            <div>
              <strong className="text-white block">Input Optimization Dashboard</strong>
              <span className="text-sm">Benchmark fertilizer and pesticide use to qualify for premium FMCG and export pricing.</span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary mt-1">✓</span>
            <div>
              <strong className="text-white block">Surplus-to-Biocontrol Loop</strong>
              <span className="text-sm">Route unsold organic matter to biocontrol and composting partners instead of landfills.</span>
            </div>
          </li>
        </ul>
      </div>
      <div className="pt-4 border-t border-white/10">
        <p className="text-[14px] text-white/80 font-medium">Earn a 15–25% premium for certified clean crops—anchored in verifiable field data that FMCG brands and regulators can trust.</p>
      </div>
    </div>
    <div className="relative h-full min-h-[300px] md:min-h-[500px] bg-[#021f0d] flex items-center justify-center border border-white/5 rounded-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
      <div className="w-[200px] h-[200px] rounded-full bg-primary/10 blur-[60px]" />
      <p className="text-white/40 mono text-sm px-8 text-center relative z-10">[AI Computer Vision Target — Live Crop Feed]</p>
    </div>
  </div>

  {/* Built From The Field */}
 <div className="w-full max-w-[1400px] mx-auto mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-[#050505] border border-white/5 p-8 md:p-16">
 <div className="space-y-8 text-left">
 <h2 className="text-[34px] md:text-[40px] font-semibold text-white tracking-[-0.02em] leading-[1.1]">
 Built by traders,<br />not technologists.
 </h2>
 <div className="space-y-4 text-foreground-muted text-[17px] font-normal leading-[1.47]">
 <p>Before writing a line of code, we traded.</p>
 <p>Digital Orchard is grounded in active supply chain operations in Tamil Nadu — the price gaps, the logistics failures, the information asymmetry that farmers face every single season.</p>
 <p>Our beta infrastructure is built on that knowledge. We know what data farmers actually need, because we've sat across the table from them, negotiated at farm gate, and moved produce through the same broken system we're now replacing.</p>
 <p>This is why we build infrastructure first, and scale second.</p>
 </div>
 <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10">
 <div>
 <p className="text-white font-medium text-lg">Tamil Nadu</p>
 <p className="text-[10px] text-primary normal-case mt-1">Active Operations</p>
 </div>
 <div>
 <p className="text-white font-medium text-lg">Farm Gate</p>
 <p className="text-[10px] text-primary normal-case mt-1">Where Our Data Starts</p>
 </div>
 <div>
 <p className="text-white font-medium text-lg">Zero Code</p>
 <p className="text-[10px] text-primary normal-case mt-1">Before First Trade</p>
 </div>
 </div>
 </div>
 <div className="relative h-full min-h-[300px] md:min-h-[500px] bg-[#021f0d] flex items-center justify-center border border-white/5 rounded-sm overflow-hidden group">
 <img src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=1200&q=80" alt="Farmer in Tamil Nadu" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700" />
 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
 </div>
 </div>

 {/* Prosperity Bento Grid */}
 <div className="w-full max-w-[1400px] mx-auto mt-20 md:mt-40 border-t border-white/5 pt-20 md:pt-32">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-20">
 <div className="space-y-4">
 <span className="text-primary font-medium text-xs normal-case ">Performance Protocol</span>
 <h2 className="text-[40px] md:text-[56px] font-semibold tracking-[-0.02em] text-white leading-[1.07]">Orchard<br />Metrics</h2>
 </div>
 <p className="max-w-md text-foreground-muted leading-[1.47] font-normal text-[17px]">
 <strong className="text-white">India-first, planet-ready.</strong><br/>
 We’re proving the protocol in Tamil Nadu and pan-India market data before turning it into a global food and FMCG operating system.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-px bg-white/5 border border-white/5 overflow-hidden">
 <div className="col-span-1 md:col-span-3 row-span-1 bg-[#050505] p-8 md:p-12 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
 <div className="flex justify-between items-start">
 <div className="p-2 md:p-3 bg-primary/10 text-primary rounded-sm"><Zap fill="currentColor" size={20} /></div>
 <span className="mono text-[10px] text-white/20">PRICE-OS</span>
 </div>
 <div className="mt-8 md:mt-12 space-y-2 md:space-y-4">
 <h3 className="mono text-3xl md:text-4xl font-light text-white">6,944</h3>
 <p className="text-[10px] md:text-sm text-foreground-muted normal-case font-medium">Markets in Beta Directory</p>
 </div>
 </div>

 <div className="col-span-1 md:col-span-3 row-span-1 bg-[#050505] p-8 md:p-12 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
 <div className="flex justify-between items-start">
 <div className="p-2 md:p-3 bg-primary/10 text-primary rounded-sm"><ShieldCheck size={20} /></div>
 <span className="mono text-[10px] text-white/20">FORECAST-OS</span>
 </div>
 <div className="mt-8 md:mt-12 space-y-2 md:space-y-4">
 <h3 className="mono text-3xl md:text-4xl font-light text-white">85% Target</h3>
 <p className="text-[10px] md:text-sm text-foreground-muted normal-case font-medium">30-Day Prediction Accuracy (Roadmap)</p>
 <p className="text-[10px] text-foreground-muted mt-2 italic">*Target, not current actuals</p>
 </div>
 </div>

 <div className="col-span-1 md:col-span-2 row-span-1 bg-[#050505] p-8 md:p-12 flex flex-col justify-between group hover:bg-primary/[0.02] transition-colors">
 <div className="flex justify-between items-start">
 <div className="p-2 md:p-3 bg-primary/10 text-primary rounded-sm"><Activity size={20} /></div>
 <span className="mono text-[10px] text-white/20">RISK-OS</span>
 </div>
 <div className="mt-8 md:mt-12">
 <h3 className="mono text-3xl font-light text-white">250+</h3>
 <p className="text-[10px] text-foreground-muted normal-case font-medium mt-2">Commodities in Coverage Map</p>
 </div>
 </div>

 <div className="col-span-1 md:col-span-4 row-span-1 bg-primary p-8 md:p-12 flex flex-col justify-between text-black">
 <div className="flex justify-between items-start">
 <div className="p-2 md:p-3 bg-black text-primary rounded-sm"><MapPin size={20} /></div>
 <span className="mono text-[10px] font-medium opacity-40">VALUE-GAIN</span>
 </div>
 <div className="mt-8 md:mt-12 flex justify-between items-end">
 <div>
 <h3 className="display text-4xl md:text-6xl font-light normal-case leading-none mt-2 md:mt-4">53–67%</h3>
 <p className="text-[10px] md:text-sm font-medium normal-case mt-4 opacity-80 max-w-sm">Value lost to intermediaries today — what we're eliminating</p>
 </div>
 <ArrowRight size={48} strokeWidth={3} className="hidden sm:block" />
 </div>
 </div>
 </div>
 </div>

 </div>
 </section>
 );
};

const StatBox = ({ number, label, isMono, isPrimary, sub, link }: any) => {
  const content = (
    <>
      <span className={`${isMono ? 'mono' : 'display'} text-6xl font-light ${isPrimary ? 'text-primary' : 'text-white'} tracking-tight leading-none group-hover:text-primary transition-colors`}>
        {number}
      </span>
      <div className="space-y-1">
        <p className="text-[10px] font-medium text-foreground-muted normal-case ">{label}</p>
        <p className="text-[9px] text-white/20 normal-case ">{sub}</p>
      </div>
    </>
  );

  return link ? (
    <Link to={link} className="flex flex-col gap-2 p-6 group hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/10 cursor-pointer">
      {content}
    </Link>
  ) : (
    <div className="flex flex-col gap-2 p-6">
      {content}
    </div>
  );
};

const PlayerCard = ({ role, tamil, icon, body, link }: any) => (
 <div className="bg-[#050505] p-8 md:p-10 flex flex-col gap-8 text-left group transition-all duration-300 hover:bg-[#111111] border-white/5 border relative overflow-hidden">
 
 <div className="absolute bottom-0 right-0 w-12 h-12 flex items-center justify-center text-white/5 group-hover:text-primary/20 transition-colors">
 <ArrowRight size={24} />
 </div>

 <div className="space-y-6">
 <div className="w-14 h-14 border border-white/10 flex items-center justify-center text-white group-hover:text-primary transition-all duration-300 rounded-[14px]">
 {icon}
 </div>
 <div>
 <h3 className="text-[24px] font-semibold text-white tracking-[-0.02em] leading-tight">{role}</h3>
 <p className="text-[10px] font-medium text-primary opacity-60 normal-case mt-2">{tamil}</p>
 </div>
 </div>

 <p className="text-[14px] font-normal text-white/60 leading-[1.43] max-w-xs">
 {body}
 </p>

 <div className="pt-8 block mt-auto">
 <Link to={link || "#"} className="text-[14px] font-medium text-primary hover:text-white transition-colors group-hover:underline">
      Protocol Access →
    </Link>
    <p className="text-[10px] text-white/40 mt-2">Create your free {role.toLowerCase()} profile</p>
 </div>
 </div>
);

