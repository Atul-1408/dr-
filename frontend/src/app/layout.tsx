import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CLINIC_INFO } from '@/constants/clinic';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#064E55',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Happy Smiles Dental Clinic | Dr. Aisha Ojha (BDS) - Sakinaka, Andheri East, Mumbai',
  description:
    'Happy Smiles Dental Clinic in Sakinaka, Andheri (E), Mumbai. Led by Dr. Aisha Ojha, BDS (Dental Surgeon). Expert teeth whitening, root canal treatment, laser therapy, dental implants, crowns & dentures. Call 9029131396.',
  keywords: [
    'Happy Smiles Dental Clinic',
    'Dr Aisha Ojha',
    'Dentist in Sakinaka',
    'Dental Clinic Andheri East',
    'Sangharsh Nagar Dentist',
    'Chandivali Farm Road Dental Clinic',
    'Root Canal Treatment Sakinaka',
    'Teeth Whitening Mumbai',
    'Dental Implants Andheri',
    'BDS Dental Surgeon Mumbai',
    'Emergency Dentist Sakinaka',
  ],
  authors: [{ name: 'Dr. Aisha Ojha' }],
  creator: 'Happy Smiles Dental Clinic',
  metadataBase: new URL('https://happysmilesdental.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Happy Smiles Dental Clinic | Complete Dental Care in Sakinaka, Mumbai',
    description:
      'Complete Dental Care with Every Smile. Consult Dr. Aisha Ojha, BDS Dental Surgeon at Sangharsh Nagar, Sakinaka, Andheri East. Call 9029131396.',
    url: 'https://happysmilesdental.in',
    siteName: 'Happy Smiles Dental Clinic',
    images: [
      {
        url: '/assets/happy-smiles-banner.png',
        width: 1200,
        height: 675,
        alt: 'Happy Smiles Dental Clinic Official Banner - Dr. Aisha Ojha BDS',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Smiles Dental Clinic | Dr. Aisha Ojha BDS',
    description: 'Complete Dental Care with modern technology in Sakinaka, Andheri East, Mumbai.',
    images: ['/assets/happy-smiles-banner.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness / Dentist Structured Data Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: CLINIC_INFO.name,
    image: 'https://happysmilesdental.in/assets/happy-smiles-banner.png',
    '@id': 'https://happysmilesdental.in',
    url: 'https://happysmilesdental.in',
    telephone: CLINIC_INFO.contact.phone,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${CLINIC_INFO.address.building}, ${CLINIC_INFO.address.street}`,
      addressLocality: CLINIC_INFO.address.locality,
      addressRegion: CLINIC_INFO.address.state,
      postalCode: CLINIC_INFO.address.postalCode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 19.10868285,
      longitude: 72.88931118,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '10:00',
        closes: '13:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '17:30',
        closes: '21:30',
      },
    ],
    employee: {
      '@type': 'Person',
      name: 'Dr. Aisha Ojha',
      jobTitle: 'Dental Surgeon',
      honorificPrefix: 'Dr.',
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Bachelor of Dental Surgery (BDS)',
      },
    },
    medicalSpecialty: 'Dentistry',
  };

  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#F8FAFC] text-[#0F172A]">
        {children}
      </body>
    </html>
  );
}
