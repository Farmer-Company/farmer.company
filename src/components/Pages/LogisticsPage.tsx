import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  Calculator,
  CalendarCheck,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  Database,
  FileText,
  Gauge,
  Globe2,
  IndianRupee,
  Languages,
  LifeBuoy,
  MapPinned,
  PackageCheck,
  Plane,
  PhoneCall,
  QrCode,
  ReceiptText,
  Route,
  ShieldCheck,
  Ship,
  Smartphone,
  Sprout,
  Thermometer,
  Tractor,
  Truck,
  Warehouse,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type RouteRate = {
  from: string;
  to: string;
  distanceKm: number;
  vehicleType: string;
  rateRange: string;
  preferredCrops: string;
};

type VehicleType = {
  id: string;
  name: string;
  dimensions: string;
  payloadTons: string;
  volumeCuFt: string;
  ratePerKmRange: string;
  bestFor: string[];
};

type Feature = {
  title: string;
  description: string;
  icon: React.ElementType;
};

type OperatingTool = {
  title: string;
  description: string;
  icon: React.ElementType;
};

type ServiceLane = {
  title: string;
  description: string;
  icon: React.ElementType;
  reach: string;
  examples: string[];
};

type EstimateMode = {
  id: string;
  label: string;
  description: string;
  baseCost: number;
  perKm: number;
  perTon: number;
  minCost: number;
  icon: React.ElementType;
};

type Testimonial = {
  name: string;
  role: string;
  region: string;
  quote: string;
  metric: string;
};

type FAQ = {
  category: string;
  question: string;
  answer: string;
};

const estimateModes: EstimateMode[] = [
  {
    id: 'local',
    label: 'Local farm movement',
    description: 'Village, mandi, nearby cold store, or collection center.',
    baseCost: 900,
    perKm: 36,
    perTon: 420,
    minCost: 2200,
    icon: Tractor,
  },
  {
    id: 'national',
    label: 'National truck freight',
    description: 'Intercity or interstate farm-to-buyer movement.',
    baseCost: 5200,
    perKm: 72,
    perTon: 950,
    minCost: 12000,
    icon: Truck,
  },
  {
    id: 'cold-chain',
    label: 'Cold-chain freight',
    description: 'Temperature-controlled reefer movement for perishables.',
    baseCost: 9000,
    perKm: 125,
    perTon: 1500,
    minCost: 18000,
    icon: Thermometer,
  },
  {
    id: 'export-fcl',
    label: 'Port + export container',
    description: 'Inland trucking, port handoff, and full-container planning.',
    baseCost: 56000,
    perKm: 62,
    perTon: 2400,
    minCost: 95000,
    icon: Ship,
  },
  {
    id: 'lcl',
    label: 'LCL export consolidation',
    description: 'Small-volume cargo consolidated for ocean export lanes.',
    baseCost: 24000,
    perKm: 48,
    perTon: 5200,
    minCost: 42000,
    icon: Boxes,
  },
  {
    id: 'air',
    label: 'Air cargo desk',
    description: 'Fast movement for high-value or urgent perishable cargo.',
    baseCost: 42000,
    perKm: 28,
    perTon: 82000,
    minCost: 90000,
    icon: Plane,
  },
];

const routeRates: RouteRate[] = [
  {
    from: 'Nashik grape belt',
    to: 'Mumbai APMC',
    distanceKm: 175,
    vehicleType: '14-19 ft open / reefer',
    rateRange: 'Rs 18,000-28,000 per trip',
    preferredCrops: 'Grapes, onions, vegetables',
  },
  {
    from: 'Guntur chilli belt',
    to: 'Chennai processor cluster',
    distanceKm: 415,
    vehicleType: '20-22 ft container',
    rateRange: 'Rs 42,000-58,000 per trip',
    preferredCrops: 'Chillies, spices',
  },
  {
    from: 'Kolar vegetable belt',
    to: 'Bengaluru wholesale market',
    distanceKm: 70,
    vehicleType: 'Mini truck / tractor trolley',
    rateRange: 'Rs 4,500-9,000 per trip',
    preferredCrops: 'Tomato, cabbage, beans',
  },
  {
    from: 'Indore grain belt',
    to: 'Delhi NCR buyers',
    distanceKm: 820,
    vehicleType: '24-32 ft container',
    rateRange: 'Rs 72,000-96,000 per trip',
    preferredCrops: 'Wheat, pulses, soybean',
  },
  {
    from: 'Coimbatore mandi',
    to: 'Kochi distribution hub',
    distanceKm: 195,
    vehicleType: '14-19 ft open / container',
    rateRange: 'Rs 20,000-32,000 per trip',
    preferredCrops: 'Spices, coconut, plantation goods',
  },
  {
    from: 'Vellore collection center',
    to: 'Chennai city buyer',
    distanceKm: 140,
    vehicleType: 'Mini truck / 14 ft truck',
    rateRange: 'Rs 8,000-16,000 per trip',
    preferredCrops: 'Vegetables, flowers, inputs',
  },
  {
    from: 'Tuticorin port lane',
    to: 'Colombo feeder export',
    distanceKm: 210,
    vehicleType: '20 ft container / LCL',
    rateRange: 'Rs 95,000-1.6L inland + ocean estimate',
    preferredCrops: 'Spices, processed foods, coconut products',
  },
  {
    from: 'Bengaluru cargo terminal',
    to: 'Dubai buyer desk',
    distanceKm: 45,
    vehicleType: 'Reefer + air cargo',
    rateRange: 'Rs 1.2L-2.4L small shipment estimate',
    preferredCrops: 'Flowers, premium fruits, samples',
  },
];

