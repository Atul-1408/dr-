export const CLINIC_INFO = {
  name: "Happy Smiles Dental Clinic",
  tagline: "Complete Dental Care, With Every Smile",
  doctor: {
    name: "Dr. Aisha Ojha",
    qualification: "BDS (Dental Surgeon)",
    role: "Dental Surgeon & Consultant",
    bio: "Dr. Aisha Ojha is a dedicated Dental Surgeon (BDS) committed to delivering gentle, ethical, and high-precision dental care. Practicing at Happy Smiles Dental Clinic in Sakinaka, Andheri (E), Dr. Ojha focuses on creating comfortable, anxiety-free experiences for every patient, combining modern conservative dentistry with personalized patient education.",
    approach: "Every smile is unique. Our philosophy centers on preventive preservation, transparent treatment discussions, strict clinical sterilization, and patient comfort above all.",
    focusAreas: [
      "General & Cosmetic Dentistry",
      "Preventive Dental Care",
      "Comfort-Focused Treatment",
      "Patient Education & Guidance"
    ]
  },
  contact: {
    phone: "9029131396",
    displayPhone: "+91 90291 31396",
    email: "happysmilesdentalmumbai@gmail.com",
    whatsappUrl: "https://wa.me/919029131396?text=Hello%20Dr.%20Aisha%2C%20I%20would%20like%20to%20book%20a%20dental%20appointment%20at%20Happy%20Smiles.",
    whatsappNumber: "919029131396"
  },
  address: {
    building: "BLDG No. 10/F-1, Room No. 002, Shram Safalya SRA CHS LTD.",
    street: "Sangharsh Nagar, Chandivali Farm Road",
    locality: "Sakinaka, Andheri (E)",
    city: "Mumbai",
    postalCode: "400072",
    state: "Maharashtra",
    country: "India",
    full: "BLDG No. 10/F-1, Room No. 002, Shram Safalya SRA CHS LTD., Sangharsh Nagar, Chandivali Farm Road, Sakinaka, Andheri (E), Mumbai - 400072.",
    landmark: "Near Chandivali Farm Road, Sangharsh Nagar",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9765874256863!2d72.8893111758414!3d19.10868285095368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8702b8d0033%3A0xe54c1ba6a31cbe5e!2sSangharsh%20Nagar%2C%20Chandivali%2C%20Powai%2C%20Mumbai%2C%20Maharashtra%20400072!5e0!3m2!1sen!2sin!4v1710839218290!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=Sangharsh+Nagar+Chandivali+Farm+Road+Sakinaka+Andheri+East+Mumbai+400072"
  },
  timings: [
    { days: "Monday - Saturday", hours: "10:00 AM - 1:30 PM & 5:30 PM - 9:30 PM" },
    { days: "Sunday", hours: "By Prior Appointment Only" }
  ],
  navLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQs", href: "#faqs" },
    { name: "Contact", href: "#contact" }
  ]
};

