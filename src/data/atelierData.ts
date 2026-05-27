/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LookbookItem, BespokeService } from '../types';

export const LOOKBOOK_COLLECTION: LookbookItem[] = [
  {
    id: 'lb-1',
    title: 'L’Ombre Silencieuse',
    subtitle: 'Collection No. I — Look 04',
    imageUrl: '/images/Look1.jpg',
    tag: 'HAUTE COUTURE',
    colSpan: 'md:col-span-8',
    description: 'A sculptural coat-dress of 【Haute Couture】 caliber, masterfully hand-basted in our exclusive 【Double-Spun Wool-Crepe】. Towering right-angle shoulders balance the architectural 【Hourglass Silhouette】, while internal helical 【Corset Armatures】 bestow an absolute, uncompromising 【Sculptured Structure】. Completed with rare, hand-finished 【Cold-Forged Gold Buttons】 and hand-sewn buttonholes in pure silk thread, showcasing pristine 【Structural Tailoring】.'
  },
  {
    id: 'lb-2',
    title: 'La Graine d’Or',
    subtitle: 'Collection No. I — Look 12',
    imageUrl: '/images/Look4.jpg',
    tag: 'SOIRÉE BESPOKE',
    colSpan: 'md:col-span-4',
    description: 'A high-tension 【Bespoke Evening Gown】 featuring an asymmetric column profile in liquid-light 【Double-Satin Silk】. Adorning the spine is a magnificent, 120-hour 【Hand-Sewn Embroidery】 pattern of cascading wheat laurels, where 【Gilded Filigree Thread】 and rich 【Champagne Satin】 merge. The side hem is sculpted three-dimensionally, capturing elegant kinetic movement via fluid 【Three-Dimensional Draping】.'
  },
  {
    id: 'lb-3',
    title: 'Le Minimalisme Linéaire',
    subtitle: 'Atelier Workwear Series',
    imageUrl: '/images/Look3.jpg',
    tag: 'PRÊT-À-PORTER',
    colSpan: 'md:col-span-4',
    description: 'An avant-garde asymmetrical double-breasted tuxedo set. Crafted in high-gauge 【Double-Spun Wool-Crepe】 for a crisp, armored drape. The sharp peak lapels are dynamically paneled with precious 【Champagne Satin】, basted using traditional French hand-pad techniques. Its meticulous 【Structural Tailoring】 yields smooth, contoured shoulder-sleeve connections that speak of quiet, cold luxury.'
  },
  {
    id: 'lb-4',
    title: 'Les Vagues de Soie',
    subtitle: 'Textile Study No. 09',
    imageUrl: '/images/Look2.jpg',
    tag: 'MATÉRIELS D’ATELIER',
    colSpan: 'md:col-span-8',
    description: 'A masterful study of fabric behavior: an bias-cut draped skirt combining heavy 【Double-Satin Silk】 and direct-to-mannequin draping. By harnessing physical gravity, it creates a breathtakingly fluid 【Luminous Drape】. Micro-pleats are pinned directly by hand through 【Three-Dimensional Draping】 to shimmer with subtle 【Gilded Filigree Thread】 undertones as they catch movement, acting as a wearable liquid sculpture.'
  }
];

