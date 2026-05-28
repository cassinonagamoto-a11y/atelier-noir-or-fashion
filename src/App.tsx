/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, FileText, Layers, Calendar, Sparkles, Shirt, FileCode2, MapPin, Feather, HelpCircle } from 'lucide-react';
import { MeasurementSuite, SavedConcept, BespokeBooking } from './types';

// Components
import LookbookSection from './components/LookbookSection';
import BespokeConsultant from './components/BespokeConsultant';
import InteractiveMoodboard from './components/InteractiveMoodboard';
import BespokeBookingSuite from './components/BespokeBookingSuite';
import AtelierCabinet from './components/AtelierCabinet';
import ServicesSection from './components/ServicesSection';
import JournalSection from './components/JournalSection';
import ContactSection from './components/ContactSection';
import ScrollReveal from './components/ScrollReveal';
import ParallaxWrapper from './components/ParallaxWrapper';

type TabID = 'lookbook' | 'services' | 'consultant' | 'moodboard' | 'booking' | 'journal' | 'contact' | 'cabinet';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabID>('lookbook');
  const [subscribed, setSubscribed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Programmatically trigger background video playback to bypass browser constraints
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = () => {
        video.play().catch((err) => {
          console.warn('Silent ambient video play blocked or waiting:', err);
        });
      };

      playVideo();

      video.addEventListener('loadedmetadata', playVideo);
      video.addEventListener('canplay', playVideo);

      return () => {
        video.removeEventListener('loadedmetadata', playVideo);
        video.removeEventListener('canplay', playVideo);
      };
    }
  }, []);

  // Initial VIP client measurements profile (Default human silhouette metrics)
  const [measurements, setMeasurements] = useState<MeasurementSuite>({
    height: 178,
    neck: 36,
    bust: 92,
    waist: 68,
    hips: 96,
    shoulder: 41,
    sleeve: 61,
    inseam: 79
  });

  const [savedConcepts, setSavedConcepts] = useState<SavedConcept[]>([]);
  const [savedBookings, setSavedBookings] = useState<BespokeBooking[]>([{
  id: "2",
  title: "Private Couture Fitting",
  date: "2002-02-02",
  time: "Paris at 11:30 – Paris"
}]);

  // Persistent browser memory loading of local couture portfolio
  useEffect(() => {
    try {
      const cachedConcepts = localStorage.getItem('ano_saved_concepts');
      if (cachedConcepts) {
        setSavedConcepts(JSON.parse(cachedConcepts));
      }

      const cachedBookings = localStorage.getItem('ano_saved_bookings');
      if (cachedBookings) {
        setSavedBookings(JSON.parse(cachedBookings));
      }
    } catch (err) {
      console.error('Failed to parse cached Atelier files from localStorage:', err);
    }
  }, []);

  // Update operations with memory writes
  const handleSaveConcept = (concept: SavedConcept) => {
    const updated = [concept, ...savedConcepts];
    setSavedConcepts(updated);
    localStorage.setItem('ano_saved_concepts', JSON.stringify(updated));
  };

  const handleSaveBooking = (booking: BespokeBooking) => {
    const updated = [booking, ...savedBookings];
    setSavedBookings(updated);
    localStorage.setItem('ano_saved_bookings', JSON.stringify(updated));
  };

  const handleDeleteConcept = (id: string) => {
    const updated = savedConcepts.filter((c) => c.id !== id);
    setSavedConcepts(updated);
    localStorage.setItem('ano_saved_concepts', JSON.stringify(updated));
  };

  const handleDeleteBooking = (id: string) => {
    const updated = savedBookings.filter((b) => b.id !== id);
    setSavedBookings(updated);
    localStorage.setItem('ano_saved_bookings', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white font-sans flex flex-col justify-between selection:bg-gold-500 selection:text-black antialiased relative overflow-x-hidden">
      
      {/* Immersive Ambient Video Background (45% Opacity) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-45">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          src="https://videos.pexels.com/video-files/31913680/13593931_3840_2160_30fps.mp4"
        />
        {/* Soft elegant vignette layer to preserve ultimate text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/75 via-[#070707]/35 to-[#070707]/80" />
      </div>

      {/* Editorial Decorative border lines */}
      <div className="fixed top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent z-50 pointer-events-none" />

      {/* Main Luxury Header */}
      <header className="border-b border-zinc-900 bg-[#070707]/90 sticky top-0 z-40 backdrop-blur-md relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Brand Logo - Playfair high fashion serif */}
          <ParallaxWrapper strength={8}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="font-serif text-2xl md:text-3xl tracking-[0.2em] font-light uppercase select-none gold-text-shimmer">
                Atelier Noir <span className="font-serif italic text-gold-500">& Or</span>
              </h1>
              <span className="font-mono text-[9px] tracking-[0.4em] text-[#9d8a6e] uppercase mt-1">
                HAUTE COUTURE & BESPOKE TAILORING // PARIS
              </span>
            </div>
          </ParallaxWrapper>

          {/* Luxury Tab Navigation list */}
          <nav className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-center font-mono text-xs text-zinc-400"> 
            <button
              id="tab-lookbook"
              onClick={() => setActiveTab('lookbook')}
              className={`py-1.5 px-3 uppercase tracking-wider transition-all border ${
                activeTab === 'lookbook'
                  ? 'text-gold-500 border-zinc-800 bg-zinc-950 font-medium'
                  : 'border-transparent hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              Collection Lookbook
            </button>
            <button
              id="tab-services"
              onClick={() => setActiveTab('services')}
              className={`py-1.5 px-3 uppercase tracking-wider transition-all border flex items-center space-x-1.5 ${
                activeTab === 'services'
                  ? 'text-gold-500 border-zinc-800 bg-zinc-950 font-medium'
                  : 'border-transparent hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              <FileCode2 size={11} className="text-zinc-500" />
              <span>Couture Services</span>
            </button>
            <button
              id="tab-journal"
              onClick={() => setActiveTab('journal')}
              className={`py-1.5 px-3 uppercase tracking-wider transition-all border flex items-center space-x-1.5 ${
                activeTab === 'journal'
                  ? 'text-gold-500 border-zinc-800 bg-zinc-950 font-medium'
                  : 'border-transparent hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              <Feather size={11} className="text-zinc-500" />
              <span>Essay Journal</span>
            </button>
            <button
              id="tab-consultant"
              onClick={() => setActiveTab('consultant')}
              className={`py-1.5 px-3 uppercase tracking-wider transition-all border flex items-center space-x-1.5 ${
                activeTab === 'consultant'
                  ? 'text-gold-500 border-zinc-800 bg-zinc-950 font-medium'
                  : 'border-transparent hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              <Shirt size={11} className="text-zinc-500" />
              <span>AI Consultant</span>
            </button>
            <button
              id="tab-moodboard"
              onClick={() => setActiveTab('moodboard')}
              className={`py-1.5 px-3 uppercase tracking-wider transition-all border flex items-center space-x-1.5 ${
                activeTab === 'moodboard'
                  ? 'text-gold-500 border-zinc-800 bg-zinc-950 font-medium'
                  : 'border-transparent hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              <Layers size={11} className="text-zinc-500" />
              <span>Interactive Designer</span>
            </button>
            <button
              id="tab-booking"
              onClick={() => setActiveTab('booking')}
              className={`py-1.5 px-3 uppercase tracking-wider transition-all border flex items-center space-x-1.5 ${
                activeTab === 'booking'
                  ? 'text-gold-500 border-zinc-800 bg-zinc-950 font-medium'
                  : 'border-transparent hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              <Scissors size={11} className="text-zinc-500" />
              <span>Sizing Suite</span>
            </button>
            <button
              id="tab-contact"
              onClick={() => setActiveTab('contact')}
              className={`py-1.5 px-3 uppercase tracking-wider transition-all border flex items-center space-x-1.5 ${
                activeTab === 'contact'
                  ? 'text-gold-500 border-zinc-800 bg-zinc-950 font-medium'
                  : 'border-transparent hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              <MapPin size={11} className="text-zinc-500" />
              <span>Correspondence</span>
            </button>
            <button
              id="tab-cabinet"
              onClick={() => setActiveTab('cabinet')}
              className={`py-1.5 px-3 uppercase tracking-wider transition-all border flex items-center space-x-1.5 relative ${
                activeTab === 'cabinet'
                  ? 'text-gold-500 border-zinc-800 bg-zinc-950 font-medium'
                  : 'border-transparent hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              <span>Cabinet de Curiosités</span>
              {(savedConcepts.length > 0 || savedBookings.length > 0) && (
                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full inline-block animate-pulse absolute top-1 right-1" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Exhibition Container */}
      <main className="max-w-[1440px] w-full mx-auto px-6 md:px-12 py-10 flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'lookbook' && <LookbookSection />}
            {activeTab === 'services' && <ServicesSection />}
            {activeTab === 'journal' && <JournalSection />}
            {activeTab === 'consultant' && (
              <BespokeConsultant measurements={measurements} onSaveConcept={handleSaveConcept} />
            )}
            {activeTab === 'moodboard' && (
              <InteractiveMoodboard onSaveConcept={handleSaveConcept} />
            )}
            {activeTab === 'booking' && (
              <BespokeBookingSuite
                measurements={measurements}
                onUpdateMeasurements={setMeasurements}
                onSaveBooking={handleSaveBooking}
              />
            )}
            {activeTab === 'contact' && <ContactSection />}
            {activeTab === 'cabinet' && (
              <AtelierCabinet
                savedConcepts={savedConcepts}
                savedBookings={savedBookings}
                onDeleteConcept={handleDeleteConcept}
                onDeleteBooking={handleDeleteBooking}
                onActiveTab={setActiveTab}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Rich Multi-Column Luxury Footer */}
      <footer className="border-t border-zinc-900 bg-[#030303] text-zinc-500 font-mono text-[10px] select-none uppercase tracking-widest mt-24 relative z-10">
        <ScrollReveal direction="up" amount={0.05}>
          {/* Newsletter / Dispatch Row */}
          <div className="border-b border-zinc-900 py-10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-2">
                <span className="text-gold-500 text-[11px] font-semibold tracking-[0.25em] block">
                  L'Écho de l'Atelier
                </span>
                <p className="text-zinc-400 text-xs font-sans font-light normal-case leading-relaxed">
                  Subscribe to receive private collection briefings, architectural pattern outlines, and direct essays from La Directrice's travel notebook.
                </p>
              </div>
              <div className="lg:col-span-7">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                    setTimeout(() => setSubscribed(false), 5000);
                  }}
                  className="flex flex-col sm:flex-row gap-3 w-full"
                >
                  <input
                    type="email"
                    required
                    placeholder="ENTER SECURE EMAIL ADDRESS"
                    className="flex-1 bg-black border border-zinc-800 hover:border-gold-500/40 p-3 text-xs text-white placeholder-zinc-700 tracking-widest focus:outline-none focus:border-gold-500 transition-all font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-900 hover:bg-gold-500 hover:text-black border border-zinc-800 hover:border-gold-500 py-3 px-6 text-gold-500 font-mono text-xs tracking-widest uppercase transition-all duration-300 luxury-gold-glow"
                  >
                    {subscribed ? 'CONFIRMÉ ✓' : 'SUBSCRIBE TO ATELIER'}
                  </button>
                </form>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gold-500 text-[9px] mt-2 font-mono"
                  >
                    ACCESS GRANTED. THE PRIVATE DOSSIER TOKENS HAVE BEEN SECURED.
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          {/* 5-Column Grid */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10">
            {/* Column 1: Brand Philosophy (4 cols) */}
            <div className="col-span-2 lg:col-span-4 space-y-4 col-start-1">
              <h3 className="font-serif text-white text-sm tracking-widest">
                ATELIER NOIR <span className="text-gold-500">& OR</span>
              </h3>
              <p className="text-zinc-400 text-xs font-sans font-light normal-case leading-relaxed pr-6">
                An architectural fashion salon operating at the intersections of quiet luxury contours and modern procedural computational design. We baste every canvas by hand, choosing raw fibers and precious metals to last several lifetimes.
              </p>
              <div className="flex items-center space-x-2 pt-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] text-zinc-500 tracking-widest font-mono">PARIS SALON ONLINE & ACTIVE</span>
              </div>
            </div>

            {/* Column 2: Ateliers Navigation Menu (2 cols) */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <h4 className="text-zinc-400 font-mono text-[9px] tracking-widest uppercase border-b border-zinc-900 pb-2">
                STUDIO LINKS
              </h4>
              <ul className="space-y-3.5 text-[9px]">
                <li>
                  <button onClick={() => setActiveTab('lookbook')} className="hover:text-gold-500 transition-colors cursor-pointer text-left">
                    Collection Lookbook
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('services')} className="hover:text-gold-500 transition-colors cursor-pointer text-left">
                    Couture Services
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('journal')} className="hover:text-gold-500 transition-colors cursor-pointer text-left font-medium">
                    Essay Journal
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('consultant')} className="hover:text-gold-500 transition-colors cursor-pointer text-left">
                    AI Consultant
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('moodboard')} className="hover:text-gold-500 transition-colors cursor-pointer text-left">
                    Workspace Designer
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('booking')} className="hover:text-gold-500 transition-colors cursor-pointer text-left">
                    Sizing Suite
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Category services (2 cols) */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <h4 className="text-zinc-400 font-mono text-[9px] tracking-widest uppercase border-b border-zinc-900 pb-2">
                CATEGORIES
              </h4>
              <ul className="space-y-3.5 text-[9px]">
                <li className="text-zinc-400">Haute Couture</li>
                <li className="text-zinc-400">Bespoke Tailoring</li>
                <li className="text-zinc-400">Atelier Prêt-à-Porter</li>
                <li className="text-zinc-400">Luxury Accessories</li>
                <li className="text-zinc-400 font-light">Basted Canvas</li>
                <li>
                  <button onClick={() => setActiveTab('cabinet')} className="text-gold-500 hover:text-white transition-colors cursor-pointer text-left">
                    Cabinet de Curiosités
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Salon Residencies (2 cols) */}
            <div className="col-span-1 lg:col-span-2 space-y-4 font-mono">
              <h4 className="text-zinc-400 font-mono text-[9px] tracking-widest uppercase border-b border-zinc-900 pb-2">
                RESIDENCIES
              </h4>
              <div className="space-y-4 text-[9px] leading-relaxed text-zinc-400">
                <div>
                  <p className="text-white font-semibold">PARIS PRIMARY</p>
                  <p className="text-zinc-500 font-light mt-0.5 font-sans normal-case">12 Rue Royale, 75008 Paris</p>
                </div>
                <div>
                  <p className="text-white font-semibold">MILAN SALON</p>
                  <p className="text-zinc-500 font-light mt-0.5 font-sans normal-case">Via Montenapoleone, Milan</p>
                </div>
                <div>
                  <p className="text-zinc-500">VIP COMMUNICATIONS</p>
                  <p className="text-gold-500 font-sans normal-case">+33 1 42 68 53 00</p>
                </div>
              </div>
            </div>

            {/* Column 5: Social channels & links (2 cols) */}
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <h4 className="text-zinc-400 font-mono text-[9px] tracking-widest uppercase border-b border-zinc-900 pb-2">
                COMMUNICATIONS
              </h4>
              <ul className="space-y-3.5 text-[9px]">
                <li>
                  <a href="#instagram" className="hover:text-gold-500 transition-colors">INSTAGRAM</a>
                </li>
                <li>
                  <a href="#vogue" className="hover:text-gold-500 transition-colors">VOGUE RUNWAY</a>
                </li>
                <li>
                  <a href="#pinterest" className="hover:text-gold-500 transition-colors font-medium">PINTEREST COUTURE</a>
                </li>
                <li>
                  <a href="#journal" className="hover:text-gold-500 transition-colors">LETTRE D'INFORMATION</a>
                </li>
                <li>
                  <button onClick={() => setActiveTab('contact')} className="text-gold-500 hover:text-white transition-colors cursor-pointer text-left">
                    CORRESPONDENCE FORM
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Symmetrical Dividers with elegant center seal */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between ">
            <div className="flex-1 h-[1px] bg-zinc-900" />
            <div className="px-6 flex items-center space-x-2 text-[8px] font-mono text-gold-500 tracking-[0.4em]">
              <span className="text-xs">✦</span>
              <span>ANO • CRÉATIONS</span>
              <span className="text-xs">✦</span>
            </div>
            <div className="flex-1 h-[1px] bg-zinc-900" />
          </div>

          {/* Symmetrical Compliance Information with trust items */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[9px] text-zinc-600">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <span>ATELIER NOIR & OR © 2026 // ALL COUTURE RIGHTS RESERVED</span>
              <span className="text-zinc-850">|</span>
              <a href="#privacy" className="hover:text-zinc-400 transition-colors">PRIVACY DOSSIER</a>
              <span className="text-zinc-850">|</span>
              <a href="#terms" className="hover:text-zinc-400 transition-colors">TERMS OF HIGH COUTURE</a>
            </div>

            {/* Premium VIP Trust Shields / Credit Badges */}
            <div className="flex items-center space-x-3 text-zinc-700 bg-black/45 border border-zinc-950 p-1 px-3">
              <span className="text-gold-500/60 font-serif italic text-[10px] tracking-wide">AMEX CENTURION ACCESS</span>
              <span className="text-zinc-800">•</span>
              <span className="tracking-widest">VISA SIGNATURE VIP</span>
              <span className="text-zinc-800">•</span>
              <span className="text-white/60 tracking-wider font-sans lowercase italic">chambre syndicale</span>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}
