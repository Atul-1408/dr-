'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import Logo from './Logo';
import { CLINIC_INFO } from '@/constants/clinic';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = CLINIC_INFO.navLinks;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
          : 'py-4 lg:py-5 bg-white/85 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="#home" className="group">
            <Logo size={isScrolled ? 'sm' : 'md'} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#0A5C67] rounded-lg transition-colors duration-150 hover:bg-teal-50/60"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA & Emergency Phone */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.contact.phone}`}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0A5C67] bg-teal-50/80 px-3 py-2 rounded-full border border-teal-200/60 hover:bg-teal-100/70 transition-all"
              title="Direct Call Hotline"
            >
              <Phone className="w-3.5 h-3.5 text-[#0A5C67]" />
              <span>{CLINIC_INFO.contact.phone}</span>
            </a>

            <a
              href="#appointment"
              className="flex items-center gap-2 bg-[#0A5C67] hover:bg-[#064E55] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md hover:shadow-teal-900/10 transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#appointment"
              className="bg-[#0A5C67] text-white text-xs font-semibold px-3 py-2 rounded-full shadow-xs flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0A5C67] hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-[#0A5C67]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-xl transition-all duration-300">
          <div className="px-4 pt-3 pb-6 space-y-1.5 max-h-[85vh] overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:text-[#0A5C67] hover:bg-teal-50/70 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <a
                href={`tel:${CLINIC_INFO.contact.phone}`}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-teal-300 text-[#0A5C67] font-semibold text-sm bg-teal-50/50"
              >
                <Phone className="w-4 h-4" />
                <span>Call Clinic: {CLINIC_INFO.contact.phone}</span>
              </a>

              <a
                href="#appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0A5C67] text-white font-semibold text-sm shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
