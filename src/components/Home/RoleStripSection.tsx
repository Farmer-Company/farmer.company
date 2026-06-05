import React from 'react';
import { ArrowRight, Building2, Tractor, ShoppingCart, Store, Truck, Microscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ROLES = [
  {
    id: 'farmer',
    title: 'Farmer / FPO',
    icon: Tractor,
    outcomes: ['Know what to grow before you plant.', 'Lock prices with escrow-backed contracts.'],
    path: '/farmers',
    color: '#4ADE80'
  },
  {
    id: 'buyer',
    title: 'Buyer / Processor / FMCG',
    icon: ShoppingCart,
    outcomes: ['Source verified quality directly from farms.', 'Automate your procurement at scale.'],
    path: '/customers',
    color: '#A78BFA'
  },
  {
    id: 'retailer',
    title: 'Retail / Grocery',
    icon: Building2,
    outcomes: ['Onboard farmers and FPOs as suppliers.', 'Procure lots and trigger logistics in one workflow.'],
    path: '/retailers',
    color: '#C084FC'
  },
  {
    id: 'vendor',
    title: 'Vendor / Service Provider',
    icon: Store,
    outcomes: ['Access aggregated demand from local farms.', 'Manage inventory with AI predictions.'],
    path: '/vendors',
    color: '#38BDF8'
  },
  {
    id: 'logistics',
    title: 'Logistics',
    icon: Truck,
    outcomes: ['Get pre-matched loads to reduce empty miles.', 'Real-time cold chain monitoring.'],
    path: '/logistics',
    color: '#FBBF24'
  },
  {
    id: 'researcher',
    title: 'Researcher / Policy',
    icon: Microscope,
    outcomes: ['Access anonymized, real-time market data.', 'Model policy impacts on the supply chain.'],
    path: '/researchers',
    color: '#f472b6' // Pink
  }
];

export const RoleStripSection = () => {
  const navigate = useNavigate();

  return (
    <section id="role-selector" className="w-full bg-[#050505] py-20 border-b border-white/5 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
            Choose your role in the ecosystem
          </h2>
          <p className="text-white/50 mt-3" style={{ fontFamily: '"Inter", sans-serif' }}>
            Select your path to see how the protocol works for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => navigate(role.path)}
                className="flex-1 flex flex-col items-start text-left p-6 bg-white/5 border border-white/10 hover:border-white/30 rounded-lg transition-all group relative overflow-hidden"
              >
                <div 
                  className="absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity" 
                  style={{ backgroundColor: role.color }}
                />
                
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mb-4 border border-white/10 group-hover:border-white/30 transition-colors">
                  <Icon size={18} style={{ color: role.color }} />
                </div>
                
                <h3 className="text-white font-bold text-[16px] mb-3" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {role.title}
                </h3>
                
                <ul className="space-y-2 mb-6 flex-1">
                  {role.outcomes.map((outcome, idx) => (
                    <li key={idx} className="text-white/60 text-[13px] leading-relaxed flex items-start gap-2">
                      <span className="text-white/30 mt-0.5">•</span>
                      <span style={{ fontFamily: '"Inter", sans-serif' }}>{outcome}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-[13px] font-bold tracking-wide uppercase transition-colors mt-auto" style={{ color: role.color, fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
