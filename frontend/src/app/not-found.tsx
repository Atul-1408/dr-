import React from 'react';
import Link from 'next/link';
import { Home, Phone } from 'lucide-react';
import Logo from '@/components/Logo';
import { CLINIC_INFO } from '@/constants/clinic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="py-6 max-w-7xl mx-auto px-4 w-full flex justify-center">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </header>

      {/* Main 404 Content */}
      <main className="max-w-xl mx-auto px-4 text-center py-12">
        <div className="w-20 h-20 rounded-3xl bg-teal-50 border border-teal-200 text-[#0A5C67] flex items-center justify-center mx-auto mb-6 text-3xl font-extrabold font-mono shadow-xs">
          404
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          The page you are looking for might have been moved or doesn&apos;t exist. Let&apos;s get you back to Happy Smiles Dental Clinic.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A5C67] text-white text-sm font-semibold hover:bg-[#064E55] shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <a
            href={`tel:${CLINIC_INFO.contact.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all"
          >
            <Phone className="w-4 h-4 text-[#0A5C67]" />
            <span>Call Clinic: {CLINIC_INFO.contact.phone}</span>
          </a>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200">
        © 2026 Happy Smiles Dental Clinic • Dr. Aisha Ojha, BDS
      </footer>
    </div>
  );
}
