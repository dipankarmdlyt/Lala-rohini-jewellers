import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Collector",
    text: "The craftsmanship of the Heritage Choker I acquired is simply unmatched. It's not just jewellery; it's a piece of art that tells a story of our traditions.",
    rating: 5,
    location: "Mumbai"
  },
  {
    id: 2,
    name: "Vikram Malhotra",
    role: "Groom",
    text: "Lala Rohini Studio made our wedding prep seamless. The virtual try-on helped us decide on the wedding bands with complete confidence. Highly recommended!",
    rating: 5,
    location: "Delhi"
  },
  {
    id: 3,
    name: "Priya Varma",
    role: "Entrepreneur",
    text: "I appreciate the transparency in their market rate ticker and the hallmark certifications. It builds a level of trust that is rare in the industry today.",
    rating: 5,
    location: "Bangalore"
  }
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    align: 'center'
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="section-padding bg-brand-black text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="accent-label text-brand-gold mb-4 block">Kind Words</span>
          <h2 className="text-4xl md:text-5xl heading-bold italic mb-6">Patron Memories</h2>
          <div className="w-24 h-px bg-brand-gold/30 mx-auto" />
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 px-4">
                  <div className="h-full glass-dark p-8 md:p-12 border border-white/5 relative group hover:border-brand-gold/30 transition-all duration-500">
                    <Quote className="absolute top-8 right-8 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors" size={40} />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-brand-gold text-brand-gold" />
                      ))}
                    </div>

                    <p className="text-lg font-light leading-relaxed mb-8 italic text-white/80">
                      "{testimonial.text}"
                    </p>

                    <div>
                      <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">
                        {testimonial.role} • {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6 mt-12">
            <button 
              onClick={scrollPrev}
              className="p-4 glass rounded-full text-white hover:text-brand-gold hover:border-brand-gold transition-all group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="group-active:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollNext}
              className="p-4 glass rounded-full text-white hover:text-brand-gold hover:border-brand-gold transition-all group"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="group-active:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
