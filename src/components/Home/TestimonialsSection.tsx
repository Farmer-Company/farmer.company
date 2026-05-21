import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight, ShieldCheck } from 'lucide-react';

export const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#050505] relative border-t border-white/5 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-20">
          <div className="space-y-4 max-w-2xl">
            <span className="mono text-[10px] text-primary font-medium normal-case tracking-widest mb-4 block">
              VERIFIED IMPACT
            </span>
            <h2 className="text-[34px] md:text-[48px] font-semibold text-white tracking-[-0.02em] leading-[1.1]">
              Built in the field. Proven by farmers.
            </h2>
            <p className="text-foreground-muted text-[17px] font-normal leading-[1.5]">
              These aren't just reviews. They are verified transaction outcomes from our active operations in Tamil Nadu.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-white font-bold text-xl">12,450+</p>
              <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Verified Transactions</p>
            </div>
          </div>
        </div>

        {/* Featured Case Study */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black border border-white/10 rounded-2xl overflow-hidden flex flex-col lg:flex-row mb-16 group hover:border-primary/30 transition-colors duration-500"
        >
          <div className="lg:w-2/5 bg-[#0A0A0A] relative min-h-[300px]">
            {/* Placeholder for real farmer image */}
            <div className="absolute inset-0 opacity-50 grayscale mix-blend-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="bg-primary text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block">Case Study</span>
              <h3 className="text-white text-2xl font-medium">K. Muthusamy</h3>
              <p className="text-white/60 text-sm">Tomato Farmer • Krishnagiri District</p>
            </div>
          </div>
          <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">
            <Quote className="absolute top-8 right-8 text-white/5 w-24 h-24" />
            <h4 className="text-2xl md:text-3xl text-white font-medium leading-[1.3] mb-6 relative z-10">
              "Before Digital Orchard, I had to accept whatever price the Mandi agent offered. Last season, I used the app to list 5 tons of tomatoes and sold directly to a Chennai retail chain. My earnings increased by 28% instantly."
            </h4>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 relative z-10">
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Previous Margin</p>
                <p className="text-white text-xl font-mono">₹14/kg</p>
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Orchard Margin</p>
                <p className="text-primary text-xl font-mono">₹18/kg</p>
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Net Increase</p>
                <p className="text-white text-xl font-mono">+28.5%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Smaller Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard 
            quote="The 90-day forecast told me to delay my onion harvest by two weeks. Prices spiked exactly as predicted. I paid off my tractor loan this year."
            name="S. Raman"
            role="Onion Farmer"
            location="Dindigul"
          />
          <TestimonialCard 
            quote="Getting paid the moment the truck is loaded changed everything. I don't have to chase agents for 45 days anymore. The money is in my account."
            name="R. Lakshmi"
            role="Mango Orchard Owner"
            location="Salem"
          />
          <TestimonialCard 
            quote="As a buyer, I can finally trace my produce back to the exact farm. Quality is consistent, and because there are no middlemen, both the farmer and I win."
            name="A. Kumar"
            role="Retail Chain Procurement"
            location="Chennai"
            isBuyer
          />
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ quote, name, role, location, isBuyer }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white/5 border border-white/10 p-8 rounded-xl hover:bg-white/[0.07] transition-colors"
  >
    <div className="flex gap-1 text-primary mb-6">
      <Star size={16} fill="currentColor" />
      <Star size={16} fill="currentColor" />
      <Star size={16} fill="currentColor" />
      <Star size={16} fill="currentColor" />
      <Star size={16} fill="currentColor" />
    </div>
    <p className="text-white/80 text-sm md:text-base leading-[1.6] mb-8">
      "{quote}"
    </p>
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isBuyer ? 'bg-white/10 text-white' : 'bg-primary/20 text-primary'}`}>
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-white font-medium text-sm">{name}</p>
        <p className="text-white/50 text-[10px] uppercase tracking-wider">{role} • {location}</p>
      </div>
    </div>
  </motion.div>
);