const operatingTools: OperatingTool[] = [
  {
    title: 'Hub',
    description: 'An overview of your Farmer.Company logistics products, active lanes, bookings, finance, customs, and support tasks.',
    icon: Gauge,
  },
  {
    title: 'Manage bookings',
    description: 'View, track, edit, assign, and manage farm pickups, mandi transfers, port runs, and buyer deliveries in one place.',
    icon: CalendarCheck,
  },
  {
    title: 'MyFinance',
    description: 'View, pay, reconcile, and dispute freight invoices, advances, detention, loading charges, and transporter payouts.',
    icon: IndianRupee,
  },
  {
    title: 'MyCustoms',
    description: 'Add and manage customs products, export paperwork, origin proof, quality documents, and port handoff tasks.',
    icon: Globe2,
  },
  {
    title: 'Cold Chain Watch',
    description: 'Visibility for in-transit reefer goods with temperature status, delay alerts, route notes, and spoilage-risk flags.',
    icon: Thermometer,
  },
  {
    title: 'Case management',
    description: 'Manage open cases for delays, shortages, temperature breaches, buyer rejections, document gaps, and payment disputes.',
    icon: LifeBuoy,
  },
  {
    title: 'Supply chain control tower',
    description: 'Control, manage, and monitor procurement lots, warehouses, carriers, buyer orders, documents, finance, and settlement.',
    icon: Route,
  },
  {
    title: 'Order secure paper',
    description: 'Request secure paper for printable bills of lading, lorry receipts, e-way bills, quality certificates, and export packs.',
    icon: FileText,
  },
  {
    title: 'Allocations',
    description: 'View and manage seasonal truck, reefer, warehouse, port, and buyer capacity allocations across crop windows.',
    icon: Boxes,
  },
  {
    title: 'Data integrations',
    description: 'Stream booking, tracking, inventory, invoice, and document events into buyer ERP or partner systems.',
    icon: Database,
  },
];

const managementFeatures: Feature[] = [
  {
    title: 'Booking status from one place',
    description: 'View bookings, latest tracking details, LR/BL status updates, document health, and pending farm-to-buyer tasks.',
    icon: ClipboardCheck,
  },
  {
    title: 'Add time or delivery after booking',
    description: 'Purchase additional waiting time, cold-store handling, packaging support, or inland delivery after the booking is confirmed.',
    icon: PackageCheck,
  },
  {
    title: 'Change tracking across every load',
    description: 'Track vehicle changes, pickup delays, revised freight, document edits, case updates, and buyer-side approvals from one audit trail.',
    icon: Route,
  },
];

const serviceLanes: ServiceLane[] = [
  {
    title: 'Local harvest movement',
    description: 'Move produce from farm gate to collection point, mandi, local buyer, or nearby cold store.',
    icon: Tractor,
    reach: 'Village to district',
    examples: ['Tractor trolley', 'Mini truck', 'FPO pooling routes'],
  },
  {
    title: 'National agri trucking',
    description: 'Move bulk lots between mandis, processors, warehouses, retailers, and institutional buyers.',
    icon: Truck,
    reach: 'District to national',
    examples: ['Open truck', 'Container truck', 'Buyer dock delivery'],
  },
  {
    title: 'Cold-chain logistics',
    description: 'Protect fruits, dairy, flowers, and vegetables with reefer placement and temperature visibility.',
    icon: Thermometer,
    reach: 'Cold store to market',
    examples: ['Reefer', 'Pre-cooling handoff', 'Temperature alerts'],
  },
  {
    title: 'Port and export movement',
    description: 'Coordinate inland trucking, documents, container planning, and port-ready agri export cargo.',
    icon: Ship,
    reach: 'Farm belt to global',
    examples: ['Container run', 'Customs docs', 'Export milestone tracking'],
  },
  {
    title: 'LCL consolidation',
    description: 'Pool smaller export lots across FPOs and processors for ocean consolidation.',
    icon: Boxes,
    reach: 'Small cargo to global',
    examples: ['Spices', 'Processed foods', 'Shared container planning'],
  },
  {
    title: 'Air cargo desk',
    description: 'Fast-track urgent or high-value perishables where speed is more important than freight cost.',
    icon: Plane,
    reach: 'Fast domestic or export',
    examples: ['Flowers', 'Premium fruits', 'Urgent samples'],
  },
];

