import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, MapPin, Video, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import React, { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    requirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    nextStep(); // Move to success step
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/80 backdrop-blur-md" 
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="glass-dark p-8 text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-3xl font-serif mb-2">Bridal Consultation</h2>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold">Step {step <= 3 ? step : 3} of 3</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-10">
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <h3 className="text-xl font-serif">How would you like to connect?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <button 
                      onClick={() => { setFormData({...formData, type: 'In-person'}); nextStep(); }}
                      className="p-8 border-soft text-left hover:border-brand-gold hover:bg-brand-gold/5 transition-all group"
                    >
                      <MapPin className="text-brand-gold mb-6 group-hover:scale-110 transition-transform" size={32} />
                      <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Boutique Visit</h4>
                      <p className="text-xs text-brand-black/50 leading-relaxed">Experience our full vault in a private bridal suite.</p>
                    </button>
                    <button 
                      onClick={() => { setFormData({...formData, type: 'Virtual'}); nextStep(); }}
                      className="p-8 border-soft text-left hover:border-brand-gold hover:bg-brand-gold/5 transition-all group"
                    >
                      <Video className="text-brand-gold mb-6 group-hover:scale-110 transition-transform" size={32} />
                      <h4 className="font-bold text-sm uppercase tracking-widest mb-2">Virtual Session</h4>
                      <p className="text-xs text-brand-black/50 leading-relaxed">Personal video tour of our collection from home.</p>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-8"
                >
                  <h3 className="text-xl font-serif">Select your preferred window</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="accent-label text-[#0F0F0F]/50 block">Date</label>
                      <input 
                        type="date" 
                        className="w-full p-4 border border-brand-gray bg-brand-ivory text-sm focus:outline-none focus:border-brand-gold"
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="accent-label text-[#0F0F0F]/50 block">Time Slot</label>
                      <select 
                         className="w-full p-4 border border-brand-gray bg-brand-ivory text-sm focus:outline-none focus:border-brand-gold"
                         onChange={(e) => setFormData({...formData, time: e.target.value})}
                      >
                        <option>Choose Slot</option>
                        <option>11:00 AM - 12:30 PM</option>
                        <option>02:00 PM - 03:30 PM</option>
                        <option>04:30 PM - 06:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-between pt-6">
                    <button onClick={prevStep} className="text-xs uppercase tracking-widest font-bold opacity-40 hover:opacity-100 italic">Back</button>
                    <button onClick={nextStep} className="btn-gold !py-3 !px-10 gap-3">
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.form 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-serif">Tell us about your dream vision</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <input 
                      required
                      placeholder="Full Name"
                      className="p-4 border border-brand-gray bg-brand-ivory text-sm focus:outline-none focus:border-brand-gold"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                      required
                      placeholder="WhatsApp Number"
                      className="p-4 border border-brand-gray bg-brand-ivory text-sm focus:outline-none focus:border-brand-gold"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <textarea 
                    placeholder="Specific requirements (e.g., Wedding date, Heritage Gold, Diamond preferences...)"
                    className="w-full p-4 border border-brand-gray bg-brand-ivory text-sm focus:outline-none focus:border-brand-gold h-32 resize-none"
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  />
                  <div className="flex justify-between pt-6">
                    <button type="button" onClick={prevStep} className="text-xs uppercase tracking-widest font-bold opacity-40 hover:opacity-100 italic">Back</button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="btn-gold !py-3 !px-12 flex gap-3 disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px] justify-center"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Confirm Appointment <ArrowRight size={16} /></>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}

              {step === 4 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-brand-gold/10 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-serif mb-4">Reservation Received</h3>
                  <p className="text-brand-black/60 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    A dedicated bridal consultant will reach out via WhatsApp to finalize your session within the next 2 hours.
                  </p>
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={onClose}
                      className="btn-gold !px-12"
                    >
                      Back to Collections
                    </button>
                    <a 
                      href={`https://wa.me/917699078709?text=I just booked a bridal consultation! My name is ${formData.name}.`}
                      className="text-xs uppercase tracking-widest font-bold text-brand-gold flex items-center justify-center gap-2 group"
                    >
                      <MessageCircle size={14} className="group-hover:scale-110 transition-transform" /> Chat with Consultant Now
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
