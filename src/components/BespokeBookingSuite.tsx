/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Sparkles, AlertCircle, CheckCircle, FileText, Check } from 'lucide-react';
import { MeasurementSuite, BespokeService, BespokeBooking } from '../types';
import { BESPOKE_SERVICES } from '../data/atelierData';

interface BespokeBookingSuiteProps {
  measurements: MeasurementSuite;
  onUpdateMeasurements: (newMeasurements: MeasurementSuite) => void;
  onSaveBooking: (booking: BespokeBooking) => void;
}

const TIME_SLOTS = [
  '10:00 - Paris',
  '11:30 - Paris',
  '14:00 - Paris',
  '15:30 - Paris',
  '17:00 - Paris'
];

export default function BespokeBookingSuite({
  measurements,
  onUpdateMeasurements,
  onSaveBooking
}: BespokeBookingSuiteProps) {
  const [selectedService, setSelectedService] = useState<BespokeService>(BESPOKE_SERVICES[0]);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);
  const [clientName, setClientName] = useState('Cassinonagamoto Client');
  const [clientEmail, setClientEmail] = useState('cassinonagamoto@gmail.com');
  const [clientNote, setClientNote] = useState('');
  const [validationError, setValidationError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<BespokeBooking | null>(null);
  const [mediaMood, setMediaMood] = useState<'noir' | 'gold' | 'sepia' | 'raw'>('noir');
  const [isLooping, setIsLooping] = useState(true);

  const handleSliderChange = (key: keyof MeasurementSuite, value: number) => {
    onUpdateMeasurements({
      ...measurements,
      [key]: value
    });
  };

  const handleBookingConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentDate) {
      setValidationError('Please select a valid date in the future for your fitting.');
      return;
    }
    setValidationError('');

    const uniqueCode = 'ANO-2026-X' + Math.floor(Math.random() * 9000 + 1000);

    const bookingPayload: BespokeBooking = {
      id: 'bk-' + Date.now(),
      serviceId: selectedService.id,
      serviceTitle: selectedService.title,
      clientName,
      clientEmail,
      clientNote,
      date: appointmentDate,
      timeSlot: selectedTimeSlot,
      measurements: { ...measurements },
      atelierCode: uniqueCode,
      timestamp: new Date().toLocaleDateString('fr-FR')
    };

    onSaveBooking(bookingPayload);
    setConfirmedBooking(bookingPayload);
  };

  return (
    <div className="text-white space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Sliders + Live Blueprint Mannequin */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-[0.2em] text-gold-500 uppercase">
              Le Patronage & Mesures
            </span>
            <h2 className="font-serif text-3xl font-light">The Calibration Suite</h2>
            <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
              Adjust the 8 distinct parameters of your couture profile. Watch the vector model scale
              proportionately. These coordinates are fed directly into the patterns and La Directrice’s styling loom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-zinc-950/20 border border-zinc-900 p-6">
            
            {/* 1. Measurement Sliders Section (7 Cols) */}
            <div className="md:col-span-7 space-y-5">
              <span className="font-mono text-[10px] tracking-widest text-[#9d8a6e] uppercase">
                METRIC SYSTEM [CENTIMETER]
              </span>

              {/* Range block: Height */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">A. HAUTEUR (Height)</span>
                  <span className="text-gold-500 font-semibold">{measurements.height} cm</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={210}
                  step={1}
                  value={measurements.height}
                  onChange={(e) => handleSliderChange('height', Number(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-zinc-900"
                />
              </div>

              {/* Range block: Chest/Bust */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">B. POITRINE (Bust Line)</span>
                  <span className="text-gold-500 font-semibold">{measurements.bust} cm</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={130}
                  step={1}
                  value={measurements.bust}
                  onChange={(e) => handleSliderChange('bust', Number(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-zinc-900"
                />
              </div>

              {/* Range block: Waist */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">C. TOUR DE TAILLE (Waist)</span>
                  <span className="text-gold-500 font-semibold">{measurements.waist} cm</span>
                </div>
                <input
                  type="range"
                  min={55}
                  max={120}
                  step={1}
                  value={measurements.waist}
                  onChange={(e) => handleSliderChange('waist', Number(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-zinc-900"
                />
              </div>

              {/* Range block: Hips */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">D. BASSIN (Hips Line)</span>
                  <span className="text-gold-500 font-semibold">{measurements.hips} cm</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={140}
                  step={1}
                  value={measurements.hips}
                  onChange={(e) => handleSliderChange('hips', Number(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-zinc-900"
                />
              </div>

              {/* Range block: Shoulder */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">E. ÉPAULE (Shoulder Width)</span>
                  <span className="text-gold-500 font-semibold">{measurements.shoulder} cm</span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={55}
                  step={1}
                  value={measurements.shoulder}
                  onChange={(e) => handleSliderChange('shoulder', Number(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-zinc-900"
                />
              </div>

              {/* Range block: Sleeve */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">F. MANCHE (Sleeve)</span>
                  <span className="text-gold-500 font-semibold">{measurements.sleeve} cm</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={75}
                  step={1}
                  value={measurements.sleeve}
                  onChange={(e) => handleSliderChange('sleeve', Number(e.target.value))}
                  className="w-full accent-gold-500 h-1 bg-zinc-900"
                />
              </div>
            </div>

            {/* 2. Visual Vector Mannequin (5 Cols - Solid gold line structures, no shadows) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-4 border border-zinc-900 bg-[#060608]/90 aspect-[1/1.5] relative">
              <span className="absolute top-2 left-2 text-[8px] font-mono text-zinc-500">SCHÉMA PATRONAGE</span>
              
              <svg 
                viewBox="0 0 160 220" 
                className="w-full h-full max-h-[220px]"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Dynamic calculation points of measurements for scale manipulation */}
                {/* We map the measurements slider scales to standard pixel coordinates */}
                {/* Chest width: based on bust, Waist width: based on waist, Hips width based on hips */}
                {(() => {
                  const bustScale = (measurements.bust - 70) / (130 - 70); // 0 to 1
                  const waistScale = (measurements.waist - 55) / (120 - 55); // 0 to 1
                  const hipsScale = (measurements.hips - 80) / (140 - 80); // 0 to 1
                  const heightScale = (measurements.height - 150) / (210 - 150); // 0 to 1

                  const chestW = 22 + bustScale * 14; 
                  const waistW = 16 + waistScale * 14; 
                  const hipsW = 22 + hipsScale * 16;
                  
                  // Height scale alters the drawing y coordinates slightly
                  const neckY = 35 - heightScale * 3;
                  const shoulderY = 45;
                  const waistY = 85 + heightScale * 4;
                  const hipsY = 125 + heightScale * 6;
                  const feetY = 190;

                  return (
                    <g fill="none" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
                      {/* Grid background markers */}
                      <line x1="20" y1={waistY} x2="140" y2={waistY} stroke="#1b1c1c" strokeWidth="0.5" strokeDasharray="3 3" />
                      <line x1="20" y1={hipsY} x2="140" y2={hipsY} stroke="#1b1c1c" strokeWidth="0.5" strokeDasharray="3 3" />

                      {/* Tailor mannequin stand hanger */}
                      <line x1="80" y1="15" x2="80" y2="205" stroke="#4c4546" strokeWidth="0.5" />
                      <line x1="55" y1="205" x2="105" y2="205" stroke="#4c4546" strokeWidth="1" />
                      
                      {/* Head neck joint shape */}
                      <path d={`M 75 ${neckY} Q 80 ${neckY-15} 85 ${neckY} Z`} stroke="#c5a880" />

                      {/* Torso main couture contour path */}
                      <path 
                        d={`M 80 ${neckY} 
                           L 80 ${neckY + 12}
                           L ${80 - chestW} ${shoulderY} 
                           Q ${80 - chestW + 3} ${waistY - 15} ${80 - waistW} ${waistY}
                           Q ${80 - hipsW + 3} ${hipsY - 15} ${80 - hipsW} ${hipsY}
                           L ${80 - hipsW + 4} 150
                           L 80 160
                           L ${80 + hipsW - 4} 150
                           L ${80 + hipsW} ${hipsY}
                           Q ${80 + hipsW - 3} ${hipsY - 15} ${80 + waistW} ${waistY}
                           Q ${80 + chestW - 3} ${waistY - 15} ${80 + chestW} ${shoulderY}
                           Z`} 
                        stroke="#c5a880" 
                        strokeWidth="1"
                      />

                      {/* Gold coordinate metrics values */}
                      <text x={80} y={shoulderY + 12} fill="#ffffff" fontSize="6" fontFamily="monospace" textAnchor="middle">Bust: {measurements.bust}cm</text>
                      <text x={80} y={waistY + 3} fill="#c5a880" fontSize="6" fontFamily="monospace" textAnchor="middle">Waist: {measurements.waist}cm</text>
                      <text x={80} y={hipsY + 3} fill="#ffffff" fontSize="6" fontFamily="monospace" textAnchor="middle">Hips: {measurements.hips}cm</text>
                    </g>
                  );
                })()}
              </svg>
              
              <span className="text-[8px] font-mono text-zinc-500 mt-2 text-center block uppercase tracking-widest">
                GEOMETRIC MANNEQUIN SCHEMATIC // PARIS
              </span>
            </div>
          </div>

          {/* Luxury Atelier Sensory Interactive Monitor */}
          <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
                <span className="font-mono text-[9px] text-zinc-400 tracking-wider">LIVE FEED // RUE DE L'ATELIER SCANNING LAB</span>
              </div>
              <span className="font-mono text-[8px] text-gold-500 uppercase">CAM-02 // SILK ARCHIVE</span>
            </div>

            <div className="relative border border-zinc-950 bg-black overflow-hidden h-40 group select-none">
              {/* Scanlines layer and vignettes */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none z-10" />

              <img
                src="/src/assets/images/atelier_drape_1779672155343.png"
                alt="Active draping calibration workspace"
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  mediaMood === 'noir' ? 'grayscale contrast-125 opacity-70' :
                  mediaMood === 'gold' ? 'sepia hue-rotate-[10deg] saturate-150 contrast-115 opacity-80' :
                  mediaMood === 'sepia' ? 'sepia opacity-65 saturate-75' : 'contrast-105 brightness-115 opacity-90'
                } ${isLooping ? 'scale-[1.01] animate-[pulse_6s_infinite_alternate]' : ''}`}
                referrerPolicy="no-referrer"
              />

              {/* Responsive oscillator wave simulation and metric overlays */}
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between z-20 pointer-events-none">
                <div className="flex items-end space-x-0.5 h-5">
                  {[...Array(14)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={isLooping ? { height: [3, Math.max(3, Math.random() * 18), 3] } : { height: 3 }}
                      transition={{ duration: 0.6 + i * 0.08, repeat: Infinity, ease: "easeInOut" }}
                      className={`w-[1px] ${mediaMood === 'gold' ? 'bg-gold-500' : 'bg-white'} opacity-75`}
                    />
                  ))}
                  <span className="font-mono text-[7px] text-zinc-500 uppercase ml-2 tracking-widest select-none">CALIB_OSC FEED</span>
                </div>
                <div className="font-mono text-[7px] text-zinc-400 uppercase tracking-widest">
                  {mediaMood.toUpperCase()}_STAGE // LOOPING
                </div>
              </div>
            </div>

            {/* Micro Filter Selector toggles */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-[9px] font-mono">
              <div className="flex items-center space-x-1 border border-zinc-900/60 p-0.5 bg-black/50">
                {(['noir', 'gold', 'sepia', 'raw'] as const).map((m) => (
                  <button
                    key={m}
                    id={`btn-feed-mood-${m}`}
                    onClick={() => setMediaMood(m)}
                    className={`px-2 py-0.5 transition-all text-[8.5px] uppercase ${
                      mediaMood === m
                        ? 'text-gold-500 bg-zinc-900 border-b border-gold-500 font-semibold'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <button
                id="btn-toggle-feed-play"
                type="button"
                onClick={() => setIsLooping(!isLooping)}
                className="px-2.5 py-1 border border-zinc-900 bg-black hover:border-white text-zinc-350 transition-colors uppercase tracking-widest text-[8px]"
              >
                {isLooping ? '⏸ PAUSE FEED' : '▶ RESUME FEED'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Reservation & Ticket Pass printable block */}
        <div className="lg:col-span-5 space-y-6">
          {confirmedBooking ? (
            /* PRINTABLE TICKET (Absolute beauty look) */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-gold-500 bg-zinc-950 p-6 space-y-6 relative selection:bg-gold-500 selection:text-black"
            >
              <div className="absolute top-0 right-12 w-3.5 h-3.5 bg-gold-500" />
              <div className="text-center pb-4 border-b border-zinc-900">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">PASS DE DRAPAGE HAUTE COUTURE</span>
                <p className="font-serif text-2xl text-gold-500 mt-1 uppercase">ATELIER NOIR & OR</p>
                <span className="font-mono text-xs text-white uppercase block mt-1 tracking-widest font-normal">
                  {confirmedBooking.serviceTitle}
                </span>
                <span className="font-mono text-[10px] text-zinc-500 block">TICKET ID: {confirmedBooking.atelierCode}</span>
              </div>

              <div className="space-y-3 font-mono text-[11px] text-zinc-300">
                <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                  <span className="text-zinc-500 font-mono uppercase">CLIENTE:</span>
                  <span className="text-white uppercase">{confirmedBooking.clientName}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                  <span className="text-zinc-500 font-mono">COURRIEL (EMAIL):</span>
                  <span className="text-zinc-400 select-all">{confirmedBooking.clientEmail}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900/60 pb-1.5">
                  <span className="text-zinc-500 font-mono">RENDEZ-VOUS DATE:</span>
                  <span className="text-gold-500">{confirmedBooking.date} / {confirmedBooking.timeSlot}</span>
                </div>
                {confirmedBooking.clientNote && (
                  <div className="py-2 text-zinc-400 leading-normal text-[10px] border-b border-zinc-900/60">
                    <span className="text-zinc-500 block uppercase mb-1">NOTES PARTICULIÈRES:</span>
                    "{confirmedBooking.clientNote}"
                  </div>
                )}
              </div>

              {/* Specific sizing summary formatted inside ticket */}
              <div className="bg-zinc-900/70 p-4 space-y-2 border border-zinc-800">
                <span className="font-mono text-[9px] tracking-wider text-gold-500 uppercase block">MEASUREMENTS ENROLLED</span>
                <div className="grid grid-cols-2 gap-y-1 gap-x-4 font-mono text-[10px] text-zinc-400">
                  <div className="flex justify-between">
                    <span>HEIGHT:</span> <strong className="text-zinc-200">{confirmedBooking.measurements.height}cm</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>WAIST:</span> <strong className="text-zinc-200">{confirmedBooking.measurements.waist}cm</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>BUST:</span> <strong className="text-zinc-200">{confirmedBooking.measurements.bust}cm</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>HIPS:</span> <strong className="text-zinc-200">{confirmedBooking.measurements.hips}cm</strong>
                  </div>
                </div>
              </div>

              {/* Styled Barcode (Pure CSS Varying width columns - Absolutely beautiful, no external assets required) */}
              <div className="py-4 flex flex-col items-center justify-center space-y-1.5">
                <div className="flex h-12 w-full max-w-[280px] justify-between items-stretch">
                  <div className="w-1 bg-gold-500" />
                  <div className="w-0.5 bg-gold-400" />
                  <div className="w-2.5 bg-gold-500" />
                  <div className="w-0.5 bg-transparent" />
                  <div className="w-1 bg-gold-500" />
                  <div className="w-0.5 bg-gold-400" />
                  <div className="w-1.5 bg-zinc-900" />
                  <div className="w-1 bg-gold-500" />
                  <div className="w-3 bg-gold-500" />
                  <div className="w-0.5 bg-transparent" />
                  <div className="w-1.5 bg-gold-400" />
                  <div className="w-1 bg-gold-500" />
                  <div className="w-2 bg-gold-500" />
                  <div className="w-0.5 bg-transparent" />
                  <div className="w-1 bg-gold-300" />
                  <div className="w-0.5 bg-gold-500" />
                  <div className="w-3.5 bg-zinc-900" />
                  <div className="w-1 bg-gold-400" />
                  <div className="w-1.5 bg-gold-500" />
                </div>
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">{confirmedBooking.atelierCode} // SECURE PASS</span>
              </div>

              <div className="flex justify-between items-end border-t border-zinc-900 pt-5 text-[8px] font-mono text-zinc-500">
                <div>
                  <p>ATELIER NOIR & OR HQ</p>
                  <p>12 RUE RUE ROYALE, PARIS</p>
                </div>
                <button
                  id="btn-rebook-ticket"
                  onClick={() => setConfirmedBooking(null)}
                  className="bg-zinc-900 border border-zinc-800 hover:border-gold-500 text-gold-500 font-mono text-[9px] py-1 px-3 uppercase transition-colors"
                >
                  NEW BOOKING
                </button>
              </div>

            </motion.div>
          ) : (
            /* RESERVATION SCHEDULER PANEL */
            <form onSubmit={handleBookingConfirm} className="border border-zinc-900 p-6 space-y-6 bg-zinc-950/20">
              <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase block border-b border-zinc-900 pb-2">
                RESERVATION PORTAL // FITTING DESK
              </span>

              {/* Decorative flatlay banner */}
              <div className="relative border border-zinc-950 overflow-hidden h-28 bg-black">
                <img
                  src="/src/assets/images/tailor_blueprint_1779670914398.png"
                  alt="Tailoring design blueprint and vintage scissors toolset"
                  className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 border border-zinc-900 text-[7px] font-mono text-zinc-400 uppercase tracking-widest">
                  COUTURE WORK DESK // LA TABLE DE RÉDACTION
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">
                  SELECT EXCLUSIVITÉ FITTING
                </span>
                <div className="space-y-2">
                  {BESPOKE_SERVICES.map((srv) => {
                    const isSelected = selectedService.id === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setSelectedService(srv)}
                        className={`p-3 border text-xs cursor-pointer transition-all flex flex-col ${
                          isSelected
                            ? 'bg-zinc-900 border-gold-500'
                            : 'bg-black border-zinc-900 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex justify-between items-center font-serif text-sm">
                          <span className={isSelected ? 'text-gold-500' : 'text-zinc-200'}>{srv.title}</span>
                          <span className="font-mono text-[10px] text-zinc-500">{srv.duration}</span>
                        </div>
                        <p className="font-sans text-[10px] text-zinc-500 mt-1 font-light leading-snug">
                          {srv.description}
                        </p>
                        <span className="font-mono text-[9px] text-gold-500 mt-2 block tracking-wider font-semibold">
                          {srv.priceEstimate}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* DateTime configuration rows */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="booking-date" className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    FITTING DATE
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-black border border-zinc-900 p-2.5 text-xs text-white focus:outline-none focus:border-gold-500 font-mono uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-time" className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                    SLOT (PARIS METROP)
                  </label>
                  <select
                    id="booking-time"
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full bg-black border border-zinc-900 p-2.5 text-xs text-white focus:outline-none focus:border-gold-500 font-mono"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Client specifications lines */}
              <div className="space-y-2">
                <label htmlFor="booking-client-name" className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  NAME
                </label>
                <input
                  id="booking-client-name"
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-black border border-zinc-900 p-2 px-3 text-xs text-zinc-300 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="booking-client-email" className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  CLIENT SECURE EMAIL
                </label>
                <input
                  id="booking-client-email"
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-black border border-zinc-900 p-2 px-3 text-xs text-zinc-300 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="booking-client-note" className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  ATELIER SPECIFICATIONS / INSCRIPTION
                </label>
                <input
                  id="booking-client-note"
                  type="text"
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  placeholder="E.g., Require gold thread sleeve initials 'ANO'"
                  className="w-full bg-black border border-zinc-900 p-2 px-3 text-xs text-zinc-300 focus:outline-none focus:border-gold-500"
                />
              </div>

              {validationError && (
                <div className="p-3 border border-red-500/20 bg-red-950/20 text-red-400 text-xs flex items-center space-x-2">
                  <AlertCircle size={13} className="shrink-0" />
                  <span className="font-sans font-light">{validationError}</span>
                </div>
              )}

              <button
                id="btn-confirm-appointment"
                type="submit"
                className="w-full bg-white hover:bg-gold-500 hover:text-black py-3 px-4 text-black font-mono text-xs uppercase tracking-widest transition-all text-center flex items-center justify-center space-x-1"
              >
                <Calendar size={13} />
                <span>RESERVE BESPOKE FITTING Appointment</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
