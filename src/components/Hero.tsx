import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1573408302185-9127ff5f6070?auto=format&fit=crop&q=80&w=2000",
    label: "Since 1985 — The Legacy of Gold",
    title: "The Heart of Every Celebration",
    cta: "Explore Collection",
    link: "#catalog"
  },
  {
    image: "https://images.unsplash.com/photo-1599643477193-a3a71059ef8d?auto=format&fit=crop&q=80&w=2000",
    label: "Diamond Excellence",
    title: "Certified Brilliance and Clarity",
    cta: "View Diamonds",
    link: "#catalog"
  },
  {
    image: "https://images.unsplash.com/photo-1602143352538-3498877ca057?auto=format&fit=crop&q=80&w=2000",
    label: "The Bridal Masterpiece",
    title: "Timeless Jewels For Your Big Day",
    cta: "Bridal Special",
    link: "#bridal"
  }
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="home" className="relative h-screen overflow-hidden bg-brand-black">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <motion.img 
                  animate={{ scale: index === selectedIndex ? 1.05 : 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/40 to-transparent" />
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="accent-label text-brand-gold mb-6"
                      >
                        {slide.label}
                      </motion.p>
                      
                      <h1 className="text-6xl md:text-8xl lg:text-[110px] heading-bold italic text-white mb-10 leading-[0.9]">
                        {slide.title}
                      </h1>
                      
                      <div className="flex flex-col sm:flex-row gap-6 mt-12">
                        <a href={slide.link} className="btn-gold !px-12">
                          {slide.cta}
                        </a>
                        <a href="#bridal" className="btn-outline !border-white/30 text-white hover:!bg-white/10 !px-12">
                          Book Appointment
                        </a>
                      </div>
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
