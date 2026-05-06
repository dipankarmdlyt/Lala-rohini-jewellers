import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { useSound } from '../context/SoundContext';

interface VideoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  posterUrl?: string;
}

export default function VideoOverlay({ 
  isOpen, 
  onClose, 
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-jewellery-maker-polishing-a-diamond-ring-4552-large.mp4",
  posterUrl = "https://images.unsplash.com/photo-1573408304604-184be5e380f2?auto=format&fit=crop&q=80&w=2000"
}: VideoOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const { playSound } = useSound();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsPlaying(false);
    }
  }, [isOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      playSound('click');
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      playSound('click');
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
      playSound('click');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              playSound('close');
              onClose();
            }}
            className="absolute top-8 right-8 z-[1010] p-4 text-white hover:bg-white/10 rounded-full transition-all group active:scale-95"
            aria-label="Close video"
          >
            <X size={32} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterUrl}
              className="w-full h-full object-cover lg:object-contain"
              onTimeUpdate={handleTimeUpdate}
              onClick={togglePlay}
              playsInline
              muted={isMuted}
            />

            {/* Custom Controls Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-0 left-0 right-0 p-8 pt-20 bg-gradient-to-t from-black via-black/40 to-transparent"
            >
              <div className="max-w-6xl mx-auto space-y-6">
                {/* Progress Bar */}
                <div className="relative group/progress">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1 bg-white/20 appearance-none cursor-pointer rounded-full accent-brand-gold hover:h-2 transition-all"
                  />
                  <div 
                    className="absolute top-0 left-0 h-1 bg-brand-gold pointer-events-none group-hover/progress:h-2 transition-all rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={togglePlay}
                      className="text-white hover:text-brand-gold transition-colors"
                    >
                      {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                    </button>

                    <button 
                      onClick={toggleMute}
                      className="text-white hover:text-brand-gold transition-colors"
                    >
                      {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </button>
                    
                    <div className="hidden sm:block">
                      <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
                        Brand Narrative — The Art of Creation
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={toggleFullscreen}
                    className="text-white hover:text-brand-gold transition-colors"
                  >
                    <Maximize2 size={24} />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Big Play Button (when paused) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  onClick={togglePlay}
                  className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-brand-gold/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
                >
                  <Play size={40} fill="currentColor" className="ml-2" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
