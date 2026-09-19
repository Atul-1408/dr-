'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HeartHandshake, 
  Cpu, 
  ShieldCheck, 
  CircleDollarSign, 
  ArrowRight, 
  ZoomIn, 
  X, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { CLINIC_INFO } from '@/constants/clinic';

export default function About() {
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const features = [
    {
      title: 'Patient-Centric Approach',
      desc: 'Gentle, respectful, anxiety-free care tailored to individual comfort and expectations.',
      icon: HeartHandshake,
    },
    {
      title: 'Advanced Technology',
      desc: 'Rotary endodontics, soft-tissue laser, and digital diagnostics for superior clinical accuracy.',
      icon: Cpu,
    },
    {
      title: 'Hygienic & Safe Environment',
      desc: 'Multi-stage autoclave sterilization and surgical-grade hygiene protocols for zero infection risk.',
      icon: ShieldCheck,
    },
    {
      title: 'Affordable Treatment',
      desc: 'Transparent pricing with ethical guidance and no unnecessary procedures or hidden charges.',
      icon: CircleDollarSign,
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* LEFT SIDE: About Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0A5C67] text-xs font-bold uppercase tracking-wider mb-4">
              <span>{CLINIC_INFO.name}</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-3">
              About Happy Smiles
            </h2>

            {/* Subtitle */}
            <h3 className="text-lg sm:text-xl font-semibold text-[#0A5C67] mb-6">
              Your Trusted Dental Clinic in Sakinaka, Andheri (E)
            </h3>

            {/* Content */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
              At Happy Smiles Dental Clinic, we are committed to providing high-quality, personalized dental care for patients of all ages. Our focus is on comfortable and effective dental treatment using modern technology.
            </p>

            {/* Four Feature Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-200 hover:bg-teal-50/40 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 group-hover:border-teal-300 flex items-center justify-center mb-3 shadow-2xs">
                      <IconComponent className="w-5 h-5 text-[#0A5C67]" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0A5C67] hover:bg-[#064E55] text-white font-semibold text-sm shadow-md shadow-teal-900/10 hover:shadow-lg transition-all active:scale-98"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#doctor"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold text-slate-700 hover:text-[#0A5C67] hover:bg-teal-50 transition-colors"
              >
                <span>Meet Dr. Aisha Ojha</span>
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE: OFFICIAL SUPPLIED HAPPY SMILES CLINIC BANNER */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 w-full"
          >
            <div className="relative group">
              {/* Outer decorative ambient blur */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-teal-200/30 to-sky-200/20 rounded-3xl blur-lg -z-10" />

              {/* Premium frame container preserving exact aspect ratio */}
              <div 
                onClick={() => setIsBannerModalOpen(true)}
                className="relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border-2 border-teal-100/90 bg-white transition-all duration-300 transform group-hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[16/9] bg-slate-900/5">
                  <Image
                    src="/assets/happy-smiles-banner.png"
                    alt="Official Happy Smiles Dental Clinic banner featuring Dr. Aisha Ojha BDS and clinic treatments"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    className="object-contain object-center"
                    priority
                  />
                  
                  {/* Subtle hover overlay with Click to Zoom indicator */}
                  <div className="absolute inset-0 bg-teal-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-slate-800 text-xs font-bold shadow-lg">
                      <ZoomIn className="w-4 h-4 text-[#0A5C67]" />
                      <span>Click to view banner in full resolution</span>
                    </span>
                  </div>
                </div>

                {/* Caption Bar under banner */}
                <div className="p-3.5 bg-gradient-to-r from-teal-50 via-white to-sky-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-[#0A5C67] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Official Happy Smiles Clinic Board</span>
                  </span>
                  <span className="text-slate-500 font-medium text-[11px]">
                    Sakinaka, Andheri (E)
                  </span>
                </div>
              </div>

              {/* Verified Address & Direct Hotline */}
              <div className="mt-3 flex flex-wrap items-center justify-between px-2 text-xs text-slate-500 gap-2">
                <span>📍 Sangharsh Nagar, Chandivali Farm Road</span>
                <span className="font-bold text-[#0A5C67]">📞 9029131396</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Lightbox Modal for Official Clinic Banner */}
      <AnimatePresence>
        {isBannerModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={() => setIsBannerModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 text-white">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">Official Happy Smiles Dental Clinic Banner</span>
                  <span className="text-xs text-teal-400 font-normal">| Dr. Aisha Ojha, BDS</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBannerModalOpen(false)}
                  className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Uncompressed Image Viewer */}
              <div className="relative w-full aspect-[16/9] bg-slate-950 flex items-center justify-center">
                <Image
                  src="/assets/happy-smiles-banner.png"
                  alt="Official Happy Smiles Dental Clinic Banner High Resolution"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                <div>
                  <strong className="text-slate-800">Address: </strong>
                  {CLINIC_INFO.address.full}
                </div>
                <a
                  href={`tel:${CLINIC_INFO.contact.phone}`}
                  className="px-4 py-2 rounded-full bg-[#0A5C67] text-white font-semibold text-xs shrink-0"
                >
                  Call: {CLINIC_INFO.contact.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail Modal for "Learn More About Us" */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsDetailModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#0A5C67] text-xs font-bold uppercase mb-3">
                Our Story & Commitment
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Welcome to Happy Smiles Dental Clinic
              </h3>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Located in the heart of Sangharsh Nagar, Sakinaka (Andheri East), Happy Smiles Dental Clinic was founded with a singular purpose: to make modern, high-quality dentistry accessible, gentle, and transparent for our local community.
                </p>
                <p>
                  Led by <strong>Dr. Aisha Ojha (BDS, Dental Surgeon)</strong>, our clinic provides comprehensive dental treatments spanning restorative dentistry, rotary root canal therapy, soft-tissue laser applications, aesthetic smile enhancements, and prosthetic dentures.
                </p>
                
                <h4 className="text-base font-bold text-slate-800 pt-2">
                  Our Patient Care Standards:
                </h4>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C67] shrink-0 mt-1" />
                    <span><strong>Transparent Treatment Plans:</strong> Every diagnosis is explained with clinical clarity before starting any treatment.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C67] shrink-0 mt-1" />
                    <span><strong>Hospital-Grade Sterilization:</strong> All reusable instruments undergo thorough ultrasonic cleaning and autoclave sterilization.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0A5C67] shrink-0 mt-1" />
                    <span><strong>Convenient Local Access:</strong> Situated on Chandivali Farm Road, Sakinaka, catering to Powai, Chandivali, and Andheri East families.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 items-center justify-between">
                <div className="text-xs text-slate-500">
                  Phone: <strong className="text-slate-800">{CLINIC_INFO.contact.phone}</strong>
                </div>
                <a
                  href="#appointment"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0A5C67] text-white font-semibold text-sm flex items-center gap-2 hover:bg-[#064E55]"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