const vehicleTypes: VehicleType[] = [
  {
    id: 'mini-truck',
    name: 'Mini Truck (7-9 ft)',
    dimensions: 'Approx. 7-9 ft load body',
    payloadTons: '0.8-1.5 tonnes',
    volumeCuFt: '120-180 cu ft',
    ratePerKmRange: 'Rs 28-45/km',
    bestFor: ['Vegetable crates', 'Milk cans', 'Flowers', 'Small FPO pickups'],
  },
  {
    id: 'open-truck',
    name: '14-19 ft Open Truck',
    dimensions: 'Approx. 14-19 ft load body',
    payloadTons: '4-9 tonnes',
    volumeCuFt: '700-1,200 cu ft',
    ratePerKmRange: 'Rs 55-90/km',
    bestFor: ['Grain bags', 'Onion sacks', 'Fertilizer', 'Mandi transfers'],
  },
  {
    id: 'container-22',
    name: '20-22 ft Container Truck',
    dimensions: 'Closed container body',
    payloadTons: '7-12 tonnes',
    volumeCuFt: '1,100-1,500 cu ft',
    ratePerKmRange: 'Rs 75-120/km',
    bestFor: ['Packed foods', 'Spices', 'Retail-ready cartons', 'Weather protection'],
  },
  {
    id: 'container-32',
    name: '24-32 ft Container Truck',
    dimensions: 'Single or multi-axle container',
    payloadTons: '12-21 tonnes',
    volumeCuFt: '1,800-2,600 cu ft',
    ratePerKmRange: 'Rs 105-160/km',
    bestFor: ['Bulk grains', 'Processor lots', 'Long-haul buyer deliveries', 'Export cargo'],
  },
  {
    id: 'reefer',
    name: 'Reefer / Cold-Chain Truck',
    dimensions: 'Insulated temperature-controlled body',
    payloadTons: '2-16 tonnes',
    volumeCuFt: '400-2,000 cu ft',
    ratePerKmRange: 'Rs 95-220/km',
    bestFor: ['Fruits', 'Dairy', 'Leafy vegetables', 'High-value perishables'],
  },
  {
    id: 'tractor-trolley',
    name: 'Tractor Trolley',
    dimensions: 'Local short-haul trolley',
    payloadTons: '2-6 tonnes',
    volumeCuFt: 'Varies by trolley',
    ratePerKmRange: 'Local quote',
    bestFor: ['Farm to nearby mandi', 'Collection centers', 'Short rural lanes', 'Harvest pooling'],
  },
];

const features: Feature[] = [
  {
    title: 'Transparent freight rates',
    description: 'See route, distance, vehicle, and load-based estimates before you confirm.',
    icon: ReceiptText,
  },
  {
    title: 'Verified rural transporters',
    description: 'Every truck, tractor, and driver profile is reviewed before it joins the network.',
    icon: ShieldCheck,
  },
  {
    title: 'Harvest-time placement',
    description: 'Reserve capacity for peak crop movement windows and urgent mandi dispatches.',
    icon: Truck,
  },
  {
    title: 'Real-time tracking',
    description: 'Track loading, movement, unloading, and delay status from phone or desktop.',
    icon: MapPinned,
  },
  {
    title: 'Instant digital documents',
    description: 'Generate LR, e-POD, invoices, and settlement proof from the same trip record.',
    icon: FileText,
  },
  {
    title: 'Local language support',
    description: 'Phone and WhatsApp support for farmers, transporters, and field coordinators.',
    icon: Languages,
  },
  {
    title: 'Connected to the agri OS',
    description: 'Link each load to procurement lots, storage slots, buyer orders, and payouts.',
    icon: Sprout,
  },
  {
    title: 'Local and global reach',
    description: 'Start with village pickup and continue into national freight, port movement, export, LCL, or air cargo.',
    icon: Globe2,
  },
];

const testimonials: Testimonial[] = [
  {
    name: 'Ramesh Patil',
    role: 'FPO Manager',
    region: 'Nashik, Maharashtra',
    quote: 'Earlier we called five brokers before every dispatch. Now our route, truck, documents, and buyer updates sit in one place.',
    metric: 'Cut booking calls by 60%',
  },
  {
    name: 'Lakshmi Narayan',
    role: 'Vegetable Farmer',
    region: 'Kolar, Karnataka',
    quote: 'The truck arrived during the harvest window and the buyer received live updates. We avoided a full day of delay.',
    metric: 'Same-day mandi movement',
  },
  {
    name: 'Imran Shaikh',
    role: 'Truck Owner',
    region: 'Vellore, Tamil Nadu',
    quote: 'I can see nearby loads and return trips. Empty running has reduced, and payments are easier to follow.',
    metric: 'More return loads',
  },
  {
    name: 'Meena Foods',
    role: 'Processor',
    region: 'Chennai, Tamil Nadu',
    quote: 'Cold-chain alerts help our procurement team intervene early instead of discovering issues at unloading.',
    metric: 'Fewer quality escalations',
  },
];

