import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { ALL_PRODUCTS } from '../constants';

export default function TrendingNow() {
  const trendingProducts = ALL_PRODUCTS.filter(p => p.tag === 'Trending');
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="accent-label text-brand-gold mb-4 block">In High Demand</span>
            <h2 className="text-4xl md:text-5xl heading-bold italic mb-4">Trending Now</h2>
            <p className="text-brand-black/50 text-sm font-light">
              Pieces capturing the collective imagination of our patrons right now.
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={scrollPrev} className="p-3 border border-brand-black/10 rounded-full hover:border-brand-gold hover:text-brand-gold transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={scrollNext} className="p-3 border border-brand-black/10 rounded-full hover:border-brand-gold hover:text-brand-gold transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-8">
              {trendingProducts.map((product) => (
                <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative aspect-square bg-brand-ivory overflow-hidden mb-6 border-soft">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 animate-pulse">
                        <span className="bg-brand-gold text-white text-[8px] px-2 py-1 uppercase font-bold tracking-widest shadow-lg">
                          Trending
                        </span>
                      </div>
                      
                      <div className="absolute inset-0 bg-brand-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a 
                          href={`https://wa.me/910000000000?text=I'm interested in the trending ${product.name} piece.`}
                          className="btn-gold !py-3 !px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                        >
                          Enquire Now
                        </a>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-serif mb-1 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                    <p className="text-[10px] text-brand-black/40 uppercase tracking-widest font-bold mb-2">{product.metal} • {product.gemstone}</p>
                    <p className="text-sm font-bold text-brand-gold">{product.priceRange}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
