/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scissors, Shield, Sparkles, Star, ChevronRight, Compass, Eye, Heart } from 'lucide-react';
import { BESPOKE_SERVICES } from '../data/atelierData';
import ScrollReveal from './ScrollReveal';

export default function ServicesSection() {
  const [activeStep, setActiveStep] = useState(0);

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

  const bespokeSteps = [
    {
      title: "01. THE SCHEMATIC DIALOGUE",
      subtitle: "La Première Rencontre",
      description: "A private 【Haute Couture】 aesthetic consultation to define the core silhouette requirements and styling posture. We examine material behaviors, formulate the general 【Structural Tailoring】 outline, and establish the foundational 【Hourglass Silhouette】 framework based on anatomy."
    },
    {
      title: "02. THE CANVAS BLUEPRINT (TOILE)",
      subtitle: "La Coupe Initiale",
      description: "Meticulous pattern adjustments and drapery testing using raw cotton canvas to sculpt an custom toile prototype. Pinned directly on the physical frame to secure a flawless drape and an exquisite, breathtaking 【Sculptured Structure】 before scissors touch noble fabrics."
    },
    {
      title: "03. MATERIAL WEAVING & CHOPPING",
      subtitle: "L'assemblage Des Matières",
      description: "Our master tailors baste and structure the ultimate luxury textiles. We assemble imported custom Lyon fabrics, pairing double-face 【Double-Satin Silk】, luxurious 【Champagne Satin】, and dense 【Double-Spun Wool-Crepe】 with micro-pin structures for dimensional balance."
    },
    {
      title: "04. THE COUTURE FINISHING",
      subtitle: "La Pièce Parfaite",
      description: "Hand-rolled silk finishing, cold-forged fixtures, and heirloom-level 【Hand-Sewn Embroidery】 taking over a hundred hours. Silk-coated helical 【Corset Armatures】 are embedded within the lining to secure elegant posture and perfect 【Luminous Drape】."
    }
  ];

  return (
    <div className="space-y-12 text-white">
      {/* Editorial Header */}
      <ScrollReveal direction="up" amount={0.08}>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-zinc-900 pb-5 gap-4">
          <div>
            <span className="font-mono text-[9px] text-gold-500 tracking-[0.3em] uppercase block">SAVOIR-FAIRE & DIALOGUE</span>
            <h2 className="font-serif text-3xl font-light tracking-wide mt-1 gold-text-shimmer">Atelier Tailoring Services</h2>
          </div>
          <div className="font-mono text-[9.5px] text-zinc-500 text-left md:text-right max-w-xs uppercase tracking-wider">
            ESTIMATES AND TAILORING WORKFLOW SCULPTED ACCORDING TO PARISIAN TRADITIONAL METRICS
          </div>
        </div>
      </ScrollReveal>

      {/* Hero Banner Showcase */}
      <ScrollReveal direction="up" amount={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-zinc-900 bg-zinc-950/20 p-6 md:p-8 luxury-gold-glow">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 border border-gold-500/20 bg-gold-500/5 px-2.5 py-1 text-[8.5px] font-mono tracking-widest text-gold-500 uppercase">
              <Sparkles size={10} />
              <span>EXCEPTIONAL CRITERIA</span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-white leading-tight">
              Sculpting garments that act as <span className="text-gold-500 italic">architectural armor</span> of pure silk and cold gold.
            </h3>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
              Every garment crafted at Atelier Noir & Or is built around the strict curves of the subject. Guided by centuries of Parisian tailoring heritage, we select noble materials from historic domestic workshops in Lyon, St. Etienne, and Biella to formulate unmatched physical experiences.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-900 font-mono text-zinc-500 text-[9px] uppercase tracking-widest">
              <div>
                <span className="text-gold-500 text-lg font-serif font-light block">180+</span>
                <span>Hours Per Gown</span>
              </div>
              <div>
                <span className="text-white text-lg font-serif font-light block">4-Stage</span>
                <span>Fit Calibration</span>
              </div>
              <div>
                <span className="text-gold-500 text-lg font-serif font-light block">100%</span>
                <span>Organic Silk Lining</span>
              </div>
            </div>
          </div>

          {/* Drapery Image Container (No gaps / Fully finished) */}
          <div className="lg:col-span-5 relative group border border-zinc-900 bg-black p-2.5 overflow-hidden atelier-reflect">
            <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-950 relative">
              <img
                src="/src/assets/images/atelier_drape_1779672155343.png"
                alt="Artisan couture designer hand-draping dark satin silk over a master mannequin"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 bg-black/80 px-1.5 py-0.5 border border-zinc-900 text-[7px] font-mono text-zinc-400">
                LYON SATIN CALIBRATION // SERIES-III
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Services Grid Selection */}
      <div className="space-y-6">
        <div>
          <ScrollReveal direction="right" amount={0.1}>
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase block">AVAILABLE COUTURE DISCIPLINES</span>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BESPOKE_SERVICES.map((service, idx) => (
            <ScrollReveal
              key={service.id}
              direction="up"
              delay={idx * 0.08}
              amount={0.08}
              className="flex flex-col h-full"
            >
              <div
                id={`service-card-${service.id}`}
                className="border border-zinc-900 bg-black/40 p-5 flex flex-col justify-between hover:border-gold-500/20 transition-all group h-full atelier-reflect luxury-gold-glow"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                    <span>DISCIPLINE NO. 0{idx + 1}</span>
                    <span className="text-gold-500">{service.category}</span>
                  </div>
                  <h4 className="font-serif text-lg text-white font-normal group-hover:text-gold-500 transition-colors">
                    {service.title}
                  </h4>
                  <p className="font-sans text-[11px] text-zinc-500 leading-relaxed font-light font-sans">
                    {renderRichText(service.description)}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-950 flex justify-between items-center text-[10px] font-mono text-gold-500 font-semibold">
                  <span className="text-zinc-500 font-normal">{service.duration}</span>
                  <span>{service.priceEstimate}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Interactive 4-Stage Bespoke Journey */}
      <div className="border border-zinc-900 bg-black/20 p-6 md:p-8 space-y-6">
        <div className="border-b border-zinc-900 pb-3 flex justify-between items-end">
          <div>
            <span className="font-mono text-[9px] text-gold-500 tracking-[0.25em] uppercase block">THE TAILORING ARCHITECTURE</span>
            <h3 className="font-serif text-xl font-light text-white">The Couture Journey Step-By-Step</h3>
          </div>
          <span className="font-mono text-[10px] text-zinc-500">4 DISTINCT PHASES</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left panel: Step Selectors */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            {bespokeSteps.map((step, index) => (
              <button
                key={index}
                id={`btn-journey-step-${index}`}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-4 border transition-all flex justify-between items-center ${
                  activeStep === index
                    ? 'border-gold-500 bg-zinc-950 text-white'
                    : 'border-zinc-900 bg-black/20 text-zinc-400 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <div className="space-y-1">
                  <span className="font-mono text-[8px] block text-gold-500 tracking-wider">PHASE_0{index + 1}</span>
                  <span className="font-serif text-sm font-normal block">{step.title}</span>
                </div>
                <ChevronRight size={14} className={activeStep === index ? 'text-gold-500' : 'text-zinc-650'} />
              </button>
            ))}
          </div>

          {/* Right panel: Active Step Details */}
          <div className="lg:col-span-7 border border-zinc-900 bg-black/60 p-6 min-h-[220px] flex flex-col justify-between relative">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-[9px] text-gold-500 tracking-widest">{bespokeSteps[activeStep].subtitle}</span>
                <span className="w-8 h-8 rounded-full border border-zinc-900 flex items-center justify-center text-xs font-mono text-zinc-500">
                  0{activeStep + 1}
                </span>
              </div>
              <h4 className="font-serif text-xl text-white font-light tracking-wide">
                {bespokeSteps[activeStep].title}
              </h4>
              <p className="font-sans text-[12px] text-zinc-400 leading-relaxed font-light">
                {renderRichText(bespokeSteps[activeStep].description)}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-950 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span className="flex items-center space-x-1">
                <Shield size={10} className="text-gold-500" />
                <span>ATELIER STRICT GUARANTEE</span>
              </span>
              <span>PARIS METRIC ARCHIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Atelier Savoir-Faire Workshop Archives */}
      <ScrollReveal direction="up" amount={0.08}>
        <div className="space-y-6 pt-8 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
            <div>
              <span className="font-mono text-[9px] text-gold-500 tracking-[0.25em] uppercase block">SAVOIR-FAIRE SPECIMENS // ATELIER TECHNIQUE</span>
              <h3 className="font-serif text-2xl font-light text-white">Workshop Craft & Pattern Archives</h3>
            </div>
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-1 md:mt-0">3 SPECIALIZED COUTURE SEGMENTS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Atelier Detail 1: Pattern Drafting & Anatomy */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4 group hover:border-gold-500/20 transition-all duration-300 luxury-gold-glow">
              <div className="aspect-[16/10] w-full bg-black overflow-hidden relative border border-zinc-900">
                <img
                  src="/images/blueprint.png"
                  alt="Anatomical drafting lines"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                  CODE: PTN-DEV-402
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[8.5px] tracking-widest text-[#9d8a6e] block">SHAPE CONTOURS // 01</span>
                <h4 className="font-serif text-lg text-white font-normal group-hover:text-gold-500 transition-colors">Anatomical Pattern Drafting</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
                  Every silhouette begins with a comprehensive schematic layout. Using 【Anatomical Pattern Drafting】 methods, we calculate optimal seam lines matching your specific bone structure and posture dynamics, eliminating rigid block grids to let fabrics breathe freely.
                </p>
              </div>
            </div>

            {/* Atelier Detail 2: Material Selects & Weaves */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4 group hover:border-gold-500/20 transition-all duration-300 luxury-gold-glow">
              <div className="aspect-[16/10] w-full bg-black overflow-hidden relative border border-zinc-900">
                <img
                  src="/images/look9.jpg"
                  alt="Material detailing"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                  REF: MAT-LY-180
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[8.5px] tracking-widest text-[#9d8a6e] block">TEXTILE GENETICS // 02</span>
                <h4 className="font-serif text-lg text-white font-normal group-hover:text-gold-500 transition-colors">Double-Spun Material Selection</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
                  We source textiles of supreme density, predominantly choosing pristine 【Double-Spun Wool-Crepe】 and asymmetrical looms from historic weavers. Each layer undergoes strict temperature treatments to mature wool resiliency, yielding a rich, high-gravity drape.
                </p>
              </div>
            </div>

            {/* Atelier Detail 3: Helical Internal Support */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4 group hover:border-gold-500/20 transition-all duration-350 luxury-gold-glow">
              <div className="aspect-[16/10] w-full bg-black overflow-hidden relative border border-zinc-900">
                <img
                  src="/images/facade.png"
                  alt="Mannequin internal support"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-2 left-2 bg-black/95 border border-zinc-800 py-0.5 px-1.5 text-[8px] font-mono text-gold-500">
                  REF: SL-CORS-09
                </div>
              </div>
              <div className="space-y-2">
                <span className="font-mono text-[8.5px] tracking-widest text-[#9d8a6e] block">STEEL HARNESS // 03</span>
                <h4 className="font-serif text-lg text-white font-normal group-hover:text-gold-500 transition-colors">Sculptural Internal Armature</h4>
                <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light">
                  To secure uncompromising, crisp angles without feeling heavy, dresses and evening gowns are reinforced with organic 【Corset Armatures】. Constructed using bone-shaped spiral steel shafts, they distribute structural weight perfectly for posture support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
