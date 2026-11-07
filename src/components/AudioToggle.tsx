import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export const AudioToggle: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  useEffect(() => {
    setIsMuted(soundEngine.getIsMuted());
  }, []);

  const handleToggle = () => {
    const newMuted = soundEngine.toggleMute();
    setIsMuted(newMuted);
    if (!newMuted) {
      soundEngine.playSparkle(900);
    }
  };

  return (
    <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 flex items-center">
      <button
        onClick={handleToggle}
        aria-label={isMuted ? "Turn sound on (Romantic music & fireworks)" : "Mute sound"}
        title={isMuted ? "Enable music & sound effects" : "Mute audio"}
        className="group relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/30 text-amber-200 hover:text-amber-100 hover:border-amber-400/60 shadow-[0_0_15px_rgba(255,200,87,0.15)] transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm"
      >
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          {!isMuted && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 ${isMuted ? 'bg-zinc-600' : 'bg-amber-400'}`}></span>
        </span>

        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:text-amber-300" />
        )}

        <span className="text-[11px] sm:text-xs font-medium tracking-wide">
          {isMuted ? "Music Off" : "Music On"}
        </span>

        {!isMuted && (
          <Music className="w-3 h-3 text-amber-300/90 animate-bounce" />
        )}
      </button>
    </div>
  );
};
