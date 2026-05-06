import { motion } from 'motion/react';
import { MessageCircle, Calendar } from 'lucide-react';
import { useState } from 'react';
import BookingModal from './BookingModal';

interface BridalSectionProps {
  onOpenBooking: () => void;
}

export default function BridalSection({ onOpenBooking }: BridalSectionProps) {
  return (
    <section id="bridal" className="relative overflow-hidden bg-brand-black text-white py-24 md:py-32">
      
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <img 
          src="https://images.unsplash.com/photo-1601054704854-1a2e79dea4d3?auto=format&fit=crop&q=80&w=1200" 
          alt="Bridal Collection" 
          className="w-full h-full object-cover opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="accent-label text-brand-gold mb-8 block">The Bridal Couture</span>
            <h2 className="text-6xl md:text-[80px] heading-bold italic mb-10 text-white leading-tight">
              A Luminous <br /> Legacy
            </h2>
            <p className="text-brand-gray/70 text-lg font-light mb-12 leading-relaxed max-w-sm">
              Sacred traditions, regal harams, and meticulous craftsmanship for your most precious day.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <a href="https://wa.me/910000000000" className="btn-gold !px-12">
                WhatsApp Us
              </a>
              <button 
                onClick={onOpenBooking}
                className="glass-dark hover:bg-white/20 text-white !border-white/20 !px-12 flex gap-3 py-4 text-[10px] uppercase font-bold tracking-widest transition-all"
              >
                <Calendar size={18} />
                Book Consultation
              </button>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 text-white/40">
              <div>
                <p className="text-2xl font-serif text-white mb-2">100%</p>
                <p className="text-[10px] uppercase tracking-widest leading-loose">Exchange Value <br /> on gold purity</p>
              </div>
              <div>
                <p className="text-2xl font-serif text-white mb-2">Bespoke</p>
                <p className="text-[10px] uppercase tracking-widest leading-loose">Custom Jewelry <br /> Design Studio</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
