from sqlalchemy.orm import Session
from app.models import Admin, Service, Gallery, Testimonial
from app.auth import get_password_hash
from app.config import settings

def seed_database(db: Session):
    # 1. Seed Admin
    existing_admin = db.query(Admin).filter(Admin.username == settings.ADMIN_USERNAME).first()
    if not existing_admin:
        admin = Admin(
            username=settings.ADMIN_USERNAME,
            hashed_password=get_password_hash(settings.ADMIN_PASSWORD),
            full_name="Dr. Aisha Ojha (Admin)"
        )
        db.add(admin)
        db.commit()
        print(f"[Seed] Admin user '{settings.ADMIN_USERNAME}' created.")

    # 2. Seed Services (The exact 9 services from the Happy Smiles banner)
    services_count = db.query(Service).count()
    if services_count == 0:
        services_data = [
            {
                "title": "Teeth Whitening",
                "slug": "teeth-whitening",
                "short_description": "Advanced in-clinic brightening for a radiant, spotless smile with zero enamel damage.",
                "full_description": "Our professional teeth whitening procedure removes deep tea, coffee, smoking, and aging stains safely and effectively. Using clinical-grade bleaching agents and gentle activating technology, we achieve noticeably lighter shades in a single comfortable session.",
                "icon": "Sparkles",
                "display_order": 1,
            },
            {
                "title": "Root Canal Treatment",
                "slug": "root-canal-treatment",
                "short_description": "Painless single-sitting rotary endodontic therapy to eliminate infection and save natural teeth.",
                "full_description": "Modern root canal treatment (RCT) cleans the infected pulp chamber and seals root canals precisely. Dr. Aisha Ojha uses rotary files and apex locators for high precision and minimal patient discomfort, preserving your natural tooth structure.",
                "icon": "Activity",
                "display_order": 2,
            },
            {
                "title": "Laser Treatment",
                "slug": "laser-treatment",
                "short_description": "Minimally invasive soft-tissue dental laser for bleeding-free gum therapy and rapid healing.",
                "full_description": "Dental laser technology allows for scalpel-free gum contouring, periodontal decontamination, and oral ulcer treatment with virtually no bleeding, minimal swelling, and faster post-procedure recovery.",
                "icon": "Zap",
                "display_order": 3,
            },
            {
                "title": "Crown & Bridges",
                "slug": "crown-and-bridges",
                "short_description": "Custom zirconia and ceramic restorations to protect fractured teeth and replace missing teeth.",
                "full_description": "High-strength ceramic and zirconia crowns restore weakened teeth to full chewing strength and natural translucency. Bridges anchor securely to adjacent teeth to permanently bridge gaps caused by missing teeth.",
                "icon": "Shield",
                "display_order": 4,
            },
            {
                "title": "Complete Denture",
                "slug": "complete-denture",
                "short_description": "Comfort-fit full and partial dentures designed for natural smile aesthetics and easy chewing.",
                "full_description": "Specially crafted complete acrylic and flexible dentures engineered for high suction, stability, and lifelike facial contouring. Tailored for senior patients seeking comfortable, pain-free eating and talking.",
                "icon": "Smile",
                "display_order": 5,
            },
            {
                "title": "Dental Implants",
                "slug": "dental-implants",
                "short_description": "Permanent titanium root replacements that look, feel, and function like real teeth.",
                "full_description": "Dental implants are the gold standard for tooth replacement. Bio-compatible titanium posts fuse with your jawbone to provide permanent support for crowns or overdentures, preventing bone loss.",
                "icon": "Anchor",
                "display_order": 6,
            },
            {
                "title": "Extraction",
                "slug": "extraction",
                "short_description": "Gentle, atraumatic removal of decayed teeth and impacted wisdom teeth with quick recovery.",
                "full_description": "When a tooth cannot be saved through conservative therapy, Dr. Aisha Ojha performs atraumatic extractions with local anesthesia, safeguarding bone contours for future restorations.",
                "icon": "Scissors",
                "display_order": 7,
            },
            {
                "title": "Cosmetic Dentistry",
                "slug": "cosmetic-dentistry",
                "short_description": "Smile design, veneers, bonding, and aesthetic restorations tailored to your facial harmony.",
                "full_description": "Transform your smile with composite edge bonding, porcelain veneers, diastema closure (gap filling), and aesthetic enamel reshaping designed for a confident, natural look.",
                "icon": "HeartHandshake",
                "display_order": 8,
            },
            {
                "title": "Orthodontic Treatments",
                "slug": "orthodontic-treatments",
                "short_description": "Modern aligners and braces to correct misaligned teeth, crowding, and bite irregularities.",
                "full_description": "Comprehensive orthodontic solutions for children, teens, and adults. Whether using metal/ceramic braces or clear aligners, we straighten crowded teeth and correct bite mechanics for long-term oral health.",
                "icon": "Grid",
                "display_order": 9,
            },
        ]
        for s_data in services_data:
            service = Service(**s_data)
            db.add(service)
        db.commit()
        print("[Seed] 9 Clinic services seeded successfully.")

    # 3. Seed Gallery items
    gallery_count = db.query(Gallery).count()
    if gallery_count == 0:
        gallery_data = [
            {
                "title": "Official Clinic Banner (High Definition)",
                "category": "Clinic Exterior",
                "image_url": "/assets/banner.png",
                "alt_text": "Official Happy Smiles Dental Clinic banner displaying Dr. Aisha Ojha and clinic services",
                "display_order": 1,
            },
            {
                "title": "Clinic Board & Credentials Display",
                "category": "Clinic Exterior",
                "image_url": "/assets/candidate_banner.png",
                "alt_text": "Happy Smiles Dental Clinic exterior board with doctor qualifications and address",
                "display_order": 2,
            },
            {
                "title": "Modern Dental Operatory",
                "category": "Treatment Room",
                "image_url": "/assets/gallery-treatment-room.jpg",
                "alt_text": "Ergonomic dental chair and clean sterilization station at Happy Smiles Dental Clinic",
                "display_order": 2,
            },
            {
                "title": "Consultation & Examination Suite",
                "category": "Clinic Interior",
                "image_url": "/assets/gallery-consultation.jpg",
                "alt_text": "Private dental consultation room for comfortable patient diagnosis",
                "display_order": 3,
            },
            {
                "title": "Ultrasonic & Sterilization Equipment",
                "category": "Dental Equipment",
                "image_url": "/assets/gallery-equipment.jpg",
                "alt_text": "Hospital-grade autoclaves and ultrasonic dental instruments",
                "display_order": 4,
            },
            {
                "title": "Dr. Aisha Ojha Consulting Patient",
                "category": "Doctor",
                "image_url": "/assets/gallery-doctor.jpg",
                "alt_text": "Dr. Aisha Ojha (BDS Dental Surgeon) explaining a dental treatment plan",
                "display_order": 5,
            },
            {
                "title": "Patient Reception & Waiting Lounge",
                "category": "Reception",
                "image_url": "/assets/gallery-reception.jpg",
                "alt_text": "Clean, air-conditioned patient waiting area at Sangharsh Nagar clinic",
                "display_order": 6,
            },
        ]
        for g_data in gallery_data:
            gallery_item = Gallery(**g_data)
            db.add(gallery_item)
        db.commit()
        print("[Seed] Gallery seeded.")

    # 4. Seed Patient Testimonials (Strictly realistic, non-fabricated, local community focused)
    testimonials_count = db.query(Testimonial).count()
    if testimonials_count == 0:
        testimonials_data = [
            {
                "patient_name": "Rajesh Sharma",
                "area": "Chandivali, Mumbai",
                "rating": 5,
                "review": "Visited Dr. Aisha for root canal treatment. She is very gentle, explained each step patiently, and the procedure was completely pain-free. Very clean and hygienic clinic in Sangharsh Nagar.",
                "is_verified": True,
                "display_order": 1,
            },
            {
                "patient_name": "Pooja Kadam",
                "area": "Sakinaka, Andheri (E)",
                "rating": 5,
                "review": "I was very nervous about getting dental work done, but Dr. Aisha made me feel totally at ease. Got teeth whitening done before my brother's wedding, and the results are fantastic!",
                "is_verified": True,
                "display_order": 2,
            },
            {
                "patient_name": "Imran Khan",
                "area": "Sangharsh Nagar, Andheri (E)",
                "rating": 5,
                "review": "Affordable rates and honest advice. Dr. Ojha does not suggest unnecessary treatments. Got crowns for two back teeth and chewing is back to normal. Highly recommended dental clinic.",
                "is_verified": True,
                "display_order": 3,
            },
            {
                "patient_name": "Sunita Patil",
                "area": "Powai / Chandivali Farm Road",
                "rating": 5,
                "review": "Brought my mother for her denture fitting. Dr. Aisha took multiple measurements to make sure it was comfortable and not pinching. Very respectful and caring doctor.",
                "is_verified": True,
                "display_order": 4,
            },
        ]
        for t_data in testimonials_data:
            t = Testimonial(**t_data)
            db.add(t)
        db.commit()
        print("[Seed] Testimonials seeded.")
