import React from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle,
  ClipboardCheck,
  CreditCard,
  FileText,
  Filter,
  MapPin,
  PackageCheck,
  ReceiptText,
  Repeat,
  Search,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const featureGroups = [
  {
    title: 'Must-Have',
    items: [
      'Business onboarding with KYC, GST, store type, and procurement categories.',
      'SKU search with location, DIGIPIN, district, quality grade, MOQ, and delivery window filters.',
      'Bulk order scheduling with reorder, delivery tracking, invoices, and issue resolution.',
      'Verified producer badges, transparent pricing, logistics SLA status, and digital invoices.',
    ],
  },
  {
    title: 'Should-Have',
    items: [
      'Saved supplier lists for repeat procurement.',
      'Credit and payment terms for trusted MSME buyers.',
      'Low-bandwidth catalog mode with recent searches cached locally.',
      'Ratings and reviews for producers, logistics partners, and fulfilled lots.',
    ],
  },
  {
    title: 'Nice-to-Have',
    items: [
      'Auto-replenishment rules for restaurants, stores, and office buyers.',
      'Brand and supplier recommendations based on past orders.',
      'WhatsApp and SMS order summaries for mixed-literacy teams.',
      'Multi-location procurement planning for chains and franchises.',
    ],
  },
];

const benefitCards = [
  {
    icon: <Search size={20} />,
    title: 'Find verified supply',
    copy: 'Search farm lots, FPO supply, and processor inventory by SKU, quality grade, location, and serviceability.',
  },
  {
    icon: <Repeat size={20} />,
    title: 'Run repeat orders',
    copy: 'Reorder common baskets for stores, kitchens, restaurants, offices, and MSME procurement teams.',
  },
  {
    icon: <Truck size={20} />,
    title: 'Use connected logistics',
    copy: 'Coordinate first-mile pickup, cold-chain, warehousing, and last-mile movement from the same order desk.',
  },
  {
    icon: <ReceiptText size={20} />,
    title: 'Keep invoices clean',
    copy: 'Track invoices, payment terms, credits, delivery exceptions, and issue resolution in one place.',
  },
];

const screenFlows = [
  {
    title: 'Stakeholder landing page',
    icon: <Building2 size={18} />,
    rows: [
      'Hero: "Source farm supply in bulk." with role-specific CTA.',
      'Location field: PIN, DIGIPIN, district, or map selection.',
      'Benefit strip: verified supply, repeat orders, logistics, invoices.',
      'Trust band: verified producers, transparent pricing, SLA-backed logistics.',
      'CTA: create retailer / MSME procurement profile.',
    ],
  },
  {
    title: 'Onboarding flow',
    icon: <ClipboardCheck size={18} />,
    rows: [
      'Step 1: business name, contact, role, GST or local business ID.',
      'Step 2: business type: kirana, supermarket, restaurant, caterer, processor, office buyer.',
      'Step 3: preferred categories, buying frequency, delivery locations.',
      'Step 4: KYC documents, invoice preferences, credit request, language.',
      'Confirmation: show next actions and procurement desk link.',
    ],
  },
  {
    title: 'Catalog and search page',
    icon: <Filter size={18} />,
    rows: [
      'Search bar with SKU, commodity, variety, grade, farmer/FPO, and district support.',
      'Filters: quality grade, MOQ, delivery window, distance, verified badge, logistics SLA.',
      'Result cards: price, freshness, quantity, source, location confidence, available dates.',
      'Actions: compare, save supplier, request quote, schedule order.',
      'Low-bandwidth mode: compact list, cached recent searches, minimal media.',
    ],
  },
  {
    title: 'Order management dashboard',
    icon: <PackageCheck size={18} />,
    rows: [
      'Tabs: active orders, scheduled orders, past orders, invoices, issues.',
      'Reorder button for frequent baskets and supplier combinations.',
      'Delivery tracker with pickup, in-transit, warehouse, delivered, exception states.',
      'Invoice and credit panel with due dates, payment method, and dispute status.',
      'Issue resolution: missing quantity, quality mismatch, late delivery, document correction.',
    ],
  },
];

const trustItems = [
  { icon: <ShieldCheck size={18} />, label: 'Verified producer badges' },
  { icon: <Star size={18} />, label: 'Ratings and reviews' },
  { icon: <MapPin size={18} />, label: 'PIN / DIGIPIN serviceability' },
  { icon: <FileText size={18} />, label: 'Transparent invoice trail' },
  { icon: <CalendarClock size={18} />, label: 'Delivery SLA visibility' },
  { icon: <CreditCard size={18} />, label: 'Credit and payment terms' },
];

const taglines = [
  'Bulk farm supply, ready for retail.',
  'Source, schedule, and move produce in one desk.',
  'Verified supply for stores, kitchens, and MSMEs.',
];

