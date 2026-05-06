import { CheckCircle2, ShieldCheck, Trophy, Palette } from 'lucide-react';
import { TRUST_INDICATORS } from '../constants';

const icons = [ShieldCheck, Trophy, CheckCircle2, Palette];

export default function TrustStrip() {
  return (
    <div className="bg-brand-black text-white py-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {TRUST_INDICATORS.map((item, index) => {
            const Icon = icons[index];
            return (
              <div key={item.label} className="flex flex-col items-center text-center">
                <Icon size={32} className="text-brand-gold mb-4" />
                <h3 className="accent-label">{item.label}</h3>
                <p className="text-[9px] text-brand-gray/60 uppercase tracking-widest mt-2">{item.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
