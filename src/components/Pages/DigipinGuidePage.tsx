import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clipboard,
  Crosshair,
  Layers3,
  MapPin,
  PackageCheck,
  Route,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  buildDigipinRepresentations,
  DIGIPIN_LEVELS,
  encodeDigipin,
  formatCellSize,
  formatDigipin,
} from '@/src/lib/digipin';

const useCases = [
  {
    icon: <MapPin size={20} />,
    title: 'Farm onboarding',
    copy: 'Attach a stable location code to a farm gate, plot, collection center, warehouse, or store.',
  },
  {
    icon: <Truck size={20} />,
    title: 'Pickup and routing',
    copy: 'Send logistics partners a precision level that matches the job: district for route planning, plot for pickup.',
  },
  {
    icon: <PackageCheck size={20} />,
    title: 'Order serviceability',
    copy: 'Check whether farmers, FPOs, warehouses, and retailers are inside the same procurement or delivery zone.',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Verification',
    copy: 'Store raw coordinates privately while sharing a shorter code for safer operational handoff.',
  },
];

const steps = [
  'Open the DIGIPIN Location control on any page and allow browser location access.',
  'Use the recommended code when the GPS accuracy is good enough for the selected precision.',
  'Share the formatted code with teams; store the raw code without hyphens in APIs or databases.',
  'Use shorter codes for discovery and longer codes only for pickup, warehouse, or inspection tasks.',
];