const faqs: FAQ[] = [
  {
    category: 'Freight Rates & Costs',
    question: 'Are the rates final?',
    answer: 'The first estimate is indicative. Final rates depend on date, loading time, waiting time, fuel movement, crop season, and verified vehicle availability.',
  },
  {
    category: 'Truck Types & Sizes',
    question: 'Which vehicle should I choose for vegetables?',
    answer: 'Small harvests usually move well in mini trucks. Larger FPO lots often need 14-19 ft trucks. Leafy or high-value produce may need reefer support.',
  },
  {
    category: 'Booking & Process',
    question: 'Can a field coordinator book on behalf of farmers?',
    answer: 'Yes. Coordinators can create a route, add crop and tonnage, share loading details, and keep farmers updated by phone or WhatsApp.',
  },
  {
    category: 'Tracking & Delivery',
    question: 'How do I know where the truck is?',
    answer: 'The trip timeline shows booking, vehicle placement, loading, in-transit status, unloading, document upload, and payment milestones.',
  },
  {
    category: 'Payments & Documents',
    question: 'What documents are supported?',
    answer: 'The logistics record can hold LR, e-POD, invoice, weighbridge slip, GRN, quality note, and settlement proof.',
  },
  {
    category: 'About Digital Orchard Logistics',
    question: 'How does this fit into the agriculture operating system?',
    answer: 'Logistics is connected to procurement, market demand, storage, finance, advisory, and settlement workflows so the harvest can move as one managed operating flow.',
  },
];

const popularBelts = [
  'Nashik grape and onion belt',
  'Kolar vegetable belt',
  'Guntur chilli belt',
  'Indore grain belt',
  'Vellore vegetable corridor',
  'Coimbatore plantation belt',
  'Bengaluru retail intake lanes',
  'Chennai port and processor lanes',
];

const produceTypes = ['Fruits', 'Vegetables', 'Grains', 'Pulses', 'Spices', 'Dairy', 'Inputs', 'Other'];
const vehicleOptions = ['Mini truck', '14 ft truck', '19 ft truck', '20-32 ft container', 'Reefer', 'Tractor trolley'];

const SectionHeader = ({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
    <div>
      <p className="text-[#7CCB6A] text-[11px] font-bold uppercase tracking-widest mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{title}</h2>
    </div>
    {copy && <p className="max-w-xl text-white/60 text-sm md:text-base leading-relaxed">{copy}</p>}
  </div>
);

const formatRupees = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(value));

