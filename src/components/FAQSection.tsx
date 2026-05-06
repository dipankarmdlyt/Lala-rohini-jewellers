import React from 'react';
import { motion } from 'motion/react';
import Accordion from './Accordion';
import { ShieldCheck, RefreshCw, Truck, Award } from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: 'certification',
    title: 'How do I verify the authenticity of my purchase?',
    content: (
      <p>
        Every piece of gold jewellery from Lala Rohini is BIS Hallmarked, ensuring the purity and fineness of the metal. Our diamonds are certified by world-recognized laboratories like GIA, IGI, or HRD, accompanied by a physical certificate and a unique laser-inscription on the girdle where applicable.
      </p>
    )
  },
  {
    id: 'buyback',
    title: 'What is your Buyback and Exchange policy?',
    content: (
      <p>
        We offer a 100% exchange value on our hallmarked gold jewels (weight to weight) and 90% liquidity value on invoice before taxes. For diamonds, we offer an 85% buyback and 95% exchange value based on the current market rates. Terms apply for customized or damaged pieces.
      </p>
    )
  },
  {
    id: 'shipping',
    title: 'Is it safe to order luxury jewellery online?',
    content: (
      <p>
        Absolutely. All online orders are dispatched via secured, tamper-proof logistics partners and are fully insured by Lala Rohini until they reach your doorstep. We also require a government-issued ID proof and OTP verification for delivery validation.
      </p>
    )
  },
  {
    id: 'custom',
    title: 'Can I request custom designs or modifications?',
    content: (
      <p>
        Yes, our master artisans specialize in bespoke creations. You can schedule a virtual consultation with our design studio to transform your heritage inspirations into a unique reality. Custom orders typically take 3-6 weeks depending on complexity.
      </p>
    )
  }
];

export default function FAQSection() {
  return (
    <section className="section-padding bg-brand-ivory border-t border-brand-black/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="accent-label text-brand-gold mb-4 block">Assurance & Support</span>
            <h2 className="text-4xl md:text-5xl heading-bold italic mb-8">Patron Trust Charter</h2>
            <p className="text-brand-black/50 text-sm font-light mb-12 max-w-md">
              Generations have trusted Lala Rohini for our uncompromising standards in metal purity, gemstone certification, and ethical sourcing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[
                { icon: ShieldCheck, title: "100% Certified", desc: "GIA & IGI certifications" },
                { icon: RefreshCw, title: "Lifetime Buyback", desc: "Transparent valuations" },
                { icon: Truck, title: "Insured Shipping", desc: "Doorstep secure delivery" },
                { icon: Award, title: "Purity Assured", desc: "BIS Hallmarked 22K Gold" }
              ].map((item, idx) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4"
                >
                  <item.icon className="text-brand-gold shrink-0" size={24} />
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">{item.title}</h4>
                    <p className="text-[10px] text-brand-black/40">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Accordion side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/50 backdrop-blur-sm p-8 md:p-12 border border-white rounded-2xl shadow-sm"
          >
            <Accordion items={FAQ_ITEMS} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
