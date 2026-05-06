import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import CategoryGrid from './components/CategoryGrid';
import BridalSection from './components/BridalSection';
import FeaturedCollection from './components/FeaturedCollection';
import TrendingNow from './components/TrendingNow';
import ProductCatalog from './components/ProductCatalog';
import MarketRates from './components/MarketRates';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import LegalModal, { LegalType } from './components/LegalModal';
import VirtualTryOn from './components/VirtualTryOn';
import StoreLocation from './components/StoreLocation';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import LiveRatesTicker from './components/LiveRatesTicker';
import BookingModal from './components/BookingModal';
import { WishlistProvider } from './context/WishlistContext';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: LegalType | null }>({
    isOpen: false,
    type: null
  });

  const openLegal = (type: LegalType) => {
    setLegalModal({ isOpen: true, type });
  };

  return (
    <WishlistProvider>
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
        type={legalModal.type}
      />
      <div className="relative">
        <div className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300">
          <LiveRatesTicker />
          <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
        </div>
      
      <main className="relative">
        <Hero />
        <TrustStrip />
        <CategoryGrid />
        <BridalSection onOpenBooking={() => setIsBookingOpen(true)} />
        <FeaturedCollection />
        <TrendingNow />
        <ProductCatalog />
        <Testimonials />
        <FAQSection />
        <VirtualTryOn />
        <MarketRates />
        
        {/* Trust/About Block */}
        <section id="about" className="section-padding bg-white border-b border-brand-gray/20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="accent-label text-brand-gold mb-8 block">Our Legacy</span>
            <h2 className="text-5xl md:text-6xl mb-12 heading-bold italic">Authenticity, Integrity, and Excellence since 1984.</h2>
            <p className="text-brand-black/60 text-lg font-light leading-relaxed mb-16 max-w-2xl mx-auto">
              For four decades, Lala Rohini Jewellers has been more than a store—it is a custodian of family traditions. Every gram of gold we sell carries the weight of a 100% exchange guarantee and the seal of BIS Hallmark.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-brand-gray pt-16">
              {[
                { val: "40+", lab: "Years of Heritage" },
                { val: "10k+", lab: "Happy Families" },
                { val: "100%", lab: "Transparency" },
                { val: "Pure", lab: "Handcrafted Art" }
              ].map((stat) => (
                <div key={stat.lab}>
                  <p className="text-4xl heading-bold text-brand-black mb-2">{stat.val}</p>
                  <p className="accent-label text-brand-black/40">{stat.lab}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StoreLocation />
      </main>

      <Footer onOpenLegal={openLegal} />
      <WhatsAppButton />
    </div>
    </WishlistProvider>
  );
}