const FreightEstimator = ({ onBook }: { onBook: () => void }) => {
  const [modeId, setModeId] = useState(estimateModes[1].id);
  const [distanceKm, setDistanceKm] = useState(180);
  const [tonnage, setTonnage] = useState(8);
  const [vehicle, setVehicle] = useState('14 ft truck');
  const [coldChain, setColdChain] = useState(false);
  const [exportDocs, setExportDocs] = useState(false);

  const mode = estimateModes.find((item) => item.id === modeId) || estimateModes[0];
  const vehicleMultiplier =
    vehicle === 'Reefer' ? 1.35 :
    vehicle === '20-32 ft container' ? 1.22 :
    vehicle === 'Tractor trolley' ? 0.78 :
    vehicle === 'Mini truck' ? 0.82 :
    1;
  const coldChainSurcharge = coldChain ? Math.max(3500, distanceKm * 14 + tonnage * 700) : 0;
  const exportDocsSurcharge = exportDocs ? 12500 : 0;
  const rawEstimate = Math.max(
    mode.minCost,
    (mode.baseCost + distanceKm * mode.perKm + tonnage * mode.perTon) * vehicleMultiplier +
      coldChainSurcharge +
      exportDocsSurcharge
  );
  const lowEstimate = rawEstimate * 0.92;
  const highEstimate = rawEstimate * 1.18;
  const perTonne = rawEstimate / Math.max(tonnage, 1);

  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Freight Cost Estimates"
        title="Estimate local, national, cold-chain, and export freight"
        copy="A rate-estimate workflow for agriculture teams: compare movement types, vehicle choices, tonnage, cold-chain needs, and export documentation before requesting a confirmed quote."
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
        <div className="border border-white/10 bg-[#071009] p-5 md:p-7 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {estimateModes.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === modeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setModeId(item.id)}
                  className={`min-h-[140px] text-left border p-4 transition-colors ${
                    isActive
                      ? 'border-[#D9A441] bg-[#D9A441]/10'
                      : 'border-white/10 bg-black/25 hover:border-[#7CCB6A]/40'
                  }`}
                >
                  <Icon size={22} className={isActive ? 'text-[#D9A441]' : 'text-[#7CCB6A]'} />
                  <h3 className="text-white font-bold mt-4">{item.label}</h3>
                  <p className="text-white/48 text-xs leading-relaxed mt-2">{item.description}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-white/45 font-bold">Distance in km</span>
              <input
                type="number"
                min="1"
                value={distanceKm}
                onChange={(event) => setDistanceKm(Math.max(1, Number(event.target.value) || 1))}
                className="w-full h-12 bg-black/50 border border-white/10 px-4 text-sm text-white outline-none focus:border-[#7CCB6A]"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-white/45 font-bold">Load in tonnes</span>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={tonnage}
                onChange={(event) => setTonnage(Math.max(0.1, Number(event.target.value) || 0.1))}
                className="w-full h-12 bg-black/50 border border-white/10 px-4 text-sm text-white outline-none focus:border-[#7CCB6A]"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-[10px] uppercase tracking-widest text-white/45 font-bold">Vehicle / cargo mode</span>
              <select
                value={vehicle}
                onChange={(event) => setVehicle(event.target.value)}
                className="w-full h-12 bg-black/50 border border-white/10 px-4 text-sm text-white outline-none focus:border-[#7CCB6A]"
                title="Vehicle or cargo mode"
              >
                {vehicleOptions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-start gap-3 border border-white/10 bg-black/25 p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={coldChain}
                onChange={(event) => setColdChain(event.target.checked)}
                className="mt-1 accent-[#7CCB6A]"
              />
              <span>
                <span className="block text-white font-bold">Needs cold-chain handling</span>
                <span className="block text-white/48 text-sm leading-relaxed mt-1">Adds reefer monitoring, faster placement, and handling buffer.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 border border-white/10 bg-black/25 p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={exportDocs}
                onChange={(event) => setExportDocs(event.target.checked)}
                className="mt-1 accent-[#D9A441]"
              />
              <span>
                <span className="block text-white font-bold">Needs export / compliance documents</span>
                <span className="block text-white/48 text-sm leading-relaxed mt-1">Adds document prep, proof checks, and handoff tasks.</span>
              </span>
            </label>
          </div>
        </div>

        <aside className="border border-[#D9A441]/30 bg-[#0D0C06] p-6 md:p-7 h-fit space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#D9A441] font-bold">Estimated freight band</p>
              <h3 className="text-3xl font-extrabold text-white mt-3">
                {formatRupees(lowEstimate)} - {formatRupees(highEstimate)}
              </h3>
            </div>
            <Calculator size={28} className="text-[#D9A441]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="border border-white/10 bg-black/25 p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/35">Per tonne</p>
              <p className="text-white font-bold mt-2">{formatRupees(perTonne)}</p>
            </div>
            <div className="border border-white/10 bg-black/25 p-4">
              <p className="text-[10px] uppercase tracking-widest text-white/35">Mode</p>
              <p className="text-white font-bold mt-2">{mode.label}</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            {[
              ['Base and handling', mode.baseCost],
              ['Distance component', distanceKm * mode.perKm * vehicleMultiplier],
              ['Load component', tonnage * mode.perTon * vehicleMultiplier],
              ['Cold-chain buffer', coldChainSurcharge],
              ['Export / document buffer', exportDocsSurcharge],
            ].map(([label, value]) => (
              <div key={label as string} className="flex items-center justify-between gap-4 border-b border-white/8 pb-2">
                <span className="text-white/50">{label}</span>
                <span className="text-white/80 font-medium">{formatRupees(value as number)}</span>
              </div>
            ))}
          </div>

          <Button onClick={onBook} className="w-full h-12 bg-[#D9A441] hover:bg-[#f0bd56] text-black uppercase font-bold tracking-wider">
            Request confirmed quote <ArrowRight size={16} />
          </Button>
          <p className="text-xs leading-relaxed text-white/42">
            This is an indicative estimate, not a final tariff. Confirmed quotes should use live vehicle availability, route restrictions, fuel movement, tolls, detention, crop season, and buyer delivery windows.
          </p>
        </aside>
      </div>
    </section>
  );
};

