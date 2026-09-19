'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  Sparkles, 
  X, 
  MapPin, 
  Phone
} from 'lucide-react';
import { CLINIC_INFO } from '@/constants/clinic';

export default function Doctor() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const features = [
    'General & Cosmetic Dentistry',
    'Preventive Dental Care',
    'Comfort-Focused Treatment',
    'Patient Education & Guidance',
  ];

  return (
    <section
      id="doctor"
      className="py-20 lg:py-28 bg-gradient-to-br from-[#064E55] via-[#0A5C67] to-[#08333A] text-white relative overflow-hidden"
    >
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Doctor Image Container */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative halo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-teal-300/30 to-sky-400/30 rounded-3xl blur-md" />
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl aspect-square bg-teal-900/40">
                <Image
                  src="/assets/dr-aisha-portrait.jpg"
                  alt="Dr. Aisha Ojha - BDS Dental Surgeon"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover object-center"
                />
                
                {/* Subtle gradient vignette at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#064E55]/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Bottom Tag inside photo */}
                <div className="absolute bottom-4 left-4 right-4 text-center bg-black/40 backdrop-blur-md py-2 px-3 rounded-xl border border-white/15">
                  <span className="text-xs font-semibold text-teal-200">
                    Dr. Aisha Ojha • BDS (Dental Surgeon)
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Doctor Info & Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4">
              <UserCheck className="w-3.5 h-3.5 text-teal-300" />
              <span>Meet Your Dentist</span>
            </div>

            {/* Doctor Name & Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2">
              Dr. Aisha Ojha
            </h2>
            <div className="text-xl sm:text-2xl font-semibold text-teal-200 mb-6">
              BDS (Dental Surgeon)
            </div>

            {/* Short Biography */}
            <p className="text-base sm:text-lg text-teal-50/90 leading-relaxed mb-4">
              {CLINIC_INFO.doctor.bio}
            </p>

            {/* Professional Approach */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs mb-8">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wide mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Professional Approach</span>
              </div>
              <p className="text-sm text-teal-100/90 leading-normal">
                {CLINIC_INFO.doctor.approach}
              </p>
            </div>

            {/* Feature List (4 items) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-teal-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setProfileModalOpen(true)}
                className="px-6 py-3 rounded-full bg-white text-[#064E55] hover:bg-teal-50 font-bold text-sm shadow-md transition-all active:scale-95"
              >
                View Full Profile
              </button>

              <a
                href="#appointment"
                className="px-6 py-3 rounded-full bg-teal-500/20 hover:bg-teal-500/30 text-white font-semibold text-sm border border-teal-400/40 flex items-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Consultation</span>
              </a>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Full Doctor Profile Modal */}
      <AnimatePresence>
        {profileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
            onClick={() => setProfileModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-teal-600 shrink-0">
                  <Image
                    src="/assets/dr-aisha-portrait.jpg"
                    alt="Dr. Aisha Ojha"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Dr. Aisha Ojha</h3>
                  <p className="text-sm font-semibold text-[#0A5C67]">BDS (Dental Surgeon)</p>
                  <p className="text-xs text-slate-500">Happy Smiles Dental Clinic</p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>Dr. Aisha Ojha</strong> is a dedicated dental practitioner holding a Bachelor of Dental Surgery (BDS) degree. She leads Happy Smiles Dental Clinic in Sangharsh Nagar, Sakinaka, providing personalized and ethical dental care for the residents of Andheri East, Chandivali, and neighboring Powai.
                </p>

                <h4 className="text-sm font-bold text-slate-800 pt-2">Clinical Care Areas:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <li className="flex items-center gap-2 p-2 rounded-lg bg-teal-50 border border-teal-100 text-[#0A5C67] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C67] shrink-0" />
                    <span>General & Conservative Dentistry</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg bg-teal-50 border border-teal-100 text-[#0A5C67] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C67] shrink-0" />
                    <span>Cosmetic Smile Design</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg bg-teal-50 border border-teal-100 text-[#0A5C67] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C67] shrink-0" />
                    <span>Rotary Root Canal Therapy</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 rounded-lg bg-teal-50 border border-teal-100 text-[#0A5C67] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C67] shrink-0" />
                    <span>Preventive & Pediatric Guidance</span>
                  </li>
                </ul>

                <h4 className="text-sm font-bold text-slate-800 pt-2">Clinic Location & Consultation:</h4>
                <div className="text-xs space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#0A5C67]" />
                    <span>{CLINIC_INFO.address.full}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#0A5C67]" />
                    <span>Phone: {CLINIC_INFO.contact.phone}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
                <a
                  href="#appointment"
                  onClick={() => setProfileModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#0A5C67] text-white font-semibold text-xs flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Appointment</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
