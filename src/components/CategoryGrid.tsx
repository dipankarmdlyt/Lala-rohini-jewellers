import { motion } from 'motion/react';
import { CATEGORIES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryGrid({ onSelectCategory }: { onSelectCategory?: () => void }) {
  return (
    <section id="collections" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl heading-bold italic mb-8">Our Exquisite Collections</h2>
          <p className="accent-label text-brand-gold">
            Heritage craftsmanship meets modern excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.id}
              onClick={() => onSelectCategory?.()}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              whileHover={{ scale: 0.985 }}
              className="relative aspect-[16/10] group overflow-hidden bg-brand-black cursor-pointer"
            >
              <img 
                src={category.image} 
                alt={category.title} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-bold mb-2">Category</span>
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-white text-3xl font-serif mb-2">{category.title}</h3>
                    <p className="text-white/60 text-sm font-light max-w-xs">{category.description}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
