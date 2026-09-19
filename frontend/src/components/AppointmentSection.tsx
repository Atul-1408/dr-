'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitAppointment } from '@/lib/api';
import { CLINIC_INFO } from '@/constants/clinic';

const serviceOptions = [
  'Teeth Whitening',
  'Root Canal Treatment',
  'Laser Treatment',
  'Crown & Bridges',
  'Complete Denture',
  'Dental Implants',
  'Extraction',
  'Cosmetic Dentistry',
  'Orthodontic Treatments',
  'General Consultation',
];

const timeSlots = [
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 01:30 PM',
  '05:30 PM - 06:30 PM',
  '06:30 PM - 07:30 PM',
  '07:30 PM - 08:30 PM',
  '08:30 PM - 09:30 PM',
];

export default function AppointmentSection() {
  const [formData, setFormData] = useState({
    patient_name: '',
    phone: '',
    email: '',
    service_name: 'General Consultation',
    preferred_date: '',
    preferred_time: '10:00 AM - 11:00 AM',
    message: '',
    website_url: '', // Honeypot
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validations
    if (!formData.patient_name.trim() || formData.patient_name.length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    if (cleanPhone.length < 8 || !/^\d+$/.test(cleanPhone)) {
      setErrorMsg('Please enter a valid phone number (at least 8 digits).');
      return;
    }

    if (!formData.preferred_date) {
      setErrorMsg('Please select your preferred appointment date.');
      return;
    }

    setLoading(true);

    try {
      const res = await submitAppointment(formData);
      if (res.success) {
        setSubmitted(true);
        // Trigger celebratory confetti effect
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0A5C67', '#0284C7', '#38BDF8', '#10B981'],
          });
        } catch {
          // ignore if canvas not supported
        }
      } else {
        setErrorMsg(res.error || 'Failed to submit appointment. Please try again.');
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please contact the clinic directly at 9029131396.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="appointment"
      className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 via-teal-50/30 to-white relative overflow-hidden"
    >
      {/* Soft Decorative Ambient Background */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Context & Consultation Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100/70 border border-teal-200 text-[#0A5C67] text-xs font-bold uppercase tracking-wider mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <span>Schedule Your Visit</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] tracking-tight mb-4 leading-tight">
                Book an Appointment
              </h2>

              <p className="text-base text-slate-600 font-medium mb-6 leading-relaxed">
                Take the first step toward a healthier, more confident smile. Request an appointment slot with <strong>Dr. Aisha Ojha, BDS (Dental Surgeon)</strong> at Happy Smiles Dental Clinic in Sakinaka.
              </p>

              {/* Doctor Reassurance Pill */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs mb-6 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#0A5C67]">
                  <Image
                    src="/assets/dr-aisha-portrait.jpg"
                    alt="Dr. Aisha Ojha"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">Dr. Aisha Ojha</h4>
                  <p className="text-xs font-semibold text-[#0A5C67]">BDS (Dental Surgeon)</p>
                  <p className="text-[11px] text-slate-500">Sangharsh Nagar, Sakinaka, Andheri (E)</p>
                </div>
              </div>

              {/* Consultation Timings Box */}
              <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-100 mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A5C67] uppercase tracking-wide">
                  <Clock className="w-4 h-4 text-[#0A5C67]" />
                  <span>Consultation Timings</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1.5 pt-1">
                  <div className="flex justify-between font-medium">
                    <span>Mon - Sat Morning:</span>
                    <span className="font-bold text-slate-900">10:00 AM - 1:30 PM</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Mon - Sat Evening:</span>
                    <span className="font-bold text-slate-900">5:30 PM - 9:30 PM</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Sunday:</span>
                    <span className="font-bold text-teal-800">By Prior Appointment</span>
                  </div>
                </div>
              </div>

              {/* Need Immediate Assistance? */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  <span className="text-slate-500">Prefer direct booking?</span>
                  <p className="font-bold text-slate-800">Call 9029131396</p>
                </div>
                <a
                  href={`tel:${CLINIC_INFO.contact.phone}`}
                  className="px-4 py-2 rounded-xl bg-[#0A5C67] text-white font-bold text-xs hover:bg-[#064E55] transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Appointment Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-200/80 w-full">
            <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-4 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                  Thank You!
                </h3>
                
                <p className="text-base sm:text-lg font-semibold text-[#0A5C67] mb-2">
                  Your appointment request has been received.
                </p>

                <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
                  Our clinic reception will contact you shortly on <strong>{formData.phone}</strong> to confirm your slot with Dr. Aisha Ojha.
                </p>

                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 max-w-md w-full text-xs text-slate-700 text-left mb-8 space-y-1.5">
                  <p><strong>Patient:</strong> {formData.patient_name}</p>
                  <p><strong>Service:</strong> {formData.service_name}</p>
                  <p><strong>Preferred Date:</strong> {formData.preferred_date}</p>
                  <p><strong>Time Slot:</strong> {formData.preferred_time}</p>
                  <p><strong>Location:</strong> Sangharsh Nagar, Sakinaka, Andheri (E)</p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        patient_name: '',
                        phone: '',
                        email: '',
                        service_name: 'General Consultation',
                        preferred_date: '',
                        preferred_time: '10:00 AM - 11:00 AM',
                        message: '',
                        website_url: '',
                      });
                    }}
                    className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Book Another Appointment
                  </button>

                  <a
                    href={CLINIC_INFO.contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-semibold"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {errorMsg && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Honeypot hidden input for anti-spam */}
                <input
                  type="text"
                  name="website_url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.patient_name}
                        onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-800 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-800 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-800 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Select Service */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Select Service <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.service_name}
                      onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-800 bg-white transition-all outline-none"
                    >
                      {serviceOptions.map((svc) => (
                        <option key={svc} value={svc}>
                          {svc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Preferred Date <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.preferred_date}
                        onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-800 bg-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Preferred Time Slot <span className="text-rose-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.preferred_time}
                      onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-800 bg-white transition-all outline-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Dental Concern / Message <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your symptoms or inquiry (e.g., toothache in upper molar, routine cleanup, teeth whitening inquiry)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 text-sm text-slate-800 transition-all outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-[#0A5C67] hover:bg-[#064E55] text-white font-bold text-base shadow-md shadow-teal-900/15 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70 cursor-pointer"
                  >
                    {loading ? (
                      <span>Submitting Request...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Request Appointment</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Trust guarantee */}
                <div className="text-center flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Your medical information is strictly private and secure.</span>
                </div>

              </form>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  </section>
);
}
