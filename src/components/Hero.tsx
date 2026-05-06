import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSound } from '../context/SoundContext';

interface HeroProps {
  onExplore?: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const { t } = useTranslation();
  
  const SLIDES = [
    {
      image: "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=2000",
      label: t('hero.label1'),
      title: t('hero.title1'),
      cta: t('hero.cta'),
      link: "#catalog"
    },
    {
      image: "https://images.unsplash.com/photo-1611085583191-a3b1a308c021?auto=format&fit=crop&q=80&w=2000",
      label: t('hero.label2'),
      title: t('hero.title2'),
      cta: t('hero.cta'),
      link: "#catalog"
    },
    {
      image: "https://images.unsplash.com/photo-1591115765373-520b7a21769b?auto=format&fit=crop&q=80&w=2000",
      label: t('hero.label3'),
      title: t('hero.title3'),
      cta: t('hero.cta'),
      link: "#catalog"
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const { playSound } = useSound();

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playSound('click');
    onExplore?.();
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-brand-black">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
              {/* Background Image with Cinematic Parallax & Animated Mesh */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: index === selectedIndex ? 1.1 : 1.2,
                    x: index === selectedIndex ? "0%" : "2%",
                  }}
                  transition={{ 
                    scale: { duration: 12, ease: "linear" },
                    x: { duration: 1.5, ease: [0.33, 1, 0.68, 1] }
                  }}
                  className="absolute inset-0"
                >
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Animated Gradient Mesh Overlay */}
                <motion.div 
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
                      "radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)",
                      "radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)"
                    ]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 pointer-events-none"
                />

                {/* Global Scene Light */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />

                {/* Enhanced Gradient Overlay for readability and luxury feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/30 to-transparent" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center w-full">
                <AnimatePresence mode="wait">
                  {index === selectedIndex && (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                      className="max-w-4xl text-white"
                    >
                      <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="accent-label text-brand-gold mb-6 text-shadow-sm"
                      >
                        {slide.label}
                      </motion.p>
                      
                      <motion.h1 
                        initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: [0.33, 1, 0.68, 1] }}
                        className="text-6xl md:text-8xl lg:text-[100px] heading-bold italic text-white mb-10 leading-[0.9] drop-shadow-2xl"
                      >
                        {slide.title}
                      </motion.h1>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 mt-12"
                      >
                        <a 
                          href={slide.link} 
                          onClick={handleExploreClick}
                          className="btn-gold !px-12 shadow-xl hover:scale-105 transition-transform"
                        >
                          {slide.cta}
                        </a>
                        <a 
                          href="#bridal" 
                          onClick={() => playSound('click')}
                          className="btn-outline !border-white/30 text-white hover:!bg-white/10 !px-12 backdrop-blur-sm"
                        >
                          Book Appointment
                        </a>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-6 right-6 lg:left-navbar-offset z-20 max-w-7xl mx-auto flex justify-between items-end">
        <div className="flex gap-4">
          {SLIDES.map((_, i) => (
            <button 
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-0.5 transition-all duration-500 ${i === selectedIndex ? 'w-12 bg-brand-gold' : 'w-6 bg-white/20'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
        {/* Decorative vertical line */}
        <div className="hidden lg:flex flex-col items-center gap-8 mix-blend-difference text-white/50">
          <span className="[writing-mode:vertical-lr] uppercase tracking-[0.8em] text-[10px]">Scroll to Discover</span>
          <div className="w-px h-24 bg-white/30" />
        </div>
      </div>
      
      {/* Arrows */}
      <div className="absolute inset-y-0 left-6 right-6 flex items-center justify-between pointer-events-none">
        <button 
          onClick={() => emblaApi?.scrollPrev()} 
          className="p-4 rounded-full glass text-white/40 hover:text-brand-gold transition-all pointer-events-auto opacity-0 lg:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => emblaApi?.scrollNext()} 
          className="p-4 rounded-full glass text-white/40 hover:text-brand-gold transition-all pointer-events-auto opacity-0 lg:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