export const DigipinGuidePage = () => {
  const [lat, setLat] = useState('11.0168');
  const [lon, setLon] = useState('76.9558');
  const [length, setLength] = useState(8);
  const [copied, setCopied] = useState(false);

  const parsedLat = Number(lat);
  const parsedLon = Number(lon);
  const isValid = Number.isFinite(parsedLat) && Number.isFinite(parsedLon) && parsedLat >= -90 && parsedLat <= 90 && parsedLon >= -180 && parsedLon <= 180;

  const preview = useMemo(() => {
    if (!isValid) return null;
    const raw = encodeDigipin(parsedLat, parsedLon, length);
    return {
      raw,
      formatted: formatDigipin(raw),
      cellSize: formatCellSize(length, parsedLat),
      ladder: buildDigipinRepresentations(parsedLat, parsedLon),
    };
  }, [isValid, parsedLat, parsedLon, length]);

  const selectedLevel = DIGIPIN_LEVELS.find((item) => item.length === length) ?? DIGIPIN_LEVELS[4];

  const copyPreview = async () => {
    if (!preview) return;
    await navigator.clipboard.writeText(preview.formatted);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-28 pb-24 px-6">
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
        <div className="space-y-10">
          <div className="space-y-6">
            <span className="text-[#4ADE80] text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
              DIGIPIN ADDRESSING GUIDE
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter text-white leading-[1.05]" style={{ fontFamily: '"Inter", sans-serif' }}>
              One field code.<br />
              <span className="text-[#4ADE80]">Many precision levels.</span>
            </h1>
            <p className="max-w-3xl text-white/60 text-lg leading-relaxed">
              DIGIPIN converts latitude and longitude into a compact grid code. Digital Orchard uses it to represent farms, markets, warehouses, stores, delivery points, and logistics handoffs without forcing every workflow to expose raw coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {useCases.map((item) => (
              <div key={item.title} className="bg-[#050505] border border-white/10 p-6 rounded-lg">
                <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/25 text-primary flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h2 className="text-white font-semibold text-lg">{item.title}</h2>
                <p className="text-white/55 text-sm leading-relaxed mt-2">{item.copy}</p>
              </div>
            ))}
          </div>

          <section className="border-t border-white/10 pt-10">
            <h2 className="text-3xl font-bold tracking-tight mb-6">How to use it</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <div key={step} className="flex gap-4 bg-white/[0.02] border border-white/10 p-5 rounded-lg">
                  <span className="text-primary font-mono text-sm">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-white/65 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 pt-10">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Precision levels</h2>
            <div className="overflow-x-auto border border-white/10 rounded-lg bg-[#050505]">
              <table className="w-full min-w-[720px] text-left">
                <thead className="border-b border-white/10 text-[10px] uppercase tracking-widest text-white/45">
                  <tr>
                    <th className="p-4">Length</th>
                    <th className="p-4">Label</th>
                    <th className="p-4">Approx cell at sample latitude</th>
                    <th className="p-4">Use it for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {DIGIPIN_LEVELS.map((level) => (
                    <tr key={level.length} className={level.length === length ? 'bg-primary/[0.06]' : ''}>
                      <td className="p-4 text-primary font-mono">{level.length} chars</td>
                      <td className="p-4 text-white font-medium">{level.label}</td>
                      <td className="p-4 text-white/60 font-mono">{isValid ? formatCellSize(level.length, parsedLat) : '-'}</td>
                      <td className="p-4 text-white/55">{level.useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 bg-[#050505] border border-white/10 rounded-xl p-6 md:p-7 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/25 text-primary flex items-center justify-center">
              <Crosshair size={19} />
            </div>
            <div>
              <h2 className="text-white font-semibold">DIGIPIN preview</h2>
              <p className="text-white/40 text-xs">Try a sample farm coordinate.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <label className="flex flex-col gap-2">
              <span className="text-[10px] text-white/45 uppercase tracking-widest">Latitude</span>
              <input value={lat} onChange={(e) => setLat(e.target.value)} className="bg-black border border-white/10 rounded-lg h-11 px-3 text-white font-mono outline-none focus:border-primary" />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-[10px] text-white/45 uppercase tracking-widest">Longitude</span>
              <input value={lon} onChange={(e) => setLon(e.target.value)} className="bg-black border border-white/10 rounded-lg h-11 px-3 text-white font-mono outline-none focus:border-primary" />
            </label>
          </div>

          <label className="flex flex-col gap-2 mb-5">
            <span className="text-[10px] text-white/45 uppercase tracking-widest">Precision</span>
            <select value={length} onChange={(e) => setLength(Number(e.target.value))} className="bg-black border border-white/10 rounded-lg h-11 px-3 text-white outline-none focus:border-primary" title="Select DIGIPIN precision">
              {DIGIPIN_LEVELS.map((level) => (
                <option key={level.length} value={level.length}>{level.length} chars - {level.label}</option>
              ))}
            </select>
          </label>

          <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] text-white/45 uppercase tracking-widest">Formatted code</span>
                <p className="text-[28px] leading-none text-primary font-mono tracking-[0.16em] mt-3 break-all">
                  {preview ? preview.formatted : 'Invalid'}
                </p>
              </div>
              <button onClick={copyPreview} disabled={!preview} className="h-9 px-3 rounded-md bg-black/50 border border-white/10 hover:border-primary/40 text-white/70 hover:text-white disabled:opacity-40 transition-colors flex items-center gap-2 text-[11px]">
                {copied ? <CheckCircle2 size={14} className="text-primary" /> : <Clipboard size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 mt-4">
              <MiniStat label="Raw" value={preview?.raw ?? '-'} />
              <MiniStat label="Cell" value={preview?.cellSize ?? '-'} />
              <MiniStat label="Level" value={selectedLevel.label} />
              <MiniStat label="Length" value={`${length} chars`} />
            </div>
          </div>

          <div className="border border-white/10 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Layers3 size={15} className="text-primary" />
              <span className="text-[10px] text-white/45 uppercase tracking-widest">Same point, different precision</span>
            </div>
            <div className="space-y-2">
              {preview?.ladder.map((item) => (
                <div key={item.length} className={`grid grid-cols-[58px_1fr] gap-2 text-[11px] px-2 py-1.5 rounded ${item.length === length ? 'bg-primary/10 text-white' : 'text-white/45'}`}>
                  <span className={item.length === length ? 'text-primary' : ''}>{item.length} chars</span>
                  <span className="font-mono truncate">{item.formatted}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 h-11" onClick={() => setLength(8)}>
              Use plot level
            </Button>
            <Link to="/configure" className="flex-1">
              <Button variant="outline" className="w-full h-11 border-white/20 text-white hover:bg-white/5">
                Configure <ArrowRight size={15} />
              </Button>
            </Link>
          </div>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto mt-20 border border-primary/20 bg-primary/[0.03] rounded-xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl text-white font-semibold">Need this in a procurement flow?</h2>
          <p className="text-white/55 mt-2 max-w-2xl">
            Use DIGIPIN during onboarding, catalog filtering, delivery scheduling, warehouse dispatch, and serviceability checks.
          </p>
        </div>
        <Link to="/retailers">
          <Button className="h-12 px-6">
            See retailer workflow <Route size={16} />
          </Button>
        </Link>
      </section>
    </main>
  );
};

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0">
    <span className="text-[9px] text-white/35 uppercase tracking-widest block">{label}</span>
    <span className="text-[11px] text-white/75 font-mono leading-tight block mt-1 truncate">{value}</span>
  </div>
);
