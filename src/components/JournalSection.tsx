/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Clock, Calendar, Bookmark, X, BookOpen, Quote, ChevronRight } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  caption: string;
  illustrationSeed: string;
  content: string[];
  signatureNote: string;
}

const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'journal-1',
    title: 'The Architecture of Gravity: Draping Rigid Silks',
    category: 'TEXTILE ANATOMY',
    date: 'MAY 18, 2026',
    readTime: '6 MIN READ',
    caption: 'How we balance the sheer tension of liquid fabric on bespoke wire frameworks without compromising on human breathing rhythm.',
    illustrationSeed: '/images/look12.jpg',
    content: [
      "In high fashion, gravity is not an obstacle—it is our primary design partner. The behavior of raw double-faced duchesse silk varies wildly based on ambient room humidity and yarn elasticity. When we drap silk over dynamic bust structures, the angle of the bias grain dictates how the material absorbs light.",
      "At Atelier Noir & Or, we practice 'gravity-mapping.' Our tailors drape whole panels of dark velvet on pre-configured models for 48 hours in a controlled environment. Only once the warp fibers stretch to their organic threshold do we introduce gold-bullion stitching.",
      "Traditional pattern sheets fail to capture the kinetics of the body in motion. Thus, we reject rigid grid lines. Every curve is pinned by eye, in harmony with the unique respiratory posture of the client, forging a tailored piece that behaves like fluid liquid silver."
    ],
    signatureNote: 'Recorded at Rue de L’Atelier Studio, Paris'
  },
  {
    id: 'journal-2',
    title: 'The Alchemy of Pure Gold Embroidery Wire',
    category: 'METALLIC SAVOIR-FAIRE',
    date: 'APR 02, 2026',
    readTime: '8 MIN READ',
    caption: 'A deep analysis into hand-drawn gold thread loops and basted stitches preserved from 17th-century garments.',
    illustrationSeed: '/images/look14.jpg',
    content: [
      "Not all gold glows with equal restraint. Modern metallic embroidery contains synthetic laminates that lack depth and turn dull under warm evening chandelier light. Atelier Noir & Or sources exclusive hand-drawn 18k gold coil wire directly from specialized artisans in Lyon.",
      "This process involves drawing solid gold alloy through microscopic steel dies until reaching a diameter finer than a strand of hair. It is then wrapped spirally around a central silk core. This prevents oxidization and imparts a warm, dim champagne brilliance.",
      "When we stitch geometric patterns into thick velvet, the pressure of the presser feet must remain microscopic. A single mistake can slice the silk loops. The resulting ornament preserves and reflects candle flames with an organic retro flicker."
    ],
    signatureNote: 'Crafted in collaboration with Biella Atelier weavers'
  },
  {
    id: 'journal-3',
    title: 'The Silent Column: Designing Haute Silhouette Lines',
    category: 'DESIGN ARCHITECTURE',
    date: 'MAR 14, 2026',
    readTime: '5 MIN READ',
    caption: 'Why the classic asymmetrical peak lapel remains the absolute high fashion pinnacle of modern tailoring.',
    illustrationSeed: '/images/look8.jpg',
    content: [
      "A tailored jacket is a set of geometric values. If the shoulder pitch is misaligned by even 2 millimeters, the fabric buckle creates a diagonal shadow across the chest, fracturing the silhouette's vertical integrity.",
      "We design our signature jackets of structured obsidian wool-crepe using floating horsehair canvases. By using dynamic horsehair padding instead of synthetic glues, the tailoring learns the body shape over time, responding naturally to individual temperature fluctuations.",
      "We pair this structured core with sharp, asymmetric peak lapels angled precisely at 32 degrees. This specific axis redirects the observer's focus upward, anchoring a posture of quiet power and balance."
    ],
    signatureNote: 'Drafted in Milan Tailoring Office'
  }
];

