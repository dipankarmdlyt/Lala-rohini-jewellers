import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Mail, User, Info, X } from 'lucide-react';

export default function DemoToast() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay for premium feel
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    // Auto-dismiss after 10 seconds (gives plenty of time to read)
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
    }, 10800); 

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-8 left-0 right-0 z-[9999] flex justify-center px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{ 
              type: "spring", 
              damping: 18, 
              stiffness: 120,
              delay: 0.2
            }}
            className="pointer-events-auto max-w-xl w-full bg-brand-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden relative"
          >
            {/* Gold Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            <div className="flex gap-5">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                  <Info size={24} />
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="space-y-1">
                  <h4 className="text-white font-medium text-xs uppercase tracking-[0.2em]">
                    Demonstration Environment
                  </h4>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    This interface represents a curated preview of a production-grade digital experience. Engineered by DreamStack Labs.
                  </p>
                </div>
                
                <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10px]">
                    <User size={12} className="text-brand-gold/70" />
                    <span className="text-gray-400">Lead Developer:</span>
                    <span className="text-white font-medium">Dipankar Mandal</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 pt-1">
                    <a 
                      href="mailto:dreamstackhq@gmail.com" 
                      className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-brand-gold transition-colors"
                    >
                      <Mail size={12} />
                      dreamstackhq@gmail.com
                    </a>
                    <a 
                      href="https://www.dreamstack.site" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[10px] text-gray-400 hover:text-brand-gold transition-colors"
                    >
                      <ExternalLink size={12} />
                      dreamstack.site
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
