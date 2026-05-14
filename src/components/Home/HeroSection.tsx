import React from "react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValue } from "motion/react";
import { useLanguage } from "@/src/lib/LanguageContext";
import { useNavigate } from "react-router-dom";

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
      className="bg-background relative overflow-hidden min-h-[100svh] flex flex-col justify-center px-6 md:px-20 noise-bg cursor-default py-20"
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
        <span className="vertical-meta">
          EST. 2026 / FARMER.COMPANY ORCHARD OS v.ALPHA
        </span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-0 text-white">
            <h1 className="text-[10vw] md:text-[56px] font-light leading-[1.07] tracking-tight select-none">
              The infrastructure layer
              <br />
              <span className="text-primary">
                Indian agriculture never had.
              </span>
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="ml-0 mt-8"
        >
          <div className="text-[17px] md:text-[24px] font-normal text-white/60 max-w-3xl leading-[1.5] space-y-4">
            <p>
              6,944 mandis. 250+ commodities. 53–67% of value lost to
              intermediaries before a farmer gets paid.
            </p>
            <p>
              Digital Orchard is the operating system that puts price
              intelligence, direct trade, and demand forecasting in the hands of
              every farmer — before they plant, not after they've already lost.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-12 md:mt-16">
            <div className="flex flex-col gap-2 p-5 md:p-6 bg-black border border-white/5 rounded-none">
              <span className="text-xl md:text-2xl">📊</span>
              <h3 className="text-[17px] font-medium text-white tracking-tight">
                Price Intelligence
              </h3>
              <p className="text-[14px] text-white/60 leading-[1.43]">
                Compare 3,000+ markets instantly
              </p>
            </div>
            <div className="flex flex-col gap-2 p-5 md:p-6 bg-black border border-white/5 rounded-none">
              <span className="text-xl md:text-2xl">📈</span>
              <h3 className="text-[17px] font-medium text-white tracking-tight">
                90-Day Forecasts
              </h3>
              <p className="text-[14px] text-white/60 leading-[1.43]">
                Know exactly when to sell
              </p>
            </div>
            <div className="flex flex-col gap-2 p-5 md:p-6 bg-black border border-white/5 rounded-none">
              <span className="text-xl md:text-2xl">🛒</span>
              <h3 className="text-[17px] font-medium text-white tracking-tight">
                Direct Marketplace
              </h3>
              <p className="text-[14px] text-white/60 leading-[1.43]">
                Sell directly without middlemen
              </p>
            </div>
            <div className="flex flex-col gap-2 p-5 md:p-6 bg-black border border-white/5 rounded-none">
              <span className="text-xl md:text-2xl">👨‍🌾</span>
              <h3 className="text-[17px] font-medium text-white tracking-tight">
                Farmer Portfolio
              </h3>
              <p className="text-[14px] text-white/60 leading-[1.43]">
                Your lifetime contribution, SKU-by-SKU
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-12 md:mt-16 relative z-20 flex flex-row items-center gap-6"
      >
        <Button variant="primary" onClick={() => navigate("/get-started")}>
          Join Beta — Free
        </Button>
        <button
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="text-white hover:text-primary transition-colors text-[17px] font-normal tracking-tight"
        >
          See how it works ↓
        </button>
      </motion.div>
    </section>
  );
};
