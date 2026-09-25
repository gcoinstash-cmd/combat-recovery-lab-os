import React, { useState } from 'react';
import { 
  Flame, Shield, Award, Calendar, DollarSign, Lock, ArrowRight, Check, 
  Sparkles, Layers, Thermometer, Clock, User, CheckCircle2, Activity, Heart
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface StationSlot {
  station: string;
  temp: string;
  type: 'cold' | 'hot' | 'infrared' | 'compression';
  slots: { time: string; booked: boolean }[];
}

const STATIONS: StationSlot[] = [
  {
    station: 'Plunge Pod Alpha (Deep Freeze)',
    temp: '38.4°F Constant',
    type: 'cold',
    slots: [
      { time: '08:00 AM', booked: true },
      { time: '08:30 AM', booked: false },
      { time: '09:00 AM', booked: true },
      { time: '09:30 AM', booked: false },
      { time: '10:00 AM', booked: false },
      { time: '10:30 AM', booked: true }
    ]
  },
  {
    station: 'Thermal Spa Bravo (Mineral Soak)',
    temp: '104.2°F Constant',
    type: 'hot',
    slots: [
      { time: '08:00 AM', booked: false },
      { time: '08:30 AM', booked: false },
      { time: '09:00 AM', booked: true },
      { time: '09:30 AM', booked: true },
      { time: '10:00 AM', booked: false },
      { time: '10:30 AM', booked: false }
    ]
  },
  {
    station: 'Infrared Suite Charlie (Far-IR)',
    temp: '160.0°F Solocarbon',
    type: 'infrared',
    slots: [
      { time: '08:00 AM', booked: true },
      { time: '08:30 AM', booked: true },
      { time: '09:00 AM', booked: false },
      { time: '09:30 AM', booked: false },
      { time: '10:00 AM', booked: true },
      { time: '10:30 AM', booked: false }
    ]
  },
  {
    station: 'Normatec Compression Lounge Delta',
    temp: 'Ambient Zero-G',
    type: 'compression',
    slots: [
      { time: '08:00 AM', booked: false },
      { time: '08:30 AM', booked: false },
      { time: '09:00 AM', booked: false },
      { time: '09:30 AM', booked: true },
      { time: '10:00 AM', booked: false },
      { time: '10:30 AM', booked: false }
    ]
  }
];

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const [activeTab, setActiveTab] = useState<'contrast' | 'iv-lounge'>('contrast');
  const [selectedStation, setSelectedStation] = useState('Plunge Pod Alpha (Deep Freeze)');
  const [selectedTime, setSelectedTime] = useState('08:30 AM');
  const [tier, setTier] = useState<'dropin' | 'pack' | 'blackpass'>('blackpass');
  const [athleteName, setAthleteName] = useState('');
  const [athletePhone, setAthletePhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tierPrice = tier === 'dropin' ? 65 : tier === 'pack' ? 220 : 289;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!athleteName || !athletePhone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAthleteName('');
      setAthletePhone('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-100 font-sans selection:bg-red-500/20 selection:text-red-400">
      {/* Top Station Status & Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-black shadow-lg shadow-red-600/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold block">UFC & PRO ATHLETE FACILITY</span>
              <h1 className="text-base font-extrabold text-white leading-none tracking-tight">COMBAT RECOVERY LAB OS</h1>
            </div>
          </div>

          {/* Dual Protocol Switcher */}
          <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setActiveTab('contrast')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'contrast' ? 'bg-red-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Contrast Hydro Suite (38°F / 104°F)
            </button>
            <button
              onClick={() => setActiveTab('iv-lounge')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'iv-lounge' ? 'bg-red-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Medical Athletic IV Lounge
            </button>
          </div>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-mono uppercase tracking-wider transition flex items-center gap-1.5"
          >
            <Lock className="w-3 h-3" />
            <span>[ RECOVERY PASS ]</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Live Facility Telemetry Ticker */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#121214] border border-zinc-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span>ICE BATH CHILLER</span>
              <span className="text-cyan-400 font-bold">CALIBRATED</span>
            </div>
            <span className="text-2xl font-extrabold font-mono text-cyan-400">38.4°F</span>
            <span className="text-[10px] text-zinc-500 font-mono block mt-1">Continuous UV-Ozone Sterilization</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#121214] border border-zinc-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span>MINERAL SPA BAKE</span>
              <span className="text-amber-400 font-bold">READY</span>
            </div>
            <span className="text-2xl font-extrabold font-mono text-amber-400">104.2°F</span>
            <span className="text-[10px] text-zinc-500 font-mono block mt-1">Magnesium & Epsom Mineral Salt Infused</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#121214] border border-zinc-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span>INFRARED CABIN</span>
              <span className="text-red-400 font-bold">ACTIVE</span>
            </div>
            <span className="text-2xl font-extrabold font-mono text-red-400">160.0°F</span>
            <span className="text-[10px] text-zinc-500 font-mono block mt-1">Low-EMF Solocarbon Chromotherapy</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#121214] border border-zinc-800">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span>REGISTERED NURSE</span>
              <span className="text-emerald-400 font-bold">ON-SITE</span>
            </div>
            <span className="text-2xl font-extrabold font-mono text-emerald-400">14 IV BAGS</span>
            <span className="text-[10px] text-zinc-500 font-mono block mt-1">NAD+ & Weight Cut Osmotic Protocols</span>
          </div>
        </section>

        {activeTab === 'contrast' ? (
          /* Interactive Station Timeline Matrix */
          <section className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-3 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono text-red-400 uppercase tracking-widest block">STATION RESERVATION GRID</span>
                <h2 className="text-2xl font-extrabold text-white">Daily Station Time-Slot Matrix</h2>
              </div>
              <span className="text-xs font-mono text-zinc-400 mt-1 sm:mt-0">Select a time-slot to book your 30-min recovery block</span>
            </div>

            <div className="space-y-4">
              {STATIONS.map((station) => (
                <div key={station.station} className="p-5 rounded-2xl bg-[#121214] border border-zinc-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800/80 gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Thermometer className={`w-4 h-4 ${
                        station.type === 'cold' ? 'text-cyan-400' :
                        station.type === 'hot' ? 'text-amber-400' :
                        station.type === 'infrared' ? 'text-red-400' : 'text-emerald-400'
                      }`} />
                      <h3 className="text-sm font-bold text-white font-mono">{station.station}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-400">{station.temp}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {station.slots.map((slot) => {
                      const isSelected = selectedStation === station.station && selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          disabled={slot.booked}
                          onClick={() => {
                            setSelectedStation(station.station);
                            setSelectedTime(slot.time);
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-mono transition flex flex-col items-center justify-center ${
                            slot.booked 
                              ? 'bg-zinc-950/60 border-zinc-900 text-zinc-600 cursor-not-allowed' 
                              : isSelected 
                              ? 'bg-red-500 text-zinc-950 font-bold border-red-400 shadow-md shadow-red-500/30' 
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <span>{slot.time}</span>
                          <span className="text-[9px] block mt-0.5">
                            {slot.booked ? 'BOOKED' : isSelected ? 'SELECTED' : 'AVAILABLE'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          /* Medical IV Lounge Protocols */
          <section className="mb-10">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800">
              <div>
                <span className="text-xs font-mono text-red-400 uppercase tracking-widest block">MEDICAL PROTOCOLS</span>
                <h2 className="text-2xl font-extrabold text-white">Physician Administered Athletic IV Infusions</h2>
              </div>
              <span className="text-xs font-mono text-emerald-400">All Formulas Screened by Medical Director</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'The Champion Weight-Cut Flush', price: 260, desc: '1000ml Saline, high-dose B-Complex, magnesium sulfate, and taurine for post-weigh-in rehydration.' },
                { title: 'NAD+ Cellular Muscle Repair', price: 340, desc: '500mg Pure NAD+ coenzyme infusion accelerating mitochondrial repair, DOMS soreness, and ATP regeneration.' },
                { title: 'Glutathione & Amino Master Push', price: 195, desc: '2000mg Master antioxidant push neutralizing systemic oxidative stress and metabolic inflammation.' }
              ].map((iv, i) => (
                <div key={i} className="p-6 rounded-3xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{iv.title}</h3>
                    <p className="text-xs text-zinc-400 mb-6 leading-relaxed">{iv.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-lg font-bold font-mono text-red-400">${iv.price}</span>
                    <button
                      onClick={() => setSelectedStation(iv.title)}
                      className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono font-bold text-zinc-200 hover:bg-zinc-800"
                    >
                      Select Protocol
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tier Selector & Reservation Bar */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#121214] border border-red-500/30 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-800 gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-red-400 uppercase tracking-widest block">MEMBERSHIP & RESERVATION GATE</span>
              <h3 className="text-xl font-bold text-white">Lock In Session: {selectedStation} ({selectedTime})</h3>
            </div>

            {/* Tier Switcher */}
            <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs font-mono">
              {[
                { id: 'dropin', label: 'Single Drop-In ($65)' },
                { id: 'pack', label: '4-Session Pack ($220)' },
                { id: 'blackpass', label: 'Fighter Black Pass ($289/mo)' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTier(t.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    tier === t.id ? 'bg-red-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleBooking} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              required
              value={athleteName}
              onChange={(e) => setAthleteName(e.target.value)}
              placeholder="Athlete / Member Name"
              className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
            />
            <input
              type="tel"
              required
              value={athletePhone}
              onChange={(e) => setAthletePhone(e.target.value)}
              placeholder="Mobile Phone (Access Passcode)"
              className="px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-red-500 hover:bg-red-400 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider transition shadow-lg shadow-red-500/25"
            >
              {submitted ? '✓ SESSION CONFIRMED' : `BOOK ${selectedTime} (${tierPrice} USD)`}
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-zinc-800 bg-[#0A0A0B] text-zinc-500 text-xs font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-zinc-300 font-bold">COMBAT RECOVERY LAB OS</span> • Turnkey Athletic Recovery OS v1.0.0
          </div>
          <div className="flex items-center gap-6">
            <span>Ghost Factory™ Protocol</span>
            <span>Supabase RLS Enforced</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-red-400 hover:underline"
            >
              Director Portal (recovery2026)
            </button>
          </div>
        </div>
      </footer>

      {/* Admin Modal */}
      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
