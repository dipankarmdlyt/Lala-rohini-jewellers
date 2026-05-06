import { motion } from 'motion/react';
import { FEATURED_PRODUCTS } from '../constants';
import { MessageCircle, Sparkles } from 'lucide-react';

export default function FeaturedCollection() {
  return (
    <section id="featured" className="section-padding bg-brand-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-brand-black">
          <div className="max-w-xl">
            <span className="accent-label text-brand-gold mb-4 block">Curated Excellence</span>
            <h2 className="text-5xl md:text-6xl heading-bold italic mb-6">Selected Masterpieces</h2>
            <p className="text-brand-black/60 text-lg font-light leading-relaxed">
              A glimpse into our vault of high-ticket rarities. Each piece is hand-selected for its exceptional craftsmanship and heritage value.
            </p>
          </div>
          <a href="#catalog" className="btn-outline !px-12 py-4 text-[10px] uppercase tracking-widest font-bold">
            Explore Full Catalog
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {FEATURED_PRODUCTS.map((product) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <div className="relative aspect-[4/5] bg-white overflow-hidden mb-8 border-soft p-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {product.tag && (
                  <div className="absolute top-6 right-6 z-10 transition-transform duration-500 group-hover:scale-110">
                    <span className="glass-dark text-white px-3 py-1.5 text-[8px] uppercase tracking-[0.2em] font-bold shadow-2xl">
                      {product.tag}
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-2 glass-dark m-4">
                  <a 
                    href={`https://wa.me/910000000000?text=I am interested in acquiring the ${product.name} from your collection. Could you provide more details, availability, and the current market price?`}
                    className="w-full btn-gold !py-3 text-[10px] flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={14} /> Enquire Now
                  </a>
                  <a 
                    href="#try-on"
                    className="w-full glass text-brand-black px-4 py-3 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-brand-gold hover:text-white transition-all"
                  >
                    <Sparkles size={14} /> Try On Virtual
                  </a>
                </div>
              </div>
              <p className="text-[10px] text-brand-gold uppercase tracking-[0.3em] font-bold mb-3">{product.category}</p>
              <h3 className="text-xl font-serif mb-3 group-hover:text-brand-gold transition-colors">{product.name}</h3>
              <p className="text-[11px] text-brand-black/50 leading-relaxed font-light line-clamp-2 italic">
                {product.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
