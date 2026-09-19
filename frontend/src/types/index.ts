export interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  full_description?: string;
  icon?: string;
  is_active: boolean;
  display_order: number;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
  id: number;
  patient_name: string;
  phone: string;
  email?: string;
  service_id?: number;
  service_name?: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface AppointmentFormData {
  patient_name: string;
  phone: string;
  email?: string;
  service_name: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  website_url?: string; // honeypot
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}

export interface TestimonialItem {
  id: number;
  patient_name: string;
  area: string;
  rating: number;
  review: string;
  is_verified: boolean;
  display_order: number;
}

export interface ContactMessageFormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
  website_url?: string;
}