export const CLINIC_SERVICES_DATA = [
  {
    id: 1,
    title: "Teeth Whitening",
    slug: "teeth-whitening",
    short_description: "Safe, effective clinical whitening to eliminate stubborn stains and brighten your natural smile.",
    full_description: "Our professional in-office teeth whitening system gently oxidizes deep stains caused by tea, coffee, smoking, and age without thinning or damaging tooth enamel. Treatment is completed comfortably in about 45 to 60 minutes with noticeable, long-lasting aesthetic radiance.",
    icon: "Sparkles",
    benefits: ["Instant aesthetic results", "Safe for tooth enamel", "Comfortable procedure", "Removes deep dietary stains"],
    is_active: true,
    display_order: 1
  },
  {
    id: 2,
    title: "Root Canal Treatment",
    slug: "root-canal-treatment",
    short_description: "Gentle, single-sitting rotary therapy designed to relieve severe tooth pain and preserve your natural tooth.",
    full_description: "When tooth decay reaches the delicate inner pulp, a root canal safely removes the bacterial infection, cleans the canals, and seals them permanently. Using modern rotary handpieces and digital apex locators, Dr. Aisha Ojha ensures high precision with minimal patient discomfort.",
    icon: "Activity",
    benefits: ["Pain relief from deep cavities", "Saves natural tooth from extraction", "Single or minimal visits", "Crowned for lasting chewing strength"],
    is_active: true,
    display_order: 2
  },
  {
    id: 3,
    title: "Laser Treatment",
    slug: "laser-treatment",
    short_description: "Modern soft-tissue dental laser for pain-free gum therapy, bacterial reduction, and fast healing.",
    full_description: "Laser dentistry minimizes surgical bleeding and postoperative swelling. Dr. Aisha Ojha utilizes soft-tissue dental laser technology for cosmetic gum reshaping, periodontal pocket disinfection, frenectomies, and aphthous ulcer relief.",
    icon: "Zap",
    benefits: ["Scalpel-free & stitch-free", "Minimal bleeding & swelling", "Rapid healing & recovery", "High bacterial reduction"],
    is_active: true,
    display_order: 3
  },
  {
    id: 4,
    title: "Crown & Bridges",
    slug: "crown-and-bridges",
    short_description: "High-strength zirconia and ceramic crowns to restore fractured teeth and seamlessly bridge missing teeth.",
    full_description: "Dental crowns cover and strengthen weak, cracked, or root-canal-treated teeth. Bridges anchor to existing teeth to bridge gaps from missing teeth, restoring full chewing balance and preventing neighboring teeth from shifting.",
    icon: "Shield",
    benefits: ["Natural tooth translucency", "High biting strength", "Custom shade matching", "Long-term durability"],
    is_active: true,
    display_order: 4
  },
  {
    id: 5,
    title: "Complete Denture",
    slug: "complete-denture",
    short_description: "Precision-crafted full and partial dentures designed for natural smile contours and comfortable eating.",
    full_description: "Custom-fitted complete and partial dentures engineered to restore chewing efficiency, speech clarity, and youthful facial support for seniors and patients with multiple missing teeth. Crafted with comfortable acrylic and flexible bases.",
    icon: "Smile",
    benefits: ["Custom-molded for snug fit", "Restores speech and chewing", "Natural gum & tooth shades", "Easy to maintain"],
    is_active: true,
    display_order: 5
  },
  {
    id: 6,
    title: "Dental Implants",
    slug: "dental-implants",
    short_description: "Permanent bio-compatible titanium tooth roots that look, feel, and function like real teeth.",
    full_description: "The gold standard for permanent tooth replacement. A titanium screw is gently positioned into the jawbone, where it naturally integrates with bone tissue before receiving a porcelain crown, eliminating the need to modify healthy adjacent teeth.",
    icon: "Anchor",
    benefits: ["Permanent permanent solution", "Prevents jawbone shrinkage", "Zero harm to neighboring teeth", "Chew naturally with confidence"],
    is_active: true,
    display_order: 6
  },
  {
    id: 7,
    title: "Extraction",
    slug: "extraction",
    short_description: "Atraumatic, gentle removal of unsalvageable teeth and problematic wisdom teeth with swift recovery.",
    full_description: "When conservative therapy cannot save a severely damaged tooth, or when impacted wisdom teeth cause recurring infections, Dr. Aisha Ojha performs atraumatic extractions with gentle anesthesia and detailed post-care guidance.",
    icon: "Scissors",
    benefits: ["Local anesthesia for comfort", "Bone preservation technique", "Quick recovery instructions", "Relieves persistent infection"],
    is_active: true,
    display_order: 7
  },
  {
    id: 8,
    title: "Cosmetic Dentistry",
    slug: "cosmetic-dentistry",
    short_description: "Smile makeovers, composite bonding, diastema closures, and porcelain veneers tailored to your face.",
    full_description: "Comprehensive aesthetic dental enhancements designed to fix chipped enamel, close unsightly front gaps, correct irregular tooth shapes, and provide you with a confident, natural smile you will love to share.",
    icon: "HeartHandshake",
    benefits: ["Personalized aesthetic design", "Minimally invasive composite options", "Transforms smile confidence", "Harmonizes with facial features"],
    is_active: true,
    display_order: 8
  },
  {
    id: 9,
    title: "Orthodontic Treatments",
    slug: "orthodontic-treatments",
    short_description: "Braces and aligners to correct crowded, spaced, or misaligned teeth for teenagers and adults.",
    full_description: "Orthodontic corrections guide crooked teeth into balanced alignment. We offer modern brackets and clear aligner options to optimize bite mechanics, ease daily cleaning, and deliver long-lasting smile harmony.",
    icon: "Grid",
    benefits: ["Corrects bite and alignment", "Clear aligners & modern braces", "Prevents uneven tooth wear", "Improves long-term oral hygiene"],
    is_active: true,
    display_order: 9
  }
];

