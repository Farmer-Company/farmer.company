import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "Do I need a smartphone to use Digital Orchard?",
    answer: "For full access to the market directory and farm listing features, a smartphone with internet access is recommended. However, we also operate a USSD/SMS service for basic price intelligence and have on-ground field agents who can list your produce if you only have a feature phone."
  },
  {
    question: "Is my payment secure? What if the buyer rejects the crop?",
    answer: "Your payment is 100% secure. When a buyer books your crop, the funds are held in an RBI-compliant escrow account. Once our field agent verifies the load at the farm gate, the money is instantly released to your bank account. The buyer cannot reject the crop later to demand a lower price, as quality is verified before dispatch."
  },
  {
    question: "What is the catch with 'Zero Commission'?",
    answer: "There is no catch for farmers. We do not charge you a fee or commission. Digital Orchard sustains its operations by charging enterprise buyers for our Supply CRM software, and by taking a small routing fee from logistics partners who use our platform to eliminate empty return trips."
  },
  {
    question: "How do I trust the prices on your app?",
    answer: "Our prices are pulled directly from live APMC data, matched with private institutional buy quotes in real-time. We don't invent prices; we aggregate the actual market reality so you know exactly what your crop is worth today."
  },
  {
    question: "Will this use a lot of mobile data?",
    answer: "No. The AgriOS app is built specifically for rural connectivity. It is 'offline-first', meaning you can view previously loaded prices without internet. Creating a farm listing takes less data than sending a single WhatsApp photo."
  },
  {
    question: "How is my farm data used?",
    answer: "Your private farm and trade data is used to power your own listings, price intelligence, logistics matching and settlement records. Aggregated research data is anonymized before it is used for market intelligence, policy analysis or enterprise APIs."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="mono text-[10px] text-primary font-medium normal-case tracking-widest mb-4 block">
            FARMER QUESTIONS
          </span>
          <h2 className="text-[34px] md:text-[40px] font-semibold text-white tracking-[-0.02em] leading-[1.1]">
            Clear answers. No fine print.
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-14 border border-primary/20 bg-primary/[0.03] rounded-xl p-7 md:p-8">
          <span className="mono text-[10px] text-primary font-medium normal-case tracking-widest mb-3 block">
            FIELD NOTES - COMING SOON
          </span>
          <h3 className="text-2xl text-white font-semibold tracking-tight mb-3">Operational updates from the Tamil Nadu pilot.</h3>
          <p className="text-white/55 leading-relaxed">
            Field Notes will publish market intelligence, pilot updates, crop movement observations and protocol learnings. Publishing begins Q3 2026.
          </p>
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl bg-[#050505] overflow-hidden transition-colors hover:border-white/20">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
      >
        <span className="text-white font-medium text-lg pr-8">{question}</span>
        <ChevronDown 
          className={`text-primary shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={20} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-2 text-white/60 leading-[1.6]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