export default function JournalSection() {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  // Decorator that spots any bracketed fashion keywords and renders them in pristine high-contrast gold
  const renderRichText = (text: string) => {
    if (!text) return '';
    const parts = text.split(/(【|】)/);
    let isGold = false;
    return parts.map((part, index) => {
      if (part === '【') {
        isGold = true;
        return null;
      }
      if (part === '】') {
        isGold = false;
        return null;
      }
      if (isGold) {
        return (
          <span key={index} className="text-gold-500 font-medium tracking-wide">
            {part}
          </span>
        );
      }
      return part;
    }).filter(part => part !== null);
  };

  return (
    <div className="space-y-12 text-white">
      {/* 3D Flip Card Style Overrides */}
      <style>{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          transform-style: preserve-3d;
        }
        /* Rotate the inner container on hover of the entire journal-card container (.group) */
        .group:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 0px;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-zinc-900 pb-5 gap-4">
        <div>
          <span className="font-mono text-[9px] text-gold-500 tracking-[0.3em] uppercase block">EDITORIAL JOURNAL // LA CHRONIQUE</span>
          <h2 className="font-serif text-3xl font-light tracking-wide mt-1">Savoir-Faire Chronicle</h2>
        </div>
        <div className="font-mono text-[9.5px] text-zinc-500 text-left md:text-right max-w-xs uppercase tracking-wider">
          CURATED ESSAYS ON SHAPE RESEARCH, SILK GRAPHICS, AND ATELIER HISTORIES
        </div>
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-zinc-900 bg-zinc-950/20 p-6 md:p-8">
        <div className="lg:col-span-5 relative group border border-zinc-900 bg-black p-2.5 overflow-hidden">
          <div className="aspect-[4/5] w-full overflow-hidden bg-zinc-950">
            <img
              src="/images/look10.jpg"
              alt="Leather bound designer journal with golden hand sketches on black stone"
              className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-4 left-4 bg-zinc-950/90 text-[8px] font-mono px-2 py-1 border border-zinc-900 tracking-wider">
            FEATURE DRAFT
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <span className="text-[9px] font-mono text-gold-500 uppercase tracking-widest block">ATELIER CORE PHILOSOPHY</span>
          <h3 className="font-serif text-2xl md:text-3xl font-light text-white leading-tight">
            “Couture is the drafting of light and shadows using the needle as our physical pencil.”
          </h3>
          <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
            In our seasonal journal, we document ongoing research into structural lines, gold cord density, and raw fibers. This is where material physics meets pure artistic desire. Our design studio catalog updates quarterly, providing a transparent glance into the labor-intensive practices of luxury.
          </p>

          <div className="border border-zinc-900 bg-black/40 p-4 space-y-2 border-l-2 border-l-gold-500">
            <Quote size={13} className="text-gold-500" />
            <p className="font-serif text-xs italic text-zinc-300">
              “We do not construct clothes; we construct physical monuments to cover and frame the human soul.”
            </p>
            <span className="font-mono text-[9px] text-zinc-500 block">— ARISTIDE DE CASSI, FOUNDING DESIGNER</span>
          </div>
        </div>
      </div>

      {/* Grid of Journal Articles */}
      <div className="space-y-6">
        <div className="border-b border-zinc-900 pb-2 flex justify-between items-center">
          <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase block">SELECTED ESSAYS & DIARIES</span>
          <span className="font-mono text-[9px] text-gold-500 uppercase tracking-widest">3 PUBLISHED ENTRIES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ENTRIES.map((entry) => (
            <div
              key={entry.id}
              id={`journal-card-${entry.id}`}
              className="border border-zinc-900 bg-black/30 flex flex-col justify-between hover:border-gold-500/25 transition-all group cursor-pointer"
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="p-3">
                {/* 3D Flipping Illustration Box */}
                <div className="aspect-[16/9] w-full mb-4 flip-card">
                  <div className="flip-card-inner">
                    {/* Front Face */}
                    <div className="flip-card-front bg-zinc-950 overflow-hidden relative border border-zinc-900/60">
                      <img
                        src={entry.illustrationSeed}
                        alt={entry.title}
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-black/80 text-[7px] font-mono px-1.5 py-0.5 border border-zinc-900 uppercase">
                        {entry.category}
                      </div>
                      <div className="absolute bottom-2 right-2 font-mono text-[7px] text-zinc-500 tracking-wider">
                        TAP TO FLIP
                      </div>
                    </div>
                    
                    {/* Back Face (Editorial Archives Backing) */}
                    <div className="flip-card-back bg-[#08080a] border border-gold-500/30 flex flex-col justify-between p-3.5 text-left relative overflow-hidden">
                      {/* Subtle watermarked background logo */}
                      <div className="absolute right-[-10px] bottom-[-10px] font-serif text-[48px] font-bold text-zinc-900/20 pointer-events-none select-none tracking-tighter">
                        N&O
                      </div>
                      
                      <div className="space-y-1">
                        <span className="text-[7px] font-mono text-gold-500/80 uppercase tracking-[0.2em] block">
                          {entry.category} // SPEC
                        </span>
                        <h5 className="font-serif text-[11px] font-medium text-zinc-200 line-clamp-1 uppercase tracking-wide">
                          {entry.title}
                        </h5>
                        <p className="font-serif italic text-[10px] text-zinc-400 leading-normal line-clamp-3 pt-1">
                          "{entry.content[0]?.slice(0, 110)}..."
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center border-t border-zinc-900 pt-1.5 text-[7.5px] font-mono text-zinc-500">
                        <span>EST. 2026 // N&O</span>
                        <span className="text-gold-500/60 tracking-widest uppercase">{entry.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 px-1">
                  <div className="flex items-center space-x-2 text-[8px] font-mono text-zinc-500">
                    <Calendar size={9} />
                    <span>{entry.date}</span>
                    <span>•</span>
                    <Clock size={9} />
                    <span>{entry.readTime}</span>
                  </div>
                  <h4 className="font-serif text-base text-zinc-200 group-hover:text-gold-500 transition-colors">
                    {entry.title}
                  </h4>
                  <p className="font-sans text-[11px] text-zinc-500 leading-relaxed font-light line-clamp-3">
                    {entry.caption}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  id={`btn-read-journal-${entry.id}`}
                  className="w-full py-2 bg-zinc-950/60 hover:bg-zinc-900 text-gold-500 border border-zinc-900 hover:border-zinc-800 text-[10px] font-mono uppercase tracking-widest transition-all flex items-center justify-center space-x-1"
                >
                  <span>Examine Essay</span>
                  <ChevronRight size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW: Ready-to-Wear Series Exhibition */}
      <div className="space-y-6 pt-12 border-t border-zinc-900">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-zinc-900 pb-3 gap-4">
          <div>
            <span className="font-mono text-[9px] text-gold-500 tracking-[0.25em] uppercase block">EXPOSITION DE COLLECTION // PRÊT-À-PORTER</span>
            <h3 className="font-serif text-2xl font-light text-white">Atmospheric Series Exhibition</h3>
          </div>
          <span className="font-mono text-[9px] text-[#9d8a6e] uppercase tracking-widest">
            3 EDITORIAL DIORAMAS & SCENARIOS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Box 1: Concept & Posture */}
          <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4 group hover:border-gold-500/25 transition-all duration-300 luxury-gold-glow">
            <div className="aspect-[4/3] w-full bg-black overflow-hidden relative border border-zinc-900">
              <img
                src="/images/Look5.jpg"
                alt="Aesthetic ready-to-wear model dress drape in warm dim light"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                SERIES: ATN-AUM-26
              </div>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[8.5px] tracking-widest text-[#9d8a6e] block">STYLE & CONCEPT // 01</span>
              <h4 className="font-serif text-lg text-white font-normal group-hover:text-gold-500 transition-colors">Aesthetic Concept & Styling Posture</h4>
              <p className="font-sans text-[11.5px] text-zinc-400 leading-relaxed font-light">
                Our latest Ready-to-Wear collection is built on a quiet, structural dialogue. By implementing an 【Aesthetic Concept】 that integrates sharp masculine outer frameworks with supple, feminine backing linings, we establish an elegant, commanding 【Styling Posture】 that flows with individual kinetic pace.
              </p>
            </div>
          </div>

          {/* Box 2: Drape & Structure */}
          <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4 group hover:border-gold-500/25 transition-all duration-300 luxury-gold-glow">
            <div className="aspect-[4/3] w-full bg-black overflow-hidden relative border border-zinc-900">
              <img
                src="/images/look12.jpg"
                alt="Detailed textile fiber structures"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                DRAPE: SILK-OR-44
              </div>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[8.5px] tracking-widest text-[#9d8a6e] block">LINE KINETICS // 02</span>
              <h4 className="font-serif text-lg text-white font-normal group-hover:text-gold-500 transition-colors">Fluid Luminous Drape & Structure</h4>
              <p className="font-sans text-[11.5px] text-zinc-400 leading-relaxed font-light">
                Bridging material physics and art, every shirt and coat demonstrates a clear balance of 【Luminous Drape】 with a stark 【Sculptured Structure】. Organic silk satin panels fall effortlessly across key physical rotation planes, creating dynamic shadows that shift as you move.
              </p>
            </div>
          </div>

          {/* Box 3: Atmospheric Scenarios */}
          <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4 group hover:border-gold-500/25 transition-all duration-300 luxury-gold-glow">
            <div className="aspect-[4/3] w-full bg-black overflow-hidden relative border border-zinc-900">
              <img
                src="/images/look13.jpg"
                alt="Twilight studio atmosphere"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                SCENE: TW-CHAMBER
              </div>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[8.5px] tracking-widest text-[#9d8a6e] block">OCULLAR SCENARIOS // 03</span>
              <h4 className="font-serif text-lg text-white font-normal group-hover:text-gold-500 transition-colors">Atmospheric Wear Scenarios</h4>
              <p className="font-sans text-[11.5px] text-zinc-400 leading-relaxed font-light">
                Designed for exclusive events and intimate salons. This series is engineered to transition beautifully between low-candlelight dinners and dusk social galleries, utilizing a luxurious 【Twilight Atmosphere】 where gold fibers catching peripheral rays glow with unmatched brilliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reading overlay Modal (Consistent design theme) */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="max-w-2xl w-full border border-zinc-800 bg-[#070707] p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6"
            >
              {/* Modal header */}
              <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
                <div>
                  <span className="font-mono text-[9px] text-gold-500 tracking-widest block">{selectedEntry.category}</span>
                  <h3 className="font-serif text-xl md:text-2xl font-light text-white mt-1">{selectedEntry.title}</h3>
                  <div className="flex items-center space-x-2 text-[9px] font-mono text-zinc-500 mt-2">
                    <span>{selectedEntry.date}</span>
                    <span>•</span>
                    <span>{selectedEntry.readTime}</span>
                  </div>
                </div>
                <button
                  id="btn-close-journal-modal"
                  onClick={() => setSelectedEntry(null)}
                  className="p-1.5 border border-zinc-800 hover:border-red-500 text-zinc-400 hover:text-red-500 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Modal Illustration */}
              <div className="aspect-[21/9] w-full overflow-hidden border border-zinc-900 bg-zinc-950 relative">
                <img
                  src={selectedEntry.illustrationSeed}
                  alt={selectedEntry.title}
                  className="w-full h-full object-cover grayscale opacity-90"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Modal Core Content */}
              <div className="space-y-4 text-zinc-300 font-sans text-xs md:text-sm leading-relaxed font-light">
                {selectedEntry.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Signature stamp */}
              <div className="border-t border-zinc-900 pt-4 flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] font-mono text-zinc-500 gap-2">
                <span>{selectedEntry.signatureNote}</span>
                <span className="text-gold-500 uppercase tracking-widest">ATELIER NOIR & OR ARCHIVE</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
