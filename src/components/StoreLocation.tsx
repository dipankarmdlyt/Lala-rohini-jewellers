import { Clock, MapPin, Navigation, Phone } from 'lucide-react';

export default function StoreLocation() {
  return (
    <section id="contact" className="section-padding bg-brand-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text Section */}
          <div className="lg:w-1/2 space-y-8">
            <span className="text-brand-gold uppercase tracking-[0.4em] text-xs font-bold block">Visit our Boutique</span>
            <h2 className="text-4xl md:text-5xl leading-tight">Experience <br /> Craftsmanship in Person.</h2>
            <p className="text-brand-black/60 font-light leading-relaxed">
              Step into our flagship store for a personalized consultation. Explore our entire vault of certified diamonds and hallmarked gold jewellery in an ambiance of luxury.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Our Flagship Store</h4>
                  <p className="text-sm text-brand-black/60">RW36+MV Farakka, West Bengal, 742212</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Contact</h4>
                  <a href="tel:+917699078709" className="text-sm text-brand-black/60 hover:text-brand-gold transition-colors">076990 78709</a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest mb-1">Timing</h4>
                  <p className="text-sm text-brand-black/60">Monday - Saturday: 10:30 AM - 08:30 PM</p>
                  <p className="text-sm text-brand-black/40 italic mt-1">Closed on Sundays (except Festive Season)</p>
                </div>
              </div>
            </div>

            <a 
              href="https://maps.app.goo.gl/vvzKbkuxLajZKQ7t6" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full md:w-auto flex gap-3 text-xs uppercase tracking-widest font-bold"
            >
              <Navigation size={16} />
              Open in Google Maps
            </a>
          </div>

          {/* Map Preview (Simulated with Image) */}
          <div className="lg:w-1/2 w-full aspect-square md:aspect-video lg:aspect-square bg-brand-gray relative overflow-hidden group border border-brand-black/5 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1615655404745-a10d242f1345?auto=format&fit=crop&q=80&w=1200" 
              alt="Store Interior" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-6 right-6 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-lg">
              Authorized BIS Outlet
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