export const RetailersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto space-y-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-7"
        >
          <span className="text-[#C084FC] text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
            FOR RETAILERS, BULK BUYERS & MSMES
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
            Source farm supply.<br />
            <span className="text-[#C084FC]">Run repeat procurement.</span>
          </h1>
          <p className="max-w-3xl text-white/60 text-lg leading-relaxed">
            For kirana stores, supermarkets, restaurants, processors, caterers, institutional buyers, and Instacart Business-style B2B purchasers who need consistent, traceable farm supply in bulk with integrated logistics and digital invoices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => navigate('/signin')} className="uppercase font-bold tracking-wider rounded-full px-8 flex items-center justify-center gap-2 bg-[#C084FC] hover:bg-[#a855f7] text-black">
              Create retailer profile <ArrowRight size={16} />
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/prices')} className="border-white/20 text-white hover:bg-white/5 uppercase font-bold tracking-wider rounded-full px-8">
              Browse supply signals
            </Button>
          </div>
        </motion.div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {benefitCards.map((item) => (
            <div key={item.title} className="bg-[#050505] border border-white/10 p-7 rounded-lg">
              <div className="w-11 h-11 rounded-full bg-[#C084FC]/10 border border-[#C084FC]/30 flex items-center justify-center text-[#C084FC] mb-5">
                {item.icon}
              </div>
              <h2 className="text-white font-bold text-lg mb-3">{item.title}</h2>
              <p className="text-white/55 text-sm leading-relaxed">{item.copy}</p>
            </div>
          ))}
        </section>

        <section className="border-t border-white/10 pt-12 space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Feature priority</h2>
            <p className="text-white/50 mt-3 leading-relaxed">
              The retailer and MSME experience should stay simple at the surface while supporting serious procurement, delivery, invoice, and credit workflows underneath.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featureGroups.map((group) => (
              <div key={group.title} className="bg-[#050505] border border-white/10 p-7 rounded-lg">
                <h3 className="text-[#C084FC] text-sm font-bold uppercase tracking-widest mb-5">{group.title}</h3>
                <ul className="space-y-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/65 text-sm leading-relaxed">
                      <CheckCircle size={16} className="text-[#C084FC] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/10 pt-12 space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Screen blueprint</h2>
            <p className="text-white/50 mt-3 leading-relaxed">
              These screens create a web-first workflow from discovery to repeat procurement. Each step should work on desktop and mobile, with compact copy and progressive disclosure.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {screenFlows.map((flow) => (
              <div key={flow.title} className="bg-[#050505] border border-white/10 p-7 rounded-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#C084FC]/10 border border-[#C084FC]/30 flex items-center justify-center text-[#C084FC]">
                    {flow.icon}
                  </div>
                  <h3 className="text-white font-bold text-xl">{flow.title}</h3>
                </div>
                <ol className="space-y-4">
                  {flow.rows.map((row, index) => (
                    <li key={row} className="flex gap-3 text-white/60 text-sm leading-relaxed">
                      <span className="text-[#C084FC] font-mono text-xs pt-0.5">{String(index + 1).padStart(2, '0')}</span>
                      <span>{row}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8 border-t border-white/10 pt-12">
          <div className="bg-[#111] border border-white/10 p-8 md:p-10 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C084FC] to-transparent opacity-60" />
            <h2 className="text-2xl font-bold text-white mb-4">Location-first procurement</h2>
            <p className="text-white/55 leading-relaxed mb-7">
              A single location field should support PIN, DIGIPIN, map selection, and district search. The result should explain what the location unlocks: available farmers, logistics partners, delivery windows, and serviceability confidence.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['PIN / DIGIPIN', 'District', 'Map pin'].map((label) => (
                <div key={label} className="border border-white/10 bg-black/40 p-4 rounded-lg">
                  <MapPin size={18} className="text-[#C084FC] mb-3" />
                  <p className="text-white font-bold text-sm">{label}</p>
                  <p className="text-white/40 text-xs mt-2">Validate serviceability instantly.</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#050505] border border-white/10 p-8 md:p-10 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Trust and governance</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trustItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3 border border-white/10 bg-white/[0.02] p-4 rounded-lg">
                  <div className="text-[#C084FC]">{item.icon}</div>
                  <span className="text-white/70 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Copy system</h2>
              <p className="text-white/50 mt-3 leading-relaxed">
                Use neutral, translatable language. Keep labels short enough for Hindi, Tamil, and other regional-language expansion.
              </p>
            </div>
            <div className="space-y-5">
              {taglines.map((tagline) => (
                <div key={tagline} className="border border-white/10 bg-[#050505] p-5 rounded-lg">
                  <p className="text-white font-bold text-lg">{tagline}</p>
                </div>
              ))}
              <div className="border border-[#C084FC]/30 bg-[#C084FC]/5 p-6 rounded-lg">
                <p className="text-white/80 leading-relaxed">
                  Discover verified farmer supply, compare bulk lots by location and quality, schedule delivery, and manage digital invoices from one procurement desk built for retailers, restaurants, processors, caterers, and MSMEs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border border-white/10 bg-[#050505] p-8 md:p-10 rounded-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 text-[#FBBF24] mb-4">
              <AlertTriangle size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Beta workflow</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Start with assisted procurement.</h2>
            <p className="text-white/50 mt-3 max-w-2xl">
              The first release can route high-intent retailer and MSME requests to the operations team while catalog, credit, and logistics automation mature.
            </p>
          </div>
          <Button size="lg" onClick={() => navigate('/signin')} className="uppercase font-bold tracking-wider rounded-full px-8 flex items-center justify-center gap-2 bg-[#C084FC] hover:bg-[#a855f7] text-black">
            Join procurement beta <ArrowRight size={16} />
          </Button>
        </section>
      </div>
    </div>
  );
};
