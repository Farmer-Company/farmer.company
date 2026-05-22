import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sprout, TrendingUp, Network, Truck, ShieldCheck, Search, Activity, ChevronRight, Terminal } from 'lucide-react';

const agents = [
  {
    id: "farmer-advisor",
    name: "Farmer Advisor Agent",
    icon: <Sprout size={24} />,
    description: "The daily cultivation coach. Voice-first, regional languages, available directly on the farmer's phone.",
    inputs: ["Local Weather & Soil Moisture", "Pest Alerts & Crop Stage", "Farm Intelligence Score"],
    actions: [
      "Suggests sowing windows & crop choices",
      "Schedules irrigation & pesticide plans",
      "Auto-prepares Verified Clean compliance"
    ],
    log: "> Analyzing soil moisture telemetry...\n> Recommend pausing irrigation for 48h.\n> Sowing window opens in 3 days."
  },
  {
    id: "demand-price",
    name: "Demand & Price Agent",
    icon: <TrendingUp size={24} />,
    description: "The market predictor. Forecasts future demand and notifies farmers of optimal contract pricing.",
    inputs: ["Macroeconomic Indicators", "Commodity Spot Prices", "Buyer RFQs", "Stored Demand Models"],
    actions: [
      "Generates 90-day demand forecasts",
      "Recommends crop mix at FPO & district level",
      "Auto-notifies farmers for contractable prices"
    ],
    log: "> Ingesting global commodity indexes...\n> Forecasting 18% surge in onion demand Q3.\n> Alerting 120 FPOs in Tamil Nadu."
  },
  {
    id: "matchmaking",
    name: "Marketplace Matchmaking Agent",
    icon: <Network size={24} />,
    description: "The contract orchestrator. Connects verified supply with enterprise demand automatically.",
    inputs: ["Buyer Specs (Quality/Volume)", "Farmer/FPO Profiles", "Logistics Constraints"],
    actions: [
      "Matches buyers to appropriate FPOs",
      "Enforces Farm Intelligence Score thresholds",
      "Drafts smart contracts for human approval"
    ],
    log: "> Received European FMCG RFQ (10,000 MT).\n> Matching with Salem FPO Alliance...\n> Drafting Smart Contract #9842. Awaiting sign-off."
  },
  {
    id: "logistics",
    name: "Logistics Orchestrator Agent",
    icon: <Truck size={24} />,
    description: "The movement engine. Plans pickups, optimizes routes, and dispatches trucks to the farm gate.",
    inputs: ["Farm-gate Locations", "Harvest Windows", "Truck Inventory", "Route Data"],
    actions: [
      "Plans pickups based on confirmed contracts",
      "Dispatches trucks directly to farm gates",
      "Optimizes routes to maintain cold chain"
    ],
    log: "> Contract #9842 confirmed.\n> Sourcing 5 cold-chain trucks.\n> Routing via Highway 44. Expected farm arrival 06:00."
  },
  {
    id: "credit",
    name: "Credit & Insurance Agent",
    icon: <Activity size={24} />,
    description: "The financial backbone. Dynamically prices risk and generates pre-approved credit lines.",
    inputs: ["Farm Intelligence Score", "Contract Pipeline", "Historical Repayment", "Weather Risk"],
    actions: [
      "Generates pre-approved credit lines",
      "Auto-assembles loan proposals",
      "Packages insurance bundles for partners"
    ],
    log: "> Scoring Farmer Profile #1128.\n> Verified Clean Premium active. Contract secured.\n> Approving zero-collateral input loan at 4.5%."
  },
  {
    id: "compliance",
    name: "Compliance & Safety Agent",
    icon: <ShieldCheck size={24} />,
    description: "The digital auditor. Monitors adherence to platform policies and regulatory standards.",
    inputs: ["Local Regulations", "Marketplace Rules", "Farmer Manuals", "Platform Policies"],
    actions: [
      "Monitors for non-compliant pesticide use",
      "Flags misreporting & guides correction",
      "Maintains audit-ready FPO ledgers"
    ],
    log: "> Scanning input ledger for FPO #99.\n> Chemical usage aligns with EU export specs.\n> Ledger locked. Ready for state audit."
  },
  {
    id: "research",
    name: "Research & Impact Agent",
    icon: <Search size={24} />,
    description: "The data synthesizer. Assists researchers and generates sustainability reports.",
    inputs: ["Anonymized Platform Data", "Trial Protocols", "Field Notes"],
    actions: [
      "Assists in designing field experiments",
      "Samples farms & tracks outcomes",
      "Generates periodic ESG & impact reports"
    ],
    log: "> Aggregating water usage metrics Q1.\n> Precision irrigation saved 2.4M liters.\n> Compiling ESG report for stakeholders."
  }
];