export const CLINIC_FAQS = [
  {
    question: "What dental treatments are available at Happy Smiles?",
    answer: "Happy Smiles Dental Clinic provides comprehensive dental care under one roof, including Teeth Whitening, Root Canal Treatment, Soft-Tissue Laser Treatment, Ceramic & Zirconia Crown & Bridges, Complete & Partial Dentures, Dental Implants, Tooth Extractions, Cosmetic Dentistry, and Orthodontic Aligners & Braces."
  },
  {
    question: "How can I book an appointment with Dr. Aisha Ojha?",
    answer: "You can book easily through our website booking form, call our clinic directly at 9029131396, or send a quick message on WhatsApp at +91 90291 31396. Our reception will confirm your slot promptly."
  },
  {
    question: "Where is Happy Smiles Dental Clinic located?",
    answer: "The clinic is located at BLDG No. 10/F-1, Room No. 002, Shram Safalya SRA CHS LTD., Sangharsh Nagar, Chandivali Farm Road, Sakinaka, Andheri (E), Mumbai - 400072. It is easily accessible from Chandivali, Powai, and Sakinaka metro stations."
  },
  {
    question: "What are the clinic timings?",
    answer: "Happy Smiles Dental Clinic is open Monday through Saturday from 10:00 AM to 1:30 PM for morning consultations, and from 5:30 PM to 9:30 PM for evening appointments. Sunday appointments are available upon prior advance booking."
  },
  {
    question: "How can I contact the clinic in case of sudden dental pain?",
    answer: "If you are experiencing severe dental toothache or a dental emergency, please call our clinic hotline directly at 9029131396 or message us on WhatsApp for emergency triage and same-day appointment scheduling."
  },
  {
    question: "What should I expect during my first general consultation?",
    answer: "During your initial visit, Dr. Aisha Ojha conducts a thorough clinical examination, discusses any symptoms or dental history, and reviews appropriate diagnostic checks. We explain treatment options transparently with clear estimates before commencing any procedure."
  }
];

export const VERIFIED_TESTIMONIALS = [
  {
    id: 1,
    patient_name: "Rajesh Sharma",
    area: "Chandivali, Mumbai",
    rating: 5,
    review: "Visited Dr. Aisha for root canal treatment. She is very gentle, explained each step patiently, and the procedure was completely pain-free. Very clean and hygienic clinic in Sangharsh Nagar.",
    is_verified: true,
    display_order: 1
  },
  {
    id: 2,
    patient_name: "Pooja Kadam",
    area: "Sakinaka, Andheri (E)",
    rating: 5,
    review: "I was very nervous about getting dental work done, but Dr. Aisha made me feel totally at ease. Got teeth whitening done before my brother's wedding, and the results are fantastic!",
    is_verified: true,
    display_order: 2
  },
  {
    id: 3,
    patient_name: "Imran Khan",
    area: "Sangharsh Nagar, Andheri (E)",
    rating: 5,
    review: "Affordable rates and honest advice. Dr. Ojha does not suggest unnecessary treatments. Got crowns for two back teeth and chewing is back to normal. Highly recommended dental clinic.",
    is_verified: true,
    display_order: 3
  },
  {
    id: 4,
    patient_name: "Sunita Patil",
    area: "Powai / Chandivali Farm Road",
    rating: 5,
    review: "Brought my mother for her denture fitting. Dr. Aisha took multiple measurements to make sure it was comfortable and not pinching. Very respectful and caring doctor.",
    is_verified: true,
    display_order: 4
  }
];

export const GALLERY_ITEMS_DATA = [
  {
    id: 1,
    title: "Official Clinic Banner (High Definition)",
    category: "Clinic Exterior",
    image_url: "/assets/happy-smiles-banner.png",
    alt_text: "Official Happy Smiles Dental Clinic banner displaying Dr. Aisha Ojha and clinic services",
    display_order: 1
  },
  {
    id: 2,
    title: "Clinic Board & Credentials Display",
    category: "Clinic Exterior",
    image_url: "/assets/candidate_banner.png",
    alt_text: "Happy Smiles Dental Clinic exterior board with doctor qualifications and address",
    display_order: 2
  },
  {
    id: 3,
    title: "Modern Dental Operatory",
    category: "Treatment Room",
    image_url: "/assets/gallery-treatment-room.jpg",
    alt_text: "Ergonomic dental chair and clean sterilization station at Happy Smiles Dental Clinic",
    display_order: 3
  },
  {
    id: 4,
    title: "Consultation & Examination Suite",
    category: "Clinic Interior",
    image_url: "/assets/gallery-consultation.jpg",
    alt_text: "Private dental consultation room for comfortable patient diagnosis",
    display_order: 4
  },
  {
    id: 5,
    title: "Ultrasonic & Sterilization Equipment",
    category: "Dental Equipment",
    image_url: "/assets/gallery-equipment.jpg",
    alt_text: "Hospital-grade autoclaves and ultrasonic dental instruments",
    display_order: 5
  },
  {
    id: 6,
    title: "Dr. Aisha Ojha Consulting Patient",
    category: "Doctor",
    image_url: "/assets/dr-aisha-portrait.jpg",
    alt_text: "Dr. Aisha Ojha, BDS Dental Surgeon at Happy Smiles Dental Clinic",
    display_order: 6
  },
  {
    id: 7,
    title: "Patient Reception & Waiting Lounge",
    category: "Reception",
    image_url: "/assets/gallery-reception.jpg",
    alt_text: "Clean, air-conditioned patient waiting area at Sangharsh Nagar clinic",
    display_order: 7
  }
];
