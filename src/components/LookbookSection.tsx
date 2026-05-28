/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Eye, Sparkles, MapPin } from 'lucide-react';
import { LOOKBOOK_COLLECTION } from '../data/atelierData';
import { LookbookItem } from '../types';
import ScrollReveal from './ScrollReveal';
import ParallaxWrapper from './ParallaxWrapper';

export default function LookbookSection() {
  const [parisTime, setParisTime] = useState('');
  const [selectedLook, setSelectedLook] = useState<LookbookItem | null>(null);
  const [expandedLookId, setExpandedLookId] = useState<string | null>(null);

  // Global document click handler to close expanded overlays when clicking elsewhere
  useEffect(() => {
    const handleOutsideClick = () => {
      setExpandedLookId(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // High-performance rich text renderer that decorates any bracketed couture terminology in gold
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

  // Maintain Live Paris Time (the headquarters of high-end fashion)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setParisTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white space-y-16">
      {/* Editorial Header */}
      <ScrollReveal direction="up" amount={0.05}>
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-800 pb-8 space-y-6 md:space-y-0">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-gold-500 uppercase">
              Collection No. I — Dusk & Luminary
            </span>
            <ParallaxWrapper strength={15}>
              <h1 className="font-serif text-5xl md:text-7xl font-normal text-white mt-3 leading-none select-none gold-text-shimmer">
                L'Édition Noire <span className="font-serif italic text-gold-500">& Or</span>
              </h1>
            </ParallaxWrapper>
            <p className="font-sans text-xs md:text-sm text-zinc-400 max-w-xl mt-4 font-light leading-relaxed">
              Quiet luxury built with high-contrast lines. A masterfully structured showcase engineered
              for creative collaborations, premium textiles, and architectural fashion silhouettes.
            </p>
          </div>

          {/* Studio Telemetry Card (Aesthetic Paris Clock - Sharp outlines, literal human labels) */}
          <div className="border border-zinc-800 p-4 min-w-[240px] flex flex-col justify-between bg-zinc-950/40 backdrop-blur-sm relative luxury-gold-glow">
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-gold-500" />
            <div className="flex items-center space-x-2 text-zinc-400 text-xs font-mono tracking-wider">
              <MapPin size={12} className="text-gold-500 animate-pulse" />
              <span className="uppercase">ATELIER PARIS HQ</span>
            </div>
            <div className="text-2xl mt-2 font-mono text-white tracking-widest font-normal">
              {parisTime || '00:00:00'}
            </div>
            <span className="font-mono text-[9px] text-zinc-500 mt-2 uppercase tracking-widest">
              UTC +02:00 STATE // SECURE LINK
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Hero Exhibition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {LOOKBOOK_COLLECTION.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            viewport={{ once: false, amount: 0.08 }}
            transition={{ delay: (index % 3) * 0.08, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className={`${item.colSpan} border border-zinc-800 bg-black group overflow-hidden relative flex flex-col justify-end min-h-[480px] p-6 atelier-reflect`}
          >
            {/* Background Image with referral policy constraint */}
            <img
              src={item.imageUrl}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-65 group-hover:opacity-85"
            />

            {/* Sharp top-left badge */}
            <div className="absolute top-0 left-0 bg-black/95 border-r border-b border-zinc-800 py-1.5 px-4 z-10">
              <span className="font-mono text-[10px] tracking-[0.2em] text-gold-500 uppercase">
                {item.tag}
              </span>
            </div>

            {/* Content overlay - Reduced opacity background, clickable to expand description, elegant spacing */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                setExpandedLookId(prev => prev === item.id ? null : item.id);
              }}
              className="relative z-10 bg-black/75 backdrop-blur-md p-5 mt-auto border border-zinc-800 cursor-pointer transition-all duration-500 ease-[0.16,1,0.3,1] hover:border-zinc-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-zinc-400 italic block">
                    {item.subtitle}
                  </span>
                  <p className="font-serif text-xl font-normal text-white mt-1 transition-colors duration-300">
                    {item.title}
                  </p>
                </div>
                <button
                  id={`btn-view-${item.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLook(item);
                  }}
                  className="p-2 border border-zinc-800 text-zinc-400 hover:text-gold-500 hover:border-gold-500 transition-all bg-black/40 hover:bg-black/80"
                  title="Examine Details"
                >
                  <Eye size={16} />
                </button>
              </div>
              
              {/* Premium high-end layout description: smaller font, spacious line height & letter spacing */}
              <div className={`font-sans text-[11px] text-zinc-300 font-light tracking-wider text-justify transition-all duration-500 ease-[0.16,1,0.3,1] ${
                expandedLookId === item.id 
                  ? 'mt-4 max-h-[350px] opacity-100' 
                  : 'mt-0 max-h-0 opacity-0 overflow-hidden'
              }`}
              style={{ lineHeight: '1.85' }}
              >
                {renderRichText(item.description)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Collection Notes Block */}
      <ScrollReveal direction="up" amount={0.1}>
        <div className="border border-zinc-800 p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-zinc-950/20 luxury-gold-glow">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gold-500 text-xs tracking-wider font-mono">
              <Sparkles size={14} />
              <span>EXCLUSIVITÉ COUTURE</span>
            </div>
            <h3 className="font-serif text-2xl font-light text-white">Bespoke Fitting & Dynamic Design</h3>
            <p className="font-sans text-xs text-zinc-400 max-w-2xl font-light leading-relaxed">
              All designs from Collection No. I can be customized to match your exact size parameters. Use
              our AI Bespoke Consultant to generate styling blueprints, or create your own custom concept arrangement in the Atelier Workspace.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <span className="font-mono text-zinc-500 text-[10px] tracking-widest uppercase border border-zinc-800 py-1.5 px-3 self-center hover:border-gold-500 hover:text-gold-500 transition-colors">
              ORIGINE CERTIFIÉE PARIS
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* NEW: Atelier Couture ZOOM Detail Gallery */}
      <ScrollReveal direction="up" amount={0.08}>
        <div className="space-y-6 pt-6">
          <div className="border-b border-zinc-900 pb-3 flex justify-between items-end">
            <div>
              <span className="font-mono text-[9px] text-gold-500 tracking-[0.25em] uppercase block">DÉTAILS ET MATIÈRES</span>
              <h3 className="font-serif text-xl font-light text-white">Atelier Zoom & Craftsmanship Gallery</h3>
            </div>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">4 MICRO SPECIMENS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Specimen 01: Fabric Macro */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-4 space-y-4 group hover:border-gold-500/20 transition-all duration-300 luxury-gold-glow">
              <div className="aspect-[4/3] w-full bg-black overflow-hidden relative border border-zinc-900">
                <img
                  src="/images/Look5.jpg"
                  alt="L’Étoffe Impériale - Fabric macro"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                  REF: EF-109
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[8px] tracking-widest text-zinc-500 block">MICRO DE LA MATIÈRE // 01</span>
                <h4 className="font-serif text-md text-white font-normal group-hover:text-gold-500 transition-colors">L'Étoffe Impériale</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
                  {renderRichText("100% 【Double-Satin Silk】 from elite Lyons workshops, fibers flowing with a dark champagne-gold shimmer that exhibits a flawless 【Luminous Drape】.")}
                </p>
              </div>
            </div>

            {/* Specimen 02: Stitch Detail */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-4 space-y-4 group hover:border-gold-500/20 transition-all duration-300 luxury-gold-glow">
              <div className="aspect-[4/3] w-full bg-black overflow-hidden relative border border-zinc-900">
                <img
                  src="/images/look6.jpg"
                  alt="Le Point de l’Artisan - Stitch detail"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                  FIT: OR-308
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[8px] tracking-widest text-zinc-500 block">DÉTAIL DE LA COUTURE // 02</span>
                <h4 className="font-serif text-md text-white font-normal group-hover:text-gold-500 transition-colors">Le Point de l'Artisan</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
                  {renderRichText("Hundreds of hours of meticulous hand-stitching with metallic bullion cores, sculpting a brilliant 【Gilded Filigree Thread】 motif onto rich 【Champagne Satin】.")}
                </p>
              </div>
            </div>

            {/* Specimen 03: Fit & Body silhouette */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-4 space-y-4 group hover:border-gold-500/20 transition-all duration-300 luxury-gold-glow">
              <div className="aspect-[4/3] w-full bg-black overflow-hidden relative border border-zinc-900">
                <img
                  src="/images/look7.jpg"
                  alt="La Coupe Tridimensionnelle - Fit silhouette on-body"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                  SLT: SL-04
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[8px] tracking-widest text-zinc-500 block">LIGNE CORPORELLE // 03</span>
                <h4 className="font-serif text-md text-white font-normal group-hover:text-gold-500 transition-colors">Le Silhouette Sculptée</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
                  {renderRichText("Traditional drape shaped with 【Three-Dimensional Draping】. Supported by internal high-density 【Corset Armatures】 to deliver an uncompromising 【Sculptured Structure】.")}
                </p>
              </div>
            </div>

            {/* Specimen 04: Blueprint sketch */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-4 space-y-4 group hover:border-gold-500/20 transition-all duration-300 luxury-gold-glow">
              <div className="aspect-[4/3] w-full bg-black overflow-hidden relative border border-zinc-900">
                <img
                  src="/images/look8.jpg"
                  alt="Le Patronage du Maître - Blueprint layout"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                  MAP: DR-412
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[8px] tracking-widest text-zinc-500 block">ESSENCE DU TRAVAIL // 04</span>
                <h4 className="font-serif text-md text-white font-normal group-hover:text-gold-500 transition-colors">Le Patronage du Plan</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
                  {renderRichText("Atelier pattern draft. Precisely mapping the golden lines of 【Structural Tailoring】, balance curves, and channeled 【Corset Armatures】 for absolute structural symmetry.")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Look Detail Modal */}
      {selectedLook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="border border-zinc-800 bg-zinc-950 max-w-4xl w-full p-6 md:p-8 relative grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {/* Absolute close button */}
            <button
              id="btn-close-modal"
              onClick={() => setSelectedLook(null)}
              className="absolute top-4 right-4 border border-zinc-800 text-zinc-400 hover:text-white hover:border-white text-xs font-mono py-1 px-3 uppercase tracking-wider bg-black"
            >
              CLOSE ESC
            </button>

            {/* Left Image Column */}
            <div className="md:col-span-5 h-[280px] md:h-[450px] border border-zinc-800 bg-black relative">
              <img
                src={selectedLook.imageUrl}
                alt={selectedLook.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Right Information Column */}
            <div className="md:col-span-7 flex flex-col justify-between py-2 space-y-6">
              <div className="space-y-4">
                <span className="font-mono text-xs tracking-[0.25em] text-gold-500 uppercase">
                  {selectedLook.tag} // SPECIFICATION
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-white font-normal">
                  {selectedLook.title}
                </h3>
                <div className="font-mono text-xs text-zinc-500 italic">
                  {selectedLook.subtitle}
                </div>
                <div className="border-t border-zinc-900 my-4" />
                <p className="font-sans text-sm text-zinc-350 font-light leading-relaxed">
                  {renderRichText(selectedLook.description)}
                </p>
                <div className="bg-zinc-900/50 p-4 border border-zinc-800/80 space-y-2">
                  <div className="font-mono text-[10px] tracking-widest text-gold-500 uppercase">
                    MATERIALS EMPLOYED
                  </div>
                  <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
                    Custom-woven Italian metallic-silk threads, unbleached organza, basted hair canvas backing, and individual fittings across 3 iterations at Paris Atelier.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="font-mono text-[10px] text-zinc-500 tracking-widest">
                  PORTFOLIO CODES: ANO-I-{selectedLook.id.toUpperCase()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