export const AgentsPage = () => {
  const [activeAgent, setActiveAgent] = useState(agents[0]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-mono uppercase tracking-widest mb-4">
            <BrainCircuit size={14} /> System Architecture
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
            AN ORCHESTRATION OF <span className="text-primary block md:inline">INTELLIGENCE.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
            Farmer.company is not a static marketplace. It is a multi-sided Agri Operating System powered by 7 autonomous AI agents, making the supply chain verifiable, predictable, and fair.
          </motion.p>
        </div>

        {/* The Node Graph / Architecture UI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
          
          {/* Left Column: Network Map (Selection) */}
          <div className="lg:col-span-4 lg:space-y-3">
            <div className="pb-4 border-b border-white/10 mb-4 lg:mb-6">
              <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest">Active Agents</h3>
            </div>
            
            <div className="flex overflow-x-auto lg:flex-col gap-3 pb-4 lg:pb-0 snap-x [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(agent)}
                  className={`flex-none w-[240px] lg:w-full text-left p-3 lg:p-4 rounded-lg border transition-all duration-300 flex items-center gap-3 lg:gap-4 group snap-start ${
                    activeAgent.id === agent.id 
                      ? 'bg-primary/5 border-primary/30 shadow-[0_0_20px_rgba(74,222,128,0.1)]' 
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`p-2 rounded-md shrink-0 ${activeAgent.id === agent.id ? 'bg-primary text-black' : 'bg-white/5 text-white/50 group-hover:text-white'}`}>
                    {agent.icon}
                  </div>
                  <div className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    <h4 className={`font-semibold text-sm ${activeAgent.id === agent.id ? 'text-primary' : 'text-white'}`}>{agent.name}</h4>
                  </div>
                  <ChevronRight size={16} className={`hidden lg:block shrink-0 ${activeAgent.id === agent.id ? 'text-primary' : 'text-white/20'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Agent Detail Cockpit */}
          <div className="lg:col-span-8 bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col relative">
            
            {/* Top Bar */}
            <div className="h-12 border-b border-white/10 bg-black/50 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/50" />
              </div>
              <div className="mx-auto font-mono text-[11px] tracking-wider text-white/30 flex items-center gap-2">
                <Terminal size={12} /> {activeAgent.id}.agent.sys
              </div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAgent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1 p-8 md:p-12 space-y-12"
              >
                
                {/* Header */}
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-primary/10 text-primary rounded-xl border border-primary/20">
                    {activeAgent.icon}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>{activeAgent.name}</h2>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base max-w-lg">{activeAgent.description}</p>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Inputs */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Data Inputs
                    </div>
                    <ul className="space-y-3">
                      {activeAgent.inputs.map((input, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                          <span className="text-white/20 mt-0.5">↳</span> {input}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Autonomous Actions
                    </div>
                    <ul className="space-y-3">
                      {activeAgent.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                          <span className="text-primary mt-0.5">●</span> {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Terminal / Agent Log */}
                <div className="bg-black border border-white/5 rounded-lg p-5 font-mono text-sm space-y-2 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                  <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2">
                    <Activity size={14} className="text-primary" />
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">Live Agent Stream</span>
                  </div>
                  {activeAgent.log.split('\n').map((line, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className={`${line.includes('Recommend') || line.includes('Alerting') || line.includes('Drafting') || line.includes('Approving') ? 'text-primary' : 'text-white/50'}`}
                    >
                      {line}
                    </motion.div>
                  ))}
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: [0, 1, 0] }} 
                    transition={{ repeat: Infinity, duration: 1 }} 
                    className="w-2 h-4 bg-primary inline-block mt-1 align-middle"
                  />
                </div>

              </motion.div>
            </AnimatePresence>
            
          </div>
        </div>

        {/* Bottom Explanation */}
        <div className="max-w-3xl mx-auto text-center border-t border-white/10 pt-16 space-y-6">
           <h3 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>Humans in the Loop.</h3>
           <p className="text-white/60 leading-relaxed">
             While these agents operate continuously to forecast, route, and match—all high-stakes financial, contractual, and regulatory decisions remain explicitly human-approved. The AI drafts the smart contract, but the farmer signs it.
           </p>
        </div>

      </div>
    </div>
  );
};
