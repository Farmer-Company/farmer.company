import React from 'react';
import { motion } from 'motion/react';
import { Truck, Map, Smartphone, Ship, Wallet, CheckCircle, Users, Building, Tractor, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const LogisticsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl space-y-8"
        >
          <span className="mono text-[10px] text-primary font-medium tracking-widest uppercase">FOR LOGISTICS / தளவாட பங்காளர்கள்</span>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-[1.05]">
            The logistics operating system for <span className="text-primary">Indian agriculture.</span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-3xl">
            From village lanes to global ports, Digital Orchard keeps your trucks full, paid, and under control.
            <br/><br/>
            Zero empty miles. Predictable revenue. Full control of your fleet.<br/>
            Stop waiting for calls or brokers. Get confirmed farm pickups, vendor drop-offs, and export loads scheduled days in advance.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/get-started')}>
              Become a Network Carrier
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5" onClick={() => navigate('/story')}>
              Talk to a Supply Chain Specialist
            </Button>
          </div>
          <p className="text-[10px] text-white/40 mono mt-2">
            We'll map your lanes, connect your fleet, and start you on a pilot route within days.
          </p>
        </motion.div>

        {/* Pillars of Value */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-3xl font-light tracking-tight text-white">Pillars of Value</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Truck size={24} />}
              title="Guaranteed demand"
              desc="Tap into direct farm-to-vendor, farm-to-processor, and farm-to-port flows already running on Digital Orchard. We use harvest forecasts to give you predictable loads every single day, not just spot calls."
            />
            <FeatureCard 
              icon={<Map size={24} />}
              title="Smart routing, zero empty miles"
              desc="AI-driven routing plans multi-pickup, multi-drop trips so you burn less fuel and time per tonne. Backhauls are matched automatically so when you drop in the city, a return load is already waiting."
            />
            <FeatureCard 
              icon={<Smartphone size={24} />}
              title="Fleet OS for truck owners"
              desc="A simple driver and owner app gives live GPS, load details, documents, tolls, and fuel tracking in one place. You see every truck on a map, trip history, earnings, and utilization like a control room."
            />
            <FeatureCard 
              icon={<Ship size={24} />}
              title="Export and multimodal ready"
              desc="Standardized documents and data connect your trucks to container yards, rail, and ports. Work with exporters and global buyers who need reliable, traceable cold-chain and dry cargo movements."
            />
            <FeatureCard 
              icon={<Wallet size={24} />}
              title="Assured payouts and finance"
              desc="Payments are escrowed and released automatically on proof of delivery. Reliable partners unlock faster settlements and working capital options aligned to your lanes and risk profile."
            />
          </div>
        </div>

        {/* Logistics OS Modules */}
        <div className="space-y-12 bg-[#050505] p-8 md:p-16 border border-white/5 rounded-sm">
          <div className="border-b border-white/10 pb-4 mb-12">
            <h2 className="text-3xl font-light tracking-tight text-white">Logistics OS Modules</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            <ModuleBlock 
              title="Smart Dispatch & Matching"
              items={[
                "Match harvest windows, mandi timings, and plant/port slots with your available capacity days in advance.",
                "Blend multiple farm pickups and drops into one optimized route to improve tonnes per trip.",
                "Prioritize lanes that fit your fleet type, permits, and preferred regions."
              ]}
            />
            <ModuleBlock 
              title="Fleet & Driver App"
              items={[
                "Android apps for drivers and owners with live GPS, load status, and route guidance.",
                "Digital locker for RC, permits, insurance, e-way bills, and PoDs, easy to share at check posts and gates.",
                "Track fuel, tolls, and waiting time to understand true trip profitability."
              ]}
            />
            <ModuleBlock 
              title="Control Center Dashboard"
              items={[
                "One dashboard to see active trips, delayed stops, and idle vehicles.",
                "Utilization, on-time performance, and earnings per lane to decide where to grow.",
                "Alerts for exceptions: breakdowns, missed loading times, temperature deviations."
              ]}
            />
            <ModuleBlock 
              title="Multimodal & Export Gateway"
              items={[
                "Connect farm trucks to ICDs, CFS, rail, and ports through pre-defined export corridors.",
                "Standardize BL, invoices, quality certificates, and cold-chain logs for global buyers.",
                "Enable door-to-port offerings with partner networks while you manage the road leg."
              ]}
            />
            <ModuleBlock 
              title="Assured Payments & Working Capital"
              items={[
                "Escrow-based payments tied to digital PoD and tracking events.",
                "Invoice discounting and advance payouts for high-performance carriers.",
                "Clear trip-wise statements for every truck and driver."
              ]}
            />
            <ModuleBlock 
              title="Compliance, Quality & Traceability"
              items={[
                "Temperature and humidity logging for reefer vehicles where sensors are available.",
                "Produce traceability from farm to buyer, attached to each consignment.",
                "Standard SLAs and dispute workflows to protect both fleet owners and shippers."
              ]}
            />
          </div>
        </div>

        {/* Who plugs into this network */}
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-4">
            <h2 className="text-3xl font-light tracking-tight text-white">Who plugs into this network</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PersonaCard 
              icon={<Users size={24} />}
              title="Small fleet owners (1–10 vehicles)"
              desc="Use the driver app and simple dashboard to keep every truck loaded, paid, and visible. We bring you pre-verified farm and vendor loads on your preferred lanes so you can grow without adding a sales team."
            />
            <PersonaCard 
              icon={<Building size={24} />}
              title="Large fleets and transport companies"
              desc="Integrate your TMS via APIs or use our control center to manage hundreds of vehicles across states. Get access to aggregated farm and export volumes and design long-term contracts instead of chasing spot loads."
            />
            <PersonaCard 
              icon={<Tractor size={24} />}
              title="FPOs and village aggregators"
              desc="If you own or rent trucks, plug them into the network to move your members' produce and fill gaps with partner fleets when needed. Schedule pickups aligned with harvest and buyer timings rather than last-minute fixes."
            />
            <PersonaCard 
              icon={<Globe size={24} />}
              title="Exporters and global buyers"
              desc="Design door-to-port and port-to-door lanes with partners already active on farm routes. Get visibility, traceability, and performance data for every container originating from Digital Orchard villages."
            />
          </div>
        </div>

        {/* Trust & Proof */}
        <div className="bg-primary/5 border border-primary/20 p-10 md:p-16 rounded-sm space-y-16">
          <div>
            <h2 className="text-2xl font-light text-white mb-8">Network in numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatBlock value="2,350+" label="Active vehicles this season" />
              <StatBlock value="180+" label="Lanes across Tamil Nadu & neighboring states" />
              <StatBlock value="96.4%" label="On-time delivery on contracted lanes" />
            </div>
          </div>
          
          <div className="border-t border-primary/10 pt-16">
            <h2 className="text-2xl font-light text-white mb-8">What partners say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial 
                quote="After joining Digital Orchard lanes, our 12 trucks saw 43% higher utilization and faster payments."
                author="FPO in Salem (pilot)"
              />
              <Testimonial 
                quote="We get steady farm loads on our preferred routes instead of random spot calls."
                author="Fleet owner, Namakkal"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="flex flex-col items-center text-center space-y-8 py-10 border-t border-white/5">
          <h2 className="text-3xl font-light text-white">Ready to modernize your fleet?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" onClick={() => navigate('/get-started')}>
              Become a Network Carrier
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5" onClick={() => navigate('/story')}>
              Talk to a Supply Chain Specialist
            </Button>
          </div>
          <p className="text-[10px] text-white/40 mono max-w-lg">
            Onboard your trucks, set your lanes, and start receiving pilot loads within days. Or work with our team to design dedicated lanes and performance-based contracts for your network.
          </p>
        </div>

      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-[#050505] p-8 border border-white/5 space-y-6 group hover:border-primary/30 transition-colors rounded-sm flex flex-col">
    <div className="text-primary">{icon}</div>
    <div className="flex-1">
      <h3 className="text-lg font-medium text-white mb-3 tracking-tight">{title}</h3>
      <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ModuleBlock = ({ title, items }: { title: string, items: string[] }) => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium text-white tracking-tight">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
          <div className="mt-1 min-w-4 text-primary"><CheckCircle size={14} /></div>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const PersonaCard = ({ icon, title, desc }: any) => (
  <div className="p-8 border border-white/5 space-y-5 bg-black hover:bg-[#050505] transition-colors rounded-sm">
    <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-full text-white/80 mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-medium text-white">{title}</h3>
    <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
  </div>
);

const StatBlock = ({ value, label }: { value: string, label: string }) => (
  <div>
    <div className="text-5xl font-light text-primary display mb-2 tracking-tight">{value}</div>
    <div className="text-sm text-white/60 font-medium leading-snug">{label}</div>
  </div>
);

const Testimonial = ({ quote, author }: { quote: string, author: string }) => (
  <div className="space-y-4">
    <p className="text-lg text-white/80 font-light leading-relaxed italic">"{quote}"</p>
    <div className="mono text-[10px] text-primary uppercase tracking-widest">— {author}</div>
  </div>
);
