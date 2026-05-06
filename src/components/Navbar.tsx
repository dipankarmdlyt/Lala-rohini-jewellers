import { motion } from 'motion/react';
import { Menu, X, Phone, MessageSquare, Heart, Volume2, VolumeX, Globe, Play } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BRAND_NAME, NAV_LINKS } from '../constants';
import { useWishlist } from '../context/WishlistContext';
import { useSound } from '../context/SoundContext';
import WishlistDrawer from './WishlistDrawer';
import VideoOverlay from './VideoOverlay';

interface NavbarProps {
  onOpenBooking: () => void;
  onViewChange: (view: 'home' | 'catalog') => void;
  currentView: 'home' | 'catalog';
}

export default function Navbar({ onOpenBooking, onViewChange, currentView }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { wishlist } = useWishlist();
  const { isMuted, toggleMute, playSound } = useSound();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    playSound('click');
    if (href === '#catalog') {
      e.preventDefault();
      onViewChange('catalog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href === '#home') {
      e.preventDefault();
      onViewChange('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav 
      className={`transition-all duration-500 w-full ${
        scrolled ? 'glass py-4 shadow-lg' : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-brand-black">
        {/* Desktop Menu Left */}
        <div className="hidden lg:flex gap-10">
          {NAV_LINKS.slice(0, 2).map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all ${
                (link.href === '#catalog' && currentView === 'catalog') || (link.href === '#home' && currentView === 'home')
                  ? 'text-brand-gold border-b border-brand-gold pb-1'
                  : 'hover:text-brand-gold'
              }`}
            >
              {t(`nav.${link.name.toLowerCase()}`)}
            </a>
          ))}
        </div>

        {/* Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex flex-col items-center group"
        >
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
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[11px] uppercase tracking-[0.2em] font-bold hover:text-brand-gold transition-colors"
            >
              {t(`nav.${link.name.toLowerCase()}`)}
            </a>
          ))}
          <button 
            onClick={() => {
              playSound('click');
              onOpenBooking();
            }}
            className="text-[11px] uppercase tracking-[0.2em] font-bold border-b border-brand-black pb-1 ml-4 hover:text-brand-gold hover:border-brand-gold transition-all"
          >
            {t('nav.appointment')}
          </button>
          
          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleMute();
              if (isMuted) playSound('click');
            }}
            className="ml-4 p-2 text-brand-black/40 hover:text-brand-gold transition-colors"
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <button 
            onClick={() => {
              playSound('open');
              setIsWishlistOpen(true);
            }} 
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
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm uppercase tracking-widest font-medium transition-colors ${
                (link.href === '#catalog' && currentView === 'catalog') || (link.href === '#home' && currentView === 'home')
                  ? 'text-brand-gold'
                  : ''
              }`}
            >
              {t(`nav.${link.name.toLowerCase()}`)}
            </a>
          ))}
          <button 
            onClick={() => {
              playSound('click');
              onOpenBooking();
              setIsOpen(false);
            }}
            className="text-sm uppercase tracking-widest font-medium text-brand-gold"
          >
            {t('nav.appointment')}
          </button>

          {/* Brand Film Link */}
          <button 
            onClick={() => {
              playSound('open');
              setIsVideoOpen(true);
              setIsOpen(false);
            }}
            className="w-full text-left py-4 border-t border-brand-gray/30 text-sm uppercase tracking-widest font-medium text-brand-gold flex items-center justify-between group"
          >
            {t('nav.brandFilm')}
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Play size={14} fill="currentColor" />
            </motion.span>
          </button>

          {/* Dedicated Catalog Button */}
          <button 
            onClick={() => {
              onViewChange('catalog');
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-5 bg-brand-gold text-white rounded-xl text-sm uppercase tracking-[0.2em] font-bold shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            Explore Full Catalog
          </button>

          {/* Language Selection */}
          <div className="w-full pt-6 border-t border-brand-gray/30">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={14} className="text-brand-gold" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-60">
                {t('common.selectLanguage')}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'bn', label: 'বাংলা' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    playSound('click');
                    i18n.changeLanguage(lang.code);
                  }}
                  className={`px-4 py-2 text-[10px] uppercase tracking-wider border transition-all ${
                    i18n.language === lang.code 
                      ? 'border-brand-gold bg-brand-gold/5 text-brand-gold' 
                      : 'border-brand-gray/30 text-brand-black/60 hover:border-brand-gold/50'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full pt-4">
            <button 
              onClick={() => {
                setIsWishlistOpen(true);
                setIsOpen(false);
              }}
              className="btn-outline px-4 py-3 text-[10px] flex items-center justify-center gap-2"
            >
              <Heart size={14} fill={wishlist.length > 0 ? "currentColor" : "none"} /> 
              {t('common.wishlist')} ({wishlist.length})
            </button>
            <a href="tel:+917699078709" className="btn-outline px-4 py-3 text-[10px] flex items-center justify-center gap-2">
              <Phone size={14} /> {t('common.callNow')}
            </a>
            <a href="https://wa.me/917699078709" className="col-span-2 btn-gold px-4 py-3 text-[10px] flex items-center justify-center gap-2">
              <MessageSquare size={14} /> {t('common.whatsapp')}
            </a>
          </div>
        </motion.div>
      )}

      <VideoOverlay 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)} 
      />
    </nav>
  );
}
