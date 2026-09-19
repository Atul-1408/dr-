'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  UserCheck, 
  Star 
} from 'lucide-react';
import { CLINIC_INFO } from '@/constants/clinic';

export default function Hero() {
  const trustIndicators = [
    { icon: UserCheck, label: 'Experienced Dentist' },
    { icon: Cpu, label: 'Modern Equipment' },
    { icon: ShieldCheck, label: 'Safe & Hygienic' },
    { icon: MapPin, label: 'Convenient Location' },
  ];

  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-sky-50/20"
    >
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-sky-100/40 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 xl:col-span-6 flex flex-col items-start"
          >
            {/* Clinic Brand & Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/90 border border-teal-200 text-[#0A5C67] text-xs sm:text-sm font-bold tracking-wide uppercase shadow-2xs mb-5">
              <Sparkles className="w-4 h-4 text-[#0A5C67]" />
              <span>YOUR SMILE, OUR CARE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0F172A] tracking-tight leading-[1.08] mb-6">
              Healthy Teeth.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0A5C67] via-[#0E7490] to-[#0284C7]">
                Confident Smile.
              </span>
            </h1>

            {/* Clinic Subheading with Doctor & Location Identification */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-xl mb-8">
              <strong className="text-slate-800 font-bold">Happy Smiles Dental Clinic</strong> provides complete, gentle, and modern dental care for all ages under the expert consultation of <strong className="text-[#0A5C67] font-bold">Dr. Aaisha Ojha (BDS Dental Surgeon)</strong> in Sakinaka, Andheri East.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0A5C67] hover:bg-[#064E55] text-white font-bold text-base shadow-md shadow-teal-900/15 hover:shadow-xl hover:shadow-teal-900/25 transition-all duration-200 active:scale-98"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </a>

              <a
                href={CLINIC_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 font-bold text-base border-2 border-emerald-300 shadow-2xs hover:border-emerald-400 transition-all duration-200 active:scale-98"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-200/80 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
              {trustIndicators.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100/80 flex items-center justify-center shrink-0 shadow-2xs">
                      <IconComponent className="w-4 h-4 text-[#0A5C67]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Hero Visuals - Larger & Dominant */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 xl:col-span-6 relative w-full"
          >
            {/* Outer Glow Halo */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-teal-200/40 via-sky-200/30 to-transparent rounded-3xl blur-xl -z-10" />

            {/* Main Clinical Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[16/11] lg:aspect-[1.15/1] bg-slate-100 w-full">
              <Image
                src="/assets/hero-dental.jpg"
                alt="Modern dental operatory at Happy Smiles Dental Clinic"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                className="object-cover object-center"
              />
              
              {/* Subtle gradient vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Doctor Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -left-3 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-teal-100 max-w-[290px] z-10"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#0A5C67]">
                  <Image
                    src="/assets/dr-aaisha-portrait.jpg"
                    alt="Dr. Aaisha Ojha BDS"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] leading-tight">
                    Dr. Aaisha Ojha
                  </h4>
                  <p className="text-xs font-semibold text-[#0A5C67] mt-0.5">
                    BDS (Dental Surgeon)
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-600 font-medium">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Personalized Gentle Care</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Hygiene & Quality Pill */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="hidden sm:flex absolute -top-4 -right-3 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg border border-teal-100 items-center gap-2 z-10"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-slate-800">
                100% Sterile & Safe Protocol
              </span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
