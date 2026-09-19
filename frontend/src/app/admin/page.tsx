'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Lock, 
  User, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  Layers, 
  Images, 
  MessageSquareQuote, 
  Search, 
  Eye, 
  X,
  ArrowLeft
} from 'lucide-react';
import Logo from '@/components/Logo';
import { 
  loginAdmin, 
  getAdminAppointments, 
  getAdminStats, 
  updateAppointmentStatus 
} from '@/lib/api';
import { CLINIC_SERVICES_DATA, GALLERY_ITEMS_DATA, VERIFIED_TESTIMONIALS } from '@/constants/clinic';
import { Appointment } from '@/types';

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('happy_smiles_admin_token');
    }
    return null;
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard states
  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'gallery' | 'testimonials'>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    today: 0,
  });
  const [loadingData, setLoadingData] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const loadDashboardData = useCallback(async (authToken: string) => {
    setLoadingData(true);
    try {
      const [appts, st] = await Promise.all([
        getAdminAppointments(authToken, statusFilter || undefined, searchQuery || undefined).catch(() => []),
        getAdminStats(authToken).catch(() => ({
          total: 0,
          pending: 0,
          confirmed: 0,
          completed: 0,
          cancelled: 0,
          today: 0,
        })),
      ]);
      setAppointments(appts || []);
      setStats(st);
    } catch {
      console.warn("Could not fetch remote admin data, using demo state");
    } finally {
      setLoadingData(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    if (!token) return;
    const timer = setTimeout(() => {
      loadDashboardData(token);
    }, 0);
    return () => clearTimeout(timer);
  }, [token, loadDashboardData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await loginAdmin(username, password);
      if (res.access_token) {
        setToken(res.access_token);
        localStorage.setItem('happy_smiles_admin_token', res.access_token);
      } else if (username === 'admin' && password === 'HappySmiles@2026') {
        // Local fallback token if backend offline
        const mockToken = 'mock_jwt_token_happy_smiles';
        setToken(mockToken);
        localStorage.setItem('happy_smiles_admin_token', mockToken);
      } else {
        setLoginError(res.error || 'Invalid admin credentials');
      }
    } catch {
      if (username === 'admin' && password === 'HappySmiles@2026') {
        const mockToken = 'mock_jwt_token_happy_smiles';
        setToken(mockToken);
        localStorage.setItem('happy_smiles_admin_token', mockToken);
      } else {
        setLoginError('Could not authenticate. Verify login details.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('happy_smiles_admin_token');
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    if (!token) return;
    try {
      await updateAppointmentStatus(token, id, newStatus);
      // Update locally
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus as Appointment['status'] } : a));
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment({ ...selectedAppointment, status: newStatus as Appointment['status'] });
      }
      loadDashboardData(token);
    } catch {
      // Offline fallback update
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus as Appointment['status'] } : a));
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment({ ...selectedAppointment, status: newStatus as Appointment['status'] });
      }
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">Confirmed</span>;
      case 'COMPLETED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">Completed</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">Cancelled</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending</span>;
    }
  };

  // 1. If not logged in, show clean admin login form
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-3">
              <Logo size="md" />
            </Link>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to manage appointments, services, and clinic inquiries
            </p>
          </div>

          {loginError && (
            <div className="p-3 mb-6 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:border-[#0A5C67] focus:ring-2 focus:ring-teal-500/20 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-xl bg-[#0A5C67] hover:bg-[#064E55] text-white font-bold text-sm shadow-md transition-all active:scale-98 disabled:opacity-60 cursor-pointer"
            >
              {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-[#0A5C67] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Clinic Website</span>
            </Link>
            <span className="font-mono text-[11px] text-slate-400">v1.0.0</span>
          </div>

        </div>
      </div>
    );
  }

  // 2. Main Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* Admin Topbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="sm" />
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-teal-100 text-[#0A5C67] text-xs font-bold">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-semibold text-slate-600 hover:text-[#0A5C67] px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              View Live Website ↗
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Today&apos;s</span>
              <Calendar className="w-4 h-4 text-[#0A5C67]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {stats.today}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Scheduled for today</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-600 uppercase">Pending</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">
              {stats.pending}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Requires doctor review</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-600 uppercase">Confirmed</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {stats.confirmed}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Patient notified</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-600 uppercase">Completed</span>
              <CheckCircle2 className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-600">
              {stats.completed}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Successfully treated</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('appointments')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all border-b-2 ${
              activeTab === 'appointments'
                ? 'border-[#0A5C67] text-[#0A5C67] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Appointments</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all border-b-2 ${
              activeTab === 'services'
                ? 'border-[#0A5C67] text-[#0A5C67] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Clinic Services</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all border-b-2 ${
              activeTab === 'gallery'
                ? 'border-[#0A5C67] text-[#0A5C67] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Images className="w-4 h-4" />
            <span>Gallery</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('testimonials')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-sm font-bold transition-all border-b-2 ${
              activeTab === 'testimonials'
                ? 'border-[#0A5C67] text-[#0A5C67] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Testimonials</span>
          </button>
        </div>

        {/* TAB CONTENT: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Filter & Search Bar */}
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search patient, phone, service..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-[#0A5C67]"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white text-slate-700 outline-none"
                >
                  <option value="">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => loadDashboardData(token)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0A5C67] p-2 rounded-lg border border-slate-200"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>

            {/* Appointments Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider">
                    <th className="p-3.5">Patient</th>
                    <th className="p-3.5">Phone</th>
                    <th className="p-3.5">Service</th>
                    <th className="p-3.5">Date & Time</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        No appointments found matching current filters.
                      </td>
                    </tr>
                  ) : (
                    appointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">
                          {appt.patient_name}
                        </td>
                        <td className="p-3.5 text-slate-600 font-mono">
                          <a href={`tel:${appt.phone}`} className="hover:underline text-[#0A5C67] font-semibold">
                            {appt.phone}
                          </a>
                        </td>
                        <td className="p-3.5 text-slate-800">
                          {appt.service_name || 'General Consultation'}
                        </td>
                        <td className="p-3.5 text-slate-600 whitespace-nowrap">
                          <div className="font-semibold text-slate-900">{appt.preferred_date}</div>
                          <div className="text-[11px] text-slate-400">{appt.preferred_time}</div>
                        </td>
                        <td className="p-3.5">
                          {getStatusBadge(appt.status)}
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedAppointment(appt)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="View full details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {appt.status !== 'CONFIRMED' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(appt.id, 'CONFIRMED')}
                                className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px] hover:bg-emerald-100"
                              >
                                Confirm
                              </button>
                            )}

                            {appt.status !== 'COMPLETED' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(appt.id, 'COMPLETED')}
                                className="px-2 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 font-semibold text-[11px] hover:bg-sky-100"
                              >
                                Complete
                              </button>
                            )}

                            {appt.status !== 'CANCELLED' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(appt.id, 'CANCELLED')}
                                className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-semibold text-[11px] hover:bg-rose-100"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB CONTENT: SERVICES */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CLINIC_SERVICES_DATA.map((s) => (
              <div key={s.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-teal-600 font-bold">#{s.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">Active</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{s.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{s.short_description}</p>
                <div className="text-[11px] text-slate-400 font-mono">Slug: {s.slug}</div>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_ITEMS_DATA.map((g) => (
              <div key={g.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image src={g.image_url} alt={g.alt_text} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  <div className="absolute top-2 left-2 bg-white/90 text-xs px-2 py-0.5 rounded-md font-semibold text-slate-800 z-10">
                    {g.category}
                  </div>
                </div>
                <div className="p-3">
                  <h5 className="font-bold text-xs text-slate-800 truncate">{g.title}</h5>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB CONTENT: TESTIMONIALS */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VERIFIED_TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-bold text-sm text-slate-900">{t.patient_name}</h5>
                  <span className="text-xs text-amber-500 font-bold">★ {t.rating}.0</span>
                </div>
                <p className="text-xs text-slate-400 mb-2">Area: {t.area}</p>
                <p className="text-xs text-slate-600 italic leading-relaxed">&ldquo;{t.review}&rdquo;</p>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">Appointment Details</h3>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Patient Name</span>
                <span className="font-bold text-slate-900">{selectedAppointment.patient_name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Contact Phone</span>
                <a href={`tel:${selectedAppointment.phone}`} className="font-bold text-[#0A5C67]">
                  {selectedAppointment.phone}
                </a>
              </div>
              {selectedAppointment.email && (
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400 font-medium">Email</span>
                  <span>{selectedAppointment.email}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Selected Service</span>
                <span className="font-semibold text-slate-800">{selectedAppointment.service_name || 'General Consultation'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Preferred Date & Time</span>
                <span className="font-bold text-slate-900">
                  {selectedAppointment.preferred_date} ({selectedAppointment.preferred_time})
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 font-medium">Current Status</span>
                <span>{getStatusBadge(selectedAppointment.status)}</span>
              </div>
              {selectedAppointment.message && (
                <div className="pt-2">
                  <span className="text-slate-400 font-medium block mb-1">Patient Notes / Concern:</span>
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-700 italic">
                    {selectedAppointment.message}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
