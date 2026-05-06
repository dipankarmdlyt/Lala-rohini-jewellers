import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PRODUCTS } from '../constants';
import { Search, Filter, X, MessageCircle, Sparkles, ChevronDown, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const FILTERS = {
  metal: ["Gold", "Diamond", "Silver", "Platinum"],
  gemstone: ["None", "Diamond", "Polki", "Pearl", "Emerald", "Ruby"],
  collection: ["Heritage", "Modern", "Bridal"],
  occasion: ["Wedding", "Engagement", "Party", "Daily Wear", "Gift"],
  priceRange: ["Under 50k", "50k-1L", "Above 1L"]
};

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    metal: [],
    gemstone: [],
    collection: [],
    occasion: [],
    priceRange: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      metal: [],
      gemstone: [],
      collection: [],
      occasion: [],
      priceRange: []
    });
    setSearch("");
  };

  const [discoveryFilter, setDiscoveryFilter] = useState<'All' | 'Trending' | 'Best Seller' | 'Bridal Pick'>('All');

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesMetal = activeFilters.metal.length === 0 || activeFilters.metal.includes(product.metal);
      const matchesGemstone = activeFilters.gemstone.length === 0 || activeFilters.gemstone.includes(product.gemstone);
      const matchesCollection = activeFilters.collection.length === 0 || activeFilters.collection.includes(product.collection);
      const matchesOccasion = activeFilters.occasion.length === 0 || activeFilters.occasion.includes(product.occasion);
      const matchesPrice = activeFilters.priceRange.length === 0 || activeFilters.priceRange.includes(product.priceRange);
      const matchesDiscovery = discoveryFilter === 'All' || product.tag === discoveryFilter;

      return matchesSearch && matchesMetal && matchesGemstone && matchesCollection && matchesOccasion && matchesPrice && matchesDiscovery;
    });
  }, [search, activeFilters, discoveryFilter]);

  return (
    <section id="catalog" className="section-padding bg-brand-ivory min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="accent-label text-brand-gold mb-6 block">Our Full Vault</span>
          <h2 className="text-5xl md:text-6xl heading-bold italic mb-12">The Collection</h2>
          
          {/* Discovery Tabs */}
          <div className="flex flex-wrap gap-4 mb-12 border-b border-brand-black/5 pb-8">
            {['All', 'Trending', 'Best Seller', 'Bridal Pick'].map((tab) => (
              <button
                key={tab}
                onClick={() => setDiscoveryFilter(tab as any)}
                className={`px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                  discoveryFilter === tab 
                    ? 'bg-brand-gold text-white shadow-lg' 
                    : 'bg-white text-brand-black/40 hover:text-brand-gold'
                }`}
              >
                {tab === 'All' ? 'View All' : tab.replace('Pick', 'Choice')}
              </button>
            ))}
          </div>

          {/* Search & Mobile Filter Toggle */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-black/30 group-focus-within:text-brand-gold transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search masterpieces..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white pl-12 pr-4 py-4 border-soft focus:outline-none focus:border-brand-gold text-sm tracking-wide transition-all"
                />
              </div>
              <p className="text-[10px] text-brand-black/30 uppercase tracking-widest font-bold px-1">
                {filteredProducts.length} pieces found
              </p>
            </div>
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden w-full md:w-auto btn-outline flex items-center justify-center gap-3 !py-4"
            >
              <Filter size={18} /> Filters {Object.values(activeFilters).flat().length > 0 && `(${Object.values(activeFilters).flat().length})`}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-10">
            <div className="flex justify-between items-center pb-4 border-b border-brand-black/10">
              <h3 className="accent-label">Refine By</h3>
              {Object.values(activeFilters).flat().length > 0 && (
                <button onClick={clearFilters} className="text-[9px] uppercase tracking-widest text-brand-gold hover:underline">Clear All</button>
              )}
            </div>

            {Object.entries(FILTERS).map(([category, options]) => (
              <div key={category} className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-black/40">{category.replace(/([A-Z])/g, ' $1')}</h4>
                <div className="flex flex-wrap gap-2">
                  {options.map(option => (
                    <button
                      key={option}
                      onClick={() => toggleFilter(category, option)}
                      className={`px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold border transition-all ${
                        activeFilters[category].includes(option)
                          ? 'bg-brand-black text-white border-brand-black'
                          : 'bg-white text-brand-black/60 border-brand-black/10 hover:border-brand-gold hover:text-brand-gold'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-brand-black/10">
                <p className="text-brand-black/40 italic">No pieces found matching your criteria.</p>
                <button onClick={clearFilters} className="mt-4 text-brand-gold accent-label underline">Reset Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div 
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="group"
                    >
                      <div className="relative aspect-[4/5] bg-white overflow-hidden mb-6 border-soft p-4">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-4 left-4 p-2 rounded-full backdrop-blur-md transition-all ${
                            isInWishlist(product.id) 
                              ? 'bg-brand-gold text-white shadow-lg scale-110' 
                              : 'bg-white/50 text-brand-black hover:bg-white hover:scale-105'
                          }`}
                        >
                          <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-2 glass-dark m-4">
                          <a 
                            href={`https://wa.me/917699078709?text=I am interested in the ${product.name} piece. Can you please share the current pricing and customisation options?`}
                            className="w-full btn-gold !py-2 text-[10px] flex items-center justify-center gap-2"
                          >
                            <MessageCircle size={14} /> Enquire Now
                          </a>
                          <a 
                            href="#try-on"
                            className="w-full glass text-brand-black px-4 py-2 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-brand-gold hover:text-white transition-all"
                          >
                            <Sparkles size={14} /> Try On Virtual
                          </a>
                        </div>
                        {product.collection === 'Bridal' && (
                          <div className="absolute top-4 right-4 bg-brand-gold text-brand-black px-3 py-1 text-[8px] uppercase tracking-widest font-bold">
                            Signature Piece
                          </div>
                        )}
                      </div>
                      <div className="px-2">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <p className="text-[10px] text-brand-gold uppercase tracking-[0.2em] font-bold">
                            {product.metal} • {product.gemstone}
                          </p>
                          {product.tag && (
                            <span className="text-[8px] bg-brand-gold/10 text-brand-gold px-2 py-0.5 font-bold uppercase tracking-widest">
                              {product.tag}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-serif mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h3>
                        <p className="text-[11px] text-brand-black/40 line-clamp-2 italic mb-4">{product.description}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-brand-black/5">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-black/60">{product.priceRange}</span>
                          <button className="text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:underline">
                            Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-[80] bg-brand-black/60 backdrop-blur-sm lg:hidden" 
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-[90] w-full max-w-sm bg-white p-8 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-serif">Filters</h2>
                <button onClick={() => setShowMobileFilters(false)}><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-8 pr-2">
                {Object.entries(FILTERS).map(([category, options]) => (
                  <div key={category} className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-brand-black/40">{category.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {options.map(option => (
                        <button
                          key={option}
                          onClick={() => toggleFilter(category, option)}
                          className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold border transition-all ${
                            activeFilters[category].includes(option)
                              ? 'bg-brand-black text-white border-brand-black'
                              : 'bg-white text-brand-black/60 border-brand-black/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-brand-gray flex gap-4">
                <button onClick={clearFilters} className="flex-1 py-4 text-xs font-bold uppercase tracking-widest border border-brand-black">Reset</button>
                <button onClick={() => setShowMobileFilters(false)} className="flex-1 bg-brand-black text-white py-4 text-xs font-bold uppercase tracking-widest">Show Results</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
