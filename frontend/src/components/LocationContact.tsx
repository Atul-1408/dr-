'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Navigation, 
  Clock, 
  Building2, 
  ExternalLink 
} from 'lucide-react';
import { CLINIC_INFO } from '@/constants/clinic';

export default function LocationContact() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0A5C67] text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Clinic Location</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4">
            Visit Our Clinic
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Conveniently located at Sangharsh Nagar, Chandivali Farm Road, Sakinaka
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Address & Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#0A5C67] text-white flex items-center justify-center shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {CLINIC_INFO.name}
                  </h3>
                  <p className="text-xs text-[#0A5C67] font-semibold">
                    Dr. Aisha Ojha • BDS (Dental Surgeon)
                  </p>
                </div>
              </div>

              {/* Exact Address */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0A5C67] shrink-0 mt-1" />
                  <div className="text-sm text-slate-700 leading-relaxed font-medium">
                    <p className="font-bold text-slate-900">{CLINIC_INFO.address.building}</p>
                    <p>{CLINIC_INFO.address.street}</p>
                    <p>{CLINIC_INFO.address.locality}</p>
                    <p>{CLINIC_INFO.address.city} - {CLINIC_INFO.address.postalCode}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#0A5C67] shrink-0" />
                  <div className="text-sm">
                    <span className="text-slate-500 mr-2">Phone:</span>
                    <a
                      href={`tel:${CLINIC_INFO.contact.phone}`}
                      className="font-bold text-slate-900 hover:text-[#0A5C67] text-base"
                    >
                      {CLINIC_INFO.contact.displayPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Clinic Timings */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 mb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A5C67] uppercase tracking-wide mb-3">
                  <Clock className="w-4 h-4" />
                  <span>Consultation Timings</span>
                </div>
                <div className="space-y-2 text-xs text-slate-600">
                  {CLINIC_INFO.timings.map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                      <span className="font-semibold text-slate-800">{t.days}</span>
                      <span className="font-medium text-slate-600 text-right">{t.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons: Call, WhatsApp, Get Directions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${CLINIC_INFO.contact.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#0A5C67] hover:bg-[#064E55] text-white font-semibold text-xs shadow-xs transition-all active:scale-95"
              >
                <Phone className="w-4 h-4" />
                <span>Call Clinic</span>
              </a>

              <a
                href={CLINIC_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={CLINIC_INFO.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-xs transition-all active:scale-95"
              >
                <Navigation className="w-4 h-4 text-sky-400" />
                <span>Get Directions</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Google Maps Embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 relative min-h-[380px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100"
          >
            <iframe
              src={CLINIC_INFO.address.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '420px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Happy Smiles Dental Clinic Location Map"
              className="w-full h-full"
            />

            {/* Map Top Floating Overlay */}
            <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-md flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-800">Sakinaka, Andheri East</span>
              </div>
              <a
                href={CLINIC_INFO.address.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0A5C67] hover:underline font-bold flex items-center gap-1"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
