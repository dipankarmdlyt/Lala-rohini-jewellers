import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import { LegalType } from './LegalModal';

interface FooterProps {
  onOpenLegal: (type: LegalType) => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer className="bg-brand-black text-white pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-serif tracking-widest uppercase mb-4 text-brand-gold">Lala Rohini <span className="text-white">Jewellers</span></h2>
            <p className="text-brand-gray/60 text-sm font-light leading-relaxed mb-6">
              A heritage brand specializing in hallmarked gold and certified diamonds since 1984. Crafting timeless beauty for generations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-all">
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-8">Navigation</h3>
            <ul className="space-y-4 text-brand-gray/60 text-sm">
              <li><a href="#home" className="hover:text-brand-gold transition-colors">Home</a></li>
              <li><a href="#collections" className="hover:text-brand-gold transition-colors">Collections</a></li>
              <li><a href="#bridal" className="hover:text-brand-gold transition-colors">Bridal Couture</a></li>
              <li><a href="#about" className="hover:text-brand-gold transition-colors">Our Legacy</a></li>
              <li><a href="#contact" className="hover:text-brand-gold transition-colors">Store Locator</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold mb-8">Customer Care</h3>
            <ul className="space-y-4 text-brand-gray/60 text-sm">
              <li><button onClick={() => onOpenLegal('certifications')} className="hover:text-brand-gold transition-colors">Gold Exchange Policy</button></li>
              <li><button onClick={() => onOpenLegal('certifications')} className="hover:text-brand-gold transition-colors">Diamond Certification</button></li>
              <li><a href="#bridal" className="hover:text-brand-gold transition-colors">Book an Appointment</a></li>
              <li><button onClick={() => onOpenLegal('privacy')} className="hover:text-brand-gold transition-colors">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div id="contact" className="space-y-6">
            <h3 className="text-xs uppercase tracking-widest font-bold mb-8">Visit Store</h3>
            <div className="space-y-4 text-brand-gray/60 text-sm">
              <div className="flex gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <p>RW36+MV Farakka, <br />West Bengal, 742212</p>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <a href="tel:+917699078709" className="hover:text-white transition-colors tracking-widest">076990 78709</a>
              </div>
              <div className="flex gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <a href="mailto:care@lalarohini.com" className="hover:text-white transition-colors">care@lalarohini.com</a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex space-x-8 text-[10px] uppercase tracking-[0.2em] text-white/50">
            <button onClick={() => onOpenLegal('terms')} className="hover:text-brand-gold transition-colors">Terms</button>
            <button onClick={() => onOpenLegal('privacy')} className="hover:text-brand-gold transition-colors">Privacy</button>
            <button onClick={() => onOpenLegal('certifications')} className="hover:text-brand-gold transition-colors">Certifications</button>
            <Link to="/admin" className="hover:text-brand-gold transition-colors ml-4 text-[9px] opacity-30">Admin</Link>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <a 
              href="https://wa.me/917699078709" 
              className="flex items-center justify-center space-x-3 bg-[#25D366] text-white px-8 py-4 sm:py-3 rounded-full hover:scale-105 transition-transform w-full sm:w-auto"
            >
              <MessageSquare size={18} fill="white" className="shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">WhatsApp Us</span>
            </a>
            <button className="bg-white text-brand-black px-10 py-4 sm:py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform w-full sm:w-auto flex items-center justify-center whitespace-nowrap">
              Visit Showroom
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
