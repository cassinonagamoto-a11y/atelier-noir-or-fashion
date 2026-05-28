/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Save, Scissors, ChevronRight, HelpCircle, FileText, Check } from 'lucide-react';
import { MeasurementSuite, SavedConcept } from '../types';

interface BespokeConsultantProps {
  measurements: MeasurementSuite;
  onSaveConcept: (concept: SavedConcept) => void;
}

const PRESET_IDEAS = [
  {
    title: "The Golden Velvet Tuxedo",
    prompt: "I need a tailored structural tuxedo jacket made of heavy noir velvet with gilded gold lapel embroidery and gold brass buttons. Ideal for a major art opening.",
    category: "Tailoring"
  },
  {
    title: "Liquid Gold Organza Cape",
    prompt: "A dramatic flowing cape built from pleated organza sheets with raw golden silk hems, cascading down to the ankles in sharp geometric levels.",
    category: "Eveningwear"
  },
  {
    title: "Minimalist Duster Column",
    prompt: "An asymmetric double-breasted dress coat, constructed from double-faced black cashmere, fastened on the high left collar with a raw polished brass clasp.",
    category: "Prêt-à-Porter"
  }
];

export default function BespokeConsultant({ measurements, onSaveConcept }: BespokeConsultantProps) {
  const [promptInput, setPromptInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Haute Couture');
  const [isFormulating, setIsFormulating] = useState(false);
  const [formulationStep, setFormulationStep] = useState('');
  const [briefingOutput, setBriefingOutput] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const formulationProcess = [
    'Consulting La Directrice at Paris HQ...',
    'Analyzing individual body measurements...',
    'Weaving premium obsidian silk and velvet fibers...',
    'Drafting architectural basted canvas layers...',
    'Stitching fine-gauge champagne gold filigree...'
  ];

  const handleConsult = async (customPrompt?: string) => {
    const activePrompt = customPrompt || promptInput;
    if (!activePrompt.trim()) return;

    setIsFormulating(true);
    setSavedSuccess(false);
    setBriefingOutput(null);

    // Dynamic cycling animation text
    let stepIndex = 0;
    setFormulationStep(formulationProcess[0]);
    const stepInterval = setInterval(() => {
      stepIndex++;
      if (stepIndex < formulationProcess.length) {
        setFormulationStep(formulationProcess[stepIndex]);
      }
    }, 1200);

    try {
      const response = await fetch('/api/bespoke-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          category: selectedCategory,
          measurements
        })
      });

      const data = await response.json();
      if (data.result) {
        setBriefingOutput(data.result);
      } else {
        setBriefingOutput(`### Formulation Error\nFailed to draft your boutique design. Please verify connection credentials.`);
      }
    } catch (err: any) {
      console.error(err);
      setBriefingOutput(`### Connection Interrupted\n${err.message || 'An error occurred during formulation.'}`);
    } finally {
      clearInterval(stepInterval);
      setIsFormulating(false);
    }
  };

  const saveToCabinet = () => {
    if (!briefingOutput) return;

    // Parse out title from briefing markdown or use default
    let derivedTitle = 'Atelier Creation No. ' + Math.floor(Math.random() * 900 + 100);
    const titleMatch = briefingOutput.match(/# COUTURE PORTFOLIO:\s*(.*)/);
    if (titleMatch && titleMatch[1]) {
      derivedTitle = titleMatch[1].trim();
    }

    // Convert markup summary back into a concept to save
    const newConcept: SavedConcept = {
      id: 'sav-c-' + Date.now(),
      title: derivedTitle,
      description: `Bespoke configuration crafted for Cassinonagamoto. Sizing details: Ht: ${measurements.height}cm, Wt: ${measurements.waist}cm.`,
      assets: [
        {
          id: 'text-asset-' + Date.now(),
          name: derivedTitle,
          type: 'text',
          text: briefingOutput,
          x: 50,
          y: 50,
          scale: 1,
          rotation: 0,
          zIndex: 1
        }
      ],
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    onSaveConcept(newConcept);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="text-white space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-[0.2em] text-gold-500 uppercase">
              La Suite Digitale
            </span>
            <h2 className="font-serif text-3xl font-light">AI Bespoke Consultant</h2>
            <p className="font-sans text-xs text-zinc-400 font-light leading-relaxed">
              Describe your occasion, desired fit, neckline, and color details. Our server-side design engine will construct a poetic styling briefing incorporating your exact body specifications.
            </p>
          </div>

          {/* Quick Inspirations */}
          <div className="space-y-3 border-l-2 border-gold-500/30 pl-4 py-1">
            <div className="text-[10px] font-mono tracking-widest text-[#9d8a6e] uppercase">
              SELECT AN EDITORIAL STARTER
            </div>
            <div className="space-y-2">
              {PRESET_IDEAS.map((idea) => (
                <button
                  key={idea.title}
                  id={`preset-${idea.title.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => {
                    setPromptInput(idea.prompt);
                    setSelectedCategory(idea.category);
                    handleConsult(idea.prompt);
                  }}
                  className="w-full text-left p-2.5 border border-zinc-900 bg-zinc-950/20 hover:border-zinc-700 hover:bg-zinc-950/80 transition-all text-xs flex justify-between items-center group"
                >
                  <div className="truncate pr-4">
                    <span className="text-[9px] font-mono text-gold-500 block">{idea.category.toUpperCase()}</span>
                    <span className="font-sans text-zinc-300 font-medium group-hover:text-white transition-colors">
                      {idea.title}
                    </span>
                  </div>
                  <ChevronRight size={14} className="text-zinc-600 group-hover:text-gold-500 transform group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>

          {/* Sizing Blueprint Checklist */}
          <div className="border border-zinc-900 p-4 bg-zinc-950/25 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-widest text-gold-500 uppercase">
                ACTIVE SIZING SCHEMATIC
              </span>
              <span className="text-[9px] font-mono text-zinc-500">ANO-BLUEPRINT-VERIFIED</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 text-xs">
              <div className="bg-black/40 border border-zinc-900 p-2 font-mono">
                <span className="text-zinc-500 block uppercase text-[8px]">HEIGHT</span>
                <span className="text-zinc-200">{measurements.height}cm</span>
              </div>
              <div className="bg-black/40 border border-zinc-900 p-2 font-mono">
                <span className="text-zinc-500 block uppercase text-[8px]">WAIST LINE</span>
                <span className="text-zinc-200">{measurements.waist}cm</span>
              </div>
              <div className="bg-black/40 border border-zinc-900 p-2 font-mono">
                <span className="text-zinc-500 block uppercase text-[8px]">BUST LINE</span>
                <span className="text-zinc-200">{measurements.bust}cm</span>
              </div>
              <div className="bg-black/40 border border-zinc-900 p-2 font-mono">
                <span className="text-zinc-500 block uppercase text-[8px]">HIP LINE</span>
                <span className="text-zinc-200">{measurements.hips}cm</span>
              </div>
            </div>
            <p className="text-[9px] text-zinc-500 leading-normal">
              *Adjust these metrics dynamically anytime via the **Measurement Suite** tab.
            </p>
          </div>

          {/* Form Area */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="category-select" className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                COUTURE ORDER TYPE
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-black border border-zinc-800 p-3 text-xs text-white focus:outline-none focus:border-gold-500 font-mono uppercase"
              >
                <option value="Haute Couture">Haute Couture Eveningwear</option>
                <option value="Bespoke Tailoring">Bespoke Tailoring</option>
                <option value="Atelier Prêt-à-Porter">Atelier Prêt-à-Porter</option>
                <option value="Capsule Accessory">Capsule L’Accessoire</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="prompt-textarea" className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                YOUR DESIGN SPECIFICATIONS
              </label>
              <textarea
                id="prompt-textarea"
                rows={5}
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="E.g., A heavy silk dress with deep plunging back, textured gold cuffs, ankle-length, to wear for premium runway dinner."
                className="w-full bg-black border border-zinc-800 p-4 text-xs font-sans text-white placeholder-zinc-600 focus:outline-none focus:border-gold-500 leading-relaxed resize-none"
              />
            </div>

            <button
              id="btn-formulate"
              disabled={isFormulating || !promptInput.trim()}
              onClick={() => handleConsult()}
              className="w-full bg-white hover:bg-gold-500 hover:text-black text-black border border-white py-3 px-4 font-mono text-xs tracking-widest uppercase transition-all flex items-center justify-center space-x-2 disabled:opacity-40"
            >
              {isFormulating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent animate-spin rounded-full" />
                  <span>FORMULATING OUTLINE...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="animate-pulse" />
                  <span>CONSULT ATELIER DESIGNER</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Briefing Portfolio Card */}
        <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
          <div className="border border-zinc-800 bg-zinc-950/20 flex-1 relative flex flex-col">
            {/* Header tag */}
            <div className="border-b border-zinc-800 p-4 flex items-center justify-between bg-black/40">
              <div className="flex items-center space-x-2">
                <Scissors size={14} className="text-gold-500" />
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                  ATELIER NOIR & OR // LA DIRECTRICE BRIEFING
                </span>
              </div>
              <div className="w-3 h-3 border border-zinc-800 flex items-center justify-center bg-black">
                <div className="w-1.5 h-1.5 bg-gold-500 animate-pulse" />
              </div>
            </div>

            {/* Content box */}
            <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[580px] font-sans text-sm leading-relaxed text-zinc-300">
              <AnimatePresence mode="wait">
                {isFormulating ? (
                  <motion.div
                    key="formulating-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20 space-y-4"
                  >
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 border border-zinc-800 animate-spin" style={{ animationDuration: '8s' }} />
                      <div className="absolute inset-2 border border-gold-500/20 animate-spin" style={{ animationDuration: '4s', animationDirection: 'reverse' }} />
                      <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <Scissors className="text-gold-500" size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-light text-white italic">Formulating Haute Couture</h4>
                      <p className="font-mono text-[10px] text-gold-500 mt-2 tracking-widest h-5 uppercase">
                        {formulationStep}
                      </p>
                    </div>
                  </motion.div>
                ) : briefingOutput ? (
                  <motion.div
                    key="briefing-present"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Actions panel */}
                    <div className="flex justify-end border-b border-zinc-900 pb-4 mb-4 gap-2">
                      <button
                        id="btn-save-cabinet"
                        onClick={saveToCabinet}
                        className={`text-[10px] font-mono py-1.5 px-3 flex items-center space-x-1 border tracking-wider transition-all uppercase ${
                          savedSuccess
                            ? 'bg-gold-500 text-black border-gold-500'
                            : 'bg-black text-zinc-300 border-zinc-800 hover:border-gold-500/50 hover:text-white'
                        }`}
                      >
                        {savedSuccess ? (
                          <>
                            <Check size={12} />
                            <span>SAVED TO CABINET</span>
                          </>
                        ) : (
                          <>
                            <Save size={12} />
                            <span>SAVE TO CABINET</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Styled Briefing Sheet */}
                    <div className="bg-black/80 border border-zinc-900 p-6 md:p-8 space-y-6 relative selection:bg-gold-500 selection:text-black">
                      {/* Stylized background lines */}
                      <div className="absolute top-0 left-12 w-[1px] h-full bg-zinc-950/40 pointer-events-none" />
                      <div className="absolute top-0 right-12 w-[1px] h-full bg-zinc-950/40 pointer-events-none" />
                      
                      {/* Document watermarks */}
                      <div className="flex justify-between items-center text-[8px] font-mono text-zinc-600 border-b border-zinc-900 pb-4">
                        <span>ORIGINAL BLUEPRINT // CLIENT CASSINONAGAMOTO</span>
                        <span>DATE DE CRÉATION: {new Date().toLocaleDateString('fr-FR')}</span>
                      </div>

                      {/* Display Markdown results beautifully */}
                      <div className="prose prose-invert prose-xs max-w-none space-y-6">
                        {briefingOutput.split('\n').map((line, idx) => {
                          if (line.startsWith('# ')) {
                            return (
                              <h3 key={idx} className="font-serif text-2xl font-light text-white tracking-wide border-b border-zinc-950 pb-2">
                                {line.replace('# ', '')}
                              </h3>
                            );
                          } else if (line.startsWith('## ')) {
                            return (
                              <h4 key={idx} className="font-serif text-md text-gold-500 uppercase tracking-widest mt-8 font-normal">
                                {line.replace('## ', '')}
                              </h4>
                            );
                          } else if (line.startsWith('- **')) {
                            const trimmed = line.replace('- ', '');
                            const splitIdx = trimmed.indexOf(':');
                            if (splitIdx !== -1) {
                              const label = trimmed.substring(0, splitIdx + 1);
                              const details = trimmed.substring(splitIdx + 1);
                              return (
                                <div key={idx} className="pl-4 border-l border-gold-500/20 py-0.5 text-xs text-zinc-300">
                                  <strong className="text-white font-mono uppercase tracking-wider text-[10px] block mb-1">
                                    {label.replace(/\*\*/g, '')}
                                  </strong>
                                  <span className="font-light leading-relaxed">{details}</span>
                                </div>
                              );
                            }
                          } else if (line.startsWith('- ')) {
                            return (
                              <li key={idx} className="list-disc list-inside text-zinc-400 text-xs font-light pl-2">
                                {line.replace('- ', '')}
                              </li>
                            );
                          } else if (line.trim().length > 0) {
                            return (
                              <p key={idx} className="text-zinc-300 font-sans text-xs leading-relaxed font-light">
                                {line}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>

                      <div className="border-t border-zinc-950 pt-6 mt-8 flex justify-between items-end text-[8px] font-mono text-zinc-600">
                        <div>
                          <p>ATELIER NOIR & OR PARIS HQ</p>
                          <p>12 RUE RUE ROYALE, 75008 PARIS</p>
                        </div>
                        <div className="text-right uppercase">
                          <p>MANUAL SIGNATURE REQUIRED</p>
                          <p className="text-gold-500 font-serif italic text-xs mt-1">La Directrice</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="briefing-empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center py-10 px-4 space-y-6"
                  >
                    <div className="relative group max-w-sm w-full border border-zinc-900 bg-black p-3 hover:border-gold-500/20 transition-all">
                      <div className="absolute top-2 left-2 text-[7px] font-mono text-gold-500 tracking-[0.2em] uppercase">SCHEMA // REF-010</div>
                      <div className="overflow-hidden aspect-[4/5] border border-zinc-950">
                        <img
                          src="/images/sketch.png"
                          alt="Bespoke Couture Sketch Design Pattern"
                          className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="mt-3 flex justify-between items-center text-[8px] font-mono text-zinc-500">
                        <span>LA SUITE DIGITAL PRINT</span>
                        <span>ATELIER HQ PARIS</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-serif text-[15px] text-zinc-300 font-light tracking-wide">No Portfolio Silhouette Formulated</h4>
                      <p className="font-sans text-[11px] text-zinc-650 max-w-xs mx-auto mt-2 font-mono uppercase tracking-wider text-zinc-500">
                        ENTER DESIGN DIRECTIVES TO DRAFT THE ARCHITECTURAL SCHEMATIC
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
