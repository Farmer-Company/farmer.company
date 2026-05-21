import React from 'react';
import { Button } from '@/components/ui/button';
import { motion, useMotionValue } from 'motion/react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
 const { t } = useLanguage();
 const navigate = useNavigate();
 const mouseX = useMotionValue(0);
 const mouseY = useMotionValue(0);

 const handleMouseMove = (e: React.MouseEvent) => {
 mouseX.set(e.clientX);
 mouseY.set(e.clientY);
 };

 // No typing effect needed anymore

  return (
    <section
      onMouseMove={handleMouseMove}
      className="bg-background relative overflow-hidden min-h-[100svh] flex flex-col justify-center px-6 md:px-20 noise-bg cursor-default py-20 pt-32"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 os-grid opacity-20 pointer-events-none" />
      <div className="scanline" />

      {/* Interactive Focal Glow */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

      {/* Vertical Meta */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block z-20">
        <span className="vertical-meta">EST. 2026 / FARMER.COMPANY ORCHARD OS v.ALPHA</span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text Content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-0 text-white">
              <h1 className="text-[12vw] sm:text-[10vw] md:text-[56px] font-light leading-[1.07] tracking-tight select-none">
                Connecting Farmers, Vendors,<br />Logistics & Customers.<br />
                <span className="text-primary">Zero Middlemen.</span>
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="ml-0 mt-8"
          >
            <div className="text-[17px] md:text-[20px] font-normal text-white/60 max-w-xl leading-[1.5] space-y-4">
              <p>The ₹10 → ₹30/kg tomato chain is broken. 30-40% of food is wasted, and 53–67% of value is lost to intermediaries before a farmer gets paid.</p>
              <p>Digital Orchard is the operating system that puts price intelligence, direct trade, and AI-driven cultivation in the hands of every farmer — before they plant, not after they've already lost.</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10 max-w-lg">
              <div className="flex flex-col gap-2 p-4 bg-black/50 backdrop-blur-sm border border-white/5 rounded-none">
                <span className="text-xl">📊</span>
                <h3 className="text-[15px] font-medium text-white tracking-tight">Price Intelligence</h3>
                <p className="text-[13px] text-white/60 leading-[1.43]">Compare 3,000+ markets</p>
              </div>
              <div className="flex flex-col gap-2 p-4 bg-black/50 backdrop-blur-sm border border-white/5 rounded-none">
                <span className="text-xl">📈</span>
                <h3 className="text-[15px] font-medium text-white tracking-tight">90-Day Forecasts</h3>
                <p className="text-[13px] text-white/60 leading-[1.43]">Know when to sell</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-10 relative z-20 flex flex-row items-center gap-6"
          >
            <Button variant="primary" onClick={() => navigate('/get-started')} className="px-8 py-6 text-[16px]">
              Join Beta — Free
            </Button>
            <button 
              onClick={() => {
                const demoSection = document.getElementById('interactive-demo');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
                }
              }}
              className="text-white hover:text-primary transition-colors text-[16px] font-normal tracking-tight"
            >
              See how it works ↓
            </button>
          </motion.div>
        </div>

        {/* Right Column: Platform Mockup */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:h-full flex items-center justify-center mt-12 lg:mt-0 perspective-1000"
        >
          <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-[4/5] lg:aspect-auto lg:h-[700px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 transform lg:rotate-y-[-10deg] lg:rotate-x-[5deg] transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0">
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
             <img 
                src="/agrios_dashboard_mockup.png" 
                alt="AgriOS Platform Dashboard" 
                className="absolute inset-0 w-full h-full object-cover object-top opacity-90 mix-blend-screen"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1628102491629-77858ab5721d?auto=format&fit=crop&w=800&q=80';
                  (e.target as HTMLImageElement).className = 'absolute inset-0 w-full h-full object-cover opacity-50 grayscale mix-blend-overlay';
                }}
             />
             <div className="absolute bottom-8 left-8 right-8 z-20">
               <div className="backdrop-blur-md bg-black/60 border border-white/10 p-4 rounded-xl shadow-lg">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-white text-sm font-medium">Market Price: Tomato</span>
                   <span className="text-primary text-sm font-bold">₹28/kg</span>
                 </div>
                 <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                   <div className="bg-primary h-full w-[75%] rounded-full shadow-[0_0_10px_var(--primary)]" />
                 </div>
                 <div className="flex justify-between text-[10px] text-white/50 mt-1 uppercase tracking-wider">
                   <span>Farm Gate</span>
                   <span>Retail</span>
                 </div>
               </div>
             </div>
          </div>
          
          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-[10%] -left-8 lg:-left-16 backdrop-blur-md bg-[#0A0A0A]/80 border border-white/10 p-4 rounded-xl shadow-2xl hidden md:flex gap-3 items-center"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <span className="text-xl">✓</span>
            </div>
            <div>
              <p className="text-white font-medium text-sm">Direct Trade</p>
              <p className="text-white/50 text-[10px] uppercase tracking-wider">Verified Buyer</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
