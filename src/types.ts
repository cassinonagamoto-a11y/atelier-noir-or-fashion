/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MoodboardAsset {
  id: string;
  name: string;
  type: 'image' | 'fabric' | 'hardware' | 'silhouette' | 'text';
  x: number;
  y: number;
  scale: number;
  rotation: number;
  src?: string;
  color?: string;
  text?: string;
  zIndex: number;
}

export type CoutureCategory = 'Eveningwear' | 'Tailoring' | 'L’Accessoire' | 'Bespoke Bridal';

export interface BespokeService {
  id: string;
  title: string;
  category: CoutureCategory;
  duration: string;
  description: string;
  priceEstimate: string;
}

export interface MeasurementSuite {
  height: number;      // 150 - 210 cm
  neck: number;        // 30 - 50 cm
  bust: number;        // 70 - 130 cm
  waist: number;       // 55 - 120 cm
  hips: number;        // 80 - 140 cm
  shoulder: number;    // 35 - 55 cm
  sleeve: number;      // 50 - 75 cm
  inseam: number;      // 60 - 95 cm
}

export interface BespokeBooking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientName: string;
  clientEmail: string;
  clientNote?: string;
  date: string;
  timeSlot: string;
  measurements: MeasurementSuite;
  atelierCode: string; // Unique ticket code e.g., AT-2026-X839
  timestamp: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  tag: string;
  colSpan: string; // Tailwind grid layout details
  description: string;
}

export interface SavedConcept {
  id: string;
  title: string;
  description?: string;
  assets: MoodboardAsset[];
  createdAt: string;
}

export interface Base64ImageResponse {
  imageUrl: string;
  textFeedback?: string;
}
