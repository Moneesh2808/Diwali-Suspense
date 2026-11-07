import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Diya3D } from './Diya3D';
import { soundEngine } from '../audio/soundEngine';

interface LandingSceneProps {
  onStartSurprise: () => void;
}

export const LandingScene: React.FC<LandingSceneProps> = ({ onStartSurprise }) => {
  const [isBrightening, setIsBrightening] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isExiting) return;
    setIsBrightening(true);
    setIsExiting(true);

    // Unlocks Web Audio so all sky shot rocket whistles, explosion booms, and chimes are audible!
    soundEngine.unlockAndEnableAudio();
    soundEngine.playChimeArpeggio();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: ['#FFC857', '#FFD700', '#FFE29A', '#FF4D8D', '#FFFFFF'],
      disableForReducedMotion: true,
      zIndex: 9999,
    });

    setTimeout(() => {
      onStartSurprise();
    }, 850);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 sm:py-10 z-20 overflow-y-auto"
    >
      {/* Top Banner - Safe spacing from top-right music button */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-12 sm:mt-2 mb-2 flex items-center justify-center gap-2 text-amber-300/80 text-[11px] sm:text-xs md:text-sm tracking-[0.22em] uppercase font-sans font-medium text-center"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
        <span>Diwali Celebration For My Papa</span>
        <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline-block" />
      </motion.div>

      {/* Main Container: On Desktop flanked by vilakus; on Mobile full-width card with vilakus below */}
      <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 my-auto">
        
        {/* DESKTOP Left Vilaku */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="hidden md:flex shrink-0 flex-col items-center justify-center transform md:scale-95 lg:scale-105"
        >
          <Diya3D size="normal" brighten={isBrightening} />
        </motion.div>

        {/* Center Romantic Card */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: isExiting ? 0 : 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
          className="w-full max-w-sm sm:max-w-md md:max-w-xl text-center px-5 py-7 sm:px-8 sm:py-9 md:px-10 md:py-10 rounded-2xl sm:rounded-3xl romantic-card glow-box-gold relative"
        >
          <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-amber-400/50" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-amber-400/50" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-amber-400/50" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-amber-400/50" />

          {/* Surprise Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-200 text-xs font-medium mb-3 sm:mb-5"
          >
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
            <span>A Little Diwali Surprise</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-amber-100 leading-snug mb-2 sm:mb-3 tracking-wide glow-text-gold"
          >
            This is very special for you, <br />
            <span className="shimmer-text italic">my Papa ❤️</span>
          </motion.h1>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xs sm:text-sm md:text-base font-serif italic text-amber-200/90 mb-3 sm:mb-4 leading-relaxed"
          >
            “Among all the lights in this world, you will always be my favourite light.”
          </motion.p>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-xs sm:text-sm md:text-base text-zinc-300 font-sans font-light leading-relaxed mb-4 sm:mb-5"
          >
            You make my ordinary days beautiful, my difficult days easier, and my life happier just by being in it. This Diwali, I have a little surprise for you, made with all my love.
          </motion.p>

          {/* Question */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="text-xs sm:text-sm font-medium text-amber-300 mb-5 sm:mb-6 tracking-wide"
          >
            Ready for your little surprise, my love?
          </motion.p>

          {/* Button */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-400 opacity-60 blur-md animate-pulse" />

            <button
              onClick={handleClick}
              disabled={isExiting}
              aria-label="Open your Diwali surprise"
              className="relative flex items-center justify-center gap-2 px-7 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-zinc-950 font-semibold text-xs sm:text-sm md:text-base tracking-wide shadow-[0_0_20px_rgba(255,200,87,0.4)] hover:shadow-[0_0_35px_rgba(255,200,87,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Open Your Surprise</span>
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-700 fill-rose-700" />
            </button>
          </motion.div>
        </motion.div>

        {/* DESKTOP Right Vilaku */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="hidden md:flex shrink-0 flex-col items-center justify-center transform md:scale-95 lg:scale-105"
        >
          <Diya3D size="normal" brighten={isBrightening} />
        </motion.div>
      </div>

      {/* MOBILE: VILAKUS NICELY DISPLAYED BELOW THE CONTENT */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="md:hidden flex items-center justify-around w-full max-w-xs mx-auto mt-6 mb-2"
      >
        <Diya3D size="small" brighten={isBrightening} />
        <Diya3D size="small" brighten={isBrightening} />
      </motion.div>

      {/* Subtle bottom note */}
      <div className="text-[10px] text-amber-300/40 uppercase tracking-widest text-center mt-2">
        Happy Diwali • My Love
      </div>
    </motion.div>
  );
};
