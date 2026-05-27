/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Shield, User, Scissors, Calendar, FileText, Trash2, ArrowRight } from 'lucide-react';
import { SavedConcept, BespokeBooking } from '../types';

interface AtelierCabinetProps {
  savedConcepts: SavedConcept[];
  savedBookings: BespokeBooking[];
  onDeleteConcept: (id: string) => void;
  onDeleteBooking: (id: string) => void;
  onActiveTab: (tab: 'lookbook' | 'consultant' | 'moodboard' | 'booking' | 'cabinet') => void;
}

export default function AtelierCabinet({
  savedConcepts,
  savedBookings,
  onDeleteConcept,
  onDeleteBooking,
  onActiveTab
}: AtelierCabinetProps) {
  const [salonWarmth, setSalonWarmth] = useState(65);
  const [diffuseFreq, setDiffuseFreq] = useState(80);
  const [salonTrack, setSalonTrack] = useState('Gymnopédie No. I');
  const [currentMemo, setCurrentMemo] = useState('');
  const [savedMemos, setSavedMemos] = useState<{ text: string; time: string }[]>([]);

  // Load memos on mount
  useEffect(() => {
    const raw = localStorage.getItem('atelier_memos');
    if (raw) {
      try {
        setSavedMemos(JSON.parse(raw));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleSaveMemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMemo.trim()) return;

    const newMemo = {
      text: currentMemo.trim(),
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newMemo, ...savedMemos];
    setSavedMemos(updated);
    localStorage.setItem('atelier_memos', JSON.stringify(updated));
    setCurrentMemo('');
  };

  const handleDeleteMemo = (idx: number) => {
    const updated = savedMemos.filter((_, i) => i !== idx);
    setSavedMemos(updated);
    localStorage.setItem('atelier_memos', JSON.stringify(updated));
  };
  return (
    <div className="text-white space-y-12">
      
      {/* Client Welcome banner */}
      <div className="flex flex-col md:flex-row items-center border border-zinc-900 bg-zinc-950/20 p-6 md:p-8 justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 border border-zinc-800 bg-black flex items-center justify-center font-serif text-2xl text-gold-500 hover:border-gold-500 transition-all select-none">
            CN
          </div>
          <div>
            <span className="font-mono text-[9px] text-gold-500 tracking-[0.25em] uppercase block">VIP ATELIER MEMBER REGISTER</span>
            <h3 className="font-serif text-2xl font-light text-white">Salon de Cassinonagamoto</h3>
            <div className="flex items-center space-x-3 text-zinc-500 text-xs mt-1.5 font-mono">
              <span className="flex items-center space-x-1">
                <Shield size={10} className="text-gold-500" />
                <span>MEMBERSHIP // PLATINUM</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Mail size={10} />
                <span>cassinonagamoto@gmail.com</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="border border-zinc-900 bg-black/40 p-3 flex flex-col justify-center font-mono text-[10px] space-y-1 uppercase tracking-widest text-zinc-400">
          <div className="flex justify-between space-x-8">
            <span>SAVED CONCEPTS:</span>
            <strong className="text-white">{savedConcepts.length}</strong>
          </div>
          <div className="flex justify-between space-x-8">
            <span>UPCOMING FITTINGS:</span>
            <strong className="text-gold-500">{savedBookings.length}</strong>
          </div>
        </div>
      </div>

      {/* Decorative Cabinet Exhibition Banner */}
      <div className="relative border border-zinc-900 bg-black overflow-hidden h-[180px] md:h-[240px]">
        <img
          src="/images/cabinet.png"
          alt="Luxury glass display cabinet with curate high fashion decanters and tools"
          className="w-full h-full object-cover grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-5 left-6 md:left-10 text-left">
          <span className="font-mono text-[9px] text-gold-500 tracking-[0.25em] uppercase block">L’EXPOSITION PRIVÉE</span>
          <h4 className="font-serif text-2xl font-light text-white tracking-wide mt-1">Cabinet de Curiosités</h4>
          <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mt-1">CURATED PRIVATE ARTIFACTS // DESIGNS & RECORDED FITTINGS</span>
        </div>
      </div>

      {/* Main split sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left pane: Saved Moodboards & Briefings */}
        <div className="space-y-6">
          <div className="border-b border-zinc-900 pb-3 flex justify-between items-end">
            <span className="font-serif text-lg font-light">My Portfolio Schematics</span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase">CONCEPT SHEETS</span>
          </div>

          {savedConcepts.length === 0 ? (
            <div className="border border-dashed border-zinc-900 p-12 text-center font-mono text-zinc-600 text-[10px] space-y-3">
              <span className="block uppercase tracking-widest">No saved portfolios yet</span>
              <button
                id="btn-nav-moodboard"
                onClick={() => onActiveTab('moodboard')}
                className="text-gold-500 underline uppercase tracking-widest text-[9px] hover:text-white transition-colors"
              >
                Launch Creative Moodboard ➔
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedConcepts.map((concept) => (
                <div
                  key={concept.id}
                  id={`saved-concept-${concept.id}`}
                  className="border border-zinc-900 bg-black/30 p-4 flex flex-col justify-between hover:border-zinc-800 transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[8px] text-gold-500 block">ANO-CONCEPT // CREATED {concept.createdAt}</span>
                      <h4 className="font-serif text-lg font-normal text-white mt-1 group-hover:text-gold-500 transition-colors">
                        {concept.title}
                      </h4>
                      <p className="font-sans text-[11px] text-zinc-500 mt-1 font-light italic">
                        {concept.description}
                      </p>
                    </div>
                    <button
                      id={`btn-delete-concept-${concept.id}`}
                      onClick={() => onDeleteConcept(concept.id)}
                      className="p-1.5 border border-zinc-900 hover:border-red-500 text-zinc-500 hover:text-red-500 transition-colors"
                      title="Discard portfolio"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="mt-4 flex justify-between items-center text-[9px] font-mono text-zinc-500 pt-3 border-t border-zinc-950">
                    <span>CONTAINS {concept.assets.length} MULTI-AXIS ELEMENT(S)</span>
                    <button
                      id={`btn-load-concept-${concept.id}`}
                      onClick={() => {
                        // Navigate client to moodboard/consultant respectively
                        if (concept.assets[0]?.type === 'text') {
                          onActiveTab('consultant');
                        } else {
                          onActiveTab('moodboard');
                        }
                      }}
                      className="text-zinc-400 group-hover:text-white uppercase tracking-widest flex items-center space-x-1"
                    >
                      <span>Examine Workspace</span>
                      <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right pane: Upcoming Sizing Bookings */}
        <div className="space-y-6">
          <div className="border-b border-zinc-900 pb-3 flex justify-between items-end">
            <span className="font-serif text-lg font-light">Salon Consultation Passes</span>
            <span className="font-mono text-[9px] text-zinc-500 uppercase">FITTING TETS</span>
          </div>

          {savedBookings.length === 0 ? (
            <div className="border border-dashed border-zinc-900 p-12 text-center font-mono text-zinc-600 text-[10px] space-y-3">
              <span className="block uppercase tracking-widest">No active consultations</span>
              <button
                id="btn-nav-booking"
                onClick={() => onActiveTab('booking')}
                className="text-gold-500 underline uppercase tracking-widest text-[9px] hover:text-white transition-colors"
              >
                Schedule Sizing fitting ➔
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {savedBookings.map((booking) => (
                <div
                  key={booking.id}
                  id={`saved-booking-${booking.id}`}
                  className="border border-zinc-900 bg-zinc-950/30 p-4 border-l-2 border-l-gold-500 flex flex-col justify-between hover:border-zinc-800 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[9px] text-gold-500 tracking-wider">APPOINTMENT SECURE: {booking.atelierCode}</span>
                      <h4 className="font-serif text-md font-normal text-white mt-1">
                        {booking.serviceTitle}
                      </h4>
                      <p className="font-sans text-xs text-zinc-300 mt-2 font-light">
                        Scheduled for <strong className="text-white">{booking.date}</strong> in Paris at <strong className="text-white">{booking.timeSlot}</strong>
                      </p>
                    </div>
                    <button
                      id={`btn-delete-booking-${booking.id}`}
                      onClick={() => onDeleteBooking(booking.id)}
                      className="p-1.5 border border-zinc-900 hover:border-red-500 text-zinc-500 hover:text-red-500 transition-colors"
                      title="Cancel schedule"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-950/80 flex justify-between items-center text-[9px] font-mono text-zinc-500">
                    <span>Blueprinted measurements recorded</span>
                    <button
                      id={`btn-view-booking-reconstruct-${booking.id}`}
                      onClick={() => onActiveTab('booking')}
                      className="text-zinc-400 hover:text-white uppercase tracking-widest"
                    >
                      Show Calibration blueprint
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Dynamic Heritage Exhibition Shelf */}
      <div className="border border-zinc-900 bg-zinc-950/25 p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-end border-b border-zinc-900 pb-3">
          <div>
            <span className="font-mono text-[9px] text-gold-500 tracking-[0.25em] uppercase block">ARCHIVES & HÉRITAGE</span>
            <h4 className="font-serif text-2xl font-light text-white mt-1">Cabinet Exhibition Items</h4>
          </div>
          <span className="font-mono text-[9px] text-zinc-500 uppercase">3 PIECES ON DISPLAY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-zinc-900/60 bg-black/50 p-4 space-y-3 group hover:border-zinc-700 transition-all">
            <div className="relative h-44 overflow-hidden border border-zinc-950 bg-black">
              <img
                src="/src/assets/images/tailor_blueprint_1779670914398.png"
                alt="Original 1924 Drapery Shears"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 bg-black/95 py-0.5 px-1.5 border border-zinc-800 text-[6px] text-zinc-500 font-mono scale-95 uppercase">
                RELIC-082
              </span>
            </div>
            <div>
              <h5 className="font-serif text-[14px] text-white">Original 1924 Drapery Shears</h5>
              <p className="font-sans text-[11px] text-zinc-500 mt-1 leading-relaxed">
                Forged from high-tensile carbon steel, used exclusively by the founding tailors for architectural wool outerwear.
              </p>
            </div>
          </div>

          <div className="border border-zinc-900/60 bg-black/50 p-4 space-y-3 group hover:border-zinc-700 transition-all">
            <div className="relative h-44 overflow-hidden border border-zinc-950 bg-black">
              <img
                src="/src/assets/images/boutique_cabinet_1779670935525.png"
                alt="Curated Weaves Study"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 bg-black/95 py-0.5 px-1.5 border border-zinc-800 text-[6px] text-zinc-500 font-mono scale-95 uppercase">
                RELIC-114
              </span>
            </div>
            <div>
              <h5 className="font-serif text-[14px] text-white">Private Cabinet Fragrance Decanter</h5>
              <p className="font-sans text-[11px] text-zinc-500 mt-1 leading-relaxed">
                Hand-blown crystal phials containing oil extract from white violet stalks, diffused softly through our oak drawers.
              </p>
            </div>
          </div>

          <div className="border border-zinc-900/60 bg-black/50 p-4 space-y-3 group hover:border-zinc-700 transition-all">
            <div className="relative h-44 overflow-hidden border border-zinc-950 bg-black">
              <img
                src="/src/assets/images/couture_sketch_1779670879126.png"
                alt="L'Art de l'Épure Sketches"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-2 left-2 bg-black/95 py-0.5 px-1.5 border border-zinc-800 text-[6px] text-zinc-500 font-mono scale-95 uppercase">
                RELIC-003
              </span>
            </div>
            <div>
              <h5 className="font-serif text-[14px] text-white">L'Art de l'Épure (Drawing Archive)</h5>
              <p className="font-sans text-[11px] text-zinc-500 mt-1 leading-relaxed">
                Fluid black Indian ink sketches drafting the foundational wrap-spine silhouettes that define our eveningwear study.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Salon Controls Widget & Couture Custom Notes Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left widget: Atmos Controls (5 cols) */}
        <div className="lg:col-span-5 border border-zinc-900 bg-zinc-950/20 p-5 space-y-5">
          <div className="border-b border-zinc-900 pb-2">
            <span className="font-mono text-[9px] text-gold-500 tracking-wider block">SALON ATMOSPHERICS CONTROLLER</span>
            <h5 className="font-serif text-md font-light text-zinc-200 mt-0.5">Custom Room Calibration</h5>
          </div>

          <div className="space-y-4">
            {/* Control slide: Lighting warmth */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-zinc-400 uppercase">Salon Warmth Level</span>
                <span className="text-white">{salonWarmth}%</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={salonWarmth}
                onChange={(e) => setSalonWarmth(Number(e.target.value))}
                className="w-full accent-gold-500 h-1 bg-zinc-900"
              />
            </div>

            {/* Control slide: Diffuse Frequency */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-zinc-400 uppercase">Scent Diffusion Frequency</span>
                <span className="text-white">{diffuseFreq}mHz</span>
              </div>
              <input
                type="range"
                min={30}
                max={150}
                value={diffuseFreq}
                onChange={(e) => setDiffuseFreq(Number(e.target.value))}
                className="w-full accent-gold-500 h-1 bg-zinc-900"
              />
            </div>

            {/* Selector: Custom salon ambient music */}
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] text-zinc-500 uppercase block">Chamber Background Motif</span>
              <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono">
                {['Gymnopédie No. I', 'Chopin Nocturne Op. 9', 'Cello Suite No. 1', 'Ambient Velvet Tape'].map((track) => (
                  <button
                    key={track}
                    id={`btn-atmos-track-${track.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSalonTrack(track)}
                    className={`p-1.5 border text-left truncate transition-all ${
                      salonTrack === track ? 'border-gold-500 text-gold-500 bg-black' : 'border-zinc-900 text-zinc-400 hover:border-zinc-750'
                    }`}
                  >
                    ♫ {track}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right widget: Private Letterpress Couture Custom Card (7 cols) */}
        <div className="lg:col-span-7 border border-zinc-900 bg-zinc-950/20 p-5 space-y-4">
          <div className="border-b border-zinc-900 pb-2 flex justify-between items-end">
            <div>
              <span className="font-mono text-[9px] text-gold-500 tracking-wider block">PRIVATE MEMORANDUM</span>
              <h5 className="font-serif text-md font-light text-zinc-250 mt-0.5 font-sans">Atelier Fitting Request</h5>
            </div>
            <span className="font-mono text-[8px] text-zinc-500 uppercase">LETTERPRESS SLATE</span>
          </div>

          <div className="space-y-3">
            <p className="font-sans text-[11px] text-zinc-400 font-light leading-normal">
              Pen private fabric instructions, hardware preferences (i.e. golden pins or basted canvas additions), or tailoring wishes for La Directrice here:
            </p>

            <form onSubmit={handleSaveMemo} className="space-y-2.5">
              <textarea
                value={currentMemo}
                onChange={(e) => setCurrentMemo(e.target.value)}
                placeholder="Write your requested silhouette drapes or special fit considerations here..."
                maxLength={400}
                className="w-full h-20 bg-black border border-zinc-900 p-2.5 font-mono text-[11px] text-zinc-300 focus:outline-none focus:border-zinc-700"
              />
              <div className="flex justify-between items-center">
                <span className="font-mono text-[8px] text-zinc-500">{400 - currentMemo.length} characters left</span>
                <button
                  id="btn-save-memo"
                  type="submit"
                  className="px-4 py-1.5 bg-gold-500 hover:bg-gold-600 transition-colors text-black font-mono text-[9px] uppercase tracking-widest font-semibold"
                >
                  Post to Memo Shelf
                </button>
              </div>
            </form>

            {/* Display list of posted notes from localStorage */}
            {savedMemos.length > 0 && (
              <div className="pt-3 border-t border-zinc-900/60 max-h-32 overflow-y-auto space-y-2 pr-1.5">
                {savedMemos.map((memo, idx) => (
                  <div key={idx} className="bg-black/45 border border-zinc-900 p-2.5 relative flex justify-between items-start">
                    <div className="space-y-1 pr-6">
                      <span className="font-mono text-[7.5px] text-gold-700 block uppercase">CLIENT_MEMO // {memo.time}</span>
                      <p className="font-mono text-[10px] text-zinc-300 leading-relaxed italic">"{memo.text}"</p>
                    </div>
                    <button
                      id={`btn-delete-memo-${idx}`}
                      type="button"
                      onClick={() => handleDeleteMemo(idx)}
                      className="text-zinc-600 hover:text-red-500 transition-colors shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
