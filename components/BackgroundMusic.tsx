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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hasInteracted = useRef(false);

  // Deteksi device mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Inisialisasi audio
  useEffect(() => {
    if (typeof window === 'undefined') return;

    audioRef.current = new Audio('/mars-genbi.mp3');
    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    const tryAutoPlay = () => {
      if (!hasInteracted.current && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
          })
          .catch(() => {});
      }
    };

    const timeout = setTimeout(tryAutoPlay, 1000);

    const handleInteraction = () => {
      if (!hasInteracted.current && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            hasInteracted.current = true;
          })
          .catch(console.error);
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Update volume realtime
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      
      if (volume === 0 && !isMuted) {
        setIsMuted(true);
      } else if (volume > 0 && isMuted) {
        setIsMuted(false);
      }
    }
  }, [volume, isMuted]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumePanelRef.current && !volumePanelRef.current.contains(event.target as Node)) {
        setShowVolume(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle slider mouse events
  useEffect(() => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const rect = slider.getBoundingClientRect();
        const clickX = moveEvent.clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
        const newVolume = percentage / 100;
        setVolume(newVolume);
        
        if (newVolume > 0 && !isPlaying && audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      const rect = slider.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      const newVolume = percentage / 100;
      setVolume(newVolume);
      
      if (newVolume > 0 && !isPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    };

    slider.addEventListener('mousedown', handleMouseDown);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isPlaying]);

  // Handle double click untuk mute
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - lastClickTime;
    
    if (timeDiff < 300 && timeDiff > 0) {
      // Double click terdeteksi - toggle mute
      if (!audioRef.current) return;
      
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      
      if (!newMutedState && !isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
      
      setShowVolume(true);
      setLastClickTime(0);
    } else {
      // Single click - toggle panel volume
      setShowVolume(prev => !prev);
      setLastClickTime(currentTime);
    }
  };

  const handleVolumeClick = (percentage: number) => {
    const newVolume = percentage / 100;
    setVolume(newVolume);
    
    if (newVolume > 0 && !isPlaying && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
    
    setShowVolume(true);
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="w-5 h-5 text-white" />;
    } else if (volume < 0.5) {
      return <Volume1 className="w-5 h-5 text-white" />;
    } else {
      return <Volume2 className="w-5 h-5 text-white" />;
    }
  };

  const getVolumeLabel = () => {
    if (isMuted || volume === 0) return 'Off';
    if (volume < 0.3) return 'Low';
    if (volume < 0.7) return 'Medium';
    return 'High';
  };

  const getVolumeColor = () => {
    if (isMuted || volume === 0) return 'text-gray-400';
    if (volume < 0.3) return 'text-yellow-400';
    if (volume < 0.7) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <>
      {/* Mobile Indicator (only shown on mobile) */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-40 md:hidden">
          <div className="flex items-center gap-2 bg-navy-800/90 backdrop-blur-sm border border-navy-600 rounded-full px-3 py-1.5 shadow-lg">
            <Smartphone className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-white">Sound Control</span>
          </div>
        </div>
      )}

      {/* Volume Control */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Volume Control Panel */}
        <div
          ref={volumePanelRef}
          className={`absolute ${
            isMobile 
              ? 'bottom-full right-0 mb-3 w-48' 
              : 'bottom-full right-0 mb-3 w-52'
          } transition-all duration-200 ${
            showVolume
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`bg-gradient-to-b from-navy-900 to-navy-800 border-2 border-navy-700 rounded-xl shadow-2xl p-4 ${
            isMobile ? 'p-3' : 'p-5'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold text-white">
                {isMobile ? '🔊' : 'VOLUME CONTROL'}
              </div>
              <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                isMuted 
                  ? 'bg-navy-700 text-gray-300' 
                  : 'bg-yellow-500 text-navy-900'
              }`}>
                {getVolumeLabel()}
              </div>
            </div>

            {/* Current Volume Display */}
            <div className="text-center mb-4">
              <div className={`font-bold ${isMobile ? 'text-2xl' : 'text-3xl'} ${getVolumeColor()}`}>
                {Math.round(volume * 100)}%
              </div>
              <div className="text-xs text-gray-300 mt-1">
                {isMuted ? '🔇 MUTED' : '🔊 ACTIVE'}
              </div>
            </div>

            {/* Slider Container */}
            <div className="space-y-3 mb-4">
              {/* Slider Track */}
              <div 
                ref={sliderRef}
                className="relative h-3 bg-navy-700 rounded-full cursor-pointer border border-navy-600"
                onClick={(e) => {
                  e.stopPropagation();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                  const newVolume = percentage / 100;
                  setVolume(newVolume);
                  
                  if (newVolume > 0 && !isPlaying && audioRef.current) {
                    audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
                  }
                }}
              >
                {/* Filled Portion with Gradient */}
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 transition-all duration-150"
                  style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                />
                
                {/* Thumb */}
                <div
                  className="absolute top-1/2 w-5 h-5 bg-white border-2 border-yellow-400 rounded-full shadow-lg -translate-y-1/2 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                  style={{
                    left: `${isMuted ? 0 : volume * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 2px 8px rgba(251, 191, 36, 0.5)'
                  }}
                />
              </div>

              {/* Volume Levels */}
              <div className="flex justify-between text-xs text-gray-300 font-medium px-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Quick Presets - Mobile: smaller buttons, Desktop: normal */}
            <div className={`grid grid-cols-5 gap-1 ${isMobile ? 'mb-3' : 'mb-4'}`}>
              {[0, 25, 50, 75, 100].map((percentage) => {
                const isActive = Math.abs((volume * 100) - percentage) < 5;
                let bgColor = '';
                let textColor = 'text-white';
                
                if (isActive) {
                  if (percentage === 0) bgColor = 'bg-navy-600 text-white';
                  else if (percentage <= 25) bgColor = 'bg-yellow-400 text-navy-900';
                  else if (percentage <= 50) bgColor = 'bg-yellow-500 text-navy-900';
                  else if (percentage <= 75) bgColor = 'bg-orange-400 text-navy-900';
                  else bgColor = 'bg-orange-500 text-white';
                } else {
                  bgColor = 'bg-navy-700 hover:bg-navy-600 text-gray-300';
                }
                
                return (
                  <button
                    key={percentage}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVolumeClick(percentage);
                    }}
                    className={`py-2 text-xs font-medium rounded-lg transition-all duration-150 ${bgColor} ${textColor} ${
                      isMobile ? 'px-1' : 'px-2'
                    }`}
                  >
                    {percentage}%
                  </button>
                );
              })}
            </div>

            {/* Mobile Info */}
            {isMobile && (
              <div className="border-t border-navy-700 pt-3">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-300">💡</span>
                    <span>Double tap to mute</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Arrow Pointer */}
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-navy-900 border-r-2 border-b-2 border-navy-700 rotate-45" />
        </div>

        {/* Main Button - Responsive sizing */}
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={handleButtonClick}
            onMouseEnter={() => !isMobile && setShowVolume(true)}
            onMouseLeave={() => {
              if (!showVolume && !isMobile) {
                setTimeout(() => setShowVolume(false), 300);
              }
            }}
            onTouchStart={() => isMobile && setShowVolume(true)}
            onTouchEnd={() => {
              if (isMobile) {
                setTimeout(() => setShowVolume(false), 3000);
              }
            }}
            className={`group relative ${
              isMobile 
                ? 'p-3 border-2' 
                : 'p-3.5 border-2'
            } bg-gradient-to-br from-navy-800 to-navy-900 border-navy-600 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200`}
          >
            {/* Navy Background Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-navy-700 to-navy-800 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Active Effect */}
            {!isMuted && volume > 0 && (
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
            
            {/* Icon Container */}
            <div className="relative flex items-center justify-center">
              {/* Icon - Mobile: with indicator, Desktop: clean */}
              <div className="text-white transition-colors duration-200">
                {getVolumeIcon()}
              </div>
              
              {/* Sound Waves Animation - Only show on desktop */}
              {!isMobile && !isMuted && volume > 0 && isPlaying && (
                <div className="absolute -right-2 -top-2 flex gap-0.5">
                  {[0.4, 0.7, 1, 0.7, 0.4].map((scale, i) => (
                    <div
                      key={i}
                      className="w-0.5 bg-gradient-to-t from-yellow-300 to-yellow-200 rounded-full"
                      style={{
                        height: `${scale * 10}px`,
                        animation: 'wave 1.2s ease-in-out infinite',
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}
              
              {/* Mobile Playing Indicator */}
              {isMobile && isPlaying && !isMuted && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            
            {/* Status Dot */}
            <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 ${
              isMobile ? 'border-navy-800' : 'border-navy-900'
            } ${
              isMuted 
                ? 'bg-gray-500' 
                : isPlaying 
                  ? 'bg-yellow-500 animate-pulse' 
                  : 'bg-orange-500'
            }`} />
            
            {/* Double Click Indicator - Only on desktop */}
            {!isMobile && (
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-30"></div>
              </div>
            )}
          </button>
          
          {/* Tooltip - Only on desktop */}
          {!isMobile && (
            <div className="absolute -top-11 right-1/2 translate-x-1/2 bg-navy-800 border border-navy-600 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap min-w-[160px] text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isMuted ? 'text-gray-300' : 'text-yellow-300'}`}>
                    {isMuted ? '🔇 MUTED' : '🔊 PLAYING'}
                  </span>
                  <span className="text-yellow-300 font-bold">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 mt-1">
                  Click: Show Panel • Double Click: Toggle Mute
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-navy-800 border-b border-r border-navy-600 rotate-45"></div>
            </div>
          )}
          
          {/* Mobile Touch Indicator */}
          {isMobile && showVolume && (
            <div className="absolute -top-10 right-1/2 translate-x-1/2 bg-navy-800 text-white text-xs px-2 py-1 rounded opacity-80">
              👆 Tap to close
            </div>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wave {
          0%, 100% { 
            transform: scaleY(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: scaleY(1.5); 
            opacity: 1; 
          }
        }
        
        /* Mobile touch optimization */
        @media (max-width: 768px) {
          button {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
          }
          
          button:active {
            transform: scale(0.95);
          }
        }
      `}</style>
    </>
  );
};

export default BackgroundMusic;