import React from 'react';
import Link from 'next/link';
import { 
  Phone, 
  MapPin, 
  MessageCircle, 
  Calendar
} from 'lucide-react';
import Logo from './Logo';
import { CLINIC_INFO } from '@/constants/clinic';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#064E55] text-white pt-16 pb-28 md:pb-16 border-t border-teal-800/60 relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-teal-700/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Logo variant="light" size="md" className="mb-4" />
            
            <p className="text-sm text-teal-100/90 font-medium italic mb-4">
              &ldquo;{CLINIC_INFO.tagline}&rdquo;
            </p>

            <p className="text-xs text-teal-200/80 leading-relaxed mb-6 max-w-sm">
              Providing personalized, gentle, and modern dental treatments in Sakinaka, Andheri (E), Mumbai under the expert clinical guidance of Dr. Aaisha Ojha (BDS Dental Surgeon).
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href={CLINIC_INFO.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-colors text-teal-200 hover:text-white"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-colors text-teal-200 hover:text-white"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors text-teal-200 hover:text-white"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-teal-200/90">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Treatments Col */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Treatments
            </h4>
            <ul className="space-y-2 text-xs text-teal-200/90">
              <li>• Teeth Whitening</li>
              <li>• Root Canal Treatment (RCT)</li>
              <li>• Soft-Tissue Laser Therapy</li>
              <li>• Ceramic Crown & Bridges</li>
              <li>• Complete & Partial Dentures</li>
              <li>• Dental Implants</li>
              <li>• Gentle Extractions</li>
              <li>• Cosmetic Smile Design</li>
              <li>• Orthodontic Aligners & Braces</li>
            </ul>
          </div>

          {/* Address & Contact Col */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Clinic Location
              </h4>

              <div className="space-y-3 text-xs text-teal-200/90 leading-relaxed mb-4">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                  <span>
                    BLDG No. 10/F-1, Room No. 002, Shram Safalya SRA CHS LTD., Sangharsh Nagar, Chandivali Farm Road, Sakinaka, Andheri (E), Mumbai - 400072.
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-teal-300 shrink-0" />
                  <a href={`tel:${CLINIC_INFO.contact.phone}`} className="hover:text-white font-bold text-sm">
                    {CLINIC_INFO.contact.displayPhone}
                  </a>
                </div>
              </div>
            </div>

            <a
              href="#appointment"
              className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white text-[#064E55] hover:bg-teal-50 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#064E55]" />
              <span>Book Appointment</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-teal-300/80">
          <p>© {currentYear} Happy Smiles Dental Clinic. All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span className="text-teal-400/80">Dr. Aaisha Ojha, BDS (Dental Surgeon)</span>
            <Link
              href="/admin"
              className="text-teal-300 hover:text-white underline text-[11px]"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