export const BESPOKE_SERVICES: BespokeService[] = [
  {
    id: 'srv-1',
    title: 'Haute Couture Eveningwear',
    category: 'Eveningwear',
    duration: '180 minutes',
    description: 'Exclusive 【Haute Couture】 eveningwear and architectural ballgown creations. Includes private 【Three-Dimensional Draping】 and muslin pattern draft calibration. Hand-selected from elite European archives, we pair heavy 【Double-Satin Silk】 with 【Gilded Filigree Thread】 brocades and kinetic 【Fluid Draping】 to execute a distinct, customized 【Sculptured Structure】 for state banquets and galas.',
    priceEstimate: 'Estimate starts at €3,400'
  },
  {
    id: 'srv-2',
    title: 'Bespoke Savile Row Tailoring',
    category: 'Tailoring',
    duration: '120 minutes',
    description: 'Heritage suit and tuxedo styling crafted with Savile Row level 【Structural Tailoring】. Built with a traditional full hand-basted canvas interior to preserve and shape an exquisite 【Hourglass Silhouette】. Tailored with high-gauge 【Double-Spun Wool-Crepe】 or brushed cashmere, complete with silk-braided edges and custom 【Cold-Forged Gold Buttons】 to define refined luxury.',
    priceEstimate: 'Estimate starts at €2,800'
  },
  {
    id: 'srv-3',
    title: 'The Gilded Embroidery Consultation',
    category: 'L’Accessoire',
    duration: '90 minutes',
    description: 'An immersive session with our chief master of embroidery to develop customized 【Embroidery Artistry】 configurations. Discuss heavy thread-laying, metal mesh integrations, and classic 【Gilded Filigree Thread】 geometry over rich 【Champagne Satin】 or velvet, designing gorgeous, heirloom-quality 【Artisanal Details】 tailored to your attire.',
    priceEstimate: 'Consultation Fee €450'
  },
  {
    id: 'srv-4',
    title: 'Atmospheric Bridal Atelier',
    category: 'Bespoke Bridal',
    duration: '240 minutes',
    description: 'The ultimate bespoke bridal journey culminating in a magnificent 【Haute Couture Handcrafted】 wedding gown. Includes private fitting consultations, exclusive fabric archives like heavy 【Double-Satin Silk】, masterfully draped lace, and internal 【Corset Armatures】 to secure a timeless posture and a fluid, breathless 【Luminous Drape】.',
    priceEstimate: 'Estimate starts at €6,000'
  }
];

// Presets for the Interactive Moodboard Creator Canvas
export const MOODBOARD_PRESETS = {
  fabrics: [
    { id: 'pres-f1', name: 'Noir Silk Velvet', color: '#111011', type: 'fabric', sampleName: 'SV-NOIR', src: '/images/fabric.png' },
    { id: 'pres-f2', name: 'Champagne Satin', color: '#eae1cc', type: 'fabric', sampleName: 'SA-GOLD', src: '/images/satin.png' },
    { id: 'pres-f3', name: 'Midnight Brocade', color: '#1c1c1a', type: 'fabric', sampleName: 'BC-DARK', src: '/images/cabinet.png' },
    { id: 'pres-f4', name: 'Gilded Bouclé', color: '#d8c4ab', type: 'fabric', sampleName: 'BQ-GILD', src: '/images/blueprint.png' },
    { id: 'pres-f5', name: 'Raw Obsidian Leather', color: '#070707', type: 'fabric', sampleName: 'LT-OBSD', src: '/images/facade.png' }
  ],
  hardware: [
    { id: 'pres-h1', name: 'Forged Gold Button', src: '/images/button.png', type: 'hardware' },
    { id: 'pres-h2', name: 'Fine Gold Zipper slider', src: '⛓️', type: 'hardware' },
    { id: 'pres-h3', name: 'Satin Brass Clasp', src: '🔒', type: 'hardware' },
    { id: 'pres-h4', name: 'Atelier Scissors', src: '/images/blueprint.png', type: 'hardware' },
    { id: 'pres-h5', name: 'Golden Measuring Guide', src: '📏', type: 'hardware' }
  ],
  silhouettes: [
    { id: 'pres-s1', name: 'A-Line Column Silhouette', src: '/images/sketch.png', type: 'silhouette' },
    { id: 'pres-s2', name: 'Structured Peak Lapel Jacket', src: '/images/jacket.png', type: 'silhouette' },
    { id: 'pres-s3', name: 'Atmospheric Workroom View', src: '/images/cabinet.png', type: 'silhouette' },
    { id: 'pres-s4', name: 'Leather bound Journal Drawing', src: '/images/journal.png', type: 'silhouette' }
  ]
};
