import React, { useEffect, useMemo, useState } from 'react';
import {
 BellRing,
 CheckCircle2,
 Clock3,
 DatabaseZap,
 MapPin,
 Send,
 ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/src/lib/AuthContext';
import { commodities } from '@/src/data/commodities';
import { markets } from '@/src/data/markets';
import { Button } from '@/components/ui/button';
import {
 createCommodityInterest,
 type CommodityInterestFeedStatus,
 type CommodityInterestIntent,
} from '@/src/lib/commodityInterests';

type InterestFormState = {
 commodityName: string;
 selectedState: string;
 selectedDistrict: string;
 intentType: CommodityInterestIntent;
 volumeBand: string;
 contactName: string;
 organization: string;
 email: string;
 phone: string;
 notes: string;
};

type SubmissionResult = {
 id: string;
 persistence: 'firestore' | 'local';
 message: string;
};

const pilotCommodityNames = new Set(['Coconut', 'Tomato', 'Onion', 'Banana']);

const intentOptions: { value: CommodityInterestIntent; label: string }[] = [
 { value: 'sell', label: 'Sell crop' },
 { value: 'buy', label: 'Procure crop' },
 { value: 'monitor', label: 'Track prices' },
 { value: 'research', label: 'Research coverage' },
];

const volumeBands = [
 'Under 5 MT',
 '5-25 MT',
 '25-100 MT',
 '100+ MT',
 'Monitoring only',
];

const getBrowserField = (
 field: 'href' | 'referrer' | 'userAgent' | 'locale' | 'timezone' | 'screenSize'
) => {
 if (typeof window === 'undefined') {
 return '';
 }

 if (field === 'href') {
 return window.location.href.slice(0, 500);
 }

 if (field === 'referrer') {
 return document.referrer.slice(0, 500);
 }

 if (field === 'userAgent') {
 return navigator.userAgent.slice(0, 300);
 }

 if (field === 'locale') {
 return navigator.language.slice(0, 40);
 }

 if (field === 'timezone') {
 return Intl.DateTimeFormat().resolvedOptions().timeZone.slice(0, 80);
 }

 return `${window.innerWidth}x${window.innerHeight}`.slice(0, 40);
};

export const PricesPage = () => {
 const { user, profile } = useAuth();
 const [form, setForm] = useState<InterestFormState>({
 commodityName: '',
 selectedState: '',
 selectedDistrict: '',
 intentType: 'monitor',
 volumeBand: 'Monitoring only',
 contactName: '',
 organization: '',
 email: '',
 phone: '',
 notes: '',
 });
 const [submission, setSubmission] = useState<SubmissionResult | null>(null);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const states = useMemo(
 () => [...new Set(markets.map((market) => market.State))].sort(),
 []
 );
 const districts = useMemo(() => {
 const filteredMarkets = form.selectedState
 ? markets.filter((market) => market.State === form.selectedState)
 : markets;

 return [...new Set(filteredMarkets.map((market) => market.District))].sort();
 }, [form.selectedState]);

 const selectedCommodity = useMemo(
 () => commodities.find((commodity) => commodity.name === form.commodityName),
 [form.commodityName]
 );

 const matchedMarkets = useMemo(() => {
 return markets.filter((market) => {
 const matchesState = !form.selectedState || market.State === form.selectedState;
 const matchesDistrict =
 !form.selectedDistrict || market.District === form.selectedDistrict;
 return matchesState && matchesDistrict;
 });
 }, [form.selectedDistrict, form.selectedState]);

 const feedStatus: CommodityInterestFeedStatus =
 form.selectedState === 'Tamil Nadu' && pilotCommodityNames.has(form.commodityName)
 ? 'pilot_validation'
 : 'queued';

 useEffect(() => {
 setForm((current) => ({
 ...current,
 contactName: current.contactName || profile?.fullName || '',
 email: current.email || user?.email || profile?.email || '',
 phone: current.phone || user?.phoneNumber || '',
 selectedState: current.selectedState || profile?.region_state || '',
 selectedDistrict: current.selectedDistrict || profile?.region_district || '',
 }));
 }, [profile, user]);

 const updateField = <K extends keyof InterestFormState>(
 field: K,
 value: InterestFormState[K]
 ) => {
 setSubmission(null);
 setForm((current) => ({
 ...current,
 [field]: value,
 ...(field === 'selectedState' ? { selectedDistrict: '' } : {}),
 }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);

 const savedInterest = await createCommodityInterest({
 commodityName: form.commodityName.trim(),
 commodityCode: selectedCommodity?.code || '',
 state: form.selectedState,
 district: form.selectedDistrict,
 intentType: form.intentType,
 volumeBand: form.volumeBand,
 contactName: form.contactName.trim(),
 organization: form.organization.trim(),
 email: form.email.trim(),
 phone: form.phone.trim(),
 notes: form.notes.trim(),
 source: 'prices_page',
 userId: user?.uid || null,
 feedStatus,
 pageUrl: getBrowserField('href'),
 referrer: getBrowserField('referrer'),
 userAgent: getBrowserField('userAgent'),
 locale: getBrowserField('locale'),
 timezone: getBrowserField('timezone'),
 screenSize: getBrowserField('screenSize'),
 });

 setSubmission({
 id: savedInterest.id,
 persistence: savedInterest.persistence,
 message:
 savedInterest.persistence === 'firestore'
 ? 'Interest captured for ops follow-up. We will prioritize this commodity-region pair as source validation completes.'
 : `Interest saved on this device because the Firebase write did not complete.${savedInterest.failureReason ? ` Reason: ${savedInterest.failureReason}` : ''}`,
 });
 setIsSubmitting(false);
 };

 return (
 <div className="pt-32 px-6 md:px-10 min-h-screen bg-background text-white pb-24">
 <div className="max-w-6xl mx-auto space-y-14">
 <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-end">
 <div className="space-y-6">
 <span className="text-primary text-[11px] font-bold uppercase tracking-widest">
 Commodity price intelligence
 </span>
 <h1 className="text-[40px] md:text-[56px] font-semibold leading-none">
 Prices<span className="text-primary">.</span>
 </h1>
 <div className="text-foreground-muted space-y-4 text-[17px] leading-[1.47] max-w-3xl">
 <p className="font-semibold text-white">
 Verified price intelligence across active market nodes is in source validation.
 </p>
 <p>
 Agmarknet and state-market feeds are being checked against source timestamps
 before prices are shown. Until a commodity-region pair clears validation, this
 page captures real demand signals for the ops queue instead of publishing
 synthetic prices.
 </p>
 <p>
 Submit the commodity you care about and the follow-up channel your team
 actually uses. The record includes region, intent, volume band, and page
 metadata so coverage can be prioritized cleanly.
 </p>
 </div>
 </div>

 <div className="border border-white/10 bg-[#050505] p-6 rounded-sm space-y-5">
 <div className="flex items-start gap-4">
 <div className="h-11 w-11 border border-primary/30 bg-primary/10 flex items-center justify-center shrink-0">
 <ShieldCheck size={20} className="text-primary" />
 </div>
 <div>
 <p className="text-sm font-semibold text-white">No unverified price prints</p>
 <p className="text-sm text-white/55 leading-relaxed mt-1">
 Ops sees each request with commodity code, market coverage, user context, and
 browser source metadata.
 </p>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-3">
 <div className="border border-white/10 bg-black px-4 py-4 rounded-sm">
 <p className="text-[10px] text-white/40 uppercase tracking-widest">
 Mapped markets
 </p>
 <p className="text-2xl font-semibold text-primary mt-2">
 {markets.length.toLocaleString()}
 </p>
 </div>
 <div className="border border-white/10 bg-black px-4 py-4 rounded-sm">
 <p className="text-[10px] text-white/40 uppercase tracking-widest">
 Commodity codes
 </p>
 <p className="text-2xl font-semibold text-primary mt-2">
 {commodities.length.toLocaleString()}
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
 <form
 onSubmit={handleSubmit}
 className="bg-[#050505] border border-white/10 p-6 md:p-8 rounded-sm space-y-7"
 >
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-b border-white/10 pb-6">
 <div>
 <h2 className="text-2xl font-semibold text-white">
 Capture commodity interest
 </h2>
 <p className="text-sm text-white/55 leading-relaxed mt-2 max-w-2xl">
 This creates a Firebase-backed ops lead for validation, pricing coverage, or
 trade follow-up.
 </p>
 </div>
 {submission && (
 <div className="border border-primary/25 bg-primary/10 px-4 py-3 rounded-sm text-sm text-primary flex items-start gap-3 max-w-md">
 <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
 <span>{submission.message}</span>
 </div>
 )}
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">Commodity</label>
 <select
 required
 title="Commodity"
 value={form.commodityName}
 onChange={(e) => updateField('commodityName', e.target.value)}
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-white/85 cursor-pointer transition-colors"
 >
 <option value="" className="bg-[#0D0D0D]">
 Select commodity
 </option>
 {commodities.map((commodity) => (
 <option key={commodity.code} value={commodity.name} className="bg-[#0D0D0D]">
 {commodity.name} ({commodity.code})
 </option>
 ))}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">State / region</label>
 <select
 required
 title="State or region"
 value={form.selectedState}
 onChange={(e) => updateField('selectedState', e.target.value)}
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-white/85 cursor-pointer transition-colors"
 >
 <option value="" className="bg-[#0D0D0D]">
 Select state / region
 </option>
 {states.map((state) => (
 <option key={state} value={state} className="bg-[#0D0D0D]">
 {state}
 </option>
 ))}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">District</label>
 <select
 title="District"
 value={form.selectedDistrict}
 onChange={(e) => updateField('selectedDistrict', e.target.value)}
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-white/85 cursor-pointer transition-colors"
 >
 <option value="" className="bg-[#0D0D0D]">
 Any district
 </option>
 {districts.map((district) => (
 <option key={district} value={district} className="bg-[#0D0D0D]">
 {district}
 </option>
 ))}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">Interest type</label>
 <select
 required
 title="Interest type"
 value={form.intentType}
 onChange={(e) =>
 updateField('intentType', e.target.value as CommodityInterestIntent)
 }
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-white/85 cursor-pointer transition-colors"
 >
 {intentOptions.map((option) => (
 <option key={option.value} value={option.value} className="bg-[#0D0D0D]">
 {option.label}
 </option>
 ))}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">Volume band</label>
 <select
 required
 title="Volume band"
 value={form.volumeBand}
 onChange={(e) => updateField('volumeBand', e.target.value)}
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-white/85 cursor-pointer transition-colors"
 >
 {volumeBands.map((volumeBand) => (
 <option key={volumeBand} value={volumeBand} className="bg-[#0D0D0D]">
 {volumeBand}
 </option>
 ))}
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">Contact name</label>
 <input
 required
 type="text"
 value={form.contactName}
 onChange={(e) => updateField('contactName', e.target.value)}
 placeholder="Name for ops follow-up"
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] transition-colors placeholder:text-white/30"
 />
 </div>
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">Organization</label>
 <input
 type="text"
 value={form.organization}
 onChange={(e) => updateField('organization', e.target.value)}
 placeholder="Farm, FPO, buyer, or team"
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] transition-colors placeholder:text-white/30"
 />
 </div>
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">Work email</label>
 <input
 required
 type="email"
 value={form.email}
 onChange={(e) => updateField('email', e.target.value)}
 placeholder="name@company.com"
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] transition-colors placeholder:text-white/30"
 />
 </div>
 <div className="space-y-2">
 <label className="text-[13px] font-medium text-white/60">Phone / WhatsApp</label>
 <input
 required
 type="tel"
 value={form.phone}
 onChange={(e) => updateField('phone', e.target.value)}
 placeholder="+91..."
 className="w-full bg-black border border-white/10 h-12 px-4 rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] transition-colors placeholder:text-white/30"
 />
 </div>
 <textarea
 value={form.notes}
 onChange={(e) => updateField('notes', e.target.value)}
 placeholder="Variety, grade, price window, delivery window, or source coverage needs."
 className="md:col-span-2 min-h-[130px] px-4 py-4 bg-black border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-[15px] text-white leading-relaxed rounded-sm placeholder:text-white/30 transition-all resize-y"
 />
 </div>

 <div className="border border-white/10 bg-black p-5 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-4">
 <StatusMetric
 icon={<MapPin size={17} />}
 label="Matched markets"
 value={matchedMarkets.length.toLocaleString()}
 helper={form.selectedDistrict || form.selectedState || 'Select a region'}
 />
 <StatusMetric
 icon={<DatabaseZap size={17} />}
 label="Feed status"
 value={feedStatus === 'pilot_validation' ? 'Validating' : 'Queued'}
 helper={
 feedStatus === 'pilot_validation'
 ? 'Source checks active'
 : 'Demand signal captured'
 }
 />
 <StatusMetric
 icon={<BellRing size={17} />}
 label="Ops route"
 value="Review"
 helper={submission ? `Lead ${submission.id.slice(0, 8)}` : 'Creates queue record'}
 />
 </div>

 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 border-t border-white/10 pt-6">
 <p className="text-xs text-white/45 leading-relaxed max-w-2xl">
 Live price cells stay closed until source timestamps and commodity mappings are
 verified. Captured interests are used for follow-up and prioritization, not
 displayed as market prices.
 </p>
 <Button type="submit" disabled={isSubmitting} className="h-12 px-7 gap-2">
 <Send size={16} />
 {isSubmitting ? 'Sending Interest' : 'Send Interest'}
 </Button>
 </div>
 </form>

 <aside className="space-y-5">
 <div className="border border-primary/25 bg-primary/10 p-6 rounded-sm">
 <div className="flex items-center gap-3 text-primary">
 <Clock3 size={19} />
 <span className="text-[11px] uppercase tracking-widest font-bold">
 Coverage snapshot
 </span>
 </div>
 <h3 className="text-2xl font-semibold text-white mt-5">
 Pilot validation is live for Tamil Nadu coconut, tomato, onion, and banana.
 </h3>
 <p className="text-sm text-white/60 leading-relaxed mt-3">
 Other commodity-region pairs are ranked by submitted interest, market volume,
 and source availability.
 </p>
 </div>

 <div className="border border-white/10 bg-[#050505] rounded-sm overflow-hidden">
 {[
 { name: 'Coconut', region: 'Tamil Nadu', status: 'Pilot validation' },
 { name: 'Tomato', region: 'Tamil Nadu', status: 'Pilot validation' },
 { name: 'Onion', region: 'Tamil Nadu', status: 'Pilot validation' },
 { name: 'Banana', region: 'Tamil Nadu', status: 'Pilot validation' },
 {
 name: 'All mapped commodities',
 region: 'All regions',
 status: 'Prioritized from interest',
 },
 ].map((row) => (
 <div
 key={`${row.name}-${row.region}`}
 className="grid grid-cols-[1fr_auto] gap-4 p-5 border-b border-white/5 last:border-b-0"
 >
 <div>
 <p className="text-[15px] font-medium text-white">{row.name}</p>
 <p className="text-xs text-white/45 mt-1">{row.region}</p>
 </div>
 <span className="text-[11px] text-primary uppercase tracking-widest font-bold self-center text-right">
 {row.status}
 </span>
 </div>
 ))}
 </div>

 <p className="mono text-[10px] text-white/40 normal-case leading-relaxed italic">
 Pilot validation means source data is being checked against timestamps,
 commodity aliases, and market coverage before publishing.
 </p>
 </aside>
 </div>
 </div>
 </div>
 );
};

const StatusMetric = ({
 icon,
 label,
 value,
 helper,
}: {
 icon: React.ReactNode;
 label: string;
 value: string;
 helper: string;
}) => (
 <div className="flex items-start gap-3">
 <div className="h-9 w-9 border border-primary/25 text-primary bg-primary/10 flex items-center justify-center shrink-0">
 {icon}
 </div>
 <div className="min-w-0">
 <p className="text-[10px] text-white/40 uppercase tracking-widest">{label}</p>
 <p className="text-lg font-semibold text-white mt-1 truncate">{value}</p>
 <p className="text-xs text-white/45 mt-1 truncate">{helper}</p>
 </div>
 </div>
);
