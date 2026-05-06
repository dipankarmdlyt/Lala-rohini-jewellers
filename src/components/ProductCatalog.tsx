import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_PRODUCTS } from '../constants';
import { Search, Filter, X, MessageCircle, Sparkles, ChevronLeft, ChevronRight, Heart, ZoomIn } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useSound } from '../context/SoundContext';
import ProductReviews from './ProductReviews';

const FILTERS = {
  metal: ["Gold", "Diamond", "Silver", "Platinum"],
  gemstone: ["None", "Diamond", "Polki", "Pearl", "Emerald", "Ruby"],
  collection: ["Heritage", "Modern", "Bridal"],
  occasion: ["Wedding", "Engagement", "Party", "Daily Wear", "Gift"],
  priceRange: ["Under 50k", "50k-1L", "Above 1L"]
};

interface Product {
  id: number;
  name: string;
  category: string;
  collection: string;
  metal: string;
  gemstone: string;
  occasion: string;
  priceRange: string;
  price: string;
  image: string;
  images?: string[];
  description: string;
  tag?: string;
}

function ProductCard({ product, onOpen }: { product: Product, onOpen: (p: Product) => void, key?: React.Key }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { playSound } = useSound();
  const images = (product.images && product.images.length > 0) ? product.images : [product.image];
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <div 
        className="relative aspect-[4/5] bg-white overflow-hidden mb-6 border-soft p-2 cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <motion.img 
          key={images[currentImageIndex]}
          src={images[currentImageIndex]} 
          alt={product.name} 
          initial={{ opacity: 0.8, scale: 1.05 }}
          animate={{ 
            opacity: 1, 
            scale: isZoomed ? 2.5 : 1,
            originX: isZoomed ? `${mousePos.x}%` : '50%',
            originY: isZoomed ? `${mousePos.y}%` : '50%'
          }}
          className="w-full h-full object-cover transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        
        {/* Quick Carousel Controls */}
        {!isZoomed && images.length > 1 && (
          <div className="absolute inset-x-0 bottom-24 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-brand-gold w-4' : 'bg-brand-black/20 hover:bg-brand-black/40'}`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          <button 
            onClick={(e) => { 
                e.stopPropagation(); 
                playSound('click');
                toggleWishlist(product.id); 
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
              isInWishlist(product.id) 
                ? 'bg-brand-gold text-white shadow-lg scale-110' 
                : 'bg-white/50 text-brand-black hover:bg-white hover:scale-105'
            }`}
            title="Add to Wishlist"
          >
            <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
          </button>
          <button 
            onMouseEnter={() => setIsZoomed(true)}
            onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
                playSound('click');
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 ${isZoomed ? 'bg-brand-gold text-white' : 'bg-white/50 text-brand-black hover:bg-white hover:scale-105'}`}
            title="Zoom Craftsmanship"
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {!isZoomed && (
          <div 
            onClick={() => onOpen(product)}
            className="absolute inset-0 cursor-pointer z-0" 
          />
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-2 glass-dark m-4 z-10">
          <a 
            href={`https://wa.me/917699078709?text=I'm interested in the ${product.name}. Please share more details regarding its availability and customisation.`}
            onClick={(e) => e.stopPropagation()}
            className="w-full btn-gold !py-2.5 text-[10px] flex items-center justify-center gap-2"
          >
            <MessageCircle size={14} /> Enquire Now
          </a>
          <a 
            href="#try-on"
            className="w-full glass text-brand-black px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:bg-brand-gold hover:text-white transition-all text-center"
          >
            <Sparkles size={14} /> Try On Virtual
          </a>
        </div>
        
        {product.collection === 'Bridal' && (
          <div className="absolute top-4 right-4 bg-brand-gold text-brand-black px-3 py-1 text-[8px] uppercase tracking-widest font-bold shadow-sm">
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
          <button 
            onClick={() => onOpen(product)}
            className="text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ProductModal({ product, isOpen, onClose }: { product: Product | null, isOpen: boolean, onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const { playSound } = useSound();
  if (!product) return null;
  const images = (product.images && product.images.length > 0) ? product.images : [product.image];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh]"
          >
            <button 
              onClick={() => {
                playSound('close');
                onClose();
              }}
              className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 text-white md:text-brand-black md:bg-brand-ivory rounded-full transition-all"
            >
              <X size={24} />
            </button>

            {/* Gallery Section */}
            <div className="w-full md:w-3/5 bg-brand-ivory h-2/3 md:h-full relative overflow-hidden flex flex-col">
              <div className="flex-1 relative overflow-hidden p-8 md:p-20">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    src={images[activeImage]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 bg-white/20 backdrop-blur-xl p-3 rounded-2xl border border-white/20">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-brand-gold scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={() => setActiveImage(prev => (prev > 0 ? prev - 1 : images.length - 1))}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/50 hover:bg-white rounded-full text-brand-black transition-all"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={() => setActiveImage(prev => (prev < images.length - 1 ? prev + 1 : 0))}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/50 hover:bg-white rounded-full text-brand-black transition-all"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Info Section */}
            <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto bg-white flex flex-col">
              <div className="mb-10">
                <span className="accent-label mb-4 block">{product.collection} Collection</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h2>
                <div className="flex flex-col gap-1 border-b border-brand-black/5 pb-6">
                  <span className="text-xl text-brand-gold font-medium">{product.price}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest text-brand-black/40 font-bold">Estimated Range: {product.priceRange}</span>
                    <span className="text-[10px] uppercase tracking-widest text-brand-black/30 bg-brand-ivory px-3 py-1 rounded-full font-bold">Ref: LR-{product.id}00</span>
                  </div>
                </div>
              </div>

              <div className="space-y-8 flex-1">
                <div className="space-y-4">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-black/40">The Narrative</h4>
                  <p className="text-sm text-brand-black/60 leading-relaxed font-light italic">"{product.description}"</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-[9px] uppercase tracking-widest font-bold text-brand-black/40">Metal Details</h4>
                    <p className="text-xs font-semibold">{product.metal}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] uppercase tracking-widest font-bold text-brand-black/40">Gemstone</h4>
                    <p className="text-xs font-semibold">{product.gemstone}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] uppercase tracking-widest font-bold text-brand-black/40">Ideal For</h4>
                    <p className="text-xs font-semibold">{product.occasion}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] uppercase tracking-widest font-bold text-brand-black/40">Certification</h4>
                    <p className="text-xs font-semibold">BIS Hallmarked</p>
                  </div>
                </div>

                <div className="bg-brand-ivory p-6 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                      <Sparkles size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-tight">Virtual Try-On</p>
                      <p className="text-[9px] text-brand-black/40 italic">Available for this piece</p>
                    </div>
                  </div>
                  <a href="#try-on" onClick={onClose} className="btn-gold !py-2 !px-4 !text-[9px]">Launch Studio</a>
                </div>
              </div>

              <div className="pt-10 flex flex-col gap-3">
                <a 
                  href={`https://wa.me/917699078709?text=I'm captivated by the ${product.name}. Could you please share more details and current valuation with me?`}
                  className="btn-brand bg-brand-black text-white w-full flex items-center justify-center gap-3 py-5 rounded-2xl active:scale-[0.98] transition-transform"
                >
                  <MessageCircle size={18} /> Enquire Now
                </a>
                <p className="text-[9px] text-center text-brand-black/30 uppercase tracking-[0.2em] font-bold">
                  Usually replies within 15 minutes
                </p>
              </div>

              {/* Reviews Section */}
              <ProductReviews productId={product.id} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function ProductCatalog() {
  const [search, setSearch] = useState("");
  const { playSound } = useSound();
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    metal: [],
    gemstone: [],
    collection: [],
    occasion: [],
    priceRange: []
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Gold' | 'Diamond' | 'Bridal' | 'Silver'>('All');

  useEffect(() => {
    // Simulate loading for 1s when category or search changes
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeCategory, search]);

  const toggleFilter = (category: string, value: string) => {
    playSound('click');
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
    setActiveCategory('All');
  };

  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                          product.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesMetal = activeFilters.metal.length === 0 || activeFilters.metal.includes(product.metal);
      const matchesGemstone = activeFilters.gemstone.length === 0 || activeFilters.gemstone.includes(product.gemstone);
      const matchesCollection = activeFilters.collection.length === 0 || activeFilters.collection.includes(product.collection);
      const matchesOccasion = activeFilters.occasion.length === 0 || activeFilters.occasion.includes(product.occasion);
      const matchesPrice = activeFilters.priceRange.length === 0 || activeFilters.priceRange.includes(product.priceRange);

      return matchesSearch && matchesCategory && matchesMetal && matchesGemstone && matchesCollection && matchesOccasion && matchesPrice;
    });
  }, [search, activeFilters, activeCategory]);

  return (
    <section id="catalog" className="bg-brand-ivory min-h-screen">
      <ProductModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      
      {/* Search & Hero Bar */}
      <div className="bg-brand-black pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="accent-label text-brand-gold mb-4 block">Online Boutique</span>
            <h1 className="text-4xl md:text-6xl text-white font-serif italic mb-8">Curated Collections</h1>
            
            <div className="relative group max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-brand-gold transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Search by name, gemstone, or collection..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-16 pr-8 py-5 text-white focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all text-lg placeholder:text-white/20"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 mb-20 relative z-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 glass p-2 rounded-2xl shadow-2xl mb-12">
          {['All', 'Gold', 'Diamond', 'Bridal', 'Silver'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound('click');
                setActiveCategory(cat as any);
              }}
              className={`px-8 py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-brand-gold text-white shadow-lg scale-105' 
                  : 'text-brand-black/60 hover:text-brand-gold hover:bg-brand-gold/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-10">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-brand-gray/30 space-y-10">
              <div className="flex justify-between items-center pb-4 border-b border-brand-black/10">
                <h3 className="accent-label">Refine By</h3>
                {(Object.values(activeFilters).flat().length > 0 || search) && (
                  <button onClick={clearFilters} className="text-[9px] uppercase tracking-widest text-brand-gold hover:underline">Reset</button>
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
                        className={`px-4 py-2 text-[10px] rounded-lg uppercase tracking-widest font-bold border transition-all ${
                          activeFilters[category].includes(option)
                            ? 'bg-brand-gold text-white border-brand-gold shadow-md'
                            : 'bg-brand-ivory text-brand-black/60 border-transparent hover:border-brand-gold/30 hover:text-brand-gold'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Grid Container */}
          <div className="flex-1">
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-2xl font-serif">{activeCategory} Collections</h2>
              <span className="text-[10px] uppercase tracking-widest font-bold text-brand-black/30">
                Displaying {filteredProducts.length} pieces
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse space-y-6">
                    <div className="aspect-[4/5] bg-slate-200 rounded-2xl" />
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 w-1/3 rounded" />
                      <div className="h-6 bg-slate-200 w-3/4 rounded" />
                      <div className="h-4 bg-slate-200 w-full rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-32 text-center bg-white rounded-3xl border border-dashed border-brand-black/10"
              >
                <div className="max-w-xs mx-auto">
                  <Search size={48} className="mx-auto mb-6 text-brand-black/10" />
                  <p className="text-brand-black/40 italic mb-6">We couldn't find any pieces matching your current selection.</p>
                  <button onClick={clearFilters} className="btn-gold !px-8">Clear Search</button>
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product as any} 
                      onOpen={setSelectedProduct} 
                    />
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

