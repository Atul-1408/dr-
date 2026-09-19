import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Doctor from '@/components/Doctor';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import AppointmentSection from '@/components/AppointmentSection';
import LocationContact from '@/components/LocationContact';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Sticky Responsive Navbar */}
      <Navbar />

      {/* Full-width Hero Section */}
      <Hero />

      {/* Services Section with 9 banner-matching procedures */}
      <Services />

      {/* About Section featuring the EXACT supplied clinic banner image on the right */}
      <About />

      {/* Meet Your Dentist: Dr. Aisha Ojha, BDS (Dental Surgeon) */}
      <Doctor />

      {/* Clinic Facilities & Equipment Gallery with Lightbox */}
      <Gallery />

      {/* Verified Local Patient Testimonials */}
      <Testimonials />

      {/* Appointment Booking Form with Validation & Confetti */}
      <AppointmentSection />

      {/* Clinic Location, Google Maps & Quick Direct Actions */}
      <LocationContact />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Dark Teal Footer */}
      <Footer />

      {/* Floating WhatsApp (Desktop) & Sticky Bottom Bar (Mobile) */}
      <FloatingActions />
    </main>
  );
}
