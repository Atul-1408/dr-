'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { CLINIC_FAQS } from '@/constants/clinic';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading & Support Context */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-[#0A5C67] text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Inquiries</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4 leading-tight">
              Frequently Asked Questions
            </h2>
            
            <p className="text-base text-slate-600 font-medium mb-8 leading-relaxed">
              Find transparent answers regarding our treatments, doctor consultations, appointment process, and clinic timings.
            </p>

            {/* Quick help box */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs w-full space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Still have questions?
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Feel free to connect directly with our clinic team on WhatsApp or phone.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={`tel:9029131396`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0A5C67] text-white font-bold text-xs text-center hover:bg-[#064E55] transition-colors"
                >
                  Call 9029131396
                </a>
                <a
                  href="https://wa.me/919029131396?text=Hello%20Happy%20Smiles%2C%20I%20have%20a%20question%20regarding%20dental%20treatment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs text-center hover:bg-emerald-100 transition-colors"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion List */}
          <div className="lg:col-span-8 space-y-4 w-full">
            {CLINIC_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-teal-300 shadow-md shadow-teal-900/5'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-teal-50 text-[#0A5C67] rotate-180' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
