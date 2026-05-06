import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Award, CheckCircle2 } from 'lucide-react';

export type LegalType = 'terms' | 'privacy' | 'certifications';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: LegalType | null;
}

const CONTENT = {
  terms: {
    title: 'Terms of Service',
    icon: <FileText size={20} />,
    sections: [
      {
        heading: '1. General Statement',
        text: 'By accessing Lala Rohini Jewellers website, you agree to be bound by these terms. All products and prices displayed are subject to availability and market fluctuations.'
      },
      {
        heading: '2. Purchase & Payments',
        text: 'All transactions are processed in INR. We accept major credit cards, bank transfers, and verified digital wallets. For high-value transactions, PAN card verification is mandatory as per Govt. of India regulations.'
      },
      {
        heading: '3. Buyback Policy',
        text: 'We offer specialized buyback at 100% exchange value for gold weight. Diamond buyback is subject to evaluation and usually stands at 85% of prevailing market rates.'
      }
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    icon: <Shield size={20} />,
    sections: [
      {
        heading: '1. Data Collection',
        text: 'We collect only necessary information to process your orders and provide personalized consultations. This includes name, contact details, and preference data.'
      },
      {
        heading: '2. Security',
        text: 'Your sensitive information is encrypted using industry-standard SSL technology. We do not store your credit card details on our servers.'
      },
      {
        heading: '3. Third Parties',
        text: 'We never sell your data. Information is shared only with verified logistics partners for delivery purposes.'
      }
    ]
  },
  certifications: {
    title: 'Certifications & Trust',
    icon: <Award size={20} />,
    sections: [
      {
        heading: 'BIS Hallmarking',
        text: 'All our gold jewellery carries the BIS (Bureau of Indian Standards) hallmark. This certifies the purity of your gold (ex: 916 Hallmark for 22K).'
      },
      {
        heading: 'Diamond Certification',
        text: 'Our solitaires and diamond jewellery are certified by IGI, GIA, or HRD. Each certificate is verifiable online for authenticity.'
      },
      {
        heading: 'Conflict-Free Sourcing',
        text: 'We mandate that all our diamonds are sourced through providers who adhere to the Kimberley Process, ensuring they are conflict-free.'
      }
    ]
  }
};

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!type) return null;
  const data = CONTENT[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/95 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-brand-ivory px-8 py-6 border-b border-brand-black/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-gold/10 text-brand-gold rounded-lg">
                  {data.icon}
                </div>
                <h2 className="text-xl font-serif">{data.title}</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-brand-black/5 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-[70vh] overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {data.sections.map((section, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-gold mb-4 flex items-center gap-2">
                    <CheckCircle2 size={12} className="opacity-40" />
                    {section.heading}
                  </h3>
                  <p className="text-sm text-brand-black/60 leading-relaxed font-light">
                    {section.text}
                  </p>
                </div>
              ))}

              {type === 'certifications' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {['GIA', 'IGI', 'HRD', 'BIS', 'KIMBERLEY'].map((logo) => (
                    <div key={logo} className="h-16 border border-brand-black/5 flex items-center justify-center bg-brand-ivory/50 rounded-lg grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
                      <span className="text-[10px] font-bold tracking-widest text-brand-black/40">{logo} CERTIFIED</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-brand-ivory border-t border-brand-black/5 flex flex-col md:flex-row gap-4 items-center justify-between">
              <p className="text-[10px] text-brand-black/30 uppercase tracking-widest font-bold">
                Last Updated: May 2024
              </p>
              <button 
                onClick={onClose}
                className="btn-gold !py-2 !px-8 !text-[10px]"
              >
                Understood & Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
