"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Volume1, Smartphone } from 'lucide-react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  const volumePanelRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  // 1. Deteksi Device & Window Resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Inisialisasi Audio Engine
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Pastikan path sesuai dengan file di folder public kamu
    const audio = new Audio('/mars-genbi.mp3'); 
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    const handleInteraction = () => {
      if (!hasInteracted.current && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
          })
          .catch(() => {});
      }
    };

    // Trigger otomatis yang lebih agresif untuk Next.js
    const events = ['click', 'touchstart', 'scroll', 'wheel'];
    events.forEach(event => document.addEventListener(event, handleInteraction, { once: true }));

    return () => {
      events.forEach(event => document.removeEventListener(event, handleInteraction));
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // 3. Sinkronisasi Volume Real-time
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  // 4. Click Outside Handler (Close Panel)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumePanelRef.current && !volumePanelRef.current.contains(event.target as Node)) {
        setShowVolume(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 5. Logic Drag Slider yang Aman untuk TypeScript
  const handleSliderMove = (e: React.MouseEvent | MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'clientX' in e ? e.clientX : (e as any).touches[0].clientX;
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    const newVolume = percentage / 100;
    
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) setIsMuted(false);
    if (newVolume > 0 && !isPlaying && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) audioRef.current.play().then(() => setIsPlaying(true));
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 300) {
      toggleMute();
      setLastClickTime(0);
    } else {
      setShowVolume(!showVolume);
      setLastClickTime(currentTime);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Volume Panel */}
      <div
        ref={volumePanelRef}
        className={`absolute bottom-full right-0 mb-4 w-56 transition-all duration-300 transform ${
          showVolume ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <div className="bg-[#0B1F40]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">
              {isMobile ? 'Mobile Audio' : 'Master Control'}
            </span>
            <span className={`text-xs font-bold ${isMuted ? 'text-red-400' : 'text-yellow-400'}`}>
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Slider Track */}
          <div 
            ref={sliderRef}
            className="relative h-2 bg-white/10 rounded-full cursor-pointer mb-6"
            onClick={(e) => handleSliderMove(e as unknown as MouseEvent)}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full transition-all duration-150"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-yellow-500 rounded-full shadow-lg"
              style={{ left: `${isMuted ? 0 : volume * 100}%`, transform: 'translate(-50%, -50%)' }}
            />
          </div>

          {/* Quick Presets */}
          <div className="grid grid-cols-4 gap-2">
            {[0, 25, 50, 100].map((p) => (
              <button
                key={p}
                onClick={() => setVolume(p / 100)}
                className="py-1.5 text-[10px] font-bold rounded-lg bg-white/5 text-white/60 hover:bg-yellow-500 hover:text-[#0B1F40] transition-all"
              >
                {p}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Trigger Button */}
      <button
        onClick={handleButtonClick}
        className={`group relative p-4 rounded-2xl border transition-all duration-500 ${
          isMuted ? 'bg-red-500/10 border-red-500/50' : 'bg-[#0B1F40]/90 border-white/20 hover:border-yellow-500/50'
        } shadow-2xl active:scale-90`}
      >
        <div className="relative z-10 flex items-center gap-3">
          {isMuted || volume === 0 ? <VolumeX className="text-red-400" /> : volume < 0.5 ? <Volume1 className="text-yellow-400" /> : <Volume2 className="text-yellow-400" />}
          
          {/* Visualizer bars (Desktop Only) */}
          {!isMobile && !isMuted && isPlaying && (
            <div className="flex items-end gap-1 h-4">
              {[0.4, 1, 0.6].map((h, i) => (
                <div 
                  key={i} 
                  className="w-1 bg-yellow-500 rounded-full animate-bounce" 
                  style={{ height: `${h * 100}%`, animationDuration: '0.6s', animationDelay: `${i * 0.1}s` }} 
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Status Indicator Dot */}
        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#050B18] ${
          isMuted ? 'bg-red-500' : isPlaying ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
        }`} />
      </button>

      {/* Tooltip Info */}
      <div className="absolute bottom-full right-0 mb-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
         <div className="bg-black/80 text-white text-[10px] px-3 py-1 rounded-full whitespace-nowrap">
            Double Click to Mute
         </div>
      </div>
    </div>
  );
};

export default BackgroundMusic;