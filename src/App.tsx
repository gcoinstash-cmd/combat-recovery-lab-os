import React, { useState } from 'react';
import { 
  Flame, Shield, Award, ArrowRight, Calendar, DollarSign, Lock, 
  ChevronRight, CheckCircle2, Sparkles, Layers, Terminal, Server,
  AlertCircle, Check, Phone, Plane, Thermometer, Compass, Fuel, Gauge,
  Clock, Snowflake, Activity, X, Droplets
} from 'lucide-react';
import { AdminPortalModal } from './AdminPortalModal.tsx';

interface StationSlot {
  station: string;
  time: string;
  modality: 'COLD PLUNGE (38°F)' | 'INFRARED SAUNA (195°F)' | 'HYPERBARIC POD (2.0 ATA)' | 'CELLULAR IV LOUNGE';
  status: 'OPEN' | 'RESERVED' | 'MAINTENANCE';
  athlete: string;
}

const STATION_MATRIX: StationSlot[] = [
  { station: "POD 01", time: "07:00 AM", modality: "COLD PLUNGE (38°F)", status: "RESERVED", athlete: "K. Usman (UFC 170)" },
  { station: "POD 01", time: "08:00 AM", modality: "COLD PLUNGE (38°F)", status: "OPEN", athlete: "Available" },
  { station: "POD 01", time: "09:00 AM", modality: "COLD PLUNGE (38°F)", status: "OPEN", athlete: "Available" },

  { station: "SAUNA 02", time: "07:00 AM", modality: "INFRARED SAUNA (195°F)", status: "OPEN", athlete: "Available" },
  { station: "SAUNA 02", time: "08:00 AM", modality: "INFRARED SAUNA (195°F)", status: "RESERVED", athlete: "G. Burns (BJJ Black Belt)" },
  { station: "SAUNA 02", time: "09:00 AM", modality: "INFRARED SAUNA (195°F)", status: "OPEN", athlete: "Available" },

  { station: "CHAMBER 03", time: "07:00 AM", modality: "HYPERBARIC POD (2.0 ATA)", status: "OPEN", athlete: "Available" },
  { station: "CHAMBER 03", time: "08:00 AM", modality: "HYPERBARIC POD (2.0 ATA)", status: "OPEN", athlete: "Available" },
  { station: "CHAMBER 03", time: "09:00 AM", modality: "HYPERBARIC POD (2.0 ATA)", status: "RESERVED", athlete: "M. Chandler (Bellator)" },

  { station: "LOUNGE 04", time: "07:00 AM", modality: "CELLULAR IV LOUNGE", status: "OPEN", athlete: "Available" },
  { station: "LOUNGE 04", time: "08:00 AM", modality: "CELLULAR IV LOUNGE", status: "OPEN", athlete: "Available" },
  { station: "LOUNGE 04", time: "09:00 AM", modality: "CELLULAR IV LOUNGE", status: "OPEN", athlete: "Available" }
];