const BookingWidget = ({ onSubmit }: { onSubmit: () => void }) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}
    className="bg-[#08110B] border border-[#7CCB6A]/25 p-5 md:p-6 space-y-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
  >
    <div>
      <p className="text-[10px] uppercase tracking-widest text-[#D9A441] font-bold">Instant Freight Estimate</p>
      <h2 className="text-2xl font-bold text-white mt-2">Book a truck for your harvest</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <input className="h-12 bg-black/50 border border-white/10 px-4 text-sm text-white outline-none focus:border-[#7CCB6A]" placeholder="From: village / mandi" />
      <input className="h-12 bg-black/50 border border-white/10 px-4 text-sm text-white outline-none focus:border-[#7CCB6A]" placeholder="To: mandi / city / port" />
      <select className="h-12 bg-black/50 border border-white/10 px-4 text-sm text-white outline-none focus:border-[#7CCB6A]" title="Produce type">
        <option value="">Produce type</option>
        {produceTypes.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <select className="h-12 bg-black/50 border border-white/10 px-4 text-sm text-white outline-none focus:border-[#7CCB6A]" title="Vehicle type">
        <option value="">Vehicle type</option>
        {vehicleOptions.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <input className="h-12 bg-black/50 border border-white/10 px-4 text-sm text-white outline-none focus:border-[#7CCB6A] sm:col-span-2" type="number" min="0" step="0.1" placeholder="Estimated tonnage" />
    </div>
    <Button type="submit" className="w-full h-12 bg-[#D9A441] hover:bg-[#f0bd56] text-black uppercase font-bold tracking-wider">
      Get Rates & Book <ArrowRight size={16} />
    </Button>
    <p className="text-xs leading-relaxed text-white/45">
      Indicative rates are refined after route, crop, loading time, and vehicle availability are confirmed.
    </p>
  </form>
);

const RouteRateCard = ({ route }: { route: RouteRate }) => (
  <div className="border border-white/10 bg-[#071009] p-5 flex flex-col gap-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-white font-bold text-lg">{route.from}</h3>
        <p className="text-[#D9A441] text-sm font-semibold mt-1">to {route.to}</p>
      </div>
      <Route size={20} className="text-[#7CCB6A]" />
    </div>
    <div className="grid grid-cols-2 gap-3 text-sm">
      <div>
        <p className="text-white/35 uppercase tracking-widest text-[10px]">Distance</p>
        <p className="text-white mt-1">{route.distanceKm} km</p>
      </div>
      <div>
        <p className="text-white/35 uppercase tracking-widest text-[10px]">Vehicle</p>
        <p className="text-white mt-1">{route.vehicleType}</p>
      </div>
    </div>
    <div>
      <p className="text-white/35 uppercase tracking-widest text-[10px]">Typical rate band</p>
      <p className="text-[#7CCB6A] text-xl font-extrabold mt-1">{route.rateRange}</p>
    </div>
    <p className="text-white/50 text-sm leading-relaxed">{route.preferredCrops}</p>
  </div>
);

const VehicleTypeCard = ({ vehicle }: { vehicle: VehicleType }) => (
  <div className="border border-white/10 bg-[#061008] p-6 flex flex-col gap-5">
    <div className="flex items-start justify-between gap-4">
      <h3 className="text-white font-bold text-xl">{vehicle.name}</h3>
      <Truck size={22} className="text-[#D9A441]" />
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-white/35 uppercase tracking-widest text-[10px]">Size</p>
        <p className="text-white/75 mt-1">{vehicle.dimensions}</p>
      </div>
      <div>
        <p className="text-white/35 uppercase tracking-widest text-[10px]">Payload</p>
        <p className="text-white/75 mt-1">{vehicle.payloadTons}</p>
      </div>
      <div>
        <p className="text-white/35 uppercase tracking-widest text-[10px]">Volume</p>
        <p className="text-white/75 mt-1">{vehicle.volumeCuFt}</p>
      </div>
      <div>
        <p className="text-white/35 uppercase tracking-widest text-[10px]">Rate</p>
        <p className="text-white/75 mt-1">{vehicle.ratePerKmRange}</p>
      </div>
    </div>
    <div>
      <p className="text-white/35 uppercase tracking-widest text-[10px] mb-3">Best for</p>
      <div className="flex flex-wrap gap-2">
        {vehicle.bestFor.map((item) => (
          <span key={item} className="border border-[#7CCB6A]/25 bg-[#7CCB6A]/10 text-[#C8E6B8] px-3 py-1 text-xs">
            {item}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const FAQAccordion = () => {
  const [openQuestion, setOpenQuestion] = useState(faqs[0]?.question || '');

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const isOpen = openQuestion === faq.question;
        return (
          <div key={faq.question} className="border border-white/10 bg-[#071009]">
            <button
              type="button"
              onClick={() => setOpenQuestion(isOpen ? '' : faq.question)}
              className="w-full min-h-16 px-5 py-4 flex items-center justify-between gap-4 text-left"
            >
              <span>
                <span className="block text-[10px] uppercase tracking-widest text-[#D9A441] font-bold mb-1">{faq.category}</span>
                <span className="text-white font-bold">{faq.question}</span>
              </span>
              <ChevronDown size={18} className={`text-white/45 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <p className="px-5 pb-5 text-white/60 text-sm leading-relaxed">{faq.answer}</p>}
          </div>
        );
      })}
    </div>
  );
};

export const LogisticsPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#040806] text-white">
      <header className="relative overflow-hidden pt-28 pb-20 px-6 border-b border-white/10">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,203,106,0.18),transparent_34%),radial-gradient(circle_at_80%_0%,rgba(217,164,65,0.14),transparent_30%)]" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
            <span className="inline-flex items-center gap-2 text-[#7CCB6A] text-[11px] font-bold uppercase tracking-widest">
              <Sprout size={16} /> Logistics layer of the agriculture OS
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.05]">
              Move harvests locally and globally with transparent freight.
            </h1>
            <p className="max-w-3xl text-white/70 text-lg md:text-xl leading-relaxed">
              From farm to mandi, warehouse, cold store, city buyer, port, or export customer, find verified trucks, tractors, reefer capacity, and freight partners with tracking, digital documents, cost estimates, and OS-linked settlement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={() => navigate('/signin')} className="bg-[#D9A441] hover:bg-[#f0bd56] text-black uppercase font-bold tracking-wider px-7">
                Book Truck - Farmer / FPO <ArrowRight size={16} />
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/signin')} className="border-[#7CCB6A]/40 text-white hover:bg-[#7CCB6A]/10 uppercase font-bold tracking-wider px-7">
                Find Loads - Truck Owner
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3 max-w-2xl">
              {[
                ['12k+', 'Loads coordinated'],
                ['4.8k+', 'Verified vehicles'],
                ['220+', 'Local & export lanes'],
              ].map(([value, label]) => (
                <div key={label} className="border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-2xl md:text-3xl font-extrabold text-[#7CCB6A]">{value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-white/45 mt-2">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-4">
            <div className="border border-white/10 bg-[#0C1710] p-4">
              <div className="relative h-48 overflow-hidden bg-[#102015] border border-white/10">
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
                <div className="absolute left-8 top-12 flex items-center gap-2 text-[#7CCB6A] text-xs font-bold uppercase tracking-widest">
                  <Warehouse size={18} /> Cold Store
                </div>
                <div className="absolute right-8 bottom-10 flex items-center gap-2 text-[#D9A441] text-xs font-bold uppercase tracking-widest">
                  <MapPinned size={18} /> Buyer Dock
                </div>
                <div className="absolute left-16 bottom-12 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                  <Tractor size={20} /> Farm Gate
                </div>
                <div className="absolute left-[26%] top-[52%] w-[48%] h-px bg-[#D9A441]" />
                <Truck className="absolute left-[48%] top-[45%] text-[#D9A441]" size={34} />
              </div>
            </div>
            <BookingWidget onSubmit={() => navigate('/signin')} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">
        <FreightEstimator onBook={() => navigate('/signin')} />

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Management Tools"
            title="Manage every farm shipment inside the agriculture OS"
            copy="A Maersk-style control suite translated for Farmer.Company: one place for local pickups, national freight, export movement, invoices, customs, reefer visibility, cases, allocations, and data integrations."
          />
          <div className="flex flex-wrap gap-3">
            <Button size="sm" onClick={() => navigate('/signin')} className="bg-[#D9A441] hover:bg-[#f0bd56] text-black uppercase font-bold tracking-wider">
              Register <ArrowRight size={14} />
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/signin')} className="border-[#7CCB6A]/40 text-white hover:bg-[#7CCB6A]/10 uppercase font-bold tracking-wider">
              Login
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {operatingTools.map(({ title, description, icon: Icon }) => (
              <div key={title} className="bg-[#061008] p-6 min-h-[220px] flex flex-col justify-between hover:bg-[#0A160E] transition-colors">
                <div className="flex items-center justify-between gap-4">
                  <Icon size={24} className="text-[#D9A441]" />
                  <ArrowRight size={16} className="text-white/20" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mt-3">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border border-white/10 bg-[#071009] p-6 md:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-7">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#7CCB6A] font-bold">New features</p>
                <h3 className="text-white text-2xl md:text-3xl font-extrabold mt-2">Carrier-grade controls for farm movement</h3>
              </div>
              <p className="text-white/55 text-sm leading-relaxed max-w-2xl">
                These features turn a simple booking into an operating record farmers, FPOs, exporters, transporters, and ops teams can all trust.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {managementFeatures.map(({ title, description, icon: Icon }) => (
                <div key={title} className="bg-[#061008] p-5 min-h-[180px]">
                  <Icon size={22} className="text-[#7CCB6A]" />
                  <h4 className="text-white font-bold text-lg mt-5">{title}</h4>
                  <p className="text-white/55 text-sm leading-relaxed mt-3">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Local To Global"
            title="Reach nearby markets and global buyers from the same logistics layer"
            copy="The same operating record can begin as a tractor pickup and continue into warehouse handling, container movement, export documentation, or air cargo."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {serviceLanes.map(({ title, description, icon: Icon, reach, examples }) => (
              <div key={title} className="border border-white/10 bg-[#071009] p-6 flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[#D9A441] font-bold">{reach}</p>
                    <h3 className="text-white font-bold text-xl mt-2">{title}</h3>
                  </div>
                  <Icon size={24} className="text-[#7CCB6A]" />
                </div>
                <p className="text-white/58 text-sm leading-relaxed">{description}</p>
                <div className="flex flex-wrap gap-2">
                  {examples.map((example) => (
                    <span key={example} className="border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Live Rates"
            title="Live agri truck rates on key routes"
            copy="Sample rates are placeholders for beta. They should be wired to verified route, fuel, season, vehicle, and demand data before production quoting."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {routeRates.map((route) => <RouteRateCard key={`${route.from}-${route.to}`} route={route} />)}
          </div>
          <p className="text-xs text-white/42 leading-relaxed">
            Rates are indicative and vary with season, crop condition, fuel cost, loading time, route demand, and verified vehicle availability.
          </p>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Vehicle Types"
            title="Choose the right vehicle for your crop"
            copy="Help farmers and FPO teams pick capacity by crop, distance, packing style, and spoilage risk."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {vehicleTypes.map((vehicle) => <VehicleTypeCard key={vehicle.id} vehicle={vehicle} />)}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Core Value"
            title="Everything you need for agri truck booking"
            copy="The logistics module does not sit alone. It connects with procurement, storage, finance, compliance, advisory, and settlement inside the operating system."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {features.map(({ title, description, icon: Icon }) => (
              <div key={title} className="bg-[#061008] p-6 min-h-[210px] flex flex-col justify-between">
                <Icon size={24} className="text-[#D9A441]" />
                <div>
                  <h3 className="text-white font-bold text-lg">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed mt-2">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader eyebrow="Workflow" title="How it works" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="border border-[#7CCB6A]/25 bg-[#071009] p-7">
              <h3 className="text-2xl font-bold text-white mb-6">For farmers, FPOs, and agri-enterprises</h3>
              {[
                'Sign up with farm, FPO, mandi, or buyer details.',
                'Enter route, crop type, quantity, date, and preferred vehicle.',
                'See a rate estimate, confirm booking, and share loading details.',
                'Track the truck, receive documents, and settle payments digitally.',
              ].map((step, index) => (
                <div key={step} className="flex gap-4 py-4 border-t border-white/8">
                  <span className="w-8 h-8 bg-[#7CCB6A]/12 border border-[#7CCB6A]/30 text-[#7CCB6A] flex items-center justify-center font-bold shrink-0">{index + 1}</span>
                  <p className="text-white/70 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
            <div className="border border-[#D9A441]/25 bg-[#0D0C06] p-7">
              <h3 className="text-2xl font-bold text-white mb-6">For truck and tractor owners</h3>
              {[
                'Register vehicle, driver, route preference, and documents once.',
                'See agri loads near you and along preferred return routes.',
                'Accept loads and receive advance confirmation.',
                'Complete trip, upload POD, and receive balance payment updates.',
              ].map((step, index) => (
                <div key={step} className="flex gap-4 py-4 border-t border-white/8">
                  <span className="w-8 h-8 bg-[#D9A441]/12 border border-[#D9A441]/30 text-[#D9A441] flex items-center justify-center font-bold shrink-0">{index + 1}</span>
                  <p className="text-white/70 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="Trust"
            title="Why farmers and transporters trust Digital Orchard"
            copy="Use real operating metrics here once pilots begin. For now, these illustrate the trust stories the product should capture."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {testimonials.map((item) => (
              <div key={item.name} className="border border-white/10 bg-[#071009] p-6 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-white/70 leading-relaxed">"{item.quote}"</p>
                  <p className="text-[#7CCB6A] font-bold mt-5">{item.metric}</p>
                </div>
                <div>
                  <p className="text-white font-bold">{item.name}</p>
                  <p className="text-white/45 text-sm">{item.role} - {item.region}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-[#7CCB6A]/25 bg-[#08110B] p-7 md:p-10 grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-8 items-center">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 text-[#7CCB6A] text-[11px] font-bold uppercase tracking-widest">
              <Smartphone size={16} /> Mobile First
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Book and track from your phone</h2>
            <p className="text-white/65 text-lg leading-relaxed max-w-3xl">
              Enter route, check rates, book, and track from the field, mandi, warehouse, or buyer gate. The workflow is designed for low-network environments and syncs when connection returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="h-12 px-5 bg-white text-black font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                Android App
              </button>
              <button className="h-12 px-5 border border-white/20 text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                iOS Coming Soon
              </button>
            </div>
          </div>
          <div className="w-full aspect-square max-w-[220px] mx-auto border border-white/10 bg-black/40 flex flex-col items-center justify-center gap-4">
            <QrCode size={88} className="text-[#D9A441]" />
            <p className="text-[10px] text-white/45 uppercase tracking-widest text-center px-6">QR code placeholder</p>
          </div>
        </section>

        <section className="space-y-8">
          <SectionHeader
            eyebrow="FAQs & Coverage"
            title="Frequently asked questions"
            copy="Plain-language answers for booking teams, farmers, dispatchers, and vehicle owners."
          />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
            <FAQAccordion />
            <div className="border border-white/10 bg-[#071009] p-6 h-fit">
              <h3 className="text-xl font-bold text-white mb-5">Popular agri logistics routes</h3>
              <div className="flex flex-wrap gap-2">
                {popularBelts.map((belt) => (
                  <span key={belt} className="border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/65">
                    {belt}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 pt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Make logistics part of the agriculture OS.</h2>
            <p className="text-white/55 mt-2">Connect movement with procurement, storage, quality, finance, and settlement.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" onClick={() => navigate('/signin')} className="bg-[#D9A441] hover:bg-[#f0bd56] text-black uppercase font-bold tracking-wider px-7">
              Start Booking
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/supply-crm')} className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider px-7">
              Open Supply CRM
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};
