import { motion } from 'motion/react';
import { Menu, X, Phone, MessageSquare, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BRAND_NAME, NAV_LINKS } from '../constants';
import { useWishlist } from '../context/WishlistContext';
import WishlistDrawer from './WishlistDrawer';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`transition-all duration-500 ${
        scrolled ? 'glass py-4' : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-brand-black">
        {/* Desktop Menu Left */}
        <div className="hidden lg:flex gap-10">
          {NAV_LINKS.slice(0, 2).map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-bold hover:text-brand-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Logo */}
        <a href="#home" className="flex flex-col items-center group">
          <span className={`text-2xl md:text-3xl font-serif tracking-tighter uppercase font-bold transition-all duration-500 ${
            scrolled ? 'scale-90 text-brand-gold' : 'scale-100 text-brand-gold'
          }`}>
            Lala Rohini <span className={`${scrolled ? 'text-brand-black' : 'text-white'} transition-colors duration-500`}>Jewellers</span>
          </span>
        </a>

        {/* Desktop Menu Right */}
        <div className="hidden lg:flex gap-10 items-center">
          {NAV_LINKS.slice(2).map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-bold hover:text-brand-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={onOpenBooking}
            className="text-[11px] uppercase tracking-[0.2em] font-bold border-b border-brand-black pb-1 ml-4 hover:text-brand-gold hover:border-brand-gold transition-all"
          >
            Book Appointment
          </button>
          <button 
            onClick={() => setIsWishlistOpen(true)} 
            className="relative ml-4 p-2 hover:text-brand-gold transition-colors"
          >
            <Heart size={20} fill={wishlist.length > 0 ? "currentColor" : "none"} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>

        {/* Wishlist Drawer */}
        <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className={scrolled ? 'text-brand-black' : 'text-white'} /> : <Menu className={scrolled ? 'text-brand-black' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 right-0 glass border-t border-brand-gray p-8 flex flex-col gap-6 items-center"
        >
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-widest font-medium"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => {
              onOpenBooking();
              setIsOpen(false);
            }}
            className="text-sm uppercase tracking-widest font-medium text-brand-gold"
          >
            Book Appointment
          </button>
          <div className="grid grid-cols-2 gap-4 w-full pt-4">
            <button 
              onClick={() => {
                setIsWishlistOpen(true);
                setIsOpen(false);
              }}
              className="btn-outline px-4 py-3 text-[10px] flex items-center justify-center gap-2"
            >
              <Heart size={14} fill={wishlist.length > 0 ? "currentColor" : "none"} /> 
              Wishlist ({wishlist.length})
            </button>
            <a href="tel:+910000000000" className="btn-outline px-4 py-3 text-[10px] flex items-center justify-center gap-2">
              <Phone size={14} /> Call Now
            </a>
            <a href="https://wa.me/910000000000" className="col-span-2 btn-gold px-4 py-3 text-[10px] flex items-center justify-center gap-2">
              <MessageSquare size={14} /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