export default function App() {
  const [selectedModality, setSelectedModality] = useState<string>('ALL');
  const [selectedSlot, setSelectedSlot] = useState<StationSlot | null>(null);
  const [athleteName, setAthleteName] = useState('Brandon Moreno');
  const [protocolType, setProtocolType] = useState('Contrast Shock (Ice + Infrared Sauna)');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const [isAdminOpen, setIsAdminOpen] = useState(
    typeof window !== 'undefined' && (
      window.location.search.includes('admin') || 
      window.location.pathname.endsWith('/admin') ||
      window.location.hash === '#admin'
    )
  );

  const filtered = STATION_MATRIX.filter(s => 
    selectedModality === 'ALL' || s.modality.includes(selectedModality)
  );

  const handleBookSlot = (slot: StationSlot) => {
    setSelectedSlot(slot);
    setBookedSuccess(false);
  };

  return (
    <div className="min-h-screen bg-[#090A0E] text-zinc-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Telemetry Header */}
      <header className="border-b border-zinc-800 bg-[#0E1017] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 font-mono text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-bold tracking-wider text-rose-400 flex items-center gap-2 text-base">
            <Activity size={18} /> COMBAT RECOVERY // ATHLETIC CONTRAST THERAPY MATRIX
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 uppercase text-xs">ARCHETYPE D: TIMELINE & STATION RESERVATION GRID</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Thermometer size={14} />
            <span>THERMAL GRADIENT: -30°F CRYO TO 195°F SAUNA</span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="px-3.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-lg text-xs font-mono font-bold transition-all"
          >
            [ RECOVERY DESK PASS ]
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-8 space-y-8">
        {/* Header Title & Status Chips */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Clock className="text-rose-500" /> Hourly Station Booking Matrix
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Select available station pods for active contrast therapy, hyperbaric oxygen recovery, and cellular IV infusion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> OPEN POD</div>
            <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> ATHLETE IN SESSION</div>
          </div>
        </div>

        {/* Modality Filter Pills */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {['ALL', 'COLD PLUNGE', 'INFRARED SAUNA', 'HYPERBARIC', 'CELLULAR IV'].map(m => (
            <button
              key={m}
              onClick={() => setSelectedModality(m)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                selectedModality === m
                  ? 'bg-rose-500 text-white border-rose-500 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Station Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(slot => (
            <div 
              key={`${slot.station}-${slot.time}`}
              onClick={() => handleBookSlot(slot)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer bg-[#11131A] hover:border-rose-500/60 relative flex flex-col justify-between ${
                selectedSlot?.station === slot.station && selectedSlot?.time === slot.time
                  ? 'border-rose-500 ring-2 ring-rose-500/30' 
                  : 'border-zinc-800'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-sm font-black text-white">{slot.station}</span>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-black tracking-wider ${
                    slot.status === 'OPEN' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                    {slot.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-rose-400 font-bold mb-1 flex items-center gap-1.5">
                  <Thermometer size={14} />
                  <span>{slot.modality}</span>
                </div>

                <div className="text-xs text-zinc-400 font-mono mb-4 flex items-center gap-1.5">
                  <Clock size={14} className="text-zinc-500" />
                  <span>{slot.time} (60 Min Protocol)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex justify-between items-center text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block text-[10px]">CURRENT ATHLETE</span>
                  <span className="text-zinc-200 font-bold truncate max-w-[140px] block">{slot.athlete}</span>
                </div>
                <div className="text-right">
                  <span className="text-zinc-500 block text-[10px]">DROP-IN PASS</span>
                  <span className="text-white font-bold">$95 / Session</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Station Reservation Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#12141C] border border-rose-500/50 w-full max-w-md rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-sm relative">
            <button 
              onClick={() => setSelectedSlot(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                RECOVERY SUITE RESERVATION
              </span>
              <h2 className="text-2xl font-black text-white mt-1">
                {selectedSlot.station} — {selectedSlot.time}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">{selectedSlot.modality}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 uppercase">Athlete Name / Camp</label>
                <input 
                  type="text"
                  value={athleteName}
                  onChange={e => setAthleteName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-rose-400 outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 uppercase">Target Protocol</label>
                <select 
                  value={protocolType}
                  onChange={e => setProtocolType(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:border-rose-400 outline-none min-h-[44px]"
                >
                  <option>Contrast Shock (38°F Ice + 195°F Sauna)</option>
                  <option>CNS Reset (Cryotherapy + Hyperbaric Oxygen)</option>
                  <option>Post-Spar Cellular Flush (Infrared + NAD+ IV)</option>
                  <option>Championship Camp Weekly Full Pass</option>
                </select>
              </div>
            </div>

            {bookedSuccess ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500 text-emerald-400 rounded-xl text-center text-xs font-bold space-y-1">
                <div>✓ ATHLETE STATION CONFIRMED</div>
                <div className="text-[11px] text-zinc-300">Biometric check-in QR code sent to athlete mobile.</div>
              </div>
            ) : (
              <button
                onClick={() => setBookedSuccess(true)}
                className="w-full py-3.5 bg-rose-500 hover:bg-rose-400 text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-rose-500/20 cursor-pointer min-h-[44px]"
              >
                LOCK IN RECOVERY STATION
              </button>
            )}
          </div>
        </div>
      )}

      <AdminPortalModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
