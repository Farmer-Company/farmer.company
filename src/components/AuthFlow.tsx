import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp, setDoc, doc, getDoc } from 'firebase/firestore';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { encodeDigipin } from '@/src/lib/digipin';
import {
  BarChart3,
  CheckCircle2,
  Landmark,
  Loader2,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Truck,
} from 'lucide-react';
import { countries } from '@/src/lib/countries';
import type { UserRole } from '@/src/lib/os-types';

type BetaRole = Exclude<UserRole, 'admin'>;
type LocationStatus = 'idle' | 'loading' | 'ready' | 'unavailable' | 'blocked';

type RoleOption = {
  value: BetaRole;
  action: string;
  audience: string;
  mode: 'Field Mode' | 'Trade Desk Mode' | 'Institution Access';
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
};

const betaRoles: RoleOption[] = [
  {
    value: 'farmer',
    action: 'Sell my crop',
    audience: 'Farmers, FPOs, local sellers',
    mode: 'Field Mode',
    Icon: Sprout,
  },
  {
    value: 'vendor',
    action: 'Source crop supply',
    audience: 'Traders, retailers, procurement teams',
    mode: 'Trade Desk Mode',
    Icon: ShoppingBasket,
  },
  {
    value: 'logistics',
    action: 'Move farm loads',
    audience: 'Transporters and dispatch partners',
    mode: 'Trade Desk Mode',
    Icon: Truck,
  },
  {
    value: 'researcher',
    action: 'Use market intelligence',
    audience: 'Researchers and analysts',
    mode: 'Institution Access',
    Icon: BarChart3,
  },
  {
    value: 'government',
    action: 'Government access',
    audience: 'Public teams and institutions',
    mode: 'Institution Access',
    Icon: Landmark,
  },
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
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('idle');
  const [locationMessage, setLocationMessage] = useState('');
  const [locationData, setLocationData] = useState<{ lat: number, lon: number, accuracy: number, address: string, pin: string } | null>(null);

  const selectedRole = betaRoles.find((option) => option.value === role) ?? betaRoles[0];
  const SelectedRoleIcon = selectedRole.Icon;

  const getRecaptchaVerifier = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('Recaptcha resolved');
        },
      });
    }

    return (window as any).recaptchaVerifier as RecaptchaVerifier;
  };

  useEffect(() => {
    getRecaptchaVerifier();
  }, []);

  const captureLocation = () => {
    setError('');
    setLocationMessage('');

    if (!('geolocation' in navigator)) {
      setLocationStatus('unavailable');
      setLocationMessage('Location is not available on this phone. You can still continue.');
      return;
    }

    setLocationStatus('loading');

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const accuracy = position.coords.accuracy;
      let address = 'Location captured';

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&email=contact@farmer.company`);
        if (res.ok) {
          const data = await res.json();
          address = data.display_name || address;
        }
      } catch {
        // DIGIPIN still works without the reverse-geocoded address.
      }

      let pinLen = 8;
      if (accuracy <= 1.5) pinLen = 16;
      else if (accuracy <= 50) pinLen = 14;
      else if (accuracy <= 1000) pinLen = 12;
      else if (accuracy <= 30000) pinLen = 10;

      const pin = encodeDigipin(lat, lon, pinLen);
      setLocationData({ lat, lon, accuracy, address, pin });
      setLocationStatus('ready');
      setLocationMessage('Location saved for pickup matching.');
    }, () => {
      setLocationStatus('blocked');
      setLocationMessage('Location was not shared. You can add it later or ask for a callback.');
    }, { enableHighAccuracy: true, timeout: 12000, maximumAge: 300000 });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMobile = mobile.replace(/\D/g, '');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (cleanMobile.length < 6) {
      setError('Please enter a valid mobile number.');
      return;
    }

    setError('');
    setIsSubmitting(true);
    let appVerifier: RecaptchaVerifier | null = null;

    try {
      appVerifier = getRecaptchaVerifier();
      const formattedMobile = `${countryCode}${cleanMobile}`;

      const confirmationResult = await signInWithPhoneNumber(auth, formattedMobile, appVerifier);
      setVerificationId(confirmationResult);
    } catch (err: any) {
      console.error('OTP Send Failed:', err);
      setError(err.message || 'We could not send the SMS code. Please check the number and try again.');
      if (appVerifier) {
        appVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
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
              address: locationData.address,
            },
          }),
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
              address: locationData.address,
            },
          }),
        });
      }

      await addDoc(collection(db, 'beta_registrations'), {
        uid: user.uid,
        fullName: name.trim(),
        mobileNumber: formattedMobile,
        role,
        timestamp: serverTimestamp(),
        ...(locationData && {
          digipin: locationData.pin,
          address: locationData.address,
        }),
      });

      navigate('/');
    } catch (err: any) {
      console.error('Verification Failed:', err);
      const authErrorCode = typeof err?.code === 'string' ? err.code : '';
      setError(
        authErrorCode.startsWith('auth/')
          ? 'The SMS code did not match. Please try again.'
          : 'The phone was verified, but profile setup could not be saved. Please retry in a moment.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRoleButton = (option: RoleOption) => {
    const isSelected = role === option.value;
    const Icon = option.Icon;

    return (
      <button
        key={option.value}
        type="button"
        role="radio"
        aria-checked={isSelected}
        onClick={() => setRole(option.value)}
        className={`w-full min-h-[68px] border p-3 text-left transition-all duration-200 ${
          isSelected
            ? 'border-primary bg-primary/10 text-white'
            : 'border-white/10 bg-white/[0.03] text-white/72 hover:border-white/24 hover:bg-white/[0.06]'
        }`}
      >
        <span className="flex items-center gap-3">
          <span className={`flex size-10 shrink-0 items-center justify-center border ${
            isSelected ? 'border-primary bg-primary text-black' : 'border-white/12 bg-black/30 text-primary'
          }`}>
            <Icon size={20} strokeWidth={2.2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-semibold leading-snug tracking-normal">{option.action}</span>
            <span className="block text-[12px] leading-relaxed text-white/50">{option.audience}</span>
          </span>
          <span className={`hidden shrink-0 text-[10px] font-medium sm:block ${
            isSelected ? 'text-primary' : 'text-white/28'
          }`}>
            {option.mode}
          </span>
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background w-full pt-14">
      <div id="recaptcha-container"></div>

      <div className="hidden lg:flex lg:w-[44%] bg-[#080808] border-r border-white/5 relative overflow-hidden flex-col justify-between p-10 xl:p-12 noise-bg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="scanline"></div>

        <div className="relative z-10">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">
              Farmer<span className="text-primary">.Company</span>
            </h1>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              A phone-first beta for field sellers, with trade desk and institution tools after verification.
            </p>
          </motion.div>
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="border border-white/10 bg-black/45 backdrop-blur-md p-7 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <p className="text-primary text-sm font-semibold mb-3">Field Mode</p>
            <p className="text-white text-2xl font-medium tracking-tight leading-tight mb-5">
              Start with a phone number. Add crop details when you are ready.
            </p>
            <div className="grid gap-3 text-sm text-white/60">
              <p className="flex gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" /> Big fields and buttons for low-end phones.</p>
              <p className="flex gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" /> Location sharing is optional and explained first.</p>
              <p className="flex gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-primary" /> Callback support for farmers who want help.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="border border-white/5 bg-white/[0.03] p-4">
              <div className="text-primary text-sm font-semibold mb-1">Field</div>
              <div className="text-[12px] text-white/54 leading-relaxed">Farmers, sellers, FPO helpers</div>
            </div>
            <div className="border border-white/5 bg-white/[0.03] p-4">
              <div className="text-white text-sm font-semibold mb-1">Trade Desk</div>
              <div className="text-[12px] text-white/54 leading-relaxed">Buyers, traders, logistics teams</div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 flex justify-between items-end">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-[12px] text-white/38 max-w-[310px] leading-relaxed">
            Farmers pay Rs 0 commission on crop sales. Buyer, logistics, research, and government workflows continue deeper inside the product.
          </motion.p>
          <div className="vertical-meta">BETA ACCESS</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-start lg:justify-center items-center px-4 py-6 sm:px-6 sm:py-10 relative w-full os-grid bg-background">
        <div className="lg:hidden mb-6 text-left w-full max-w-md">
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">
            Farmer<span className="text-primary">.Company</span>
          </h1>
          <p className="text-white/58 text-sm leading-relaxed">Start with your phone number. Sell, source, move, or analyze farm supply after verification.</p>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="mb-6 hidden sm:block">
            <div className="flex items-center gap-3 text-[13px] text-white/48">
              <span className={`flex size-8 items-center justify-center border ${
                verificationId ? 'border-primary bg-primary text-black' : 'border-primary/50 text-primary'
              }`}>
                {verificationId ? <CheckCircle2 size={16} /> : '1'}
              </span>
              <span className="h-px flex-1 bg-white/10" />
              <span className={`flex size-8 items-center justify-center border ${
                verificationId ? 'border-primary/50 text-primary' : 'border-white/10 text-white/34'
              }`}>
                2
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {!verificationId ? (
                <motion.form
                  key="step-1"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 18 }}
                  onSubmit={handleSendOtp}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Start with phone login</h2>
                    <p className="text-sm leading-relaxed text-white/56">
                      We will send one SMS code. Crop, company, or trade desk details can be added after this step.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white" htmlFor="full-name">Your name</label>
                    <input
                      id="full-name"
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      autoComplete="name"
                      autoCapitalize="words"
                      enterKeyHint="next"
                      className="w-full bg-white/[0.04] border border-white/12 min-h-14 px-4 text-[16px] text-white placeholder:text-white/28 focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white" htmlFor="mobile-number">Mobile number</label>
                    <div className="flex gap-2">
                      <select
                        aria-label="Country code"
                        title="Country code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-[104px] shrink-0 bg-white/[0.04] border border-white/12 min-h-14 px-3 text-[15px] text-white focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-200 cursor-pointer"
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.dial_code} className="bg-background text-white py-2">
                            {country.code} {country.dial_code}
                          </option>
                        ))}
                      </select>
                      <input
                        id="mobile-number"
                        required
                        type="tel"
                        inputMode="tel"
                        value={mobile}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          if (val.length <= 15) setMobile(val);
                        }}
                        placeholder="98765 43210"
                        maxLength={15}
                        autoComplete="tel-national"
                        enterKeyHint="send"
                        className="min-w-0 flex-1 bg-white/[0.04] border border-white/12 min-h-14 px-4 text-[16px] text-white placeholder:text-white/28 focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-white">What do you want to do?</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/45">Field Mode is selected for sellers. Trade desk and institution paths are one tap away.</p>
                    </div>
                    <div className="border border-primary bg-primary/10 p-3 text-left text-white">
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center bg-primary text-black">
                          <SelectedRoleIcon size={20} strokeWidth={2.2} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[15px] font-semibold leading-snug tracking-normal">{selectedRole.action}</span>
                          <span className="block text-[12px] leading-relaxed text-white/58">{selectedRole.audience}</span>
                        </span>
                        <span className="hidden shrink-0 text-[10px] font-medium text-primary sm:block">{selectedRole.mode}</span>
                      </div>
                    </div>
                    <details className="group border border-white/10 bg-white/[0.02]">
                      <summary className="cursor-pointer list-none px-3 py-3 text-[13px] font-medium text-white/58 transition-colors group-open:text-white">
                        Change path
                      </summary>
                      <div role="radiogroup" aria-label="Choose beta role" className="grid gap-2 border-t border-white/8 p-2">
                        {betaRoles.filter((option) => option.value !== role).map(renderRoleButton)}
                      </div>
                    </details>
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm leading-relaxed text-red-200">
                      {error}
                    </motion.p>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-14 bg-primary hover:bg-primary/90 text-black font-semibold transition-all duration-200 mt-2 rounded-none group relative overflow-hidden"
                  >
                    <span className="relative z-10 text-[15px] font-semibold tracking-normal flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Sending SMS code
                        </>
                      ) : (
                        <>
                          <Phone size={17} />
                          Send SMS code
                        </>
                      )}
                    </span>
                  </Button>

                  <details className="group border border-white/10 bg-white/[0.03]">
                    <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 px-3 py-3 text-sm font-medium text-white/62 transition-colors group-open:text-white">
                      <MapPin size={17} className={locationData ? 'text-primary' : 'text-white/42'} />
                      {locationData ? 'Pickup location saved' : 'Add pickup location if you want'}
                    </summary>
                    <div className="border-t border-white/8 p-3">
                      <p className="text-[12px] leading-relaxed text-white/46">
                        {locationData ? `DIGIPIN ${locationData.pin}` : 'Optional. Sharing location can help with pickup matching, but you can continue without it.'}
                      </p>
                      {locationData && <p className="mt-1 truncate text-[11px] text-white/34">{locationData.address}</p>}
                      <button
                        type="button"
                        onClick={captureLocation}
                        disabled={locationStatus === 'loading'}
                        className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 border border-white/12 bg-black/30 px-4 text-sm font-medium text-white transition-colors hover:border-primary/40 hover:text-primary disabled:opacity-60"
                      >
                        {locationStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <MapPin size={16} />}
                        {locationStatus === 'loading' ? 'Getting location...' : locationData ? 'Update location' : 'Use phone location'}
                      </button>
                      {locationMessage && (
                        <p className={`mt-2 text-[12px] leading-relaxed ${
                          locationStatus === 'ready' ? 'text-primary' : 'text-white/44'
                        }`}>
                          {locationMessage}
                        </p>
                      )}
                    </div>
                  </details>
                </motion.form>
              ) : (
                <motion.form
                  key="step-2"
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 18 }}
                  onSubmit={handleVerifyOtp}
                  className="space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex size-12 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
                      <ShieldCheck size={23} />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">Enter SMS code</h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/56">
                        Sent to {countryCode} {mobile}. Selected path: <span className="text-white">{selectedRole.action}</span>.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white" htmlFor="otp-code">6 digit code</label>
                    <input
                      id="otp-code"
                      required
                      autoFocus
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="one-time-code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full bg-white/[0.04] border border-white/12 min-h-16 px-4 text-center text-3xl tracking-[0.28em] text-primary placeholder:text-white/12 focus:border-primary focus:bg-primary/5 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm leading-relaxed text-red-200">
                      {error}
                    </motion.p>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting || otp.length < 6}
                      className="w-full min-h-14 bg-primary hover:bg-primary/90 text-black font-semibold transition-all duration-200 rounded-none disabled:opacity-50 disabled:bg-white/10 disabled:text-white/30"
                    >
                      <span className="text-[15px] font-semibold tracking-normal flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <Loader2 size={17} className="animate-spin" />
                            Verifying
                          </>
                        ) : 'Verify and continue'}
                      </span>
                    </Button>

                    <button
                      type="button"
                      onClick={() => {
                        setVerificationId(null);
                        setOtp('');
                        setError('');
                      }}
                      className="mt-5 min-h-11 w-full text-sm font-medium text-white/46 hover:text-white transition-colors"
                    >
                      Change phone number
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/6"></div></div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-[12px] text-white/28">
                  Secure phone login
                </span>
              </div>
            </div>

            <p className="text-[12px] text-center text-white/38 leading-relaxed px-2">
              By continuing, you agree to be contacted about beta access. Farmers pay Rs 0 commission on crop sales.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
