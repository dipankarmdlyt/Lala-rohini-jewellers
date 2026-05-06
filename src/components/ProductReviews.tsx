import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, User, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '../context/SoundContext';

interface Review {
  id: number;
  productId: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(localStorage.getItem('reviewer_name') || '');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { playSound } = useSound();

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews/${productId}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment) return;

    setIsSubmitting(true);
    playSound('click');
    
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          user,
          rating,
          comment
        })
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviews(prev => [newReview, ...prev]);
        setComment('');
        setHasSubmitted(true);
        localStorage.setItem('reviewer_name', user);
        setTimeout(() => setHasSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error posting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="mt-12 pt-12 border-t border-brand-black/5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-serif">Customer Reviews</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star 
                  key={s} 
                  size={12} 
                  fill={s <= Math.round(Number(averageRating)) ? "#D4AF37" : "none"} 
                  className={s <= Math.round(Number(averageRating)) ? "text-brand-gold" : "text-brand-black/20"}
                />
              ))}
            </div>
            <span className="text-xs text-brand-black/40 font-medium">
              {averageRating} ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-brand-ivory/50 p-6 rounded-3xl mb-12 border border-brand-gray/30">
        <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-black/40 mb-6">Leave a Review</h4>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-brand-black/40 px-1">Your Name</label>
              <input 
                type="text" 
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Ex. Sarah M."
                className="w-full bg-white border border-brand-gray/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-all"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest font-bold text-brand-black/40 px-1">Rating</label>
              <div className="flex gap-2 p-3 bg-white rounded-xl border border-brand-gray/50 h-[46px] items-center">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button 
                    type="button" 
                    key={s} 
                    onClick={() => { setRating(s); playSound('click'); }}
                    className="transition-transform active:scale-90"
                  >
                    <Star 
                      size={18} 
                      fill={s <= rating ? "#D4AF37" : "none"} 
                      className={s <= rating ? "text-brand-gold" : "text-brand-black/20"}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] uppercase tracking-widest font-bold text-brand-black/40 px-1">Your Thoughts</label>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about the craftsmanship and fit..."
              className="w-full bg-white border border-brand-gray/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-gold transition-all min-h-[100px]"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 ${
              hasSubmitted 
                ? 'bg-green-500 text-white' 
                : 'bg-brand-black text-white hover:bg-brand-gold'
            }`}
          >
            {isSubmitting ? (
              <span className="animate-spin">◌</span>
            ) : hasSubmitted ? (
              <><Check size={14} /> Review Published</>
            ) : (
              <><Send size={14} /> Post Review</>
            )}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse flex gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-gray/30" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-brand-gray/30 w-1/4 rounded" />
                  <div className="h-3 bg-brand-gray/30 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 opacity-40 italic text-sm">
            Be the first to share your experience with this masterpiece.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {reviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-ivory border border-brand-gray/50 flex items-center justify-center text-brand-gold shrink-0">
                    <User size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h5 className="text-sm font-bold">{review.user}</h5>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              size={10} 
                              fill={s <= review.rating ? "#D4AF37" : "none"} 
                              className={s <= review.rating ? "text-brand-gold" : "text-brand-black/20"}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-brand-black/30 font-medium font-mono uppercase">
                        {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs text-brand-black/60 leading-relaxed mt-2 italic">"{review.comment}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
