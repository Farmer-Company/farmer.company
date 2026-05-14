import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { db, auth } from "@/src/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { countries } from "@/src/lib/countries";

export const AuthFlow = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationId, setVerificationId] =
    useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");

  // Initialize Recaptcha
  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("Recaptcha resolved");
          },
        },
      );
    }
  }, []);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile) return;
    setError("");
    setIsSubmitting(true);
    let appVerifier: RecaptchaVerifier | null = null;

    try {
      appVerifier = (window as any).recaptchaVerifier;
      const cleanMobile = mobile.replace(/\D/g, "");
      const formattedMobile = `${countryCode}${cleanMobile}`;

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formattedMobile,
        appVerifier,
      );
      setVerificationId(confirmationResult);
    } catch (err: any) {
      console.error("OTP Send Failed:", err);
      setError(
        err.message || "Failed to send OTP. Please check the number format.",
      );
      if (appVerifier) appVerifier.clear();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !verificationId) return;
    setError("");
    setIsSubmitting(true);

    try {
      const result = await verificationId.confirm(otp);
      const user = result.user;

      // Create/Update User Profile
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: name,
        phoneNumber: `${countryCode}${mobile}`,
        role: "user",
        createdAt: serverTimestamp(),
      });

      // Save to Beta Registrations
      await addDoc(collection(db, "beta_registrations"), {
        uid: user.uid,
        fullName: name,
        mobileNumber: `${countryCode}${mobile}`,
        timestamp: serverTimestamp(),
      });

      navigate("/");
    } catch (err: any) {
      console.error("Verification Failed:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div id="recaptcha-container"></div>

      <div className="w-full max-w-sm">
        <div className="mb-12 text-center">
          <h1 className="display text-4xl font-light text-white tracking-tight normal-case mb-2">
            DIGITAL<span className="text-primary"> ORCHARD</span>
          </h1>
          <p className="text-foreground-muted normal-case text-[10px] font-medium">
            Identity Authorization
          </p>
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
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="mono text-[9px] normal-case text-white/40 ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ramesh Kumar"
                    className="w-full bg-white/[0.03] border border-white/10 h-14 px-4 mono text-xs text-white focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="mono text-[9px] normal-case text-white/40 ml-1">
                    Mobile Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      aria-label="Country Code"
                      title="Country Code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-[120px] bg-white/[0.03] border border-white/10 h-14 px-2 mono text-xs text-white focus:border-primary focus:outline-none transition-colors"
                    >
                      {countries.map((country) => (
                        <option
                          key={country.code}
                          value={country.dial_code}
                          className="bg-background text-white"
                        >
                          {country.code} ({country.dial_code})
                        </option>
                      ))}
                    </select>
                    <input
                      required
                      type="tel"
                      value={mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        if (val.length <= 15) setMobile(val);
                      }}
                      placeholder="98765 43210"
                      maxLength={15}
                      className="flex-1 bg-white/[0.03] border border-white/10 h-14 px-4 mono text-xs text-white focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-[10px] text-red-500 mono normal-case">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-primary text-black font-medium normal-case mt-6"
                >
                  <span className="mono text-xs font-medium normal-case ">
                    {isSubmitting
                      ? "Sending Code..."
                      : "Send Verification Code"}
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
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="mono text-[9px] normal-case text-white/40 ml-1">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    required
                    autoFocus
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full bg-white/[0.03] border border-white/10 h-14 px-4 mono text-xl text-center text-primary focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                {error && (
                  <p className="text-[10px] text-red-500 mono normal-case">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-primary text-black font-medium normal-case mt-6"
                >
                  <span className="mono text-xs font-medium normal-case ">
                    {isSubmitting ? "Verifying..." : "Complete Authorization"}
                  </span>
                </Button>

                <button
                  type="button"
                  onClick={() => setVerificationId(null)}
                  className="w-full text-[10px] text-white/40 hover:text-white mono normal-case mt-2"
                >
                  Back to Phone Number
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[8px] normal-case font-medium text-white/20">
              <span className="bg-background px-4">Secure Gateway</span>
            </div>
          </div>

          <p className="text-[10px] text-center text-foreground-muted leading-relaxed normal-case px-4">
            By Authorizing, you agree to the Digital Orchard Architecture and
            data integrity protocols.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
