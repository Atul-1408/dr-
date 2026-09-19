'use client';

import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '@/constants/clinic';

export default function FloatingActions() {
  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <a
          href={CLINIC_INFO.contact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl hover:shadow-emerald-600/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
          aria-label="Chat with clinic on WhatsApp"
        >
          {/* Subtle radiating ping ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none" />

          <MessageCircle className="w-6 h-6 text-white" />
          
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold px-0 group-hover:px-1">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 py-2 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_25px_rgba(0,0,0,0.12)]">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* Call Clinic */}
          <a
            href={`tel:${CLINIC_INFO.contact.phone}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-100 active:bg-teal-50 text-slate-800 transition-colors border border-slate-200/80 shadow-2xs"
          >
            <Phone className="w-4 h-4 text-[#0A5C67] shrink-0" />
            <span className="text-xs font-bold text-slate-800">
              Call
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href={CLINIC_INFO.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-800 transition-colors border border-emerald-300 shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-emerald-900">
              WhatsApp
            </span>
          </a>

          {/* Book Appointment */}
          <a
            href="#appointment"
            className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#0A5C67] active:bg-[#064E55] text-white shadow-xs transition-colors"
          >
            <Calendar className="w-4 h-4 text-white shrink-0" />
            <span className="text-xs font-bold text-white whitespace-nowrap">
              Book Appointment
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
