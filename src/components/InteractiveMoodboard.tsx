/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, Maximize2, RotateCw, Layers, Sparkles, PlusCircle, Save, Check } from 'lucide-react';
import { MoodboardAsset, SavedConcept } from '../types';
import { MOODBOARD_PRESETS } from '../data/atelierData';

interface InteractiveMoodboardProps {
  onSaveConcept: (concept: SavedConcept) => void;
}

export default function InteractiveMoodboard({ onSaveConcept }: InteractiveMoodboardProps) {
  const [assets, setAssets] = useState<MoodboardAsset[]>([]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customLabel, setCustomLabel] = useState('');
  const [conceptTitle, setConceptTitle] = useState('Etude No. I — Gilded Obsidian');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Focus and handle keyboard movements of selected assets for high precision
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;
      
      // Stop page scrolling if dragging is focused
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      setAssets((prev) =>
        prev.map((asset) => {
          if (asset.id !== selectedId) return asset;
          const step = e.shiftKey ? 15 : 5;
          switch (e.key) {
            case 'ArrowUp':
              return { ...asset, y: Math.max(0, asset.y - step) };
            case 'ArrowDown':
              return { ...asset, y: Math.min(450, asset.y + step) };
            case 'ArrowLeft':
              return { ...asset, x: Math.max(0, asset.x - step) };
            case 'ArrowRight':
              return { ...asset, x: Math.min(650, asset.x + step) };
            default:
              return asset;
          }
        })
      );
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId]);

  const handleAddPreset = (preset: { name: string; type: string; color?: string; src?: string }) => {
    const canvasWidth = canvasRef.current?.clientWidth || 600;
    const canvasHeight = canvasRef.current?.clientHeight || 450;
    
    const newAsset: MoodboardAsset = {
      id: 'as-' + Date.now(),
      name: preset.name,
      type: preset.type as any,
      x: Math.floor(Math.random() * (canvasWidth - 150) + 50),
      y: Math.floor(Math.random() * (canvasHeight - 150) + 50),
      scale: 1,
      rotation: Math.floor(Math.random() * 40 - 20),
      color: preset.color,
      src: preset.src,
      zIndex: assets.length + 1
    };

    setAssets([...assets, newAsset]);
    setSelectedId(newAsset.id);
  };

  const handleAddCustomLabel = () => {
    if (!customLabel.trim()) return;

    const newAsset: MoodboardAsset = {
      id: 'as-' + Date.now(),
      name: customLabel,
      type: 'text',
      x: 150,
      y: 180,
      scale: 1,
      rotation: 0,
      text: customLabel,
      zIndex: assets.length + 1
    };

    setAssets([...assets, newAsset]);
    setSelectedId(newAsset.id);
    setCustomLabel('');
  };

  const handleAdjustSelected = (type: 'scale-up' | 'scale-down' | 'rot-cw' | 'rot-ccw' | 'bring-forward' | 'send-backward') => {
    if (!selectedId) return;

    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id !== selectedId) return asset;
        
        switch (type) {
          case 'scale-up':
            return { ...asset, scale: Math.min(2.5, asset.scale + 0.1) };
          case 'scale-down':
            return { ...asset, scale: Math.max(0.5, asset.scale - 0.1) };
          case 'rot-cw':
            return { ...asset, rotation: (asset.rotation + 15) % 360 };
          case 'rot-ccw':
            return { ...asset, rotation: (asset.rotation - 15) % 360 };
          case 'bring-forward':
            return { ...asset, zIndex: asset.zIndex + 1 };
          case 'send-backward':
            return { ...asset, zIndex: Math.max(1, asset.zIndex - 1) };
          default:
            return asset;
        }
      })
    );
  };

  const handleDeleteSelected = () => {
    if (!selectedId) return;
    setAssets(assets.filter((as) => as.id !== selectedId));
    setSelectedId(null);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // If clicking directly on the canvas background, deselect
    if (e.target === e.currentTarget) {
      setSelectedId(null);
    }
  };

  const handleSaveConcept = () => {
    if (assets.length === 0) return;

    const newConcept: SavedConcept = {
      id: 'concept-' + Date.now(),
      title: conceptTitle || 'Bespoke Atelier Moodboard',
      createdAt: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      assets: [...assets]
    };

    onSaveConcept(newConcept);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="text-white space-y-12" style={{ width: '1041px', maxWidth: '100%', margin: '0 auto' }}>
      {/* Dynamic customized styling for central image wraps and hovers */}
      <style>{`
        .img-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 6px;
        }
        .img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: all 0.8s ease-out;
        }
        .img-wrap:hover img {
          transform: scale(1.05);
          filter: brightness(92%);
          box-shadow: 0 0 14px rgba(212,175,55,0.35);
        }
        @keyframes fade {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .img-wrap img {
          animation: fade 1.2s ease-out 0.2s both;
        }
      `}</style>
      {/* Header info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-6 space-y-4 md:space-y-0">
        <div>
          <span className="font-mono text-xs tracking-[0.2em] text-gold-500 uppercase">
            L'Espace Créatif
          </span>
          <h2 className="font-serif text-3xl font-light">Interactive Moodboard</h2>
          <p className="font-sans text-xs text-zinc-400 max-w-xl mt-2 font-light">
            Compose and draft structural look blocks. Bring materials, golden zippers, buttons, and custom silk ribbons to life on our digital workspace. Adjust weights, heights, and rotations.
          </p>
        </div>

        {/* Master save card */}
        <div className="flex items-center space-x-3">
          <input
            id="concept-title-input"
            type="text"
            value={conceptTitle}
            onChange={(e) => setConceptTitle(e.target.value)}
            className="bg-black border border-zinc-800 p-2 text-xs font-mono tracking-wider text-white focus:outline-none focus:border-gold-500 uppercase"
            placeholder="BOARD DESIGN TITLE"
          />
          <button
            id="btn-save-concept"
            onClick={handleSaveConcept}
            className={`font-mono text-xs uppercase tracking-widest py-2 px-4 border transition-all flex items-center space-x-2 ${
              saveSuccess
                ? 'bg-gold-500 text-black border-gold-500'
                : 'bg-white text-black hover:bg-gold-500 hover:border-gold-500 hover:text-black border-white'
            }`}
          >
            {saveSuccess ? (
              <>
                <Check size={14} />
                <span>SAVED TO CABINET</span>
              </>
            ) : (
              <>
                <Save size={14} />
                <span>SAVE CONCEPT</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Combined Presets Palette and Interactive Workspace Stage */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Sub-left Column: Input & Asset Presets */}
          <div className="md:col-span-4 space-y-6">
            {/* Swatches block */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase block border-b border-zinc-900 pb-2">
                LA PALETTE: PREMIUM FABRICS
              </span>
              <div className="grid grid-cols-1 gap-2">
                {MOODBOARD_PRESETS.fabrics.map((fabric) => (
                  <button
                    key={fabric.id}
                    id={`add-fabric-${fabric.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleAddPreset({ name: fabric.name, type: 'fabric', color: fabric.color, src: fabric.src })}
                    className="p-2 border border-zinc-900 bg-black hover:border-zinc-700 transition-all flex items-center justify-between text-left group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 block border border-zinc-800 bg-zinc-950 overflow-hidden relative">
                        {fabric.src ? (
                          <img
                            src={fabric.src}
                            alt={fabric.name}
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="absolute inset-0" style={{ backgroundColor: fabric.color }} />
                        )}
                      </span>
                      <div>
                        <span className="text-xs text-zinc-300 font-sans group-hover:text-white transition-colors">{fabric.name}</span>
                        <span className="text-[9px] font-mono text-zinc-600 block">{fabric.sampleName}</span>
                      </div>
                    </div>
                    <PlusCircle size={14} className="text-zinc-600 group-hover:text-gold-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Metal elements & accents */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-3">
              <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase block border-b border-zinc-900 pb-2">
                QUINCAILLERIE: ACCENTS & ACCS
              </span>
              <div className="grid grid-cols-2 gap-2">
                {MOODBOARD_PRESETS.hardware.map((item) => (
                  <button
                    key={item.id}
                    id={`add-hardware-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleAddPreset({ name: item.name, type: 'hardware', src: item.src })}
                    className="p-2 border border-zinc-900 bg-black hover:border-zinc-700 transition-all text-left flex items-center justify-between group"
                  >
                    <span className="text-[10px] text-zinc-400 group-hover:text-white truncate pr-2">{item.name}</span>
                    <span className="text-xs select-none shrink-0 w-6 h-6 border border-zinc-800 overflow-hidden bg-zinc-950 flex items-center justify-center font-mono">
                      {item.src && (item.src.startsWith('/') || item.src.startsWith('http')) ? (
                        <img src={item.src} alt={item.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                      ) : (
                        item.src
                      )}
                    </span>
                  </button>
                ))}
                {MOODBOARD_PRESETS.silhouettes.map((sil) => (
                  <button
                    key={sil.id}
                    id={`add-silhouette-${sil.name.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleAddPreset({ name: sil.name, type: 'silhouette', src: sil.src })}
                    className="p-2 border border-zinc-900 bg-black hover:border-zinc-700 transition-all text-left flex items-center justify-between group col-span-2"
                  >
                    <span className="text-[10px] text-zinc-300 group-hover:text-gold-500 font-sans truncate pr-2">{sil.name}</span>
                    <span className="text-xs select-none shrink-0 w-7 h-7 border border-zinc-800 overflow-hidden bg-zinc-950 flex items-center justify-center font-mono">
                      {sil.src && (sil.src.startsWith('/') || sil.src.startsWith('http')) ? (
                        <img src={sil.src} alt={sil.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                      ) : (
                        sil.src
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text annotations creator */}
            <div className="border border-zinc-900 bg-zinc-950/20 p-5 space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-gold-500 uppercase block border-b border-zinc-900 pb-2">
                ANNOTATIONS & TEXT LABELS
              </span>
              <div className="flex space-x-2">
                <input
                  id="moodboard-custom-label-input"
                  type="text"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  placeholder="E.g., Dusk Draped Arch"
                  className="flex-1 bg-black border border-zinc-800 p-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
                <button
                  id="btn-add-label"
                  onClick={handleAddCustomLabel}
                  className="bg-zinc-900 border border-zinc-800 hover:border-white px-3 text-xs font-mono uppercase transition-colors"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>

          {/* Sub-right Column: Creative Canvas Workspace */}
          <div className="md:col-span-8 flex flex-col h-full relative">

            {/* Interactive Workspace Stage Canvas */}
            <div
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="w-full h-full min-h-[480px] border border-zinc-805 bg-black relative overflow-hidden flex items-center justify-center cursor-default select-none flex-1"
              style={{
                backgroundImage: 'radial-gradient(#1c1c1a 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            >
              {/* Central Model Figure Reference Underlay */}
              <div className="absolute inset-0 pointer-events-auto overflow-hidden select-none bg-zinc-950/20 img-wrap z-0">
                <img
                  src="/images/look15.jpg"
                  alt="Atelier Study Model Reference Frame"
                  referrerPolicy="no-referrer"
                  style={{ height: '1035.5px', paddingBottom: '-2px', marginLeft: '-2px', marginTop: '10px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-[7px] text-zinc-300 uppercase tracking-widest flex items-center gap-1.5 bg-black/75 px-2 py-1 border border-zinc-800 backdrop-blur-md pointer-events-none z-10">
                  <span className="w-1 h-1 bg-gold-500 rounded-full animate-pulse" />
                  MODEL_PROJECTION // STUDIO_A
                </div>
              </div>

              {/* Center guidelines grid */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                <div className="w-[1px] h-full bg-gold-500 border-l border-dashed" />
                <div className="h-[1px] w-full bg-gold-500 border-t border-dashed" />
              </div>

              {/* Empty workspace helper removed by user request */}

              {/* Dynamic Placed Assets */}
              {assets.map((asset) => {
                const isSelected = selectedId === asset.id;
                
                const baseStyle = {
                  transform: `translate(${asset.x}px, ${asset.y}px) scale(${asset.scale}) rotate(${asset.rotation}deg)`,
                  zIndex: asset.zIndex,
                  transition: 'transform 0.15s ease-out'
                };

                // Asset rendering choices
                return (
                  <div
                    key={asset.id}
                    id={`board-asset-${asset.id}`}
                    style={baseStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(asset.id);
                    }}
                    className={`absolute top-0 left-0 cursor-move group select-none ${
                      isSelected ? 'outline-[1px] outline outline-gold-500 outline-offset-2' : 'hover:outline hover:outline-zinc-800'
                    }`}
                  >
                    {/* Fabric item: elegant color tile */}
                    {asset.type === 'fabric' && (
                      <div className="w-24 h-24 border border-zinc-855 shadow-2xl relative bg-zinc-950 group overflow-hidden">
                        {asset.src ? (
                          <img
                            src={asset.src}
                            alt={asset.name}
                            className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="absolute inset-0" style={{ backgroundColor: asset.color }} />
                        )}
                        <div className="absolute bottom-1 right-1 bg-black/95 py-0.5 px-1.5 border border-zinc-900/80 text-[6.5px] text-zinc-400 font-mono scale-90 uppercase">
                          {asset.name.split(' ')[0]}
                        </div>
                      </div>
                    )}

                    {/* Icon/Silhouette/Hardware item: image OR emoji represented beautiful visual overlay */}
                    {(asset.type === 'silhouette' || asset.type === 'hardware') && (
                      <div className="w-24 h-24 border border-zinc-900 bg-zinc-950/95 flex items-center justify-center relative shadow-xl overflow-hidden group">
                        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white to-gold-500" />
                        {asset.src && (asset.src.startsWith('/') || asset.src.startsWith('http')) ? (
                          <img
                            src={asset.src}
                            alt={asset.name}
                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-3xl select-none">{asset.src}</span>
                        )}
                        <div className="absolute bottom-0.5 left-0.5 right-0.5 bg-black/95 py-0.5 px-1 border border-zinc-900/40 text-[6px] text-zinc-500 text-center truncate scale-95 uppercase font-mono">
                          {asset.name}
                        </div>
                      </div>
                    )}

                    {/* Custom Text/Tag item */}
                    {asset.type === 'text' && (
                      <div className="bg-black border border-gold-500/40 py-1.5 px-3 text-[10px] font-mono uppercase text-gold-500 whitespace-nowrap shadow-md">
                        <span># {asset.text}</span>
                      </div>
                    )}

                    {/* Overlay small drag dot if selected */}
                    {isSelected && (
                      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-gold-500 border border-black animate-ping" />
                    )}
                  </div>
                );
              })}

              {/* Floating Active Asset Controls Overlay */}
              {selectedId && (
                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="absolute top-3 left-3 right-3 z-30 border border-gold-500/30 bg-black/95 p-2 flex flex-wrap items-center justify-between text-[10px] font-mono tracking-wider gap-3 backdrop-blur-md"
                >
                  <span className="text-gold-500 uppercase font-semibold">
                    ACTIVE: {assets.find(a => a.id === selectedId)?.name}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <button
                      id="btn-scale-down"
                      onClick={() => handleAdjustSelected('scale-down')}
                      className="p-1 px-2 border border-zinc-800 hover:border-gold-500 bg-zinc-950 text-white transition-all uppercase text-[9px]"
                      title="Scale down"
                    >
                      - Size
                    </button>
                    <button
                      id="btn-scale-up"
                      onClick={() => handleAdjustSelected('scale-up')}
                      className="p-1 px-2 border border-zinc-800 hover:border-gold-500 bg-zinc-950 text-white transition-all uppercase text-[9px]"
                      title="Scale up"
                    >
                      + Size
                    </button>
                    <div className="w-[1px] h-3 bg-zinc-800 self-center" />
                    <button
                      id="btn-rotate-cw"
                      onClick={() => handleAdjustSelected('rot-cw')}
                      className="p-1 px-1.5 border border-zinc-800 hover:border-gold-500 bg-zinc-950 text-zinc-300 hover:text-white flex items-center space-x-1 text-[9px]"
                      title="Rotate clockwise"
                    >
                      <RotateCw size={10} />
                      <span>+15°</span>
                    </button>
                    <div className="w-[1px] h-3 bg-zinc-800" />
                    <button
                      id="btn-layer-up"
                      onClick={() => handleAdjustSelected('bring-forward')}
                      className="p-1 px-1.5 border border-zinc-800 hover:border-gold-500 bg-zinc-950 text-zinc-300 hover:text-white flex items-center space-x-1 text-[9px]"
                      title="Layer up"
                    >
                      <Layers size={10} />
                      <span>LAYER+</span>
                    </button>
                    <div className="w-[1px] h-3 bg-zinc-800" />
                    <button
                      id="btn-delete-asset"
                      onClick={handleDeleteSelected}
                      className="p-1 px-1.5 border border-zinc-800 hover:border-red-500 bg-zinc-950 text-red-500 flex items-center space-x-1 text-[9px]"
                      title="Remove asset"
                    >
                      <Trash2 size={10} />
                      <span>DEL</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Pinned Helper Instructions Overlay */}
              {!selectedId && (
                <div className="absolute bottom-3 left-3 right-3 z-30 pointer-events-none">
                  <div className="mx-auto max-w-sm bg-black/85 border border-zinc-900 px-3 py-1.5 text-zinc-400 text-[8.5px] font-mono tracking-widest text-center uppercase backdrop-blur-sm">
                    *Select assets to drag, scale, rotate layers, or double-tap to adjust.
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* Right Side Column: Beautiful Enlarged Inspiration Gallery arranged sequentially, bottom aligned exactly */}
        <div className="lg:col-span-3 grid grid-cols-1 grid-rows-4 gap-4">
          
          {/* Inspiration Card 1: Couture Sketch */}
          <div className="relative border border-zinc-900 bg-zinc-950 overflow-hidden group flex flex-col justify-end p-3 shadow-lg hover:border-zinc-700 transition-all duration-300">
            <img
              src="/images/sketch.png"
              alt="Couture Outline Sketch"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />
            <div className="relative z-10 flex justify-between items-end text-[8px] font-mono text-zinc-400">
              <div className="text-left font-serif text-[11px] text-white tracking-wide block leading-none">
                Esthétique Noire
                <span className="block font-mono text-[8px] text-zinc-500 mt-1 uppercase tracking-tight">SILHOUETTE SKETCH / ARCHIVE</span>
              </div>
              <span className="text-gold-500 font-semibold">// REV-003</span>
            </div>
          </div>

          {/* Inspiration Card 2: Champagne satin gold silk */}
          <div className="relative border border-zinc-900 bg-zinc-950 overflow-hidden group flex flex-col justify-end p-3 shadow-lg hover:border-zinc-700 transition-all duration-300">
            <img
              src="/images/satin.png"
              alt="Champagne Satin Fabric Detail"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />
            <div className="relative z-10 flex justify-between items-end text-[8px] font-mono text-zinc-400">
              <div className="text-left font-serif text-[11px] text-white tracking-wide block leading-none">
                Champagne Draping
                <span className="block font-mono text-[8px] text-zinc-500 mt-1 uppercase tracking-tight">LUXURY LIQUID GLOW</span>
              </div>
              <span className="text-gold-500 font-semibold">// TEX-GOLD</span>
            </div>
          </div>

          {/* Inspiration Card 3: Structured Jacket peak lapel couture sketch */}
          <div className="relative border border-zinc-900 bg-zinc-950 overflow-hidden group flex flex-col justify-end p-3 shadow-lg hover:border-zinc-700 transition-all duration-300">
            <img
              src="/images/jacket.png"
              alt="Structured Jacket Peak Lapel"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />
            <div className="relative z-10 flex justify-between items-end text-[8px] font-mono text-zinc-400">
              <div className="text-left font-serif text-[11px] text-white tracking-wide block leading-none">
                Structured Lapel
                <span className="block font-mono text-[8px] text-zinc-500 mt-1 uppercase tracking-tight">HÉLÈNE DESIGN SHIFT</span>
              </div>
              <span className="text-gold-500 font-semibold">// DRAW-JK9</span>
            </div>
          </div>

          {/* Inspiration Card 4: Curated bespoke forged gold button */}
          <div className="relative border border-zinc-900 bg-zinc-950 overflow-hidden group flex flex-col justify-end p-3 shadow-lg hover:border-zinc-700 transition-all duration-300">
            <img
              src="/images/button.png"
              alt="Forged Gold Designer Button"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />
            <div className="relative z-10 flex justify-between items-end text-[8px] font-mono text-zinc-400">
              <div className="text-left font-serif text-[11px] text-white tracking-wide block leading-none">
                L'Or Forge Button
                <span className="block font-mono text-[8px] text-zinc-500 mt-1 uppercase tracking-tight">18K CALIGRAPHIC ORNAMENT</span>
              </div>
              <span className="text-gold-500 font-semibold">// ACC-GILD</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
