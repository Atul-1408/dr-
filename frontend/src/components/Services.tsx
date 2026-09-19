'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Activity, 
  Zap, 
  Shield, 
  Smile, 
  Anchor, 
  Scissors, 
  HeartHandshake, 
  Grid, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  X,
  Phone
} from 'lucide-react';
import { CLINIC_SERVICES_DATA, CLINIC_INFO } from '@/constants/clinic';

// Icon mapper for dynamic service cards
const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Activity,
  Zap,
  Shield,
  Smile,
  Anchor,
  Scissors,
  HeartHandshake,
  Grid,
};

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description: string;
  icon: string;
  benefits?: string[];
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section
      id="services"
      className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-teal-50/20 to-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-[#0A5C67] text-xs font-bold uppercase tracking-wider mb-3">
            <span>Specialized Clinical Procedures</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Complete Dental Care Under One Roof
          </p>
        </div>

        {/* 9 Core Services Grid: 3 columns on desktop & tablet, responsive 1-2 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 lg:gap-8">
          {CLINIC_SERVICES_DATA.map((service, index) => {
            const IconComp = iconMap[service.icon] || Sparkles;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 lg:p-8 border border-slate-200/90 hover:border-teal-400 shadow-xs hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 group-hover:bg-[#0A5C67] text-[#0A5C67] group-hover:text-white flex items-center justify-center mb-5 transition-all duration-300 shadow-2xs">
                    <IconComp className="w-7 h-7 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#0A5C67] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  {/* One-line / two-line Description */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                    {service.short_description}
                  </p>
                </div>

                {/* Learn More Action Button */}
                <button
                  type="button"
                  onClick={() => setSelectedService(service as ServiceItem)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0A5C67] group-hover:text-[#0284C7] pt-4 border-t border-slate-100 group-hover:border-teal-100 transition-colors w-full justify-between"
                >
                  <span>Learn More & Benefits</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Consultation Callout Banner below 9 Service Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-3xl p-6 sm:p-8 lg:p-10 bg-gradient-to-r from-[#064E55] via-[#0A5C67] to-[#0E7490] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 sm:gap-6 z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0">
              <Smile className="w-8 h-8 text-teal-200" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Need Guidance on Which Treatment You Need?
              </h3>
              <p className="text-sm text-teal-100/90 max-w-xl">
                Book a general consultation with Dr. Aaisha Ojha (BDS) for a comprehensive diagnosis and transparent recommendations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 z-10">
            <a
              href="#appointment"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-full bg-white text-[#064E55] hover:bg-teal-50 font-bold text-sm shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#064E55]" />
              <span>Book Consultation</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close details modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-[#0A5C67] flex items-center justify-center">
                  {React.createElement(iconMap[selectedService.icon] || Sparkles, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0A5C67] uppercase tracking-wider">
                    Treatment Detail
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-6">
                <p>{selectedService.full_description}</p>

                {selectedService.benefits && selectedService.benefits.length > 0 && (
                  <div className="pt-3">
                    <h4 className="text-sm font-bold text-slate-800 mb-2">
                      Key Procedure Benefits:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedService.benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#0A5C67] shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Consultation Callouts */}
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-semibold text-[#0A5C67]">Consulting Surgeon</div>
                  <div className="text-sm font-bold text-slate-800">Dr. Aaisha Ojha, BDS</div>
                </div>
                <a
                  href={`tel:${CLINIC_INFO.contact.phone}`}
                  className="flex items-center gap-1 text-xs font-bold text-[#0A5C67] bg-white px-3 py-1.5 rounded-full border border-teal-200 shadow-2xs"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call {CLINIC_INFO.contact.phone}</span>
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={`#appointment`}
                  onClick={() => setSelectedService(null)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0A5C67] hover:bg-[#064E55] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book for {selectedService.title}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="py-3 px-5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
