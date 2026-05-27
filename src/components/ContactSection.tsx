/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CornerDownRight, Check, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceRequested: 'Haute Couture Eveningwear',
    message: '',
    newsletterOptIn: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate luxury API transmit
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Clean after
      setFormData({
        name: '',
        email: '',
        serviceRequested: 'Haute Couture Eveningwear',
        message: '',
        newsletterOptIn: true
      });
      // Timeout success clear
      setTimeout(() => setIsSuccess(false), 8000);
    }, 1500);
  };

  const atelierLocations = [
    {
      city: "Paris Saint-Germain",
      address: "12 Rue Royale, 75008 Paris, France",
      phone: "+33 (0)1 44 23 89 00",
      hours: "Mon - Sat: 10:00 - 19:30 BY APPOINTMENT",
      staff: "Head Tailor: Aristide de Cassi"
    },
    {
      city: "Milano Quadrilatero",
      address: "Via Montenapoleone 8, 20121 Milano, Italy",
      phone: "+39 02 7600 1204",
      hours: "Mon - Sat: 10:00 - 19:00 BY APPOINTMENT",
      staff: "Atelier Director: Beatrice Rossi"
    },
    {
      city: "Tokyo Omotesando",
      address: "5-Chome Minami-Aoyama, Tokyo 107-0062, Japan",
      phone: "+81 (0)3 5778 1230",
      hours: "Tue - Sun: 11:00 - 20:00 BY APPOINTMENT",
      staff: "Master Fitter: Kenji Sato"
    }
  ];

  return (
    <div className="space-y-12 text-white">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-zinc-900 pb-5 gap-4">
        <div>
          <span className="font-mono text-[9px] text-gold-500 tracking-[0.3em] uppercase block">CONTACTS & BOOKINGS // NOUS REJOINDRE</span>
          <h2 className="font-serif text-3xl font-light tracking-wide mt-1">Direct Correspondence</h2>
        </div>
        <div className="font-mono text-[9.5px] text-zinc-500 text-left md:text-right max-w-xs uppercase tracking-wider">
          REGISTER YOUR TAILORING RESERVES DIRECTLY INTO OUR PRIVATE HAND-BASTED LEDGER
        </div>
      </div>

      {/* Hero Storefront Banner */}
      <div className="relative border border-zinc-900 bg-black overflow-hidden h-[180px] md:h-[260px] flex items-end p-6 md:p-10 group">
        <img
          src="/src/assets/images/atelier_facade_1779672135692.png"
          alt="Sleek black granite luxury fashion atelier boutique storefront glowing with soft gold light"
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-45 group-hover:grayscale-0 group-hover:opacity-85 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="font-mono text-[9px] text-gold-500 tracking-[0.25em] uppercase block">THE LAUNCHED VENUE</span>
          <h3 className="font-serif text-2xl md:text-3xl font-light text-white tracking-wide">
            12 Rue Royale, Saint-Germain Paris
          </h3>
          <p className="font-sans text-[11px] text-zinc-400 font-light max-w-xl">
            Our historical headquarters stands in the centerpiece of high-fashion crafts. Walk inside for your custom textile consultation and silhouette sketches.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left column: Locations & Hours */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-zinc-500 tracking-widest uppercase block border-b border-zinc-900 pb-2">
              STUDIO NETWORK
            </span>

            <div className="space-y-6">
              {atelierLocations.map((loc, index) => (
                <div key={index} className="border border-zinc-950 bg-black/25 p-4 space-y-3 hover:border-zinc-900 transition-all">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                    <span className="font-serif text-sm font-normal text-white">{loc.city}</span>
                    <span className="font-mono text-[7.5px] text-gold-500 border border-gold-500/20 px-1.5 uppercase">
                      OFFICE 0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px] text-zinc-450 font-sans font-light">
                    <div className="flex items-start space-x-2 text-zinc-400">
                      <MapPin size={11} className="text-gold-500 mt-0.5 shrink-0" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-400">
                      <Phone size={11} className="text-zinc-650 shrink-0" />
                      <span>{loc.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-450">
                      <Clock size={11} className="text-zinc-650 shrink-0" />
                      <span className="font-mono text-[10px]">{loc.hours}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-950 flex items-center space-x-1.5 text-[9px] font-mono text-zinc-500">
                    <CornerDownRight size={8} />
                    <span>{loc.staff}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-7 border border-zinc-900 bg-zinc-950/20 p-6 md:p-8 space-y-6 relative">
          <div className="absolute top-2 right-2 text-[7.5px] font-mono text-gold-500 tracking-widest uppercase">
            REGISTRY SECURE SEC-LEVEL // IV
          </div>

          <div className="border-b border-zinc-900 pb-3">
            <span className="font-mono text-[9px] text-zinc-500 block uppercase tracking-widest">SUBMIT INQUIRY SHEET</span>
            <h3 className="font-serif text-lg text-white font-light tracking-wide mt-1">Initiate Private Correspondence</h3>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="input-contact-name" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                    Your Full Name *
                  </label>
                  <input
                    id="input-contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jean-Luc Cassino"
                    className="w-full bg-black border border-zinc-900 focus:border-gold-500/50 p-3 text-xs text-white placeholder-zinc-700 outline-none transition-all font-sans"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="input-contact-email" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                    Email Address *
                  </label>
                  <input
                    id="input-contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. jeanluc@atelier.com"
                    className="w-full bg-black border border-zinc-900 focus:border-gold-500/50 p-3 text-xs text-white placeholder-zinc-700 outline-none transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="select-contact-service" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                  Category of Inquiry
                </label>
                <select
                  id="select-contact-service"
                  value={formData.serviceRequested}
                  onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                  className="w-full bg-black border border-zinc-900 focus:border-gold-500/50 p-3 text-xs text-white outline-none transition-all font-mono"
                >
                  <option value="Haute Couture Eveningwear">Haute Couture Eveningwear</option>
                  <option value="Bespoke Savile Row Tailoring">Bespoke Savile Row Tailoring</option>
                  <option value="Embroidery & Textile Art">Embroidery & Textile Art</option>
                  <option value="Special Bridal Atelier Project">Special Bridal Atelier Project</option>
                  <option value="Press & Collaborative Inquiry">Press & Collaborative Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="textarea-contact-msg" className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block">
                  Couture Concept & Fitting Request Notes *
                </label>
                <textarea
                  id="textarea-contact-msg"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail preferred deadlines, fitting venues (Paris, Milan, Tokyo), color profiles, or specific material notes..."
                  className="w-full bg-black border border-zinc-900 focus:border-gold-500/50 p-3 text-xs text-white placeholder-zinc-700 outline-none transition-all font-sans"
                />
              </div>

              {/* Secure data receipt checkbox */}
              <div className="flex items-start space-x-2.5 pt-2 select-none">
                <input
                  id="checkbox-privacy"
                  type="checkbox"
                  checked={formData.newsletterOptIn}
                  onChange={(e) => setFormData({ ...formData, newsletterOptIn: e.target.checked })}
                  className="mt-1 border border-zinc-900 bg-black cursor-pointer accent-gold-500"
                />
                <label htmlFor="checkbox-privacy" className="text-[9px] font-mono text-zinc-500 uppercase leading-snug tracking-wider">
                  I consent to encrypting my calibration sizing metrics inside the secure Atelier Ledger for future basted fittings.
                </label>
              </div>

              <button
                id="btn-submit-contact"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-zinc-950 border border-zinc-900 hover:border-gold-500/40 text-gold-500 hover:text-white hover:bg-black transition-all font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-ping" />
                    <span>Transmitting Ledger Record...</span>
                  </>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Securely Transmit Correspondence</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border border-dashed border-gold-500/30 bg-gold-500/5 p-8 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full border border-gold-500 flex items-center justify-center mx-auto text-gold-500">
                <Check size={20} />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[8px] text-zinc-500 uppercase block">CORRESPONDENCE REGISTERED</span>
                <h4 className="font-serif text-lg text-white">Transmission Successful</h4>
                <p className="font-sans text-xs text-zinc-450 max-w-sm mx-auto mt-2 leading-relaxed">
                  Thank you. Your couture inquiry has been securely stored in the Saint-Germain database. Our senior concierge or master tailor Aristide will contact you within 24 hours to schedule your sizing toile calibration.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-950 flex justify-center space-x-4 font-mono text-[9px] text-zinc-500 uppercase">
                <span className="flex items-center space-x-1">
                  <ShieldCheck size={10} className="text-gold-500" />
                  <span>LEDGER ENCRYPTED</span>
                </span>
                <span>•</span>
                <span>SEC ID: AT-INQ-{(Math.random() * 10000).toFixed(0)}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
