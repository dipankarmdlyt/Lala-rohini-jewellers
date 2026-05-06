import React, { createContext, useContext, useState, useEffect } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: 'click' | 'success' | 'open' | 'close') => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const SOUND_URLS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
  open: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  close: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('app_sound_muted');
    return saved ? JSON.parse(saved) : false;
  });

  const [audioCache, setAudioCache] = useState<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    // Preload sounds
    const cache: Record<string, HTMLAudioElement> = {};
    Object.entries(SOUND_URLS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audio.volume = 0.2; // Set low volume by default for premium feel
      cache[key] = audio;
    });
    setAudioCache(cache);
    
    return () => {
      Object.values(cache).forEach(audio => {
        audio.pause();
        audio.src = '';
      });
    };
  }, []);

  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    localStorage.setItem('app_sound_muted', JSON.stringify(newState));
  };

  const playSound = (type: keyof typeof SOUND_URLS) => {
    if (isMuted) return;
    
    const audio = audioCache[type];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(err => console.debug('Audio play blocked by browser policy:', err));
    }
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
