import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/src/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/src/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
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
      <div className="pt-40 flex flex-col items-center gap-8">
        <p className="mono text-xs uppercase tracking-widest text-white/40">Authentication required for OS Parameter Configuration</p>
        <Button onClick={() => navigate('/signin')} className="h-14 px-12">Initialize Sign-In</Button>
      </div>
    );
  }

  return (
    <div className="pt-32 px-10 min-h-screen bg-background text-white pb-32">
      <h1 className="display text-6xl font-black uppercase tracking-tighter mb-4">
        {t('configure')}<span className="text-primary">.</span>
      </h1>
      <p className="text-foreground-muted uppercase tracking-[3px] text-sm">Configure your Digital Orchard Identity</p>
      
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
              <span className="mono text-[10px] uppercase tracking-[4px] text-primary">Synchronizing Portals...</span>
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
              <h2 className="text-2xl font-black uppercase tracking-tight">Basic Specification</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full bg-background border border-white/10 h-14 px-4 focus:border-primary outline-none" 
                    placeholder="e.g., Ramesh Patel" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">Region (State)</label>
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
              <Button onClick={nextStep} disabled={!fullName} className="w-full h-14 text-xs font-black uppercase tracking-widest">Next Phase →</Button>
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
              <h2 className="text-2xl font-black uppercase tracking-tight">Select Architecture Role</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'farmer', icon: '👨‍🌾', label: 'Farmer' },
                  { id: 'vendor', icon: '🛒', label: 'Vendor / Buyer' },
                  { id: 'logistics', icon: '🚛', label: 'Logistics Partner' },
                  { id: 'government', icon: '🏛️', label: 'Government / Researcher' }
                ].map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => { setRole(item.id as any); nextStep(); }}
                    className={`flex items-center gap-6 p-6 border transition-all text-left group ${role === item.id ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/[0.02] hover:border-primary/50'}`}
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <span className="mono text-sm font-black uppercase tracking-widest group-hover:text-primary transition-colors">{item.label}</span>
                  </button>
                ))}
              </div>
              <Button onClick={prevStep} variant="ghost" className="w-full h-14 text-[10px] uppercase font-bold text-white/40">← Back</Button>
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
              <h2 className="text-2xl font-black uppercase tracking-tight">{role?.toUpperCase()} Implementation</h2>
              
              <div className="space-y-6">
                {role === 'farmer' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">Farm Location (Village/District)</label>
                      <input 
                        value={village}
                        onChange={e => setVillage(e.target.value)}
                        className="w-full bg-background border border-white/10 h-14 px-4 outline-none" 
                        placeholder="e.g., Lasalgaon, Nashik" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">Land Area (hectares)</label>
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
                      <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">Main Crops (comma separated)</label>
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
                      <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">Commodities you buy</label>
                      <input className="w-full bg-background border border-white/10 h-14 px-4 outline-none" placeholder="Onion, Potato, Rice" />
                    </div>
                  </>
                )}

                {(role === 'government' || role === 'logistics') && (
                  <p className="text-sm text-foreground-muted italic">Identifying systemic architecture parameters for public data analysis...</p>
                )}
              </div>

              <div className="flex gap-4">
                <Button onClick={prevStep} variant="outline" className="flex-1 h-14">Back</Button>
                <Button 
                  onClick={() => {
                    if (role === 'farmer' || role === 'vendor') nextStep();
                    else handleComplete();
                  }}
                  disabled={isSubmitting}
                  className="flex-[2] h-14 font-black uppercase tracking-widest"
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
              <h2 className="text-2xl font-black uppercase tracking-tight">B2B Export Readiness</h2>
              <p className="text-sm text-foreground-muted font-light leading-relaxed">Enable global supply features and institutional offtake agreements by providing your export details.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">IEC Code (Import Export Code)</label>
                  <input className="w-full bg-background border border-white/10 h-14 px-4 outline-none focus:border-primary" placeholder="e.g., 0123456789" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">Active Certifications</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['GlobalG.A.P.', 'Organic', 'Fair Trade', 'ISO 22000'].map(cert => (
                      <div key={cert} className="flex items-center gap-3 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer">
                        <div className="w-4 h-4 border border-primary/40 rounded-sm" />
                        <span className="mono text-[10px] uppercase font-bold text-white/60">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-foreground-muted uppercase tracking-[2px]">Primary Destination Focus</label>
                  <select className="w-full bg-background border border-white/10 h-14 px-4 outline-none appearance-none focus:border-primary" title="Export Destination">
                    <option>United Arab Emirates</option>
                    <option>European Union</option>
                    <option>United States</option>
                    <option>Southeast Asia</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={prevStep} variant="outline" className="flex-1 h-14">Back</Button>
                <Button 
                  onClick={handleComplete}
                  disabled={isSubmitting}
                  className="flex-[2] h-14 font-black uppercase tracking-widest"
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
