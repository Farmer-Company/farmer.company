import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/src/lib/authStore';
import { useLanguage } from '@/src/lib/languageStore';
import { userService, farmerService } from '@/src/lib/os-services';
import { UserRole } from '@/src/lib/os-types';

export const ConfigurePage = () => {
 const { t } = useLanguage();
 const { user, profile } = useAuth();
 const navigate = useNavigate();
 const [step, setStep] = useState(1);
 const [role, setRole] = useState<UserRole | ''>('');
 const [isSubmitting, setIsSubmitting] = useState(false);

 // Form State
 const [fullName, setFullName] = useState('');
 const [state, setState] = useState('Tamil Nadu');
 const [village, setVillage] = useState('');
 const [landArea, setLandArea] = useState(0);
 const [crops, setCrops] = useState('');

 useEffect(() => {
 if (profile) {
 setFullName(profile.fullName);
 setState(profile.region_state || 'Tamil Nadu');
 setRole(profile.role);
 }
 }, [profile]);

 const nextStep = () => setStep(prev => prev + 1);
 const prevStep = () => setStep(prev => prev - 1);

 const handleComplete = async () => {
 if (!user || !role) return;
 setIsSubmitting(true);
 try {
 await userService.create({
 uid: user.uid,
 email: user.email || '',
 fullName,
 role: role as UserRole,
 region_state: state,
 createdAt: new Date().toISOString()
 });

 if (role === 'farmer') {
 await farmerService.saveProfile({
 userId: user.uid,
 farm_name: `${fullName}'s Farm`,
 land_area: landArea,
 village,
 district: 'TBD',
 state,
 pincode: '000000'
 });
 }

 navigate('/');
 } catch (error) {
 console.error("Configuration failed", error);
 } finally {
 setIsSubmitting(false);
 }
 };

 if (!user) {
 return (
 <div className="pt-40 flex flex-col items-center gap-8 px-6 text-center">
 <div className="space-y-4 max-w-2xl">
 <h2 className="text-2xl font-medium normal-case tracking-tight text-white">OS Parameter Configuration</h2>
 <p className="text-foreground-muted leading-relaxed">
 Personalise your Digital Orchard operating environment — commodity watchlists, regional alerts, price threshold notifications, forecast subscriptions, and logistics route preferences.
 </p>
 <p className="mono text-[10px] normal-case text-white/40 pt-4">Sign in or create your beta account to access configuration.</p>
 </div>
 <Button onClick={() => navigate('/signin')} className="h-14 px-12 mt-4">Initialize Sign-In</Button>
 </div>
 );
 }

 return (
 <div className="pt-32 px-10 min-h-screen bg-background text-white pb-32">
 <h1 className="display text-6xl font-light normal-case tracking-tight mb-4">
 {t('configure')}<span className="text-primary">.</span>
 </h1>
 <p className="text-foreground-muted normal-case text-sm">Configure your Digital Orchard Identity</p>
 
 <div className="mt-12 max-w-2xl bg-[#0D0D0D] border border-white/5 p-12 overflow-hidden relative">
 <AnimatePresence>
 {isSubmitting && (
 <motion.div 
 initial={{ opacity: 0 }} animate={{ opacity: 1 }}
 className="absolute inset-0 z-50 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
 >
 <div className="w-12 h-1 bg-white/10 overflow-hidden">
 <motion.div 
 initial={{ x: '-100%' }} animate={{ x: '100%' }}
 transition={{ repeat: Infinity, duration: 1 }}
 className="w-full h-full bg-primary"
 />
 </div>
 <span className="mono text-[10px] normal-case text-primary">Synchronizing Portals...</span>
 </motion.div>
 )}
 </AnimatePresence>

 <div className="flex justify-between mb-12">
 {[1, 2, 3, 4].map(i => (
 <div key={i} className={`h-1 flex-1 mx-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-primary' : 'bg-white/10'}`} />
 ))}
 </div>

 <AnimatePresence mode="wait">
 {step === 1 && (
 <motion.div 
 key="step1"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="space-y-8"
 >
 <h2 className="text-2xl font-medium normal-case tracking-tight">Basic Specification</h2>
 <div className="space-y-6">
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">Full Name</label>
 <input 
 type="text" 
 value={fullName}
 onChange={e => setFullName(e.target.value)}
 className="w-full bg-background border border-white/10 h-14 px-4 focus:border-primary outline-none" 
 placeholder="e.g., Ramesh Patel" 
 />
 </div>
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">Region (State)</label>
 <select 
 value={state}
 onChange={e => setState(e.target.value)}
 className="w-full bg-background border border-white/10 h-14 px-4 focus:border-primary outline-none appearance-none"
 title="Select State"
 >
 <option>Tamil Nadu</option>
 <option>Karnataka</option>
 <option>Maharashtra</option>
 </select>
 </div>
 </div>
 <Button onClick={nextStep} disabled={!fullName} className="w-full h-14 text-xs font-medium normal-case ">Next Phase →</Button>
 </motion.div>
 )}

 {step === 2 && (
 <motion.div 
 key="step2"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="space-y-8"
 >
 <h2 className="text-2xl font-medium normal-case tracking-tight">Select Architecture Role</h2>
 <div className="grid grid-cols-1 gap-4">
 {[
 { id: 'farmer', icon: '👨‍🌾', label: 'Farmer' },
 { id: 'vendor', icon: '🛒', label: 'Retailer / Buyer / Vendor' },
 { id: 'logistics', icon: '🚛', label: 'Logistics Partner' },
 { id: 'government', icon: '🏛️', label: 'Government / Researcher' }
 ].map(item => (
 <button 
 key={item.id} 
 onClick={() => { setRole(item.id as any); nextStep(); }}
 className={`flex items-center gap-6 p-6 border transition-all text-left group ${role === item.id ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/[0.02] hover:border-primary/50'}`}
 >
 <span className="text-3xl">{item.icon}</span>
 <span className="mono text-sm font-medium normal-case group-hover:text-primary transition-colors">{item.label}</span>
 </button>
 ))}
 </div>
 <Button onClick={prevStep} variant="ghost" className="w-full h-14 text-[10px] normal-case font-medium text-white/40">← Back</Button>
 </motion.div>
 )}

 {step === 3 && (
 <motion.div 
 key="step3"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="space-y-8"
 >
 <h2 className="text-2xl font-medium normal-case tracking-tight">{role?.toUpperCase()} Implementation</h2>
 
 <div className="space-y-6">
 {role === 'farmer' && (
 <>
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">Farm Location (Village/District)</label>
 <input 
 value={village}
 onChange={e => setVillage(e.target.value)}
 className="w-full bg-background border border-white/10 h-14 px-4 outline-none" 
 placeholder="e.g., Lasalgaon, Nashik" 
 />
 </div>
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">Land Area (hectares)</label>
 <input 
 type="number" 
 value={landArea}
 onChange={e => setLandArea(Number(e.target.value))}
 className="w-full bg-background border border-white/10 h-14 px-4 outline-none" 
 title="Land Area in Hectares"
 placeholder="e.g., 5.5"
 />
 </div>
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">Main Crops (comma separated)</label>
 <input 
 value={crops}
 onChange={e => setCrops(e.target.value)}
 className="w-full bg-background border border-white/10 h-14 px-4 outline-none" 
 placeholder="Onion, Tomato, Wheat" 
 />
 </div>
 </>
 )}

 {role === 'vendor' && (
 <>
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">Commodities you procure</label>
 <input className="w-full bg-background border border-white/10 h-14 px-4 outline-none" placeholder="Onion, Potato, Rice" />
 </div>
 </>
 )}

 {(role === 'government' || role === 'logistics') && (
 <p className="text-sm text-foreground-muted italic">Identifying systemic architecture parameters for public data analysis...</p>
 )}
 </div>

 <div className="flex gap-4">
 <Button onClick={prevStep} variant="secondary" className="flex-1 h-14">Back</Button>
 <Button 
 onClick={() => {
 if (role === 'farmer' || role === 'vendor') nextStep();
 else handleComplete();
 }}
 disabled={isSubmitting}
 className="flex-[2] h-14 font-medium normal-case "
 >
 {role === 'farmer' || role === 'vendor' ? 'Next: B2B Config →' : 'Complete Implementation →'}
 </Button>
 </div>
 </motion.div>
 )}

 {step === 4 && (
 <motion.div 
 key="step4"
 initial={{ opacity: 0, x: 20 }}
 animate={{ opacity: 1, x: 0 }}
 exit={{ opacity: 0, x: -20 }}
 className="space-y-8"
 >
 <h2 className="text-2xl font-medium normal-case tracking-tight">B2B Export Readiness</h2>
 <p className="text-sm text-foreground-muted font-light leading-relaxed">Enable global supply features and institutional offtake agreements by providing your export details.</p>
 
 <div className="space-y-6">
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">IEC Code (Import Export Code)</label>
 <input className="w-full bg-background border border-white/10 h-14 px-4 outline-none focus:border-primary" placeholder="e.g., 0123456789" />
 </div>
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">Active Certifications</label>
 <div className="grid grid-cols-2 gap-3">
 {['GlobalG.A.P.', 'Organic', 'Fair Trade', 'ISO 22000'].map(cert => (
 <div key={cert} className="flex items-center gap-3 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
 <div className="w-4 h-4 border border-primary/40 rounded-sm" />
 <span className="mono text-[10px] normal-case font-medium text-white/60">{cert}</span>
 </div>
 ))}
 </div>
 </div>
 <div className="space-y-2">
 <label className="text-[10px] font-medium text-foreground-muted normal-case ">Primary Destination Focus</label>
 <select className="w-full bg-background border border-white/10 h-14 px-4 outline-none appearance-none focus:border-primary" title="Export Destination">
 <option>United Arab Emirates</option>
 <option>European Union</option>
 <option>United States</option>
 <option>Southeast Asia</option>
 </select>
 </div>
 </div>

 <div className="flex gap-4">
 <Button onClick={prevStep} variant="secondary" className="flex-1 h-14">Back</Button>
 <Button 
 onClick={handleComplete}
 disabled={isSubmitting}
 className="flex-[2] h-14 font-medium normal-case "
 >
 Finalize B2B OS →
 </Button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 </div>
 );
};
