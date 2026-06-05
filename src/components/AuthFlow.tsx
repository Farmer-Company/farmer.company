import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp, setDoc, doc, getDoc } from 'firebase/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { encodeDigipin } from '@/src/lib/digipin';
import { MapPin } from 'lucide-react';
import { countries } from '@/src/lib/countries';
import type { UserRole } from '@/src/lib/os-types';

type BetaRole = Exclude<UserRole, 'admin'>;

const betaRoles: { value: BetaRole; label: string }[] = [
  { value: 'farmer', label: 'Farmer / Seller' },
  { value: 'vendor', label: 'Retailer / Buyer / Vendor' },
  { value: 'logistics', label: 'Logistics Partner' },
  { value: 'researcher', label: 'Researcher / Analyst' },
  { value: 'government', label: 'Government / Institution' },
];

export const AuthFlow = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [role, setRole] = useState<BetaRole>('farmer');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationId, setVerificationId] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [locationData, setLocationData] = useState<{ lat: number, lon: number, accuracy: number, address: string, pin: string } | null>(null);

  // Initialize Recaptcha
  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          console.log('Recaptcha resolved');
        }
      });
    }
  }, []);

  // Capture Location for DIGIPIN
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        let address = "Location captured";
        
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&email=contact@farmer.company`);
          if (res.ok) {
            const data = await res.json();
            address = data.display_name || address;
          }
        } catch (e) {
          // ignore
        }
        
        // determine pin length based on accuracy
        let pinLen = 8;
        if (accuracy <= 1.5) pinLen = 16;
        else if (accuracy <= 50) pinLen = 14;
        else if (accuracy <= 1000) pinLen = 12;
        else if (accuracy <= 30000) pinLen = 10;

        const pin = encodeDigipin(lat, lon, pinLen);
        setLocationData({ lat, lon, accuracy, address, pin });
      }, (err) => {
        console.log("Location not provided:", err);
      }, { enableHighAccuracy: true });
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;
    setError('');
    setIsSubmitting(true);
    let appVerifier: RecaptchaVerifier | null = null;

    try {
      appVerifier = (window as any).recaptchaVerifier;
      const cleanMobile = mobile.replace(/\D/g, '');
      const formattedMobile = `${countryCode}${cleanMobile}`;
      
      const confirmationResult = await signInWithPhoneNumber(auth, formattedMobile, appVerifier);
      setVerificationId(confirmationResult);
    } catch (err: any) {
      console.error("OTP Send Failed:", err);
      setError(err.message || "Failed to send OTP. Please check the number format.");
      if (appVerifier) appVerifier.clear();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !verificationId) return;
    setError('');
    setIsSubmitting(true);

    try {
      const result = await verificationId.confirm(otp);
      const user = result.user;
      const cleanMobile = mobile.replace(/\D/g, '');
      const formattedMobile = `${countryCode}${cleanMobile}`;
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          fullName: name.trim(),
          email: user.email || '',
          phoneNumber: formattedMobile,
          updatedAt: serverTimestamp(),
          ...(locationData && {
            digipin: locationData.pin,
            location: {
              lat: locationData.lat,
              lon: locationData.lon,
              accuracy: locationData.accuracy,
              address: locationData.address
            }
          })
        }, { merge: true });
      } else {
        await setDoc(userRef, {
          uid: user.uid,
          fullName: name.trim(),
          email: user.email || '',
          phoneNumber: formattedMobile,
          role,
          verified: false,
          createdAt: serverTimestamp(),
          ...(locationData && {
            digipin: locationData.pin,
            location: {
              lat: locationData.lat,
              lon: locationData.lon,
              accuracy: locationData.accuracy,
              address: locationData.address
            }
          })
        });
      }

      // Save to Beta Registrations
      await addDoc(collection(db, 'beta_registrations'), {
        uid: user.uid,
        fullName: name.trim(),
        mobileNumber: formattedMobile,
        role,
        timestamp: serverTimestamp(),
        ...(locationData && {
          digipin: locationData.pin,
          address: locationData.address
        })
      });
      
      navigate('/');
    } catch (err: any) {
      console.error("Verification Failed:", err);
      const authErrorCode = typeof err?.code === 'string' ? err.code : '';
      setError(
        authErrorCode.startsWith('auth/')
          ? "Invalid OTP. Please try again."
          : "Verification worked, but profile setup could not be saved. Please retry in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background w-full">
      <div id="recaptcha-container"></div>
      
      {/* Left Panel - Branding (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#080808] border-r border-white/5 relative overflow-hidden flex-col justify-between p-12 noise-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="scanline"></div>
        
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-light tracking-tight text-white mb-2">
              DIGITAL<span className="text-primary"> ORCHARD</span>
            </h1>
            <p className="text-foreground-muted mono text-[10px] uppercase tracking-widest">Global Supply Chain Protocol</p>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-8 max-w-md">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-white/10 bg-black/40 backdrop-blur-md p-8 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary transition-all duration-500 group-hover:w-2" />
            <p className="mono text-[10px] text-white/40 mb-3 uppercase tracking-widest">System Status</p>
            <p className="text-white text-2xl font-light tracking-tight mb-6">Secure Identity Verification Node Active</p>
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="mono text-[10px] text-primary uppercase tracking-wider">End-to-End Encrypted</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4"
          >
            <div className="border border-white/5 bg-white/[0.02] p-4 flex-1">
              <div className="text-primary text-xl font-light mb-1">01</div>
              <div className="mono text-[9px] text-white/50 uppercase tracking-wider">Verify Identity</div>
            </div>
            <div className="border border-white/5 bg-white/[0.02] p-4 flex-1">
              <div className="text-white/20 text-xl font-light mb-1">02</div>
              <div className="mono text-[9px] text-white/50 uppercase tracking-wider">Access Network</div>
            </div>
          </motion.div>
        </div>
        
        <div className="relative z-10 flex justify-between items-end">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-[9px] mono text-white/30 max-w-[250px] uppercase leading-relaxed">
            Enterprise Grade Agricultural Identity Management Protocol. Authorized Access Only.
          </motion.p>
          <div className="vertical-meta">AUTH-V2.0.1</div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative w-full os-grid bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden mb-12 text-center w-full mt-8">
          <h1 className="text-3xl font-light text-white tracking-tight mb-2">
            DIGITAL<span className="text-primary"> ORCHARD</span>
          </h1>
          <p className="text-foreground-muted mono text-[9px] uppercase tracking-widest">Identity Authorization</p>
        </div>
        
        <div className="w-full max-w-sm relative z-10">
          <div className="hidden lg:block mb-10">
            <h2 className="text-2xl font-light text-white mb-2">Welcome Back</h2>
            <p className="text-white/40 text-sm">Please verify your identity to continue.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {!verificationId ? (
                <motion.form 
                  key="step-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOtp} 
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="mono text-[10px] uppercase tracking-wider text-white/50 ml-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-white/[0.02] border border-white/10 h-14 px-4 mono text-sm text-white placeholder:text-white/20 focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="mono text-[10px] uppercase tracking-wider text-white/50 ml-1">Mobile Number</label>
                    <div className="flex gap-2">
                      <select
                        aria-label="Country Code"
                        title="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-[110px] bg-white/[0.02] border border-white/10 h-14 px-3 mono text-sm text-white focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-300 cursor-pointer appearance-none"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.dial_code} className="bg-background text-white py-2">
                            {country.code} {country.dial_code}
                          </option>
                        ))}
                      </select>
                      <input 
                        required
                        type="tel" 
                        value={mobile}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 15) setMobile(val);
                        }}
                        placeholder="98765 43210"
                        maxLength={15}
                        className="flex-1 bg-white/[0.02] border border-white/10 h-14 px-4 mono text-sm text-white placeholder:text-white/20 focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="mono text-[10px] uppercase tracking-wider text-white/50 ml-1">Beta Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as BetaRole)}
                      className="w-full bg-white/[0.02] border border-white/10 h-14 px-4 mono text-sm text-white focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-300 cursor-pointer"
                      title="Select beta role"
                    >
                      {betaRoles.map((option) => (
                        <option key={option.value} value={option.value} className="bg-background text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {locationData && (
                    <div className="space-y-2 mt-4">
                      <label className="mono text-[10px] uppercase tracking-wider text-primary ml-1 flex items-center gap-1">
                        <MapPin size={10} /> Verified Location (DIGIPIN)
                      </label>
                      <div className="w-full bg-primary/5 border border-primary/20 h-14 px-4 flex flex-col justify-center">
                        <span className="mono text-sm text-primary tracking-widest">{locationData.pin}</span>
                        <span className="text-[9px] text-white/40 truncate">{locationData.address}</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400 mono px-1">
                      {error}
                    </motion.p>
                  )}

                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-white hover:bg-primary text-black font-medium transition-all duration-300 mt-8 rounded-none group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full z-0"></div>
                    <span className="relative z-10 mono text-[11px] font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                          Sending Code...
                        </>
                      ) : 'Send Verification Code'}
                    </span>
                  </Button>
                </motion.form>
              ) : (
                <motion.form 
                  key="step-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerifyOtp} 
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="mono text-[10px] uppercase tracking-wider text-white/50 ml-1">Enter 6-Digit OTP</label>
                    <input 
                      required
                      autoFocus
                      type="text" 
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full bg-white/[0.02] border border-white/10 h-16 px-4 mono text-2xl tracking-[0.5em] text-center text-primary placeholder:text-white/10 focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-300"
                    />
                    <p className="text-[10px] text-white/40 text-center mt-2">
                      Code sent to {countryCode} {mobile}
                    </p>
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] text-red-400 mono text-center">
                      {error}
                    </motion.p>
                  )}

                  <div className="pt-4">
                    <Button 
                      type="submit"
                      disabled={isSubmitting || otp.length < 6}
                      className="w-full h-14 bg-primary hover:bg-primary/90 text-black font-medium transition-all duration-300 rounded-none disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30"
                    >
                      <span className="mono text-[11px] font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Verifying...
                          </>
                        ) : 'Complete Authorization'}
                      </span>
                    </Button>

                    <button 
                      type="button"
                      onClick={() => setVerificationId(null)}
                      className="w-full text-[10px] text-white/30 hover:text-white mono uppercase tracking-wider mt-6 transition-colors"
                    >
                      ← Back to Phone Number
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 mono text-[9px] uppercase tracking-widest text-white/20">
                  Secure Gateway
                </span>
              </div>
            </div>

            <p className="text-[10px] text-center text-white/30 leading-relaxed px-4">
              By Authorizing, you agree to the Digital Orchard <a href="#" className="text-primary hover:underline">Architecture</a> and <a href="#" className="text-primary hover:underline">Data Integrity</a> protocols.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
