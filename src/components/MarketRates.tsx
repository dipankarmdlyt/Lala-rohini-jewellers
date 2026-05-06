import { useEffect, useState } from 'react';
import { getLiveMarketRates, MetalPrice } from '../services/pricingService';
import { Info, ExternalLink } from 'lucide-react';

export default function MarketRates() {
  const [rates, setRates] = useState<MetalPrice[]>([]);

  useEffect(() => {
    getLiveMarketRates().then(setRates);
  }, []);

  return (
    <section className="section-padding bg-white border-y border-brand-gray/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="accent-label text-brand-gold mb-6 block">Price Transparency</span>
            <h2 className="text-4xl md:text-5xl heading-bold italic mb-8">Daily Market Bullion Rates</h2>
            <p className="text-brand-black/60 font-light leading-relaxed mb-10">
              We believe in total transparency. Our pricing is updated every 10 minutes based on international market benchmarks. Use these rates to estimate the base metal value of your bespoke creations.
            </p>
            
            <div className="bg-brand-ivory p-6 border border-brand-black/5 rounded-sm flex items-start gap-4">
              <Info className="text-brand-gold shrink-0 mt-1" size={20} />
              <p className="text-xs text-brand-black/40 leading-relaxed font-medium uppercase tracking-wider">
                Note: These rates are for metal value only. Final jewellery cost includes GST, hallmarking charges, and artisanal making charges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {rates.map((rate) => (
              <div 
                key={`${rate.metal}-${rate.purity}`}
                className="group bg-white p-8 border-soft flex justify-between items-center hover:border-brand-gold transition-all duration-300"
              >
                <div>
                  <h4 className="text-2xl font-serif">{rate.metal} <span className="opacity-40">{rate.purity}</span></h4>
                  <p className="text-[10px] uppercase tracking-widest text-[#0F0F0F]/50 mt-2">Rate per 10 grams</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl heading-bold">₹{(rate.pricePerGram * 10).toLocaleString('en-IN')}</p>
                  <p className={`text-[10px] uppercase tracking-widest mt-2 font-bold ${rate.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {rate.change >= 0 ? '+' : ''}{rate.change}% vs Yesterday
                  </p>
                </div>
              </div>
            ))}
            
            <a href="https://wa.me/917699078709" className="mt-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-center py-4 border border-dashed border-brand-gold/30 text-brand-gold hover:bg-brand-gold/5 transition-all">
              Request Custom Quote <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
