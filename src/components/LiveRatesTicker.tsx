import { useEffect, useState } from 'react';
import { getLiveMarketRates, MetalPrice } from '../services/pricingService';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function LiveRatesTicker() {
  const [rates, setRates] = useState<MetalPrice[]>([]);

  useEffect(() => {
    getLiveMarketRates().then(setRates);
  }, []);

  return (
    <div className="bg-brand-black text-white/90 py-2 border-b border-white/5 overflow-hidden whitespace-nowrap text-[10px] uppercase tracking-[0.2em] font-bold">
      <div className="flex animate-marquee items-center gap-12">
        {/* Doubled for seamless loop */}
        {[...rates, ...rates].map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <span className="text-brand-gold">{item.metal} {item.purity}</span>
            <span>₹{item.pricePerGram.toLocaleString('en-IN')}/gm</span>
            <span className={item.change >= 0 ? 'text-green-400 flex items-center gap-1' : 'text-red-400 flex items-center gap-1'}>
              {item.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {Math.abs(item.change)}%
            </span>
          </div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </div>
  );
}
